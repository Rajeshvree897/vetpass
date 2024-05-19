// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"
import ReportReasons from "../../db/models/report-reasons"
import ReportReasonService from "../../services/report-reasons"

export default (app: Router) => {
  app.get(
    "/report-reasons/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      reportReasonService
        .getreportReasonReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Post Report Reason": i.reason ? i.reason : '',
          }));
          return res.xls('reportReasonData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/report-reasons",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("report-reasons/index.ejs", {
        title: constants.PAGE_TITLE.REPORT_REASON_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/report-reasons/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(ReportReasons, req.query, {
        attributes: [
          "id",
          "reason",
        ],
        where: { is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/report-reason', authRedirect(true), async (req: Request, res: Response) => {
    res.render("report-reasons/report-reasons.ejs", {
      title: constants.PAGE_TITLE.REPORT_REASON_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/report-reasons',
    celebrate({
      body: Joi.object({
        reason: Joi.string()
          .required()
          .error(new CustomError("Report Reason is required")),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      const requestReportReasonsData: any = {};

      requestReportReasonsData.reason = req.body.reason;
      requestReportReasonsData.created_by = req?.session?.user?.id;

      reportReasonService
        .addReportReason(requestReportReasonsData)
        .then(() => {
          req.flash(
            'success',
            `Report Reason is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/report-reasons")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkReportReason", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { reason: req.body.reason, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await ReportReasons.count({ where: whereObj });
    return res.json({response: result});
  });
  

  app.get(
    "/report-reasons/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      reportReasonService
        .getReportReason(+req.params.id)
        .then(async (responseData: any) => {
          res.render("report-reasons/report-reasons.ejs", {
            title: constants.PAGE_TITLE.REPORT_REASON_ADD,
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  );

  app.post(
    "/report-reasons/update",
    celebrate({
      body: Joi.object({
        reason: Joi.string()
          .required()
          .error(new CustomError("Report Reason is required")),
        id: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      const requestReportReasonsData: any = {};

      requestReportReasonsData.reason = req.body.reason;
      requestReportReasonsData.sort_id = req.body.sort_id;
      requestReportReasonsData.id = req.body.id;

      reportReasonService
        .updateReportReason(requestReportReasonsData)
        .then(() => {
          req.flash(
            "success",
            `Report Reason is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/report-reasons")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/report-reasons/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      reportReasonService
        .deleteReportReason(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Report Reason deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/report-reasons")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/report-reasons/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();
      reportReasonService
        .deleteMultipleReportReasons(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Report Reasons are deleted successfully.`,
            req,
            res
          )
          return res.json({data: true});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
  
  app.post(
    "/importReportReasons",
    authRedirect(true),
    upload.single('file'),
    async (req: any, res: Response, next: NextFunction) => {
      const reportReasonService = new ReportReasonService();

      reportReasonService
        .importReportReason(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Report Reasons are imported successfully.`,
            req,
            res
          )
          res.json({ status: true })
        })
        .catch((error: Error) => {
          req.flash(
            "error",
            error.message,
            req,
            res
          )
          res.json({status: false})
          //return next(error)
        })
    }
  )
}