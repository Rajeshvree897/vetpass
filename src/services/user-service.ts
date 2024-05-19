import crypto from "crypto";
import path from "path";
import { Op, where } from "sequelize";
import { mailer } from "../helpers/mailer";
import uuidv4 from "uuid/v4";
import moment from 'moment';
import csv from 'csvtojson';
import fs from "fs";
import bcryptjs from "bcryptjs";

import config from "../config";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import User from "../db/models/user";
import Availabilities from "../db/models/availabilities";
import AvailabilitiesTimeComponents from "../db/models/components-time-slots";
import AvailabilitiesComponents from "../db/models/availabilities-components";
import VetProfile from "../db/models/vet-profile";
import VetProfileTreatesTypeAnimal from "../db/models/vet-profile-treates-type-animal";
import { awsS3 } from "../helpers/aws-s3";
import { validImageTypes } from "../types/common";
import { CustomError } from "./error-service";
import NotificationService from "./notification-service";
import UsersPermissionsRole from "../db/models/users-permissions-role";
import Country from "../db/models/country";
import State from "../db/models/state";
import constants from "../helpers/constants";
import common from "../config/common";
import VetPractices from "../db/models/vet-practices";
import VetProfileSpecialization from "../db/models/vet-profile-specialization";
import Specialization from "../db/models/specialization";
import AnimalCategories from "../db/models/animal-categories";
import PractitionerLiability from "../db/models/practitioner-liability";
import ServiceProviderLiability from "../db/models/service-provider-liability";
import VetProfileSpecialities from "../db/models/vet-profile-specialities";
import Specialities from "../db/models/specialities";
import AnimalProfiles from "../db/models/animal-profiles";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import Insurers from "../db/models/insurer";
import Chips from "../db/models/chips";
import AvailabilitiesTimeBlocks from "../db/models/components-time-blocks";
import UnAvailabilities from "../db/models/unavailabilities";
import UnAvailabilitiesComponents from "../db/models/unavailabilities-components";
import UnAvailabilitiesTimeComponents from "../db/models/unavailabilities-time-components";
import UsersAnimalTypes from "../db/models/users-animal-types";
import UsersBreeds from "../db/models/users-breeds";
import _ from "lodash";
import VetProfileInterestedSpecializations from "../db/models/vet-profile-interested-specializations";
import VetProfileInterestedAnimalTypes from "../db/models/vet-profile-interested-animal-types";
import UserFollowers from "../db/models/user-followers";
import FanPages from "../db/models/fan-pages";
import Posts from "../db/models/posts";
import Forums from "../db/models/forums";
import FanPagePosts from "../db/models/fan-page-posts";
import FanPageFollowers from "../db/models/fan-page-followers";
import VetProfileServices from "../db/models/vet-profile-services";
import GroomersServices from "../db/models/groomers-services";
import WalkersServices from "../db/models/walkers-services";
import TherapistsServices from "../db/models/therapists-services";
import NutritionistsServices from "../db/models/nutritionists-services";
import BreedersServices from "../db/models/breeders-services";
import ServiceProviderSubServices from "../db/models/service-provider-sub-services";
import ServiceProviderMainServices from "../db/models/service-provider-main-services";
import VetProfileMainServices from "../db/models/vet-profile-main-services";
import VetProfileSubServices from "../db/models/vet-profile-sub-services";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";
const baseUrl = NODE_ENV == "production" ? "https://admin.vetpass.com/" : "https://staging-admin.vetpass.com/";

export default class UsersService {
  constructor() { }

  async deleteUser(id: number): Promise<boolean> {
    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: id, related_type: 'users-permissions_user' },
      include: [{ model: UploadFile, as: 'UploadFile', attributes: ['url', 'id'] }]
    });
    // if (uploadFileMorphData) {
    //   const getKey = uploadFileMorphData.UploadFile.url.split(`/${uploadPath}/`);
    //   await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
    //   await UploadFileMorph.destroy({ where: { related_id: id, related_type: 'users-permissions_user' } });
    //   await UploadFile.destroy({ where: { id: uploadFileMorphData?.UploadFile?.id } });
    // }
    const vetProfile = await VetProfile.findOne({ where: { user: id } });
    // if (vetProfile) {
    //   await VetProfileTreatesTypeAnimal.destroy({ where: { vet_profile_id: vetProfile.id } });
    //   await VetProfileSpecialization.destroy({ where: { vet_profile_id: vetProfile.id } });
    //   await VetProfileInterestedSpecializations.destroy({ where: { vet_profile_id: vetProfile.id } });
    //   await VetProfileInterestedAnimalTypes.destroy({ where: { vet_profile_id: vetProfile.id } });
    //   await VetProfileSpecialities.destroy({ where: { vet_profile_id: vetProfile.id } });
    //   await VetProfile.destroy({ where: { user: id } });
    // }
    // await FanPages.destroy({ where: { user_id: id } , individualHooks: true });
    // await Posts.destroy({ where: { user_id: id } , individualHooks: true });
    // await Forums.destroy({ where: { user_id: id } , individualHooks: true });
    // await UsersAnimalTypes.destroy({ where: { "users-permissions_user_id": id } });
    // await UsersBreeds.destroy({ where: { "users-permissions_user_id": id } });
    // await UserFollowers.destroy({ where: { following_user_id: id } });
    // return User.destroy({ where: { id: id } })
    return User.update({is_deleted: true, comfirmed: 0, blocked: 1 }, { where: { id: id } })
      .then(async () => {
        await AnimalProfiles.update({is_deleted: true},{ where: { user: id }});
        await Posts.update({is_deleted: true},{ where: { user_id: id }, individualHooks: true});
        await Forums.update({is_deleted: true},{ where: { user_id: id }, individualHooks: true});
        await FanPages.update({is_deleted: true},{ where: { user_id: id }, individualHooks: true});
        await FanPageFollowers.update({is_deleted: true},{ where: { follower_id: id }});
        await FanPagePosts.update({is_deleted: true},{ where: { user_id: id }, individualHooks: true });
        await UserFollowers.update({is_deleted: true},{ where: { [Op.or]: [ { follower_user_id: id, following_user_id: id } ] } });
        
        // --- delete availabilities ---
        // let availabilityIds: any = await Availabilities.findAll({ attributes: ["id"], where: { user_id: id } });
        // availabilityIds = availabilityIds.map((i: any) => i.id);
        // let timeSlotIds: any = await AvailabilitiesComponents.findAll({ attributes: ["component_id"], where: { field: "timeSlot", availability_id: availabilityIds } });
        // timeSlotIds = timeSlotIds.map((i: any) => i.component_id);
        // let timeBlockIds: any = await AvailabilitiesComponents.findAll({ attributes: ["component_id"], where: { field: "timeBlock", availability_id: availabilityIds } });
        // timeBlockIds = timeBlockIds.map((i: any) => i.component_id);
        // await AvailabilitiesTimeBlocks.destroy({ where: { id: timeSlotIds } });
        // await AvailabilitiesTimeComponents.destroy({ where: { id: timeBlockIds } });
        // await AvailabilitiesComponents.destroy({ where: { availability_id: availabilityIds } });
        // await Availabilities.destroy({ where: { user_id: id } });

        // // - delete unavailabilities
        // let unAvailIds: any = await UnAvailabilities.findAll({ attributes: ["id"], where: { user_id: id } });
        // unAvailIds = unAvailIds.map((i: any) => i.id);
        // let unAvailSlotIds: any = await UnAvailabilitiesComponents.findAll({
        //   attributes: ["component_id"],
        //   where: { unavailability_id: unAvailIds },
        // });
        // unAvailSlotIds = unAvailSlotIds.map((i: any) => i.component_id);
        // await UnAvailabilitiesTimeComponents.destroy({
        //   where: { id: unAvailSlotIds },
        // });
        // await UnAvailabilitiesComponents.destroy({
        //   where: { unavailability_id: unAvailIds },
        // });
        // await UnAvailabilities.destroy({ where: { user_id: id } });

        // const notification = new NotificationService();
        // notification.sendNotification(id, 'deleteUser')

        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getPracticeList(searchTerm: string | null, offset: number = 0, limit: number = 20, includeDeleted: boolean | null = null, option: any, id: any = null,) {  
    let searchTermConditions = {}
  
    if (!searchTerm) {
      searchTermConditions = {};
    } else {
      searchTermConditions = {
        [Op.or]: [
          {
            practice_name: {
              [Op.like]: "%" + searchTerm + "%"
            },
          }
        ]
      };
    }
    option = option ? { option } : {};
    if (id) {
      id = id ? { id } : {};
    }
    const where = {
      ...id,
      ...option,
      is_deleted: includeDeleted,
      ...searchTermConditions
    };
    return await VetPractices.findAll({
      attributes: ["id", "practice_name", "flag", "address1", "country", "state", "city", "zip_code"],
      include: [ 
        { 
            model: Country,
            as: "countries",
            attributes: ["id", "country", "sort_id", "country_code", "iso_code"], 
        }, 
        { 
            model: State,  
            as: "states",   
            attributes: ["id", "state"], 
        }, 
      ],
      raw: true,
      where,
      limit,
      offset,
      })
  }

  async getSubServiceList(searchTerm: string | null, offset: number = 0, limit: number = 20, ids: any) {  
    let searchTermConditions = {}
  
    if (!searchTerm) {
      searchTermConditions = {};
    } else {
      searchTermConditions = {
        [Op.or]: [
          {
            service: {
              [Op.like]: "%" + searchTerm + "%"
            },
          }
        ]
      };
    }
    const where = {
      status: 1,
      ...searchTermConditions,
      "$MainServices.id$": { [Op.in]: ids }
    };
  
    return ServiceProviderSubServices.findAll({
      attributes: ["id", "service", "main_service_id"],
      include: [ 
        { 
            model: ServiceProviderMainServices,
            as: "MainServices",
            attributes: [], 
        } 
      ],
      raw: true,
      where,
      // limit,
      // offset,
      })
    }

  async addUser(userData: any, userId: number, file: any, timeZone: any): Promise<User> {
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
        throw new CustomError("Error while uploading user image");
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
    }
    // generate password
    const resetPasswordToken = uuidv4();
    return User.create({
      email: userData.email,
      resetPasswordToken,
      first_name: userData.first_name,
      last_name: userData.last_name,
      mobile: userData.mobile,
      dob: (userData.dob) ? userData.dob : null,
      address1: userData.address1,
      address2: userData.address2,
      city: userData.city,
      zip_code: (userData.zip_code) ? userData.zip_code : null,
      int_code: (userData.int_code) ? userData.int_code : null,
      role: (userData.role) ? userData.role : null,
      country: (userData.country) ? userData.country : null,
      state: (userData.state) ? userData.state : null,
      provider: 'local',
      confirmed: (userData.confirmed) ? 1 : 0,
      blocked: (userData.blocked) ? 1 : 0,
      created_by: userId,
      latitude: userData.latitude ? userData.latitude : null,
      longitude: userData.longitude ? userData.longitude : null,
    })
      .then(async user => {

        // Insert animal type and breeds data start
        const dataAnimalTypes: any = [];
        userData.dataAnimalType?.split(",").map(async (dataAnimalTypeId: number) => {
          if (dataAnimalTypeId) {
            dataAnimalTypes.push({ "users-permissions_user_id": user.id, "animal-type_id": dataAnimalTypeId })
          }
        });
        await UsersAnimalTypes.bulkCreate(dataAnimalTypes);

        const breedsInserData: any = [];
        userData.breed?.split(",").map(async (breedId: number) => {
          if (breedId) {
            breedsInserData.push({ "users-permissions_user_id": user.id, "breed_id": breedId })
          }
        });
        await UsersBreeds.bulkCreate(breedsInserData);
        // Insert animal type and breeds data end

        const mailOption = {
          to: user.email || '',
          subject: config.common.createUser.mailSubject,
          data: {
            userName: `${user.first_name} ${user.last_name}`,
            email: user.email || '',
            baseUrl,
            resetPasswordURL:
              config.baseUrl +
              config.resetPasswordUri +
              resetPasswordToken,
          }
        };
        try {
          await mailer
            .sendMail(mailOption, "new-user-create-template.ejs");
        } catch (mailError) {
          console.log('Error in sending mail', mailError)
        }
        const roleName: any = await UsersPermissionsRole.findOne({ where: { id: userData.role }, attributes: ['name'] });
        if (roleName && roleName.name && roleName.name === config.common.role.vet_practice_admin_role_name) {
          let animalTypesdata: object[] = [];
          let interestedAnimalTypesdata: object[] = [];
          let interestedSpecializationdata: object[] = [];

          await VetProfile.create({
            created_by: userId,
            user: user.id,
            currency_type: userData.currency_type || 'USD',
            // speciality: userData.speciality || '',
            practice: (userData.practice) ? userData.practice : null,
          }).then(async (vetProfile: VetProfile) => {
            const vetProfileId = vetProfile.id;
            userData.type?.split(",").map(async (type: number) => {
              if (type) {
                animalTypesdata.push({ vet_profile_id: vetProfileId, "animal-category_id": type })
              }
            });
            await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);

            userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
              if (interestedSpecialization) {
                interestedSpecializationdata.push({ vet_profile_id: vetProfileId, specialization_id: interestedSpecialization })
              }
            });
            await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);

            userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
              if (interestedAnimalType) {
                interestedAnimalTypesdata.push({ vet_profile_id: vetProfileId, "animal-type_id": interestedAnimalType })
              }
            });
            await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);

            return user;
          });
        }
        if (roleName && roleName.name && (roleName.name === config.common.role.vet_role_name || roleName.name === config.common.role.technician_nurse_role_name || roleName.name == config.common.role.service_provider_role_name)) {
          const availabilitiesObj = {
            created_by: userId,
            user_id: user.id,
            published_at: new Date()
          };
          while (userData.monday && userData.monday.length > 0) {
            const val = userData.monday.splice(0, 4);
            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()
            const createAvail = await Availabilities.create({ day: 'Monday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Monday', timeZone, roleName.name);
          }

          while (userData.tuesday && userData.tuesday.length > 0) {
            const val = userData.tuesday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Tuesday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Tuesday', timeZone, roleName.name);
          }

          while (userData.wednesday && userData.wednesday.length > 0) {
            const val = userData.wednesday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Wednesday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Wednesday', timeZone, roleName.name);
          }

          while (userData.thursday && userData.thursday.length > 0) {
            const val = userData.thursday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Thursday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Thursday', timeZone, roleName.name);
          }

          while (userData.friday && userData.friday.length > 0) {
            const val = userData.friday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Friday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Friday', timeZone, roleName.name);
          }

          while (userData.saturday && userData.saturday.length > 0) {
            const val = userData.saturday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Saturday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Saturday', timeZone, roleName.name);
          }

          while (userData.sunday && userData.sunday.length > 0) {
            const val = userData.sunday.splice(0, 4);

            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            const interval = parseInt(val[2])
            const stack = parseInt(val[3])
            let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

            const createAvail = await Availabilities.create({ day: 'Sunday', user_id: user.id });
            const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
            const slot = { fromhours, frommin, tohours, tomin, interval };
            await this.createSlots(obj, slot, createAvail.id, 'Sunday', timeZone, roleName.name);
          }

          let animalTypesdata: object[] = [];
          let specializationData: object[] = [];
          let specialitiesData: object[] = [];
          let interestedSpecializationdata: object[] = [];
          let interestedAnimalTypesdata: object[] = [];
          let servicedata: object[] = [];

          await VetProfile.create({
            practitioner_liability: (userData.practitioner_liability) ? userData.practitioner_liability : null,
            service_provider_liability: (userData.service_provider_liability) ? userData.service_provider_liability : null,
            passout_date: (userData.passout_date) ? userData.passout_date : null,
            education: userData.education,
            educationDuration: userData.educationDuration,
            personal_bio: userData.personal_bio,
            registration_number: userData.registration_number,
            in_clinic_consultation: (userData.in_clinic_consultation) ? userData.in_clinic_consultation : 0,
            online_consultation: (userData.online_consultation) ? userData.online_consultation : 0,
            is_in_clinic_consultation: (userData.is_in_clinic_consultation) ? 1 : 0,
            is_online_consultation: (userData.is_online_consultation) ? 1 : 0,
            currency_type: userData.currency_type,
            // speciality: userData.speciality,
            public_email: userData.public_email,
            public_contact_no: userData.public_contact_no,
            public_out_of_hr_phone: userData.public_out_of_hr_phone,
            public_contact_no_int_code: userData.public_contact_no_int_code,
            public_out_of_hr_phone_int_code: userData.public_out_of_hr_phone_int_code,
            created_by: userId,
            user: user.id,
            practice: (userData.practice) ? userData.practice : null,
            b_user_name: userData.b_user_name,
            b_user_email: userData.b_user_email,
            b_country: userData.b_country,
            b_currency: userData.b_currency,
            b_account_number: userData.b_account_number,
            b_iban: userData.b_iban,
            b_ncc: userData.b_ncc,
            b_sort_code: userData.b_sort_code,
            b_swiftbic: userData.b_swiftbic,
            bank_name: userData.bank_name,
            b_address: userData.b_address,
          }).then(async (vetProfile: VetProfile) => {
            const vetProfileId = vetProfile.id;
            userData.type?.split(",").map(async (type: number) => {
              if (type) {
                animalTypesdata.push({ vet_profile_id: vetProfileId, "animal-category_id": type })
              }
            });
            await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);
            userData.specialization?.split(",").map(async (specializationId: number) => {
              if (specializationId) {
                specializationData.push({ vet_profile_id: vetProfileId, "specialization_id": specializationId })
              }
            });
            await VetProfileSpecialization.bulkCreate(specializationData);
            userData.speciality?.split(",").map(async (specialityId: number) => {
              if (specialityId) {
                specialitiesData.push({ vet_profile_id: vetProfileId, "speciality_id": specialityId })
              }
            });
            await VetProfileSpecialities.bulkCreate(specialitiesData);

            userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
              if (interestedSpecialization) {
                interestedSpecializationdata.push({ vet_profile_id: vetProfileId, specialization_id: interestedSpecialization })
              }
            });
            await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);

            userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
              if (interestedAnimalType) {
                interestedAnimalTypesdata.push({ vet_profile_id: vetProfileId, "animal-type_id": interestedAnimalType })
              }
            });
            await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);            
            const mainServices: object[] = [];
            const subServices: object[] = [];
            const servicePrices: any = [];
            let isSubServiceContainsOther = false;
            if(userData && userData.serviceProviderServices && userData.serviceProviderServices.length){
              await Promise.all(userData?.serviceProviderServices?.map(async (mainServiceId: any) => {
                let existMainService:any = null;//mainServiceId;
                      if(isNaN(mainServiceId)){
                        const getMainservice = await ServiceProviderMainServices.findOne({ where: { service: mainServiceId, status: 1 } });                      if(getMainservice){
                          existMainService = getMainservice.id;
                        }else{
                          const addMainService = await ServiceProviderMainServices.create({ service: mainServiceId, status: 1 });
                          let indexOfMain = userData.serviceProviderServices.indexOf(mainServiceId);
                          userData.serviceProviderServices.splice(indexOfMain, 1, addMainService.id);
                          existMainService = addMainService.id;
                        }
                      }else{
                        existMainService = mainServiceId;
                      }
                if (userData && userData.serviceProviderSubServices  && userData.serviceProviderSubServices[`sub${mainServiceId}`]) {
                  await Promise.all(userData?.serviceProviderSubServices[`sub${mainServiceId}`]?.map(async (id: any) => {
                      let i = userData.serviceProviderSubServices[`sub${mainServiceId}`].indexOf(id);
                      const price = userData && userData.price && userData.price[`price${mainServiceId}`] ? userData.price[`price${mainServiceId}`][i] : null;
                      const stack = userData && userData.appointment && userData.appointment[`stack${mainServiceId}`] ? userData.appointment[`stack${mainServiceId}`][i] : null;
                      if (isNaN(id)) {
                        const getSubService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: userData.id } });
                        if (getSubService) {
                          const checkUnderMainService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: user.id, main_service_id: existMainService } });
                          if(checkUnderMainService){
                            id = checkUnderMainService.id;
                          }else{
                            const updateSubservice = await ServiceProviderSubServices.update({ service: id, created_by: user.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack },{ where: {service: id, created_by:userData.id } })
                            .then((subservice:any) => {
                              id = getSubService.id;
                            });
                          }
                        } else {
                          if(userData.price[`price${mainServiceId}`]&& userData.price[`price${mainServiceId}`][i] && userData.description[`description${mainServiceId}`] && userData.description[`description${mainServiceId}`][i] && id && userData.duration[`duration${mainServiceId}`] && userData.duration[`duration${mainServiceId}`][i]){
                            const addService = await ServiceProviderSubServices.create({ service: id, created_by: user.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack });
                            id = addService.id;
                          }
                        }
                      }
                    }));
                  }
                }))
              }
            if (userData && userData.serviceProviderServices && userData.serviceProviderServices.length) {
              await Promise.all(userData?.serviceProviderServices?.map(async (id: any) => {
                if (isNaN(id)) {
                  const addService = await ServiceProviderMainServices.create({ service: id, status: 1 });
                  id = addService.id;
                }
                mainServices.push({ vet_profile_id: vetProfileId, "service-provider-main-service_id": id });
              }));
              if (isSubServiceContainsOther) {
                mainServices.push({ vet_profile_id: vetProfileId, "service-provider-main-service_id": 18 });
              }
             let newMainserviceVet =  await VetProfileMainServices.bulkCreate(mainServices);
            }

            return user;
          });
        }
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: user.id,
            related_type: "users-permissions_user",
            field: "image",
            order: 1
          });
        }
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getUserReportData(): Promise<User[] | null> {
    return User.findAll({
      group: 'id',
      attributes: [
        'id',
        ['email', 'Email'], 
        ['first_name', 'First Name'], 
        ['last_name', 'Second Name'], 
        ['mobile', 'Contact Number'],
        ['confirmed', 'Confirmed'], 
        ['blocked', 'Blocked'],
        ['created_at', 'Registration Date'],
        ['created_at', 'Registration Time'],
        ['dob', 'DoB'],
        ['address1', 'Address1'],
        ['address2', 'Address2'],
        ['city', 'City/Town'],
        ['zip_code', 'Zip Code/Post Code'],
        ['int_code', 'Int Code'],
        ['role', 'Type'],
        ['country', 'Country'],
        ['state', 'State/Postal/County'], 
      ],
      include: [
        { 
          model: UsersPermissionsRole, 
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
          model: VetProfile,
          as: "VetProfileUser", 
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
            "service_provider_liability",
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
              model: VetPractices,
              as: 'practices',
              attributes: ["practice_name"],
            },
            {
              model: PractitionerLiability,
              as: 'practitionerliabilities',
              attributes: ["name"],
            },
            {
              model: ServiceProviderLiability,
              as: 'serviceProviderliabilities',
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
        { model: AnimalProfiles, 
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
      ],
    });
  }

  async getUser(id: number, timeZone: string): Promise<User | null> {

    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: id, related_type: 'users-permissions_user' },
      include: [{ model: UploadFile, as: 'UploadFile', attributes: ['url', 'id'] }]
    });

    return User.findOne({ include: [{ model: UsersPermissionsRole, as: "Role", attributes: ["name"] }], where: { id: id } })
      .then(async (user: any) => {
        if (uploadFileMorphData && uploadFileMorphData.UploadFile) {
          user.img_path = uploadFileMorphData.UploadFile.url;
        }
        if (user) {
          const userId = user.id;

          // --- get availabilities ---
          const availabilitiesData: any = await Availabilities.findAll({
            attributes: ['id', 'day'],
            include: [{
              model: AvailabilitiesComponents,
              where: { field: "timeBlock" },
              include: [{
                model: AvailabilitiesTimeBlocks
              }]
            }],
            where: {
              user_id: userId
            },
          });

          const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          let slots: any = []
          const dayWiseObj: any = {}
          for (let avail of availabilitiesData) {
            if (avail && avail.AvailabilitiesComponents && avail.AvailabilitiesComponents.length > 0) {
              for (let i of avail.AvailabilitiesComponents) {
                if (i.AvailabilitiesTimeBlock && i.AvailabilitiesTimeBlock.from) {
                  const fromhours = parseInt(i.AvailabilitiesTimeBlock.from.split(':')[0])
                  const frommin = parseInt(i.AvailabilitiesTimeBlock.from.split(':')[1])
                  const tohours = parseInt(i.AvailabilitiesTimeBlock.to.split(':')[0])
                  const tomin = parseInt(i.AvailabilitiesTimeBlock.to.split(':')[1])
                  i.AvailabilitiesTimeBlock.fromDate = moment().utc().day(i.AvailabilitiesTimeBlock.day).set({ h: fromhours, m: frommin }).tz(timeZone);
                  i.AvailabilitiesTimeBlock.toDate = moment().utc().day(i.AvailabilitiesTimeBlock.day).set({ h: tohours, m: tomin }).tz(timeZone);
                  if (!dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]]) {
                    dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]] = []
                  }
                  dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]].push({
                    id: i.AvailabilitiesTimeBlock.id,
                    from_time: i.AvailabilitiesTimeBlock.fromDate,
                    to_time: i.AvailabilitiesTimeBlock.toDate,
                    day: day[i.AvailabilitiesTimeBlock.fromDate.day()],
                    interval: i.AvailabilitiesTimeBlock.interval,
                    stack: i.AvailabilitiesTimeBlock.stack,
                  });
                }
              }
            }

          }

          for (let day in dayWiseObj) {
            dayWiseObj[day].sort((a: any, b: any) => {
              var dateA = new Date(a.from_time).getTime();
              var dateB = new Date(b.from_time).getTime();
              return dateA > dateB ? 1 : -1;
            });
            slots = slots.concat(dayWiseObj[day])
          }

          user.availabilities = slots;
          // --- END ---

          const vetProfileData = await VetProfile.findOne({ where: { user: userId } });
          const animalTypeFinalData: (AnimalCategories | null)[] = [];
          let mainServicesFinalData: any[] = [];
          const subServicesFinalData: (ServiceProviderSubServices | null)[] = [];
          let specializationData: any[] = [];
          let specialitiesData: any[] = [];
          let interestedSpecializationData: any[] = [];
          let interestedAnimalTypeData: any[] = [];
          const specializationsIdArray: any = [];
          const inSpecializationsIdArray: any = [];
          const specialitiesIdArray: any = [];
          
          if (vetProfileData) {
            user.vetProfile = vetProfileData;
            const vetProfileTreatesTypeAnimalData = await VetProfileTreatesTypeAnimal.findAll({
              where: {
                vet_profile_id: vetProfileData.id
              }, attributes: ['id', 'animal-category_id'], raw: true
            });
            await Promise.all(vetProfileTreatesTypeAnimalData.map(async (vetProfileTreatesTypeAnimal) => {
              const animalTypesData = await AnimalCategories.findOne({ where: { id: vetProfileTreatesTypeAnimal['animal-category_id'] } });
              animalTypeFinalData.push(animalTypesData);
            }));

            mainServicesFinalData = await VetProfileMainServices.findAll({
              where: {
                vet_profile_id: vetProfileData.id
              }, attributes: ['service-provider-main-service_id'], raw: true
            });
            mainServicesFinalData = mainServicesFinalData.map(i => i["service-provider-main-service_id"]);
            const subServicesData: any = await ServiceProviderSubServices.findAll({ where: { created_by: userId} });
            await Promise.all(subServicesData.map(async (data:any) => {
              subServicesFinalData.push(data);
            }));

            specializationData = await VetProfileSpecialization.findAll({
              include: [{
                model: Specialization,
                as: "specializations",
                attributes: ["id", "name"]
              }],
              where: {
                vet_profile_id: vetProfileData.id
              }
            })
            specializationData = specializationData.map( ({ specializations }) => {
              specializationsIdArray.push(specializations ? specializations.id : '');
              return {
                id: specializations ? specializations.id : '',
                name: specializations ? specializations.name : '',
              }
            });

            interestedSpecializationData = await VetProfileInterestedSpecializations.findAll({
              include: [{
                model: Specialization,
                as: "specializations",
                attributes: ["id", "name"]
              }],
              where: {
                vet_profile_id: vetProfileData.id
              }
            })
            interestedSpecializationData = interestedSpecializationData.map( ({ specializations }) => {
              inSpecializationsIdArray.push(specializations ? specializations.id : "");
              return {
                id: specializations ? specializations.id : '',
                name: specializations ? specializations.name : '',
              }}
            );
            
            interestedAnimalTypeData = await VetProfileInterestedAnimalTypes.findAll({
              include: [{
                model: AnimalTypes,
                as: "animalTypes",
                attributes: ["id", "type"]
              }],
              where: {
                vet_profile_id: vetProfileData.id
              }
            })
            interestedAnimalTypeData = interestedAnimalTypeData.map(
              ({ animalTypes }) => ({
                id: animalTypes ? animalTypes.id : '',
                type: animalTypes ? animalTypes.type : '',
              })
            );

            specialitiesData = await VetProfileSpecialities.findAll({
              include: [{
                model: Specialities,
                as: "specialities",
                attributes: ["id", "name"]
              }],
              where: {
                vet_profile_id: vetProfileData.id
              }
            })
            specialitiesData = specialitiesData.map( ({ specialities }) => {
              specialitiesIdArray.push(specialities ? specialities.id : '');
              return {
                id: specialities ? specialities.id : '',
                name: specialities ? specialities.name : '',
              }
            });
          }
          user.animalTypes = animalTypeFinalData;
          user.mainServices = mainServicesFinalData;
          user.subServices = subServicesFinalData;
          user.specializations = specializationData;
          user.interestedSpecialization = interestedSpecializationData;
          user.interestedAnimalTypes = interestedAnimalTypeData;
          user.speciality = specialitiesData;
          user.specializationsIdArray = specializationsIdArray;
          user.specialitiesIdArray = specialitiesIdArray;
          user.inSpecializationsIdArray = inSpecializationsIdArray;

          const dataAnimalTypesData: any = await UsersAnimalTypes.findAll({
            include: [{
              model: AnimalTypes,
              as: "AnimalTypes",
              attributes: ["id", "type"]
            }],
            where: {
              "users-permissions_user_id": user.id
            }
          });

          const breedsData: any = await UsersBreeds.findAll({
            include: [{
              model: Breeds,
              as: "Breeds",
              attributes: ["id", "name"]
            }],
            where: {
              "users-permissions_user_id": user.id
            }
          });
          let animalTypeArray: any = [];
          user.dataAnimalTypes = _.map(dataAnimalTypesData, (animalType) => {
            animalTypeArray.push(animalType.AnimalTypes?.id)
            return {
              id: animalType.AnimalTypes?.id,
              type: animalType.AnimalTypes?.type
            }
          });
          user.animalTypeArray = animalTypeArray;
          user.breeds = _.map(breedsData, (breed) => {
            return {
              id: breed.Breeds?.id,
              name: breed.Breeds?.name
            }
          });
          return user;
        }
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateUser(userData: any, userId: number, file: any, timeZone: any): Promise<boolean> {

    const userRole: any = await User.findOne({ include: [{ model: UsersPermissionsRole, as: "Role", attributes: ["name"] }], where: { id: userData.id }, attributes: ['role', 'blocked',] });
    const roleName: any = await UsersPermissionsRole.findOne({ where: { id: userData.role }, attributes: ['name'] });
    if (userRole && userRole.Role && userRole.Role.name && (userRole.Role.name === config.common.role.vet_role_name || userRole.Role.name === config.common.role.technician_nurse_role_name || userRole.Role.name === config.common.role.service_provider_role_name) && (roleName && roleName.name && ![config.common.role.vet_role_name, config.common.role.technician_nurse_role_name, config.common.role.service_provider_role_name].includes(roleName.name))) {
      const vetProfile = await VetProfile.findOne({ where: { user: userData.id } });
      if (vetProfile) {
        await VetProfileTreatesTypeAnimal.destroy({ where: { vet_profile_id: vetProfile.id } });
        await VetProfileSpecialization.destroy({ where: { vet_profile_id: vetProfile.id } });
        await VetProfileSpecialities.destroy({ where: { vet_profile_id: vetProfile.id } });
        await VetProfileInterestedSpecializations.destroy({ where: { vet_profile_id: vetProfile.id } });
        await VetProfileInterestedAnimalTypes.destroy({ where: { vet_profile_id: vetProfile.id } });
        //await VetProfileServices.destroy({ where: { vet_profile_id: vetProfile.id } });
        await VetProfile.destroy({ where: { user: userData.id } });
      }
    }

    if (userData?.blocked == 1) {
      const notification = new NotificationService();
      notification.sendNotification(userData.id, 'logout')
    }
    if (userData.confirmed != 1) {
      const notification = new NotificationService();
      notification.sendNotification(userData.id, 'confirmed')
    }
    let uploadFileData: UploadFile;

    if (file) {
      if (!(typeof file === "object") || !validImageTypes.includes(file.mimetype)) {
        throw new CustomError("Please upload valid file");
      }

      const uploadFileMorphData: any = await UploadFileMorph.findOne({
        where: { related_id: userData.id, related_type: 'users-permissions_user' },
        include: [{ model: UploadFile, as: 'UploadFile', attributes: ['id', 'url'] }]
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
        throw new CustomError("Error while uploading user image");
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
      if (uploadFileMorphData) {
        const getKey = uploadFileMorphData.UploadFile.url.split(`/${uploadPath}/`);
        await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
        await UploadFileMorph.destroy({ where: { related_id: userData.id, related_type: 'users-permissions_user' } });
        await UploadFile.destroy({ where: { id: uploadFileMorphData?.UploadFile?.id } });
      }
    }

    return User.update({
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      mobile: userData.mobile,
      dob: (userData.dob) ? userData.dob : null,
      address1: userData.address1,
      address2: userData.address2,
      city: userData.city,
      zip_code: (userData.zip_code) ? userData.zip_code : null,
      int_code: (userData.int_code) ? userData.int_code : null,
      role: (userData.role) ? userData.role : null,
      country: (userData.country) ? userData.country : null,
      state: (userData.state) ? userData.state : null,
      confirmed: (userData.confirmed == 1) ? 1 : 0,
      blocked: (userData.blocked == 1) ? 1 : 0,
      provider: 'local',
      updated_by: userId,
      latitude: userData.latitude ? userData.latitude : null,
      longitude: userData.longitude ? userData.longitude : null,
    }, { where: { id: userData.id } })
      .then(async () => {
        if (uploadFileData) {
          await UploadFileMorph.create({
            upload_file_id: uploadFileData.id,
            related_id: userData.id,
            related_type: "users-permissions_user",
            field: "image",
            order: 1
          });
        }

        // Insert animal type and breeds data start
        const dataAnimalTypes: any = [];
        await UsersAnimalTypes.destroy({ where: { "users-permissions_user_id": userData.id } });
        userData.dataAnimalType?.split(",").map(async (dataAnimalTypeId: number) => {
          if (dataAnimalTypeId) {
            dataAnimalTypes.push({ "users-permissions_user_id": userData.id, "animal-type_id": dataAnimalTypeId })
          }
        });
        await UsersAnimalTypes.bulkCreate(dataAnimalTypes);

        const breedsInserData: any = [];
        await UsersBreeds.destroy({ where: { "users-permissions_user_id": userData.id } });
        userData.breed?.split(",").map(async (breedId: number) => {
          if (breedId) {
            breedsInserData.push({ "users-permissions_user_id": userData.id, "breed_id": breedId })
          }
        });
        await UsersBreeds.bulkCreate(breedsInserData);
        // Insert animal type and breeds data end

        if (roleName && roleName.name === config.common.role.vet_practice_admin_role_name) {
          let animalTypesdata: object[] = [];
          let interestedSpecializationdata: object[] = [];
          let interestedAnimalTypesdata: object[] = [];
          
          const updateData = {
            currency_type: userData.currency_type || 'USD',
            speciality: userData.speciality || '',
            updated_by: userId,
            user: userData.id,
            practice: (userData.practice) ? userData.practice : null,
          }
          const vetProfileData = await VetProfile.findOne({ where: { user: userData.id } });
          if (vetProfileData) {
            await VetProfile.update(updateData, { where: { user: userData.id } });
            await VetProfileTreatesTypeAnimal.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.type?.split(",").map(async (type: number) => {
              if (type) {
                animalTypesdata.push({ vet_profile_id: vetProfileData.id, "animal-category_id": type })
              }
            });
            await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);

            await VetProfileInterestedSpecializations.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
              if (interestedSpecialization) {
                interestedSpecializationdata.push({ vet_profile_id: vetProfileData.id, specialization_id: interestedSpecialization })
              }
            });
            await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);

            await VetProfileInterestedAnimalTypes.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
              if (interestedAnimalType) {
                interestedAnimalTypesdata.push({ vet_profile_id: vetProfileData.id, "animal-type_id": interestedAnimalType })
              }
            });
            await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);

            return true;
          } else {
            await VetProfile.create(updateData).then(async (vetProfile) => {
              userData.type?.split(",").map(async (type: number) => {
                if (type) {
                  animalTypesdata.push({ vet_profile_id: vetProfile.id, "animal-category_id": type })
                }
              });
              await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);

              userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
                if (interestedSpecialization) {
                  interestedSpecializationdata.push({ vet_profile_id: vetProfile.id, specialization_id: interestedSpecialization })
                }
              });
              await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);
  
              userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
                if (interestedAnimalType) {
                  interestedAnimalTypesdata.push({ vet_profile_id: vetProfile.id, "animal-type_id": interestedAnimalType })
                }
              });
              await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);
            });
            return true;
          }
        }
        if (roleName && roleName.name && (roleName.name === config.common.role.vet_role_name || roleName.name === config.common.role.technician_nurse_role_name || roleName.name === config.common.role.service_provider_role_name)) {
          // --- start add availabilities ----
          const bulkAvailabilities: object[] = [];
          const availabilitiesId = [];
          const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          const availabilitiesObj = {
            updated_by: userId,
            user_id: userData.id,
            published_at: new Date()
          };

          const avi: any = await Availabilities.findAll({
            where: {
              user_id: userData.id
            },
            include: [{
              model: AvailabilitiesComponents,
              where: { field: "timeBlock" },
              include: [{
                model: AvailabilitiesTimeBlocks
              }]
            }]
          });

          let slots: any = []
          const dayWiseObj: any = {}
          for (let avail of avi) {
            if (avail && avail.AvailabilitiesComponents && avail.AvailabilitiesComponents.length > 0) {
              for (let i of avail.AvailabilitiesComponents) {
                if (i.AvailabilitiesTimeBlock && i.AvailabilitiesTimeBlock.from) {
                  const fromhours = parseInt(i.AvailabilitiesTimeBlock.from.split(':')[0])
                  const frommin = parseInt(i.AvailabilitiesTimeBlock.from.split(':')[1])
                  const tohours = parseInt(i.AvailabilitiesTimeBlock.to.split(':')[0])
                  const tomin = parseInt(i.AvailabilitiesTimeBlock.to.split(':')[1])
                  i.AvailabilitiesTimeBlock.fromDate = moment().utc().day(i.AvailabilitiesTimeBlock.day).week(1).set({ hour: fromhours, minute: frommin }).tz(timeZone);
                  i.AvailabilitiesTimeBlock.toDate = moment().utc().day(i.AvailabilitiesTimeBlock.day).week(1).set({ hour: tohours, minute: tomin }).tz(timeZone);
                  if (!dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]]) {
                    dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]] = []
                  }
                  dayWiseObj[day[i.AvailabilitiesTimeBlock.fromDate.day()]].push({
                    id: i.AvailabilitiesTimeBlock.id,
                    from_time: moment(i.AvailabilitiesTimeBlock.fromDate).format('HH:mm'),
                    to_time: moment(i.AvailabilitiesTimeBlock.toDate).format('HH:mm'),
                    day: day[i.AvailabilitiesTimeBlock.fromDate.day()],
                    interval: i.AvailabilitiesTimeBlock.interval,
                    stack: i.AvailabilitiesTimeBlock.stack,
                    availabilitiesId: avail.id
                  });
                }
              }
            }
          }

          for (let i in dayWiseObj) {
            dayWiseObj[i].sort((a: any, b: any) => {
              var dateA = new Date(a.from_time).getTime();
              var dateB = new Date(b.from_time).getTime();
              return dateA > dateB ? 1 : -1;
            });
            slots = slots.concat(dayWiseObj[i]);
          }


          const totalKey = []
          for (let obj of avi) {
            for (let o1 of obj.AvailabilitiesComponents) {
              let a1 = JSON.parse(JSON.stringify(o1))
              if (o1.AvailabilitiesTimeBlock) {
                totalKey.push(o1.AvailabilitiesTimeBlock.id);
              }
            }
          }

          const persentId: any[] = [];
          if (!userData.monday || userData.monday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Monday' } });
          }
          if (!userData.tuesday || userData.tuesday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Tuesday' } });
          }
          if (!userData.wednesday || userData.wednesday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Wednesday' } });
          }
          if (!userData.thursday || userData.thursday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Thursday' } });
          }
          if (!userData.friday || userData.friday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Friday' } });
          }
          if (!userData.saturday || userData.saturday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Saturday' } });
          }
          if (!userData.sunday || userData.sunday === undefined) {
            await Availabilities.destroy({ where: { user_id: userData.id, day: 'Sunday' } });
          }
          while (userData.monday && userData.monday.length > 0) {
            if (!userData.monday[0].includes(':')) {
              const val = userData.monday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'monday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Monday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'monday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Monday', timeZone, roleName.name);
              }
            } else {
              const val = userData.monday.splice(0, 4);
              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()
              let availabilitiesId = slots.filter((i: any) => i.day === 'monday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Monday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'monday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Monday', timeZone, roleName.name);
            }
          }

          while (userData.tuesday && userData.tuesday.length > 0) {
            if (!userData.tuesday[0].includes(':')) {
              const val = userData.tuesday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'tuesday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Tuesday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'tuesday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Tuesday', timeZone, roleName.name);
              }
            } else {
              const val = userData.tuesday.splice(0, 4);
              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'tuesday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Tuesday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'tuesday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Tuesday', timeZone, roleName.name);
            }
          }

          while (userData.wednesday && userData.wednesday.length > 0) {
            if (!userData.wednesday[0].includes(':')) {
              const val = userData.wednesday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'wednesday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Wednesday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'wednesday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Wednesday', timeZone, roleName.name);
              }
            } else {
              const val = userData.wednesday.splice(0, 4);

              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'wednesday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Wednesday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'wednesday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Wednesday', timeZone, roleName.name);
            }
          }

          while (userData.thursday && userData.thursday.length > 0) {
            if (!userData.thursday[0].includes(':')) {
              const val = userData.thursday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'thursday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Thursday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'thursday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Thursday', timeZone, roleName.name);
              }
            } else {
              const val = userData.thursday.splice(0, 4);

              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'thursday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Thursday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'thursday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Thursday', timeZone, roleName.name);
            }
          }

          while (userData.friday && userData.friday.length > 0) {
            if (!userData.friday[0].includes(':')) {
              const val = userData.friday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'friday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Friday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'friday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Friday', timeZone, roleName.name);
              }
            } else {
              const val = userData.friday.splice(0, 4);

              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'friday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Friday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'friday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Friday', timeZone, roleName.name);
            }
          }

          while (userData.saturday && userData.saturday.length > 0) {
            if (!userData.saturday[0].includes(':')) {
              const val = userData.saturday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                let availabilitiesId = slots.filter((i: any) => i.day === 'saturday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Saturday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'saturday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Saturday', timeZone, roleName.name);
              }
            } else {
              const val = userData.saturday.splice(0, 4);

              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'saturday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Saturday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'saturday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Saturday', timeZone, roleName.name);
            }
          }

          while (userData.sunday && userData.sunday.length > 0) {
            if (!userData.sunday[0].includes(':')) {
              const val = userData.sunday.splice(0, 5);
              const fromhours = parseInt(val[1].split(':')[0])
              const frommin = parseInt(val[1].split(':')[1])
              const tohours = parseInt(val[2].split(':')[0])
              const tomin = parseInt(val[2].split(':')[1])

              let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

              const interval = parseInt(val[3])
              const stack = parseInt(val[4])
              const checkBlock = slots.filter((i: any) => i.id == val[0]);
              if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack == stack) {
                persentId.push(parseInt(val[0]))
              } else if (checkBlock && checkBlock.length && checkBlock[0].from_time === val[1] && checkBlock[0].to_time === val[2] && checkBlock[0].interval == interval && checkBlock[0].stack != stack) {
                persentId.push(parseInt(val[0]));
                await AvailabilitiesTimeBlocks.update({ stack }, { where: { id: parseInt(val[0]) } });
              } else {
                bulkAvailabilities.push({ day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj });
                let availabilitiesId = slots.filter((i: any) => i.day === 'sunday');
                availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
                if (!availabilitiesId) {
                  const createAvail = await Availabilities.create({ day: 'Sunday', user_id: userData.id });
                  availabilitiesId = createAvail.id;
                  slots.push({ day: 'sunday', availabilitiesId });
                }
                const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
                const slot = { fromhours, frommin, tohours, tomin, interval };
                await this.createSlots(obj, slot, availabilitiesId, 'Sunday', timeZone, roleName.name);
              }
            } else {
              const val = userData.sunday.splice(0, 4);

              const fromhours = parseInt(val[0].split(':')[0])
              const frommin = parseInt(val[0].split(':')[1])
              const tohours = parseInt(val[1].split(':')[0])
              const tomin = parseInt(val[1].split(':')[1])
              const interval = parseInt(val[2])
              const stack = parseInt(val[3])
              let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
              let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
              let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

              let availabilitiesId = slots.filter((i: any) => i.day === 'sunday');
              availabilitiesId = availabilitiesId && availabilitiesId[0] && availabilitiesId[0].availabilitiesId && availabilitiesId[0].availabilitiesId;
              if (!availabilitiesId) {
                const createAvail = await Availabilities.create({ day: 'Sunday', user_id: userData.id });
                availabilitiesId = createAvail.id;
                slots.push({ day: 'sunday', availabilitiesId });
              }
              const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
              const slot = { fromhours, frommin, tohours, tomin, interval };
              await this.createSlots(obj, slot, availabilitiesId, 'Sunday', timeZone, roleName.name);
            }
          }

          let deletes: any = []
          for (let idInfo of totalKey) {
            if (persentId.indexOf(idInfo) == -1) {
              deletes.push(idInfo)
            }
          }
          if (deletes && deletes.length > 0) {
            let slotIds = await AvailabilitiesTimeComponents.findAll({ attributes: ["id"], where: { block_id: deletes } });
            slotIds = slotIds.map((i: any) => i.id);
            await AvailabilitiesTimeBlocks.destroy({ where: { id: deletes } });
            await AvailabilitiesTimeComponents.destroy({ where: { block_id: deletes } });
            await AvailabilitiesComponents.destroy({ where: { component_id: deletes.concat(slotIds) } });
          }

          let animalTypesdata: object[] = [];
          let specializationData: object[] = [];
          let specialitiesData: object[] = [];
          let interestedSpecializationdata: object[] = [];
          let interestedAnimalTypesdata: object[] = [];
          let servicedata: object[] = [];

          const updateData = {
            practitioner_liability: (userData.practitioner_liability) ? userData.practitioner_liability : null,
            service_provider_liability: (userData.service_provider_liability) ? userData.service_provider_liability : null,
            passout_date: (userData.passout_date) ? userData.passout_date : null,
            education: userData.education,
            educationDuration: userData.educationDuration,
            personal_bio: userData.personal_bio,
            registration_number: userData.registration_number,
            in_clinic_consultation: (userData.in_clinic_consultation) && userData.in_clinic_consultation,
            online_consultation: (userData.online_consultation) && userData.online_consultation,
            is_in_clinic_consultation: (userData.is_in_clinic_consultation) ? 1 : 0,
            is_online_consultation: (userData.is_online_consultation) ? 1 : 0,
            currency_type: userData.currency_type,
            // speciality: userData.speciality,
            public_email: userData.public_email,
            public_contact_no: userData.public_contact_no,
            public_out_of_hr_phone: userData.public_out_of_hr_phone,
            public_contact_no_int_code: userData.public_contact_no_int_code,
            public_out_of_hr_phone_int_code: userData.public_out_of_hr_phone_int_code,
            updated_by: userId,
            user: userData.id,
            practice: (userData.practice) ? userData.practice : null,
            b_user_name: userData.b_user_name,
            b_user_email: userData.b_user_email,
            b_country: userData.b_country,
            b_currency: userData.b_currency,
            b_account_number: userData.b_account_number,
            b_iban: userData.b_iban,
            b_ncc: userData.b_ncc,
            b_sort_code: userData.b_sort_code,
            b_swiftbic: userData.b_swiftbic,
            bank_name: userData.bank_name,
            b_address: userData.b_address,
          }
          const vetProfileData = await VetProfile.findOne({ where: { user: userData.id } });
          if (vetProfileData) {
            await VetProfile.update(updateData, { where: { user: userData.id } });

            await VetProfileTreatesTypeAnimal.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.type?.split(",").map(async (type: number) => {
              if (type) {
                animalTypesdata.push({ vet_profile_id: vetProfileData.id, "animal-category_id": type })
              }
            });
            await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);
            await VetProfileSpecialization.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.specialization?.split(",").map(async (specializationId: number) => {
              if (specializationId) {
                specializationData.push({ vet_profile_id: vetProfileData.id, "specialization_id": specializationId })
              }
            });
            await VetProfileSpecialization.bulkCreate(specializationData);
            await VetProfileSpecialities.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.speciality?.split(",").map(async (specialityId: number) => {
              if (specialityId) {
                specialitiesData.push({ vet_profile_id: vetProfileData.id, "speciality_id": specialityId })
              }
            });
            await VetProfileSpecialities.bulkCreate(specialitiesData);
            await VetProfileInterestedSpecializations.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
              if (interestedSpecialization) {
                interestedSpecializationdata.push({ vet_profile_id: vetProfileData.id, specialization_id: interestedSpecialization })
              }
            });
            await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);
            await VetProfileInterestedAnimalTypes.destroy({ where: { vet_profile_id: vetProfileData.id } });
            userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
              if (interestedAnimalType) {
                interestedAnimalTypesdata.push({ vet_profile_id: vetProfileData.id, "animal-type_id": interestedAnimalType })
              }
            });
            await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);
            const mainServices: object[] = [];
            const subServices: object[] = [];
            const servicePrices: any = [];
            let isSubServiceContainsOther = false;
            //await VetProfileSubServices.destroy({ where: { vet_profile_id: vetProfileData.id } });
            await ServiceProviderSubServices.destroy({ where: { created_by: userData.id } });
            if(userData && userData.serviceProviderServices && userData.serviceProviderServices.length){
              await Promise.all(userData?.serviceProviderServices?.map(async (mainServiceId: any) => {
                //changes here 
                let existMainService:any = null;//mainServiceId;
                if(isNaN(mainServiceId)){
                  const getMainservice = await ServiceProviderMainServices.findOne({ where: { service: mainServiceId, status: 1 } });  
                  if(getMainservice){
                    existMainService = getMainservice.id;
                  }else{
                    const addMainService = await ServiceProviderMainServices.create({ service: mainServiceId, status: 1 });
                    let indexOfMain = userData.serviceProviderServices.indexOf(mainServiceId);
                    userData.serviceProviderServices.splice(indexOfMain, 1, addMainService.id);
                    existMainService = addMainService.id;
                  }
                }else{
                  existMainService = mainServiceId;
                }
                if (userData && userData.serviceProviderSubServices  && userData.serviceProviderSubServices[`sub${mainServiceId}`]) {
                  await Promise.all(userData?.serviceProviderSubServices[`sub${mainServiceId}`]?.map(async (id: any) => {
                   
                    let i = userData.serviceProviderSubServices[`sub${mainServiceId}`].indexOf(id);
                    const price = userData && userData.price && userData.price[`price${mainServiceId}`] ? userData.price[`price${mainServiceId}`][i] : null;
                    const stack = userData && userData.appointment && userData.appointment[`stack${mainServiceId}`] ? userData.appointment[`stack${mainServiceId}`][i] : null;
                   
                    if (isNaN(id)) {
                      const getSubService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: userData.id } });
                      if (getSubService) {
                        const checkUnderMainService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: userData.id, main_service_id: existMainService } });
                        if(checkUnderMainService){
                          const updateSubservice = await ServiceProviderSubServices.update({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack: stack},{ where: {service: id, created_by:userData.id } })
                          .then((subservice:any) => {
                            id = checkUnderMainService.id;
                          });
                          //id = checkUnderMainService.id;
                        }else{
                          const updateSubservice = await ServiceProviderSubServices.update({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack },{ where: {service: id, created_by:userData.id } })
                          .then((subservice:any) => {
                            id = getSubService.id;
                          });
                        }
                      } else {
                        if(userData.price[`price${mainServiceId}`]&& userData.price[`price${mainServiceId}`][i] && userData.description[`description${mainServiceId}`] && userData.description[`description${mainServiceId}`][i] && id && userData.duration[`duration${mainServiceId}`] && userData.duration[`duration${mainServiceId}`][i]){
                          const addService = await ServiceProviderSubServices.create({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack });
                           id = addService.id;
                        }
                      }
                    }
                  
                    }));
                  }
              }))
            }
            
            await VetProfileMainServices.destroy({ where: { vet_profile_id: vetProfileData.id } });
            if (userData && userData.serviceProviderServices && userData.serviceProviderServices.length) {
              await Promise.all(userData?.serviceProviderServices?.map(async (id: any) => {
                if (isNaN(id)) {
                  const addService = await ServiceProviderMainServices.create({ service: id, status: 1 });
                  id = addService.id;
                }
                mainServices.push({ vet_profile_id: vetProfileData.id, "service-provider-main-service_id": id });
              }));
              if (isSubServiceContainsOther) {
                mainServices.push({ vet_profile_id: vetProfileData.id, "service-provider-main-service_id": 18 });
              }
              let newMainserviceVet = await VetProfileMainServices.bulkCreate(mainServices);

            }

            return true;
          } else {
            await VetProfile.create(updateData).then(async (vetProfile) => {
              userData.type?.split(",").map(async (type: number) => {
                if (type) {
                  animalTypesdata.push({ vet_profile_id: vetProfile.id, "animal-category_id": type })
                }
              });
              await VetProfileTreatesTypeAnimal.bulkCreate(animalTypesdata);
              userData.specialization?.split(",").map(async (specializationId: number) => {
                if (specializationId) {
                  specializationData.push({ vet_profile_id: vetProfile.id, "specialization_id": specializationId })
                }
              });
              await VetProfileSpecialization.bulkCreate(specializationData);
              userData.speciality?.split(",").map(async (specialityId: number) => {
                if (specialityId) {
                  specialitiesData.push({ vet_profile_id: vetProfile.id, "speciality_id": specialityId })
                }
              });
              await VetProfileSpecialities.bulkCreate(specialitiesData);
              userData.interestedSpecialization?.split(",").map(async (interestedSpecialization: number) => {
                if (interestedSpecialization) {
                  interestedSpecializationdata.push({ vet_profile_id: vetProfile.id, specialization_id: interestedSpecialization })
                }
              });
              await VetProfileInterestedSpecializations.bulkCreate(interestedSpecializationdata);
              userData.interestedAnimalType?.split(",").map(async (interestedAnimalType: number) => {
                if (interestedAnimalType) {
                  interestedAnimalTypesdata.push({ vet_profile_id: vetProfile.id, "animal-type_id": interestedAnimalType })
                }
              });
              await VetProfileInterestedAnimalTypes.bulkCreate(interestedAnimalTypesdata);

            const mainServices: object[] = [];
            const subServices: object[] = [];
            const servicePrices: any = [];
            let isSubServiceContainsOther = false;
            if(userData && userData.serviceProviderServices && userData.serviceProviderServices.length){
              await Promise.all(userData?.serviceProviderServices?.map(async (mainServiceId: any) => {
                //changes here 
                let existMainService:any = null;//mainServiceId;
                    if(isNaN(mainServiceId)){
                      const getMainservice = await ServiceProviderMainServices.findOne({ where: { service: mainServiceId, status: 1 } });                      if(getMainservice){
                        existMainService = getMainservice.id;
                      }else{
                        const addMainService = await ServiceProviderMainServices.create({ service: mainServiceId, status: 1 });
                        let indexOfMain = userData.serviceProviderServices.indexOf(mainServiceId);
                        userData.serviceProviderServices.splice(indexOfMain, 1, addMainService.id);
                        existMainService = addMainService.id;
                      }
                    }else{
                      existMainService = mainServiceId;
                    }
                if (userData && userData.serviceProviderSubServices  && userData.serviceProviderSubServices[`sub${mainServiceId}`]) {
                  await Promise.all(userData?.serviceProviderSubServices[`sub${mainServiceId}`]?.map(async (id: any) => {
                    let i = userData.serviceProviderSubServices[`sub${mainServiceId}`].indexOf(id);
                    const price = userData && userData.price && userData.price[`price${mainServiceId}`] ? userData.price[`price${mainServiceId}`][i] : null;
                    const stack = userData && userData.appointment && userData.appointment[`stack${mainServiceId}`] ? userData.appointment[`stack${mainServiceId}`][i] : null;
                    if (isNaN(id)) {
                      const getSubService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: userData.id } });
                      if (getSubService) {
                        const checkUnderMainService = await ServiceProviderSubServices.findOne({ where: { service: id, status: 1, created_by: userData.id, main_service_id: existMainService } });
                        if(checkUnderMainService){
                          const updateSubservice = await ServiceProviderSubServices.update({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack: stack},{ where: {service: id, created_by:userData.id } })
                          .then((subservice:any) => {
                            id = checkUnderMainService.id;
                          });
                          //id = checkUnderMainService.id;
                        }else{
                          const updateSubservice = await ServiceProviderSubServices.update({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack },{ where: {service: id, created_by:userData.id } })
                          .then((subservice:any) => {
                            id = getSubService.id;
                          });
                        }
                      } else {
                        if(userData.price[`price${mainServiceId}`]&& userData.price[`price${mainServiceId}`][i] && userData.description[`description${mainServiceId}`] && userData.description[`description${mainServiceId}`][i] && id && userData.duration[`duration${mainServiceId}`] && userData.duration[`duration${mainServiceId}`][i]){
                          const addService = await ServiceProviderSubServices.create({ service: id, created_by: userData.id, status: 1, main_service_id: existMainService, duration: userData.duration[`duration${mainServiceId}`][i], description:userData.description[`description${mainServiceId}`][i], price:userData.price[`price${mainServiceId}`][i], stack:stack });
                           id = addService.id;
                        }
                      }
                    }
                    
                  }));
                }
              }))
            }

            if (userData && userData.serviceProviderServices && userData.serviceProviderServices.length) {
              await Promise.all(userData?.serviceProviderServices?.map(async (id: any) => {
                if (isNaN(id)) {
                  const addService = await ServiceProviderMainServices.create({ service: id, status: 1 });
                  id = addService.id;
                }
                mainServices.push({ vet_profile_id: vetProfile.id, "service-provider-main-service_id": id });
              }));
              if (isSubServiceContainsOther) {
                mainServices.push({ vet_profile_id: vetProfile.id, "service-provider-main-service_id": 18 });
              }
              await VetProfileMainServices.bulkCreate(mainServices);
            }
            });
            return true;
          }

        }

        return true;
      })
      .catch((error: Error) => {
        throw error;
      });

  }

  async createSlots(obj: object, slot: any, availabilitiesId: number, day: string, timeZone: any, role:any=null) {
    const AvailabilitiesTimeBlock = await AvailabilitiesTimeBlocks.create(obj)
    const availabilitiesComponentsdata = {
      field: 'timeBlock',
      order: 1,
      component_type: 'components_time_block_times',
      component_id: AvailabilitiesTimeBlock.id,
      availability_id: availabilitiesId
    }
    await AvailabilitiesComponents.create(availabilitiesComponentsdata);
    if(role === config.common.role.service_provider_role_name){
      return;
    }
    const splitTime = (startTime: any, endTime: any, interval: any) => {
      const result = [startTime.format('HH:mm')];
      let time = startTime.add(interval, 'm');
      while (time.isBetween(startTime, endTime, undefined, [])) {
        result.push(time.format('HH:mm'));
        time = time.add(interval, 'm');
      }
      return result;
    }
    const startTime: any = new (moment as any)({ hour: slot.fromhours, minute: slot.frommin });
    const endTime: any = new (moment as any)({ hour: slot.tohours, minute: slot.tomin });
    const timeSlices = splitTime(startTime, endTime, slot.interval);
    const timeSlots: any[] = [];
    if (timeSlices && timeSlices.length > 1) {
      for (let index = 0; timeSlices && index < timeSlices.length - 1; index++) {
        const t_fromhours = parseInt(timeSlices[index].split(':')[0]);
        const t_frommin = parseInt(timeSlices[index].split(':')[1]);
        const t_tohours = parseInt(timeSlices[index + 1].split(':')[0]);
        const t_tomin = parseInt(timeSlices[index + 1].split(':')[1]);
        const from = moment().tz(timeZone).day(day).set({ hour: t_fromhours, minute: t_frommin }).utc().format('HH:mm');
        const to = moment().tz(timeZone).day(day).set({ hour: t_tohours, minute: t_tomin }).utc().format('HH:mm');
        const dayNo = moment().tz(timeZone).day(day).set({ hour: t_fromhours, minute: t_frommin }).utc().day();
        timeSlots.push({ from, to, day: dayNo, block_id: AvailabilitiesTimeBlock.id });
      }
      let AvailabilitiesTimeSlots = await AvailabilitiesTimeComponents.bulkCreate(timeSlots);
      const availabilitiesTimeComponentObj = {
        field: 'timeSlot',
        order: 1,
        component_type: 'components_time_time_slots',
        availability_id: availabilitiesId
      }
      let availabilitiesTimeComponentsdata: any[] = [];
      AvailabilitiesTimeSlots = AvailabilitiesTimeSlots.map((i: any) => i.toJSON());
      AvailabilitiesTimeSlots.map((i: any) => availabilitiesTimeComponentsdata.push({...availabilitiesTimeComponentObj, component_id: i.id}));
      return AvailabilitiesComponents.bulkCreate(availabilitiesTimeComponentsdata);
    }

  }

  async importVetUser(
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

    const vetUserData = await csv().fromFile(file.path);
    if(!vetUserData) {
      throw new CustomError('Unable to import data');
    }

    const checkHeader = Object.keys(vetUserData[0]).filter(key => !constants.VET_USER_HEADING.includes(key));
    if(checkHeader.length !== 0) {
      throw new CustomError('Please set header as sample excel');
    }

    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(vetUserData.map(async (vetUser: any) => {
      const checkUser = await User.count({where: { email: vetUser.email, is_deleted : null }});
      if(checkUser) {
        return;
      }
      const role = await UsersPermissionsRole.findOne({ where: {name: common.role.vet_role_name}, attributes: ['id'] });
      const userRole = await UsersPermissionsRole.findOne({ where: {name: vetUser.role}, attributes: ['id'] });
      if(vetUser && vetUser.country) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetUser.country}})
        vetUser.country = country && country.id ? country.id : null;
      }
      if(vetUser && vetUser.state) {
        const state = await State.findOne({attributes:['id'],where: {state: vetUser.state}})
        vetUser.state = state && state.id ? state.id : null;
      }
      if(vetUser && vetUser.practice_Email) {
        const practice = await VetPractices.findOne({attributes:['id'],where: {email: vetUser.practice_Email, is_deleted : null}})

        if(!practice) {
          const country = await Country.findOne({attributes:['id'],where: {id: vetUser.country}})

          if(!country) {
            vetUser.practice = 3;
          } else {
            if(country?.id === 2) {
              vetUser.practice = 2;
            } else if(country?.id === 3 || country?.id === 4) {
              vetUser.practice = 1;
            } else {
              vetUser.practice = 3;
            }
          }
        } else {
          vetUser.practice = practice && practice.id ? practice.id : null;
        }
      }
      if(vetUser && vetUser.practitioner_liability) {
        const practitioner_liability = await PractitionerLiability.findOne({attributes:['id'],where: {name: vetUser.practitioner_liability}})
        vetUser.practitioner_liability = practitioner_liability && practitioner_liability.id ? practitioner_liability.id : null;
      }
      if(vetUser && vetUser.int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetUser.int_code}})
        vetUser.int_code = country && country.id ? country.id : null;
      }
      if(vetUser && vetUser.public_contact_no_int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetUser.public_contact_no_int_code}})
        vetUser.public_contact_no_int_code = country && country.id ? country.id : null;
      }
      if(vetUser && vetUser.public_out_of_hr_phone_int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: vetUser.public_out_of_hr_phone_int_code}})
        vetUser.public_out_of_hr_phone_int_code = country && country.id ? country.id : null;
      }
      const password = await bcryptjs.hashSync(config.defaultVetUserPassword, config.bcryptSalt);
      const roleId = userRole && userRole.id ? userRole.id : role?.id;
      await User.create({
        email: vetUser.email,
        password: password ? password : null,
        first_name: vetUser.first_name,
        last_name: vetUser.last_name,
        mobile: vetUser.mobile,
        dob: vetUser.dob || null,
        address1: vetUser.address1,
        address2: vetUser.address2,
        city: vetUser.city,
        zip_code: vetUser.zip_code || null,
        int_code: vetUser.int_code || null,
        role: roleId || null,
        country: (vetUser && vetUser.country) ? vetUser.country : null,
        state: (vetUser && vetUser.state) ? vetUser.state : null,
        confirmed: (vetUser.confirmed) ? 1 : 0,
        provider: 'local',
        created_by: userId,
      }).then(async (vetUserData: any) => {
        const monday = vetUser.mon && vetUser.mon.split(",");
        const tuesday = vetUser.tue && vetUser.tue.split(",");
        const wednesday = vetUser.wed && vetUser.wed.split(",");
        const thursday = vetUser.thu && vetUser.thu.split(",");
        const friday = vetUser.fri && vetUser.fri.split(",");
        const saturday = vetUser.sat && vetUser.sat.split(",");
        const sunday = vetUser.sun && vetUser.sun.split(",");
        const availabilitiesObj = {
          created_by: userId,
          user_id: vetUserData.id,
          published_at: new Date()
        };
        while (monday && monday.length > 0) {
          let val = monday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()
          const createAvail = await Availabilities.create({day: 'Monday', user_id: vetUserData.id});
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = {fromhours, frommin, tohours, tomin, interval};
          await this.createSlots(obj, slot, createAvail.id, 'Monday', timeZone,common.role.vet_role_name);
        }

        while (tuesday && tuesday.length > 0) {
          let val = tuesday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Tuesday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Tuesday', timeZone, common.role.vet_role_name);
        }

        while (wednesday && wednesday.length > 0) {
          let val = wednesday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Wednesday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Wednesday', timeZone, common.role.vet_role_name);
        }

        while (thursday && thursday.length > 0) {
          let val = thursday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Thursday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Thursday', timeZone, common.role.vet_role_name);
        }

        while (friday && friday.length > 0) {
          let val = friday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Friday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Friday', timeZone, common.role.vet_role_name);
        }

        while (saturday && saturday.length > 0) {
          let val = saturday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Saturday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Saturday', timeZone, common.role.vet_role_name);
        }

        while (sunday && sunday.length > 0) {
          let val = sunday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = val[0].split("-")[2] || 0;
          const stack = val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Sunday', user_id: vetUserData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Sunday', timeZone, common.role.vet_role_name);
        }

        if(vetUser && vetUser.b_country) {
          const country = await Country.findOne({attributes:['id'],where: {country: vetUser.b_country}})
          vetUser.b_country = country && country.id ? country.id : null;
        }
        if (vetUser && vetUser.passout_date) {
          const isValidDate = (dateObject: any) => new Date(dateObject).toString() !== 'Invalid Date';
          if (isValidDate(vetUser.passout_date)) {
            const dt = new Date(vetUser.passout_date);
            const month = ("0" + (dt.getMonth() + 1)).slice(-2);
            const year = dt.getFullYear();
            vetUser.passout_date = `${month}/${year}`;
          }
        }
        if (vetUser && vetUser.educationDuration) {
          const isValidDate = (dateObject: any) => new Date(dateObject).toString() !== 'Invalid Date';
          if (isValidDate(vetUser.educationDuration)) {
            const dt = new Date(vetUser.educationDuration);
            const month = ("0" + (dt.getMonth() + 1)).slice(-2);
            const year = dt.getFullYear();
            vetUser.educationDuration = `${month}/${year}`;
          }
        }
          await VetProfile.create({
            practitioner_liability: (vetUser && vetUser.practitioner_liability) ? vetUser.practitioner_liability : null,
            passout_date: vetUser.passout_date || null,
            education: vetUser.education,
            educationDuration: vetUser.educationDuration,
            personal_bio: vetUser.personal_bio,
            registration_number: vetUser.registration_number,
            in_clinic_consultation: (vetUser.in_clinic_consultation) ? vetUser.in_clinic_consultation : 0,
            online_consultation: (vetUser.online_consultation) ? vetUser.online_consultation : 0,
            is_in_clinic_consultation: (vetUser.in_clinic_consultation) ? 1 : 0,
            is_online_consultation: (vetUser.online_consultation) ? 1 : 0,
            currency_type: vetUser.currency_type,
            // speciality: vetUser.speciality,
            public_email: vetUser.public_email,
            public_contact_no: vetUser.public_contact_no,
            public_out_of_hr_phone: vetUser.public_out_of_hr_phone,
            public_contact_no_int_code: vetUser.public_contact_no_int_code,
            public_out_of_hr_phone_int_code: vetUser.public_out_of_hr_phone_int_code,
            created_by: userId,
            user: vetUserData.id,
            practice: vetUser && vetUser.practice ? vetUser.practice : null,
            b_user_name: vetUser.b_user_name || "",
            b_user_email: vetUser.b_user_email || "",
            b_country: vetUser.b_country ? vetUser.b_country : "",
            b_currency: vetUser.b_currency || "",
            b_account_number: vetUser.b_account_number || "",
            b_iban: vetUser.b_iban || "",
            b_ncc: vetUser.b_ncc || "",
            b_sort_code: vetUser.b_sort_code || "",
            b_swiftbic: vetUser.b_swiftbic || "",
            bank_name: vetUser.bank_name || "",
            b_address: vetUser.b_address || "",
          }).then(async (vetProfile: VetProfile) => {
            const vetProfileId = vetProfile.id;
            if(vetUser && vetUser.treats_type_animal) {
              const animalData: any = [];
              const animalTypes = await Promise.all(vetUser.treats_type_animal.split(",").map((item: string) => item.trim()));
              await Promise.all(animalTypes.map(async (animalType: any) => {
                const animalTypeData = await AnimalCategories.findOne({ where: { category: animalType }, attributes: ['id'], raw: true });
                if (animalTypeData) {
                  animalData.push({ vet_profile_id: vetProfileId, "animal-category_id": animalTypeData.id });
                }
              }));
            await VetProfileTreatesTypeAnimal.bulkCreate(animalData);
            const specializationArray: any = [];
              const specializations = await Promise.all(vetUser.specialization.split(",").map((item: string) => item.trim()));
              await Promise.all(specializations.map(async (specialization: any) => {
                const specializationData = await Specialization.findOne({ where: { name: specialization }, attributes: ['id'], raw: true });
                if (specializationData) {
                  specializationArray.push({ vet_profile_id: vetProfileId, "specialization_id": specializationData.id });
                }
              }));
            await VetProfileSpecialization.bulkCreate(specializationArray);
            const specialityArray: any = [];
              const specialities = await Promise.all(vetUser.veterinary_registrations.split("|").map((item: string) => item.trim()));
              await Promise.all(specialities.map(async (speciality: any) => {
                const specialityData = await Specialities.findOne({ where: { name: speciality }, attributes: ['id'], raw: true });
                if (specialityData) {
                  specialityArray.push({ vet_profile_id: vetProfileId, "speciality_id": specialityData.id });
                }
              }));
            await VetProfileSpecialities.bulkCreate(specialityArray);
            }
            return vetUserData;
          })
          .catch((error: Error) => {
            throw error;
          });
        return vetUserData;
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

  async importServiceProvider(
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

    const serviceProviderData = await csv().fromFile(file.path);
    if(!serviceProviderData) {
      throw new CustomError('Unable to import data');
    }

    const checkHeader = Object.keys(serviceProviderData[0]).filter(key => !constants.SERVICE_PROVIDER.includes(key));
    if(checkHeader.length !== 0) {
      throw new CustomError('Please set header as sample excel');
    }

    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    const userRole = await UsersPermissionsRole.findOne({ where: {name: common.role.service_provider_role_name}, attributes: ['id', 'name'] });
    return Promise.all(serviceProviderData.map(async (serviceProvider: any) => {
      const checkUser = await User.count({where: { email: serviceProvider.email, is_deleted : null }});
      if(checkUser) {
        return;
      }
      if(serviceProvider && serviceProvider.country) {
        const country = await Country.findOne({attributes:['id'],where: {country: serviceProvider.country}})
        serviceProvider.country = country && country.id ? country.id : null;
      }
      if(serviceProvider && serviceProvider.store_email) {
        const storeEmail = await VetPractices.findOne({attributes:['id'],where: {email: serviceProvider.store_email, is_deleted: null}})
        serviceProvider.store_email = storeEmail && storeEmail.id ? storeEmail.id : null;
      }
      if(serviceProvider && serviceProvider.state) {
        const state = await State.findOne({attributes:['id'],where: {state: serviceProvider.state}})
        serviceProvider.state = state && state.id ? state.id : null;
      }
      if(serviceProvider && serviceProvider.int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: serviceProvider.int_code}})
        serviceProvider.int_code = country && country.id ? country.id : null;
      }
      if(serviceProvider && serviceProvider.public_contact_no_int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: serviceProvider.public_contact_no_int_code}})
        serviceProvider.public_contact_no_int_code = country && country.id ? country.id : null;
      }
      if(serviceProvider && serviceProvider.public_out_of_hr_phone_int_code) {
        const country = await Country.findOne({attributes:['id'],where: {country: serviceProvider.public_out_of_hr_phone_int_code}})
        serviceProvider.public_out_of_hr_phone_int_code = country && country.id ? country.id : null;
      }
      if(serviceProvider && serviceProvider.service_provider_liability) {
        const service_provider_liability = await ServiceProviderLiability.findOne({attributes:['id'],where: {name: serviceProvider.service_provider_liability}})
        serviceProvider.service_provider_liability = service_provider_liability && service_provider_liability.id ? service_provider_liability.id : null;
      }
      const password = await bcryptjs.hashSync(config.defaultVetUserPassword, config.bcryptSalt);
      const roleId = userRole && userRole.id ;
      const userRoleName = userRole && userRole.name;
      const resetPasswordToken = uuidv4();
      await User.create({
        email: serviceProvider.email,
        password: password ? password : null,
        first_name: serviceProvider.first_name,
        last_name: serviceProvider.last_name,
        mobile: serviceProvider.mobile,
        dob: serviceProvider.dob || null,
        address1: serviceProvider.address1,
        address2: serviceProvider.address2,
        city: serviceProvider.city,
        zip_code: serviceProvider.zip_code || null,
        int_code: serviceProvider.int_code || null,
        role: roleId || null,
        country: (serviceProvider && serviceProvider.country) ? serviceProvider.country : null,
        state: (serviceProvider && serviceProvider.state) ? serviceProvider.state : null,
        confirmed: 1,
        provider: 'local',
        created_by: userId,
        resetPasswordToken
      }).then(async (serviceProviderData: any) => {
        const monday = serviceProvider.mon && serviceProvider.mon.split(",");
        const tuesday = serviceProvider.tue && serviceProvider.tue.split(",");
        const wednesday = serviceProvider.wed && serviceProvider.wed.split(",");
        const thursday = serviceProvider.thu && serviceProvider.thu.split(",");
        const friday = serviceProvider.fri && serviceProvider.fri.split(",");
        const saturday = serviceProvider.sat && serviceProvider.sat.split(",");
        const sunday = serviceProvider.sun && serviceProvider.sun.split(",");
        const availabilitiesObj = {
          created_by: userId,
          user_id: serviceProviderData.id,
          published_at: new Date()
        };
        while (monday && monday.length > 0) {
          let val = monday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0;//val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Monday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Monday').set({ hour: fromhours, minute: frommin }).utc().day()


          const createAvail = await Availabilities.create({day: 'Monday', user_id: serviceProviderData.id});
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = {fromhours, frommin, tohours, tomin, interval};
          await this.createSlots(obj, slot, createAvail.id, 'Monday', timeZone, userRoleName);
        }

        while (tuesday && tuesday.length > 0) {
          let val = tuesday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0;//val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Tuesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Tuesday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Tuesday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Tuesday', timeZone, userRoleName);
        }

        while (wednesday && wednesday.length > 0) {
          let val = wednesday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Wednesday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Wednesday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Wednesday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Wednesday', timeZone, userRoleName);
        }

        while (thursday && thursday.length > 0) {
          let val = thursday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Thursday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Thursday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Thursday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Thursday', timeZone, userRoleName);
        }

        while (friday && friday.length > 0) {
          let val = friday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Friday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Friday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Friday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Friday', timeZone, userRoleName);
        }

        while (saturday && saturday.length > 0) {
          let val = saturday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Saturday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Saturday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Saturday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Saturday', timeZone, userRoleName);
        }

        while (sunday && sunday.length > 0) {
          let val = sunday.splice(0, 1);
          val = val[0].split(",")
          let fromhours = val[0].split("-")[0] || 0;
          fromhours = parseInt(fromhours.split(':')[0]) || 0;
          let frommin = val[0].split("-")[0] || 0;
          frommin = parseInt(frommin.split(':')[1]) || 0;
          let tohours = val[0].split("-")[1] || 0;
          tohours = parseInt(tohours.split(':')[0]) || 0;
          let tomin = val[0].split("-")[1] || 0;
          tomin = parseInt(tomin.split(':')[1]) || 0;
          const interval = 0; //val[0].split("-")[2] || 0;
          const stack = 0; //val[0].split("-")[3] || 1;
          let from1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
          let to1 = moment().tz(timeZone).day('Sunday').set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
          let day1 = moment().tz(timeZone).day('Sunday').set({ hour: fromhours, minute: frommin }).utc().day()

          const createAvail = await Availabilities.create({ day: 'Sunday', user_id: serviceProviderData.id });
          const obj = { day: day1, from: from1, to: to1, interval, stack, ...availabilitiesObj };
          const slot = { fromhours, frommin, tohours, tomin, interval };
          await this.createSlots(obj, slot, createAvail.id, 'Sunday', timeZone, userRoleName);
        }

        if(serviceProvider && serviceProvider.b_country) {
          const country = await Country.findOne({attributes:['id'],where: {country: serviceProvider.b_country}})
          serviceProvider.b_country = country && country.id ? country.id : null;
        }
          await VetProfile.create({
            service_provider_liability: (serviceProvider.service_provider_liability) ? serviceProvider.service_provider_liability : null,
            personal_bio: serviceProvider.personal_bio,
            currency_type: serviceProvider.currency_type,
            public_email: serviceProvider.public_email,
            public_contact_no: serviceProvider.public_contact_no,
            public_out_of_hr_phone: serviceProvider.public_out_of_hr_phone,
            public_contact_no_int_code: serviceProvider.public_contact_no_int_code,
            public_out_of_hr_phone_int_code: serviceProvider.public_out_of_hr_phone_int_code,
            created_by: userId,
            user: serviceProviderData.id,
            practice: serviceProvider.store_email,
            option: "store",
            b_user_name: serviceProvider.b_user_name || "",
            b_user_email: serviceProvider.b_user_email || "",
            b_country: serviceProvider.b_country ? serviceProvider.b_country : "",
            b_currency: serviceProvider.b_currency || "",
            b_account_number: serviceProvider.b_account_number || "",
            b_iban: serviceProvider.b_iban || "",
            b_ncc: serviceProvider.b_ncc || "",
            b_sort_code: serviceProvider.b_sort_code || "",
            b_swiftbic: serviceProvider.b_swiftbic || "",
            bank_name: serviceProvider.bank_name || "",
            b_address: serviceProvider.b_address || "",
          }).then(async (vetProfile: VetProfile) => {
            const vetProfileId = vetProfile.id;
            if(serviceProvider && serviceProvider.treats_type_animal) {
              const animalData: any = [];
              const animalTypes = await Promise.all(serviceProvider.treats_type_animal.split(",").map((item: string) => item.trim()));
              await Promise.all(animalTypes.map(async (animalType: any) => {
                const animalTypeData = await AnimalCategories.findOne({ where: { category: animalType }, attributes: ['id'], raw: true });
                if (animalTypeData) {
                  animalData.push({ vet_profile_id: vetProfileId, "animal-category_id": animalTypeData.id });
                }
              }));
              await VetProfileTreatesTypeAnimal.bulkCreate(animalData);
            }
            let services: any[] = [];
            const mainServicesData: any[] = await ServiceProviderMainServices.findAll({ attributes: ['id', 'service'], raw: true });
            const subServicesData: any[] = await ServiceProviderSubServices.findAll({ attributes: ['id', 'service', 'main_service_id'], raw: true });
            // let type = "";
            // if (userRole && userRole.name && userRole.name == config.common.role.groomer_role_name) {
            //   type = "groomers"
            // } else if (userRole && userRole.name && userRole.name == config.common.role.walker_role_name) {
            //   type = "walkers";
            // } else if (userRole && userRole.name && userRole.name == config.common.role.therapist_role_name) {
            //   services = await TherapistsServices.findAll({ attributes: ['id', 'service'], raw: true });
            //   type = "therapists";
            // } else if (userRole && userRole.name && userRole.name == config.common.role.nutritionists_role_name) {
            //   services = await NutritionistsServices.findAll({ attributes: ['id', 'service'], raw: true });
            //   type = "nutritionists";
            // } else if (userRole && userRole.name && userRole.name == config.common.role.breeders_role_name) {
            //   services = await BreedersServices.findAll({ attributes: ['id', 'service'], raw: true });
            //   type = "breeders";
            // }

            const mainServices: object[] = [];
            const subServices: object[] = [];
            const serviceData: any = [];
            let isSubServiceContainsOther = false;

            if(serviceProvider && serviceProvider.sub_service_and_pricing) {
              const servicesList = serviceProvider.sub_service_and_pricing.split("|").map((item: string) => item.trim()); //serviceProvider.sub_service_and_pricing.split(",").map((item: string) => item.trim());
              await Promise.all(servicesList.map(async (i: any) => {
                const mainService = i.split("#")[0] || "";
                let mainServiceId = 0;
                if(mainService){
                  const getMainservice = mainServicesData.find((s: any) => s.service.toLowerCase() == mainService.toLowerCase());
                  if(getMainservice){
                    mainServiceId = getMainservice.id;
                  }else{
                    const addMainService = await ServiceProviderMainServices.create({ service: mainService, status: 1 });
                    mainServiceId = addMainService.id;
                  }
                  mainServices.push({ vet_profile_id: vetProfileId, "service-provider-main-service_id": mainServiceId });
                }
                const subserviceList = i.split("#")['1'] || "";
                const subservicesfields = subserviceList.split(","); //serviceProvider.sub_service_and_pricing.split(",").map((item: string) => item.trim());
                if(subservicesfields && subservicesfields.length && mainServiceId){
                  await Promise.all(subservicesfields.map(async (f: any) => {
                    const subservicesfields = f.split("-");
                    const service = subservicesfields[0] || "";
                    const description = subservicesfields[1] || 0;                    
                    const duration = subservicesfields[2] || 0;
                    const price = subservicesfields[3] || 0;
                    const stack = subservicesfields[4] || 0;
                    const obj = subServicesData.find((s: any) => s.service.toLowerCase() == service.toLowerCase() && s.main_service_id == mainServiceId && s.created_by == serviceProviderData.id);
                    if (obj && obj.id) {
                      const updateSubservice = await ServiceProviderSubServices.update({ service: service, created_by: serviceProviderData.id, status: 1, main_service_id: mainServiceId, duration: duration, description:description, price:price, stack:stack },{ where: {id: obj.id, created_by:serviceProviderData.id } });
                        subServices.push({ vet_profile_id: vetProfileId, "service-provider-sub-service_id": obj.id });
                        serviceData.push({ vet_profile_id: vetProfileId, service_id: obj.id, price });
                     
                    } else {
                      if(mainServiceId){
                        const subService: ServiceProviderSubServices = await ServiceProviderSubServices.create({ service : service, price: price, main_service_id: mainServiceId, description : description, duration : duration , stack : stack, status: 1 , created_by : serviceProviderData.id});
                       
                      }
                    }
                  }));
                }
              
              }));
             
              await VetProfileMainServices.bulkCreate(mainServices);
            }
            const mailOption = {
              to: serviceProvider.email || '',
              subject: config.common.createUser.mailSubject,
              data: {
                userName: `${serviceProvider.first_name} ${serviceProvider.last_name}`,
                email: serviceProvider.email || '',
                baseUrl,
                resetPasswordURL:
                  config.baseUrl +
                  config.resetPasswordUri +
                  resetPasswordToken,
                vetAppURL: config.vetAppURL
              }
            };

            try {
              await mailer
                .sendMail(mailOption, "new-user-create-template.ejs");
            } catch (mailError) {
              console.log('Error in sending mail', mailError)
            }
            return serviceProviderData;
          })
          .catch((error: Error) => {
            throw error;
          });
        return serviceProviderData;
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

  async updatePracticeAdministrator(userId:number, limit: number, offset: number, id: number) {
    const query = Number(limit) ? { limit, offset } : {};
    let obj = {};
    if(Number(id)) {
      obj = { id };
    }
    let data = await User.findAll({ 
      include:[
        { model: VetProfile, as: "VetProfileUser", required: false }
      ], 
      where: { 
        is_deleted: null,
        role: 4,
        ...obj,
        // [Op.or]: [
          //   { "$VetProfileUser.practice$": null }, 
          //   { "$VetProfileUser.practice$": "" } 
          // ]
        },
        ...query,
        order: [["id", "ASC"]],
    });
    // responseData = responseData.map((i:any) => i.toJSON());
    data = data.map((i: any) => i.toJSON());
    let ids:any = [];

    await Promise.all(data.map(async (user: any) => {
              ids.push(user.id);
    //   if (user && user.VetProfileUser && user.VetProfileUser.length) {
    //     if (user.VetProfileUser[0] && user.VetProfileUser[0].practice) {
    //       const practice = `${user.first_name}@vetpass4vets.com`;
    //       const is_exist = await VetPractices.findOne({ where: { id: user.VetProfileUser[0].practice }});
    //       // ids.user = user;
    //       // ids.is_exist = is_exist;
    //       if (!is_exist) {
    //           ids.push(user.id);
    //           const vetPracticeData = await VetPractices.findOne({ where: { is_deleted: null, email: practice }});
    //           if (vetPracticeData) {
    //             if (!user.address1 || !user.state) {
    //               await User.update({ address1: vetPracticeData?.address1, state: vetPracticeData?.state }, { where: { id: user.id } });
    //             }
    //             await VetProfile.update({
    //               practice: vetPracticeData && vetPracticeData.id || null,
    //             }, { where: { id: user.VetProfileUser[0].id } });
    //           }
              
    //         }
    //       // }
    //     }
    //   }
    }));
    return ids;
  }

  async getUserReportData1(limit: number, offset: number): Promise<User[] | null> {
    const query = Number(limit) ? { limit, offset } : {};
    let x = await User.findAll({
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "address1",
        "address2",
        "city",
        "zip_code",
        "int_code",
        "mobile",
        "country",
        "state",
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
        { 
          model: VetProfile,
          as: "VetProfileUser", 
          attributes: ["practice"],
          include: [
            {
              model: VetPractices,
              as: "practices",
              attributes: ["id","practice_name", "email"]
            }
          ]
        }
      ],
      where: { is_deleted: null, role: 4 },
      ...query,
      order: [["id", "ASC"]]
    });
    return x;
  }

  async getUserById(id: number): Promise<User | null> {

    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: id, related_type: 'users-permissions_user' },
      include: [{ model: UploadFile, as: 'UploadFile', attributes: ['url', 'id'] }]
    });

    return User.findOne({ include: [{ model: UsersPermissionsRole, as: "Role", attributes: ["name"] }], where: { id: id } })
      .then(async (user: any) => {
        if (uploadFileMorphData && uploadFileMorphData.UploadFile) {
          user.img_path = uploadFileMorphData.UploadFile.url;
        }
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
