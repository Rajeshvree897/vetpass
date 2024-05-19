// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import GroomersService from "../../services/groomers-services"
import GroomersServices from "../../db/models/groomers-services"

export default (app: Router) => {
  app.get(
    "/groomers-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      groomersService
        .getGroomerServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Groomer Service Name": i.service ? i.service : '',
          }));
          return res.xls('groomerServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/groomer-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("groomers-services/index.ejs", {
        title: constants.PAGE_TITLE.GROOMER_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/groomers-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(GroomersServices, req.query, {
        attributes: [
          "id",
          "service",
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/groomer-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("groomers-services/groomers-service.ejs", {
      title: constants.PAGE_TITLE.GROOMER_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/groomer-service',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Groomer Service Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      const requestGroomerServiceData: any = {};

      requestGroomerServiceData.service = req.body.service;
      requestGroomerServiceData.created_by = req?.session?.user?.id;

      groomersService
        .addGroomerService(requestGroomerServiceData)
        .then(() => {
          req.flash(
            'success',
            `Groomer Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/groomer-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkGroomerServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { service: req.body.service };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await GroomersServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/groomers-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      groomersService
        .getGroomerService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("groomers-services/groomers-service.ejs", {
            title: constants.PAGE_TITLE.GROOMER_SERVICE_ADD,
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
    "/groomers-service/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Groomer Service Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      const requestGroomerServiceData: any = {};

      requestGroomerServiceData.service = req.body.service;
      requestGroomerServiceData.id = req.body.id;

      groomersService
        .updateGroomerService(requestGroomerServiceData)
        .then(() => {
          req.flash(
            "success",
            `Groomer Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/groomer-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/groomers-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      groomersService
        .deleteGroomerService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Groomer Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/groomer-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/groomers-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();
      groomersService
        .deleteMultipleGroomerServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Groomer Services are deleted successfully.`,
            req,
            res
          )
          return res.json({data: true});
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
        })
    }
  )
  
  app.post(
    "/importGroomerServices",
    authRedirect(true),
    upload.single('groomers_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const groomersService = new GroomersService();

      groomersService
        .importGroomerService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Groomer Services are added successfully.`,
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
        })
    }
  )
}