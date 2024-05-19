// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col } from "sequelize"
const _ = require('lodash');
import CommonService from "../../services/common"
import { authRedirect } from "../middlewares/index"
import User from "../../db/models/user"
import FanPages from "../../db/models/fan-pages";
import FanPagePosts from "../../db/models/fan-page-posts"
import FanPagePostService from "../../services/fan-page-post"
import constants from "../../helpers/constants"
import multer from "multer"
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"
import { PostStatus } from "../../types/common"
import { Op } from "sequelize"
import StrapiAdministrator from "../../db/models/strapi-administrator";
import FanPagePostLikes from "../../db/models/fan-page-post-likes";
import upload from "../../helpers/file-upload";
const AWS = require('aws-sdk');


export default (app: Router) => {
  app.get(
    "/import-export-fanpage-posts",
    authRedirect(true),
    async (req: Request, res: Response) => {

      let files: any = [];
      // function loadFilesFromS3() {
      //   const s3 = new AWS.S3({
      //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //     secretAccessKey: process.env.AWS_ACCESS_SECRET
      //   });

      //   const params = { 
      //     Bucket: `${process.env.AWS_BUCKET}`,
      //     Delimiter: '/',
      //     Prefix: 'temp/sample-uploads/'
      //   }
       
      //   var filesData = new Promise(function(resolve, reject){
      //    s3.listObjects(params, function(err: any, data: any) {
      //     if (err) { 
      //      return reject(err);
      //     }
       
      //     resolve(data.Contents);
      //    });
      //   });
       
      //   return filesData;
      //  }

      // const result: any = await loadFilesFromS3();
      // if (result && result.length) {
      //   result.map((i:any) => {
      //     if(i.Key !== 'temp/sample-uploads/') {
      //       const file = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${i.Key}`;
      //       files.push({key: file});
      //     }
      //   });
      // }

      async function getImagesList(bucketName: any, folderPath: any) {
        try {
          const s3 = new AWS.S3();
          const params = {
            Bucket: bucketName,
            Prefix: folderPath
          };
        
          const response = await s3.listObjectsV2(params).promise();
          const imageList: any = [];


          if (response && response.Contents && response.Contents.length) {
            await response.Contents.map(async (i: any) => {
              const count = (i.Key.split('/').length - 1);
              const category = i.Key && i.Key.split("/")[2] ? i.Key.split("/")[2] : "";
              const file = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${i.Key}`;
              if (i && i.Key && i.Key.match(/\.(jpg|jpeg|png|gif|webp)$/i) && count <= 2) {
                const keyExists = imageList.some((obj: any) => Object.prototype.hasOwnProperty.call(obj, 'files'));
                if (!keyExists) {
                  imageList.push({ files: [file] });
                } else {
                  imageList.forEach((obj: any) => {
                    if (obj.hasOwnProperty('files')) {
                      obj.files.push(file);
                    }
                  });
                }
              }  else if (i && i.Key && i.Key.match(/\.(jpg|jpeg|png|gif|webp)$/i) && count >= 3) {
                const keyExists = imageList.some((obj: any) => Object.prototype.hasOwnProperty.call(obj, category));
                if (!keyExists) {
                  imageList.push({ [`${category}`]: [file] });
                } else {
                  imageList.forEach((obj: any) => {
                    if (obj.hasOwnProperty(category.toString())) {
                      obj[category.toString()].push(file);
                    }
                  });
                }
              }
            });
          }
        
          return imageList;
        } catch (e) {
          console.log(e);
        }
      }

      const bucketName = process.env.AWS_BUCKET;
      const folderPath = 'temp/sample-uploads/';

      await getImagesList(bucketName, folderPath)
      .then(imageList => {
        files = imageList;
      })
      .catch(err => {
        console.error(err);
      });

      res.render("fan-pages/upload-list.ejs", {
        title: "Image list",
        userData: req.session && req.session.user ? req.session.user : null,
        files: files
      })
    }
  )

  app.post(
    "/importFanPagePosts",
    authRedirect(true),
    upload.single('postFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const fanPageService = new FanPagePostService();

      fanPageService
        .importFanPagePosts(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Fan Page Posts are added successfully.`,
            req,
            res
          )
          res.json({status:true})
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
        })
    }
  )
  
  app.get(
    "/fanPagePosts",
    authRedirect(true),
    async (req: Request, res: Response) => {
      
      const commonService = new CommonService();
      res.render("fan-pages/posts/index.ejs", {
        title: "Page post list",
        userData: req.session && req.session.user ? req.session.user : null,
        fanPages: await commonService.getFanPages(),
        postStatusData: commonService.getPostStatus(),
        fanPageQuery: req.query?.fanPage
      })
    }
  )

  app.get('/fanPagePost', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    const fanPageQuery = req.query?.fanPage
    res.render('fan-pages/posts/post.ejs', {
      title: constants.PAGE_TITLE.FAN_PAGE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      fanPages: await commonService.getFanPages(),
      postStatusData: commonService.getPostStatus(),
      fanPageQuery: parseInt(fanPageQuery)
    });
  });

  app.post(
    '/fanPagePosts',
    multer().single('postMediaFile'),
    celebrate({
      body: Joi.object({
        // title: Joi.string()
        //   .required()
        //   .error(new CustomError("Title is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Post Status is required")),
        fan_page_id: Joi.string()
          .required()
          .error(new CustomError("Fan Page is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Description is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPagePostService();
      const fanPageQuery = req.query?.fanPage

      const requestFanPagePostData: any = {};
      // requestFanPagePostData.title = req.body.title;
      requestFanPagePostData.fan_page_id = req.body.fan_page_id;
      requestFanPagePostData.user_id = req?.session?.user?.id;
      requestFanPagePostData.status = PostStatus[req.body.status];
      requestFanPagePostData.description = req.body.description;
      requestFanPagePostData.is_admin = 1;
      requestFanPagePostData.created_by = req?.session?.user?.id;

      fanPageService
        .addFanPagePost(requestFanPagePostData, req.file)
        .then(() => {
          req.flash(
            'success',
            `Fan Page Post is created successfully.`,
            req,
            res
          );
          fanPageQuery ? res.json({status: true, fanPage: fanPageQuery}) : res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/fanPagePosts/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      const statusValue = _.find(req.query.columns, { 'data': 'status' }).search.value;
      const fanPageTitle = _.find(req.query.columns, { 'data': 'fanPage.title' }).search.value;
      const fanPageQuery = req.query?.fanPage;
      let where: any = {};
      let whereObj: any = {};
      if(fanPageQuery != '')
      {
        whereObj = {
          [Op.and]: [
            { id: fanPageQuery }
          ]
        };
      } else {
        if (fanPageTitle != '') {
          whereObj = {
            [Op.and]: [
              { id: fanPageTitle }
            ]
          };
        }
        if (fanPageTitle == '0') {
          whereObj = {}
        }
      }
      if (statusValue != '') {
        where = { [Op.and]: [] };

        where[Op.and].push({
          status: PostStatus[statusValue] 
        });
      }
      if (statusValue == '0') {
        where = {}
      }
      if (req.query && req.query.search && req.query.search.value !== '') {
        if (statusValue != '' && statusValue !== '0') {
          where = { [Op.and]: [], [Op.or]: [] };
          
          where[Op.and].push({
            status: PostStatus[statusValue] 
          });
        } else {
          where = { [Op.or]: [] };
        }

        if (req.query.search['value'] != '') {
          where[Op.or].push(
            // { title: { [Op.like]: `%${req.query.search.value}%` } },
            { description: { [Op.like]: `%${req.query.search.value}%` } },
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('`user`.`first_name`'), ' ', Sequelize.col('`user`.`last_name`')), {
              [Op.like]: `%${req.query.search.value}%`
            }),
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('`admin`.`firstname`'), ' ', Sequelize.col('`admin`.`lastname`')), {
              [Op.like]: `%${req.query.search.value}%`
            }));
        }

        req.query.search['value'] = '';
      }
      where.is_deleted = null;
      datatable(FanPagePosts, req.query, {
        attributes: [
          "id",
          "user_id",
          // "title",
          "description",
          "status",
          "is_admin",
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name'],
          [Sequelize.fn('CONCAT', col('`admin`.`firstname`'), ' ', col('`admin`.`lastname`')), 'admin_name']
        ],
        include: [
          {
            model: User,
            as: "user",
            where: {
              '$FanPagePosts.is_admin$': 0
            },
            required: false,
            attributes: ['first_name', 'last_name']
          },
          {
            model: StrapiAdministrator,
            as: "admin",
            where: {
              '$FanPagePosts.is_admin$': 1
            },
            required: false,
            attributes: ['firstname', 'lastname']
          },
          {
            model: FanPages,
            as: "fanPage",
            attributes: ["title"],
            required: true,
            where: whereObj
          },
        ],
        where
      }).then((result: any) => {
        _.map(result.data, (fanPagePost: any) => {
          fanPagePost.status = PostStatus[fanPagePost.status];
          return fanPagePost;
        });
        
        result.status = statusValue;
        result.fanPage = fanPageQuery ? fanPageQuery : fanPageTitle;
        res.json(result);
      })
    }
  )

  app.get(
    "/fanPagePosts/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPagePostService();
      const commonService = new CommonService();
      const fanPageQuery = req.query?.fanPage;

      fanPageService
        .getFanPagePost(+req.params.id)
        .then(async (responseData: any) => {
          responseData.status = PostStatus[responseData.status];

          res.render("fan-pages/posts/post.ejs", {
            title: constants.PAGE_TITLE.FAN_PAGE_POST_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            fanPages: await commonService.getFanPages(),
            postStatusData: commonService.getPostStatus(),
            responseData,
            fanPageQuery,
            mime: typeof responseData==='object' && typeof responseData.PostMedia==='object' && responseData.PostMedia && responseData.PostMedia.UploadFile && responseData.PostMedia.UploadFile.mime
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/fanPagePosts/update",
    multer().single('postMediaFile'),
    celebrate({
      body: Joi.object({
        // title: Joi.optional(),
        fan_page_id: Joi.optional(),
        status: Joi.string()
          .required()
          .error(new CustomError("Fan Page Post Status is required")),
        description: Joi.string()
          .required()
          .error(new CustomError("Fan Page Post Description is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPagePostService();
      const requestFanPagePostData: any = {};
      let requestFanPagePostFile: any = null;
      const currentUserId = req?.session?.user?.id;
      const fanPageQuery = req.query?.fanPage

      const postDataOld: any = await FanPagePosts.findOne({
        attributes: ["id", "user_id"],
        where: { id: req.body.id }
      });

      if (postDataOld.user_id === currentUserId) {
        // User can update details if current login user is the fan page post creator
        // requestFanPagePostData.title = req.body.title;
        requestFanPagePostData.fan_page_id = req.body.fan_page_id

        requestFanPagePostFile = req.file;
      }

      requestFanPagePostData.id = req.body.id;
      requestFanPagePostData.status = PostStatus[req.body.status];
      requestFanPagePostData.description = req.body.description;

      fanPageService
        .updateFanPagePost(requestFanPagePostData, requestFanPagePostFile)
        .then(() => {
          req.flash(
            "success",
            `Fan Page Post is updated successfully.`,
            req,
            res
          )
          fanPageQuery ? res.json({status: true, fanPage: fanPageQuery}) : res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/fanPagePosts/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPageService = new FanPagePostService();
      const fanPageQuery = req.query?.fanPage
      fanPageService
        .deleteFanPagePost(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Fan Page Post deleted successfully.",
            req,
            res
          )
          fanPageQuery ? res.redirect(`/admin/fanPagePosts?fanPage=${fanPageQuery}`) : res.redirect("/admin/fanPagePosts")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get("/fanPagePosts/:id/likes/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj: any = {};
    whereObj = { 
      fan_page_post_id: req.params.id, 
    }
    datatable(FanPagePostLikes, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "fan_page_post_id",
        "user_id",
        "created_at"
      ],
      include: [
        {
          model: User,
          as: "user",
          required: true,
          attributes: ['id', 'email', "first_name", 'last_name']
        },
        // {
        //   model: FanPagePosts,
        //   as: "fanPagePostLikes",
        //   attributes: ['user_id'],
        //   where: {
        //     user_id: req?.session?.user?.id
        //   }
        // }
      ],
      where: whereObj
    }).then((result: any) => {
      res.json(result);
    });
  });
}
