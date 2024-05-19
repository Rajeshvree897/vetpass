// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";

import { authRedirect } from "../middlewares/index";
import CmsService from "../../services/cms";
import constants from "../../helpers/constants";
import { celebrate, Joi } from "celebrate";
import Cms from "../../db/models/cms";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/cms",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("cms/index.ejs", {
        title: "CMS list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/cms', authRedirect(true), async (req: Request, res: Response) => {
    res.render('cms/cms.ejs', {
      title: constants.PAGE_TITLE.CMS_EDIT,
      userData: req.session && req.session.user ? req.session.user : null
    });
  });


  app.get(
    "/cms/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Cms, req.query, {}).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get(
    "/cms/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const cmsService = new CmsService();

      cmsService
        .getCMS(+req.params.id)
        .then(async (responseData: any) => {
          res.render("cms/cms.ejs", {
            title: constants.PAGE_TITLE.CMS_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/cms/update",
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .optional()
          .error(new CustomError("Title is required")),
        description: Joi.string()
            .optional()
            .error(new CustomError("Description is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const cmsService = new CmsService();
      cmsService
        .updateCMS(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `${req.body.title} is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/cms")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
