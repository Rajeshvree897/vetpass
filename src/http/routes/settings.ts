// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { authRedirect } from "../middlewares/index";
import SettingService from "../../services/settings";
import constants from "../../helpers/constants";
import { celebrate, Joi } from "celebrate";
import { CustomError } from "../../services/error-service";
import Settings from "../../db/models/settings";

export default (app: Router) => {
  app.get(
    "/settings",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("settings/index.ejs", {
        title: "Setting list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/settings/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Settings, req.query, {}).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get(
    "/settings/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const settingService = new SettingService();

      settingService
        .getSetting(+req.params.id)
        .then(async (responseData: any) => {
          res.render("settings/setting.ejs", {
            title: constants.PAGE_TITLE.SETTING_EDIT,
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
    "/settings/update",
    celebrate({
      body: Joi.object({
        current_version: Joi.string()
            .optional()
            .error(new CustomError("Current version is required")),
        minimum_version: Joi.string()
            .optional()
            .error(new CustomError("Minimum version is required")),
        base_url: Joi.string()
            .optional()
            .error(new CustomError("Base URL is required")),
        platform_type: Joi.optional(),
        app_name: Joi.optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const settingService = new SettingService();
      const requestSettingData: any = {};
      console.log(requestSettingData)
      requestSettingData.current_version = req.body.current_version;
      requestSettingData.minimum_version = req.body.minimum_version;
      requestSettingData.base_url = req.body.base_url;
      requestSettingData.id = req.body.id;
      requestSettingData.updated_by = req.session?.user.id;

      settingService
        .updateSetting(requestSettingData)
        .then(() => {
          req.flash(
            "success",
            `Setting is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/settings")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
