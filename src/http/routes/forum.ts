// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import Forums from "../../db/models/forums"
import ForumsServices from "../../services/forum"
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";
import multer from 'multer';
import UploadFileMorph from "../../db/models/upload-file-morph";
import UploadFile from "../../db/models/upload-file";
import { authRedirect } from "../middlewares/index";
import CommonService from "../../services/common";
import constants from "../../helpers/constants";
import AnimalTypes from "../../db/models/animal-types";
import Breeds from "../../db/models/breeds";
import { CustomError } from "../../services/error-service";
import ForumsAnimalTypes from "../../db/models/forums-animal-types";
import ForumsBreeds from "../../db/models/forums-breeds";
import upload from "../../helpers/file-upload";
import ProfileService from "../../services/profile";
import { ForumStatus } from "../../types/common";
import ForumsAnimalCategories from "../../db/models/forums-animal-categories";
import AnimalCategories from "../../db/models/animal-categories";
const _ = require('lodash');

export default (app: Router) => {
  app.get(
    "/forums",
    authRedirect(true),
    (req: Request, res: Response) => {
      const commonService = new CommonService();

      res.render("forums/index.ejs", {
        title: "Forum list",
        userData: req.session && req.session.user ? req.session.user : null,
        postStatusData: commonService.getForumStatus()
      })
    }
  )

  app.get('/forum', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    if(req.query["animalCategory"]) {
      return res.json(await commonService.getForumsAnimalTypes(req.query["animalCategory"]));
    }
    if(req.query["animalType"]) {
      return res.json(await commonService.getBreeds(req.query["animalType"]));
    }

    return res.render('forums/forum.ejs', {
      title: constants.PAGE_TITLE.FORUM_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      privacyData: await commonService.getPostPrivacy(),
      countryData: await commonService.getCountries(),
      postStatusData: commonService.getForumStatus(),
      specializations: await commonService.getSpecializations(),
      animalCategory: await commonService.getAnimalCategories(),
      animalTypes: await commonService.getForumsAnimalTypes(),
      users: await commonService.getUsers()
    });
  });

  app.post(
    '/forums',
    authRedirect(true),
    multer({
      limits: {
        files: 3,
        fileSize: 10485760,
      }
    }).array('newForumImages[]'),
    celebrate({
      body: Joi.object({
        question: Joi.string()
          .required()
          .error(new CustomError("Forum Question is required")),
        description: Joi.optional(), 
        category: Joi.string()
          .required()
          .error(new CustomError("Forum Category is invalid")), 
        // date: Joi.date()
        //   .required()
        //   .error(new CustomError("Date is required")), 
        status: Joi.string()
          .required()
          .error(new CustomError("Forum Status is required")),
        vet_only: Joi.optional(),
        privacy: Joi.string()
          .required()
          .error(new CustomError("Forum Privacy is invalid")),
        id: Joi.optional(),
        user_id: Joi.optional(),
        type: Joi.optional(),
        breed: Joi.optional(),
        animal_category: Joi.optional(),
        user: Joi.optional(),
        icon: Joi.optional(),
        specialization: Joi.optional(),
        country: Joi.optional(),
        specializationId: Joi.optional(),
        countryId: Joi.optional(),
        userId: Joi.optional(),
        typeId: Joi.optional(),
        breedId: Joi.optional(),
        categoryId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const forumsServices = new ForumsServices();
      forumsServices
        .addForum(req.body, req.session?.user.id, req.session?.user, req.files as Express.Multer.File[] || [])
        .then(() => {
          req.flash(
            'success',
            `Forum is created successfully.`,
            req,
            res
          );
          res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post(
    "/importForum",
    authRedirect(true),
    upload.single('forumFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const forumsServices = new ForumsServices();

      forumsServices
        .importForum(req.file, req.session?.user.id, req.session?.user)
        .then(() => {
          req.flash(
            "success",
            `Forums are added successfully.`,
            req,
            res
          )
          res.redirect("/admin/forums")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/forums/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      let order: any[] = [];
      let where: any = {};
      
      const statusValue = _.find(req.query.columns, { 'data': 'status' }).search.value;
      if (statusValue != '') {
        where = { [Op.and]: [] };

        where[Op.and].push({
          status: ForumStatus[statusValue] 
        });
      }
      if (req.query && req.query.search && req.query.search.value !== '') {
        const categoryFilterSubSQL = "SELECT DISTINCT(`forum_id`) AS `id` FROM `forums__animal_category` AS `ForumsCAtegories` INNER JOIN `animal_categories` AS `Categories` ON `ForumsCAtegories`.`animal-category_id` = `Categories`.`id` AND `Categories`.`category` LIKE '%" + req.query.search.value + "%'";
        const animalTypeFilterSubSQL = "SELECT DISTINCT(`forum_id`) AS `id` FROM `forums__animal_types` AS `ForumsAnimalTypes` INNER JOIN `animal_types` AS `Types` ON `ForumsAnimalTypes`.`animal-type_id` = `Types`.`id` AND `Types`.`type` LIKE '%" + req.query.search.value + "%'";

        const breedFilterSubSQL = "SELECT DISTINCT(`forum_id`) AS `id` FROM `forums__breeds` AS `ForumsBreeds` INNER JOIN `breeds` AS `Breeds` ON `ForumsBreeds`.`breed_id` = `Breeds`.`id` AND `Breeds`.`name` LIKE '%" + req.query.search.value + "%'";
        if (statusValue != '') {
          where = { [Op.and]: [], [Op.or]: [] };
          
          where[Op.and].push({
            status: ForumStatus[statusValue] 
          });

        } else {
          where = { [Op.or]: [] };
        }

        where[Op.or].push({
          id: {
            [Op.in]: Sequelize.literal(`(${categoryFilterSubSQL})`)
          }
        });

        where[Op.or].push({
          id: {
            [Op.in]: Sequelize.literal(`(${animalTypeFilterSubSQL})`)
          }
        });

        where[Op.or].push({
          id: {
            [Op.in]: Sequelize.literal(`(${breedFilterSubSQL})`)
          }
        });

        if (req.query.search['value'] != '') {
          where[Op.or].push(
            { question: { [Op.like]: `%${req.query.search.value}%` } },
            { description: { [Op.like]: `%${req.query.search.value}%` } },
            { category: { [Op.like]: `%${req.query.search.value}%` } });
        }
        console.log(where);

        req.query.search['value'] = '';

        // required = { required: true };
        // delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '8') {
        const orderBy = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'
        order = [["privacy", orderBy]];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '9') {
        const orderBy = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'
        order = [["status", orderBy]];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '10') {
        const orderBy = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'
        order = [["vet_only", orderBy]];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Forums, req.query, {
        distinct: true,
        // subQuery:false,   // Order by AnimalTypes and Breeds
        col: 'id',
        include: [
          {
            model: ForumsAnimalCategories, as: "ForumCategories", attributes: ["forum_id", "animal-category_id"],
            include: [
              {
                model: AnimalCategories,
                as: "Categories",
                attributes: ["category", "id"],
              },
            ],
          },
          {
            model: ForumsAnimalTypes, as: "ForumTypes", attributes: ["forum_id", "animal-type_id"],
            include: [
              {
                model: AnimalTypes,
                as: "Types",
                attributes: ["type", "id"],
              },
            ],
          },
          {
            model: ForumsBreeds, as: "ForumBreeds", attributes: ["forum_id", "breed_id"],
            include: [
              {
                model: Breeds,
                as: "Breeds",
                attributes: ["name", "id"]
              }
            ]
          },
          {
            model: UploadFileMorph, as: "ForumsIcon", attributes: ["id", "related_type"],
            where: { 'related_type': 'forums' },
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
      }).then(async (result: any) => {
        if (result && result.data) {
          for (let i = 0; i < result.data.length; i += 1) {
            result.data[i].categories = result.data[i].ForumCategories.filter((i: any)=> i.Categories !== null).map((item: any) => item.Categories.category);
            result.data[i].types = result.data[i].ForumTypes.filter((i: any)=> i.Types !== null).map((item: any) => item.Types.type);
            result.data[i].breeds = result.data[i].ForumBreeds.filter((i: any)=> i.Breeds !== null).map((item: any) => item.Breeds.name);
            result.data[i].status = ForumStatus[result.data[i].status];
          }
        }

        result.status = statusValue;
        res.json(result);
      })
    }
  )

  app.get(
    "/forums/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const forumsServices = new ForumsServices();
      const commonService = new CommonService();
      const profileService = new ProfileService();
      const forumId = req.params.id;
      
      forumsServices
        .getForum(+req.params.id)
        .then(async (responseData: any) => {
          responseData.status = ForumStatus[responseData.status];

          if(req.query["animalType"]) {
            return res.json(await commonService.getBreeds(req.query["animalType"], responseData.breedsTypeArray, true));
          }
          const userId = responseData.user_id;
          const forumUser = await profileService.getUserProfileByForumUserId(userId);

          const oldImageData = forumsServices.createImagePairsForUpdate(responseData);
          
          res.render("forums/forum.ejs", {
            title: constants.PAGE_TITLE.FORUM_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            forumId,
            forumUser,
            countryData: await commonService.getCountries(responseData.countryIdArray, true),
            specializations: await commonService.getSpecializations(responseData.specializationIdArray, true),
            postStatusData: commonService.getForumStatus(),
            privacyData: await commonService.getPostPrivacy(),
            animalCategory: await commonService.getAnimalCategories(responseData.categoriesArray, true),
            animalTypes: await commonService.getForumsAnimalTypes(responseData.typesArray,true),
            users: await commonService.getUsers(true),
            oldImageData
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/forums/update",
    multer({
      limits: {
        files: 3,
        fileSize: 10485760
      }
    }).array('newForumImages[]'),
    celebrate({
      body: Joi.object({
        oldForumFiles: Joi.array().items(Joi.number()).max(3).optional(),
        question: Joi.string()
          .required()
          .error(new CustomError("Forum Question is required")),
        description: Joi.optional(), 
        category: Joi.string()
          .required()
          .error(new CustomError("Forum Category is invalid")), 
        // date: Joi.date()
        //   .required()
        //   .error(new CustomError("Date is required")), 
        status: Joi.string()
          .required()
          .error(new CustomError("Forum Status is required")),
        vet_only: Joi.optional(),   
        privacy: Joi.string()
          .required()
          .error(new CustomError("Forum Privacy is invalid")),
        user_id: Joi.optional(),
        id: Joi.optional(),
        type: Joi.optional(),
        animal_category: Joi.optional(),
        breed: Joi.optional(),
        user: Joi.optional(),
        answerList_length: Joi.optional(),
        specialization: Joi.optional(),
        country: Joi.optional(),
        specializationId: Joi.optional(),
        countryId: Joi.optional(),
        userId: Joi.optional(),
        typeId: Joi.optional(),
        breedId: Joi.optional(),
        categoryId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const forumsServices = new ForumsServices();

      forumsServices
        .updateForum(req.body, req.session?.user.id, req.session?.user, req.files as Express.Multer.File[])
        .then(() => {
          req.flash(
            "success",
            `Forum is updated successfully.`,
            req,
            res
          )
          res.json({status: true})
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/forums/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const forumsServices = new ForumsServices();
      forumsServices
        .deleteForums(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Forum deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/forums")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

}
