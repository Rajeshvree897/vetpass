// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col, Op } from "sequelize"
const _ = require('lodash');
const AWS = require('aws-sdk');

import { authRedirect } from "../middlewares/index"
import Posts from "../../db/models/posts"
import PostService from "../../services/post"
import constants from "../../helpers/constants"
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"
import CommonService from "../../services/common"
import User from "../../db/models/user"
import { PostStatus } from "../../types/common";
import StrapiAdministrator from "../../db/models/strapi-administrator";
import multer from "multer";
import ReportPosts from "../../db/models/report-posts";
import ReportPostsReasons from "../../db/models/report-posts-reasons";
import ReportPostService from "../../services/report-post";
import PostLikes from "../../db/models/post-likes";
import upload from "../../helpers/file-upload";

export default (app: Router) => {
  app.get(
    "/import-export-posts",
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

      //  async function getImagesList(bucketName: any, folderPath: any) {
      //   const s3 = new AWS.S3();
      //   const params = {
      //     Bucket: bucketName,
      //     Prefix: folderPath
      //   };
      
      //   const response = await s3.listObjectsV2(params).promise();
      //   const imageList = [];
      
      //   // console.log("response >> ", JSON.stringify(response));
      //   // Process each object in the response
      //   for (const object of response.Contents) {
      //     const key = object.Key;
          
      //     // console.log(">>>", key);

      //     // Check if the object is an image
      //     if (key.match(/\.(jpg|jpeg|png|gif)$/i)) {
      //       imageList.push(key);
      //     } else if (object.Size === 0 && key.endsWith('/')) {
      //       // Object is a subfolder, recursively fetch its images
      //       console.log("subfolderImages", key);
      //       // const subfolderImages: any = await getImagesList(bucketName, key);
      //       // imageList.push(...subfolderImages);
      //     }
      //   }
      
      //   return imageList;
      // }

      

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

      res.render("posts/upload-list.ejs", {
        title: "Image list",
        userData: req.session && req.session.user ? req.session.user : null,
        files: files
      })
    }
  )

  app.get(
    "/downloadImageURLs",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
        const files: any = [];
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
        //  const result: any = await loadFilesFromS3();
        //  if (result && result.length) {
        //   result.map((i:any) => {
        //     if(i.Key !== 'temp/sample-uploads/') {
        //       const file = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${i.Key}`;
        //       files.push({url: file});
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
                if (i && i.Key && i.Key.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                  const file = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${i.Key}`;
                  files.push({url: file});
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
        .then(() => {
          console.log("Downloaded");
        })
        .catch(err => {
          console.error(err);
        });


        return res.xls('post-image-urls.xlsx', files);
    }
  )

  app.get(
    "/posts",
    authRedirect(true),
    (req: Request, res: Response) => {
      const commonService = new CommonService();

      res.render("posts/index.ejs", {
        title: "Post list",
        userData: req.session && req.session.user ? req.session.user : null,
        postStatusData: commonService.getPostStatus()
      })
    }
  )

  app.post(
    "/importPosts",
    authRedirect(true),
    upload.single('postFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const postsService = new PostService();

      postsService
        .importPosts(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Posts are added successfully.`,
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

  app.get('/post', authRedirect(true), (req: Request, res: Response) => {
    const commonService = new CommonService();

    res.render('posts/post.ejs', {
      title: constants.PAGE_TITLE.POST_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      privacyData: commonService.getPostPrivacy(),
      postStatusData: commonService.getPostStatus(),
    });
  });

  app.post(
    '/posts',
    multer().single('postMediaFile'),
    celebrate({
      body: Joi.object({
        privacy: Joi.string()
          .required()
          .error(new CustomError("Privacy is required")),
        hashtag: Joi.string().optional(),
        title: Joi.string()
          .required()
          .error(new CustomError("Title is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Post Status is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();


      const requestPostData: any = {};
      requestPostData.title = req.body.title;
      requestPostData.hashtag = req.body.hashtag;
      requestPostData.privacy = req.body.privacy;
      requestPostData.user_id = req?.session?.user?.id;
      requestPostData.status = PostStatus[req.body.status];
      requestPostData.is_admin = 1;
      requestPostData.created_by = req?.session?.user?.id;
      requestPostData.deep_link = null;

      postsService
        .addPost(requestPostData, req.file)
        .then(() => {
          req.flash(
            'success',
            `Post is created successfully.`,
            req,
            res
          );
          res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/posts/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      // Filters
      const statusValue = _.find(req.query.columns, { 'data': 'status' }).search.value;
      let where: any = {};
      if (statusValue != '') {
        where = { [Op.and]: [] };

        where[Op.and].push({
          status: PostStatus[statusValue] 
        });
      }
      if (req.query && req.query.search && req.query.search.value !== '') {
        if (statusValue != '') {
          where = { [Op.and]: [], [Op.or]: [] };
          
          where[Op.and].push({
            status: PostStatus[statusValue] 
          });
        } else {
          where = { [Op.or]: [] };
        }
        
        if (req.query.search['value'] != '') {
          where[Op.or].push(
            { title: { [Op.like]: `%${req.query.search.value}%` } },
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
      datatable(Posts, req.query, {
        attributes: [
          "id",
          "user_id",
          "privacy",
          "status",
          "title",
          'is_admin',
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name'],
          [Sequelize.fn('CONCAT', col('`admin`.`firstname`'), ' ', col('`admin`.`lastname`')), 'admin_name']
        ],
        include: [
          {
            model: User,
            as: "user",
            where: {
              '$Posts.is_admin$': 0
            },
            required: false,
            attributes: ['first_name', 'last_name']
          },
          {
            model: StrapiAdministrator,
            as: "admin",
            where: {
              '$Posts.is_admin$': 1
            },
            required: false,
            attributes: ['firstname', 'lastname']
          }
        ],
        where
      }).then((result: any) => {
        _.map(result.data, (post: any) => {
          post.status = PostStatus[post.status];
          return post;
        });

        result.status = statusValue;
        res.json(result);
      })
    }
  )

  app.get(
    "/posts/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();
      const commonService = new CommonService();

      postsService
        .getPost(+req.params.id)
        .then((responseData: any) => {
          responseData.status = PostStatus[responseData.status];

          res.render("posts/post.ejs", {
            title: constants.PAGE_TITLE.POST_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            privacyData: commonService.getPostPrivacy(),
            postStatusData: commonService.getPostStatus(),
            responseData,
            mime: typeof responseData==='object' && typeof responseData.PostMedia==='object' && responseData.PostMedia && responseData.PostMedia.UploadFile && responseData.PostMedia.UploadFile.mime
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/posts/update",
    multer().single('postMediaFile'),
    celebrate({
      body: Joi.object({
        privacy: Joi.optional(),
        hashtag: Joi.string().optional(),
        title: Joi.optional(),
        status: Joi.string()
          .required()
          .error(new CustomError("Post Status is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();
      const requestPostData: any = {};
      let requestPostFile: any = null;
      const currentUserId = req?.session?.user?.id;

      const postDataOld: any = await Posts.findOne({
        attributes: ["id", "user_id", "title"],
        where: { id: req.body.id }
      });

      if (postDataOld.user_id === currentUserId) {
        // User can update details if current login user is the post creator
        requestPostData.title = req.body.title;
        requestPostData.hashtag = req.body.hashtag;
        requestPostData.privacy = req.body.privacy;

        requestPostFile = req.file;
      }

      requestPostData.id = req.body.id;
      requestPostData.status = PostStatus[req.body.status];

      postsService
        .updatePost(requestPostData, requestPostFile)
        .then(() => {
          req.flash(
            "success",
            `Post is updated successfully.`,
            req,
            res
          )
          res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/posts/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();
      postsService
        .deletePost(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Post deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/posts")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/posts/:id/deletePostAndReportedPost",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();
      postsService
        .deletePost(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Post & Reported Post deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/report-posts")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/posts/:id/updateStatus",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postsService = new PostService();
      const requestPostData: any = {};

      requestPostData.id = req.params.id;
      requestPostData.status = PostStatus[req.body.status];

      postsService
        .updatePost(requestPostData, null)
        .then(() => {
          req.flash(
            "success",
            `Post is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/posts")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get("/posts/:id/likes/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj: any = {};
    whereObj = { 
      post_id: req.params.id, 
    }
    datatable(PostLikes, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "post_id",
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
        //   model: Posts,
        //   as: "postLikes",
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
