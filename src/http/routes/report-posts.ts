// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, col } from "sequelize"

import { authRedirect } from "../middlewares/index"
import Posts from "../../db/models/posts"
import User from "../../db/models/user"
import ReportPosts from "../../db/models/report-posts";
import ReportPostService from "../../services/report-post";
import constants from "../../helpers/constants"
import _ from "lodash"
import ReportPostsReasons from "../../db/models/report-posts-reasons"
import ReportReasons from "../../db/models/report-reasons"
import { PostStatus } from "../../types/common"
import { Op } from "sequelize"

export default (app: Router) => {
  app.get(
    "/report-posts",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("posts/reports/index.ejs", {
        title: constants.PAGE_TITLE.REPORT_POST_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/report-posts/data",
    authRedirect(true),
    async (req: Request, res: Response) => {
      let where: any = {};
      
      if (req.query && req.query.search && req.query.search.value !== '') {
        where = { [Op.or]: [] };

        if (req.query.search['value'] != '') {
          where[Op.or].push(
            { "$post.title$": { [Op.like]: `%${req.query.search.value}%` } },
            Sequelize.where(Sequelize.fn('concat', Sequelize.col('`user`.`first_name`'), ' ', Sequelize.col('`user`.`last_name`')), {
              [Op.like]: `%${req.query.search.value}%`
            }));
        }

        req.query.search['value'] = '';
      }
      where.is_deleted = null;

      datatable(ReportPosts, req.query, {
        attributes: [
          "id",
          "post_id",
          "user_id",
          "created_at",
          [Sequelize.fn('CONCAT', col('`user`.`first_name`'), ' ', col('`user`.`last_name`')), 'user_name']
        ],
        include: [
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name']
          },
          {
            model: Posts,
            as: "post",
            required: false,
            attributes: ['title']
          }
        ],
        where
      }).then(async (result: any) => {
        _.map(result.data, (postReport) => {
          const postData = postReport.post;
          postReport.post = {};
          postReport.post.title = (postData && postData.title) ? postData.title : '';

          return postReport;
        });
        res.json(result);
      })
    }
  )

  app.get(
    "/report-posts/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportPostService = new ReportPostService();

      reportPostService
        .getReportPost(+req.params.id)
        .then(async (reportPostData: any) => {
          const reportReasonsData = await reportPostData.getReportReasons({
            include: [
              {
                model: ReportReasons,
                as: "reason",
                required: false,
                attributes: ['id', 'reason']
              }
            ]
          });

          const responseData: any = {};
          responseData.id = reportPostData.id;
          responseData.userName = reportPostData.user.first_name + ' ' + reportPostData.user.last_name;
          responseData.created_at = reportPostData.created_at;
          responseData.post = {};
          responseData.reasons = [];
          if(reportPostData.post){
            responseData.post.id = reportPostData.post.id;
            responseData.post.title = reportPostData.post.title ? reportPostData.post.title.length > 255 ? reportPostData.post.title?.substring(0, 255) + '...' : reportPostData.post.title : '-';
            responseData.post.statusVal = reportPostData.post.status;
            responseData.post.status = PostStatus[reportPostData.post.status];
          }

          reportReasonsData.forEach((reasonData: any) => {
            if(reasonData.reason){
              responseData.reasons.push(reasonData.reason.reason);
            }
          });
          

          res.render("posts/reports/report.ejs", {
            title: constants.PAGE_TITLE.REPORT_POST_VIEW,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/report-posts/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportPostService = new ReportPostService();
      reportPostService
        .deleteReportPost(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Report deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/report-posts")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
