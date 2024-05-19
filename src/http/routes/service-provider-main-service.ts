// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, Op } from "sequelize";
import { authRedirect } from "../middlewares/index"
import ServiceProviderMainServices from "../../db/models/service-provider-main-services"
import ServiceProviderMainService from "../../services/Service-provider-main-services"
import ServiceProviderSubDBServices from "../../db/models/service-provider-sub-services";
import constants from "../../helpers/constants";
import upload from "../../helpers/file-upload";
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"

export default (app: Router) => {
  app.get(
    "/mainService",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("service-provider/main-service/index.ejs", {
        title: "service list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.post("/mainService/validateStatus", authRedirect(true), async (req: Request, res: Response) => {
    const result = await ServiceProviderSubDBServices.count({ where: { main_service_id: req.body.id } });
    return res.json({response: result});
  });

  app.get('/mainService/add', authRedirect(true), (req: Request, res: Response) => {
    res.render('service-provider/main-service/main-service.ejs', {
      title: constants.PAGE_TITLE.MIAN_SERVICE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/mainServices',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("service is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("service Status is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const serviceProviderMainService = new ServiceProviderMainService();
      serviceProviderMainService
        .addMainService(req.body)
        .then(() => {
          req.flash(
            'success',
            `Service is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/mainService');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/mainService/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        req.query.order[0].dir = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'; 
      }
      datatable(ServiceProviderMainServices, req.query).then((result: any) => {
        res.json(result)
      })
    }
  );

  
  app.post("/checkService", authRedirect(true), async (req: Request, res: Response) => {
    let result;
    const whereObj: any = { service: req.body.service};
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    result = await ServiceProviderMainServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/mainService/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderMainService = new ServiceProviderMainService();
      serviceProviderMainService
        .getMainService(+req.params.id)
        .then((responseData: any) => {
          res.render("service-provider/main-service/main-service.ejs", {
            title: constants.PAGE_TITLE.ANIMAL_CATEGORY_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/mainService/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Service is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("service Status is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderMainService = new ServiceProviderMainService();
      serviceProviderMainService
        .updateMainService(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/mainService")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/mainService/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
        
      const serviceProviderMainService = new ServiceProviderMainService();
      serviceProviderMainService
        .deleteMainService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Main service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/mainService")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/mainService/importServices",
    authRedirect(true),
    upload.single('import_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const serviceProviderService  = new ServiceProviderMainService();
      serviceProviderService
        .importServices(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Services are added successfully.`,
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

  app.get(
    "/downloadReportForservices",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const serviceProviderService = new ServiceProviderMainService();
      serviceProviderService
        .getServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
           responseData = responseData.map((i:any) => ({
             "service": i.service ? i.service : '',
             "status": i.status == 1 ? "active" : 'inactive',
           }));
          return res.xls('serviceProviderserviceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )
}
