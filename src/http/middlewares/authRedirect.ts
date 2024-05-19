import { Request, Response, NextFunction } from "express";
import config from "../../config";

export default (checkLogin = true) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // console.log(req.path);
    // const allowedThirdPartyCompanyRoutes = ["/subscriptionList", "/publishable-key"];
    // const user = req?.session?.user;
    // if (user && user.Role && user.Role.name && user && user.Role && user.Role.name == config.common.role.third_party_companies_role_name && !allowedThirdPartyCompanyRoutes.includes(req.path)) {
    //   console.log("return from here........");
    //   return res.redirect('/admin/subscriptionList');
    // }

    if (checkLogin && (!req.session || !req.session.user)) {
      req.flash('info', 'Sign in is required to access this page.', req, res);
      return res.redirect('/admin/login');
    }

    if (!checkLogin && req.session && req.session.user) {
      return res.redirect('/admin/dashboard');
    }

    next();
  }
};
