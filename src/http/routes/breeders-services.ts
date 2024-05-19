// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import BreedersService from "../../services/breeders-services"
import BreedersServices from "../../db/models/breeders-services"

export default (app: Router) => {
  app.get(
    "/breeders-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      breedersService
        .getBreederServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Breeder Service Name": i.service ? i.service : '',
          }));
          return res.xls('breederServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/breeder-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("breeders-services/index.ejs", {
        title: constants.PAGE_TITLE.BREEDER_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/breeders-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(BreedersServices, req.query, {
        attributes: [
          "id",
          "service",
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/breeder-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("breeders-services/breeders-service.ejs", {
      title: constants.PAGE_TITLE.BREEDER_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/breeder-service',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Breeder Service Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      const requestBreederServiceData: any = {};

      requestBreederServiceData.service = req.body.service;
      requestBreederServiceData.created_by = req?.session?.user?.id;

      breedersService
        .addBreederService(requestBreederServiceData)
        .then(() => {
          req.flash(
            'success',
            `Breeder Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/breeder-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkBreederServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { service: req.body.service };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await BreedersServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/breeders-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      breedersService
        .getBreederService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("breeders-services/breeders-service.ejs", {
            title: constants.PAGE_TITLE.BREEDER_SERVICE_ADD,
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
    "/breeders-service/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Breeder Service Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      const requestBreederServiceData: any = {};

      requestBreederServiceData.service = req.body.service;
      requestBreederServiceData.id = req.body.id;

      breedersService
        .updateBreederService(requestBreederServiceData)
        .then(() => {
          req.flash(
            "success",
            `Breeder Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/breeder-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/breeders-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      breedersService
        .deleteBreederService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Breeder Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/breeder-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/breeders-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();
      breedersService
        .deleteMultipleBreederServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Breeder Services are deleted successfully.`,
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
    "/importBreederServices",
    authRedirect(true),
    upload.single('breeders_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const breedersService = new BreedersService();

      breedersService
        .importBreederService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Breeder Services are added successfully.`,
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