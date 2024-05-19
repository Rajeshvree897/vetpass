import path from "path";
import crypto from "crypto";
import Advertisements from "../db/models/advertisement";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import { awsS3 } from "../helpers/aws-s3";
import { validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
import AdvertisementsState from "../db/models/advertisement-state";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class AdvertisementServices {
  constructor() { }

  async getAdvertisement(id:any = null): Promise<any> {
    return Advertisements.findOne({
      where: { id: id },
      include: [
        {
          model: UploadFileMorph, as: "banner",
          where: { 'related_type': 'advertisements' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url"]
            }
          ]
        },
        { model: AdvertisementsState, as: "AdvertisementState", attributes: ["state-drop-down_id"] },
      ]
    })
      .then((advertisements: any) => {
        if (advertisements) {
          advertisements.stateData = advertisements?.AdvertisementState.map((state: any) => state['state-drop-down_id']) || [];
        } else {
          advertisements = {};
        }
        return advertisements;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addAdvertisement(
    advertisements: any,
    userId: number,
    file: any,
  ): Promise<Advertisements> {
    let uploadFileData: UploadFile;
    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");

      const dateNow = Date.now();
      const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;

      // Upload file on S3
      const key = `${uploadPath}/advertisements/${filename}`;
      const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading advertisement image");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: advertisements.created_by
      });
    }

    return Advertisements.create({
      text: advertisements.text,
      title: advertisements.title,
      country: advertisements.country,
      website: advertisements.website, 
      user_id: advertisements.user_id,
      subscription_history: advertisements.subscription_history, 
      created_by: userId
    })
      .then(async advertisementData => {
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: advertisementData.id,
            related_type: "advertisements",
            field: "image",
            order: 1
          });
        }
        if(advertisements && advertisements.state) {
          const stateData: any = [];
          advertisements.state?.map((state: any) => {
            stateData.push({ advertisement_id: advertisementData.id, "state-drop-down_id": state });
          });
          await AdvertisementsState.bulkCreate(stateData);
        }
        return advertisementData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateAdvertisement(
    advertisementData: any,
    userId: number,
    file: any
  ): Promise<boolean> {
    let uploadFileData: UploadFile;
    
    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const AdvertisementIconData: any = await Advertisements.findOne({ where: { id: advertisementData.id },
        include: [
          { model: UploadFileMorph, as: "banner",
          where: {'related_type': 'advertisements' },
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ['id', 'url']
            }
          ]},
        ]
      });

      // Upload file on S3
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");

      const dateNow = Date.now();
      const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;

      const key = `${uploadPath}/advertisements/${filename}`;
      const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading advertisement image");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: userId
      });

      // Delete the existing file from AWS and remove data from database
      if (AdvertisementIconData && AdvertisementIconData.banner && AdvertisementIconData.banner.UploadFile && AdvertisementIconData.banner.UploadFile.id) {
        const getKey = AdvertisementIconData?.banner?.UploadFile?.url.split(`/${uploadPath}/advertisements/`);
        if (getKey) {
          await awsS3.deletePublicFileFromS3(`${uploadPath}/advertisements/${getKey[1]}`);
          await UploadFileMorph.destroy({ where: { related_id: advertisementData.id, related_type: 'advertisements' } });
          await UploadFile.destroy({ where: { id: AdvertisementIconData?.banner?.UploadFile?.id } });
        }
      }
    }

    return Advertisements.update(
      { 
        text: advertisementData.text, 
        title: advertisementData.title,
        country: advertisementData.country,
        website: advertisementData.website,
        user_id: advertisementData.user_id,
        updated_by: userId 
      },

      { where: { id: advertisementData.id } }
    )
      .then(async () => {
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: advertisementData.id,
            related_type: "advertisements",
            field: "image",
            order: 1
          });
        }
        if(advertisementData && advertisementData.state) {
          const stateData: any = [];
          await AdvertisementsState.destroy({ where: { advertisement_id: advertisementData.id } });
          advertisementData.state?.map((state: any) => {
            stateData.push({ advertisement_id: advertisementData.id, "state-drop-down_id": state });
          });
          await AdvertisementsState.bulkCreate(stateData);
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAdvertisements(id: number): Promise<boolean> {
    return Advertisements.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
