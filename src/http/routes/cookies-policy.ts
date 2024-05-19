// @ts-ignore:3
import { Router, Request, Response, NextFunction } from "express";

import { authRedirect } from "../middlewares/index";
import { celebrate, Joi } from "celebrate";
import CookiePolicyService from "../../services/cookies-policy";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/cookiesPolicy",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const cookiePolicyService = new CookiePolicyService();

      cookiePolicyService
        .getCookieDetail()
        .then((responseData: any) => {          
          res.render("cookies-policy/index.ejs", {
            title: "Cookies Policy",
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
    "/cookiePolicy/update",
    celebrate({
      body: Joi.object({
        cookies_policy_contents: Joi.string()
          .optional()
          .error(new CustomError("Please enter valid policy contents")),
        id: Joi.optional()
      })
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.updated_by = req.session?.user.id;
      const cookiePolicyService = new CookiePolicyService();
      cookiePolicyService
        .updateCookiePolicy(req.body)
        .then(() => {
          req.flash(
            'success',
            `Cookie Policy updated successfully.`,
            req,
            res
          );
          res.redirect('/admin/cookiesPolicy');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
};
