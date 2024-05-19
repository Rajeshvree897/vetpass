// @ts-ignore:3
import { Router, Request, Response, NextFunction } from "express";

import { authRedirect } from "../middlewares/index";
import { celebrate, Joi } from "celebrate";
import TermsAndConditionsService from "../../services/terms-condition";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/termsCondition",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const termsAndConditionsService = new TermsAndConditionsService();

      termsAndConditionsService
        .getTermsAndConditionsDetail()
        .then((responseData: any) => {          
          res.render("terms-conditions/index.ejs", {
            title: "Terms & Condition",
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
    "/termsCondition/update",
    celebrate({
      body: Joi.object({
        terms_and_condition_contents: Joi.string()
          .optional()
          .error(new CustomError("Please enter valid contents")),
        id: Joi.optional()
      })
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.updated_by = req.session?.user.id;
      const termsAndConditionsService = new TermsAndConditionsService();
      termsAndConditionsService
        .updateTermsAndConditions(req.body)
        .then(() => {
          req.flash(
            'success',
            `Cookie Policy updated successfully.`,
            req,
            res
          );
          res.redirect('/admin/termsCondition');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
};
