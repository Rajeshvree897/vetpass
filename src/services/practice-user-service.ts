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
import FanPageFollowers from "../db/models/fan-page-followers";
import FanPagePosts from "../db/models/fan-page-posts";
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
    // const uploadFileMorphData: any = await UploadFileMorph.findOne({
    //   where: { related_id: id, related_type: 'users-permissions_user' },
    //   include: [{ model: UploadFile, as: 'UploadFile', attributes: ['url', 'id'] }]
    // });
    // if (uploadFileMorphData) {
    //   const getKey = uploadFileMorphData.UploadFile.url.split(`/${uploadPath}/`);
    //   await awsS3.deletePublicFileFromS3(`${uploadPath}/${getKey[1]}`);
    //   await UploadFileMorph.destroy({ where: { related_id: id, related_type: 'users-permissions_user' } });
    //   await UploadFile.destroy({ where: { id: uploadFileMorphData?.UploadFile?.id } });
    // }
    // const vetProfile = await VetProfile.findOne({ where: { user: id } });
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
        } catch(mailError) {
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


            console.log(userData);
            
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
                          //isSubServiceContainsOther = true;
                        }
                      }
                      // if(price && !isNaN(id)){
                      //   servicePrices.push({ price, service_id: id });
                      //   subServices.push({ vet_profile_id: vetProfileId, "service-provider-sub-service_id": id });
                      // }
                    }));
                    //await VetProfileSubServices.bulkCreate(subServices);
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
              await VetProfileMainServices.bulkCreate(mainServices);
            }

            // if (servicePrices && servicePrices.length) {
            //   servicePrices?.map((i: any) => {
            //     if (i && i.service_id && i.price) {
            //       servicedata.push({ vet_profile_id: vetProfileId, "service_id": i.service_id, price: i.price });
            //     }
            //   });
            //   await VetProfileServices.bulkCreate(servicedata);
            // }

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
              await this.createSlots(obj, slot, availabilitiesId, 'Tuesday', timeZone, roleName.name);
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
                            console.log("",subservice)
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

            // if (servicePrices && servicePrices.length) {
            //   servicePrices?.map((i: any) => {
            //     if (i && i.service_id && i.price) {
            //       servicedata.push({ vet_profile_id: vetProfile.id, "service_id": i.service_id, price: i.price });
            //     }
            //   });
            //   await VetProfileServices.bulkCreate(servicedata);
            // }
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
}
