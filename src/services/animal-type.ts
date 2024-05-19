import crypto from "crypto";
import path from "path";
import { Op } from 'sequelize';

import AnimalTypes from "../db/models/animal-types";
// import AnimalTypesIcon from "../db/models/animal-types-icon";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import { awsS3 } from "../helpers/aws-s3";
import { validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";
export default class AnimalTypesService {
  constructor() {}

  async getAnimalType(id: number): Promise<AnimalTypes | null> {
    return AnimalTypes.findOne({ where: { id: id },
      include: [
        { model: UploadFileMorph, as: "AnimalTypesIcon",
        where: {'related_type': 'animal_types' },
        required: false,
        include: [
          {
            model: UploadFile,
            as: "UploadFile",
            attributes: ["url"]
          }
        ]},
      ]
    })
      .then((animalType: any) => {
        return animalType;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addAnimalType(
    animalType: AnimalTypes,
    file: any
  ): Promise<AnimalTypes> {
    const checkAnimalType = await AnimalTypes.count({where: { type: animalType.type, animal_category: animalType.animal_category, is_deleted : null }});
    if(checkAnimalType) {
      throw new CustomError("Animal type already exist");
    }
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
      const key = `${uploadPath}/${filename}`;
      const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading animal types image");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: animalType.created_by
      });
    }
    return AnimalTypes.create(animalType)
      .then(async animalType => {
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: animalType.id,
            related_type: "animal_types",
            field: "icon",
            order: 1
          });

          // await AnimalTypesIcon.create({ animal_type_id: animalType.id, file_id: uploadFileData.id});
        }

        return animalType;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateAnimalType(
    animalTypeData: AnimalTypes,
    userId: number,
    categoryId: number,
    file: any
  ): Promise<any> {
    const checkAnimalType = await AnimalTypes.count({where: { id: { [Op.ne]: animalTypeData.id }, type: animalTypeData.type, animal_category: categoryId, is_deleted : null }});
    if(checkAnimalType) {
      throw new CustomError("Animal type already exist");
    }
    let uploadFileData: UploadFile;

    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const animalTypesIconData: any = await AnimalTypes.findOne({ where: { id: animalTypeData.id },
        include: [
          { model: UploadFileMorph, as: "AnimalTypesIcon",
          where: {'related_type': 'animal_types' },
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

      const key = `${uploadPath}/${filename}`;
      const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading animal type image");
      }

      uploadFileData = await UploadFile.create({
        name: file.originalname,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: userId
      });

      if (animalTypesIconData && animalTypesIconData.AnimalTypesIcon && animalTypesIconData.AnimalTypesIcon.UploadFile && animalTypesIconData.AnimalTypesIcon.UploadFile.id) {
        const getKey = animalTypesIconData.AnimalTypesIcon.UploadFile?.url.split(`/${uploadPath}/`);
        if(getKey) {
          await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
          await UploadFileMorph.destroy({ where: { related_id: animalTypeData.id, related_type: 'animal_types' } });
          await UploadFile.destroy({ where: { id: animalTypesIconData.AnimalTypesIcon.UploadFile?.id } });
        }
      }
    }
    return AnimalTypes.update(
      {
        type: animalTypeData.type,
        animal_category: categoryId,
        status: animalTypeData.status, 
        updated_by: userId
      },
      { where: { id: animalTypeData.id } }
    )
      .then(async animalType => {
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: animalTypeData.id,
            related_type: "animal_types",
            field: "icon",
            order: 1
          });

          // await AnimalTypesIcon.create(
          //   { animal_type_id: animalTypeData.id, file_id: uploadFileData.id },
          // );
        }
        return animalType;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAnimalTypes(id: number) {
    // let animalTypesIconData: any = await AnimalTypes.findOne({ where: { id },
    //   include: [
    //     { model: UploadFileMorph, as: "AnimalTypesIcon",
    //     where: {'related_type': 'animal_types' },
    //     include: [
    //       {
    //         model: UploadFile,
    //         as: "UploadFile",
    //         attributes: ['id', 'url']
    //       }
    //     ]},
    //   ]
    // });
    // const animalTypesIconData: any = await AnimalTypesIcon.findOne({
    //   where: { animal_type_id: id }, attributes: ['file_id'], include: [{
    //     model: UploadFile, as: "UploadFile", attributes: ['url', 'id']
    //   }]
    // });
    // if (animalTypesIconData && animalTypesIconData.AnimalTypesIcon && animalTypesIconData.AnimalTypesIcon.UploadFile && animalTypesIconData.AnimalTypesIcon.UploadFile.id) {
    //   const getKey = animalTypesIconData.AnimalTypesIcon.UploadFile?.url.split(`/${uploadPath}/`);
    //   if(getKey) {
    //     await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
    //     await UploadFileMorph.destroy({ where: { related_id: id, related_type: 'animal_types' } });
    //     await UploadFile.destroy({ where: { id: animalTypesIconData.AnimalTypesIcon.UploadFile?.id } });
    //     // await AnimalTypesIcon.destroy({where: {animal_type_id: id}});
    //   }
    // }
    return AnimalTypes.update({is_deleted: true }, { where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
