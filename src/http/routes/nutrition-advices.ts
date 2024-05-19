// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";

import { authRedirect } from "../middlewares/index";
import NutritionAdvicesService from "../../services/nutrition-advices";
import CommonService from "../../services/common";
import constants from "../../helpers/constants";
import NutritionAdvices from "../../db/models/nutrition-advices";
import NutritionAdvicesBreeds from "../../db/models/nutrition-advices-breeds";
import AnimalTypes from "../../db/models/animal-types";
import Breeds from "../../db/models/breeds";
// import NutritionAdvicesAgeDropDowns from "../../db/models/nutrition-advices-age-drop-downs";
import NutritionAdvicesAnimalTypes from "../../db/models/nutrition-advices-animal-types";
import AgeDropDowns from "../../db/models/age-drop-downs";
import upload from "../../helpers/file-upload";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/nutritionAdvices",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("nutrition-advices/index.ejs", {
        title: "Health Concerns list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/nutritionAdvice', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    if(req.query["animalType"]) {
      return res.json(await commonService.getBreeds(req.query["animalType"]));
    }
    return res.render('nutrition-advices/nutrition-advice.ejs', {
      title: constants.PAGE_TITLE.NUTRITION_ADVICES_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      animalTypes: await commonService.getAnimalTypes(),
      ages: await commonService.getAges(),
    });
  });

  app.post(
    '/nutritionAdvices',
    celebrate({
      body: Joi.object({
        question: Joi.string()
          .required()
          .error(new CustomError("Question is required")),
        answer: Joi.string()
          .required()
          .error(new CustomError("Answer is required")),
        age_drop_downs: Joi.string().allow('', null).optional(),
        order: Joi.number()
          .required()
          .error(new CustomError("Order is required")),
        id: Joi.optional(),
        type: Joi.optional(),
        breed: Joi.optional(),
        age: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const nutritionAdvicesService = new NutritionAdvicesService();
      nutritionAdvicesService
        .addNutritionAdvice(req.body)
        .then(() => {
          req.flash(
            'success',
            `Health Concern is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/nutritionAdvices');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post(
    "/importNutritionAdvice",
    authRedirect(true),
    upload.single('nutritionFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();

      nutritionAdvicesService
        .importNutritionAdvice(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Health Concerns are added successfully.`,
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

  app.get(
    "/nutritionAdvices/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      let order:any[] = [];
      let where:any = {};
      let required:any = {};
      let ids:any[] = [];
      let orderBy:any;
      if(req.query && req.query.search && req.query.search.value !== '') {
        // if(!isNaN(parseInt(req.query.search.value))) {
          // const age = await NutritionAdvicesAgeDropDowns.findAll({
          //   attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nutrition_advice_id')), 'nutrition_advice_id']],
          //   include: [{
          //     model: AgeDropDowns,
          //     as: "Ages",
          //     attributes: [],
          //     where: { age: parseInt(req.query.search.value) },
          //     required: true
          //   }],
          //   group: "nutrition_advice_id"
          // });
          // ids.push(...age.map((item: any) => {return item.id}));
          // }
        const age = await AgeDropDowns.findAll({
          where: { age: { [Op.like]: `%${req.query.search.value}%` } },
        })
        const type = await NutritionAdvicesAnimalTypes.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nutrition_advice_id')), 'nutrition_advice_id']],
          include: [{
            model: AnimalTypes,
            as: "Types",
            attributes: [],
            where: { type: { [Op.like]: `%${req.query.search.value}%` } },
            required: true
          }],
          group: "nutrition_advice_id"
        });
        const breed = await NutritionAdvicesBreeds.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nutrition_advice_id')), 'nutrition_advice_id']],
          include: [{
            model: Breeds,
            as: "Breeds",
            attributes: [],
            where: { name: { [Op.like]: `%${req.query.search.value}%` } },
            required: true
          }],
          group: "nutrition_advice_id"
        });
        ids.push(...type.map((item: any) => {return item.nutrition_advice_id}), ...breed.map((item: any) => {return item.nutrition_advice_id}));
        where = { [Op.or]: [
          { id : { [Op.in]: ids }},
          { age_drop_downs : { [Op.in]: age.map((i: any) => {return i.id}) }},
          { answer: { [Op.like]: `%${req.query.search.value}%` } },
          { question: { [Op.like]: `%${req.query.search.value}%` } },
          { order: { [Op.like]: `%${req.query.search.value}%` } }
        ] };
        delete req.query.search;
        required = { required: true };
        // delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [];
        order = [ [ Sequelize.literal('`AdviceTypes->Types`.`type`'), req.query.order[0].dir ] ];
        required = { required: true };
        orderBy = req.query.order[0].dir;
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '7') {
        order = [];
        order = [ 
          [ Sequelize.literal('`NutritionAdvices`.`order`'), req.query.order[0].dir ],
          [ Sequelize.literal('`NutritionAdvices`.`id`'), req.query.order[0].dir ],
        ];
        orderBy = req.query.order[0].dir;
        delete req.query.order;
      }
      where.is_deleted =  null;
      datatable(NutritionAdvices, req.query, {
        distinct: true,
        col: 'id',
        attributes: [
          "id",
          "question",
          "answer",
          "order",
          "created_at",
        ],
        include: [
          { model: AgeDropDowns, as: "AgeDropDowns", attributes: ["age", "id"] },
          // { model: NutritionAdvicesAgeDropDowns, as: "AdviceAges", attributes: ["nutrition_advice_id", "age-drop-down_id"],
          // include: [
          //   {
          //     model: AgeDropDowns,
          //     as: "Ages",
          //     attributes: ["age", "id"],
          //   }
          // ]},
          { model: NutritionAdvicesAnimalTypes, as: "AdviceTypes", attributes: ["nutrition_advice_id", "animal-type_id"],
          include: [
            {
              model: AnimalTypes,
              as: "Types",
              attributes: ["type", "id"],
            },
          ],
        },
          { model: NutritionAdvicesBreeds, as: "AdviceBreeds", attributes: ["nutrition_advice_id", "breed_id"],
          include: [
            {
              model: Breeds,
              as: "Breeds",
              attributes: ["name", "id"]
            }
          ]},
        ],
        where,
        order
      }).then(async (result: any) => {
        if (result && result.data) {
          for (let i = 0; i < result.data.length; i += 1) {
            result.data[i].ages = result.data[i].AgeDropDowns && result.data[i].AgeDropDowns.age ? result.data[i].AgeDropDowns.age : "";
            const types = result.data[i].AdviceTypes.filter((i: any)=> i.Types !== null).map((item: any) => item.Types.type);
            result.data[i].types = [...new Set(types.map((i: any) => i))];
            result.data[i].breeds = result.data[i].AdviceBreeds.filter((i: any)=> i.Breeds !== null).map((item: any) => item.Breeds.name);
          }
        }
        res.json(result)
      })
    }
  )

  app.get(
    "/nutritionAdvices/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();

      nutritionAdvicesService
        .getNutritionAdvice(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();
          if(req.query["animalType"]) {
            return res.json(await commonService.getBreeds(req.query["animalType"], responseData.breedsTypeArray, true));
          }
          return res.render("nutrition-advices/nutrition-advice.ejs", {
            title: constants.PAGE_TITLE.NUTRITION_ADVICES_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            animalTypes: await commonService.getAnimalTypes(responseData.animalTypeArray, true),
            ages: await commonService.getAges(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/nutritionAdvices/update",
    celebrate({
      body: Joi.object({
        question: Joi.string()
          .required()
          .error(new CustomError("Question is required")),
        answer: Joi.string()
          .required()
          .error(new CustomError("Answer is required")),
        age_drop_downs: Joi.string().allow('', null).optional(),
        order: Joi.number()
          .required()
          .error(new CustomError("Order is required")),  
        id: Joi.optional(),
        type: Joi.optional(),
        breed: Joi.optional(),
        age: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();

      nutritionAdvicesService
        .updateNutritionAdvice(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Health Concern is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/nutritionAdvices")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/nutritionAdvices/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();
      nutritionAdvicesService
        .deleteNutritionAdvices(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Health Concern deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/nutritionAdvices")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/nutritionAdvices/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();
      nutritionAdvicesService
        .deleteMultipleNutritionAdvices(req.body.id)
        .then(() => {
          return res.json({data: true});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/nutritionAdvices/updateOrder",
    celebrate({
      body: Joi.object({
        id: Joi.number(),
        order: Joi.number(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const nutritionAdvicesService = new NutritionAdvicesService();
      nutritionAdvicesService
        .updateOrder(req.body.id, req.body.order)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
