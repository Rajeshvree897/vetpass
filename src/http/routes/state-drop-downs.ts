// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import StateService from "../../services/state-drop-downs"
import CommonService from "../../services/common"
import upload from "../../helpers/file-upload"
import { Op } from "sequelize"
import State from "../../db/models/state"
import Country from "../../db/models/country"
import { Sequelize } from "sequelize"

export default (app: Router) => {
  app.get(
    "/states/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      stateService
        .getStateReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "State Name": i.state ? i.state : '',
            "Country Name": i.countries && i.countries.country ? i.countries.country : '',
          }));
          return res.xls('stateData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/states",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("states/index.ejs", {
        title: constants.PAGE_TITLE.STATE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/states/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      // let order:any[] = [];
      let where:any = {};

      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
          { '$countries.country$': { [Op.like]: `%${req.query.search.value}%` } },
          { state: { [Op.like]: `%${req.query.search.value}%` } },
        ]};
        delete req.query.search; 
      }
      
      // if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`countries`.`country`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
      where.is_deleted = null;
      datatable(State, req.query, {
        attributes: [
          "id",
          "state",
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

  app.get('/state', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    res.render("states/state.ejs", {
      title: constants.PAGE_TITLE.STATE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
      countryData: await commonService.getCountries(),
    });
  });

  app.post(
    '/state',
    celebrate({
      body: Joi.object({
        state: Joi.string()
          .required()
          .error(new CustomError("State is required")),
        country: Joi.number()
          .required()
          .error(new CustomError("Country is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      const requestStateData: any = {};
      
      requestStateData.state = req.body.state;
      requestStateData.country = req.body.country;
      requestStateData.created_by = req?.session?.user?.id;

      stateService
        .addState(requestStateData)
        .then(() => {
          req.flash(
            'success',
            `State is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/states")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkStateName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { state: req.body.state, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await State.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/states/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      stateService
        .getState(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();

          res.render("states/state.ejs", {
            title: constants.PAGE_TITLE.STATE_ADD,
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
    "/state/update",
    celebrate({
      body: Joi.object({
        state: Joi.string()
          .required()
          .error(new CustomError("State is required")),
        country: Joi.number()
          .required()
          .error(new CustomError("Country is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      const requestStateData: any = {};

      requestStateData.state = req.body.state;
      requestStateData.country = req.body.country;
      requestStateData.id = req.body.id;

      stateService
        .updateState(requestStateData)
        .then(() => {
          req.flash(
            "success",
            `State is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/states")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/states/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      stateService
        .deleteState(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "State deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/states")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/states/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const stateService = new StateService();
      stateService
        .deleteMultipleStates(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected States are deleted successfully.`,
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
    "/importState",
    authRedirect(true),
    upload.single('stateFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const stateService = new StateService();

      stateService
        .importState(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `States are added successfully.`,
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