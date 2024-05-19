// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import StoreClassificationService from "../../services/store-classifications"
import StoreClassifications from "../../db/models/store-classifications"

export default (app: Router) => {
  app.get(
    "/store-classifications/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      storeClassificationService
        .getClassificationReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Store Classification Title": i.title ? i.title : '',
            "Store Classification Description": i.description ? i.description : '',
            "Order": i.order ? i.order : ''
          }));
          return res.xls('StoreClassificationData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/store-classifications",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("store-classifications/index.ejs", {
        title: constants.PAGE_TITLE.STORE_CLASSIFICATION_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/store-classifications/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(StoreClassifications, req.query, {
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

  app.get('/store-classification', authRedirect(true), async (req: Request, res: Response) => {
    res.render("store-classifications/classification.ejs", {
      title: constants.PAGE_TITLE.STORE_CLASSIFICATION_EDIT,
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.post(
    '/store-classification',
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Store Classification Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Store Description is required")),
        order: Joi.string().optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      const requestClassificationData: any = {};

      requestClassificationData.title = req.body.title;
      requestClassificationData.description = req.body.description;
      requestClassificationData.order = req.body.order;
      requestClassificationData.created_by = req?.session?.user?.id;

      storeClassificationService
        .addClassification(requestClassificationData)
        .then(() => {
          req.flash(
            'success',
            `Store Classification is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/store-classifications")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkStoreClassificationTitle", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { title: req.body.title, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await StoreClassifications.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/store-classifications/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      storeClassificationService
        .getClassification(+req.params.id)
        .then(async (responseData: any) => {
          res.render("store-classifications/classification.ejs", {
            title: constants.PAGE_TITLE.STORE_CLASSIFICATION_ADD,
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
    "/store-classification/update",
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Store Classification Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Store Description is required")),
        order: Joi.string().optional(),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      const requestClassificationData: any = {};

      requestClassificationData.title = req.body.title;
      requestClassificationData.description = req.body.description;
      requestClassificationData.order = req.body.order;
      requestClassificationData.id = req.body.id;

      storeClassificationService
        .updateClassification(requestClassificationData)
        .then(() => {
          req.flash(
            "success",
            `Classification is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/store-classifications")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/store-classifications/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      storeClassificationService
        .deleteClassification(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Classification deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/store-classifications")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/store-classifications/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();
      storeClassificationService
        .deleteMultipleClassifications(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Store Classifications are deleted successfully.`,
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
    "/importStoreClassification",
    authRedirect(true),
    upload.single('classificationFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const storeClassificationService = new StoreClassificationService();

      storeClassificationService
        .importClassification(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Store Classifications are added successfully.`,
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