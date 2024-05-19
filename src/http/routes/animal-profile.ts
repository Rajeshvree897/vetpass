// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";
import multer from "multer";

import { authRedirect } from "../middlewares/index";
import AnimalProfilesService from "../../services/animal-profile";
import constants from "../../helpers/constants";
import AnimalProfiles from "../../db/models/animal-profiles";
import CommonService from "../../services/common";
import AnimalTypes from "../../db/models/animal-types";
import Breeds from "../../db/models/breeds";
import User from "../../db/models/user";
import upload from "../../helpers/file-upload";
import UploadFileMorph from "../../db/models/upload-file-morph";
import UploadFile from "../../db/models/upload-file";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/animalProfiles",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("animal-profiles/index.ejs", {
        title: "Animal Profile list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/animalProfile', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    if (req.query["animalType"]) {
      return res.json(await commonService.getBreeds(req.query["animalType"]));
    }
    return res.render('animal-profiles/animal-profile.ejs', {
      title: constants.PAGE_TITLE.ANIMAL_PROFILE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      genderData: commonService.getGender(),
      spayedNeuteredData: commonService.getSpayedNeutered(),
      heightTypeData: commonService.getHeightType(),
      weightTypeData: commonService.getWeightType(),
      statusData: commonService.getStatus(),
      users: await commonService.getUsers(),
      animalTypes: await commonService.getAnimalTypes(),
      chips: await commonService.getChips(),
      insurers: await commonService.getInsurers(),
    });
  });

  app.post(
    '/animalProfiles',
    multer().single('profileImage'),
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Name is required")),
        colour: Joi.string().allow('', null).optional(),
        spayed_neutered: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        gender: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        height: Joi.number().allow('', null).optional(),
        date_of_birth: Joi.string().allow('', null).optional(),
        height_type: Joi.string().allow('', null).optional(),
        weight_type: Joi.string().allow('', null).optional(),
        animal_type: Joi.string().allow('', null).optional(),
        breed: Joi.string().allow('', null).optional(),
        user: Joi.string().allow('', null).optional(),
        chip_details: Joi.string().allow('', null).optional(),
        regd_breed_name: Joi.string().allow('', null).optional(),
        breed_regd_number: Joi.string().allow('', null).optional(),
        breeder: Joi.string().allow('', null).optional(),
        sire_name: Joi.string().allow('', null).optional(),
        sire_breed: Joi.string().allow('', null).optional(),
        dam_name: Joi.string().allow('', null).optional(),
        dam_breed: Joi.string().allow('', null).optional(),
        breed_reference: Joi.string().allow('', null).optional(),
        other: Joi.string().allow('', null).optional(),
        other_information: Joi.string().allow('', null).optional(),
        weight: Joi.number().allow('', null).optional(),
        insurance: Joi.string().required().error(new CustomError("Insurance is required")),
        insurers: Joi.string().max(255).when('insurance', { is: "Yes", then: Joi.required(), otherwise: Joi.optional() }),
        InsuranceRenewalDate: Joi.string().allow('', null).optional(),
        wantContact: Joi.string().required().error(new CustomError("Annual insurance updates and proposals is required")),
        chip: Joi.string().required().error(new CustomError("Chip/Registration/Ear No. Companies is required")),
        allergies: Joi.string().allow('', null).optional(),
        medications: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      !req.body.animal_type ? delete req.body.animal_type: '';
      !req.body.breed ? delete req.body.breed: '';
      !req.body.user ? delete req.body.user: '';
      !req.body.height ? delete req.body.height: '';
      !req.body.weight ? delete req.body.weight: '';
      !req.body.date_of_birth ? delete req.body.date_of_birth: '';
      const animalProfilesService = new AnimalProfilesService();
      animalProfilesService
        .addAnimalProfile(req.body, req.file)
        .then(() => {
          req.flash(
            'success',
            `Animal Profile is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/animalProfiles');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/animalProfiles/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let order:any[] = [];
      let where:any = {};
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
          { '$AnimalType.type$' : { [Op.like]: `%${req.query.search.value}%` }}, 
          { '$Breed.name$': { [Op.like]: `%${req.query.search.value}%` } },
          { '$User.email$': { [Op.like]: `%${req.query.search.value}%` } },
          { '$User.first_name$': { [Op.like]: `%${req.query.search.value}%` } },
          { '$User.last_name$': { [Op.like]: `%${req.query.search.value}%` } },
          { name: { [Op.like]: `%${req.query.search.value}%` } },
        ]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [ [ Sequelize.literal('`AnimalType`.`type`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '3') {
        order = [ [ Sequelize.literal('`Breed`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '4') {
        order = [ [ Sequelize.literal('`User`.`email`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`User`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '6') {
        order = [ [ Sequelize.literal('`User`.`last_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(AnimalProfiles, req.query, {
        attributes: [
          "id",
          "gender",
          "colour",
          "created_at",
          [Sequelize.col("AnimalType.type"), "animal_type"],
          [Sequelize.col("Breed.name"), "breed"],
          [Sequelize.col("User.email"), "email"],
          [Sequelize.col("User.first_name"), "animal_owner"],
          [Sequelize.col("User.last_name"), "l_animal_owner"],
          [Sequelize.col("AnimalProfilesIcon.UploadFile.url"), "image"],
          "name"
        ],
        include: [
          { model: AnimalTypes, as: "AnimalType", attributes: ["type"] },
          { model: Breeds, as: "Breed", attributes: ["name"] },
          { model: User, as: "User", attributes: ["first_name"] },
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
        ],
        where,
        order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/animalProfiles/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalProfilesService = new AnimalProfilesService();
      animalProfilesService
        .getAnimalProfile(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();
          console.log(req.query["animalType"])
          if (req.query["animalType"]) {
            res.json(await commonService.getBreeds(req.query["animalType"], responseData.breed, true));
          }
          res.render("animal-profiles/animal-profile.ejs", {
            title: constants.PAGE_TITLE.ANIMAL_PROFILE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            genderData: commonService.getGender(),
            spayedNeuteredData: commonService.getSpayedNeutered(),
            heightTypeData: commonService.getHeightType(),
            weightTypeData: commonService.getWeightType(),
            statusData: commonService.getStatus(),
            users: await commonService.getUsers(),
            animalTypes: await commonService.getAnimalTypes(responseData.animal_type, true),
            chips: await commonService.getChips(responseData.chip, true),
            insurers: await commonService.getInsurers(responseData.insurers, true),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/animalProfiles/update",
    multer().single('profileImage'),
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Name is required")),
        colour: Joi.string().allow('', null).optional(),
        spayed_neutered: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        gender: Joi.string()
          .required()
          .error(new CustomError("Spayed Neutered is required")),
        height: Joi.number().allow('', null).optional(),
        date_of_birth: Joi.string().allow('', null).optional(),
        height_type: Joi.string().allow('', null).optional(),
        weight_type: Joi.string().allow('', null).optional(),
        animal_type: Joi.string().allow('', null).optional(),
        breed: Joi.string().allow('', null).optional(),
        user: Joi.string().allow('', null).optional(),
        chip_details: Joi.string().allow('', null).optional(),
        regd_breed_name: Joi.string().allow('', null).optional(),
        breed_regd_number: Joi.string().allow('', null).optional(),
        breeder: Joi.string().allow('', null).optional(),
        sire_name: Joi.string().allow('', null).optional(),
        sire_breed: Joi.string().allow('', null).optional(),
        dam_name: Joi.string().allow('', null).optional(),
        dam_breed: Joi.string().allow('', null).optional(),
        breed_reference: Joi.string().allow('', null).optional(),
        other: Joi.string().allow('', null).optional(),
        other_information: Joi.string().allow('', null).optional(),
        weight: Joi.number().allow('', null).optional(),
        insurance: Joi.string().required().error(new CustomError("Insurance is required")),
        insurers: Joi.string().max(255).when('insurance', { is: "Yes", then: Joi.required(), otherwise: Joi.optional() }),
        InsuranceRenewalDate: Joi.string().allow('', null).optional(),
        wantContact: Joi.string().required().error(new CustomError("Annual insurance updates and proposals is required")),
        chip: Joi.string().required().error(new CustomError("Chip/Registration/Ear No. Companies is required")),
        allergies: Joi.string().allow('', null).optional(),
        medications: Joi.string().allow('', null).optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.updated_by = req.session?.user.id;
      !req.body.animal_type ? delete req.body.animal_type: '';
      !req.body.breed ? delete req.body.breed: '';
      !req.body.user ? delete req.body.user: '';
      !req.body.height ? delete req.body.height: '';
      !req.body.weight ? delete req.body.weight: '';
      !req.body.date_of_birth ? delete req.body.date_of_birth: '';
      const animalProfilesService = new AnimalProfilesService();

      animalProfilesService
        .updateAnimalProfile(req.body, req.file)
        .then(() => {
          req.flash(
            "success",
            `Animal Profile is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/animalProfiles")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/animalProfiles/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalProfilesService = new AnimalProfilesService();
      animalProfilesService
        .deleteAnimalProfiles(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Animal Profile deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/animalProfiles")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/importAnimalProfile",
    authRedirect(true),
    upload.single('animalProfileFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const animalProfilesService = new AnimalProfilesService();

      animalProfilesService
        .importAnimalProfile(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Animal profiles are added successfully.`,
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
}
