// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import multer from 'multer';
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";
import upload from "../../helpers/file-upload";
const _ = require('lodash');
import { authRedirect } from "../middlewares/index";
import ServiceProviderMainServices from "../../db/models/service-provider-main-services";
import ServiceProviderSubDBService from "../../db/models/service-provider-sub-services";
import ServiceProviderSubServices from "../../services/Service-provider-sub-services";
import User from "../../db/models/user";
import constants from "../../helpers/constants";
import CommonService from "../../services/common";
import { CustomError } from "../../services/error-service";
import Breeds from "../../db/models/breeds";

export default (app: Router) => {
  app.get(
    "/subService",
    authRedirect(true),
    async(req: Request, res: Response) => {
      const commonService = new CommonService();
      res.render("service-provider/sub-service/index.ejs", {
        title: "Sub service list",
        userData: req.session && req.session.user ? req.session.user : null,
        mainService: await commonService.getserviceProviderServices(),
      })
    }
  )

  // app.post("/subService/validateStatus", authRedirect(true), async (req: Request, res: Response) => {
  //   const result = await Breeds.count({ where: { animal_type: req.body.id } });
  //   return res.json({response: result});
  // });

  app.get('/subService/add', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    res.render('service-provider/sub-service/sub-service.ejs', {
      title: constants.PAGE_TITLE.MIAN_SERVICE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      mainService: await commonService.getserviceProviderServices()
    });
  });

  app.post(
    '/subService',
    authRedirect(true),
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Service is required")),
        id: Joi.optional(),
        main_service_id: Joi.string()
          .optional()
          .error(new CustomError("Main service is invalid")),
        status: Joi.string()
          .required()
          .error(new CustomError("Status is required")),  
          price: Joi.string()
          .required()
          .error(new CustomError("Price is required")),
          duration: Joi.optional(),
          description: Joi.optional(),
          appointment: Joi.optional(),

      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      req.body.mainService = req.body.main_service_id;
      const serviceProviderSubServices = new ServiceProviderSubServices();
      serviceProviderSubServices
        .addSubService(req.body, req.file)
        .then(() => {
          req.flash(
            'success',
            `Sub service is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/subService');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/subService/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let order:any[] = [];
      const statusValue = _.find(req.query.columns, { 'data': 'mainService' }).search.value;
      let where: any = {};
      if (statusValue != '') {
        where = { [Op.and]: [] };

        where[Op.and].push({
          main_service_id: statusValue
        });
      }
      if (req.query && req.query.search && req.query.search.value !== '') {
        if (statusValue != '') {
          where = { [Op.and]: [], [Op.or]: [] };
          
          where[Op.and].push({
            main_service_id: statusValue 
          });
        } else {
          where = { [Op.or]: [] };
        }
        
        if (req.query.search['value'] != '') {
          where[Op.or].push(
            { '$MainServices.service$': { [Op.like]: `%${req.query.search.value}%` } },{ service: { [Op.like]: `%${req.query.search.value}%` } },
            
            );
        }

        req.query.search['value'] = '';
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [ [ Sequelize.literal('`MainServices`.`service`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '3') {
        order = [ [ Sequelize.literal('`CreatedBy`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '4') {
        const orderBy = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'
        order = [ [ "status", orderBy ] ];
        delete req.query.order;
      }
      datatable(ServiceProviderSubDBService, req.query, {
        
        attributes: [
          "id",
          "service",
          "status",
          [Sequelize.col("MainServices.service"), "mainService"],
          [Sequelize.col("CreatedBy.first_name"), "user"],
        ],
        include: [
          {
            model: ServiceProviderMainServices, as: "MainServices", attributes: []
          },
          {
            model : User, as: 'CreatedBy',  attributes: ['first_name']
          }
        ],
        where,
        order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/subService/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderSubService = new ServiceProviderSubServices();
      serviceProviderSubService
        .getSubService(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();
          res.render("service-provider/sub-service/sub-service.ejs", {
            title: "Edit Sub Service",
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            mainService: await commonService.getserviceProviderServices(responseData.main_service_id,true)
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post("/checkSubService", authRedirect(true), async (req: Request, res: Response) => {
    let result;
    const whereObj: any = { service: req.body.service};
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    result = await ServiceProviderSubDBService.count({ where: whereObj });
    return res.json({response: result});
  });

  app.post(
    "/subService/update",
    // multer().single('icon'),
    // celebrate({
    //   body: Joi.object({
    //     service: Joi.string()
    //       .required()
    //       .error(new CustomError("service is required")),
    //     id: Joi.optional(),
    //     main_service_id: Joi.string()
    //       .optional()
    //       .error(new CustomError("Main Service is invalid")),
    //     status: Joi.string()
    //       .required()
    //       .error(new CustomError("Status is required")),
    //   }),
    // }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderSubService = new ServiceProviderSubServices();
      serviceProviderSubService
        .updateSubService(req.body, req.session?.user.id, req.body.main_service_id)
        .then(() => {
          req.flash(
            "success",
            `Sub service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/subService")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/subService/importServices",
    authRedirect(true),
    upload.single('importSub_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const serviceProviderSubService  = new ServiceProviderSubServices();
      serviceProviderSubService
        .importSubServices(req.file, req.session?.user.id)
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
    "/subService123",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      req.flash(
        "success",
        `Services are added successfully.`,
        req,
        res
      )
      res.json({ status: true })
    })
  app.get(
    "/subServicedownloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
        ServiceProviderSubDBService.findAll({
          attributes: [
            "id",
            "service",
            "status",            
          ],
          include: [
            {
              model: User, as: "CreatedBy", attributes: ['email']
            },
            {
              model: ServiceProviderMainServices, as: "MainServices", attributes: ['service', 'status']
            }
          ],
          
        }).then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
               responseData = responseData.map((i:any) => ({
                "email" : i.CreatedBy ? i.CreatedBy.email : "",
                "main_service": i.MainServices ? i.MainServices.service : "",
                "main_service_status": i.MainServices && i.MainServices.status ==1  ? "active" : 'inactive',
                "sub_service": i.service ? i.service : '',
                "sub_status": i.status == 1 ? "active" : 'inactive',

     }));
          return res.xls('serviceProviderSubserviceData.xlsx', responseData);
        }).catch((error: Error) => {
             return next(error)
        });
      
      // const serviceProviderSubService = new ServiceProviderSubServices();
      // serviceProviderSubService
      //   .getSubServiceReportData()
      //   .then((responseData: any) => {
      //     responseData = ""//responseData.map((i:any) => i.toJSON());
      //     // responseData = responseData.map((i:any) => ({
      //     //   "service": i.service ? i.service : '',
      //     //   "status": i.status ? i.status : '',

      //     // }));
      //     return res.xls('serviceProviderSubserviceData.xlsx', responseData);
      //   })
      //   .catch((error: Error) => {
      //     return next(error)
      //   });
    }
  )

  app.get(
    "/subService/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderSubService = new ServiceProviderSubServices();
      serviceProviderSubService
        .deleteSubService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Sub service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/subService")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
