// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import ClassificationService from "../../services/classifications"
import Classifications from "../../db/models/classifications"

export default (app: Router) => {
  app.get(
    "/classifications/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      classificationService
        .getClassificationReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Classification Title": i.title ? i.title : '',
            "Classification Description": i.description ? i.description : '',
          }));
          return res.xls('ClassificationData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/classifications",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("classifications/index.ejs", {
        title: constants.PAGE_TITLE.CLASSIFICATION_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/classifications/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Classifications, req.query, {
        attributes: [
          "id",
          "title",
          "description"
        ],
        where: {is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/classification', authRedirect(true), async (req: Request, res: Response) => {
    res.render("classifications/classification.ejs", {
      title: constants.PAGE_TITLE.CLASSIFICATION_EDIT,
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.post(
    '/classification',
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Classification Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        order: Joi.string().optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      const requestClassificationData: any = {};

      requestClassificationData.title = req.body.title;
      requestClassificationData.description = req.body.description;
      requestClassificationData.order = req.body.order;
      requestClassificationData.created_by = req?.session?.user?.id;

      classificationService
        .addClassification(requestClassificationData)
        .then(() => {
          req.flash(
            'success',
            `Classification is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/classifications")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkClassificationTitle", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { title: req.body.title, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Classifications.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/classifications/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      classificationService
        .getClassification(+req.params.id)
        .then(async (responseData: any) => {
          res.render("classifications/classification.ejs", {
            title: constants.PAGE_TITLE.CLASSIFICATION_ADD,
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
    "/classification/update",
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Classification Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        order: Joi.string().optional(),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      const requestClassificationData: any = {};

      requestClassificationData.title = req.body.title;
      requestClassificationData.description = req.body.description;
      requestClassificationData.order = req.body.order;
      requestClassificationData.id = req.body.id;

      classificationService
        .updateClassification(requestClassificationData)
        .then(() => {
          req.flash(
            "success",
            `Classification is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/classifications")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/classifications/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      classificationService
        .deleteClassification(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Classification deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/classifications")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/classifications/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();
      classificationService
        .deleteMultipleClassifications(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Classifications are deleted successfully.`,
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
    "/importClassification",
    authRedirect(true),
    upload.single('classificationFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const classificationService = new ClassificationService();

      classificationService
        .importClassification(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Classifications are added successfully.`,
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