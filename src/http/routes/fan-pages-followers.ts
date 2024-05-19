// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import User from "../../db/models/user"
import FanPages from "../../db/models/fan-pages";
import FanPageFollowers from "../../db/models/fan-page-followers"
import FanPageFollowerService from "../../services/fan-page-followers"

export default (app: Router) => {
  app.get(
    "/fanPages-followers",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("fan-pages/followers/index.ejs", {
        title: "Page Follower list",
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/fanPages-followers/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(FanPageFollowers, req.query, {
        include: [
          {
            model: FanPages,
            as: "fanPage",
            attributes: ["title"]  
          },
          {
            model: User,
            as: "user",
            required: false,
            attributes: ['first_name', 'last_name', 'email']
          },
        ],
        where: {
          status: null,
          is_deleted: null
        }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get(
    "/fanPages-followers/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPagefollowerService = new FanPageFollowerService();
      fanPagefollowerService
        .deleteFanPageFollower(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Page Follow Request deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/fanPages-followers")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/fanPages-followers/:id/approve",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPagefollowerService = new FanPageFollowerService();
      fanPagefollowerService
        .acceptFollowRequest(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Page Follow Request approved successfully.",
            req,
            res
          )
          res.redirect("/admin/fanPages-followers")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/fanPages-followers/:id/reject",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const fanPagefollowerService = new FanPageFollowerService();
      fanPagefollowerService
        .rejectFollowRequest(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Page Follow Request rejected successfully.",
            req,
            res
          )
          res.redirect("/admin/fanPages-followers")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
