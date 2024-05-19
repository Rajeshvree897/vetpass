// @ts-ignore:3
import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { authRedirect } from "../middlewares/index";
import ProfileService from "../../services/profile";
import constants from "../../helpers/constants";

export default (app: Router) => {
  app.get(
    "/adminProfile",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const profileService = new ProfileService();
      profileService
        .getAdminProfileById(req.session?.user.id)
        .then((responseData: any) => {
          res.render("profile/admin-profile.ejs", {
            title: constants.PAGE_TITLE.PROFILE,
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
    '/adminProfile',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.session?.user?.id;
      let reqData = req.body;
      const profileService = new ProfileService();
      const prepareUpdateReq = (reqData: any) => {
        if (
          reqData.password &&
          reqData.password ===
            reqData.confirmpassword
        ) {
          return bcrypt.hash(reqData.password, 10).then((hashPass: string) => {
            reqData.password = hashPass;
            return reqData;
          });
        } else {
          delete reqData.password;
          return reqData;
        }
      }
      reqData = await prepareUpdateReq(reqData);
      delete reqData.confirmpassword;

      profileService
        .updateAdminProfile(reqData, id)
        .then(() => {
          req.flash('success', 'Profile updated successfully', req, res);
          return res.redirect(req.get('referer') || '/');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/userProfile",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const profileService = new ProfileService();
      profileService
        .getUserProfileById(req.session?.user.id)
        .then((responseData: any) => {
          res.render("profile/user-profile.ejs", {
            title: constants.PAGE_TITLE.PROFILE,
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
    '/userProfile',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.session?.user?.id;
      let reqData = req.body;
      const profileService = new ProfileService();
      const prepareUpdateReq = (reqData: any) => {
        if (
          reqData.password &&
          reqData.password ===
            reqData.confirmpassword
        ) {
          return bcrypt.hash(reqData.password, 10).then((hashPass: string) => {
            reqData.password = hashPass;
            return reqData;
          });
        } else {
          delete reqData.password;
          return reqData;
        }
      }
      reqData = await prepareUpdateReq(reqData);
      delete reqData.confirmpassword;

      profileService
        .updateUserProfile(reqData, id)
        .then(() => {
          req.flash('success', 'Profile updated successfully', req, res);
          return res.redirect(req.get('referer') || '/');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
}
