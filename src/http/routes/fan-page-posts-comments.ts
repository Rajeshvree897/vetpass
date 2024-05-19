// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col, Op } from "sequelize"
const _ = require('lodash');

import { authRedirect } from "../middlewares/index"
import CommonService from "../../services/common"
import User from "../../db/models/user";
import FanPagePostComments from "../../db/models/fan-page-post-comments";
import FanPagePosts from "../../db/models/fan-page-posts";
import FanPagePostCommentService from "../../services/fan-page-post-comment";

export default (app: Router) => {
  app.get(
    "/fanPagePosts/:id/comments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("fan-pages/posts/comments/index.ejs", {
        title: "Fan Page Post list",
        userData: req.session && req.session.user ? req.session.user : null,
        fanPagePostId: req.params.id
      })
    }
  )

  app.get(
    "/fanPagePosts/:id/comments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      // Filters
      let where: any = {};
      where = {
        [Op.and]: [
          { '$fan_page_post_id$': req.params.id }
        ]
      };
      where.is_deleted = null;

      datatable(FanPagePostComments, req.query, {
        attributes: [
          "id",
          "fan_page_post_id",
          "user_id",
          "comment",
          "created_at",
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name']
        ],
        include: [
          {
            model: FanPagePosts,
            as: "fanPagePost",
            required: false,
            attributes: ['description'],
          },
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name']
          }
        ],
        where
      }).then((result: any) => {
        _.map(result.data, (fanPagePostComment: any) => {
          return fanPagePostComment;
        });

        res.json(result);
      })
    }
  )

  app.get(
    "/fanPagePosts/:fanPagePostId/comments/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPagePostCommentService = new FanPagePostCommentService();
      const fanPagePostId: number = parseInt(req.params.fanPagePostId);
      const id: number = parseInt(req.params.id);
      fanPagePostCommentService
        .deleteFanPagePostComment(fanPagePostId, id)
        .then(() => {
          req.flash(
            "success",
            "Comment deleted successfully.",
            req,
            res
          )
          res.redirect(`/admin/fanPagePosts/${fanPagePostId}/comments`);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )
}
