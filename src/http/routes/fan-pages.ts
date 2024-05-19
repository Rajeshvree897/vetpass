// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col } from "sequelize"
import { authRedirect } from "../middlewares/index"
import User from "../../db/models/user"
import FanPages from "../../db/models/fan-pages";
import UploadFileMorph from "../../db/models/upload-file-morph";
import UploadFile from "../../db/models/upload-file";
import FanPageService from "../../services/fan-page";
import constants from "../../helpers/constants"
import CommonService from "../../services/common";
import FanPageFollowers from "../../db/models/fan-page-followers"
import { CustomError } from "../../services/error-service"
import multer = require("multer")
import { celebrate, Joi } from "celebrate"
import { Op } from "sequelize"

export default (app: Router) => {
  app.post("/checkFanPageName", authRedirect(true), async (req: Request, res: Response) => {
    let result;
    const whereObj:any = { title: req.body.title };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    result = await FanPages.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/fanPages",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("fan-pages/index.ejs", {
        title: "Page list",
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/fanPages/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let where: any = {};
      datatable(FanPages, req.query, {
        attributes: [
          "id",
          "user_id",
          "title",
          "website",
          "email",
          "mobile",
          "status",
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name'],
        ],
        include: [
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name']
          }
        ], 
        where : { is_deleted : null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/fanPage', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    res.render("fan-pages/fan-page.ejs", {
      title: constants.PAGE_TITLE.FAN_PAGE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      countryData: await commonService.getCountries(),
    });
  });

  app.post(
    '/fanPage',
    multer().fields(
      [
        { 
          name: 'fanPageImage', 
          maxCount: 1 
        }, 
        { 
          name: 'fanPageBannerImage', 
          maxCount: 1 
        }
      ]
    ),
    celebrate({
      body: Joi.object({
        title: Joi.string()
          .required()
          .error(new CustomError("Title is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Status is required")),
        website: Joi.string()
          .required()
          .error(new CustomError("Website is required")),
        email: Joi.string()
          .required()
          .error(new CustomError("Email is required")),
        int_code: Joi.optional()
          .required()
          .error(new CustomError("Int code is required")),
        mobile: Joi.string()
          .required()
          .error(new CustomError("Mobile number is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPageService();

      const requestFanPageData: any = {};
      const requestFanPageFilesData: any = {};

      requestFanPageData.title = req.body.title;
      requestFanPageData.description = req.body.description;
      requestFanPageData.website = req.body.website;
      requestFanPageData.email = req.body.email;
      requestFanPageData.int_code = req.body.int_code;
      requestFanPageData.mobile = req.body.mobile;
      requestFanPageData.user_id = req?.session?.user?.id;
      requestFanPageData.status = req.body.status;
      requestFanPageData.is_admin = 1;
      requestFanPageData.created_by = req?.session?.user?.id;

      const Files: any = req.files;
      if(Files) {
        if('fanPageImage' in Files){
          requestFanPageFilesData.FanPageImage = Files?.fanPageImage[0];
        }
        if('fanPageBannerImage' in Files){
          requestFanPageFilesData.FanPageBannerImage = Files?.fanPageBannerImage[0];
        } 
      }
      fanPageService
        .addFanPage(requestFanPageData, requestFanPageFilesData)
        .then(() => {
          req.flash(
            'success',
            `Page is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/fanPages")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/fanPages/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPagesService = new FanPageService();
      const commonService = new CommonService();

      fanPagesService
        .getFanPage(+req.params.id)
        .then(async (responseData: any) => {
          res.render("fan-pages/fan-page.ejs", {
            title: constants.PAGE_TITLE.FAN_PAGE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            countryData: await commonService.getCountries(responseData.int_code, true),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  );

  app.post(
    "/fanPage/update",
    multer().fields(
      [
        { 
          name: 'fanPageImage', 
          maxCount: 1 
        }, 
        { 
          name: 'fanPageBannerImage', 
          maxCount: 1 
        }
      ]
    ),
    celebrate({
      body: Joi.object({
        title: Joi.optional(),
        description: Joi.optional(),
        website: Joi.optional(),
        email: Joi.optional(),
        int_code: Joi.optional(),
        mobile: Joi.optional(),
        status: Joi.string()
          .required()
          .error(new CustomError("Post Status is required")),
        id: Joi.optional().required(),
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPageService();
      const requestPostData: any = {};
      const requestFanPageFilesData: any = {};

      const currentUserId = req?.session?.user?.id;

      const fanPageOldData: any = await FanPages.findOne({
        attributes: ["id", "user_id"],
        where: { id: req.body.id }
      });

      if (fanPageOldData.user_id === currentUserId) {
        // User can update details if current login user is the page creator
        requestPostData.title = req.body.title;
        requestPostData.description = req.body.description;
        requestPostData.website = req.body.website;
        requestPostData.email = req.body.email;
        requestPostData.int_code = req.body.int_code;
        requestPostData.mobile = req.body.mobile;
        
        const Files: any = req.files;
        if(Files) {
          if('fanPageImage' in Files){
            requestFanPageFilesData.FanPageImage = Files?.fanPageImage[0];
          }
          if('fanPageBannerImage' in Files){
            requestFanPageFilesData.FanPageBannerImage = Files?.fanPageBannerImage[0];
          } 
        }
      }

      requestPostData.id = req.body.id;
      requestPostData.status = req.body.status;

      fanPageService
        .updateFanPage(requestPostData, requestFanPageFilesData)
        .then(() => {
          req.flash(
            "success",
            `Page is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/fanPages")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/fanPages/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPageService();
      fanPageService
        .deleteFanPage(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Page deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/fanPages")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get("/fanPages/:id/followers/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj: any = {};
    whereObj = { 
      fan_page_id: req.params.id, 
      status: 1,
      is_deleted: null
    }
    datatable(FanPageFollowers, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "fan_page_id",
        "follower_id",
        "created_at"
      ],
      include: [
        {
          model: User,
          as: "user",
          required: true,
          attributes: ['id', 'email', "first_name", 'last_name']
        }
      ],
      where: whereObj
    }).then((result: any) => {
      res.json(result);
    });
  });
}
