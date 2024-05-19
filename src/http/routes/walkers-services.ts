// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import WalkersService from "../../services/walkers-services"
import WalkersServices from "../../db/models/walkers-services"

export default (app: Router) => {
  app.get(
    "/walkers-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      walkersService
        .getWalkerServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Walker Service Name": i.service ? i.service : '',
          }));
          return res.xls('walkerServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/walker-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("walkers-services/index.ejs", {
        title: constants.PAGE_TITLE.WALKER_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/walkers-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(WalkersServices, req.query, {
        attributes: [
          "id",
          "service",
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/walker-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("walkers-services/walkers-service.ejs", {
      title: constants.PAGE_TITLE.WALKER_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/walker-service',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Walker Service Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      const requestWalkerServiceData: any = {};

      requestWalkerServiceData.service = req.body.service;
      requestWalkerServiceData.created_by = req?.session?.user?.id;

      walkersService
        .addWalkerService(requestWalkerServiceData)
        .then(() => {
          req.flash(
            'success',
            `Walker Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/walker-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkWalkerServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { service: req.body.service };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await WalkersServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/walkers-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      walkersService
        .getWalkerService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("walkers-services/walkers-service.ejs", {
            title: constants.PAGE_TITLE.WALKER_SERVICE_ADD,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  );

  app.post(
    "/walkers-service/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Walker Service Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      const requestWalkerServiceData: any = {};

      requestWalkerServiceData.service = req.body.service;
      requestWalkerServiceData.id = req.body.id;

      walkersService
        .updateWalkerService(requestWalkerServiceData)
        .then(() => {
          req.flash(
            "success",
            `Walker Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/walker-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/walkers-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      walkersService
        .deleteWalkerService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Walker Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/walker-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/walkers-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();
      walkersService
        .deleteMultipleWalkerServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Walker Services are deleted successfully.`,
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
    "/importWalkerServices",
    authRedirect(true),
    upload.single('walkers_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const walkersService = new WalkersService();

      walkersService
        .importWalkerService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Walker Services are added successfully.`,
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