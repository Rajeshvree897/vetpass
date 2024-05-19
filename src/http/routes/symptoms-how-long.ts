// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import SymptomsHowLong from "../../db/models/symptoms-how-long"
import SymptomsHowLongService from "../../services/symptoms-how-long"

export default (app: Router) => {
  app.get(
    "/symptoms-how-long/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      symptomsHowLongService
        .getSymptomsHowLongReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Symptoms Duration": i.name ? i.name : '',
          }));
          return res.xls('symptomsHowLongData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/symptom-how-long",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("symptoms-how-long/index.ejs", {
        title: constants.PAGE_TITLE.SYMPTOMS_HOW_LONG_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/symptoms-how-long/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(SymptomsHowLong, req.query, {
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

  app.get('/symptoms-how-long', authRedirect(true), async (req: Request, res: Response) => {
    res.render("symptoms-how-long/symptoms-how-long.ejs", {
      title: constants.PAGE_TITLE.SYMPTOMS_HOW_LONG_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/symptoms-how-long',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Symptoms Duration is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      const requestSymptomsHowLongData: any = {};

      requestSymptomsHowLongData.name = req.body.name;
      requestSymptomsHowLongData.created_by = req?.session?.user?.id;

      symptomsHowLongService
        .addSymptomsHowLong(requestSymptomsHowLongData)
        .then(() => {
          req.flash(
            'success',
            `Symptoms Duration is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/symptom-how-long")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkSymptomsHowLong", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await SymptomsHowLong.count({ where: whereObj });
    return res.json({response: result});
  });
  

  app.get(
    "/symptoms-how-long/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      symptomsHowLongService
        .getSymptomsHowLong(+req.params.id)
        .then(async (responseData: any) => {
          res.render("symptoms-how-long/symptoms-how-long.ejs", {
            title: constants.PAGE_TITLE.SYMPTOMS_HOW_LONG_ADD,
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
    "/symptoms-how-long/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Symptoms Duration is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      const requestSymptomsHowLongData: any = {};

      requestSymptomsHowLongData.name = req.body.name;
      requestSymptomsHowLongData.id = req.body.id;

      symptomsHowLongService
        .updateSymptomsHowLong(requestSymptomsHowLongData)
        .then(() => {
          req.flash(
            "success",
            `Symptoms Duration is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/symptom-how-long")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/symptoms-how-long/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      symptomsHowLongService
        .deleteSymptomsHowLong(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Symptoms Duration deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/symptom-how-long")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/symptoms-how-long/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();
      symptomsHowLongService
        .deleteMultipleSymptomsHowLong(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Symptoms Durations are deleted successfully.`,
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
    "/importSymptomsHowLong",
    authRedirect(true),
    upload.single('file'),
    async (req: any, res: Response, next: NextFunction) => {
      const symptomsHowLongService = new SymptomsHowLongService();

      symptomsHowLongService
        .importSymptomsHowLong(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Symptoms Durations are imported successfully.`,
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