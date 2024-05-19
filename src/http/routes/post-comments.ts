// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col, Op } from "sequelize"
const _ = require('lodash');

import { authRedirect } from "../middlewares/index"
import CommonService from "../../services/common"
import PostComments from "../../db/models/post-comments";
import User from "../../db/models/user";
import PostCommentService from "../../services/post-comment";

export default (app: Router) => {
  app.get(
    "/posts/:id/comments",
    authRedirect(true),
    (req: Request, res: Response) => {
      const commonService = new CommonService();

      res.render("posts/comments/index.ejs", {
        title: "Post list",
        userData: req.session && req.session.user ? req.session.user : null,
        postId: req.params.id
      })
    }
  )

  app.get(
    "/posts/:id/comments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      // Filters
      let where: any = {};
      where = { [Op.and]: [] };
      where[Op.and].push({
        '$post_id$': req.params.id 
      });
      
      if (req.query && req.query.search && req.query.search.value !== '') {
        where = { [Op.and]: [], [Op.or]: [] };
        where[Op.and].push({
          '$post_id$': req.params.id 
        });

        if (req.query.search['value'] != '') {
          where[Op.or].push(
            { comment: { [Op.like]: `%${req.query.search.value}%` } },
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('`user`.`first_name`'), ' ', Sequelize.col('`user`.`last_name`')), {
              [Op.like]: `%${req.query.search.value}%`
            }));
        }

        req.query.search['value'] = '';
      }

      datatable(PostComments, req.query, {
        attributes: [
          "id",
          "user_id",
          "comment",
          "created_at",
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name']
        ],
        include: [
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name']
          }
        ],
        where
      }).then((result: any) => {
        _.map(result.data, (postComment: any) => {
          return postComment;
        });

        res.json(result);
      })
    }
  )

  app.get(
    "/posts/:postId/comments/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const postCommentService = new PostCommentService();
      const postId: number = parseInt(req.params.postId);
      const id: number = parseInt(req.params.id);
      postCommentService
        .deletePostComment(postId, id)
        .then(() => {
          req.flash(
            "success",
            "Comment deleted successfully.",
            req,
            res
          )
          res.redirect(`/admin/posts/${postId}/comments`);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )
}
