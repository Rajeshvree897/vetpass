import csv from "csvtojson";
import crypto from "crypto";
import path from "path";
import fs from "fs";

import AnimalProfiles from "../db/models/animal-profiles";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import User from "../db/models/user";
import { awsS3 } from "../helpers/aws-s3";
import { CustomError } from "./error-service";
import { validImageTypes } from "../types/common";
import Insurers from "../db/models/insurer";
import Chips from "../db/models/chips";
import moment from "moment";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class AnimalProfilesService {
  constructor() { }

  async getAnimalProfile(id: number): Promise<AnimalProfiles | null> {
    return AnimalProfiles.findOne({
      where: { id: id },
      include: [
        { model: Breeds, as: "Breed", attributes: ["name"] },
        { model: UploadFileMorph , as: "AnimalProfilesIcon", attributes: [ "id", "related_type"],
          where: {'related_type': 'animal_profiles' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id"]
            }
          ]
        },
      ]
    })
      .then(animalProfile => {
        return animalProfile;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addAnimalProfile(
    animalProfile: AnimalProfiles,
    file: any
  ): Promise<AnimalProfiles> {
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
        throw new CustomError("Error while uploading animal profile image");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: animalProfile.created_by
      });
    }
    animalProfile.InsuranceRenewalDate = animalProfile.InsuranceRenewalDate && animalProfile.InsuranceRenewalDate || null; 
    animalProfile.created_at = new Date(moment.utc().format("YYYY-MM-DD hh:mm:ss"));
    return AnimalProfiles.create(animalProfile)
      .then(async animalProfile => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: animalProfile.id,
            related_type: "animal_profiles",
            field: "image",
            order: 1
          });
        }
        return animalProfile;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateAnimalProfile(updateData: AnimalProfiles, file: any): Promise<boolean> {
    let uploadFileData: UploadFile;

    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const animalProfilesData: any = await AnimalProfiles.findOne({
        where: { id: updateData.id }, include: [{
          model: UploadFileMorph, as: "AnimalProfilesIcon", attributes: [ "id", "related_type"],
          where: {'related_type': 'animal_profiles' },
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
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");

      const dateNow = Date.now();
      const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;

      const key = `${uploadPath}/${filename}`;
      const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);
      if (!uploadFile) {
        throw new CustomError("Error while uploading animal profile image");
      }

      uploadFileData = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: updateData.updated_by
      });

      // Delete the existing file from AWS and remove data from database
      if (animalProfilesData && animalProfilesData.AnimalProfilesIcon && animalProfilesData.AnimalProfilesIcon.UploadFile && animalProfilesData.AnimalProfilesIcon.UploadFile.id) {
        const getKey = animalProfilesData?.AnimalProfilesIcon?.UploadFile?.url.split(`/${uploadPath}/`);
        if(getKey) {
          await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
          await UploadFileMorph.destroy({ where: { related_id: updateData.id, related_type: 'animal_profiles' } });
          await UploadFile.destroy({ where: { id: animalProfilesData?.AnimalProfilesIcon?.UploadFile?.id } });
        }
      }
    }
    updateData.InsuranceRenewalDate = updateData.InsuranceRenewalDate && updateData.InsuranceRenewalDate || null;
    return AnimalProfiles.update(updateData, { where: { id: updateData.id } })
      .then(async () => {
        if (uploadFileData) {
          const uploadFileMorphData = await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: updateData.id,
            related_type: "animal_profiles",
            field: "image",
            order: 1
          });

          await AnimalProfiles.update(
            { image: uploadFileMorphData.id },
            { where: { id: updateData.id } }
          );
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAnimalProfiles(id: number): Promise<boolean> {
    // const animalProfilesData: any = await AnimalProfiles.findOne({
    //   where: { id: id }, include: [{
    //     model: UploadFileMorph , as: "AnimalProfilesIcon", attributes: [ "id", "related_type"],
    //       where: {'related_type': 'animal_profiles' },
    //       required: false,
    //       include: [
    //         {
    //           model: UploadFile,
    //           as: "UploadFile",
    //           attributes: ["url", "id"]
    //         }
    //       ]
    //     }]
    // });
    // if (animalProfilesData && animalProfilesData.AnimalProfilesIcon && animalProfilesData.AnimalProfilesIcon.UploadFile && animalProfilesData.AnimalProfilesIcon.UploadFile.id) {
    //   const getKey = animalProfilesData?.AnimalProfilesIcon?.UploadFile?.url.split(`/${uploadPath}/`);
    //   await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
    //   if(getKey) {
    //     await UploadFileMorph.destroy({ where: { related_id: id, related_type: 'animal_profiles' } });
    //     await UploadFile.destroy({ where: { id: animalProfilesData?.AnimalProfilesIcon?.UploadFile?.id } });
    //   }
    // }
    return AnimalProfiles.update({is_deleted: true }, { where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importAnimalProfile(file: any, userId: number): Promise<boolean> {
    if (!file) {
      throw new CustomError("Please upload file");
    }

    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError("Please upload only csv file");
    }

    const animalProfileJsonData = await csv().fromFile(file.path);
    if (!animalProfileJsonData) {
      throw new CustomError("Unable to import data");
    }

    if (
      !(
        "user" in animalProfileJsonData[0] &&
        "name" in animalProfileJsonData[0] &&
        "animal_type" in animalProfileJsonData[0] &&
        "breed" in animalProfileJsonData[0] &&
        "gender" in animalProfileJsonData[0] &&
        "date_of_birth" in animalProfileJsonData[0] &&
        "height" in animalProfileJsonData[0] &&
        "height_type" in animalProfileJsonData[0] &&
        "weight" in animalProfileJsonData[0] &&
        "weight_type" in animalProfileJsonData[0] &&
        "colour" in animalProfileJsonData[0] &&
        "spayed_neutered" in animalProfileJsonData[0] &&
        "status" in animalProfileJsonData[0] &&
        "other_information" in animalProfileJsonData[0] &&
        "regd_breed_name" in animalProfileJsonData[0] &&
        "breed_regd_number" in animalProfileJsonData[0] &&
        "breeder" in animalProfileJsonData[0] &&
        "sire_name" in animalProfileJsonData[0] &&
        "sire_breed" in animalProfileJsonData[0] &&
        "dam_name" in animalProfileJsonData[0] &&
        "dam_breed" in animalProfileJsonData[0] &&
        "breed_reference" in animalProfileJsonData[0] &&
        "other" in animalProfileJsonData[0] &&
        "insurance" in animalProfileJsonData[0] &&
        "insurers" in animalProfileJsonData[0] &&
        "insurance_renewal_date" in animalProfileJsonData[0] &&
        "annual_insurance_updates" in animalProfileJsonData[0] &&
        "chip" in animalProfileJsonData[0] &&
        "allergies" in animalProfileJsonData[0] &&
        "medications" in animalProfileJsonData[0]
      )
    ) {
      throw new CustomError("Please set header as sample excel");
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(
      animalProfileJsonData.map(async (animalProfile: any) => {
        let userData;
        let breedData;
        let animalTypeData;
        let insurers;
        let chip;
        if (animalProfile.user) {
          userData = await User.findOne({
            where: { first_name: animalProfile.user }
          });
        }
        if (animalProfile.breed) {
          breedData = await Breeds.findOne({
            where: { name: animalProfile.breed }
          });
        }
        if (animalProfile.animal_type) {
          animalTypeData = await AnimalTypes.findOne({
            where: { type: animalProfile.animal_type }
          });
        }
        if (animalProfile.insurers) {
          insurers = await Insurers.findOne({
            where: { name: animalProfile.insurers }
          });
        }
        if (animalProfile.chip) {
          chip = await Chips.findOne({
            where: { name: animalProfile.chip }
          });
        }
        await AnimalProfiles.create({
          user: userData && userData.id ? userData.id : null,
          name: animalProfile.name,
          animal_type: animalTypeData && animalTypeData.id ? animalTypeData.id : null,
          breed: breedData && breedData.id ? breedData.id : null,
          gender: animalProfile.gender,
          date_of_birth: animalProfile.date_of_birth,
          height: animalProfile.height ? animalProfile.height : null,
          height_type: animalProfile.height_type ? animalProfile.height_type : null,
          weight: animalProfile.weight ? animalProfile.weight : null,
          weight_type: animalProfile.weight_type ? animalProfile.weight_type : null,
          colour: animalProfile.colour,
          spayed_neutered: animalProfile.spayed_neutered,
          status: animalProfile.status,
          other_information: animalProfile.other_information,
          regd_breed_name: animalProfile.regd_breed_name,
          breed_regd_number: animalProfile.breed_regd_number,
          breeder: animalProfile.breeder,
          sire_name: animalProfile.sire_name,
          sire_breed: animalProfile.sire_breed,
          dam_name: animalProfile.dam_name,
          dam_breed: animalProfile.dam_breed,
          breed_reference: animalProfile.breed_reference,
          other: animalProfile.other,
          insurance: animalProfile.insurance,
          InsuranceRenewalDate: animalProfile.insurance_renewal_date ? animalProfile.insurance_renewal_date : null,
          wantContact: animalProfile.annual_insurance_updates,
          allergies: animalProfile.allergies,
          medications: animalProfile.medications,
          insurers: insurers && insurers.id ? insurers.id : null,
          chip: chip && chip.id ? chip.id : null,
          created_by: userId
        });
      })
    )
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
