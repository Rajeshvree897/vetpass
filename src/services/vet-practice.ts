import crypto from "crypto";
import path from "path";
import moment from 'moment';
import { Op } from 'sequelize';
import uuidv4 from "uuid/v4";
import csv from 'csvtojson';
import fs from "fs";
import bcryptjs from "bcryptjs";

import { mailer } from "../helpers/mailer";
import config from "../config";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import VetPractices from "../db/models/vet-practices";
import VetPracticesClassification from "../db/models/vet-practices-classification";
import VetPracticesTypeAnimal from "../db/models/vet-practices-treates-type-animal";
import { awsS3 } from "../helpers/aws-s3";
import { validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
import constants from "../helpers/constants";
import Country from "../db/models/country";
import State from "../db/models/state";
import Classifications from "../db/models/classifications";
import AnimalCategories from "../db/models/animal-categories";
import User from "../db/models/user";
import UsersPermissionsRole from "../db/models/users-permissions-role";
import VetProfile from "../db/models/vet-profile";
import VetPracticeTimeBlocks from "../db/models/vet-practices-time-blocks";
import VetPracticeServices from "../db/models/vet-practices-services";
import PetPracticeServices from "../db/models/vet-practices-pet-services";
import PracticeServices from "../db/models/practice-services";
import FavoritePracticeVetPractices from "../db/models/favorite-practice-vet-practices";
import FavoritePractices from "../db/models/favorite-practices";
import AnimalProfiles from "../db/models/animal-profiles";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import Insurers from "../db/models/insurer";
import Chips from "../db/models/chips";
import VetProfileSpecialization from "../db/models/vet-profile-specialization";
import Specialization from "../db/models/specialization";
import VetProfileSpecialities from "../db/models/vet-profile-specialities";
import Specialities from "../db/models/specialities";
import VetProfileTreatesTypeAnimal from "../db/models/vet-profile-treates-type-animal";
import PractitionerLiability from "../db/models/practitioner-liability";
import VetPracticesStoreClassification from "../db/models/vet-practices-store-classifications";
import StoreClassifications from "../db/models/store-classifications";
import PetServices from "../db/models/pet-services";
import petPracticeServices from "../db/models/vet-practices-pet-services";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class VetPracticesService {
  constructor() { }

  async deleteVetPractice(id: number): Promise<boolean> {
    // const checkFlag = await VetPractices.findOne({ where: { id: id } });
    // if (checkFlag && checkFlag.flag) {
    //   throw new CustomError("You don't have righs to delete default practice.");
    // }
    // const uploadFileMorphData: any = await UploadFileMorph.findOne({
    //   where: { related_id: id, related_type: 'vet_practices' },
    //   include: [{model: UploadFile, as: 'UploadFile', attributes: ['url', 'id']}] 
    // });
    // if(uploadFileMorphData) {
    //   const getKey = uploadFileMorphData.UploadFile.url.split(`/${uploadPath}/`);
    //   await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
    //   await UploadFileMorph.destroy({ where: { related_id: id, related_type: 'vet_practices' } });
    //   await UploadFile.destroy({ where: { id: uploadFileMorphData?.UploadFile?.id } });
    // }
    // await VetPracticesClassification.destroy({ where: { vet_practice_id: id } });
    // await VetPracticesTypeAnimal.destroy({ where: { vet_practice_id: id } });
    // await VetPracticeServices.destroy({ where: { vet_practice_id: id } });
    // await VetPracticeTimeBlocks.destroy({ where: { vet_practice: id } });

    let vetUsersId: any[] = [];

    const checkUser = await VetProfile.findAll({
      include: [
        {
          model: VetPractices,
          as: "practices",
          attributes: ["id", "practice_name"],
          where: {
            id: id
          }
        }
      ],
    })
    
    for(let userId in checkUser)  
    {
      vetUsersId.push(checkUser[userId]?.user)
    }

    // return VetPractices.destroy({ where: { id: id } })
    //   .then(async () => {
        
    //     await VetProfile.update(
    //       {
    //         practice: null
    //       },
    //       {
    //         where: {
    //           user: {
    //             [Op.in]: vetUsersId
    //           }
    //         } 
    //       }
    //     ).then(() => {
    //       return true;
    //     }).catch((error: Error) => {
    //       throw error;
    //     });

    //     return User.update(
    //       { 
    //         comfirmed: 0, 
    //         blocked: 1 
    //       },
    //       { 
    //         where: { 
    //           id: {
    //             [Op.in] : vetUsersId
    //           } 
    //         } 
    //       }
    //     )
    //       .then(() => {
    //         return true;
    //       })
    //       .catch((error: Error) => {
    //         throw error;
    //       });
    //   })
    //   .catch((error: Error) => {
    //     throw error;
    //   });

    // await VetProfile.update(
    //   {
    //     practice: null
    //   },
    //   {
    //     where: {
    //       user: {
    //         [Op.in]: vetUsersId
    //       }
    //     } 
    //   }
    // );
    await User.update(
      { 
        comfirmed: 0, 
        blocked: 1,
        is_deleted: true 
      },
      { 
        where: { 
          id: {
            [Op.in] : vetUsersId
          } 
        } 
      }
    );

    return VetPractices.update({ is_deleted: true }, { where: { id: id }})
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    })

  }

  async unClaimVetPractice(id: number): Promise<boolean> {
    return VetPractices.update({ is_claimed: null, claimed_datetime: null }, { where: { id: id }})
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    });
  }

  async addVetPractice(vetPracticeData: any, userId: number, file: any, timeZone: any): Promise<VetPractices> {
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
        throw new CustomError("Error while uploading vet practice image");
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
      vetPracticeData.img_path = uploadFile.Location
    }
    return VetPractices.create({
      practice_name: vetPracticeData.practice_name,
      option: vetPracticeData.option,
      flag: vetPracticeData.flag,
      public_email: vetPracticeData.public_email,
      address1: vetPracticeData.address1,
      address2: vetPracticeData.address2,
      city: vetPracticeData.city,
      zip_code: (vetPracticeData.zip_code) ? vetPracticeData.zip_code : null,
      int_code: (vetPracticeData.int_code) ? vetPracticeData.int_code : null,
      business_phone: vetPracticeData.business_phone,
      out_of_hr_phone: vetPracticeData.out_of_hr_phone,
      email: vetPracticeData.email,
      website: vetPracticeData.website,
      speciality: vetPracticeData.specialityData?.join("#"),
      practice_accreditation_no: vetPracticeData.practice_accreditation_no,
      latitude: (vetPracticeData.latitude) ? vetPracticeData.latitude : null,
      longitude: (vetPracticeData.longitude) ? vetPracticeData.longitude : null,
      country: (vetPracticeData.country) ? vetPracticeData.country : null,
      state: (vetPracticeData.state) ? vetPracticeData.state : null,
      created_by: userId,
      img_path: vetPracticeData.img_path
    })
      .then(async (vetData: any) => {
        await this.createOrUpdateTimeBlocks(vetPracticeData, vetData.id, userId, timeZone);
        
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: vetData.id,
            related_type: "vet_practices",
            field: "image",
            order: 1
          });
        }
        if(vetPracticeData && vetPracticeData.types) {
          const animalData: any = [];
          vetPracticeData.types.map((type: any) => {
            animalData.push({ vet_practice_id: vetData.id, "animal-category_id": type });
          });
          await VetPracticesTypeAnimal.bulkCreate(animalData);
        }

        // PRACTICE CLASSIFICATION
        if(vetPracticeData && vetPracticeData.classification) {
          const classificationData: any = [];
          vetPracticeData.classification?.map((classification: any) => {
            classificationData.push({ vet_practice_id: vetData.id, "classification_id": classification });
          });
          await VetPracticesClassification.bulkCreate(classificationData);
        }

        // STORE CLASSIFICATION
        if(vetPracticeData && vetPracticeData.storeClassification) {
          const classificationData: any = [];
          vetPracticeData.storeClassification?.map((classification: any) => {
            classificationData.push({ vet_practice_id: vetData.id, "store-classification_id": classification });
          });
          await VetPracticesStoreClassification.bulkCreate(classificationData);
        }

        if(vetPracticeData && vetPracticeData.practice_service) {
          const practiceServiceData: any = [];
          vetPracticeData.practice_service?.map((practice_service: any) => {
            practiceServiceData.push({ vet_practice_id: vetData.id, "practice-service_id": practice_service });
          });
          await VetPracticeServices.bulkCreate(practiceServiceData);
        }
        if(vetPracticeData && vetPracticeData.pet_service) {
          const petServiceData: any = [];
          vetPracticeData.pet_service?.map((pet_service: any) => {
            petServiceData.push({ vet_practice_id: vetData.id, "pet-service_id": pet_service });
          });
          await PetPracticeServices.bulkCreate(petServiceData);
        }
        return vetData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getFavoriteVetPracticeReportData(): Promise<FavoritePracticeVetPractices[] | null> {
    return FavoritePracticeVetPractices.findAll({
      group: 'id',
      attributes: ['id'],
      include:[
        {
          model: VetPractices,
          as: "VetPractices",
          attributes: [
            "practice_name", 
            "business_phone", 
            "out_of_hr_phone", 
            "email", 
            "website", 
            "public_email", 
            "address1", 
            "address2", 
            "country", 
            "state", 
            "city", 
            "zip_code", 
            "int_code", 
            "speciality",
            "practice_accreditation_no",
            "created_at"
          ],
          include: [
            {
              model: Country,
              as: "countries",
              attributes: ["country"]
            },
            {
              model: State,
              as: "states",
              attributes: ["state"]
            },
            {
              model: VetPracticesTypeAnimal,
              as: 'VetPracticesTypeAnimal',
              attributes: ["vet_practice_id", "animal-category_id"],
              include: [
                {
                  model: AnimalCategories,
                  as: 'animalcategories',
                  attributes: ["category"]
                },
              ]
            },
            {
              model: VetPracticesClassification,
              as: 'VetPracticesClassification',
              attributes: ["vet_practice_id", "classification_id"],
              include: [
                {
                  model: Classifications,
                  as: 'classifications',
                  attributes: ["title"]
                },
              ]
            },
            {
              model: VetPracticesStoreClassification,
              as: 'VetPracticesStoreClassification',
              attributes: ["vet_practice_id", "store-classification_id"],
              include: [
                {
                  model: StoreClassifications,
                  as: 'StoreClassifications',
                  attributes: ["title"]
                },
              ]
            },
          ]
        },
        {
          model: FavoritePractices,
          as: "FavoriteVetPractices",
          attributes: ["user", "created_at"],
          include: [
            {
              model: User,
              as: "users",
              attributes: [
                'first_name', 
                'last_name', 
                'int_code', 
                "state",
                "country",
                "city", 
                "zip_code",
                'mobile', 
                'email',
                'dob', 
                'role', 
                'address1', 
                'address2', 
                'created_at',
              ],
              include: [
                { 
                  model: VetProfile, as: "VetProfileUser", 
                  attributes: [
                    "public_email",
                    "online_consultation",
                    "is_online_consultation",
                    "public_contact_no_int_code",
                    "public_contact_no",
                    "public_out_of_hr_phone_int_code",
                    "public_out_of_hr_phone",
                    "education",
                    "created_at",
                    "personal_bio",
                    "passout_date",
                    "registration_number",
                    "is_in_clinic_consultation",
                    "in_clinic_consultation",
                    "currency_type",
                    "practice",
                    "practitioner_liability",
                    "bank_name",
                    "b_user_name",
                    "b_user_email",
                    "b_country",
                    "b_currency",
                    "b_account_number",
                    "b_address",
                    "b_sort_code",
                    "b_iban",
                    "b_ncc",
                    "b_swiftbic",
                  ],
                  include: [
                    {
                      model: Country,
                      as: "countries",
                      attributes: ["country"]
                    },
                    {
                      model: PractitionerLiability,
                      as: 'practitionerliabilities',
                      attributes: ["name"],
                    },
                    {
                      model: VetProfileSpecialization,
                      as: 'vetprofilespecializations',
                      attributes: ["vet_profile_id", "specialization_id"],
                      include: [
                        {
                          model: Specialization,
                          as: 'specializations',
                          attributes: ["name"]
                        },
                      ]
                    },
                    {
                      model: VetProfileSpecialities,
                      as: 'vetprofilespecialities',
                      attributes: ["vet_profile_id", "speciality_id"],
                      include: [
                        {
                          model: Specialities,
                          as: 'specialities',
                          attributes: ["name"]
                        },
                      ]
                    },
                    {
                      model: VetProfileTreatesTypeAnimal,
                      as: 'vetprofiletreatstypeanimal',
                      attributes: ["vet_profile_id", "animal-category_id"],
                      include: [
                        {
                          model: AnimalCategories,
                          as: 'animalcategories',
                          attributes: ["category"]
                        },
                      ]
                    },
                  ] 
                },
                { model: UsersPermissionsRole, 
                  as: "Role", 
                  attributes: ["name"] 
                },
                {
                  model: Country,
                  as: "countries",
                  attributes: ["country"]
                },
                {
                  model: State,
                  as: "states",
                  attributes: ["state"]
                },                
                { 
                  model: AnimalProfiles, 
                  as: "animalProfile", 
                  attributes: [
                    "breed", 
                    "animal_type", 
                    "name", 
                    "gender", 
                    "status", 
                    "created_at", 
                    "colour", 
                    "date_of_birth", 
                    "height", 
                    "height_type", 
                    "weight", 
                    "weight_type", 
                    "spayed_neutered", 
                    "chip_details", 
                    "regd_breed_name", 
                    "breed_regd_number", 
                    "breeder", 
                    "dam_name", 
                    "dam_breed", 
                    "sire_name", 
                    "sire_breed", 
                    "breed_reference", 
                    "other", 
                    "other_information", 
                    "insurance", 
                    "insurers", 
                    "wantContact", 
                    "chip", 
                    "InsuranceRenewalDate", 
                    "allergies", 
                    "medications", 
                    "date_of_birth"
                  ],
                  include: [
                    { 
                      model : AnimalTypes, 
                      as: "AnimalType", 
                      attributes: ["type"] 
                    },
                    { 
                      model : Breeds, 
                      as: "Breed", 
                      attributes: ["name"] 
                    },
                    { 
                      model : Insurers, 
                      as: "insurer", 
                      attributes: ["name"] 
                    },
                    { 
                      model : Chips, 
                      as: "Chip", 
                      attributes: ["name"] 
                    },
                    { 
                      model : User, 
                      as: "User", 
                      attributes: ["first_name", "last_name"] 
                    },
                  ]
                },
              ]
            }
          ]
        }
      ]
    });
  }

  async getVetPractice(id: number, timeZone: any): Promise<VetPractices | null> {
    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: id, related_type: 'vet_practices' },
      include: [{model: UploadFile, as: 'UploadFile', attributes: ['url', 'id']}] 
    });

    return VetPractices.findOne({ 
      where: { id: id },
      include: [
        { model: VetPracticesTypeAnimal, as: "VetPracticesTypeAnimal", attributes: ["animal-category_id"] },
        { model: VetPracticesClassification, as: "VetPracticesClassification", attributes: ["classification_id"] },
        { model: VetPracticesStoreClassification, as: "VetPracticesStoreClassification", attributes: ["store-classification_id"] },
        { model: VetPracticeServices, as: "VetPracticeService", attributes: ["practice-service_id"] },
        { model: VetPracticeTimeBlocks, as: "VetPracticeTimeBlocks" },
        { model: PetPracticeServices, as: "PetPracticeService", attributes: ["pet-service_id"] },
      ]
     })
      .then(async (vetPractice: any) => {
        if(vetPractice) {
          if(uploadFileMorphData) {
            vetPractice.img_path = uploadFileMorphData.UploadFile.url;
          }
  
          vetPractice.specialityArr = vetPractice && vetPractice.speciality ? vetPractice.speciality.split("#") : [];
          vetPractice.VetPracticesTypeAnimal = vetPractice.VetPracticesTypeAnimal.map((animalType: any) => animalType['animal-category_id']);
          vetPractice.VetPracticesClassification = vetPractice.VetPracticesClassification.map((classification: any) => classification['classification_id']);
          vetPractice.VetPracticesStoreClassification = vetPractice.VetPracticesStoreClassification.map((classification: any) => classification['store-classification_id']);
          vetPractice.practiceService = vetPractice.VetPracticeService.map((practiceService: any) => practiceService['practice-service_id']);
          vetPractice.petService = vetPractice.PetPracticeService.map((petService: any) => petService['pet-service_id']);
          // console.log("vetPracticevetPractice111", vetPractice)

          const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          let blocks: any = [];
          const dayWiseObj: any = {};
          dayWiseObj[day[0]] = [];
          dayWiseObj[day[1]] = [];
          dayWiseObj[day[2]] = [];
          dayWiseObj[day[3]] = [];
          dayWiseObj[day[4]] = [];
          dayWiseObj[day[5]] = [];
          dayWiseObj[day[6]] = [];
          for(let i = 0; i<=vetPractice.VetPracticeTimeBlocks.length;i++) {
            if(vetPractice.VetPracticeTimeBlocks[i]) {
              const fromhours = parseInt(vetPractice.VetPracticeTimeBlocks[i].from.split(':')[0])
              const frommin = parseInt(vetPractice.VetPracticeTimeBlocks[i].from.split(':')[1])
              const tohours = parseInt(vetPractice.VetPracticeTimeBlocks[i].to.split(':')[0])
              const tomin = parseInt(vetPractice.VetPracticeTimeBlocks[i].to.split(':')[1])
              vetPractice.VetPracticeTimeBlocks[i].fromDate = moment().utc().day(vetPractice.VetPracticeTimeBlocks[i].day).set({ hour: fromhours, minute: frommin }).tz(timeZone);
              vetPractice.VetPracticeTimeBlocks[i].toDate = moment().utc().day(vetPractice.VetPracticeTimeBlocks[i].day).set({ hour: tohours, minute: tomin }).tz(timeZone);
              
              // console.log("======================================", vetPractice.VetPracticeTimeBlocks[i].id)
              // console.log(">>> fromDate >>> ", vetPractice.VetPracticeTimeBlocks[i].fromDate);
              // console.log(">>> toDate >>> ", vetPractice.VetPracticeTimeBlocks[i].toDate);
              // console.log(timeZone);
              // console.log(moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].fromDate).utcOffset());
              // console.log(new Date(vetPractice.VetPracticeTimeBlocks[i].fromDate).getTime())
              // console.log(new Date(vetPractice.VetPracticeTimeBlocks[i].toDate).getTime())
              
              // if(!dayWiseObj[day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()]]) {
              //   dayWiseObj[day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()]] = [] 
              // }
              const fromDate = moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].fromDate).date();
              const toDate = moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].toDate).date();
              const fromMonth = moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].fromDate).month() + 1;
              const toMonth = moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].toDate).month() + 1;
              const fromTime = vetPractice.VetPracticeTimeBlocks[i].fromDate || new Date(vetPractice.VetPracticeTimeBlocks[i].fromDate).getTime();
              const toTime = vetPractice.VetPracticeTimeBlocks[i].toDate || new Date(vetPractice.VetPracticeTimeBlocks[i].toDate).getTime();
              // console.log(fromDate < toDate || (fromDate == toDate && fromTime > toTime), fromDate == toDate && fromTime > toTime, fromDate == toDate , fromTime > toTime);
              // const offSet = moment.parseZone(vetPractice.VetPracticeTimeBlocks[i].fromDate).utcOffset();
              // if (offSet > 0) {
              //     // Do Something
              // }
              // console.log("fromMonth", fromMonth);
              // console.log("toMonth", toMonth);
              // console.log("fromDate", fromDate);
              // console.log("toDate", toDate);
              // console.log("fromTime", fromTime);
              // console.log("toTime", toTime);
              // console.log((fromMonth == toMonth && fromDate < toDate));
              // console.log((fromDate == toDate && fromTime > toTime));
              // console.log((fromMonth == toMonth && fromDate < toDate) || (fromDate == toDate && fromTime > toTime));

              if ((fromMonth == toMonth && fromDate < toDate) || (fromDate == toDate && fromTime > toTime) ) {
                // console.log("IF>>>>");
                const toTime = moment().utc().day(vetPractice.VetPracticeTimeBlocks[i].day).set({ hour: 23, minute: 59 });
                dayWiseObj[day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()]].push({ id: vetPractice.VetPracticeTimeBlocks[i].id, from_time: vetPractice.VetPracticeTimeBlocks[i].fromDate, to_time: toTime, day: day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()] });
                // console.log("HERE 1 > ", vetPractice.VetPracticeTimeBlocks[i].fromDate.day(), dayWiseObj);
                const fromTime = moment().utc().day(vetPractice.VetPracticeTimeBlocks[i].day).set({ hour: 0, minute: 0 });
                // if(!dayWiseObj[day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()+1]]) {
                //   let dayNum = vetPractice.VetPracticeTimeBlocks[i].fromDate.day()+1;
                //   dayNum = dayNum == 7 ? 0 : dayNum;
                //   dayWiseObj[day[dayNum]] = []; 
                // }
                let dayNum = vetPractice.VetPracticeTimeBlocks[i].fromDate.day()+1;
                dayNum = dayNum == 7 ? 0 : dayNum;
                // console.log(">>>>>>>>>>>>>>>>>>>",dayWiseObj[day[dayNum]]);

                // dayWiseObj[day[dayNum]].push({ from_time: fromTime, to_time: vetPractice.VetPracticeTimeBlocks[i].toDate, day: day[dayNum] });
                const obj = { from_time: fromTime, to_time: vetPractice.VetPracticeTimeBlocks[i].toDate, day: day[dayNum] };
                dayWiseObj[day[dayNum]].push({ ...obj });
                // for (var x = 0; x < (dayWiseObj[day[dayNum]].length); x++) {
                //   dayWiseObj[day[dayNum]][x+1] = { from_time: fromTime, to_time: vetPractice.VetPracticeTimeBlocks[i].toDate, day: day[dayNum] };
                // }
                // console.log("HERE if 2 > ", dayNum, dayWiseObj);
                
              } else {
                // console.log("else>>>>");
                dayWiseObj[day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()]].push({ id: vetPractice.VetPracticeTimeBlocks[i].id, from_time: vetPractice.VetPracticeTimeBlocks[i].fromDate, to_time: vetPractice.VetPracticeTimeBlocks[i].toDate, day: day[vetPractice.VetPracticeTimeBlocks[i].fromDate.day()] });
                // console.log("HERE else 3 > ", vetPractice.VetPracticeTimeBlocks[i].fromDate.day(), dayWiseObj);
              }
            }
          }
          // console.log("B>>>>", dayWiseObj);
          for (let day in dayWiseObj) {
            dayWiseObj[day].sort((a: any,b: any) => {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
               var dateA = new Date(a.from_time).getTime();
                var dateB = new Date(b.from_time).getTime();
                return dateA > dateB ? 1 : -1;  
            });
            blocks = blocks.concat(dayWiseObj[day]);
          }
          // console.log(blocks);
          // console.log("A>>>>", dayWiseObj);
          vetPractice.VetPracticeTimeBlocks = blocks;
        }
        return vetPractice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateVetPractice(vetPracticeData: any, userId: number, file: any, timeZone: any): Promise<boolean> {
    let uploadFileData: UploadFile;

    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const uploadFileMorphData: any = await UploadFileMorph.findOne({
        where: { related_id: vetPracticeData.id, related_type: 'vet_practices' },
        include: [{model: UploadFile, as: 'UploadFile', attributes: ['id', 'url']}] 
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
        throw new CustomError("Error while uploading vet practice image");
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
      vetPracticeData.img_path = uploadFile.Location

      if(uploadFileMorphData) {
        const getKey = uploadFileMorphData.UploadFile.url.split(`/${uploadPath}/`);
        await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
        await UploadFileMorph.destroy({ where: { related_id: vetPracticeData.id, related_type: 'vet_practices' } });
        await UploadFile.destroy({ where: { id: uploadFileMorphData?.UploadFile?.id } });
      }
    }
    return VetPractices.update({
      practice_name: vetPracticeData.practice_name,
      flag: vetPracticeData.flag,
      public_email: vetPracticeData.public_email,
      address1: vetPracticeData.address1,
      address2: vetPracticeData.address2,
      city: vetPracticeData.city,
      business_phone: vetPracticeData.business_phone,
      zip_code: (vetPracticeData.zip_code) ? vetPracticeData.zip_code : null,
      int_code: (vetPracticeData.int_code) ? vetPracticeData.int_code : null,
      out_of_hr_phone: vetPracticeData.out_of_hr_phone,
      email: vetPracticeData.email,
      website: vetPracticeData.website,
      speciality: vetPracticeData && vetPracticeData.specialityData ? vetPracticeData.specialityData.join("#") : "",
      practice_accreditation_no: vetPracticeData.practice_accreditation_no,
      country: (vetPracticeData.country) ? vetPracticeData.country : null,
      state: (vetPracticeData.state) ? vetPracticeData.state : null,
      latitude: (vetPracticeData.latitude) ? vetPracticeData.latitude : null,
      longitude: (vetPracticeData.longitude) ? vetPracticeData.longitude : null,
      updated_by: userId,
      img_path: vetPracticeData.img_path
    }, { where: { id: vetPracticeData.id } })
      .then(async () => {
        await this.createOrUpdateTimeBlocks(vetPracticeData, vetPracticeData.id, userId, timeZone);
        
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: vetPracticeData.id,
            related_type: "vet_practices",
            field: "image",
            order: 1
          });
        }
        await VetPracticesClassification.destroy({ where: { vet_practice_id: vetPracticeData.id } });
        await VetPracticesStoreClassification.destroy({ where: { vet_practice_id: vetPracticeData.id } });
        await VetPracticesTypeAnimal.destroy({ where: { vet_practice_id: vetPracticeData.id } });
        if(vetPracticeData && vetPracticeData.types) {
          const animalData: any = [];
          vetPracticeData.types.map((type: any) => {
            animalData.push({ vet_practice_id: vetPracticeData.id, "animal-category_id": type });
          });
          await VetPracticesTypeAnimal.bulkCreate(animalData);
        }
        if(vetPracticeData && vetPracticeData.classification) {
          const classificationData: any = [];
          vetPracticeData.classification?.map((classification: any) => {
            classificationData.push({ vet_practice_id: vetPracticeData.id, "classification_id": classification });
          });
          await VetPracticesClassification.bulkCreate(classificationData);
        }
        if(vetPracticeData && vetPracticeData.storeClassification) {
          const classificationData: any = [];
          vetPracticeData.storeClassification?.map((classification: any) => {
            classificationData.push({ vet_practice_id: vetPracticeData.id, "store-classification_id": classification });
          });
          await VetPracticesStoreClassification.bulkCreate(classificationData);
        }
        if(vetPracticeData && !vetPracticeData.practice_service) {
          await VetPracticeServices.destroy({ where: { vet_practice_id: vetPracticeData.id } });
        }
        if(vetPracticeData && vetPracticeData.practice_service) {
          await VetPracticeServices.destroy({ where: { vet_practice_id: vetPracticeData.id } });
          const practiceServiceData: any = [];
          vetPracticeData.practice_service?.map((practice_service: any) => {
            practiceServiceData.push({ vet_practice_id: vetPracticeData.id, "practice-service_id": practice_service });
          });
          await VetPracticeServices.bulkCreate(practiceServiceData);
        }
        if(vetPracticeData && !vetPracticeData.pet_service) {
          await PetPracticeServices.destroy({ where: { vet_practice_id: vetPracticeData.id } });
        }
        if(vetPracticeData && vetPracticeData.pet_service) {
          await PetPracticeServices.destroy({ where: { vet_practice_id: vetPracticeData.id } });
          const petServiceData: any = [];
          vetPracticeData.pet_service?.map((pet_service: any) => {
            petServiceData.push({ vet_practice_id: vetPracticeData.id, "pet-service_id": pet_service });
          });
          await PetPracticeServices.bulkCreate(petServiceData);
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importVetPractice(
    file: any,
    userId: number,
    timeZone: any
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const vetPracticeJsonData = await csv().fromFile(file.path);
    if(!vetPracticeJsonData) {
      throw new CustomError('Unable to import data');
    }

    const checkHeader = Object.keys(vetPracticeJsonData[0]).filter(key => !constants.VET_PRACTICE_HEADING.includes(key));
    if(checkHeader.length !== 0) {
      throw new CustomError('Please set header as sample excel');
    }

    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(vetPracticeJsonData.map(async (vetPractice: any) => {
      const checkvetPractice = await VetPractices.count({where: { email: vetPractice.email_address, is_deleted : null }});
      if(checkvetPractice) {
        return;
      }
      let country:any = null;
      let state:any = null;
      if(vetPractice && vetPractice.country) {
        country = await Country.findOne({attributes:['id'],where: {country: vetPractice.country}})
      }
      if(vetPractice && vetPractice.int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetPractice.int_code}})
        vetPractice.int_code = country && country.id ? country.id : null;
      }
      if(vetPractice && vetPractice.state) {
        state = await State.findOne({attributes:['id'],where: {state: vetPractice.state}})
      }
      VetPractices.create({
        practice_name: vetPractice.practice_name,
        public_email: vetPractice.public_email,
        address1: vetPractice.address,
        address2: vetPractice.address2,
        city: vetPractice.city,
        zip_code: vetPractice.zip_code,
        int_code: vetPractice.int_code,
        business_phone: vetPractice.business_phone,
        out_of_hr_phone: vetPractice.out_of_hours_number,
        email: vetPractice.email_address,
        website: vetPractice.website,
        speciality: vetPractice.area_of_interest_or_specialisations,
        practice_accreditation_no: vetPractice.practice_accreditation_no,
        latitude: vetPractice.lat,
        longitude: vetPractice.long,
        country: country && country.id && country.id || null,
        state: state && state.id && state.id || null,
        created_by: userId
      }).then(async (vetPracticeData: any) => {
        const monday = vetPractice.monday && vetPractice.monday.split(",");
        const tuesday = vetPractice.tuesday && vetPractice.tuesday.split(",");
        const wednesday = vetPractice.wednesday && vetPractice.wednesday.split(",");
        const thursday = vetPractice.thursday && vetPractice.thursday.split(",");
        const friday = vetPractice.friday && vetPractice.friday.split(",");
        const saturday = vetPractice.saturday && vetPractice.saturday.split(",");
        const sunday = vetPractice.sunday && vetPractice.sunday.split(",");
        
        const bulkTimeBlocks: object[] = [];
        const timeBlockObj = {
          created_by: userId,
          vet_practice: vetPracticeData.id,
        };
          
        for (let i = 0; i < monday.length; i++) {
          const slot = monday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;
          
          let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < tuesday.length; i++) {
          const slot = tuesday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < wednesday.length; i++) {
          const slot = wednesday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < thursday.length; i++) {
          const slot = thursday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < friday.length; i++) {
          const slot = friday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < saturday.length; i++) {
          const slot = saturday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < sunday.length; i++) {
          const slot = sunday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        if (bulkTimeBlocks.length > 0) {
          await VetPracticeTimeBlocks.bulkCreate(bulkTimeBlocks);
        }
        if(vetPractice && vetPractice.treated_type_of_pets_animal) {
          const animalData: any = [];
          const animalTypes = await Promise.all(vetPractice.treated_type_of_pets_animal.split(",").map((item: string) => item.trim()));
          await Promise.all(animalTypes.map(async (animalType: any) => {
            const animalTypeData = await AnimalCategories.findOne({ where: { category: animalType }, attributes: ['id'], raw: true });
            if (animalTypeData) {
              animalData.push({ vet_practice_id: vetPracticeData.id, "animal-category_id": animalTypeData.id });
            }
          }));
          await VetPracticesTypeAnimal.bulkCreate(animalData);
        }
        
        if(vetPractice && vetPractice.classification) {
          const classificationData: any = [];
          const classifications = await Promise.all(vetPractice.classification.split("#").map((item: string) => item.trim()));
          await Promise.all(classifications.map(async (classification: any) => {
            const classificationCheck = await Classifications.findOne({ where: { title: classification }, attributes: ['id'], raw: true });
            if (classificationCheck) {
              classificationData.push({ vet_practice_id: vetPracticeData.id, "classification_id": classificationCheck.id });
            }
          }));
          await VetPracticesClassification.bulkCreate(classificationData);
        }

        if(vetPractice && vetPractice.practice_service) {
          const practiceServiceData: any = [];
          const practiceServices = await Promise.all(vetPractice.practice_service.split(",").map((item: string) => item.trim()));
          await Promise.all(practiceServices.map(async (practice_service: any) => {
            const practiceServiceCheck = await PracticeServices.findOne({ where: { name: practice_service }, attributes: ['id'], raw: true });
            if (practiceServiceCheck) {
              practiceServiceData.push({ vet_practice_id: vetPracticeData.id, "practice-service_id": practiceServiceCheck.id });
            }
          }));
          await VetPracticeServices.bulkCreate(practiceServiceData);
        }

        // create user for vet-practice manager
        const role = await UsersPermissionsRole.findOne({where: { name: config.common.role.vet_practice_admin_role_name }})
        // const resetPasswordToken = uuidv4();
        const checkUser = await User.findOne({where: { email: vetPractice.email_address }});
        if(checkUser) {
          await User.update({
            email: vetPractice.email_address,
            password: bcryptjs.hashSync(config.defaultUserPassword, config.bcryptSalt),
            resetPasswordToken: null,
            first_name: vetPractice.first_name || "",
            last_name: vetPractice.last_name || "",
            mobile: vetPractice.business_phone,
            address1: vetPractice.address,
            address2: vetPractice.address2,
            city: vetPractice.city,
            zip_code: (vetPractice.zip_code) ? vetPractice.zip_code : null,
            int_code: (vetPractice.int_code) ? vetPractice.int_code : null,
            role: role && role.id && role.id || 4,
            country: country && country.id && country.id || null,
            state: state && state.id && state.id || null,
            provider: 'local',
            confirmed: 1,
            blocked: 0,
            updated_by: userId,
          }, { where: { id: checkUser.id } })
            .then(async () => {
              await VetProfile.update({
                created_by: userId,
                currency_type: "USD",
                user: checkUser.id,
                practice: vetPracticeData ? vetPracticeData.id : null,
                }, {where: {user: checkUser.id}
              });
            });
        } else {
          await User.create({
            email: vetPractice.email_address,
            password: bcryptjs.hashSync(config.defaultUserPassword, config.bcryptSalt),
            resetPasswordToken: null,
            first_name: vetPractice.first_name || "",
            last_name: vetPractice.last_name || "",
            mobile: vetPractice.business_phone,
            address1: vetPractice.address,
            address2: vetPractice.address2,
            city: vetPractice.city,
            zip_code: (vetPractice.zip_code) ? vetPractice.zip_code : null,
            int_code: (vetPractice.int_code) ? vetPractice.int_code : null,
            role: role && role.id && role.id || 4,
            country: country && country.id && country.id || null,
            state: state && state.id && state.id || null,
            provider: 'local',
            confirmed: 1,
            blocked: 0,
            created_by: userId
          })
          .then(async user => {
            await VetProfile.create({
              created_by: userId,
              currency_type: "USD",
              user: user.id,
              practice: vetPracticeData ? vetPracticeData.id : null,
            });
          });
        }
        return vetPracticeData;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    }).catch((error: Error) => {
      throw error;
    });
  }

  async createOrUpdateTimeBlocks(vetPracticeData: any,vet_practice: number,userId: number, timeZone: any) {
    const bulkTimeBlocks: object[] = [];
    const timeBlockObj = {
      created_by: userId,
      vet_practice,
    };
    const persentId = [];
    let blocks: any = {};
    if(vetPracticeData && vetPracticeData.id) {
      blocks = await this.getVetPractice(vetPracticeData.id, timeZone);
    }
    if (vetPracticeData.id && (!vetPracticeData.monday || vetPracticeData.monday === undefined)) {
      const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'monday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.tuesday || vetPracticeData.tuesday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'tuesday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.wednesday || vetPracticeData.wednesday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'wednesday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.thursday || vetPracticeData.thursday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'thursday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.friday || vetPracticeData.friday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'friday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.saturday || vetPracticeData.saturday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'saturday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }
    if (vetPracticeData.id && (!vetPracticeData.sunday || vetPracticeData.sunday === undefined)) {
    const id = blocks && blocks.VetPracticeTimeBlocks && blocks.VetPracticeTimeBlocks.filter((i:any) => i.day === 'sunday').map((i: any) => i.id);
      if(id && id.length){
        await VetPracticeTimeBlocks.destroy({where: { id }});
      }
    }

    while (vetPracticeData.monday && vetPracticeData.monday.length > 0) {

      if (!vetPracticeData.monday[0].includes(':')) {
        const val = vetPracticeData.monday.splice(0, 3);

        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          // console.log(">>>>>>>>>>>>>", val[0]);
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 1)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.monday.splice(0, 2);

        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.tuesday && vetPracticeData.tuesday.length > 0) {
      if (!vetPracticeData.tuesday[0].includes(':')) {
        const val = vetPracticeData.tuesday.splice(0, 3);

        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 2)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.tuesday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.wednesday && vetPracticeData.wednesday.length > 0) {
      if (!vetPracticeData.wednesday[0].includes(':')) {
        const val = vetPracticeData.wednesday.splice(0, 3);

        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 3)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.wednesday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.thursday && vetPracticeData.thursday.length > 0) {
      if (!vetPracticeData.thursday[0].includes(':')) {
        const val = vetPracticeData.thursday.splice(0, 3);
        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 4)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.thursday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.friday && vetPracticeData.friday.length > 0) {
      if (!vetPracticeData.friday[0].includes(':')) {
        const val = vetPracticeData.friday.splice(0, 3);
        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 5)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.friday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.saturday && vetPracticeData.saturday.length > 0) {
      if (!vetPracticeData.saturday[0].includes(':')) {
        const val = vetPracticeData.saturday.splice(0, 3);
        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 6)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.saturday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    while (vetPracticeData.sunday && vetPracticeData.sunday.length > 0) {
      if (!vetPracticeData.sunday[0].includes(':')) {
        const val = vetPracticeData.sunday.splice(0, 3);
        const fromhours = parseInt(val[1].split(':')[0])
        const frommin = parseInt(val[1].split(':')[1])
        const tohours = parseInt(val[2].split(':')[0])
        const tomin = parseInt(val[2].split(':')[1])

        let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

        if (val[0] && !isNaN(val[0])) {
          persentId.push(parseInt(val[0]));
          const updateObj = { ...timeBlockObj, id: parseInt(val[0]), day: day1, from: from1, to: to1 };
  
          // console.log("ERROR FROM HERE MF", 7)
          await VetPracticeTimeBlocks.update(updateObj, { where: { id: parseInt(val[0]) } });
        } else {
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
      } else {
        const val = vetPracticeData.sunday.splice(0, 2);
        const fromhours = parseInt(val[0].split(':')[0])
        const frommin = parseInt(val[0].split(':')[1])
        const tohours = parseInt(val[1].split(':')[0])
        const tomin = parseInt(val[1].split(':')[1])

        let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
        let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
        let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

        bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
      }
    }
    if (persentId && persentId.length) {
      let deletIds: any[] = await VetPracticeTimeBlocks.findAll({ attributes:["id"], where: { id: { [Op.notIn]: persentId }, vet_practice: vetPracticeData.id } });
      deletIds = deletIds.map(i=>i.id);
      if (deletIds && deletIds.length > 0) {
        await VetPracticeTimeBlocks.destroy({ where: { id: deletIds } })
      }
    }

    if (bulkTimeBlocks.length > 0) {
      return VetPracticeTimeBlocks.bulkCreate(bulkTimeBlocks);
    }
    return true;
  }

  async importVetPracticeUpdate(
    file: any,
    userId: number,
    timeZone: any
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const vetPracticeJsonData = await csv().fromFile(file.path);
    if(!vetPracticeJsonData) {
      throw new CustomError('Unable to import data');
    }
  
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }

    // const practiceServiceCheck = await PracticeServices.findAll({ where: { is_deleted : null }, attributes: ['id', 'name'], raw: true });
    // console.log(practiceServiceCheck);
    return Promise.all(vetPracticeJsonData.map(async (vetPractice: any) => {
      await VetPractices.update({
        practice_name: vetPractice.store_name, city: vetPractice.city ,zip_code: vetPractice.zip_code
      }, { where: { email: vetPractice.email } });

      await User.update({
        last_name: vetPractice.store_name, city: vetPractice.city ,zip_code: vetPractice.zip_code
      }, { where: { email: vetPractice.email } });
  
    })).then(() => {
      return true;
    }).catch((error: Error) => {
      throw error;
    });
  }

  async getVetPracticeReportData(): Promise<VetPractices[] | null> {
    return VetPractices.findAll({
      group: 'id',
      attributes: [
        'id',
        'email'
      ],
      where: { is_deleted: null }
    });
  }

  async importMissingPracticeAdministrator(
    userId: number,
    limit: number,
    offset: number
  ): Promise<boolean> {

    const query = limit && offset ? { limit, offset } : {};
    const vetPracticeJsonData = await VetPractices.findAll({ where: { is_deleted: null, id: {[Op.notIn]: [1,2,3]} }, ...query });

    return Promise.all(vetPracticeJsonData.map(async (vetPractice: VetPractices) => {
        const checkUser = await User.count({where: { email: vetPractice.email, is_deleted: null }});
        if (checkUser) {
          return true;
        }
        // console.log(vetPractice.email);
        // const first_name = vetPractice && vetPractice.email ? vetPractice.email.split("@")[0] : "";
        // const last_name = "Administrator";
        // await User.create({
        //   email: vetPractice.email,
        //   password: bcryptjs.hashSync(config.defaultUserPassword, config.bcryptSalt),
        //   resetPasswordToken: null,
        //   first_name: first_name || "",
        //   last_name: last_name || "",
        //   mobile: vetPractice.business_phone,
        //   address1: vetPractice.address1,
        //   address2: vetPractice.address2,
        //   city: vetPractice.city,
        //   zip_code: (vetPractice.zip_code) ? vetPractice.zip_code : null,
        //   int_code: (vetPractice.int_code) ? vetPractice.int_code : null,
        //   role: 4,
        //   country: vetPractice && vetPractice.country || null,
        //   state: vetPractice && vetPractice.state || null,
        //   provider: 'local',
        //   confirmed: 1,
        //   blocked: 0,
        //   created_by: userId
        // })
        // .then(async user => {
        //   await VetProfile.create({
        //     created_by: userId,
        //     currency_type: "USD",
        //     user: user.id,
        //     practice: vetPractice && vetPractice.id || null,
        //   });
        // });
        return vetPractice;
    })).then(() => {
      return true;
    }).catch((error: Error) => {
      throw error;
    });
  }

  async getUserReportData1(limit: number, offset: number): Promise<VetPractices[] | null> {
    const query = Number(limit) ? { limit, offset } : {};
    // console.log(query);
    let x = await VetPractices.findAll({
      // group: 'id',
      // raw: true,
      attributes: [
        "id",
        "practice_name",
        "address1",
        "address2",
        "city",
        "zip_code",
        // "int_code",
        "business_phone",
        "out_of_hr_phone",
        "email",
        "website",
        "public_email",
        "practice_accreditation_no",
        "latitude",
        "longitude",
        "claimed_datetime",
        "speciality"
      ],
      include: [
        {
          model: Country,
          as: "intCode",
          attributes: ["country"]
        },
        {
          model: Country,
          as: "countries",
          attributes: ["country"]
        },
        {
          model: State,
          as: "states",
          attributes: ["state"]
        },
        { model: VetPracticeTimeBlocks, as: "VetPracticeTimeBlocks" },
        {
          model: UploadFileMorph,
          as: "image",
          attributes: ["upload_file_id", "related_id", "related_type", "field"],
          where: { related_type: 'vet_practices' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: 'UploadFile',
              attributes: ["id", "url"]
            },
          ]
        },
        {
          model: VetPracticesTypeAnimal,
          as: 'VetPracticesTypeAnimal',
          foreignKey: "vet_practice_id",
          attributes: ["vet_practice_id", "animal-category_id"],
          include: [
            {
              model: AnimalCategories,
              as: 'animalcategories',
              attributes: ["category"]
            },
          ]
        },
        {
          model: VetPracticesClassification,
          as: 'VetPracticesClassification',
          attributes: ["vet_practice_id", "classification_id"],
          include: [
            {
              model: Classifications,
              as: 'classifications',
              attributes: ["title"]
            },
          ]
        },
        {
          model: VetPracticesStoreClassification,
          as: 'VetPracticesStoreClassification',
          attributes: ["vet_practice_id", "store-classification_id"],
          include: [
            {
              model: StoreClassifications,
              as: 'StoreClassifications',
              attributes: ["title"]
            },
          ]
        },
        {
          model: VetPracticeServices,
          as: 'VetPracticeService',
          attributes: ["vet_practice_id", "practice-service_id"],
          include: [
            {
              model: PracticeServices,
              as: 'PracticeServices',
              attributes: ["name"]
            },
          ]
        },
      ],
      where: { is_deleted: null },
      ...query,
      order: [["id", "ASC"]]
    });
    // x = x.map(a => a.toJSON());
    // console.log(x)
    return x;
  }

  async importVetStore(
    file: any,
    userId: number,
    timeZone: any
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }

    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }

    const vetPracticeJsonData = await csv().fromFile(file.path);
    if(!vetPracticeJsonData) {
      throw new CustomError('Unable to import data');
    }

    const checkHeader = Object.keys(vetPracticeJsonData[0]).filter(key => !constants.VET_STORE_HEADING.includes(key));
    if(checkHeader.length !== 0) {
      throw new CustomError('Please set header as sample excel');
    }

    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(vetPracticeJsonData.map(async (vetPractice: any) => {
      const checkvetPractice = await VetPractices.count({where: { email: vetPractice.email_address, is_deleted : null }});
      if(checkvetPractice) {
        return;
      }
      let country:any = null;
      let state:any = null;
      if(vetPractice && vetPractice.country) {
        country = await Country.findOne({attributes:['id'],where: {country: vetPractice.country}})
      }
      if(vetPractice && vetPractice.int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetPractice.int_code}})
        vetPractice.int_code = country && country.id ? country.id : null;
      }
      if(vetPractice && vetPractice.state) {
        state = await State.findOne({attributes:['id'],where: {state: vetPractice.state}})
      }
      VetPractices.create({
        practice_name: vetPractice.store_name,
        public_email: vetPractice.public_email,
        address1: vetPractice.address,
        address2: vetPractice.address2,
        city: vetPractice.city,
        zip_code: vetPractice.zip_code,
        int_code: vetPractice.int_code,
        business_phone: vetPractice.business_phone,
        out_of_hr_phone: vetPractice.out_of_hours_number,
        email: vetPractice.email_address,
        website: vetPractice.website,
        speciality: vetPractice.area_of_interest_or_specialisations,
        practice_accreditation_no: vetPractice.store_accreditation_no,
        latitude: vetPractice.lat,
        longitude: vetPractice.long,
        country: country && country.id && country.id || null,
        state: state && state.id && state.id || null,
        created_by: userId,
        option : "store"
      }).then(async (vetPracticeData: any) => {
        const monday = vetPractice.monday && vetPractice.monday.split(",");
        const tuesday = vetPractice.tuesday && vetPractice.tuesday.split(",");
        const wednesday = vetPractice.wednesday && vetPractice.wednesday.split(",");
        const thursday = vetPractice.thursday && vetPractice.thursday.split(",");
        const friday = vetPractice.friday && vetPractice.friday.split(",");
        const saturday = vetPractice.saturday && vetPractice.saturday.split(",");
        const sunday = vetPractice.sunday && vetPractice.sunday.split(",");

        const bulkTimeBlocks: object[] = [];
        const timeBlockObj = {
          created_by: userId,
          vet_practice: vetPracticeData.id,
        };

        for (let i = 0; i < monday.length; i++) {
          const slot = monday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < tuesday.length; i++) {
          const slot = tuesday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < wednesday.length; i++) {
          const slot = wednesday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < thursday.length; i++) {
          const slot = thursday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < friday.length; i++) {
          const slot = friday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < saturday.length; i++) {
          const slot = saturday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        for (let i = 0; i < sunday.length; i++) {
          const slot = sunday[i].split('-');     
          const fromhours = slot && slot[0] && parseInt(slot[0].split(':')[0]) || 0;
          const frommin = slot && slot[0] && parseInt(slot[0].split(':')[1]) || 0;
          const tohours = slot && slot[1] && parseInt(slot[1].split(':')[0]) || 0;
          const tomin = slot && slot[1] && parseInt(slot[1].split(':')[1]) || 0;

          let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()
          bulkTimeBlocks.push({ day: day1, from: from1, to: to1, ...timeBlockObj });
        }
        if (bulkTimeBlocks.length > 0) {
          await VetPracticeTimeBlocks.bulkCreate(bulkTimeBlocks);
        }
        if(vetPractice && vetPractice.treated_type_of_pets_animal) {
          const animalData: any = [];
          const animalTypes = await Promise.all(vetPractice.treated_type_of_pets_animal.split(",").map((item: string) => item.trim()));
          await Promise.all(animalTypes.map(async (animalType: any) => {
            const animalTypeData = await AnimalCategories.findOne({ where: { category: animalType }, attributes: ['id'], raw: true });
            if (animalTypeData) {
              animalData.push({ vet_practice_id: vetPracticeData.id, "animal-category_id": animalTypeData.id });
            }
          }));
          await VetPracticesTypeAnimal.bulkCreate(animalData);
        }

        // STORE CLASSIFICATION
        if(vetPractice && vetPractice.classification) {
          const classificationData: any = [];
          const classifications = await Promise.all(vetPractice.classification.split("#").map((item: string) => item.trim()));
          await Promise.all(classifications.map(async (classification: any) => {
            const classificationCheck = await StoreClassifications.findOne({ where: { title: classification, is_deleted : null }, attributes: ['id'], raw: true });
            if (classificationCheck) {
              classificationData.push({ vet_practice_id: vetPracticeData.id, "store-classification_id": classificationCheck.id });
            }
          }));
          await VetPracticesStoreClassification.bulkCreate(classificationData);
        }

        if(vetPractice && vetPractice.store_service) {
          const practiceServiceData: any = [];
          const practiceServices = await Promise.all(vetPractice.store_service.split(",").map((item: string) => item.trim()));
          await Promise.all(practiceServices.map(async (practice_service: any) => {
            const practiceServiceCheck = await PetServices.findOne({ where: { name: practice_service, is_deleted : null }, attributes: ['id'], raw: true });
            if (practiceServiceCheck) {
              practiceServiceData.push({ vet_practice_id: vetPracticeData.id, "pet-service_id": practiceServiceCheck.id });
            }
          }));
          await petPracticeServices.bulkCreate(practiceServiceData);
        }

        // create user for vet-practice manager
        const role = await UsersPermissionsRole.findOne({where: { name: config.common.role.vet_practice_admin_role_name }})
        // const resetPasswordToken = uuidv4();
        const checkUser = await User.findOne({where: { email: vetPractice.email_address }});
        if(checkUser) {
          await User.update({
            email: vetPractice.email_address,
            password: bcryptjs.hashSync(config.defaultUserPassword, config.bcryptSalt),
            resetPasswordToken: null,
            first_name: vetPractice.first_name || "",
            last_name: vetPractice.last_name || "",
            mobile: vetPractice.business_phone,
            address1: vetPractice.address,
            address2: vetPractice.address2,
            city: vetPractice.city,
            zip_code: (vetPractice.zip_code) ? vetPractice.zip_code : null,
            int_code: (vetPractice.int_code) ? vetPractice.int_code : null,
            role: role && role.id && role.id || 4,
            country: country && country.id && country.id || null,
            state: state && state.id && state.id || null,
            provider: 'local',
            confirmed: 1,
            blocked: 0,
            updated_by: userId,
          }, { where: { id: checkUser.id } })
            .then(async () => {
              await VetProfile.update({
                created_by: userId,
                currency_type: "USD",
                user: checkUser.id,
                practice: vetPracticeData ? vetPracticeData.id : null,
                }, {where: {user: checkUser.id}
              });
            });
        } else {
          await User.create({
            email: vetPractice.email_address,
            password: bcryptjs.hashSync(config.defaultUserPassword, config.bcryptSalt),
            resetPasswordToken: null,
            first_name: vetPractice.first_name || "",
            last_name: vetPractice.last_name || "",
            mobile: vetPractice.business_phone,
            address1: vetPractice.address,
            address2: vetPractice.address2,
            city: vetPractice.city,
            zip_code: (vetPractice.zip_code) ? vetPractice.zip_code : null,
            int_code: (vetPractice.int_code) ? vetPractice.int_code : null,
            role: role && role.id && role.id || 4,
            country: country && country.id && country.id || null,
            state: state && state.id && state.id || null,
            provider: 'local',
            confirmed: 1,
            blocked: 0,
            created_by: userId
          })
          .then(async user => {
            await VetProfile.create({
              created_by: userId,
              currency_type: "USD",
              user: user.id,
              practice: vetPracticeData ? vetPracticeData.id : null,
            });
          });
        }
        return vetPracticeData;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    }).catch((error: Error) => {
      throw error;
    });
  }
}
