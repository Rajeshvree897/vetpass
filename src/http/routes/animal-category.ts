// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"

import { authRedirect } from "../middlewares/index"
import AnimalCategories from "../../db/models/animal-categories"
import AnimalCategoriesService from "../../services/animal-category"
import constants from "../../helpers/constants"
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"
import AnimalTypes from "../../db/models/animal-types";

export default (app: Router) => {
  app.get(
    "/animalCategories",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("animal-categories/index.ejs", {
        title: "Animal Category list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.post("/animalCategory/validateStatus", authRedirect(true), async (req: Request, res: Response) => {
    const result = await AnimalTypes.count({ where: { animal_category: req.body.id } });
    return res.json({response: result});
  });

  app.get('/animalCategory', authRedirect(true), (req: Request, res: Response) => {
    res.render('animal-categories/animal-category.ejs', {
      title: constants.PAGE_TITLE.ANIMAL_CATEGORY_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/animalCategories',
    celebrate({
      body: Joi.object({
        category: Joi.string()
          .required()
          .error(new CustomError("Animal Category is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Animal Category Status is required")),
        order: Joi.string().optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const animalCategoriesService = new AnimalCategoriesService();
      animalCategoriesService
        .addAnimalCategory(req.body)
        .then(() => {
          req.flash(
            'success',
            `Animal category is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/animalCategories');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/animalCategories/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        req.query.order[0].dir = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'; 
      }
      datatable(AnimalCategories, req.query, { where: { is_deleted : null }}).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/animalCategories/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalCategoriesService = new AnimalCategoriesService();

      animalCategoriesService
        .getAnimalCategory(+req.params.id)
        .then((responseData: any) => {
          res.render("animal-categories/animal-category.ejs", {
            title: constants.PAGE_TITLE.ANIMAL_CATEGORY_EDIT,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/animalCategories/update",
    celebrate({
      body: Joi.object({
        category: Joi.string()
          .required()
          .error(new CustomError("Animal Category is required")),
        status: Joi.string()
          .required()
          .error(new CustomError("Animal Category Status is required")),
        order: Joi.string().optional(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalCategoriesService = new AnimalCategoriesService();

      animalCategoriesService
        .updateAnimalCategory(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Animal category is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/animalCategories")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/animalCategories/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalCategoriesService = new AnimalCategoriesService();
      animalCategoriesService
        .deleteAnimalCategories(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Animal Category deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/animalCategories")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
