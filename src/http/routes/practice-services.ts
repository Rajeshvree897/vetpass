// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import PracticeService from "../../services/practice-services"
import PracticeServices from "../../db/models/practice-services"

export default (app: Router) => {
  app.get(
    "/practice-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      practiceService
        .getPracticeServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Practice Service Name": i.name ? i.name : '',
          }));
          return res.xls('practiceServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/practice-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("practice-services/index.ejs", {
        title: constants.PAGE_TITLE.PRACTICE_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/practice-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(PracticeServices, req.query, {
        attributes: [
          "id",
          "name",
        ],
        where: { is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/practice-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("practice-services/practice-service.ejs", {
      title: constants.PAGE_TITLE.PRACTICE_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/practice-service',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Practice Service Name is required")),
        id: Joi.optional(),
        order: Joi.string().optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      const requestPracticeServiceData: any = {};

      requestPracticeServiceData.name = req.body.name;
      requestPracticeServiceData.order = req.body.order;
      requestPracticeServiceData.created_by = req?.session?.user?.id;

      practiceService
        .addPracticeService(requestPracticeServiceData)
        .then(() => {
          req.flash(
            'success',
            `Practice Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/practice-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkPracticeServicesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await PracticeServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/practice-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      practiceService
        .getPracticeService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("practice-services/practice-service.ejs", {
            title: constants.PAGE_TITLE.PRACTICE_SERVICE_ADD,
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
    "/practice-service/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Practice Service Name is required")),
        id: Joi.optional(),
        order: Joi.string().optional(),
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      const requestPracticeServiceData: any = {};

      requestPracticeServiceData.name = req.body.name;
      requestPracticeServiceData.order = req.body.order;
      requestPracticeServiceData.id = req.body.id;

      practiceService
        .updatePracticeService(requestPracticeServiceData)
        .then(() => {
          req.flash(
            "success",
            `Practice Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/practice-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/practice-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      practiceService
        .deletePracticeService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Practice Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/practice-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/practice-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();
      practiceService
        .deleteMultiplePracticeServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Practice Services are deleted successfully.`,
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
    "/importPracticeServices",
    authRedirect(true),
    upload.single('practice_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const practiceService = new PracticeService();

      practiceService
        .importPracticeService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Practice Services are added successfully.`,
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