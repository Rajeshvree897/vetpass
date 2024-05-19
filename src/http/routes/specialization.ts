// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import Specialization from "../../db/models/specialization"
import SpecializationService from "../../services/specialization"

export default (app: Router) => {
  app.get(
    "/specializations/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      specializationService
        .getSpecializationReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Specialization Name": i.name ? i.name : ''
          }));
          return res.xls('specializationData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/specializations",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("specializations/index.ejs", {
        title: constants.PAGE_TITLE.SPECIALIZATION_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/specializations/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Specialization, req.query, {
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

  app.get('/specialization', authRedirect(true), async (req: Request, res: Response) => {
    res.render("specializations/specialization.ejs", {
      title: constants.PAGE_TITLE.SPECIALIZATION_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/specialization',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Specialization Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      const requestSpecializationData: any = {};

      requestSpecializationData.name = req.body.name;
      requestSpecializationData.created_by = req?.session?.user?.id;

      specializationService
        .addSpecialization(requestSpecializationData)
        .then(() => {
          req.flash(
            'success',
            `Specialization is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/specializations")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkSpecializationName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Specialization.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/specializations/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      specializationService
        .getSpecialization(+req.params.id)
        .then(async (responseData: any) => {
          res.render("specializations/specialization.ejs", {
            title: constants.PAGE_TITLE.SPECIALIZATION_ADD,
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
    "/specialization/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Specialization Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      const requestSpecializationData: any = {};

      requestSpecializationData.name = req.body.name;
      requestSpecializationData.id = req.body.id;

      specializationService
        .updateSpecialization(requestSpecializationData)
        .then(() => {
          req.flash(
            "success",
            `Specialization is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/specializations")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/specializations/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      specializationService
        .deleteSpecialization(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Specialization deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/specializations")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/specializations/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();
      specializationService
        .deleteMultipleSpecializations(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Specializations are deleted successfully.`,
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
    "/importSpecialization",
    authRedirect(true),
    upload.single('specializationFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const specializationService = new SpecializationService();

      specializationService
        .importSpecialization(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Specializations are added successfully.`,
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