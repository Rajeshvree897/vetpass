// @ts-ignore:3
import { Router, Request, Response, NextFunction } from "express";

import { authRedirect } from "../middlewares/index";
import { celebrate, Joi } from "celebrate";
import PrivacyPolicyService from "../../services/privacy-policy";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/privacyPolicy",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const privacyPolicyService = new PrivacyPolicyService();

      privacyPolicyService
        .getPrivacyDetail()
        .then((responseData: any) => {          
          res.render("privacy-policy/index.ejs", {
            title: "Privacy Policy",
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
    "/privacyPolicy/update",
    celebrate({
      body: Joi.object({
        privacy_policy_contents: Joi.string()
          .optional()
          .error(new CustomError("Please enter valid policy contents")),
        id: Joi.optional()
      })
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.updated_by = req.session?.user.id;
      const privacyPolicyService = new PrivacyPolicyService();
      privacyPolicyService
        .updateprivacyPolicy(req.body)
        .then(() => {
          req.flash(
            'success',
            `Cookie Policy updated successfully.`,
            req,
            res
          );
          res.redirect('/admin/privacyPolicy');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
};
