import crypto from "crypto";
import path from "path";
import fs from "fs";
const AWS = require('aws-sdk');

import Posts from "../db/models/posts";
import UploadFileMorph from "../db/models/upload-file-morph";
import UploadFile from "../db/models/upload-file";
import { validPostFileType, videoMimeTypes, PostStatus } from "../types/common";
import { awsS3 } from "../helpers/aws-s3";
import { CustomError } from "./error-service";
import PostComments from "../db/models/post-comments";
import PostLikes from "../db/models/post-likes";
import NotificationService from "./notification-service";
import csv from 'csvtojson';
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class PostService {
  constructor() { }

  async getPost(id: number): Promise<any> {
    return Posts.findOne({
      where: { id: id },
      include: [{
        model: UploadFileMorph,
        as: "PostMedia",
        required: false,
        attributes: ["id", "related_type"],
        where: { 'related_type': 'posts' },
        include: [
          {
            model: UploadFile,
            as: "UploadFile",
            attributes: ["id", "url", 'ext', 'mime']
          }
        ]
      }]
    })
      .then((post: any) => {
        return post;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updatePost(
    postData: Posts,
    file: any
  ) {
    let uploadFileData: UploadFile;
    let isVideo = false;
    let videoKey = '';
    let postOriginalStatus = postData.status;

    if (file) {
      if (!(typeof file === "object") || !validPostFileType.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const postDataOld: any = await Posts.findOne({
        attributes: ["id", "user_id"],
        where: { id: postData.id },
        include: [{
          required: false,
          model: UploadFileMorph, as: "PostMedia", attributes: ["id", "related_type"],
          where: { 'related_type': 'posts' },
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
      const key = `${uploadPath}/posts/${filename}`;
      videoKey = key;
      let uploadFile = null;
      let ext = originalExt;
      let mimetype = file.mimetype;
      let fileSize = file.size;
      if (videoMimeTypes.includes(file.mimetype)) {
        isVideo = true;
        // postData.status = 2;
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
        created_by: postDataOld.user_id
      });

      // Delete the existing file from AWS and remove data from database
      if (postDataOld && postDataOld.PostMedia && postDataOld.PostMedia.UploadFile && postDataOld.PostMedia.UploadFile.id) {
        const getKey = postDataOld?.PostMedia?.UploadFile?.url.split(`/${uploadPath}/posts/`);
        if (getKey) {
          await awsS3.deletePublicFileFromS3(`${uploadPath}/posts/${getKey[1]}`);
          await UploadFileMorph.destroy({ where: { related_id: postDataOld.id, related_type: 'posts' } });
          await UploadFile.destroy({ where: { id: postDataOld?.PostMedia?.UploadFile?.id } });
        }
      }
    }

    const postDataOld: any = await Posts.findOne({
      attributes: ["status"],
      where: { id: postData.id },
    });

    return Posts.update(postData, { where: { id: postData.id } })
      .then(async (post: any) => {

        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: postData.id,
            related_type: "posts",
            field: "file",
            order: 1
          });

          if(isVideo) { // Send video convert job
            const destinationFolder = `${uploadPath}/posts/${uploadFileData.id}/`;
            const userMetaData = {
              id: `${uploadFileData.id}`,
              parentId: `${postData.id}`,
              parentTable: 'posts',
              parentStatusField: 'status',
              parentStatusValue: `${postOriginalStatus}`,
              currentMediaKey: videoKey
            };
            awsS3.createVideoTranscodeJob(videoKey, destinationFolder, userMetaData);
          }
        }

        if(postDataOld.status === 0 || postDataOld.status === 2  && typeof postData.status === 'number' && postData.status === 1) {
          const postUserId = await Posts.findOne({ where: { id: postData.id } });

          const notification = new NotificationService();
          let type = "approved_post";
          let postTitle = postUserId?.title;

          if(postTitle && postTitle.length > 50) {
            let length = 50;
            postTitle = postTitle?.substring(0, length) + '...';
          }

          const notifyData = {
            id: postData.id,
            title: postTitle,
            user_id: postUserId?.user_id
          }

          notification.getTokenAndSendNotificationPosts(notifyData, type)
        }
        return post;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addPost(
    post: Posts,
    file: any
  ): Promise<Posts> {
    let uploadFileData: UploadFile;
    let isVideo = false;
    let videoKey = '';
    let postOriginalStatus = post.status;

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
      const key = `${uploadPath}/posts/${filename}`;
      videoKey = key;
      let uploadFile = null;
      let ext = originalExt;
      let mimetype = file.mimetype;
      let fileSize = file.size;

      if (videoMimeTypes.includes(file.mimetype)) {
        isVideo = true;
        // post.status = 2; // Set processing status for video
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
        created_by: post.user_id
      });
    }

    return Posts.create(post)
      .then(async (post) => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: post.id,
            related_type: "posts",
            field: "file",
            order: 1
          });

          if(isVideo) { // Send video convert job
            const destinationFolder = `${uploadPath}/posts/${uploadFileData.id}/`;
            const userMetaData = {
              id: `${uploadFileData.id}`,
              parentId: `${post.id}`,
              parentTable: 'posts',
              parentStatusField: 'status',
              parentStatusValue: `${postOriginalStatus}`,
              currentMediaKey: videoKey
            };
            awsS3.createVideoTranscodeJob(videoKey, destinationFolder, userMetaData);
          }
        }

        post.deep_link = `vetpass://links/post/${post.id}`;
        post.save();

        return post;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deletePost(id: number) {
    // Delete file from aws s3 and remove entry from database
    return Posts.update({is_deleted: true},{ where: { id: id }, individualHooks: true })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importPosts(
    file: any,
    userId: number
  ): Promise<boolean> {
    const postData = await csv().fromFile(file.path);
    if(!postData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('url' in postData[0] && 'post_description' in postData[0] && 'status' in postData[0] && 'privacy' in postData[0] && 'hashtag' in postData[0])){
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
      console.log(post.privacy);
      if (post && post.privacy && post.privacy.toLowerCase() == "public") {
        post.privacy = "Public";
      } else if (post && post.privacy && post.privacy.toLowerCase() == "private") {
        post.privacy = "Private";
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
        Key: `${uploadPath}/posts/${fileKey}`,
        ACL: 'public-read'
      };

      const fileDetail = await copyFile(s3Params);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${uploadPath}/posts/${fileKey}`,
      };
      const { ContentType, ContentLength } = await s3.getObject(params).promise();
      await Posts.create({
        title: post.post_description,
        hashtag: post.hashtag,
        status: PostStatus[post.status] || 1,
        privacy: post.privacy || "Public",
        is_admin: true,
        user_id: userId,
        created_by: userId
      }).then(async (createdPost) => {
        const fileLocation = `https://${process.env.AWS_BUCKET}.s3.eu-west-2.amazonaws.com/${uploadPath}/posts/${fileKey}`;
        const ext = fileKey.substr(fileKey.lastIndexOf('.'));
        const basename = fileKey.substr(0, fileKey.lastIndexOf('.'));

        // remove if upload file data already exist with same post-id
        const oldPost = await UploadFileMorph.findOne({where: {related_type: "posts", related_id: createdPost.id}});
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
            related_type: "posts",
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
