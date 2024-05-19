// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import NutritionistService from "../../services/nutritionists-services"
import NutritionistsService from "../../db/models/nutritionists-services"

export default (app: Router) => {
  app.get(
    "/nutritionists-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      nutritionistService
        .getNutritionistServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Nutritionist Service Name": i.service ? i.service : '',
          }));
          return res.xls('nutritionistServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/nutritionist-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("nutritionists-services/index.ejs", {
        title: constants.PAGE_TITLE.NUTRITIONIST_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/nutritionists-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(NutritionistsService, req.query, {
        attributes: [
          "id",
          "service",
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/nutritionist-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("nutritionists-services/nutritionists-service.ejs", {
      title: constants.PAGE_TITLE.NUTRITIONIST_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/nutritionist-service',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Nutritionist Service Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      const requestNutritionistServiceData: any = {};

      requestNutritionistServiceData.service = req.body.service;
      requestNutritionistServiceData.created_by = req?.session?.user?.id;

      nutritionistService
        .addNutritionistService(requestNutritionistServiceData)
        .then(() => {
          req.flash(
            'success',
            `Nutritionist Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/nutritionist-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkNutritionistServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { service: req.body.service };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await NutritionistsService.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/nutritionists-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      nutritionistService
        .getNutritionistService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("nutritionists-services/nutritionists-service.ejs", {
            title: constants.PAGE_TITLE.NUTRITIONIST_SERVICE_ADD,
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
    "/nutritionists-service/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Nutritionist Service Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      const requestNutritionistServiceData: any = {};

      requestNutritionistServiceData.service = req.body.service;
      requestNutritionistServiceData.id = req.body.id;

      nutritionistService
        .updateNutritionistService(requestNutritionistServiceData)
        .then(() => {
          req.flash(
            "success",
            `Nutritionist Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/nutritionist-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/nutritionists-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      nutritionistService
        .deleteNutritionistService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Nutritionist Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/nutritionist-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/nutritionists-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();
      nutritionistService
        .deleteMultipleNutritionistServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Nutritionist Services are deleted successfully.`,
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
    "/importNutritionistServices",
    authRedirect(true),
    upload.single('nutritionists_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const nutritionistService = new NutritionistService();

      nutritionistService
        .importNutritionistService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Nutritionist Services are added successfully.`,
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