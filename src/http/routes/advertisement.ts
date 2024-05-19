// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { celebrate, Joi } from "celebrate";
import multer from 'multer';
const _ = require('lodash');
import { Sequelize} from "sequelize";

import AdvertisementServices from "../../services/advertisement"
import { authRedirect } from "../middlewares/index";
import CommonService from "../../services/common";
import constants from "../../helpers/constants";
import { CustomError } from "../../services/error-service";
import ProfileService from "../../services/profile";
import Advertisements from "../../db/models/advertisement";
import User from "../../db/models/user";
import UploadFileMorph from "../../db/models/upload-file-morph";
import UploadFile from "../../db/models/upload-file";

export default (app: Router) => {
  app.get(
    "/advertisements",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("advertisements/index.ejs", {
        title: "Advertisement list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/advertisement', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    const subscriptionQuery = req.query?.subscriptionId
    if(req.query["country"]) {
      return res.json(await commonService.getStates(req.query["country"]));
    }
    return res.render('advertisements/advertisement.ejs', {
      title: constants.PAGE_TITLE.ADVERTISEMENT_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      users: await commonService.getServiceProviders(),
      countryData: await commonService.getCountries(),
      subscriptionQuery: Number(subscriptionQuery)
    });
  });

  app.post(
    '/advertisements',
    authRedirect(true),
    multer().single('advertisementImage'),
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Advertisement title is required")),
        text: Joi.string().optional(),
        website: Joi.string()
          .required()
          .error(new CustomError("Website is required")),
        id: Joi.optional(),
        subscription_history: Joi.string()
          .required()
          .error(new CustomError("Subscription id is required")),
        user_id: Joi.optional(),
        country: Joi.optional(),
        state: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const advertisementServices = new AdvertisementServices();
      advertisementServices
        .addAdvertisement(req.body, req.session?.user.id, req.file)
        .then(() => {
          req.flash(
            'success',
            `Advertisement is created successfully.`,
            req,
            res
          );
          const url = req.headers.referer?.includes("/advertisement?subscriptionId") ? "/admin/advertisement-subscriptions" : "/admin/advertisements";
          res.json({status: true, url})
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/advertisements/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      datatable(Advertisements, req.query, {
        distinct: true,
        col: 'id',
        attributes: [
          "id",
          "text",
          [Sequelize.col("banner.UploadFile.url"), "icon"],
        ],
        include: [
          { model: UploadFileMorph , as: "banner", attributes: [ "id", "related_type"],
          where: {'related_type': 'advertisements' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id"]
            }
          ]},
          {
            model: User, as: "serviceProvider", attributes: ['id', "first_name", 'last_name']
          }
        ],
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get(
    "/advertisements/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const advertisementServices = new AdvertisementServices();
      const commonService = new CommonService();
      const profileService = new ProfileService();
      const advertisementId = req.params.id;
      
      advertisementServices
        .getAdvertisement(+req.params.id)
        .then(async (responseData: any) => {
          res.render("advertisements/advertisement.ejs", {
            title: constants.PAGE_TITLE.ADVERTISEMENT_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            advertisementId,
            users: await commonService.getServiceProviders(),
            countryData: await commonService.getCountries(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/advertisement-details",
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
    const advertisementServices = new AdvertisementServices();
    const commonService = new CommonService();
    const advertisement = await commonService.getAdvertisement(req.session?.user.id);

    // advertisementServices
    //   .getAdvertisement(advertisement?.id)
    //   .then(async (responseData: any) => {
    //     res.render("advertisements/advertisement-create.ejs", {
    //       responseData: responseData,
    //       title: advertisement && advertisement.id ? constants.PAGE_TITLE.ADVERTISEMENT_EDIT : constants.PAGE_TITLE.ADVERTISEMENT_ADD,
    //       userData: req.session && req.session.user ? req.session.user : null,
    //       advertisementId: advertisement?.id,
    //       users: await commonService.getServiceProviders(),
    //       countryData: await commonService.getCountries(),
    //     })
    //   })
    //   .catch((error: Error) => {
    //     return next(error)
    //   })

      advertisementServices
        .getAdvertisement(advertisement?.id)
        .then(async (responseData: any) => {
          res.render("advertisements/advertisement.ejs", {
            title: constants.PAGE_TITLE.ADVERTISEMENT_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            advertisementId: advertisement?.id,
            users: await commonService.getServiceProviders(),
            countryData: await commonService.getCountries(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })

    }
  )

  app.post(
    "/advertisements/update",
    multer().single('advertisementImage'),
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Advertisement title is required")),
        text: Joi.string().optional(),
        website: Joi.string()
          .required()
          .error(new CustomError("Website is required")),
        id: Joi.optional(),
        subscription_history: Joi.optional(),
        user_id: Joi.optional(),
        country: Joi.optional(),
        state: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const advertisementServices = new AdvertisementServices();

      advertisementServices
        .updateAdvertisement(req.body, req.session?.user.id, req.file)
        .then(() => {
          req.flash(
            "success",
            `Advertisement is updated successfully.`,
            req,
            res
          )
          // const url = req.headers.referer?.includes("/advertisement-details") ? "/admin/advertisement-details" : "/admin/advertisements";
          const url = `/admin/advertisements/${req.body.id}`;
          return res.json({ status: true, url })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/advertisements/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const advertisementServices = new AdvertisementServices();
      advertisementServices
        .deleteAdvertisements(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Advertisement deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/advertisements")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

}
