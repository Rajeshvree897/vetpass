// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"

import { authRedirect } from "../middlewares/index"
import UnAvailabilities from "../../db/models/unavailabilities"
import UnAvailabilitiesService from "../../services/unavailabilties"
import { celebrate, Joi } from "celebrate"
import { CustomError } from "../../services/error-service"

export default (app: Router) => {
  app.post(
    '/unavailabilities',
    celebrate({
      body: Joi.object({
        user_id: Joi.string()
          .required()
          .error(new CustomError("User id is required")),
        description: Joi.string()
          .allow('', null).optional().max(255),
        date: Joi.string()
          .required()
          .error(new CustomError("Date is required")),
        is_full_day: Joi.string()
          .required()
          .error(new CustomError("Is full day is required")),
        slotId: Joi.any(),
        unAvilId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .addUnAvailabilities(req.body, req.body.slotId)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );
  app.post(
    '/serviceprovider-unavailabilities',
    celebrate({
      body: Joi.object({
        user_id: Joi.string()
          .required()
          .error(new CustomError("User id is required")),
        description: Joi.string()
          .allow('', null).optional().max(255),
        date: Joi.string()
          .required()
          .error(new CustomError("Date is required")),
        is_full_day: Joi.string()
          .required()
          .error(new CustomError("Is full day is required")),
        unavaavailableSlotTimes: Joi.any(),
        unAvilId: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      req.body.created_by = req.session?.user.id;
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .addServiceProviderUnAvailabilities(req.body, req.body.unavaavailableSlotTimes, req.session?.user.timeZone)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.get(
    "/unavailabilities/data/:userId",
    authRedirect(true),
    (req: Request, res: Response) => {
    //   if (req.query && req.query.order && req.query.order[0].column === '2') {
    //     req.query.order[0].dir = req.query.order[0].dir === 'asc' ? 'desc' : 'asc'; 
    //   }
      datatable(UnAvailabilities, req.query, {
          where: { user_id: req.params.userId }
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/unavailabilities/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .getUnAvailabilities(+req.params.id, req.session?.user.timeZone)
        .then((data: any) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
//get service provider unavaibility 
app.get(
  "/serviceprovider-unavailabilities/:id",
  authRedirect(true),
  (req: Request, res: Response, next: NextFunction) => {
    const unAvailabilitiesService = new UnAvailabilitiesService();
    unAvailabilitiesService
      .getServiceProviderUnAvailabilities(+req.params.id, req.session?.user.timeZone)
      .then((data: any) => {
        return res.json({data});
      })
      .catch((error: Error) => {
        return next(error)
      })
  }
)
  app.post(
    "/unavailabilities/update",
    celebrate({
      body: Joi.object({
        user_id: Joi.string()
          .required()
          .error(new CustomError("User id is required")),
        description: Joi.string()
          .allow('', null).optional().max(255),
        date: Joi.string()
          .required()
          .error(new CustomError("Date is required")),
        is_full_day: Joi.string()
          .required()
          .error(new CustomError("Is full day is required")),
        slotId: Joi.any(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .updateUnavailabilities(req.body, req.session?.user.id)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/service-provider/unavailabilities/update",
    celebrate({
      body: Joi.object({
        user_id: Joi.string()
          .required()
          .error(new CustomError("User id is required")),
        description: Joi.string()
          .allow('', null).optional().max(255),
        date: Joi.string()
          .required()
          .error(new CustomError("Date is required")),
        is_full_day: Joi.string()
          .required()
          .error(new CustomError("Is full day is required")),
        unavaavailableSlotTimes: Joi.any(),
        id: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .serviceProviderUpdateUnavailabilities(req.body, req.session?.user.id, req.session?.user.timeZone)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/unavailabilities/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .deleteUnavailabilities(+req.params.id)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/serviceprovider-unavailabilities/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .deleteServiceProviderUnavailabilities(+req.params.id)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  ) 

  app.post(
    "/unavailabilities/getSlots",
    celebrate({
      body: Joi.object({
        user_id: Joi.number(),
        date: Joi.date(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .getSlots(req.body.user_id, req.body.date, req.session?.user.timeZone)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/unavailabilities/getTimes",
    celebrate({
      body: Joi.object({
        user_id: Joi.number(),
        date: Joi.date(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const unAvailabilitiesService = new UnAvailabilitiesService();
      unAvailabilitiesService
        .getDayTime(req.body.user_id, req.body.date, req.session?.user.timeZone)
        .then((data) => {
          return res.json({data});
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
