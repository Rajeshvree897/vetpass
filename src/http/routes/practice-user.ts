//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { Sequelize, Op } from "sequelize";
import moment from 'moment';

import User from "../../db/models/user";
import { authRedirect } from "../middlewares/index";
import UsersPermissionsRole from "../../db/models/users-permissions-role";
import PracticeUserService from "../../services/practice-user-service";
import constants from "../../helpers/constants";
import CommonService from "../../services/common";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import { CustomError } from "../../services/error-service";
import config from "../../config";
import VetProfile from "../../db/models/vet-profile";
import VetPractices from "../../db/models/vet-practices";
import UserFollowers from "../../db/models/user-followers";
import Country from "../../db/models/country";

export default (app: Router) => {
  app.get("/practice-users", authRedirect(true), (req: Request, res: Response) => {
    res.render("practice-users/index.ejs", {
      title: "User list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.post("/checkPracticeUserEmail", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { email: req.body.email, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await User.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get('/practice-user', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();

    if(req.query["dataAnimalType"]) {
      return res.json(await commonService.getBreeds(req.query["dataAnimalType"]));
    }
    if(req.query["country"]) {
      return res.json(await commonService.getStates(req.query["country"]));
    }

    return res.render('practice-users/user.ejs', {
      title: constants.PAGE_TITLE.USER_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      roleData: await commonService.getRoles(),
      countryData: await commonService.getCountries(),
      currencyTypeData: commonService.getCurrencyType(),
      practiceData: await commonService.getPractices(),
      serviceProviderMainServices: await commonService.getServiceProviderMainServices(),
      UserserviceProviderSubServices: await commonService.getUserServiceProviderSubServices(null),
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

  app.get("/practice-user/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj:any = {};
    let where:any = {};
    if(req.session && req.session.user && req.session.user.roleName && req.session.user.roleName === config.common.role.vet_practice_admin_role_name){
      // whereObj = { created_by: req.session.user.id };
      where = { practice: req.session && req.session.user.vetPractice };
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
        where,
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

  app.get("/practice-users/:id/delete", authRedirect(true), (req: Request, res: Response, next: NextFunction) => {
    const practiceUsersService = new PracticeUserService();
    practiceUsersService
      .deleteUser(+req.params.id)
      .then(() => {
        req.flash(
          "success",
          "User deleted successfully.",
          req,
          res
        );
        res.redirect("/admin/practice-users");
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.post(
    '/practice-users',
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
      const practiceUsersService = new PracticeUserService();
      practiceUsersService
        .addUser(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            'success',
            `User is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/practice-users');
        })
        .catch(async (error: Error) => {
          if(error.message === 'Email already exist') {
            const commonService = new CommonService();
            req.flash('error', error.message, req, res);
            return res.render('practice-users/user.ejs', {
              title: constants.PAGE_TITLE.USER_ADD,
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
          return next(error);
        });
    }
  );

  app.get(
    "/practice-users/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const practiceUsersService = new PracticeUserService();

      practiceUsersService
        .getUser(+req.params.id, req.session?.user.timeZone)
        .then(async (responseData: any) => {
          let animalTypes:any = await commonService.getAnimalTypes();
          let practitionerLiabilities: any =  responseData.vetProfile == null ? null : responseData.vetProfile.practitioner_liability;
          let practitionePractice: any =  responseData.vetProfile == null ? null : responseData.vetProfile.practice;
          let serviceProviderLiabilities: any =  responseData.vetProfile == null ? null : responseData.vetProfile.service_provider_liability;
          res.render("practice-users/user.ejs", {
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
    "/practice-users/update",
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

      const practiceUsersService = new PracticeUserService();
      practiceUsersService
        .updateUser(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `User is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/practice-users")
        })
        .catch(async (error: Error) => {
          if(error.message === 'Email already exist') {
            const commonService = new CommonService();
            req.flash('error', error.message, req, res);
            return res.render('practice-users/user.ejs', {
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

  app.get("/practice-users/:id/followers/data", authRedirect(true), (req: Request, res: Response) => {
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
};
