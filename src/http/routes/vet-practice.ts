//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import moment from 'moment';

import { authRedirect } from "../middlewares/index";
import VetPracticesService from "../../services/vet-practice";
import constants from "../../helpers/constants";
import CommonService from "../../services/common";
import { celebrate, Joi } from "celebrate";
import VetPractices from "../../db/models/vet-practices";
import { CustomError } from "../../services/error-service";
import config from "../../config";
import upload from "../../helpers/file-upload";
import { Op, Sequelize } from "sequelize";
import FavoritePractices from "../../db/models/favorite-practices";
import FavoritePracticeVetPractices from "../../db/models/favorite-practice-vet-practices";
import User from "../../db/models/user";
import Country from "../../db/models/country";
import ReportPractices from "../../db/models/report-practices";

export default (app: Router) => {
  app.get("/vetPractices", authRedirect(true), (req: Request, res: Response) => {
    res.render("vet-practices/index.ejs", {
      title: "Vet Practice list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.get('/vetPractice', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
   
    if(req.query["country"]) {
      return res.json(await commonService.getStates(req.query["country"]));
    }
    return res.render('vet-practices/vet-practice.ejs', {
      title: constants.PAGE_TITLE.VET_PRACTICE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      countryData: await commonService.getCountries(),
      currencyTypeData: commonService.getCurrencyType(),
      practiceData: await commonService.getPractices(),
      animalTypes: await commonService.getAnimalCategories(),
      classificationData: await commonService.getClassifications(),
      practiceService: await commonService.getPracticeServces()
    });
  });

  app.get("/favoriteVetPractices", authRedirect(true), (req: Request, res: Response) => {
    res.render("vet-practices/favorite-vet-practices.ejs", {
      title: "Favorite Vet Practice list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.get(
    "/favoriteVetPractices/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .getFavoriteVetPracticeReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            ...i,
            "Favorite Date": i.FavoriteVetPractices && i.FavoriteVetPractices.created_at ? moment(i.FavoriteVetPractices.created_at).format("MM/DD/YYYY") : "",       
            "Favorite Time": i.FavoriteVetPractices && i.FavoriteVetPractices.created_at ? moment(i.FavoriteVetPractices.created_at).format("HH:mm:ss a") : "",       
            "User Email": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.email ? i.FavoriteVetPractices.users.email : "", 
            "User Address1": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.address1 ? i.FavoriteVetPractices.users.address1 : "",
            "User Address2": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.address2 ? i.FavoriteVetPractices.users.address2 : "",
            "User Country": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.countries && i.FavoriteVetPractices.users.countries.country ? i.FavoriteVetPractices.users.countries.country : "",
            "User State/Postal/County": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.states && i.FavoriteVetPractices.users.states.state ? i.FavoriteVetPractices.users.states.state : "",
            "User City": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.city ? i.FavoriteVetPractices.users.city : "",
            "User Zip Code/Post Code": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.zip_code ? i.FavoriteVetPractices.users.zip_code : "",
            "User Int Code": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.int_code ? i.FavoriteVetPractices.users.int_code : "",
            "User First Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.first_name ? i.FavoriteVetPractices.users.first_name : "", 
            "User Second Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.last_name ? i.FavoriteVetPractices.users.last_name : "", 
            "User Telephone No": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.mobile ? i.FavoriteVetPractices.users.mobile : "",
            "User DoB": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.dob ? i.FavoriteVetPractices.users.dob : "",
            "User Registartion Date & Time": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.created_at ? moment(i.FavoriteVetPractices.users.created_at).format("MM/DD/YYYY HH:mm:ss a") : "", 
            "Practice Name": i.VetPractices && i.VetPractices.practice_name ?  i.VetPractices.practice_name : "",
            "Practice Public Email": i.VetPractices && i.VetPractices.public_email ?  i.VetPractices.public_email : "",
            "Practice Business Phone": i.VetPractices && i.VetPractices.business_phone ?  i.VetPractices.business_phone : "",
            "Practice Out of Hours Number": i.VetPractices && i.VetPractices.out_of_hours_number ?  i.VetPractices.out_of_hr_phone : "",
            "Practice Website": i.VetPractices && i.VetPractices.website ? i.VetPractices.website : "",
            "Practice Treats Categories": i.VetPractices && i.VetPractices.VetPracticesTypeAnimal && i.VetPractices.VetPracticesTypeAnimal[0] && i.VetPractices.VetPracticesTypeAnimal.animalcategories && i.VetPractices.VetPracticesTypeAnimal.animalcategories.category ? i.VetPractices.VetPracticesTypeAnimal.animalcategories.category : "",
            "Practice Specializations": i.VetPractices && i.VetPractices.speciality ? i.VetPractices.speciality : "",
            "Practice Registration No": i.VetPractices && i.VetPractices.practice_accreditation_no ? i.VetPractices.practice_accreditation_no : "",
            "Practice Email Address": i.VetPractices && i.VetPractices.email ? i.VetPractices.email : "",
            "Practice Contact Number": i.VetPractices && i.VetPractices.business_phone ? i.VetPractices.business_phone : "",
            "Practice Registration Date": i.VetPractices && i.VetPractices.created_at ? moment(i.VetPractices.created_at).format("MM/YYYY") : "",
            "Practice Registration Time": i.VetPractices && i.VetPractices.created_at ? moment(i.VetPractices.created_at).format("HH:mm:ss a") : "",
            "Practice Address1": i.VetPractices && i.VetPractices.address1 ? i.VetPractices.address1 : "",
            "Practice Address2": i.VetPractices && i.VetPractices.address2 ? i.VetPractices.address2 : "",
            "Practice City/Town": i.VetPractices && i.VetPractices.city ? i.VetPractices.city : "",
            "Practice Zip Code/Post Code": i.VetPractices && i.VetPractices.zip_code ? i.VetPractices.zip_code : "",
            "Practice Int Code": i.VetPractices && i.VetPractices.int_code ? i.VetPractices.int_code : "",
            "Practice Type": i.VetPractices && i.VetPractices.VetPracticesClassification && i.VetPractices.VetPracticesClassification[0] && i.VetPractices.VetPracticesClassification[0].classifications && i.VetPractices.VetPracticesClassification[0].classifications.title ? i.VetPractices.VetPracticesClassification[0].classifications.title : "",
            "Practice Country": i.VetPractices && i.VetPractices.countries && i.VetPractices.countries.country ? i.VetPractices.countries.country : "",
            "Practice State/Postal/County": i.VetPractices && i.VetPractices.states && i.VetPractices.states.state ? i.VetPractices.states.state : "",
            "User Role": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.Role && i.FavoriteVetPractices.users.Role.name ? i.FavoriteVetPractices.users.Role.name : "",
            "User Public Email": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].public_email ? i.FavoriteVetPractices.users.VetProfileUser[0].public_email : '',
            "User Is Online Appointment": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].is_online_consultation ? i.FavoriteVetPractices.users.VetProfileUser[0].is_online_consultation : '',
            "User Online Appointment Price (inc tax)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].online_consultation ? i.FavoriteVetPractices.users.VetProfileUser[0].online_consultation : '',
            "User Public Contact Number Int Code": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].public_contact_no ? i.FavoriteVetPractices.users.VetProfileUser[0].public_contact_no : '',
            "User Public Contact Number": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].public_contact_no_int_code ? i.FavoriteVetPractices.users.VetProfileUser[0].public_contact_no_int_code : '',
            "User Public Out of Hours Int Code": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].public_out_of_hr_phone_int_code ? i.FavoriteVetPractices.users.VetProfileUser[0].public_out_of_hr_phone_int_code : '',
            "User Public Out of Hours Number": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].public_out_of_hr_phone ? i.FavoriteVetPractices.users.VetProfileUser[0].public_out_of_hr_phone : '',
            "User Education and Qualifications": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].education ? i.FavoriteVetPractices.users.VetProfileUser[0].education : '',
            "User Qualification Date (MM/YYYY or YYYY)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].created_at ? moment(i.FavoriteVetPractices.users.VetProfileUser[0].created_at).format("MM/YYYY") : '',
            "Veterinary Registrations": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecialities && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecialities.specialities && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecialities.specialities.name ? i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecialities.specialities.name : '',
            "Personal Summary (255 characters max)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].personal_bio ? i.FavoriteVetPractices.users.VetProfileUser[0].personal_bio : '',
            "Registration Number": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].registration_number ? i.FavoriteVetPractices.users.VetProfileUser[0].registration_number : '',
            "Is In Clinic Appointment": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].is_in_clinic_consultation ? i.FavoriteVetPractices.users.VetProfileUser[0].is_in_clinic_consultation : '',
            "In Clinic Appointment Price (inc tax)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].in_clinic_consultation ? i.FavoriteVetPractices.users.VetProfileUser[0].in_clinic_consultation : '',
            "Currency Type": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].currency_type ? i.FavoriteVetPractices.users.VetProfileUser[0].currency_type : '',
            "Practice (or select a VETPASS group)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].practices && i.FavoriteVetPractices.users.VetProfileUser[0].practices.practice_name ? i.FavoriteVetPractices.users.VetProfileUser[0].practices.practice_name : '',
            "Specialization, Advanced Practitioner Date": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].passout_date ? i.FavoriteVetPractices.users.VetProfileUser[0].passout_date : '',
            "Practitioner Liabilities": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].practitionerliabilities && i.FavoriteVetPractices.users.VetProfileUser[0].practitionerliabilities.name ? i.FavoriteVetPractices.users.VetProfileUser[0].practitionerliabilities.name : '',
            "Treats Categories": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofiletreatstypeanimal && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories.category ? i.FavoriteVetPractices.users.VetProfileUser[0].vetprofiletreatstypeanimal.animalcategories.category : '',
            "Specialization, Advanced Practitioner": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecializations && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecializations.specializations && i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecializations.specializations.name ? i.FavoriteVetPractices.users.VetProfileUser[0].vetprofilespecializations.specializations.name : '',
            "Bank Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].bank_name ? i.FavoriteVetPractices.users.VetProfileUser[0].bank_name : '',
            "Legal Name or First Name & Last Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_user_name ? i.FavoriteVetPractices.users.VetProfileUser[0].b_user_name : '',
            "Email": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_user_email ? i.FavoriteVetPractices.users.VetProfileUser[0].b_user_email : '',
            "Country (Bank Details)": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].countries && i.FavoriteVetPractices.users.VetProfileUser[0].countries && i.FavoriteVetPractices.users.VetProfileUser[0].countries.country ? i.FavoriteVetPractices.users.VetProfileUser[0].countries.country : '',
            "Currency": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_currency ? i.FavoriteVetPractices.users.VetProfileUser[0].b_currency : '',
            "Account Number": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_account_number ? i.FavoriteVetPractices.users.VetProfileUser[0].b_account_number : '',
            "Bank Address": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_address ? i.FavoriteVetPractices.users.VetProfileUser[0].b_address : '',
            "Sort Code": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_sort_code ? i.FavoriteVetPractices.users.VetProfileUser[0].b_sort_code : '',
            "IBAN": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_iban ? i.FavoriteVetPractices.users.VetProfileUser[0].b_iban : '',
            "NCC": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_ncc ? i.FavoriteVetPractices.users.VetProfileUser[0].b_ncc : '',
            "SWIFTBIC": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.VetProfileUser && i.FavoriteVetPractices.users.VetProfileUser[0] && i.FavoriteVetPractices.users.VetProfileUser[0].b_swiftbic ? i.FavoriteVetPractices.users.VetProfileUser[0].b_swiftbic : '',
            "Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.name ? i.FavoriteVetPractices.users.animalProfile.name : '',
            "Gender": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.gender ? i.FavoriteVetPractices.users.animalProfile.gender : '',
            "Status": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.status ? i.FavoriteVetPractices.users.animalProfile.status : '',
            "Date of Registration": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.created_at ? moment(i.FavoriteVetPractices.users.animalProfile.created_at).format("MM/DD/YYYY") : '',
            "Time of Registration": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.created_at ? moment(i.FavoriteVetPractices.users.animalProfile.created_at).format("HH:mm:ss a") : '',
            "Color": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.colour ? i.FavoriteVetPractices.users.animalProfile.colour : '',
            "Date Of Birth": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.date_of_birth ? i.FavoriteVetPractices.users.animalProfile.date_of_birth : '',
            "Height": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.height ? i.FavoriteVetPractices.users.animalProfile.height : '',
            "Height Type": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.height_type ? i.FavoriteVetPractices.users.animalProfile.height_type : '',
            "Weight": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.weight ? i.FavoriteVetPractices.users.animalProfile.weight : '',
            "Weight Type": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.weight_type ? i.FavoriteVetPractices.users.animalProfile.weight_type : '',
            "Spayed Neutered": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.spayed_neutered ? i.FavoriteVetPractices.users.animalProfile.spayed_neutered : '',
            "Chip Details": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.chip_details ? i.FavoriteVetPractices.users.animalProfile.chip_details : '',
            "Regd Breed Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.regd_breed_name ? i.FavoriteVetPractices.users.animalProfile.regd_breed_name : '',
            "Breed Regd Number": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.breed_regd_number ? i.FavoriteVetPractices.users.animalProfile.breed_regd_number : '',
            "Breeder": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.breeder ? i.FavoriteVetPractices.users.animalProfile.breeder : '',
            "Sire Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.sire_name ? i.FavoriteVetPractices.users.animalProfile.sire_name : '',
            "Sire Breed": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.sire_breed ? i.FavoriteVetPractices.users.animalProfile.sire_breed : '',
            "Dam Name": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.dam_name ? i.FavoriteVetPractices.users.animalProfile.dam_name : '',
            "Dam Breed": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.dam_breed ? i.FavoriteVetPractices.users.animalProfile.dam_breed : '',
            "Breed Reference": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.breed_reference ? i.FavoriteVetPractices.users.animalProfile.breed_reference : '',
            "Other 123": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.other ? i.FavoriteVetPractices.users.animalProfile.other : '',
            "Other Information": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.other_information ? i.FavoriteVetPractices.users.animalProfile.other_information : '',
            "Animal Type": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.AnimalType && i.FavoriteVetPractices.users.animalProfile.AnimalType.type ? i.FavoriteVetPractices.users.animalProfile.AnimalType.type : '',
            "Breed": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.Breed && i.FavoriteVetPractices.users.animalProfile.Breed.name ? i.FavoriteVetPractices.users.animalProfile.Breed.name : '',
            "Animal Owner": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.User && i.FavoriteVetPractices.users.animalProfile.User.first_name && i.FavoriteVetPractices.users.animalProfile.User.last_name ? i.FavoriteVetPractices.users.animalProfile.User.first_name + ' ' + i.FavoriteVetPractices.users.animalProfile.User.last_name : '',
            "Select Chip/Registration/Ear No Companies": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.Chip && i.FavoriteVetPractices.users.animalProfile.Chip.name ? i.FavoriteVetPractices.users.animalProfile.Chip.name : "",
            "Approximate Insurance Renewal Date": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.InsuranceRenewalDate ? i.FavoriteVetPractices.users.animalProfile.InsuranceRenewalDate : '',
            "Would you like annual insurance updates and proposals?": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.wantContact ? i.FavoriteVetPractices.users.animalProfile.wantContact : '',
            "Allergies": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.allergies ? i.FavoriteVetPractices.users.animalProfile.allergies : '',
            "Medications": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.medications ? i.FavoriteVetPractices.users.animalProfile.medications : '',
            "Insurance": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.insurance  ? i.FavoriteVetPractices.users.animalProfile.insurance : '',
            "Insurer": i.FavoriteVetPractices && i.FavoriteVetPractices.users && i.FavoriteVetPractices.users.animalProfile && i.FavoriteVetPractices.users.animalProfile.insurer && i.FavoriteVetPractices.users.animalProfile.insurer.name ? i.FavoriteVetPractices.users.animalProfile.insurer.name : '',
          }));

          responseData = responseData.map((i:any) => { 
            delete i.VetPractices;
            delete i.FavoriteVetPractices;
            return i; 
          });
          return res.xls('favoriteVetPracticeReport.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get("/favoriteVetPractice/data", authRedirect(true), (req: Request, res: Response) => {
    let where: any = { "$VetPractices.option$": "store" };
    let order:any[] = [];
    let orderBy:any;
    if(req.query && req.query.search && req.query.search.value !== '') {
      where = { "$VetPractices.option$": "store", [Op.or]: [
        { "$VetPractices.practice_name$": { [Op.like]: `%${req.query.search.value}%` } },
        { "$FavoriteVetPractices.users.first_name$": { [Op.like]: `%${req.query.search.value}%` } },
        { "$FavoriteVetPractices.users.last_name$": { [Op.like]: `%${req.query.search.value}%` } },
        { "$FavoriteVetPractices.users.countries.country$": { [Op.like]: `%${req.query.search.value}%` } },
        { "$FavoriteVetPractices.users.zip_code$": { [Op.like]: `%${req.query.search.value}%` } }
      ]
    };
    delete req.query.search;
    }
    
    if (req.query && req.query.order && req.query.order[0].column === '1') {
      order = [];
      order = [ [ Sequelize.literal('`VetPractices`.`practice_name`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    if (req.query && req.query.order && req.query.order[0].column === '2') {
      order = [];
      order = [ [ Sequelize.literal('`FavoriteVetPractices->users`.`first_name`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    if (req.query && req.query.order && req.query.order[0].column === '3') {
      order = [];
      order = [ [ Sequelize.literal('`FavoriteVetPractices->users`.`last_name`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    if (req.query && req.query.order && req.query.order[0].column === '4') {
      order = [];
      order = [ [ Sequelize.literal('`FavoriteVetPractices->users->countries`.`country`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    if (req.query && req.query.order && req.query.order[0].column === '5') {
      order = [];
      order = [ [ Sequelize.literal('`FavoriteVetPractices->users`.`zip_code`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    if (req.query && req.query.order && req.query.order[0].column === '6') {
      order = [];
      order = [ [ Sequelize.literal('`FavoriteVetPractices`.`created_at`'), req.query.order[0].dir ] ];
      orderBy = req.query.order[0].dir;
      delete req.query.order;
    }
    datatable(FavoritePracticeVetPractices, req.query, { 
      order,
      include:[
        {
          model: VetPractices,
          as: "VetPractices",
          attributes: ["practice_name"],
        },
        {
          model: FavoritePractices,
          as: "FavoriteVetPractices",
          attributes: ["user", "created_at"],
          include:[
            {
              model: User,
              as: "users",
              attributes: ["first_name", "last_name", "country", "zip_code", "email"],
              include:[
                {
                  model: Country,
                  as: "countries",
                  attributes: ["country"]
                }
              ]
            }
          ]
        }
      ],
      where
   }).then((result: any) => {
      if (result && result.data) {
        for (let i = 0; i < result.data.length; i += 1) {
          result.data[i].practice_name = result.data[i].VetPractices && result.data[i].VetPractices.practice_name || "";
          result.data[i].date = result.data[i].FavoriteVetPractices && (result.data[i].FavoriteVetPractices.created_at.getMonth()+1) + "/" + result.data[i].FavoriteVetPractices.created_at.getDate()  + "/" + result.data[i].FavoriteVetPractices.created_at.getFullYear() || "";
          result.data[i].time = result.data[i].FavoriteVetPractices && result.data[i].FavoriteVetPractices.created_at.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) || "";
          result.data[i].first_name = result.data[i].FavoriteVetPractices && result.data[i].FavoriteVetPractices.users && result.data[i].FavoriteVetPractices.users.first_name || "";
          result.data[i].last_name = result.data[i].FavoriteVetPractices && result.data[i].FavoriteVetPractices.users && result.data[i].FavoriteVetPractices.users.last_name || "";
          result.data[i].country = result.data[i].FavoriteVetPractices && result.data[i].FavoriteVetPractices.users && result.data[i].FavoriteVetPractices.users.countries && result.data[i].FavoriteVetPractices.users.countries.country || "";
          result.data[i].zip_code = result.data[i].FavoriteVetPractices && result.data[i].FavoriteVetPractices.users && result.data[i].FavoriteVetPractices.users.zip_code || "";
        }
      }
      res.json(result);
    });
  });

  app.post("/checkVetPracticeEmail", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { email: req.body.email, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await VetPractices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get("/vetPractice/data", authRedirect(true), (req: Request, res: Response) => {
    let whereObj = {};
    if(req.session && req.session.user && req.session.user.roleName && req.session.user.roleName === config.common.role.vet_practice_admin_role_name){
      whereObj = { created_by: req.session.user.id, is_deleted: null, option: "practice" };
    }else{
      whereObj = { is_deleted: null, option: "practice" }
    }
    datatable(VetPractices, req.query, { where : whereObj }).then((result: any) => {
      res.json(result);
    });
  });

  app.get("/vetPractices/:id/delete", authRedirect(true), (req: Request, res: Response, next: NextFunction) => {
    const vetPracticesService = new VetPracticesService();
    vetPracticesService
      .deleteVetPractice(+req.params.id)
      .then(() => {
        req.flash(
          "success",
          "Vet Practice deleted successfully.",
          req,
          res
        );
        res.redirect("/admin/vetPractices");
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.get("/vetPractices/:id/unClaim", authRedirect(true), (req: Request, res: Response, next: NextFunction) => {
    const vetPracticesService = new VetPracticesService();
    vetPracticesService
      .unClaimVetPractice(+req.params.id)
      .then(() => {
        req.flash(
          "success",
          "Vet Practice unClaimed successfully.",
          req,
          res
        );
        res.redirect("/admin/vetPractices");
      })
      .catch((error: Error) => {
        return next(error);
      });
  });

  app.post(
    '/vetPractices',
    multer().single('practiceImage'),
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .error(new CustomError("Email is required")),
        practice_name: Joi.string().allow('', null).optional(),
        option: Joi.string().allow('', null).optional(),
        public_email: Joi.string().allow('', null).optional(),
        flag: Joi.string().allow('', null).optional(),
        address1: Joi.string().allow('', null).optional(),
        address2: Joi.string().allow('', null).optional(),
        city: Joi.string().allow('', null).optional(),
        zip_code: Joi.string().allow('', null).optional(),
        country: Joi.number().allow('', null).optional(),
        state: Joi.number().allow('', null).optional(),
        int_code: Joi.string().allow('', null).optional(),
        business_phone: Joi.optional(),
        out_of_hr_phone: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
        website: Joi.string().allow('', null).optional(),
        types: Joi.array().optional(),
        classification: Joi.array().optional(),
        storeClassification: Joi.array().optional(),
        practice_service: Joi.array().optional(),
        specialityData: Joi.optional(),
        weekDay: Joi.optional(),
        monday: Joi.optional(),
        tuesday: Joi.optional(),
        wednesday: Joi.optional(),
        thursday: Joi.optional(),
        friday: Joi.optional(),
        saturday: Joi.optional(),
        sunday: Joi.optional(),
        longitude: Joi.number().allow('', null).optional(),
        latitude: Joi.number().allow('', null).optional(),
        practice_accreditation_no: Joi.string().allow('', null).optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .addVetPractice(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            'success',
            `Vet Practice is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/vetPractices');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/vetPractices/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const vetPracticesService = new VetPracticesService();

      vetPracticesService
        .getVetPractice(+req.params.id, req.session?.user.timeZone)
        .then(async (responseData: any) => {
          res.render("vet-practices/vet-practice.ejs", {
            moment,
            title: constants.PAGE_TITLE.VET_PRACTICE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            countryData: await commonService.getCountries(responseData.country, true),
            states: await commonService.getStates(responseData.country,responseData.state, true),
            currencyTypeData: commonService.getCurrencyType(),
            practiceData: await commonService.getPractices(),
            animalTypes: await commonService.getAnimalCategories(responseData.VetPracticesTypeAnimal, true),
            classificationData: await commonService.getClassifications(responseData.VetPracticesClassification, true),
            practiceService: await commonService.getPracticeServces(responseData.practiceService, true)
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/vetPractices/update",
    multer().single('practiceImage'),
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .error(new CustomError("Email is required")),
        practice_name: Joi.string().allow('', null).optional(),
        option: Joi.string().allow('', null).optional(),
        public_email: Joi.string().allow('', null).optional(),
        flag: Joi.string().allow('', null).optional(),
        address1: Joi.string().allow('', null).optional(),
        address2: Joi.string().allow('', null).optional(),
        city: Joi.string().allow('', null).optional(),
        zip_code: Joi.string().allow('', null).optional(),
        country: Joi.number().allow('', null).optional(),
        state: Joi.number().allow('', null).optional(),
        int_code: Joi.string().allow('', null).optional(),
        business_phone: Joi.optional(),
        out_of_hr_phone: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
        website: Joi.string().allow('', null).optional(),
        types: Joi.array().optional(),
        classification: Joi.array().optional(),
        storeClassification: Joi.array().optional(),
        practice_service: Joi.array().optional(),
        specialityData: Joi.optional(),
        weekDay: Joi.optional(),
        monday: Joi.optional(),
        tuesday: Joi.optional(),
        wednesday: Joi.optional(),
        thursday: Joi.optional(),
        friday: Joi.optional(),
        saturday: Joi.optional(),
        sunday: Joi.optional(),
        longitude: Joi.number().allow('', null).optional(),
        latitude: Joi.number().allow('', null).optional(),
        practice_accreditation_no: Joi.string().allow('', null).optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .updateVetPractice(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `Vet Practice is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/vetPractices")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/vetPracticeProfile",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const vetPracticesService = new VetPracticesService();

      vetPracticesService
        .getVetPractice(req.session && req.session.user.vetPractice, req.session?.user.timeZone)
        .then(async (responseData: any) => {
          res.render("vet-practices/vet-practice-profile.ejs", {
            moment,
            title: constants.PAGE_TITLE.VET_PRACTICE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            countryData: await commonService.getCountries(responseData.country, true),
            states: await commonService.getStates(responseData.country, responseData.state, true),
            currencyTypeData: commonService.getCurrencyType(),
            practiceData: await commonService.getPractices(),
            animalTypes: await commonService.getAnimalCategories(),
            classificationData: await commonService.getClassifications(),
            practiceService: await commonService.getPracticeServces()
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/vetPracticeProfile",
    multer().single('practiceImage'),
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .required()
          .error(new CustomError("Email is required")),
        practice_name: Joi.string().allow('', null).optional(),
        option: Joi.string().allow('', null).optional(),
        public_email: Joi.string().allow('', null).optional(),
        address1: Joi.string().allow('', null).optional(),
        address2: Joi.string().allow('', null).optional(),
        city: Joi.string().allow('', null).optional(),
        zip_code: Joi.string()
          .required().max(10)
          .error(new CustomError("Zip code is required")),
        country: Joi.number().allow('', null).optional(),
        state: Joi.number().allow('', null).optional(),
        int_code: Joi.string().allow('', null).optional(),
        business_phone: Joi.optional(),
        out_of_hr_phone: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
        website: Joi.string().allow('', null).optional(),
        types: Joi.array().optional(),
        classification: Joi.array().optional(),
        storeClassification: Joi.array().optional(),
        practice_service: Joi.array().optional(),
        pet_service: Joi.array().optional(),
        specialityData: Joi.optional(),
        weekDay: Joi.optional(),
        monday: Joi.optional(),
        tuesday: Joi.optional(),
        wednesday: Joi.optional(),
        thursday: Joi.optional(),
        friday: Joi.optional(),
        saturday: Joi.optional(),
        sunday: Joi.optional(),
        longitude: Joi.number().allow('', null).optional(),
        latitude: Joi.number().allow('', null).optional(),
        practice_accreditation_no: Joi.string().allow('', null).optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const { option } = req.body;
      let redirectRoute = option == "store" ? "/admin/storeProfile" : "/admin/vetPracticeProfile";
      let sucessTxt = option == "store" ? "store" : "practice";
      delete req.body.option;
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .updateVetPractice(req.body, req.session?.user.id, req.file, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `Vet ${sucessTxt} is updated successfully.`,
            req,
            res
          )
          return res.redirect(redirectRoute);
        })
        .catch(async (error: Error) => {
          if(error.message === 'Email already exist') {
            const commonService = new CommonService();
            req.flash('error', error.message, req, res);
            return res.render("vet-practices/vet-practice-profile.ejs", {
              moment,
              title: constants.PAGE_TITLE.VET_PRACTICE_EDIT,
              userData: req.session && req.session.user ? req.session.user : null,
              responseData: req.body,
              countryData: await commonService.getCountries(),
              states: await commonService.getStates(req.body.country),
              currencyTypeData: commonService.getCurrencyType(),
              practiceData: await commonService.getPractices(),
              animalTypes: await commonService.getAnimalCategories(),
              classificationData: await commonService.getClassifications(),
              practiceService: await commonService.getPracticeServces()
            })
          }
          return next(error)
        })
    }
  );

  app.post(
    "/importVetPractice",
    authRedirect(true),
    upload.single('VetPracticeFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .importVetPractice(req.file, req.session?.user.id, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            `Vet Practices are added successfully.`,
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
    "/import-update-VetPractice",
    upload.single('VetPracticeFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .importVetPracticeUpdate(req.file, req?.session?.user?.id, req?.session?.user?.timeZone)
        .then(() => {
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

  app.get("/reportedPractices", authRedirect(true), (req: Request, res: Response) => {
    res.render("vet-practices/reported-practices.ejs", {
      title: "Reported Practice list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.get(
    "/reported-practices/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(ReportPractices, req.query, { 
        distinct: true,
        col: 'id',
        attributes: [
          "id",
        ],
        where: { "$Practice.option$": "practice" },
        include: [
          {
            model: User,
            as: "User",
            required: false,
            attributes: ['id', "first_name", 'last_name']
          },
          {
            model: VetPractices,
            as: "Practice",
            required: false,
            attributes: ['id', "practice_name"]
          }
        ],
       }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/vet-practice/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      vetPracticesService
        .getVetPracticeReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "email": i.email || "",
          }));
          return res.xls('data.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/vet-practice/missingImport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const vetPracticesService = new VetPracticesService();
      const limit = Number(req.param("limit"));
      const offset = Number(req.param("offset"));
      vetPracticesService
        .importMissingPracticeAdministrator(req?.session?.user?.id, limit, offset)
        .then((responseData: any) => {
          return res.json({ status: true });
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false, error})
        });
    }
  )

  app.get(
    "/userAdministratorReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const limit = Number(req.param("limit"));
      const offset = Number(req.param("offset"));
      console.log(limit, offset)
      const usersService = new VetPracticesService();
      usersService
        .getUserReportData1(limit, offset)
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "id": i.id,
            "practice_name": i.practice_name,
            "address1": i.address1,
            "address2": i.address2,
            "city": i.city,
            "zip_code": i.zip_code,
            "int_code": i.intCode && i.intCode.country ? i.intCode.country : '',
            "business_phone": i.business_phone,
            "out_of_hr_phone": i.out_of_hr_phone,
            "email": i.email,
            "website": i.website,
            "public_email": i.public_email,
            "practice_accreditation_no": i.practice_accreditation_no,
            "latitude": i.latitude,
            "longitude": i.longitude,
            "claimed_datetime": i.claimed_datetime,
            "Country": i.countries && i.countries.country ? i.countries.country : '',
            "State/Postal/County": i.states && i.states.state ? i.states.state : '',
            "Notes, Interests and Specializations": i.speciality,
            "Treats Categories": i.VetPracticesTypeAnimal && i.VetPracticesTypeAnimal.map((i: any) => i.animalcategories.category).toString() || "",
            "Classifications": i.VetPracticesClassification && i.VetPracticesClassification.map((i: any) => i.classifications.title).toString() || "",
            "Practice Hours": i.VetPracticeService && i.VetPracticeService.map((i: any) => i.PracticeServices.name).toString() || "",
            "image": i.image && i.image && i.image.UploadFile && i.image.UploadFile.url || ""
            // ...i, 
            // "Registration Date": moment(i.created_at).format("MM/DD/YYYY"),
            // "Registration Time": moment(i.created_at).format("HH:mm:ss a"),
          }));
          // console.log(JSON.stringify(responseData));
          // responseData = responseData.map((i:any) => {
          //   delete i.countries,
          //   delete i.states,
          //   delete i.VetPracticesTypeAnimal
          //   delete i.VetPracticesClassification;
          //   delete i.VetPracticeService;
          //   return i; 
          // });
          return res.xls('data.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )
};
