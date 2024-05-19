// @ts-ignore:3
import { Router, Request, Response, NextFunction } from "express";

import { authRedirect } from "../middlewares/index";
import { celebrate, Joi } from "celebrate";
import ContactUsService from "../../services/contact-us";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/contactUs",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const contactUsService = new ContactUsService();

      contactUsService
        .getContactDetail()
        .then((responseData: any) => {
          res.render("contact-us/index.ejs", {
            title: "Contact Us",
            userData: req.session && req.session.user ? req.session.user : null,
            responseData
          });
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post(
    "/contactUs/update",
    celebrate({
      body: Joi.object({
        contact_email: Joi.string()
          .required()
          .error(new CustomError("Contact Email is required")),
        contact_mobile: Joi.string()
          .required()
          .error(new CustomError("Contact Mobile is required")),
        contact_address: Joi.string()
          .required()
          .error(new CustomError("Contact Address is required")),
          compnay_name: Joi.string()
          .required()
          .error(new CustomError("Contact Compnay Name is required")),
        contact_about: Joi.string().error(new CustomError("Contact About must be string")),
        id: Joi.optional()
      })
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.updated_by = req.session?.user.id;
      const contactUsService = new ContactUsService();
      contactUsService
        .updateContactUs(req.body)
        .then(() => {
          req.flash(
            'success',
            `Contact Us updated successfully.`,
            req,
            res
          );
          res.redirect('/admin/contactUs');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
};
