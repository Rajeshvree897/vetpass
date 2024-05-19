// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import Specialities from "../../db/models/specialities"
import SpecialityService from "../../services/specialities"

export default (app: Router) => {
  app.get(
    "/specialities/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      specialityService
        .getSpecialityReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Speciality Name": i.name ? i.name : '',
            "Sort ID": i.sort_id ? i.sort_id : '',
          }));
          return res.xls('specialityData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/specialities",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("specialities/index.ejs", {
        title: constants.PAGE_TITLE.SPECIALITY_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/specialities/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Specialities, req.query, {
        attributes: [
          "id",
          "name",
        ],
        where: {is_deleted: null}
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/speciality', authRedirect(true), async (req: Request, res: Response) => {
    res.render("specialities/speciality.ejs", {
      title: constants.PAGE_TITLE.SPECIALITY_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/speciality',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Speciality Name is required")),
        // sort_id: Joi.number()
        //   .required()
        //   .error(new CustomError("Sort ID is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      const requestSpecialityData: any = {};

      requestSpecialityData.name = req.body.name;
      requestSpecialityData.sort_id = 0;
      requestSpecialityData.created_by = req?.session?.user?.id;

      specialityService
        .addSpeciality(requestSpecialityData)
        .then(() => {
          req.flash(
            'success',
            `Speciality is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/specialities")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkSpecialityName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Specialities.count({ where: whereObj });
    return res.json({response: result});
  });
  
  app.post("/checkSpecialitySortID", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { sort_id: req.body.sort_id };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Specialities.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/specialities/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      specialityService
        .getSpeciality(+req.params.id)
        .then(async (responseData: any) => {
          res.render("specialities/speciality.ejs", {
            title: constants.PAGE_TITLE.SPECIALITY_ADD,
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
    "/speciality/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Speciality Name is required")),
        sort_id: Joi.number()
          .required()
          .error(new CustomError("Sort ID is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      const requestSpecialityData: any = {};

      requestSpecialityData.name = req.body.name;
      requestSpecialityData.sort_id = req.body.sort_id;
      requestSpecialityData.id = req.body.id;

      specialityService
        .updateSpeciality(requestSpecialityData)
        .then(() => {
          req.flash(
            "success",
            `Speciality is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/specialities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/specialities/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      specialityService
        .deleteSpeciality(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Speciality deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/specialities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/specialities/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();
      specialityService
        .deleteMultipleSpecialities(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Specialities are deleted successfully.`,
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
    "/importSpeciality",
    authRedirect(true),
    upload.single('specialityFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const specialityService = new SpecialityService();

      specialityService
        .importSpeciality(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Specialities are added successfully.`,
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