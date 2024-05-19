// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import TherapistsService from "../../services/therapists-services"
import TherapistsServices from "../../db/models/therapists-services"

export default (app: Router) => {
  app.get(
    "/therapists-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      therapistsService
        .getTherapistServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Therapist Service Name": i.service ? i.service : '',
          }));
          return res.xls('therapistServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/therapist-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("therapists-services/index.ejs", {
        title: constants.PAGE_TITLE.THERAPIST_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/therapists-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(TherapistsServices, req.query, {
        attributes: [
          "id",
          "service",
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/therapist-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("therapists-services/therapists-service.ejs", {
      title: constants.PAGE_TITLE.THERAPIST_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/therapist-service',
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Therapist Service Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      const requestTherapistServiceData: any = {};

      requestTherapistServiceData.service = req.body.service;
      requestTherapistServiceData.created_by = req?.session?.user?.id;

      therapistsService
        .addTherapistService(requestTherapistServiceData)
        .then(() => {
          req.flash(
            'success',
            `Therapist Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/therapist-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkTherapistServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { service: req.body.service };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await TherapistsServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/therapists-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      therapistsService
        .getTherapistService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("therapists-services/therapists-service.ejs", {
            title: constants.PAGE_TITLE.THERAPIST_SERVICE_ADD,
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
    "/therapists-service/update",
    celebrate({
      body: Joi.object({
        service: Joi.string()
          .required()
          .error(new CustomError("Therapist Service Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      const requestTherapistServiceData: any = {};

      requestTherapistServiceData.service = req.body.service;
      requestTherapistServiceData.id = req.body.id;

      therapistsService
        .updateTherapistService(requestTherapistServiceData)
        .then(() => {
          req.flash(
            "success",
            `Therapist Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/therapist-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/therapists-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      therapistsService
        .deleteTherapistService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Therapist Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/therapist-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/therapists-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();
      therapistsService
        .deleteMultipleTherapistServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Therapist Services are deleted successfully.`,
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
    "/importTherapistServices",
    authRedirect(true),
    upload.single('therapists_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const therapistsService = new TherapistsService();

      therapistsService
        .importTherapistService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Therapist Services are added successfully.`,
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