// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import ServiceProviderLiabilities from "../../services/service-provider-liability"
import ServiceProviderLiability from "../../db/models/service-provider-liability"


export default (app: Router) => {
  app.get(
    "/service-provider-liabilities/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      serviceProviderLiability
        .getServiceProviderLiabilityReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Service Provider Liability Name": i.name ? i.name : '',
          }));
          return res.xls('serviceProviderLiabilityData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/service-provider-liabilities",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("service-provider-liabilities/index.ejs", {
        title: constants.PAGE_TITLE.SERVICE_PROVIDER_LIABILITY_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/service-provider-liabilities/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(ServiceProviderLiability, req.query, {
        attributes: [
          "id",
          "name",
        ],
        where : { is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/service-provider-liability', authRedirect(true), async (req: Request, res: Response) => {
    res.render("service-provider-liabilities/service-provider-liability.ejs", {
      title: constants.PAGE_TITLE.SERVICE_PROVIDER_LIABILITY_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/service-provioder-liability',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Service provioder Liability Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      const requestServiceProviderLiabilityData: any = {};

      requestServiceProviderLiabilityData.name = req.body.name;
      requestServiceProviderLiabilityData.created_by = req?.session?.user?.id;

      serviceProviderLiability
        .ServiceProviderLiability(requestServiceProviderLiabilityData)
        .then(() => {
          req.flash(
            'success',
            `Service provider Liability is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/service-provider-liabilities")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkServiceProviderLiabilitiesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await ServiceProviderLiability.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/service-provider-liabilities/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const ServiceProviderLiability = new ServiceProviderLiabilities();
      ServiceProviderLiability
        .getServiceProviderLiability(+req.params.id)
        .then(async (responseData: any) => {
          res.render("service-provider-liabilities/service-provider-liability.ejs", {
            title: constants.PAGE_TITLE.SERVICE_PROVIDER_LIABILITY_ADD,
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
    "/service-provioder-liability/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Service Provider Liability Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      const requestServicePRoviderLiabilityData: any = {};

      requestServicePRoviderLiabilityData.name = req.body.name;
      requestServicePRoviderLiabilityData.id = req.body.id;

      serviceProviderLiability
        .updateServiceProviderLiability(requestServicePRoviderLiabilityData)
        .then(() => {
          req.flash(
            "success",
            `Service Provider Liability is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/service-provider-liabilities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/service-provider-liabilities/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      serviceProviderLiability
        .deleteServiceProviderLiability(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Service Provider Liability deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/service-provider-liabilities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/service-provider-liabilities/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      serviceProviderLiability
        .deleteMultipleServiceProviderLiabilities(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected service provider Liabilities are deleted successfully.`,
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
    "/importServiceProviderLiabilities",
    authRedirect(true),
    upload.single('serviceProvider_liabilityFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const serviceProviderLiability = new ServiceProviderLiabilities();
      console.log('treu')
      serviceProviderLiability
        .importServiceProviderLiability(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Service Provider Liabilities are added successfully.`,
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
         // return next(error)
        })
    }
  )
}