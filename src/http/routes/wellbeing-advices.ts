// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";

import { authRedirect } from "../middlewares/index";
import WellbeingAdvicesService from "../../services/wellbeing-advices";
import CommonService from "../../services/common";
import constants from "../../helpers/constants";
import WellbeingAdvices from "../../db/models/first-aid-advices";
import WellbeingAdvicesBreeds from "../../db/models/first-aid-advices-breeds";
import AnimalTypes from "../../db/models/animal-types";
import Breeds from "../../db/models/breeds";
import WellbeingAdvicesAnimalTypes from "../../db/models/first-aid-advices-animal-types";
import AgeDropDowns from "../../db/models/age-drop-downs";
import upload from "../../helpers/file-upload";
// import FirstAidAdvicesAgeDropDowns from "../../db/models/first-aid-advices-age-drop-downs";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/wellbeingAdvices",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("wellbeing-advices/index.ejs", {
        title: "Wellbeing Advices list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/wellbeingAdvice', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    if (req.query["animalType"]) {
      return res.json(await commonService.getBreeds(req.query["animalType"]));
    }
    return res.render('wellbeing-advices/wellbeing-advice.ejs', {
      title: constants.PAGE_TITLE.WELLBEING_ADVICES_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      animalTypes: await commonService.getAnimalTypes(),
      ages: await commonService.getAges(),
    });
  });

  app.post(
    '/wellbeingAdvices',
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
      const wellbeingAdvicesService = new WellbeingAdvicesService();
      wellbeingAdvicesService
        .addWellbeingAdvice(req.body)
        .then(() => {
          req.flash(
            'success',
            `Wellbeing Advice is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/wellbeingAdvices');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/wellbeingAdvices/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      let order:any[] = [];
      let where:any = {};
      let required:any = {};
      let ids:any[] = [];
      if(req.query && req.query.search && req.query.search.value !== '') {
        // if(!isNaN(parseInt(req.query.search.value))) {
          // const age = await FirstAidAdvicesAgeDropDowns.findAll({
          //   attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('first_aid_advice_id')), 'first_aid_advice_id']],
          //   include: [{
          //     model: AgeDropDowns,
          //     as: "Ages",
          //     attributes: [],
          //     where: { age: parseInt(req.query.search.value) },
          //     required: true
          //   }],
          //   group: "first_aid_advice_id"
          // });
          // ids.push(...age.map((item: any) => {return item.first_aid_advice_id}));
        // }
        const age = await AgeDropDowns.findAll({
          where: { age: { [Op.like]: `%${req.query.search.value}%` } },
        })
        const type = await WellbeingAdvicesAnimalTypes.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('first_aid_advice_id')), 'first_aid_advice_id']],
          include: [{
            model: AnimalTypes,
            as: "Types",
            attributes: [],
            where: { type: { [Op.like]: `%${req.query.search.value}%` } },
            required: true
          }],
          group: "first_aid_advice_id"
        });
        const breed = await WellbeingAdvicesBreeds.findAll({
          attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('first_aid_advice_id')), 'first_aid_advice_id']],
          include: [{
            model: Breeds,
            as: "Breeds",
            attributes: [],
            where: { name: { [Op.like]: `%${req.query.search.value}%` } },
            required: true
          }],
          group: "first_aid_advice_id"
        });
        ids.push(...type.map((item: any) => {return item.first_aid_advice_id}), ...breed.map((item: any) => {return item.first_aid_advice_id}));
        where = { [Op.or]: [
          { id : { [Op.in]: ids }},
          { age_drop_downs : { [Op.in]: age.map((i: any) => {return i.id}) }}, 
          { answer: { [Op.like]: `%${req.query.search.value}%` } },
          { question: { [Op.like]: `%${req.query.search.value}%` } },
          { order: { [Op.like]: `%${req.query.search.value}%` } } 
        ] };
        delete req.query.search;
        required = { required: true };
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [ [ Sequelize.literal('`AdviceTypes->Types`.`type`'), req.query.order[0].dir ] ];
        required = { required: true };
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '7') {
        order = [];
        order = [ 
          [ 'order', req.query.order[0].dir ],
          [ 'id', req.query.order[0].dir ],
        ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(WellbeingAdvices, req.query, {
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
          // { model: FirstAidAdvicesAgeDropDowns, as: "AdviceAges", attributes: ["first_aid_advice_id", "age-drop-down_id"],
          // duplicating: false,
          // include: [
          //   {
          //     model: AgeDropDowns,
          //     as: "Ages",
          //     attributes: ["age", "id"],
          //   }
          // ]},
          { model: WellbeingAdvicesAnimalTypes, as: "AdviceTypes", attributes: ["first_aid_advice_id", "animal-type_id"],
          include: [
            {
              model: AnimalTypes,
              as: "Types",
              attributes: ["type", "id"],
              order: []
            },
          ],
          order: [],
        },
          { model: WellbeingAdvicesBreeds, as: "AdviceBreeds", attributes: ["first_aid_advice_id", "breed_id"],
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
    "/wellbeingAdvices/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const wellbeingAdvicesService = new WellbeingAdvicesService();

      wellbeingAdvicesService
        .getWellbeingAdvice(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();
          if (req.query["animalType"]) {
            res.json(await commonService.getBreeds(req.query["animalType"], responseData.breedsTypeArray, true));
          }
          res.render("wellbeing-advices/wellbeing-advice.ejs", {
            title: constants.PAGE_TITLE.WELLBEING_ADVICES_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            animalTypes: await commonService.getAnimalTypes(responseData.animalTypesArray, true),
            ages: await commonService.getAges(),
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/wellbeingAdvices/update",
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
      const wellbeingAdvicesService = new WellbeingAdvicesService();

      wellbeingAdvicesService
        .updateWellbeingAdvice(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Wellbeing Advices is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/wellbeingAdvices")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/importWellbeingAdvice",
    authRedirect(true),
    upload.single('wellbeingFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const wellbeingAdvicesService = new WellbeingAdvicesService();

      wellbeingAdvicesService
        .importWellbeingAdvice(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Wellbeing Advices are added successfully.`,
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
    "/wellbeingAdvices/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const wellbeingAdvicesService = new WellbeingAdvicesService();
      wellbeingAdvicesService
        .deletewellbeingAdvices(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Wellbeing Advice deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/wellbeingAdvices")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/wellbeingAdvices/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const wellbeingAdvicesService = new WellbeingAdvicesService();
      wellbeingAdvicesService
        .deleteMultipleWellbeingAdvices(req.body.id)
        .then(() => {
          return res.json({data: true});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/wellbeingAdvices/updateOrder",
    celebrate({
      body: Joi.object({
        id: Joi.number(),
        order: Joi.number(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const wellbeingAdvicesService = new WellbeingAdvicesService();
      wellbeingAdvicesService
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
