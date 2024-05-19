// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import Forums from "../../db/models/forums"
import ForumsServices from "../../services/forum"
import { Sequelize, Op } from "sequelize";
import { authRedirect } from "../middlewares/index";
import ForumsAnswers from "../../db/models/forums-answers";
import User from "../../db/models/user";

export default (app: Router) => {

  app.get(
    "/forums/:id/answers",
    authRedirect(true),
    async (req: Request, res: Response) => {
      const forum = await Forums.findOne({
        where: { id: req.params.id },
        attributes:['question', 'description'],
        raw: true
      });
      
      res.render("forums/answers/index.ejs", {
        title: "Forum answers",
        userData: req.session && req.session.user ? req.session.user : null,
        forumId: req.params.id,
        forum: forum
      })
    }
  )

  app.get(
    "/forums/:id/answers/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let forumId = req.params.id
      let order: any[] = [];
      let where: any = { forum_id: forumId };

      if (req.query && req.query.search && req.query.search.value !== '') {
        where = {
          forum_id: forumId,
          [Op.or]: [
            { answer: { [Op.like]: `%${req.query.search.value}%` } },
            { '$Users.first_name$': { [Op.like]: `%${req.query.search.value}%` } },
            { '$Users.last_name$': { [Op.like]: `%${req.query.search.value}%` } },
          ]
        }
        delete req.query.search;
      }
      if (req.query && req.query.order && req.query.order[0].column === '2') {
        order = [[Sequelize.literal('`Users`.`first_name`'), req.query.order[0].dir]];
        delete req.query.order;
      }
      if (req.query && req.query.order && req.query.order[0].column === '3') {
        order = [[Sequelize.literal('`Users`.`last_name`'), req.query.order[0].dir]];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(ForumsAnswers, req.query, {
        attributes: ['id', 'answer', 'user_id'],
        include: [
          { model: User, as: "Users", attributes: ["first_name", "last_name", "id"] }
        ],
        order,
        where
      }).then(async (result: any) => {
        if (result && result.data) {
          for (let i = 0; i < result.data.length; i += 1) {
            result.data[i].first_name = result.data[i].Users && result.data[i].Users.first_name || "";
            result.data[i].last_name = result.data[i].Users && result.data[i].Users.last_name || "";
          }
        }
        res.json(result);
      })
    }
  )

  app.get(
    "/forums/:forumId/answers/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const forumsServices = new ForumsServices();
      const forumId: number = parseInt(req.params.forumId);
      const id: number = parseInt(req.params.id);
      forumsServices
        .deleteAnswers(forumId, id)
        .then(() => {
          req.flash(
            "success",
            "Answer deleted successfully.",
            req,
            res
          )
          res.redirect(`/admin/forums/${forumId}/answers`);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

}
