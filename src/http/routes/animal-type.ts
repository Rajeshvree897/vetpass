// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import multer from 'multer';
import { celebrate, Joi } from "celebrate";
import { Sequelize, Op } from "sequelize";

import { authRedirect } from "../middlewares/index";
import AnimalTypes from "../../db/models/animal-types";
import AnimalCategories from "../../db/models/animal-categories";
import AnimalTypesService from "../../services/animal-type";
import constants from "../../helpers/constants";
import CommonService from "../../services/common";
import UploadFileMorph from "../../db/models/upload-file-morph";
import UploadFile from "../../db/models/upload-file";
import { CustomError } from "../../services/error-service";
import Breeds from "../../db/models/breeds";

export default (app: Router) => {
  app.get(
    "/animalTypes",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("animal-types/index.ejs", {
        title: "Animal Type list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.post("/animalType/validateStatus", authRedirect(true), async (req: Request, res: Response) => {
    const result = await Breeds.count({ where: { animal_type: req.body.id } });
    return res.json({response: result});
  });

  app.get('/animalType', authRedirect(true), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    res.render('animal-types/animal-type.ejs', {
      title: constants.PAGE_TITLE.ANIMAL_TYPE_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
      animalCategory: await commonService.getAnimalCategories()
    });
  });

  app.post(
    '/animalTypes',
    authRedirect(true),
    multer().single('icon'),
    celebrate({
      body: Joi.object({
        type: Joi.string()
          .required()
          .error(new CustomError("Type is required")),
        id: Joi.optional(),
        category: Joi.string()
          .optional()
          .error(new CustomError("Category is invalid")),
        status: Joi.string()
          .required()
          .error(new CustomError("Animal Type Status is required")),  
        categoryId: Joi.optional(),
      }),
    }),
    async (req: any, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      req.body.animal_category = req.body.categoryId;
      
      const animalTypesService = new AnimalTypesService();
      animalTypesService
        .addAnimalType(req.body, req.file)
        .then(() => {
          req.flash(
            'success',
            `Animal type is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/animalTypes');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/animalTypes/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let order:any[] = [];
      let where:any = {};
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ { '$AnimalCategories.category$' : { [Op.like]: `%${req.query.search.value}%` }}, { type: { [Op.like]: `%${req.query.search.value}%` } } ] }
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [ [ Sequelize.literal('`AnimalCategories`.`category`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '4') {
        const orderBy = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'
        order = [ [ "status", orderBy ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(AnimalTypes, req.query, {
        
        attributes: [
          "id",
          "created_at",
          "type",
          "status",
          [Sequelize.col("AnimalTypesIcon.UploadFile.url"), "icon"],
          [Sequelize.col("AnimalCategories.category"), "category"],
        ],
        include: [
          { model: UploadFileMorph , as: "AnimalTypesIcon", attributes: [ "id", "related_type"],
          where: {'related_type': 'animal_types' },
          required: false,
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id"]
            }
          ]},
          {
            model: AnimalCategories, as: "AnimalCategories", attributes: []
          }
        ],
        where,
        order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/animalTypes/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalTypesService = new AnimalTypesService();
      animalTypesService
        .getAnimalType(+req.params.id)
        .then(async (responseData: any) => {
          const commonService = new CommonService();
          res.render("animal-types/animal-type.ejs", {
            title: constants.PAGE_TITLE.ANIMAL_TYPE_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
            animalCategory: await commonService.getAnimalCategories(responseData.animal_category,true)
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/animalTypes/update",
    multer().single('icon'),
    celebrate({
      body: Joi.object({
        type: Joi.string()
          .required()
          .error(new CustomError("Type is required")),
        id: Joi.optional(),
        category: Joi.string()
          .optional()
          .error(new CustomError("Category is invalid")),
        status: Joi.string()
          .required()
          .error(new CustomError("Animal Type Status is required")),
        categoryId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalTypesService = new AnimalTypesService();

      animalTypesService
        .updateAnimalType(req.body, req.session?.user.id, req.body.categoryId, req.file)
        .then(() => {
          req.flash(
            "success",
            `Animal type is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/animalTypes")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/animalTypes/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalTypesService = new AnimalTypesService();
      animalTypesService
        .deleteAnimalTypes(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Animal type deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/animalTypes")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
