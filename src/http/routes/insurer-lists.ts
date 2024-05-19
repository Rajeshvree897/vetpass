// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import InsurerService from "../../services/insurer-lists"
import CommonService from "../../services/common"
import Insurers from "../../db/models/insurer"
import { Sequelize } from "sequelize"
import Country from "../../db/models/country"

export default (app: Router) => {
  app.get(
    "/insurers/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      insurerService
        .getInsurerReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Insurer Name": i.name ? i.name : '',
            "Country Name": i.countries && i.countries.country ? i.countries.country : '',
            "Sort ID": i.sort_id ? i.sort_id : '',
          }));
          return res.xls('InsurerData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/insurers",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("insurers/index.ejs", {
        title: constants.PAGE_TITLE.INSURER_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/insurers/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      // let order:any[] = [];
      let where:any = {};

      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
          { '$countries.country$': { [Op.like]: `%${req.query.search.value}%` } },
          { name: { [Op.like]: `%${req.query.search.value}%` } },
        ]};
        delete req.query.search; 
      }
      
      // if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`countries`.`country`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
      where.is_deleted = null;
      datatable(Insurers, req.query, {
        attributes: [
          "id",
          "name",
          [Sequelize.col("countries.country"), "country"]
        ],
        include: [
          {
            model: Country,
            as: "countries",
            attributes: ["country", "id"],
          },
        ],
        where,
        // order
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/insurer', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    res.render("insurers/insurer.ejs", {
      title: constants.PAGE_TITLE.INSURER_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
      countryData: await commonService.getCountries(),
    });
  });

  app.post(
    '/insurer',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Insurer Name is required")),
        // sort_id: Joi.number()
        //   .required()
        //   .error(new CustomError("Sort ID is required")),
        country: Joi.optional(),
          // .required()
          // .error(new CustomError("Country is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      const requestInsurerData: any = {};

      requestInsurerData.name = req.body.name;
      requestInsurerData.sort_id = 0;
      requestInsurerData.country = req.body.country;
      requestInsurerData.created_by = req?.session?.user?.id;

      insurerService
        .addInsurer(requestInsurerData)
        .then(() => {
          req.flash(
            'success',
            `Insurer is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/insurers")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkInsurerName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Insurers.count({ where: whereObj });
    return res.json({response: result});
  });
  
  app.post("/checkInsurerSortID", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { sort_id: req.body.sort_id };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Insurers.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/insurers/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      insurerService
        .getInsurer(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();

          res.render("insurers/insurer.ejs", {
            title: constants.PAGE_TITLE.INSURER_ADD,
            userData: req.session && req.session.user ? req.session.user : null,
            countryData: await commonService.getCountries(responseData.country, true),
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  );

  app.post(
    "/insurer/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Insurer Name is required")),
        sort_id: Joi.number()
          .required()
          .error(new CustomError("Sort ID is required")),
        country: Joi.optional(),
          // .required()
          // .error(new CustomError("Country is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      const requestInsurerData: any = {};

      requestInsurerData.name = req.body.name;
      requestInsurerData.country = req.body.country;
      requestInsurerData.sort_id = req.body.sort_id;
      requestInsurerData.id = req.body.id;

      insurerService
        .updateInsurer(requestInsurerData)
        .then(() => {
          req.flash(
            "success",
            `Insurer is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/insurers")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/insurers/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      insurerService
        .deleteInsurer(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Insurer deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/insurers")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/insurers/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();
      insurerService
        .deleteMultipleInsurers(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Insurers are deleted successfully.`,
            req,
            res
          )
          return res.json({data: true});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
  
  app.post(
    "/importInsurer",
    authRedirect(true),
    upload.single('insurerFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const insurerService = new InsurerService();

      insurerService
        .importInsurer(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Insurers are added successfully.`,
            req,
            res
          )
          res.json({ status: true })
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
          //return next(error)
        })
    }
  )
}