// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import ChipService from "../../services/chip-lists"
import CommonService from "../../services/common"
import Chips from "../../db/models/chips"
import { Sequelize } from "sequelize"
import Country from "../../db/models/country"

export default (app: Router) => {
  app.get(
    "/chips/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const chipService = new ChipService();
      chipService
        .getChipReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Chip Name": i.name ? i.name : '',
            "Country Name": i.countries && i.countries.country ? i.countries.country : '',
            "Sort ID": i.sort_id ? i.sort_id : '',
          }));
          return res.xls('ChipData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/chips",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("chips/index.ejs", {
        title: constants.PAGE_TITLE.CHIP_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/chips/data",
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
      datatable(Chips, req.query, {
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

  app.get('/chip', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    res.render("chips/chip.ejs", {
      title: constants.PAGE_TITLE.CHIP_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
      countryData: await commonService.getCountries(),
    });
  });

  app.post(
    '/chip',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Chip Name is required")),
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
      const chipService = new ChipService();
      const requestChipData: any = {};

      requestChipData.name = req.body.name;
      requestChipData.sort_id = 0;
      requestChipData.country = req.body.country;
      requestChipData.created_by = req?.session?.user?.id;

      chipService
        .addChip(requestChipData)
        .then(() => {
          req.flash(
            'success',
            `Chip is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/chips")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkChipName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Chips.count({ where: whereObj });
    return res.json({response: result});
  });
  
  app.post("/checkChipSortID", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { sort_id: req.body.sort_id };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Chips.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/chips/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const chipService = new ChipService();
      chipService
        .getChip(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();

          res.render("chips/chip.ejs", {
            title: constants.PAGE_TITLE.CHIP_ADD,
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
    "/chip/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Chip Name is required")),
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
      const chipService = new ChipService();
      const requestChipData: any = {};

      requestChipData.name = req.body.name;
      requestChipData.country = req.body.country;
      requestChipData.sort_id = req.body.sort_id;
      requestChipData.id = req.body.id;

      chipService
        .updateChip(requestChipData)
        .then(() => {
          req.flash(
            "success",
            `Chip is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/chips")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/chips/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const chipService = new ChipService();
      chipService
        .deleteChip(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Chip deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/chips")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/chips/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const chipService = new ChipService();
      chipService
        .deleteMultipleChips(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Chips are deleted successfully.`,
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
    "/importChip",
    authRedirect(true),
    upload.single('chipFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const chipService = new ChipService();

      chipService
        .importChip(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Chips are added successfully.`,
            req,
            res
          )
          res.json({ status: true })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}