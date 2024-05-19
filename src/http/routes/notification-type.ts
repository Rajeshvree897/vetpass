// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"

import { authRedirect } from "../middlewares/index"
import NotificationType from "../../db/models/notification-type"
import NotificationTypeService from "../../services/notification-type"
import constants from "../../helpers/constants"
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"

export default (app: Router) => {
  app.get(
    "/notificationTypes",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("notification-types/index.ejs", {
        title: "Notification Type list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/notificationType', authRedirect(true), (req: Request, res: Response) => {
    res.render('notification-types/notification-type.ejs', {
      title: constants.PAGE_TITLE.NOTIFICATION_TYPE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/notificationTypes',
    celebrate({
      body: Joi.object({
        type: Joi.string()
          .required()
          .error(new CustomError("Notification Type is required")),
        type_description: Joi.string().allow('', null)
          .error(new CustomError("Enter valid description")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const notificationTypeService = new NotificationTypeService();
      notificationTypeService
        .addNotificationType(req.body)
        .then(() => {
          req.flash(
            'success',
            `Notification Type is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/notificationTypes');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/notificationTypes/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(NotificationType, req.query, {}).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/notificationTypes/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const notificationTypeService = new NotificationTypeService();

      notificationTypeService
        .getNotificationType(+req.params.id)
        .then((responseData: any) => {
          res.render("notification-types/notification-type.ejs", {
            title: constants.PAGE_TITLE.NOTIFICATION_TYPE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/notificationTypes/update",
    celebrate({
      body: Joi.object({
        type: Joi.string()
          .required()
          .error(new CustomError("Notification Type is required")),
        type_description: Joi.string().allow('', null)
          .error(new CustomError("Enter valid description")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const notificationTypeService = new NotificationTypeService();

      notificationTypeService
        .updatenotificationType(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Notification Type is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/notificationTypes")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/notificationTypes/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const notificationTypeService = new NotificationTypeService();
      notificationTypeService
        .deleteNotificationType(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Notification Type deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/notificationTypes")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
