// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import PractitionerLiabilities from "../../services/practitioner-liabilities"
import PractitionerLiability from "../../db/models/practitioner-liability"

export default (app: Router) => {
  app.get(
    "/practitioner-liabilities/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      practitionerLiability
        .getPractitionerLiabilityReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Practitioner Liability Name": i.name ? i.name : '',
          }));
          return res.xls('practitionerLiabilityData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/practitioner-liabilities",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("practitioner-liabilities/index.ejs", {
        title: constants.PAGE_TITLE.PRACTITIONER_LIABILITY_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/practitioner-liabilities/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(PractitionerLiability, req.query, {
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

  app.get('/practitioner-liability', authRedirect(true), async (req: Request, res: Response) => {
    res.render("practitioner-liabilities/practitioner-liability.ejs", {
      title: constants.PAGE_TITLE.PRACTITIONER_LIABILITY_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/practitioner-liability',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Practitioner Liability Name is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      const requestPractitionerLiabilityData: any = {};

      requestPractitionerLiabilityData.name = req.body.name;
      requestPractitionerLiabilityData.created_by = req?.session?.user?.id;

      practitionerLiability
        .addPractitionerLiability(requestPractitionerLiabilityData)
        .then(() => {
          req.flash(
            'success',
            `Practitioner Liability is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/practitioner-liabilities")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkpractitionerLiabilitiesName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await PractitionerLiability.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/practitioner-liabilities/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      practitionerLiability
        .getPractitionerLiability(+req.params.id)
        .then(async (responseData: any) => {
          res.render("practitioner-liabilities/practitioner-liability.ejs", {
            title: constants.PAGE_TITLE.PRACTITIONER_LIABILITY_ADD,
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
    "/practitioner-liability/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Practitioner Liability Name is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      const requestPractitionerLiabilityData: any = {};

      requestPractitionerLiabilityData.name = req.body.name;
      requestPractitionerLiabilityData.id = req.body.id;

      practitionerLiability
        .updatePractitionerLiability(requestPractitionerLiabilityData)
        .then(() => {
          req.flash(
            "success",
            `Practitioner Liability is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/practitioner-liabilities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/practitioner-liabilities/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      practitionerLiability
        .deletePractitionerLiability(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Practitioner Liability deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/practitioner-liabilities")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/practitioner-liabilities/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      practitionerLiability
        .deleteMultiplePractitionerLiabilities(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Practitioner Liabilities are deleted successfully.`,
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
    "/importPractitionerLiabilities",
    authRedirect(true),
    upload.single('practitioner_liabilityFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const practitionerLiability = new PractitionerLiabilities();
      console.log('treu')
      practitionerLiability
        .importPractitionerLiability(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Practitioner Liabilities are added successfully.`,
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