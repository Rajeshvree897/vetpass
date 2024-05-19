import path from "path";
import crypto from "crypto";
import UploadFileMorph from "../db/models/upload-file-morph";
import UploadFile from "../db/models/upload-file";
import { awsS3 } from "../helpers/aws-s3";
import FanPages from "../db/models/fan-pages";
import { validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
import NotificationService from "./notification-service";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class FanPageService {
  constructor() { }

  async getFanPage(id: number) {
    return FanPages.findOne({
      where: { id: id },
      include: [{
        model: UploadFileMorph,
        as: "FanPageImage",
        required: false,
        attributes: ["id", "related_type"],
        where: { 'related_type': 'fan_pages', 'field': 'image' },
        include: [
          {
            model: UploadFile,
            as: "UploadFile",
            attributes: ["id", "url", 'ext', 'mime']
          }
        ]
      },{
        model: UploadFileMorph,
        as: "FanPageBannerImage",
        required: false,
        attributes: ["id", "related_type"],
        where: { 'related_type': 'fan_pages', 'field': 'banner_img' },
        include: [
          {
            model: UploadFile,
            as: "UploadFile",
            attributes: ["id", "url", 'ext', 'mime']
          }
        ]
      }]
    })
      .then((fanPage: any) => {
        return fanPage;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addFanPage(fanPage: FanPages, file: any): Promise<FanPages> {
    let uploadFileData: UploadFile;
    let uploadBannerFileData: UploadFile;

    if (file) {
      if(file.FanPageImage) {
        if (!(typeof file.FanPageImage === "object") || !validImageTypes.includes(file.FanPageImage.mimetype)) {
          throw new CustomError("Please upload valid file");
        }
  
        const ext = path.extname(file.FanPageImage.originalname);
        const basename = path.basename(file.FanPageImage.originalname, ext);
        const randomSuffix = () => crypto.randomBytes(5).toString("hex");
  
        const dateNow = Date.now();
        const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;
  
        // Upload file on S3
        const key = `${uploadPath}/${filename}`;
        const uploadFile: any = await awsS3.uploadPublicFileOnS3(file.FanPageImage, key);
        if (!uploadFile) {
          throw new CustomError("Error while uploading page image");
        }
  
        uploadFileData = await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.FanPageImage.mimetype,
          size: file.FanPageImage.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: fanPage.user_id
        });
      }
      if(file.FanPageBannerImage) {
        if (!(typeof file.FanPageBannerImage === "object") || !validImageTypes.includes(file.FanPageBannerImage.mimetype)) {
          throw new CustomError("Please upload valid file");
        }
  
        const ext = path.extname(file.FanPageBannerImage.originalname);
        const basename = path.basename(file.FanPageBannerImage.originalname, ext);
        const randomSuffix = () => crypto.randomBytes(5).toString("hex");
  
        const dateNow = Date.now();
        const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;
  
        // Upload file on S3
        const key = `${uploadPath}/${filename}`;
        const uploadFile: any = await awsS3.uploadPublicFileOnS3(file.FanPageBannerImage, key);
        if (!uploadFile) {
          throw new CustomError("Error while uploading page image");
        }
  
        uploadBannerFileData = await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.FanPageBannerImage.mimetype,
          size: file.FanPageBannerImage.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: fanPage.user_id
        }); 
      }
    }

    return FanPages.create(fanPage)
      .then(async (fanPage) => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: fanPage.id,
            related_type: "fan_pages",
            field: "image",
            order: 1
          });
        }
        if (uploadBannerFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadBannerFileData.id,
            related_id: fanPage.id,
            related_type: "fan_pages",
            field: "banner_img",
            order: 1
          });
        }
        return fanPage;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateFanPage(fanPageData: FanPages, file: any) {
    let uploadFileData: UploadFile;
    let uploadBannerFileData: UploadFile;

    if (file) {
      if (file.FanPageImage) {
        if (!(typeof file === "object") || !validImageTypes.includes(file.FanPageImage.mimetype)) {
          throw new CustomError("Please upload valid file");
        }

        const fanPageOldData: any = await FanPages.findOne({
          attributes: ["id", "user_id"],
          where: { id: fanPageData.id },
          include: [{
            required: false,
            model: UploadFileMorph, as: "FanPageImage", attributes: ["id", "related_type"],
            where: { 'related_type': 'fan_pages', 'field': 'image' },
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
        const ext = path.extname(file.FanPageImage.originalname);
        const basename = path.basename(file.FanPageImage.originalname, ext);
        const randomSuffix = () => crypto.randomBytes(5).toString("hex");

        const dateNow = Date.now();
        const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;

        const key = `${uploadPath}/${filename}`;
        const uploadFile: any = await awsS3.uploadPublicFileOnS3(file.FanPageImage, key);
        if (!uploadFile) {
          throw new CustomError("Error while uploading profile image");
        }

        uploadFileData = await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.FanPageImage.mimetype,
          size: file.FanPageImage.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: fanPageOldData.user_id
        });

        // Delete the existing file from AWS and remove data from database
        if (fanPageOldData && fanPageOldData.FanPageImage && fanPageOldData.FanPageImage.UploadFile && fanPageOldData.FanPageImage.UploadFile.id) {
          const getKey = fanPageOldData?.FanPageImage?.UploadFile?.url.split(`/${uploadPath}/`);
          if (getKey) {
            await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
            await UploadFileMorph.destroy({ where: { related_id: fanPageOldData.id, related_type: 'fan_pages', field: 'image' } });
            await UploadFile.destroy({ where: { id: fanPageOldData?.FanPageImage?.UploadFile?.id } });
          }
        }
      }
      if (file.FanPageBannerImage) {
        if (!(typeof file.FanPageBannerImage === "object") || !validImageTypes.includes(file.FanPageBannerImage.mimetype)) {
          throw new CustomError("Please upload valid file");
        }

        const fanPageOldData: any = await FanPages.findOne({
          attributes: ["id", "user_id"],
          where: { id: fanPageData.id },
          include: [{
            required: false,
            model: UploadFileMorph, as: "FanPageBannerImage", attributes: ["id", "related_type"],
            where: { 'related_type': 'fan_pages', 'field': 'banner_img' },
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
        const ext = path.extname(file.FanPageBannerImage.originalname);
        const basename = path.basename(file.FanPageBannerImage.originalname, ext);
        const randomSuffix = () => crypto.randomBytes(5).toString("hex");

        const dateNow = Date.now();
        const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;

        const key = `${uploadPath}/${filename}`;
        const uploadFile: any = await awsS3.uploadPublicFileOnS3(file.FanPageBannerImage, key);
        if (!uploadFile) {
          throw new CustomError("Error while uploading profile image");
        }

        uploadBannerFileData = await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.FanPageBannerImage.mimetype,
          size: file.FanPageBannerImage.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: fanPageOldData.user_id
        });

        // Delete the existing file from AWS and remove data from database
        if (fanPageOldData && fanPageOldData.FanPageBannerImage && fanPageOldData.FanPageBannerImage.UploadFile && fanPageOldData.FanPageBannerImage.UploadFile.id) {
          const getKey = fanPageOldData?.FanPageBannerImage?.UploadFile?.url.split(`/${uploadPath}/`);
          if (getKey) {
            await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
            await UploadFileMorph.destroy({ where: { related_id: fanPageOldData.id, related_type: 'fan_pages', field: 'banner_img' } });
            await UploadFile.destroy({ where: { id: fanPageOldData?.FanPageBannerImage?.UploadFile?.id } });
          }
        }
      }
    }
    // const fanPageOldData: any = await FanPages.findOne({
    //   attributes: ["status"],
    //   where: { id: fanPageData.id },
    // });

    return FanPages.update(fanPageData, { where: { id: fanPageData.id } })
      .then(async (fanPage: any) => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: fanPageData.id,
            related_type: "fan_pages",
            field: "image",
            order: 1
          });
        }
        if (uploadBannerFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadBannerFileData.id,
            related_id: fanPageData.id,
            related_type: "fan_pages",
            field: "banner_img",
            order: 1
          });
        }

        // if(fanPageOldData.status === 0 && typeof fanPageData.status === 'string' && fanPageData.status === '1') {
        //   const fanPageUserId = await FanPages.findOne({ where: { id: fanPageData.id } });
          
        //   const notification = new NotificationService();
        //   let type = "approved_fan_page";
        //   let fanPageTitle = fanPageUserId?.title;

        //   if(fanPageTitle && fanPageTitle.length > 50) {
        //     let length = 50;
        //     fanPageTitle = fanPageTitle?.substring(0, length) + '...';
        //   }
  
        //   const notifyData = {
        //     id: fanPageData.id,
        //     title: fanPageTitle,
        //     user_id: fanPageUserId?.user_id
        //   }
          
        //   notification.getTokenAndSendNotificationFanPages(notifyData, type);
        // }
        return fanPage;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteFanPage(id: number) {
    return FanPages.update({is_deleted: true}, { where: { id: id }, individualHooks: true })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
