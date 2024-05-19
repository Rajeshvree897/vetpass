// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { Sequelize, Op } from "sequelize";

import { authRedirect } from "../middlewares/index";
import BreedsService from "../../services/breed";
import CommonService from "../../services/common";
import constants from "../../helpers/constants";
import { celebrate, Joi } from "celebrate";
import Breeds from "../../db/models/breeds";
import AnimalTypes from "../../db/models/animal-types";
import { CustomError } from "../../services/error-service";

export default (app: Router) => {
  app.get(
    "/breeds",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("breeds/index.ejs", {
        title: "Breed list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/breed', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    res.render('breeds/breed.ejs', {
      title: constants.PAGE_TITLE.BREED_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      animalTypes: await commonService.getAnimalTypes()
    });
  });

  app.post(
    '/breeds',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Breed is required")),
        type: Joi.string()
          .optional()
          .error(new CustomError("Type is invalid")),
        status: Joi.string()
          .required()
          .error(new CustomError("Brred Status is required")),
        id: Joi.optional(),
        typeId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      req.body.animal_type = req.body.typeId;
      const breedsService = new BreedsService();
      breedsService
        .addBreed(req.body)
        .then(() => {
          req.flash(
            'success',
            `Breed is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/breeds');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/breeds/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let order:any[] = [];
      let where:any = {};
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ { '$AnimalTypes.type$' : { [Op.like]: `%${req.query.search.value}%` }}, { name: { [Op.like]: `%${req.query.search.value}%` } } ] }
        delete req.query.search;
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [ [ Sequelize.literal('`AnimalTypes`.`type`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '3') {
        req.query.order[0].dir = req.query.order[0].dir === 'asc' ? 'desc' : 'asc';
      }
      where.is_deleted = null;
      datatable(Breeds, req.query, {
        attributes: ['id', 'name', 'status', [Sequelize.col("AnimalTypes.type"), "type"]],
        include: [
          { model: AnimalTypes, as: "AnimalTypes", attributes: ["type", "id"] }
        ],
        order,
        where
      }).then(async (result: any) => {
        // result.data = result.data.map((breed: any) => {
        //   return AnimalTypes.findOne({where: { id: breed.animal_type }}).then((animalTypes: AnimalTypes | null) => {
        //     breed.type = animalTypes?.type || '';
        //     return breed;
        //   })
        // });

        // Resolve all pending promises
        // result.data = await Promise.all(result.data);
        res.json(result);
      })
    }
  )

  app.get(
    "/breeds/getByAnimalType",
    authRedirect(true),
    async (req: Request, res: Response) => {
      const commonService = new CommonService();
      let animalType: any = '';
      if (req.query["animalType"]) {
        animalType = req.query["animalType"];
      }
      return res.json(await commonService.getBreeds(animalType));
    });

  app.get(
    "/breeds/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const commonService = new CommonService();
      const breedsService = new BreedsService();

      breedsService
        .getBreed(+req.params.id)
        .then(async (responseData: any) => {
          res.render("breeds/breed.ejs", {
            title: constants.PAGE_TITLE.BREED_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            animalTypes: await commonService.getAnimalTypes(responseData.animal_type, true)
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/breeds/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Breed is required")),
        type: Joi.string()
          .optional()
          .error(new CustomError("Type is invalid")),
        status: Joi.string()
          .required()
          .error(new CustomError("Brred Status is required")),
        id: Joi.optional(),
        typeId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedsService = new BreedsService();
      breedsService
        .updateBreed(req.body, req.body.typeId, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Breed is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/breeds")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/breeds/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const breedsService = new BreedsService();
      breedsService
        .deleteBreeds(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Breed deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/breeds")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
