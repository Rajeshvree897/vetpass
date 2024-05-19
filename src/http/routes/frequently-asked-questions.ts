// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"

import { authRedirect } from "../middlewares/index"
import FrequentlyAskedQuestionsService from "../../services/frequently-asked-questions"
import constants from "../../helpers/constants"
import { celebrate, Joi } from "celebrate"
import FrequentlyAskedQuestions from "../../db/models/frequently-asked-questions"
import { CustomError } from "../../services/error-service"

export default (app: Router) => {
  app.get(
    "/questions",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("frequently-asked-questions/index.ejs", {
        title: "Frequently Asked Questions list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get('/question', authRedirect(true), (req: Request, res: Response) => {
    res.render('frequently-asked-questions/frequently-asked-question.ejs', {
      title: constants.PAGE_TITLE.QUESTION_ADD,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/questions',
    celebrate({
      body: Joi.object({
        question: Joi.string()
          .required()
          .error(new CustomError("Question is required")),
        answer: Joi.string()
          .required()
          .error(new CustomError("Answer is required")),
        id: Joi.optional(),
        application: Joi.string()
          .required()
          .error(new CustomError("Application is required"))
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const frequentlyAskedQuestionsService = new FrequentlyAskedQuestionsService();
      frequentlyAskedQuestionsService
        .addQuestion(req.body)
        .then(() => {
          req.flash(
            'success',
            `Frequently Asked Question is created successfully.`,
            req,
            res
          );
          res.redirect('/admin/questions');
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/questions/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(FrequentlyAskedQuestions, req.query, { where : {is_deleted : null} }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/questions/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const frequentlyAskedQuestionsService = new FrequentlyAskedQuestionsService();

      frequentlyAskedQuestionsService
        .getQuestion(+req.params.id)
        .then((responseData: any) => {
          res.render("frequently-asked-questions/frequently-asked-question.ejs", {
            title: constants.PAGE_TITLE.QUESTION_EDIT,
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
    "/questions/update",
    celebrate({
      body: Joi.object({
        question: Joi.string()
          .required()
          .error(new CustomError("Question is required")),
          answer: Joi.string()
          .required()
          .error(new CustomError("Answer is required")),
        id: Joi.optional(),
        application: Joi.string()
          .required()
          .error(new CustomError("Application is required"))
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const frequentlyAskedQuestionsService = new FrequentlyAskedQuestionsService();

      frequentlyAskedQuestionsService
        .updateQuestion(req.body, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Frequently Asked Question is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/questions")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/questions/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const frequentlyAskedQuestionsService = new FrequentlyAskedQuestionsService();
      frequentlyAskedQuestionsService
        .deleteQuestions(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Frequently Asked Questions deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/questions")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
