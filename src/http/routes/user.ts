//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction, response } from "express";
import { Sequelize, Op } from "sequelize";
import {sequelize} from "../../db";
import moment from 'moment';
import mysqldump from 'mysqldump';
import fs from "fs";

import User from "../../db/models/user";
import { authRedirect } from "../middlewares/index";
import UsersPermissionsRole from "../../db/models/users-permissions-role";
import UsersService from "../../services/user-service";
import constants from "../../helpers/constants";
import CommonService from "../../services/common";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import { CustomError } from "../../services/error-service";
import config from "../../config";
import upload from "../../helpers/file-upload";
import VetProfile from "../../db/models/vet-profile";
import VetPractices from "../../db/models/vet-practices";
import UserFollowers from "../../db/models/user-followers";
import Country from "../../db/models/country";
import ReviewAndRatings from "../../db/models/user-review-and-ratings";
import StrapiAdministrator from "../../db/models/strapi-administrator";
import Device from "../../db/models/device";

export default (app: Router) => {
  app.get(
    "/users/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      usersService
        .getUserReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            ...i, 
            "Registration Date": moment(i.created_at).format("MM/DD/YYYY"),
            "Registration Time": moment(i.created_at).format("HH:mm:ss a"),
            "Country": i.countries && i.countries.country ? i.countries.country : '',
            "State/Postal/County": i.states && i.states.state ? i.states.state : '',
            "Type": i.Role? i.Role.name : "",
            "Public Email": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].public_email ? i.VetProfileUser[0].public_email : '',
            "Is Online Appointment": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].is_online_consultation ? i.VetProfileUser[0].is_online_consultation : '',
            "Online Appointment Price (inc tax)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].online_consultation ? i.VetProfileUser[0].online_consultation : '',
            "Public Contact Number Int Code": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].public_contact_no ? i.VetProfileUser[0].public_contact_no : '',
            "Public Contact Number": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].public_contact_no_int_code ? i.VetProfileUser[0].public_contact_no_int_code : '',
            "Public Out of Hours Int Code": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].public_out_of_hr_phone_int_code ? i.VetProfileUser[0].public_out_of_hr_phone_int_code : '',
            "Public Out of Hours Number": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].public_out_of_hr_phone ? i.VetProfileUser[0].public_out_of_hr_phone : '',
            "Education and Qualifications": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].education ? i.VetProfileUser[0].education : '',
            "Qualification Date (MM/YYYY or YYYY)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].created_at ? moment(i.VetProfileUser[0].created_at).format("MM/YYYY") : '',
            "Veterinary Registrations": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].vetprofilespecialities && i.VetProfileUser[0].vetprofilespecialities.specialities && i.VetProfileUser[0].vetprofilespecialities.specialities.name ? i.VetProfileUser[0].vetprofilespecialities.specialities.name : '',
            "Personal Summary (255 characters max)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].personal_bio ? i.VetProfileUser[0].personal_bio : '',
            "Registration Number": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].registration_number ? i.VetProfileUser[0].registration_number : '',
            "Is In Clinic Appointment": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].is_in_clinic_consultation ? i.VetProfileUser[0].is_in_clinic_consultation : '',
            "In Clinic Appointment Price (inc tax)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].in_clinic_consultation ? Math.round(i.VetProfileUser[0].in_clinic_consultation) : '',
            "Currency Type": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].currency_type ? i.VetProfileUser[0].currency_type : '',
            "Practice (or select a VETPASS group)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].practices && i.VetProfileUser[0].practices.practice_name ? i.VetProfileUser[0].practices.practice_name : '',
            "Specialization, Advanced Practitioner Date": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].passout_date ? i.VetProfileUser[0].passout_date : '',
            "Practitioner Liabilities": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].practitionerliabilities && i.VetProfileUser[0].practitionerliabilities.name ? i.VetProfileUser[0].practitionerliabilities.name : '',
            "Treats Categories": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].vetprofiletreatstypeanimal && i.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories && i.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories.category ? i.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories.category : '',
            "Specialization, Advanced Practitioner": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].vetprofilespecializations && i.VetProfileUser[0].vetprofilespecializations.specializations && i.VetProfileUser[0].vetprofilespecializations.specializations.name ? i.VetProfileUser[0].vetprofilespecializations.specializations.name : '',
            "Bank Name": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].bank_name ? i.VetProfileUser[0].bank_name : '',
            "Legal Name or First Name & Last Name": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_user_name ? i.VetProfileUser[0].b_user_name : '',
            "Email": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_user_email ? i.VetProfileUser[0].b_user_email : '',
            "Country (Bank Details)": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].countries && i.VetProfileUser[0].countries && i.VetProfileUser[0].countries.country ? i.VetProfileUser[0].countries.country : '',
            "Currency": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_currency ? i.VetProfileUser[0].b_currency : '',
            "Account Number": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_account_number ? i.VetProfileUser[0].b_account_number : '',
            "Bank Address": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_address ? i.VetProfileUser[0].b_address : '',
            "Sort Code": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_sort_code ? i.VetProfileUser[0].b_sort_code : '',
            "IBAN": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_iban ? i.VetProfileUser[0].b_iban : '',
            "NCC": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_ncc ? i.VetProfileUser[0].b_ncc : '',
            "SWIFTBIC": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].b_swiftbic ? i.VetProfileUser[0].b_swiftbic : '',
            "Name": i.animalProfile && i.animalProfile.name ? i.animalProfile.name : '',
            "Gender": i.animalProfile && i.animalProfile.gender ? i.animalProfile.gender : '',
            "Status": i.animalProfile && i.animalProfile.status ? i.animalProfile.status : '',
            "Date of Registration": i.animalProfile && i.animalProfile.created_at ? moment(i.created_at).format("MM/DD/YYYY") : '',
            "Time of Registration": i.animalProfile && i.animalProfile.created_at ? moment(i.created_at).format("HH:mm:ss a") : '',
            "Color": i.animalProfile && i.animalProfile.colour ? i.animalProfile.colour : '',
            "Date Of Birth": i.animalProfile && i.animalProfile.date_of_birth ? i.animalProfile.date_of_birth : '',
            "Height": i.animalProfile && i.animalProfile.height ? i.animalProfile.height : '',
            "Height Type": i.animalProfile && i.animalProfile.height_type ? i.animalProfile.height_type : '',
            "Weight": i.animalProfile && i.animalProfile.weight ? i.animalProfile.weight : '',
            "Weight Type": i.animalProfile && i.animalProfile.weight_type ? i.animalProfile.weight_type : '',
            "Spayed Neutered": i.animalProfile && i.animalProfile.spayed_neutered ? i.animalProfile.spayed_neutered : '',
            "Chip Details": i.animalProfile && i.animalProfile.chip_details ? i.animalProfile.chip_details : '',
            "Regd Breed Name": i.animalProfile && i.animalProfile.regd_breed_name ? i.animalProfile.regd_breed_name : '',
            "Breed Regd Number": i.animalProfile && i.animalProfile.breed_regd_number ? i.animalProfile.breed_regd_number : '',
            "Breeder": i.animalProfile && i.animalProfile.breeder ? i.animalProfile.breeder : '',
            "Sire Name": i.animalProfile && i.animalProfile.sire_name ? i.animalProfile.sire_name : '',
            "Sire Breed": i.animalProfile && i.animalProfile.sire_breed ? i.animalProfile.sire_breed : '',
            "Dam Name": i.animalProfile && i.animalProfile.dam_name ? i.animalProfile.dam_name : '',
            "Dam Breed": i.animalProfile && i.animalProfile.dam_breed ? i.animalProfile.dam_breed : '',
            "Breed Reference": i.animalProfile && i.animalProfile.breed_reference ? i.animalProfile.breed_reference : '',
            "Other 123": i.animalProfile && i.animalProfile.other ? i.animalProfile.other : '',
            "Other Information": i.animalProfile && i.animalProfile.other_information ? i.animalProfile.other_information : '',
            "Animal Type": i.animalProfile && i.animalProfile.AnimalType && i.animalProfile.AnimalType.type ? i.animalProfile.AnimalType.type : '',
            "Breed": i.animalProfile && i.animalProfile.Breed && i.animalProfile.Breed.name ? i.animalProfile.Breed.name : '',
            "Animal Owner": i.animalProfile && i.animalProfile.User && i.animalProfile.User.first_name && i.animalProfile.User.last_name ? i.animalProfile.User.first_name + ' ' + i.animalProfile.User.last_name : '',
            "Select Chip/Registration/Ear No Companies": i.animalProfile && i.animalProfile.Chip && i.animalProfile.Chip.name ? i.animalProfile.Chip.name : '',
            "Approximate Insurance Renewal Date": i.animalProfile && i.animalProfile.InsuranceRenewalDate ? i.animalProfile.InsuranceRenewalDate : '',
            "Would you like annual insurance updates and proposals?": i.animalProfile && i.animalProfile.wantContact ? i.animalProfile.wantContact : '',
            "Allergies": i.animalProfile && i.animalProfile.allergies ? i.animalProfile.allergies : '',
            "Medications": i.animalProfile && i.animalProfile.medications ? i.animalProfile.medications : '',
            "Insurance": i.animalProfile && i.animalProfile.insurance ? i.animalProfile.insurance : '',
            "Insurer": i.animalProfile && i.animalProfile.insurer && i.animalProfile.insurer.name ? i.animalProfile.insurer.name : '',
            "Service Provider Liabilities": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].serviceProviderliabilities && i.VetProfileUser[0].serviceProviderliabilities.name ? i.VetProfileUser[0].serviceProviderliabilities.name : '',
          }));
          responseData = responseData.map((i:any) => {
            delete i.Role;
            delete i.created_at;
            delete i.animalProfile;
            delete i.countries,
            delete i.states,
            delete i.VetProfileUser
            return i; 
          });
          return res.xls('data.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get("/users", authRedirect(true), (req: Request, res: Response) => {
    res.render("users/index.ejs", {
      title: "User list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.post("/userSearch", authRedirect(true), async (req: Request, res: Response) => {
    let whereObj:any = {};
    // whereObj[Op.or] = [
    //   { email: { [Op.like]: `%${req.body.search}%` } },
    //   { int_code: { [Op.like]: `%${req.body.search}%` } }]
      whereObj.is_deleted = null;
      whereObj.email = { [Op.like]: `%${req.body.search}%` };
      const result = await User.findAll({ raw:true, where: whereObj, attributes: ['id', 'first_name', 'last_name', 'email'] });
      console.log(result);
      return res.json({ data: result });
  });

  app.post("/createOrUpdateDeviceToken", authRedirect(true), async (req: Request, res: Response) => {
    const userId =  req.session && req.session.user && req.session.user.id ? req.session.user.id : null;
    const result = await Device.create(req.body);
    const devices = await Device.findAll({
      raw: true,
      where: { user: userId }
    });
    const deviceTokens = devices && devices.length ? devices.map(i => i.device_token) : [];
    if (req.session && req.session.user) {
      req.session.user.deviceTokens = deviceTokens;
    }
    return res.json({ response: result });
  });

  app.post("/checkUserEmail", authRedirect(true), async (req: Request, res: Response) => {
    let result;
    const whereObj:any = { email: req.body.email, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    result = await User.count({ where: whereObj });
    return res.json({response: result});
  });

  app.post("/checkAdminUserEmail", authRedirect(true), async (req: Request, res: Response) => {
    let result;
    const whereObj: any = { email: req.body.email };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    result = await StrapiAdministrator.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get('/user', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    if(req.query["dataAnimalType"]) {
      return res.json(await commonService.getBreeds(req.query["dataAnimalType"]));
    }
    if(req.query["country"]) {
      return res.json(await commonService.getStates(req.query["country"]));
    }
    return res.render('users/user.ejs', {
      title: constants.PAGE_TITLE.USER_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      roleData: await commonService.getRoles(),
      countryData: await commonService.getCountries(),
      currencyTypeData: commonService.getCurrencyType(),
      practiceData: await commonService.getPractices(),
      serviceProviderMainServices: await commonService.getServiceProviderMainServices(),
      UserserviceProviderSubServices: await commonService.getUserServiceProviderSubServices(null),
      // serviceProviderSubServices: await commonService.getServiceProviderSubMainServices(),
      animalTypes: await commonService.getAnimalCategories(),
      specializations: await commonService.getSpecializations(),
      speciality: await commonService.getSpecialities(),
      practitionerLiabilities: await commonService.getPractitionerLiabilities(),
      serviceProviderLiabilities: await commonService.getServiceProviderLiabilities(),
      dataAnimalTypes: await commonService.getAnimalTypes(),
      interestedSpecializations: await commonService.getSpecializations(),
      interestedAnimalTypes: await commonService.getAnimalTypes(),
      groomersService: await commonService.getGroomersService(),
      walkersService: await commonService.getWalkersService(),
      therapistsService: await commonService.getTherapistsService(),
      nutritionistsService: await commonService.getNutritionistsService(),
      breedersService: await commonService.getBreedersService(),
      serviceDurations : await commonService.getServiceDurations()
    });
  });

  const escapeString = (input: string): string => {
    if(input) {
        return input.replace(/[!@#$%^&*()+=\-[\]\\';,./{}|":<>?~_]/g, '\\$&');
    }
    return input;
  };

  app.get('/practices',
    celebrate({
      query: Joi.object({
        limit: Joi.number().max(20).min(1).optional()
          .error(new CustomError(`"limit" parameter is invalid`)),
        option: Joi.any().optional()
        .error(new CustomError(`"option" parameter is invalid`)),
        id: Joi.any().optional(),
        page: Joi.number().min(1).optional()
          .error(new CustomError(`"page" parameter is invalid`)),
        term: Joi.string().optional()
          .error(new CustomError(`"term" parameter is invalid`)),
        includeDeleted: Joi.boolean().valid([true, false]).optional()
          .error(new CustomError(`"includeDeleted" parameter is invalid`)),
      }),
    }, {
      allowUnknown: true
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit || 20);
    const page = parseInt(req.query.page || 1);
    const offset = (page - 1) * limit;
    const searchTerm = req.query.term ? escapeString(req.query.term) : null;
    const includeDeleted = (req.query.includeDeleted && req.query.includeDeleted == 'true')

    const usersService = new UsersService();
    usersService
      .getPracticeList(searchTerm, offset, limit, includeDeleted, req.query.option, req.query.id)
      .then((results) => {
        return res.json({ results });
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.post('/sub-services',
    celebrate({
      query: Joi.object({
        limit: Joi.number().max(20).min(1).optional()
          .error(new CustomError(`"limit" parameter is invalid`)),
        data: Joi.object().optional(),
        page: Joi.number().min(1).optional()
          .error(new CustomError(`"page" parameter is invalid`)),
        term: Joi.string().optional()
          .error(new CustomError(`"term" parameter is invalid`)),
        // includeDeleted: Joi.boolean().valid([true, false]).optional()
        //   .error(new CustomError(`"includeDeleted" parameter is invalid`)),
      }),
    }, {
      allowUnknown: true
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const limit = parseInt(req.query.limit || 20);
      const page = parseInt(req.query.page || 1);
      const offset = (page - 1) * limit;
      const searchTerm = req.query.term ? escapeString(req.query.term) : null;
      const includeDeleted = (req.query.includeDeleted && req.query.includeDeleted == 'true')
      const ids = req.body.ids || [];
      const usersService = new UsersService();
      usersService
        .getSubServiceList(searchTerm, offset, limit, ids)
        .then((results) => {
          return res.json({ results });
        })
        .catch((error: Error) => {
          return next(error);
        });
  })

  app.get("/user/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj:any = {};
    if(req.session && req.session.user && req.session.user.roleName && req.session.user.roleName === config.common.role.vet_practice_admin_role_name){
      whereObj = { created_by: req.session.user.id };
    }
    let order:any[] = [];
    if(req.query && req.query.search && req.query.search.value !== '') {
      whereObj[Op.or] = [
        { first_name: { [Op.like]: `%${req.query.search.value}%` } },
        { last_name: { [Op.like]: `%${req.query.search.value}%` } },
        { email: { [Op.like]: `%${req.query.search.value}%` } },
        { address1: { [Op.like]: `%${req.query.search.value}%` } },
        { address2: { [Op.like]: `%${req.query.search.value}%` } },
        { "$countries.country$": { [Op.like]: `%${req.query.search.value}%` } },
        { zip_code: { [Op.like]: `%${req.query.search.value}%` } },
        { "$Role.name$": { [Op.like]: `%${req.query.search.value}%` } },
        { "$VetProfileUser.practices.practice_name$": { [Op.like]: `%${req.query.search.value}%` } }
      ];
      delete req.query.search;
    }
    if(req.query && req.query.order && req.query.order[0].column === '9') {
      order = [ [ Sequelize.literal('`Role`.`name`'), req.query.order[0].dir ] ];
      delete req.query.order;
    }
    if(req.query && req.query.order && req.query.order[0].column === '10') {
      order = [ [ Sequelize.literal('`VetProfileUser->practices`.`practice_name`'), req.query.order[0].dir ] ];
      delete req.query.order;
    }
    if(req.query && req.query.order && req.query.order[0].column === '6') {
      order = [ [ Sequelize.literal('`countries`.`country`'), req.query.order[0].dir ] ];
      delete req.query.order;
    }
    whereObj.is_deleted = null;
    datatable(User, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "email",
        "first_name",
        "last_name",
        "address1",
        "address2",
        "country",
        "zip_code",
        "blocked",
        "confirmed",
        "created_at"
      ],
      include: [
        {
          model: Country,
          as: "countries",
          attributes: ["country", "id"]
        },
        { model: VetProfile, as: "VetProfileUser",
        include: [
          { model: VetPractices, as: "practices", attributes: ["practice_name"], },
        ]
      },
      { model: UsersPermissionsRole, as: "Role", attributes: ["name"] },
      ],
      where : whereObj,
      order
    }).then((result: any) => {
      if (result && result.data) {
        for (let i = 0; i < result.data.length; i += 1) {
          result.data[i].practice_name = result.data[i].VetProfileUser[0] && result.data[i].VetProfileUser[0].practices && result.data[i].VetProfileUser[0].practices.practice_name || "";
          result.data[i].role = result.data[i].Role && result.data[i].Role.name || "";
          result.data[i].country = result.data[i].countries && result.data[i].countries.country || "";
        }
      }
      res.json(result);
    });
  });

  app.get("/users/:id/delete", authRedirect(true), (req: Request, res: Response, next: NextFunction) => {
    const usersService = new UsersService();
    usersService
      .deleteUser(+req.params.id)
      .then(() => {
        req.flash(
          "success",
          "User deleted successfully.",
          req,
          res
        );
        res.redirect("/admin/users");
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.post(
    '/users',
    multer().single('userImage'),
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .error(new CustomError("Email is required")),
        first_name: Joi.string()
          .required().max(255)
          .error(new CustomError("First name is required")),
        last_name: Joi.string()
          .required().max(255)
          .error(new CustomError("Last name is required")),
        mobile: Joi.optional(),
        confirmed: Joi.optional(),
        blocked: Joi.optional(),
        dob: Joi.string().allow('', null).optional(),
        passout_date: Joi.string().allow('', null).optional(),
        practitioner_liability: Joi.string().allow('', null).optional(),
        service_provider_liability: Joi.string().allow('', null).optional(),
        address1: Joi.string().allow('', null).max(255).optional()
          .error(new CustomError("Address1 must be between 255 digits")),
        address2: Joi.string().allow('', null).max(255).optional()
          .error(new CustomError("Address2 must be between 255 digits")),
        city: Joi.string().allow('', null).max(255).optional(),
        zip_code: Joi.string().allow('', null).max(10)
        .error(new CustomError("Zip code should not more than 10 digits")),
        role: Joi.string().allow('', null).optional(),
        country: Joi.number().allow('', null).optional(),
        state: Joi.number().allow('', null).optional(),
        dataAnimalType: Joi.optional(),
        breed: Joi.optional(),
        int_code: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
        education: Joi.string().allow('', null).max(255).optional()
          .error(new CustomError("Education must be between 255 digits")),
        educationDuration: Joi.string().allow('', null).max(255).optional()
          .error(new CustomError("Education duration must be between 255 digits")),
        speciality: Joi.string().allow('', null).optional(),
        personal_bio: Joi.string().allow('', null).max(500).optional()
          .error(new CustomError("Personal bio must be between 255 digits")),
        registration_number: Joi.string().allow('', null).optional()
          .error(new CustomError("Registration number must be between 255 digits")),
        in_clinic_consultation: Joi.number().allow('', null).optional(),
        online_consultation: Joi.number().allow('', null).optional(),
        is_in_clinic_consultation: Joi.number().allow('', null).optional(),
        is_online_consultation: Joi.number().allow('', null).optional(),
        currency_type: Joi.string().allow('', null).optional(),
        practice: Joi.string().allow('', null).optional(),
        practiceId: Joi.optional(),
        type: Joi.string().allow('', null).optional(),
        weekDay: Joi.optional(),
        monday: Joi.optional(),
        tuesday: Joi.optional(),
        wednesday: Joi.optional(),
        thursday: Joi.optional(),
        friday: Joi.optional(),
        saturday: Joi.optional(),
        sunday: Joi.optional(),
        specialization: Joi.string().allow('', null).optional(),
        public_email: Joi.string().allow('', null).optional(),
        public_contact_no: Joi.string().allow('', null).optional(),
        public_out_of_hr_phone: Joi.string().allow('', null).optional(),
        public_contact_no_int_code: Joi.string().allow('', null).optional(),
        public_out_of_hr_phone_int_code: Joi.string().allow('', null).optional(),
        b_user_name: Joi.string()
          .allow('', null).optional().max(255),
        b_user_email: Joi.string()
          .allow('', null).optional().max(255),
        b_country: Joi.string()
          .allow('', null).optional().max(255),
        b_currency: Joi.string()
          .allow('', null).optional().max(255),
        b_account_number: Joi.string()
          .allow('', null).optional().max(255),
        b_iban: Joi.string()
          .allow('', null).optional().max(255),
        b_ncc: Joi.string()
          .allow('', null).optional().max(255),
        b_sort_code: Joi.string()
          .allow('', null).optional().max(255),
        b_swiftbic: Joi.string()
          .allow('', null).optional().max(255),
        bank_name: Joi.string()
          .allow('', null).optional().max(255),
        b_address: Joi.string()
          .allow('', null).optional().max(255),
        interestedSpecialization: Joi.optional(),
        interestedAnimalType: Joi.optional(),
        dataAnimalTypeId: Joi.optional(),
        breedId: Joi.optional(),
        groomersServiceId: Joi.optional(),
        groomerService: Joi.optional(),
        walkersServiceId: Joi.optional(),
        walkerService: Joi.optional(),
        therapistsServiceId: Joi.optional(),
        therapistService: Joi.optional(),
        nutritionistsServiceId: Joi.optional(),
        nutritionistService: Joi.optional(),
        breedersServiceId: Joi.optional(),
        breederService: Joi.optional(),
        price: Joi.optional(),
        serviceProviderServices: Joi.optional(),
        serviceProviderSubServices: Joi.optional(),
        subServiceDescription: Joi.optional(),
        duration: Joi.optional(),
        description: Joi.optional(),
        appointment: Joi.optional(),
        latitude: Joi.optional(),
        longitude: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      usersService
        .addUser(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            'success',
            `User is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/users');
        })
        .catch(async (error: Error) => {
          if(error.message === 'Email already exist') {
            const commonService = new CommonService();
            req.flash('error', error.message, req, res);
            return res.render('users/user.ejs', {
              title: constants.PAGE_TITLE.USER_ADD,
              responseData: req.body,
              userData: req.session && req.session.user ? req.session.user : null,
              roleData: await commonService.getRoles(),
              countryData: await commonService.getCountries(),
              states: await commonService.getStates(),
              currencyTypeData: commonService.getCurrencyType(),
              practiceData: await commonService.getPractices(),
              animalTypes: await commonService.getAnimalCategories(),
              interestedSpecializations: await commonService.getSpecializations(),
              interestedAnimalTypes: await commonService.getAnimalTypes()
            });
          }
          return next(error);
        });
    }
  );

  app.get(
    "/users/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const usersService = new UsersService();
      usersService
        .getUser(+req.params.id, req.session?.user.timeZone)
        .then(async (responseData: any) => {
          let animalTypes:any = await commonService.getAnimalTypes();
          let practitionerLiabilities: any =  responseData.vetProfile == null ? null : responseData.vetProfile.practitioner_liability;
          let serviceProviderLiabilities: any =  responseData.vetProfile == null ? null : responseData.vetProfile.service_provider_liability;
          let practitionePractice: any =  responseData.vetProfile == null ? null : responseData.vetProfile.practice;
          res.render("users/user.ejs", {
            moment,
            title: constants.PAGE_TITLE.USER_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            roleData: await commonService.getRoles(),
            countryData: await commonService.getCountries(responseData.country, true),
            states: await commonService.getStates(responseData.country, responseData.state, true),
            currencyTypeData: commonService.getCurrencyType(),
            practiceData: await commonService.getPractices(practitionePractice, true),
            animalTypes: await commonService.getAnimalCategories(),
            specializations: await commonService.getSpecializations(responseData.specializationsIdArray, true),
            speciality: await commonService.getSpecialities(responseData.specialitiesIdArray, true),
            vetProfileData: responseData.vetProfile,
            practitionerLiabilities: await commonService.getPractitionerLiabilities(practitionerLiabilities, true),
            serviceProviderLiabilities: await commonService.getServiceProviderLiabilities(serviceProviderLiabilities, true),
            dataAnimalTypes: animalTypes,
            interestedSpecializations: await commonService.getSpecializations(responseData.inSpecializationsIdArray, true),
            interestedAnimalTypes: animalTypes,
            serviceProviderMainServices: await commonService.getServiceProviderMainServices(),
            UserserviceProviderSubServices: await commonService.getUserServiceProviderSubServices(responseData.subServices),
            groomersService: await commonService.getGroomersService(),
            walkersService: await commonService.getWalkersService(),
            therapistsService: await commonService.getTherapistsService(),
            nutritionistsService: await commonService.getNutritionistsService(),
            breedersService: await commonService.getBreedersService(),
            serviceDurations : await commonService.getServiceDurations()

          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/users/update",
    multer().single('userImage'),
    celebrate({
      body: Joi.object({
        email: Joi.string()
        .required()
        .error(new CustomError("Email is required")),
      first_name: Joi.string()
        .required().max(255)
        .error(new CustomError("First name is required")),
      last_name: Joi.string()
        .required().max(255)
        .error(new CustomError("Last name is required")),
      mobile: Joi.optional(),
      confirmed: Joi.optional(),
      blocked: Joi.optional(),
      dob: Joi.string().allow('', null).optional(),
      passout_date: Joi.string().allow('', null).optional(),
      practitioner_liability: Joi.string().allow('', null).optional(),
      service_provider_liability: Joi.string().allow('', null).optional(),
      address1: Joi.string().allow('', null).max(255).optional()
        .error(new CustomError("Address1 must be between 255 digits")),
      address2: Joi.string().allow('', null).max(255).optional()
        .error(new CustomError("Address2 must be between 255 digits")),
      city: Joi.string().allow('', null).max(255).optional(),
      zip_code: Joi.string().allow('', null).max(10)
        .error(new CustomError("Zip code should not more than 10 digits")),
      role: Joi.string().allow('', null).optional(),
      country: Joi.number().allow('', null).optional(),
      state: Joi.number().allow('', null).optional(),
      dataAnimalType: Joi.optional(),
      breed: Joi.optional(),
      int_code: Joi.string().allow('', null).optional(),
      id: Joi.optional(),
      education: Joi.string().allow('', null).max(255).optional()
        .error(new CustomError("Education must be between 255 digits")),
      educationDuration: Joi.string().allow('', null).max(255).optional()
        .error(new CustomError("Education duration must be between 255 digits")),
      speciality: Joi.string().allow('', null).optional(),
      personal_bio: Joi.string().allow('', null).max(500).optional()
        .error(new CustomError("Personal bio must be between 255 digits")),
      registration_number: Joi.string().allow('', null).optional()
        .error(new CustomError("Registration number must be between 255 digits")),
      in_clinic_consultation: Joi.number().allow('', null).optional(),
      online_consultation: Joi.number().allow('', null).optional(),
      is_in_clinic_consultation: Joi.number().allow('', null).optional(),
      is_online_consultation: Joi.number().allow('', null).optional(),
      currency_type: Joi.string().allow('', null).optional(),
      practice: Joi.string().allow('', null).optional(),
      practiceId: Joi.optional(),
      type: Joi.string().allow('', null).optional(),
      weekDay: Joi.optional(),
      monday: Joi.optional(),
      tuesday: Joi.optional(),
      wednesday: Joi.optional(),
      thursday: Joi.optional(),
      friday: Joi.optional(),
      saturday: Joi.optional(),
      sunday: Joi.optional(),
      specialization: Joi.string().allow('', null).optional(),
      public_email: Joi.string().allow('', null).optional(),
      public_contact_no: Joi.string().allow('', null).optional(),
      public_out_of_hr_phone: Joi.string().allow('', null).optional(),
      public_contact_no_int_code: Joi.string().allow('', null).optional(),
      public_out_of_hr_phone_int_code: Joi.string().allow('', null).optional(),
      b_user_name: Joi.string()
        .allow('', null).optional().max(255),
      b_user_email: Joi.string()
        .allow('', null).optional().max(255),
      b_country: Joi.string()
        .allow('', null).optional().max(255),
      b_currency: Joi.string()
        .allow('', null).optional().max(255),
      b_account_number: Joi.string()
        .allow('', null).optional().max(255),
      b_iban: Joi.string()
        .allow('', null).optional().max(255),
      b_ncc: Joi.string()
        .allow('', null).optional().max(255),
      b_sort_code: Joi.string()
        .allow('', null).optional().max(255),
      b_swiftbic: Joi.string()
        .allow('', null).optional().max(255),
      bank_name: Joi.string()
        .allow('', null).optional().max(255),
      b_address: Joi.string()
        .allow('', null).optional().max(255),
      unavailabilitiesList_length: Joi.optional(),
      interestedSpecialization: Joi.optional(),
      interestedAnimalType: Joi.optional(),
      dataAnimalTypeId: Joi.optional(),
      breedId: Joi.optional(),
      groomersServiceId: Joi.optional(),
      groomerService: Joi.optional(),
      walkersServiceId: Joi.optional(),
      walkerService: Joi.optional(),
      therapistsServiceId: Joi.optional(),
      therapistService: Joi.optional(),
      nutritionistsServiceId: Joi.optional(),
      nutritionistService: Joi.optional(),
      breedersServiceId: Joi.optional(),
      breederService: Joi.optional(),
      price: Joi.optional(),
      serviceProviderServices: Joi.optional(),
      serviceProviderSubServices: Joi.optional(),
      subServiceDuration: Joi.optional(),
      duration: Joi.optional(),
      description: Joi.optional(),
      appointment: Joi.optional(),
      latitude: Joi.optional(),
      longitude: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      usersService
        .updateUser(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `User is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/users")
        })
        .catch(async (error: Error) => {
          if(error.message === 'Email already exist') {
            const commonService = new CommonService();
            req.flash('error', error.message, req, res);
            return res.render('users/user.ejs', {
              title: constants.PAGE_TITLE.USER_EDIT,
              responseData: req.body,
              userData: req.session && req.session.user ? req.session.user : null,
              roleData: await commonService.getRoles(),
              countryData: await commonService.getCountries(),
              states: await commonService.getStates(req.body.country),
              currencyTypeData: commonService.getCurrencyType(),
              practiceData: await commonService.getPractices(),
              animalTypes: await commonService.getAnimalCategories(),
              interestedSpecializations: await commonService.getSpecializations(),
              interestedAnimalTypes: await commonService.getAnimalTypes()
            });
          }
          return next(error)
        })
    }
  )

  app.post(
    "/importVetUser",
    authRedirect(true),
    upload.single('VetUserFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      usersService
        .importVetUser(req.file, req.session?.user.id, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `Vet Users are added successfully.`,
            req,
            res
          )
          res.json({status:true})
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
        })
    }
  )

  app.post(
    "/importServiceProvider",
    authRedirect(true),
    upload.single('ServiceProviderFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      usersService
        .importServiceProvider(req.file, req.session?.user.id, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `Service Provider are added successfully.`,
            req,
            res
          )
          res.json({status:true})
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
        })
    }
  )

  app.get("/user/:id/followers/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj: any = {};
    whereObj = { following_user_id: req.params.id, is_deleted: null }
    datatable(UserFollowers, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "follower_user_id",
        "following_user_id",
        "created_at"
      ],
      include: [
        {
          model: User,
          as: "Follower",
          required: true,
          attributes: ['id', 'email', "first_name", 'last_name']
        }
      ],
      where: whereObj
    }).then((result: any) => {
      res.json(result);
    });
  });

  app.get("/user/:id/ratings/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj: any = {};
    whereObj = { service_provider_id: req.params.id }
    datatable(ReviewAndRatings, req.query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "user_id",
        "service_provider_id",
        "review",
        "rating",
        "created_at"
      ],
      include: [
        {
          model: User,
          as: "User",
          required: true,
          attributes: ['id', 'email', "first_name", 'last_name']
        }
      ],
      where: whereObj
    }).then((result: any) => {
      res.json(result);
    });
  });

  app.get("/user/backupDB", authRedirect(true), async (req: Request, res: Response) => {
    await mysqldump({
      connection: {
          host: 'vetpass-staging.cqemspcq0wzh.eu-west-2.rds.amazonaws.com',
          user: 'admin',
          password: 'miMJacSrxgoZT8UxmHQL',
          database: 'vetpass-staging',
      },
      dumpToFile: './public/assets/dbBackup/dump.sql',
    });
    return res.json({success: "true"});
  });

  app.get("/user/remove-backupDB", authRedirect(true), async (req: Request, res: Response) => {
    await fs.unlinkSync('./public/assets/dbBackup/dump.sql');
    return res.json({success: "true"});
  });

  app.get("/user/updateCollation", authRedirect(true), async (req: Request, res: Response) => {
    await sequelize.query(
      "ALTER TABLE `availabilities` CHANGE COLUMN `day` `day` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `user_id`;"
    );
    await sequelize.query(
      "ALTER TABLE `animal_profiles` CHANGE COLUMN `gender` `gender` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `breed`, CHANGE COLUMN `colour` `colour` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `gender`, CHANGE COLUMN `name` `name` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `user`, CHANGE COLUMN `spayed_neutered` `spayed_neutered` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `name`, CHANGE COLUMN `height_type` `height_type` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `height`, CHANGE COLUMN `weight_type` `weight_type` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `weight`, CHANGE COLUMN `chip_details` `chip_details` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `date_of_birth`, CHANGE COLUMN `status` `status` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `chip_details`, CHANGE COLUMN `regd_breed_name` `regd_breed_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `status`, CHANGE COLUMN `breed_regd_number` `breed_regd_number` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `regd_breed_name`, CHANGE COLUMN `breeder` `breeder` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `breed_regd_number`, CHANGE COLUMN `sire_name` `sire_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `breeder`, CHANGE COLUMN `sire_breed` `sire_breed` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `sire_name`, CHANGE COLUMN `dam_name` `dam_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `sire_breed`, CHANGE COLUMN `dam_breed` `dam_breed` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `dam_name`, CHANGE COLUMN `breed_reference` `breed_reference` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `dam_breed`, CHANGE COLUMN `other` `other` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `breed_reference`, CHANGE COLUMN `other_information` `other_information` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `other`, CHANGE COLUMN `insurance` `insurance` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `other_information`, CHANGE COLUMN `wantContact` `wantContact` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `InsuranceRenewalDate`, CHANGE COLUMN `allergies` `allergies` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `chip`, CHANGE COLUMN `medications` `medications` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `allergies`;"
    );
    await sequelize.query(
      "ALTER TABLE `chip_lists` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `classifications` CHANGE COLUMN `title` `title` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `description` `description` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `title`;"
    );
    await sequelize.query(
      "ALTER TABLE `country_drop_downs` CHANGE COLUMN `country` `country` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `iso_code` `iso_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `country`, CHANGE COLUMN `country_code` `country_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `iso_code`, CHANGE COLUMN `code` `code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `updated_at`, CHANGE COLUMN `base64_url` `base64_url` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `sort_id`;"
    );
    await sequelize.query(
      "ALTER TABLE `first_aid_advices` CHANGE COLUMN `question` `question` LONGTEXT NOT NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `answer` `answer` LONGTEXT NOT NULL COLLATE 'utf8_general_ci' AFTER `question`;"
    );
    await sequelize.query(
      "ALTER TABLE `forums` CHANGE COLUMN `description` `description` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `category` `category` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `description`, CHANGE COLUMN `question` `question` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `updated_at`, CHANGE COLUMN `privacy` `privacy` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `is_admin`;"
    );
    await sequelize.query(
      "ALTER TABLE `nutrition_advices` CHANGE COLUMN `question` `question` LONGTEXT NOT NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `answer` `answer` LONGTEXT NOT NULL COLLATE 'utf8_general_ci' AFTER `question`;"
    );
    await sequelize.query(
      "ALTER TABLE `insurer_lists` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `practice_services` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `practitioner_liabilities` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `report_reasons` CHANGE COLUMN `reason` `reason` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `specialities` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `specializations` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `state_drop_downs` CHANGE COLUMN `state` `state` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `symptoms_how_long_drop_downs` CHANGE COLUMN `name` `name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`;"
    );
    await sequelize.query(
      "ALTER TABLE `vet_practices` CHANGE COLUMN `practice_name` `practice_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `address1` `address1` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `practice_name`, CHANGE COLUMN `address2` `address2` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `address1`, CHANGE COLUMN `city` `city` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `state`, CHANGE COLUMN `zip_code` `zip_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `city`, CHANGE COLUMN `int_code` `int_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `zip_code`, CHANGE COLUMN `business_phone` `business_phone` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `int_code`, CHANGE COLUMN `out_of_hr_phone` `out_of_hr_phone` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `business_phone`, CHANGE COLUMN `email` `email` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `out_of_hr_phone`, CHANGE COLUMN `website` `website` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `email`, CHANGE COLUMN `speciality` `speciality` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `website`, CHANGE COLUMN `monday_from` `monday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `speciality`, CHANGE COLUMN `monday_to` `monday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `monday_from`, CHANGE COLUMN `tuesday_from` `tuesday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `monday_to`, CHANGE COLUMN `tuesday_to` `tuesday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `tuesday_from`, CHANGE COLUMN `wednesday_from` `wednesday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `tuesday_to`, CHANGE COLUMN `wednesday_to` `wednesday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `wednesday_from`, CHANGE COLUMN `thursday_from` `thursday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `wednesday_to`, CHANGE COLUMN `thursday_to` `thursday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `thursday_from`, CHANGE COLUMN `friday_from` `friday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `thursday_to`, CHANGE COLUMN `friday_to` `friday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `friday_from`, CHANGE COLUMN `saturday_from` `saturday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `friday_to`, CHANGE COLUMN `saturday_to` `saturday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `saturday_from`, CHANGE COLUMN `sunday_from` `sunday_from` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `saturday_to`, CHANGE COLUMN `sunday_to` `sunday_to` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `sunday_from`, CHANGE COLUMN `practice_accreditation_no` `practice_accreditation_no` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `sunday_to`, CHANGE COLUMN `other` `other` LONGTEXT NULL COLLATE 'utf8_general_ci' AFTER `practice_accreditation_no`, CHANGE COLUMN `img_path` `img_path` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `other`, CHANGE COLUMN `location` `location` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `img_path`, CHANGE COLUMN `public_email` `public_email` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `updated_at`, CHANGE COLUMN `flag` `flag` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `public_email`;"
    );
    await sequelize.query(
      "ALTER TABLE `users-permissions_user` CHANGE COLUMN `email` `email` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `password` `password` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `email`, CHANGE COLUMN `provider` `provider` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `password`, CHANGE COLUMN `resetPasswordToken` `resetPasswordToken` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `provider`, CHANGE COLUMN `first_name` `first_name` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `role`, CHANGE COLUMN `last_name` `last_name` VARCHAR(255) NOT NULL COLLATE 'utf8_general_ci' AFTER `first_name`, CHANGE COLUMN `mobile` `mobile` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `dob`, CHANGE COLUMN `address1` `address1` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `mobile`, CHANGE COLUMN `address2` `address2` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `address1`, CHANGE COLUMN `city` `city` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `state`, CHANGE COLUMN `zip_code` `zip_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `city`, CHANGE COLUMN `timeZone` `timeZone` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `int_code`, CHANGE COLUMN `confirmationToken` `confirmationToken` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `updated_at`, CHANGE COLUMN `search_string` `search_string` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `confirmationToken`;"
    );
    await sequelize.query(
      "ALTER TABLE `vet_profile` CHANGE COLUMN `education` `education` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `id`, CHANGE COLUMN `speciality` `speciality` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `education`, CHANGE COLUMN `personal_bio` `personal_bio` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `speciality`, CHANGE COLUMN `registration_number` `registration_number` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `personal_bio`, CHANGE COLUMN `currency_type` `currency_type` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `user`, CHANGE COLUMN `public_email` `public_email` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `updated_at`, CHANGE COLUMN `public_contact_no` `public_contact_no` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `public_email`, CHANGE COLUMN `public_out_of_hr_phone` `public_out_of_hr_phone` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `public_contact_no`, CHANGE COLUMN `b_user_name` `b_user_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `practitioner_liability`, CHANGE COLUMN `b_user_email` `b_user_email` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_user_name`, CHANGE COLUMN `b_currency` `b_currency` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_country`, CHANGE COLUMN `b_account_number` `b_account_number` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_currency`, CHANGE COLUMN `b_iban` `b_iban` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_account_number`, CHANGE COLUMN `b_ncc` `b_ncc` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_iban`, CHANGE COLUMN `b_sort_code` `b_sort_code` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_ncc`, CHANGE COLUMN `b_swiftbic` `b_swiftbic` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_sort_code`, CHANGE COLUMN `bank_name` `bank_name` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `b_swiftbic`, CHANGE COLUMN `b_address` `b_address` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `bank_name`, CHANGE COLUMN `educationDuration` `educationDuration` VARCHAR(255) NULL COLLATE 'utf8_general_ci' AFTER `is_online_consultation`;"
    );
    return res.json({success: "true"});
  });

  app.get(
    "/userAdministratorCount",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      const limit = Number(req.param("limit"));
      const offset = Number(req.param("offset"));
      const id = Number(req.param("id"));
      usersService
        .updatePracticeAdministrator(req.session?.user.id, limit, offset, id)
        .then((count) => {
          return res.json({ success: "true", count });
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
        })
    }
  )

  app.get(
    "/userAdministrators",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const usersService = new UsersService();
      const limit = Number(req.param("limit"));
      const offset = Number(req.param("offset"));
      usersService
        .getUserReportData1(limit, offset)
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "id": i.id,
            "email": i.email,
            "first_name": i.first_name,
            "last_name": i.last_name,
            "address1": i.address1,
            "address2": i.address2,
            "city": i.city,
            "zip_code": i.zip_code,
            "int_code": i.intCode && i.intCode.country ? i.intCode.country : '',
            "mobile": i.mobile,
            "Country": i.countries && i.countries.country ? i.countries.country : '',
            "State/Postal/County": i.states && i.states.state ? i.states.state : '',
            "Practice id": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].practices && i.VetProfileUser[0].practices.id ? i.VetProfileUser[0].practices.id : '',
            "Practice name": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].practices && i.VetProfileUser[0].practices.practice_name ? i.VetProfileUser[0].practices.practice_name : '',
            "Practice email": i.VetProfileUser && i.VetProfileUser[0] && i.VetProfileUser[0].practices && i.VetProfileUser[0].practices.email ? i.VetProfileUser[0].practices.email : '',
          }));
          return res.xls('data.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  // app.get("/updateAdministartorData", authRedirect(true), async (req: Request, res: Response) => {
  //   const data = await sequelize.query(
  //     "UPDATE `users-permissions_user` u  LEFT JOIN vet_profile v ON (u.id = v.user) LEFT JOIN vet_practices vp ON (vp.id = v.practice) SET u.first_name = REPLACE(vp.email, '@mailinator.com', ''), u.last_name = 'Administrator', u.address1 = vp.address1, u.state = vp.state WHERE u.role = 4 AND u.is_deleted IS NULL and u.id = 329");
  //     res.json({ success: "true", data});
  // });
};
