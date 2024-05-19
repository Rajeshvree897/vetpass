import csv from 'csvtojson';
import fs from "fs";
import path from "path";
import config from "../config";
import { mailer } from "../helpers/mailer";
import crypto from "crypto";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import Forums from "../db/models/forums";
import ForumsAnimalTypes from "../db/models/forums-animal-types";
import ForumsBreeds from "../db/models/forums-breeds";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import { awsS3 } from "../helpers/aws-s3";
import { ForumStatus, validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
import User from '../db/models/user';
import ForumsVetID from '../db/models/forums-vet-id';
import ForumsAnswers from '../db/models/forums-answers';
import NotificationService from './notification-service';
import ProfileService from './profile';
import ForumsSpecializations from '../db/models/forums-specializations';
import Specialization from "../db/models/specialization";
import ForumsCountry from '../db/models/forums-country';
import Country from '../db/models/country';
import ForumsAnimalCategories from '../db/models/forums-animal-categories';
import AnimalCategories from '../db/models/animal-categories';
import { sequelize } from '../db';
import { Transaction } from 'sequelize';
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class ForumsServices {
  constructor() { }

  async getForum(id: number): Promise<any> {
    return Forums.findOne({
      where: { id: id },
      include: [
        {
          model: UploadFileMorph, as: "ForumsIcon",
          where: { 'related_type': 'forums' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["id", "url"]
            }
          ]
        },
      ]
    })
      .then(async (forums: any) => {
        if (forums) {
          const forumId = forums.id;

          const ForumsBreedsData: any = await ForumsBreeds.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: Breeds,
                as: "Breeds",
                attributes: ["id", "name"],
                required: false
              }
            ]
          });

          const ForumsAnimalCategoriesData: any = await ForumsAnimalCategories.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: AnimalCategories,
                as: "Categories",
                attributes: ["id", "category"],
                required: false
              }
            ]
          });

          const ForumsAnimalTypesData: any = await ForumsAnimalTypes.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: AnimalTypes,
                as: "Types",
                attributes: ["id", "type"],
                required: false
              }
            ]
          });

          const ForumsVetIDData: any = await ForumsVetID.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: User,
                as: "Users",
                attributes: ["id", "first_name", "last_name"],
                required: false
              }
            ]
          });

          const ForumsSpecializationsData: any = await ForumsSpecializations.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: Specialization,
                as: "Specializations",
                attributes: ["id", "name"],
              }
            ]
          });

          const ForumsCountryData: any = await ForumsCountry.findAll({
            where: { forum_id: forumId },
            include: [
              {
                model: Country,
                as: "Country",
                attributes: ["id", "country"],
              }
            ]
          });
          const breedsTypeArray: any = [];
          const ForumsBreedsFinalData = ForumsBreedsData.map((result: any) => {
            const obj: any = {}
            obj.id = result.Breeds?.id;
            obj.name = result.Breeds?.name;
            breedsTypeArray.push(result.Breeds?.id);
            return obj;
          });
          const ForumsAnimalCategoriesIds: any = [];
          const ForumsAnimalCategoriesFinalData = ForumsAnimalCategoriesData.map((result: any) => {
            const obj: any = {}
            ForumsAnimalCategoriesIds.push(result.Categories?.id)
            obj.id = result.Categories?.id;
            obj.category = result.Categories?.category;
            return obj;
          });
          const ForumsAnimalTypesIds: any = [];
          const ForumsAnimalTypesFinalData = ForumsAnimalTypesData.map((result: any) => {
            const obj: any = {}
            ForumsAnimalTypesIds.push(result.Types?.id)
            obj.id = result.Types?.id;
            obj.type = result.Types?.type;
            return obj;
          });
          const ForumsVetIDFinalData = ForumsVetIDData.map((result: any) => {
            const obj: any = {}
            obj.id = result.Users?.id;
            obj.first_name = result.Users?.first_name + ' ' + result.Users?.last_name;
            return obj;
          });
          const specializationIdArray: any = [];
          const ForumsSpecializationsFinalData = ForumsSpecializationsData.map((result: any) => {
            const obj: any = {}
            specializationIdArray.push(result.Specializations?.id);
            obj.id = result.Specializations?.id;
            obj.name = result.Specializations?.name;
            return obj;
          });
          const countryIdArray: any = [];
          const ForumsCountryFinalData = ForumsCountryData.map((result: any) => {
            const obj: any = {}
            obj.id = result.Country?.id;
            obj.country = result.Country?.country;
            countryIdArray.push(result.Country?.id);
            return obj;
          });

          forums.breeds = ForumsBreedsFinalData;
          forums.types = ForumsAnimalTypesFinalData;
          forums.categories = ForumsAnimalCategoriesFinalData;
          forums.categoriesArray = ForumsAnimalCategoriesIds;
          forums.typesArray = ForumsAnimalTypesIds;
          forums.users = ForumsVetIDFinalData;
          forums.specializations = ForumsSpecializationsFinalData;
          forums.country = ForumsCountryFinalData;
          forums.breedsTypeArray= breedsTypeArray;
          forums.countryIdArray = countryIdArray;
          forums.specializationIdArray = specializationIdArray;
          return forums;
        }
        return forums;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addForum(
    forums: any,
    userId: number,
    userData: any,
    files: Express.Multer.File[],
  ): Promise<Forums> {
    let uploadFileData: UploadFile[] = [];

    for (const file of files) {
      if (!(typeof file === "object") || ![...validImageTypes, "application/pdf"].includes(file.mimetype)) {
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
        throw new CustomError("Error while uploading forum image");
      }

      const uploadedFile = await UploadFile.create({
        name: filename,
        hash: `${basename}_${randomSuffix()}`,
        ext,
        mime: file.mimetype,
        size: file.size,
        url: uploadFile.Location,
        provider: "aws-s3",
        created_by: forums.created_by
      });

      uploadFileData.push(uploadedFile);
    }

    if(forums.privacy === "Public") {
      delete forums.user
    }
    if(forums.privacy === "Private" && !forums.user) {
      forums.privacy = 'Public'
    }

    forums.status = ForumStatus[forums.status];    

    return await Forums.create({
      question: forums.question, 
      description:forums?.description, 
      category:forums.category, 
      // date:forums.date, 
      user_id: userId, 
      status: forums.status,
      vet_only:forums?.vet_only,
      privacy:forums.privacy,
      is_admin: userData.roleName == 'admin' ? true : false,
      created_by: forums.created_by
    })
      .then(async forumsData => {
        uploadFileData.forEach(async (file: UploadFile) => {
          await UploadFileMorph.create({
            upload_file_id: file.id,
            related_id: forumsData.id,
            related_type: "forums",
            field: "image",
            order: 1
          })
        });

        const forumsDataId = forumsData.id;
        const profileService = new ProfileService();
        const animalCategoryData: object[] = [];
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        let usersData: object[] = [];
        let specializationsData: object[] = [];
        let countryData: object[] = [];
        let vetUserIds: any[] = [];

        forums.user?.split(",").map((user: number) => {
          if(user){
            usersData.push({ forum_id: forumsDataId, user_id: user })
          }
        });
          
        await ForumsVetID.bulkCreate(usersData);

        forums.animal_category?.split(",").map(async (category: number) => {
          if(category) {
            animalCategoryData.push({ forum_id: forumsDataId, "animal-category_id": category })
          }
        });
        await ForumsAnimalCategories.bulkCreate(animalCategoryData);

        forums.type?.split(",").map(async (type: number) => {
          if(type) {
            animalTypesdata.push({ forum_id: forumsDataId, "animal-type_id": type })
          }
        });
        
        await ForumsAnimalTypes.bulkCreate(animalTypesdata);

        forums.breed?.split(",").map((breed: number) => {
          if(breed){
            breedsData.push({ forum_id: forumsDataId, breed_id: breed })
          }
        });
        
        await ForumsBreeds.bulkCreate(breedsData);

        forums.specialization?.split(",").map((specialization: number) => {
          if(specialization){
            specializationsData.push({ forum_id: forumsDataId, specialization_id: specialization })
          }
        });
        
        await ForumsSpecializations.bulkCreate(specializationsData);

        forums.country?.split(",").map((country: number) => {
          if(country){
            countryData.push({ forum_id: forumsDataId, "country-drop-down_id": country })
          }
        });
        
        await ForumsCountry.bulkCreate(countryData);

        if(forums.privacy === 'Private' && typeof forums.status === 'number' && forums.status === 1) {
          const forumVetUserIds = await ForumsVetID.findAll({ attributes: ['user_id'], where: { forum_id: forumsDataId } });

          for(let userId in forumVetUserIds)
          {
            vetUserIds.push(forumVetUserIds[userId].user_id)
          }
          
          const notification = new NotificationService();
          let type = "vet_users_forum";
          let forumQuestion = forumsData?.question;
          let forumUser = userData?.username;
  
          if(forumQuestion && forumQuestion.length > 50) {
            let length = 50;
            forumQuestion = forumQuestion?.substring(0, length) + '...';
          }
  
          const notifyData = {
            id: forumsDataId.toString(),
            question: forumQuestion,
            userIds: vetUserIds,
            username: forumUser
          }

          notification.getTokenAndSendNotificationVetUsersForum(notifyData, type);

          const forumVetUser = await profileService.getMultipleUsersProfileByForumUserId(vetUserIds);
          for(let user in forumVetUser) {

            const mailOption = {
              to: forumVetUser[user].email || '',
              subject: config.common.addForumVetUser.mailSubject,
              data: {
                userName: `${forumVetUser[user].first_name} ${forumVetUser[user].last_name}`,
                email: forumVetUser[user].email || '',
                question: forumsData?.question
              }
            };
            try {
              await mailer
                .sendMail(mailOption, "add-vet-user-to-forum-template.ejs");
            } catch (mailError) {
              console.log('Error in sending mail', mailError)
            }
          }
        }

        //   const mailOption = {
        //     to: forumsData.email || '',
        //     subject: config.common.addForumVetUser.mailSubject,
        //     data: {
        //       userName: `${forumsData.username}`,
        //       email: forumsData.email || '',
        //     }
        //   };
        //   try {
        //     // await mailer
        //     //   .sendMail(mailOption, "add-vet-user-to-forum-template.ejs");
        //   } catch (mailError) {
        //     console.log('Error in sending mail', mailError)
        //   }

        return forumsData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteForumFileMorph(forumId: number, fileId: number, t?: Transaction): Promise<void> {
    const transaction = t ? { transaction: t } : {};
    await UploadFileMorph.destroy({
      where: {
        upload_file_id: fileId,
        related_id: forumId,
        related_type: 'forums'
      }, 
      ...transaction
    });
  }

  async deleteForumImage(fileId: number, t?: Transaction): Promise<void> {
    const transaction = t ? { transaction: t } : {};
    await UploadFile.destroy({
      where: {
        id: fileId
      },
      ...transaction
    });
  }

  async removeForumFile(forumId: number, uploadFile: UploadFile) {
    const getKey = uploadFile.url.split(`/${uploadPath}/`);
    const fileUploadPath = `${uploadPath}/${getKey[1]}`
    await awsS3.deletePublicFileFromS3(fileUploadPath);

    const t = await sequelize.transaction();
    try {
      await this.deleteForumFileMorph(forumId, uploadFile.id, t);
      await this.deleteForumImage(uploadFile.id, t);
      t.commit();
    } catch (error) {
      t.rollback();
    }
  }

  async findOneWithFiles(id: number): Promise<Forums | null> {
    return await Forums.findOne({ where: { id },
      include: [
        {
          model: UploadFileMorph,
          as: "ForumsIcon",
          where: { 'related_type': 'forums' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ['id', 'url']
            }
          ]
        },
      ]
    });
  }

  async updateForum(
    forumsData: any,
    userId: number,
    userData: any,
    files: Express.Multer.File[]
    ): Promise<boolean> {
    
    // variable to store file data of newly uploaded files on database
    let uploadFileData: UploadFile[] = [];
    
    // variable to store max file limit per forum post 
    const fileUploadLimit = 3;

    // fetch forum by id
    const forum: any = await this.findOneWithFiles(forumsData.id);    

    // variable to store previously uploaded files
    const previouslyUploadedFiles: UploadFile[] = [];
    const previouslyUploadedFilesRequestIds: number[] = forumsData.oldForumFiles || [];
    if (forum && forum.ForumsIcon && forum.ForumsIcon.length) {
      forum.ForumsIcon.forEach((uploadMorph: any) => {
        previouslyUploadedFiles.push(uploadMorph.UploadFile);
      });
    }
    
    // store all file ids in a separate array
    const previouslyUploadedFileIds: number[] = previouslyUploadedFiles.map((file: UploadFile) => file.id);
    
    // check if all old file ids in request belong to this forum post
    previouslyUploadedFilesRequestIds.forEach((id: number) => {      
      if (!previouslyUploadedFileIds.includes(id)) {
        throw new CustomError(`Some files do not belong to this forum`);
      }
    });
    
    // remove deleted files from aws and database. If user deleted some
    if (
      previouslyUploadedFilesRequestIds &&
      previouslyUploadedFileIds &&
      previouslyUploadedFilesRequestIds?.length != previouslyUploadedFileIds.length) {
      const findFilesToDelete = (file: UploadFile) => {
        return previouslyUploadedFilesRequestIds.includes(file.id) == false
      };
      const filesToRemove: UploadFile[] = previouslyUploadedFiles.filter(findFilesToDelete);    

      // loop through each file 
      for (const file of filesToRemove) {
        await this.removeForumFile(forum.id, file);
      }
    }

    // set files after deletion array
    const findNotDeleteFileIds = (id: number) => previouslyUploadedFilesRequestIds.includes(id);
    const remainingFileIds = previouslyUploadedFileIds.filter(findNotDeleteFileIds);
    // check if new files are uploaded
    if (files && files.length > 0 && files.length <= fileUploadLimit) {
      const totalFileCount = remainingFileIds.length + files.length;
      const isCountWithinAllowedLimit = totalFileCount <= fileUploadLimit;

      // if remaining images + new images is greater than allowed limit then throw an error
      if (!isCountWithinAllowedLimit) {
        throw new CustomError(`Only 3 images are allowed for upload. Currently there are ${remainingFileIds.length} images already uploaded`);
      }

      // loop through each file and process upload
      for (const file of files) {
        if (!(typeof file === "object") || ![...validImageTypes, "application/pdf"].includes(file.mimetype)) {
          throw new CustomError("Please upload valid file");
        }
        // prepare file name for the file to be uploaded to aws
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const randomSuffix = () => crypto.randomBytes(5).toString("hex");
        const dateNow = Date.now();
        const filename = dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;
        const key = `${uploadPath}/${filename}`;
        // Upload file on S3
        const uploadFile: any = await awsS3.uploadPublicFileOnS3(file, key);

        // throw error if file was not uploaded successufully
        if (!uploadFile) {
          throw new CustomError("Error while uploading user image");
        }

        // store the file into the database for the record
        const uploadedFile = await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.mimetype,
          size: file.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: userId
        });

        // store in state for further processing
        uploadFileData.push(uploadedFile);
      }; 
    }

    if(forumsData.privacy === 'Private' && !forumsData.user) {
      forumsData.privacy = 'Public'
    }

    const forumOldData: any = await Forums.findOne({
      attributes: ["status"],
      where: { id: forumsData.id },
    });

    forumsData.status = ForumStatus[forumsData.status];

    return Forums.update(
      { question: forumsData.question, 
        description:forumsData?.description, 
        category:forumsData.category, 
        // date:forumsData.date, 
        status: forumsData.status, 
        vet_only:forumsData?.vet_only,
        privacy:forumsData.privacy,
        updated_by: userId },

      { where: { id: forumsData.id } }
    )
      .then(async () => {
        const profileService = new ProfileService();

        uploadFileData.forEach(async (file: UploadFile) => {
          await UploadFileMorph.create({
            upload_file_id: file.id,
            related_id: forumsData.id,
            related_type: "forums",
            field: "image",
            order: 1
          });
        })

        if(forumOldData.status === 0 && typeof forumsData.status === 'number' && forumsData.status === 1) {
          const forumUserId = await Forums.findOne({ where: { id: forumsData.id } });
          
          const notification = new NotificationService();
          let type = "approved_forum";
          let forumQuestion = forumUserId?.question;

          if(forumQuestion && forumQuestion.length > 50) {
            let length = 50;
            forumQuestion = forumQuestion?.substring(0, length) + '...';
          }
          
          const notifyData = {
            id: forumsData.id,
            question: forumQuestion,
            user_id: forumUserId?.user_id
          }
          
          notification.getTokenAndSendNotificationForums(notifyData, type);
        }

        const forumsDataId = forumsData.id;
        const animalCategoryData: object[] = [];
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        let usersData: object[] = [];
        let vetUserIds: any[] = [];
        let specializationsData: object[] = [];
        let oldVetUserIds: any[] = [];
        let countryData: object[] = [];
        
        if(forumsData.privacy === "Public") {
          await ForumsVetID.destroy({where: {forum_id: forumsDataId}});
        } else {
          let oldForumVetUserIds = await ForumsVetID.findAll({ attributes: ['user_id'], where: { forum_id: forumsDataId } });

          for(let userId in oldForumVetUserIds)
          {
            oldVetUserIds.push(oldForumVetUserIds[userId].user_id)
          }
          await ForumsVetID.destroy({where: {forum_id: forumsDataId}});
          forumsData.user?.split(",").map((user: number) => {
            if(user){
              usersData.push({ forum_id: forumsDataId, user_id: user })
            }
          });

          await ForumsVetID.bulkCreate(usersData);
          let forumVetUserIds = await ForumsVetID.findAll({ attributes: ['user_id'], where: { forum_id: forumsDataId } });
          
          for(let userId in forumVetUserIds)
          {
            vetUserIds.push(forumVetUserIds[userId].user_id)
          }

          if(forumsData.privacy === 'Private' && forumOldData.status === 0 && typeof forumsData.status === 'number' && forumsData.status === 1) {
            const notification = new NotificationService();
            let type = "vet_users_forum";
            let forumQuestion = forumsData?.question;
            let forumUser = forumsData?.user_id;
            
            if(forumUser === 'admin') {
              forumUser = userData.username;
            }
            
            if(forumQuestion && forumQuestion.length > 50) {
              let length = 50;
              forumQuestion = forumQuestion?.substring(0, length) + '...';
            }
  
            const notifyData = {
              id: forumsDataId,
              question: forumQuestion,
              userIds: vetUserIds,
              username: forumUser
            }
  
            notification.getTokenAndSendNotificationVetUsersForum(notifyData, type);
          
            const forumVetUser = await profileService.getMultipleUsersProfileByForumUserId(vetUserIds);
            for(let user in forumVetUser) {
  
              const mailOption = {
                to: forumVetUser[user].email || '',
                subject: config.common.addForumVetUser.mailSubject,
                data: {
                  userName: `${forumVetUser[user].first_name} ${forumVetUser[user].last_name}`,
                  email: forumVetUser[user].email || '',
                  question: forumsData?.question
                }
              };
              try {
                await mailer
                  .sendMail(mailOption, "add-vet-user-to-forum-template.ejs");
              } catch (mailError) {
                console.log('Error in sending mail', mailError)
              }
            }
          }
          else if(forumsData.privacy === 'Private' && oldVetUserIds !== vetUserIds && forumOldData.status === 1 && typeof forumsData.status === 'number' && forumsData.status === 1) {
            vetUserIds = vetUserIds.filter((item) => !oldVetUserIds.includes(item));

            const notification = new NotificationService();
            let type = "vet_users_forum";
            let forumQuestion = forumsData?.question;
            let forumUser = forumsData?.user_id;
            
            if(forumUser === 'admin') {
              forumUser = userData.username;
            }
            
            if(forumQuestion && forumQuestion.length > 50) {
              let length = 50;
              forumQuestion = forumQuestion?.substring(0, length) + '...';
            }
  
            const notifyData = {
              id: forumsDataId,
              question: forumQuestion,
              userIds: vetUserIds,
              username: forumUser
            }
  
            notification.getTokenAndSendNotificationVetUsersForum(notifyData, type);
          
            const forumVetUser = await profileService.getMultipleUsersProfileByForumUserId(vetUserIds);
            for(let user in forumVetUser) {
  
              const mailOption = {
                to: forumVetUser[user].email || '',
                subject: config.common.addForumVetUser.mailSubject,
                data: {
                  userName: `${forumVetUser[user].first_name} ${forumVetUser[user].last_name}`,
                  email: forumVetUser[user].email || '',
                  question: forumsData?.question
                }
              };
              try {
                await mailer
                  .sendMail(mailOption, "add-vet-user-to-forum-template.ejs");
              } catch (mailError) {
                console.log('Error in sending mail', mailError)
              }
            }
          }
        }

        await ForumsAnimalCategories.destroy({where: {forum_id: forumsDataId}});
        forumsData.animal_category?.split(",").map(async (category: number) => {
          if(category) {
            animalCategoryData.push({ forum_id: forumsDataId, "animal-category_id": category })
          }
        });
        await ForumsAnimalCategories.bulkCreate(animalCategoryData);
        
        await ForumsAnimalTypes.destroy({where: {forum_id: forumsDataId}});
        forumsData.type?.split(",").map(async (type: number) => {
          if(type) {
            animalTypesdata.push({ forum_id: forumsDataId, "animal-type_id": type })
          }
        });
        await ForumsAnimalTypes.bulkCreate(animalTypesdata);

        await ForumsBreeds.destroy({where: {forum_id: forumsDataId}});
        forumsData.breed?.split(",").map((breed: number) => {
          if(breed){
            breedsData.push({ forum_id: forumsDataId, breed_id: breed })
          }
        });
        await ForumsBreeds.bulkCreate(breedsData);

        await ForumsSpecializations.destroy({where: {forum_id: forumsDataId}});
        forumsData.specialization?.split(",").map((specialization: number) => {
          if(specialization){
            specializationsData.push({ forum_id: forumsDataId, specialization_id: specialization })
          }
        });
        await ForumsSpecializations.bulkCreate(specializationsData);

        await ForumsCountry.destroy({where: {forum_id: forumsDataId}});
        forumsData.country?.split(",").map((country: number) => {
          if(country){
            countryData.push({ forum_id: forumsDataId, "country-drop-down_id": country })
          }
        });
        await ForumsCountry.bulkCreate(countryData);

        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importForum(
    file: any,
    userId: number,
    userData: any
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const forumJsonData = await csv().fromFile(file.path);
    if(!forumJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('animal_type' in forumJsonData[0] && 'breed' in forumJsonData[0] && 'question' in forumJsonData[0] && 'description' in forumJsonData[0] && 'category' in forumJsonData[0] && 'status' in forumJsonData[0] && 'vet_only' in forumJsonData[0] && 'privacy' in forumJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(forumJsonData.map(async (forum: any) => {
      Forums.create({
        question: forum.question,
        description: forum.description,
        category: forum.category,
        status: forum.status,
        vet_only: forum.vet_only,
        privacy: forum.privacy,
        is_admin: userData.roleName == 'admin' ? true : false,
        created_by: userId
      }).then(async (forumsData) => {
        const animalTypes = await Promise.all(forum.animal_type.split(",").map((item: string) => item.trim()));
        await Promise.all(animalTypes.map(async (animalType: any) => {
          const animalTypeData = await AnimalTypes.findOne({ where: { type: animalType }, attributes: ['id'], raw: true });
          if (animalTypeData) {
            await ForumsAnimalTypes.create({ forum_id: forumsData.id, "animal-type_id": animalTypeData.id });
          }
        }));

        const breeds = await Promise.all(forum.breed.split(",").map((item: string) => item.trim()));
        await Promise.all(breeds.map(async (breed: any) => {
          const breedData = await Breeds.findOne({ where: { name: breed }, attributes: ['id'], raw: true });
          if (breedData) {
            await ForumsBreeds.create({ forum_id: forumsData.id, "breed_id": breedData.id });
          }
        }));
      })
        .catch((error: Error) => {
          throw error;
        });
    })).then(() => {
      return true;
    });
  }

  async deleteForums(id: number): Promise<boolean> {
    return Forums.update({ is_deleted: true}, { where: { id: id }, individualHooks: true })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAnswers(forumId: number, id: number) {
    return ForumsAnswers.update({ is_deleted: true}, { where: { forum_id: forumId, id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  createImagePairsForUpdate(forums: any) {
    const results: {
      id: number,
      src: string
    }[] = [];
    forums.ForumsIcon.forEach((uploadFileMorph: UploadFileMorph | any, index: number) => {
      results.push({
        id: uploadFileMorph.UploadFile.id,
        src: uploadFileMorph.UploadFile.url
      });
    });    

    return results;
  }
}
