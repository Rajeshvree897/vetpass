import FanPagePosts from "../db/models/fan-page-posts";
import UploadFile from "../db/models/upload-file";
import fs from "fs";
const AWS = require('aws-sdk');
import path from "path";
import crypto from "crypto";

import { validPostFileType, videoMimeTypes } from "../types/common";
import { CustomError } from "./error-service";
import { awsS3 } from "../helpers/aws-s3";
import UploadFileMorph from "../db/models/upload-file-morph";
import NotificationService from "./notification-service";
import csv from 'csvtojson';
import FanPages from "../db/models/fan-pages";

const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class FanPagePostService {
  constructor() { }

  async getFanPagePost(id: number): Promise<any> {
    return FanPagePosts.findOne({
      where: { id: id },
      include: [{
        model: UploadFileMorph,
        as: "PostMedia",
        required: false,
        attributes: ["id", "related_type"],
        where: { 'related_type': 'fan_page_posts' },
        include: [
          {
            model: UploadFile,
            as: "UploadFile",
            attributes: ["id", "url", 'ext', 'mime']
          },
        ]
      }]
    })
      .then((fanPagePost: any) => {
        return fanPagePost;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addFanPagePost(
    fanPagePost: FanPagePosts,
    file: any
  ): Promise<FanPagePosts> {
    let uploadFileData: UploadFile;
    let isVideo = false;
    let videoKey = '';
    let postOriginalStatus = fanPagePost.status;

    if (file) {
      if (!(typeof file === "object") || !validPostFileType.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      // Upload file on S3
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");
      const dateNow = Date.now();
      const originalExt = path.extname(file.originalname);
      const basename = path.basename(file.originalname, originalExt);
      let filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + originalExt;
      const key = `${uploadPath}/fan-page-posts/${filename}`;
      videoKey = key;
      let uploadFile = null;
      let ext = originalExt;
      let mimetype = file.mimetype;
      let fileSize = file.size;

      if (videoMimeTypes.includes(file.mimetype)) {
        isVideo = true;
        // fanPagePost.status = 2; // Set processing status for video
      }

      uploadFile = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading media");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: mimetype,
        size: fileSize,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: fanPagePost.user_id
      });
    }

    return FanPagePosts.create(fanPagePost)
      .then(async (fanPagePost) => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: fanPagePost.id,
            related_type: 'fan_page_posts',
            field: "file",
            order: 1
          });


          if(isVideo) { // Send video convert job
            const destinationFolder = `${uploadPath}/fan-page-posts/${uploadFileData.id}/`;
            const userMetaData = {
              id: `${uploadFileData.id}`,
              parentId: `${fanPagePost.id}`,
              parentTable: 'fan_page_posts',
              parentStatusField: 'status',
              parentStatusValue: `${postOriginalStatus}`,
              currentMediaKey: videoKey
            };
            awsS3.createVideoTranscodeJob(videoKey, destinationFolder, userMetaData);
          }
        }
        return fanPagePost;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateFanPagePost(
    fanPagePostData: FanPagePosts,
    file: any
  ) {
    let uploadFileData: UploadFile;
    let isVideo = false;
    let videoKey = '';
    let postOriginalStatus = fanPagePostData.status;

    if (file) {
      if (!(typeof file === "object") || !validPostFileType.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const fanPagePostDataOld: any = await FanPagePosts.findOne({
        attributes: ["id", "user_id"],
        where: { id: fanPagePostData.id },
        include: [{
          required: false,
          model: UploadFileMorph, as: "PostMedia", attributes: ["id", "related_type"],
          where: { 'related_type': 'fan_page_posts' },
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id"]
            }
          ]
        }]
      });

      // Upload file on S3
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");
      const dateNow = Date.now();
      const originalExt = path.extname(file.originalname);
      const basename = path.basename(file.originalname, originalExt);
      let filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + originalExt;
      const key = `${uploadPath}/fan-page-posts/${filename}`;
      videoKey = key;
      let uploadFile = null;
      let ext = originalExt;
      let mimetype = file.mimetype;
      let fileSize = file.size;

      if (videoMimeTypes.includes(file.mimetype)) {
        isVideo = true;
        // fanPagePostData.status = 2; // Set processing status for video
      }
      uploadFile = await awsS3.uploadPublicFileOnS3(file, key);

      if (!uploadFile) {
        throw new CustomError("Error while uploading media");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: mimetype,
        size: fileSize,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: fanPagePostDataOld.user_id
      });

      if (fanPagePostDataOld && fanPagePostDataOld.PostMedia && fanPagePostDataOld.PostMedia.UploadFile && fanPagePostDataOld.PostMedia.UploadFile.id) {
        const getKey = fanPagePostDataOld?.PostMedia?.UploadFile?.url.split(`/${uploadPath}/fan-page-posts/`);
        if (getKey) {
          await awsS3.deletePublicFileFromS3(`${uploadPath}/fan-page-posts/${getKey[1]}`);
          await UploadFileMorph.destroy({ where: { related_id: fanPagePostDataOld.id, related_type: 'fan_page_posts' } });
          await UploadFile.destroy({ where: { id: fanPagePostDataOld?.PostMedia?.UploadFile?.id } });
        }
      }
    }

    const fanPagePostDataOld: any = await FanPagePosts.findOne({
      attributes: ["status"],
      where: { id: fanPagePostData.id },
    });

    return FanPagePosts.update(fanPagePostData, { where: { id: fanPagePostData.id } })
      .then(async (post: any) => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: fanPagePostData.id,
            related_type: 'fan_page_posts',
            field: "file",
            order: 1
          });


          if(isVideo) { // Send video convert job
            const destinationFolder = `${uploadPath}/fan-page-posts/${uploadFileData.id}/`;
            const userMetaData = {
              id: `${uploadFileData.id}`,
              parentId: `${fanPagePostData.id}`,
              parentTable: 'fan_page_posts',
              parentStatusField: 'status',
              parentStatusValue: `${postOriginalStatus}`,
              currentMediaKey: videoKey
            };
            awsS3.createVideoTranscodeJob(videoKey, destinationFolder, userMetaData);
          }
        }

        if(fanPagePostDataOld.status === 0 || fanPagePostDataOld.status === 2 && typeof fanPagePostData.status === 'number' && fanPagePostData.status === 1) {
          const fanPagePostUserId = await FanPagePosts.findOne({ where: { id: fanPagePostData.id } });
        
          const notification = new NotificationService();
          let type = "approved_fan_page_post";
          let fanPagePostDescription = fanPagePostUserId?.description;

          if(fanPagePostDescription && fanPagePostDescription.length > 50) {
            let length = 50;
            fanPagePostDescription = fanPagePostDescription?.substring(0, length) + '...';
          }

          const notifyData = {
            id: fanPagePostData.id,
            description: fanPagePostDescription,
            user_id: fanPagePostUserId?.user_id
          }
          
          notification.getTokenAndSendNotificationFanPagePosts(notifyData, type)
        }
        return post;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteFanPagePost(id: number) {
    return FanPagePosts.update({ is_deleted: true },{ where: { id: id }, individualHooks: true })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importFanPagePosts(
    file: any,
    userId: number
  ): Promise<boolean> {
    const postData = await csv().fromFile(file.path);
    if(!postData) {
      throw new CustomError('Unable to import data');
    }

    if(!('url' in postData[0] && 'fan_page_name' in postData[0] && 'status' in postData[0] && 'fan_page_post_description' in postData[0])){
      throw new CustomError('Please set header as sample excel');
    }

    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET
    });

    const copyFile = (s3Params: any) => {
      return s3.copyObject(s3Params).promise();
    }

    const URLexists = (params: any) => {
      return s3
      .headObject(params)
      .promise()
      .then(
        () => true,
        (err:any) => err ? false : true
      );
    } 

    return Promise.all(postData.map(async (post: any) => {
      if (!post.url) {
        return;
      }
      const s3Key =  post.url.replace(`https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/`, '');
      const exist = await URLexists({
        Bucket: process.env.AWS_BUCKET,
        Key: s3Key,
      });
      if(!exist) {
        console.log(`${s3Key} is NOT EXISTS!`);
        return;
      }

      if(post && post.fan_page_name) {
        const fan_page_name = await FanPages.findOne({attributes:['id'], where: {title: post.fan_page_name}})
        post.fan_page_name = fan_page_name && fan_page_name.id ? fan_page_name.id : null;
      }
      
      if (post && post.status && post.status.toLowerCase() == "active") {
        post.status = "Active";
      } else if (post && post.status && post.status.toLowerCase() == "inactive") {
        post.status = "Inactive";
      }

      let uploadFileData: UploadFile;
      const fileKey = post.url.replace(`https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/temp/sample-uploads/`, '');

      const s3Params = {
        Bucket: process.env.AWS_BUCKET,
        CopySource: `${process.env.AWS_BUCKET}/temp/sample-uploads/${fileKey}`,
        Key: `${uploadPath}/fan-page-posts/${fileKey}`,
        ACL: 'public-read'
      };

      const fileDetail = await copyFile(s3Params);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${uploadPath}/fan-page-posts/${fileKey}`,
      };
      const { ContentType, ContentLength } = await s3.getObject(params).promise();
      await FanPagePosts.create({
        fan_page_id: post.fan_page_name,
        description: post.fan_page_post_description || null,
        user_id: 1,
        status: 1,
        is_admin: true,
        title: null,
        created_by: userId
      }).then(async (createdPost) => {
        const fileLocation = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${uploadPath}/fan-page-posts/${fileKey}`;
        const ext = fileKey.substr(fileKey.lastIndexOf('.'));
        const basename = fileKey.substr(0, fileKey.lastIndexOf('.'));

        // remove if upload file data already exist with same post-id
        const oldPost = await UploadFileMorph.findOne({where: {related_type: "fan_page_posts", related_id: createdPost.id}});
        if (oldPost && oldPost.id) {
          await UploadFileMorph.destroy({where: {id: oldPost.id}});
          await UploadFile.destroy({where: {id: oldPost.upload_file_id}});
        }

        uploadFileData = await UploadFile.create({
          name: fileKey,
          hash: `${basename}`,
          ext,
          mime: ContentType,
          size: ContentLength,
          url: fileLocation,
          provider: "aws-s3",
          created_by: userId
        });
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: createdPost.id,
            related_type: "fan_page_posts",
            field: "file",
            order: 1
          });
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    }).catch((err) => {
      console.log(err);
      throw new CustomError("Something went wrong")
    });
  }
}
