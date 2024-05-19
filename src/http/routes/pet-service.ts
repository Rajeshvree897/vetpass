// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import upload from "../../helpers/file-upload";
import { Op, where } from "sequelize"
import PetService from "../../services/pet-services"
import PetServices from "../../db/models/pet-services"
export default (app: Router) => {
  app.get(
    "/pet-services/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const petService = new PetService();
      petService
        .getPetServiceReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Pet Service Name": i.name ? i.name : '',
          }));
          return res.xls('petServiceData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/pet-services",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("pet-services/index.ejs", {
        title: constants.PAGE_TITLE.PET_SERVICE_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/pet-services/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(PetServices, req.query, {
        attributes: [
          "id",
          "name",
        ],
        where: { is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/pet-service', authRedirect(true), async (req: Request, res: Response) => {
    res.render("pet-services/pet-services.ejs", {
      title: constants.PAGE_TITLE.PET_SERVICE_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/pet-service',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Pet Service Name is required")),
        id: Joi.optional(),
        order: Joi.string().optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const petService = new PetService();
      const requestPetServiceData: any = {};

      requestPetServiceData.name = req.body.name;
      requestPetServiceData.order = req.body.order;
      requestPetServiceData.created_by = req?.session?.user?.id;

      petService
        .addPetService(requestPetServiceData)
        .then(() => {
          req.flash(
            'success',
            `Pet Service is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/pet-services")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkPetServicesName", authRedirect(true), async (req: Request, res: Response) => {
    console.log("fvfvfvf")
    const whereObj:any = { name: req.body.name, is_deleted : null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await PetServices.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/pet-services/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const petService = new PetService();
      petService
        .getPetService(+req.params.id)
        .then(async (responseData: any) => {
          res.render("pet-services/pet-services.ejs", {
            title: constants.PAGE_TITLE.PET_SERVICE_ADD,
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
    "/pet-service/update",
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .required()
          .error(new CustomError("Pet Service Name is required")),
        id: Joi.optional(),
        order: Joi.string().optional(),
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const petService = new PetService();
      const requestPetServiceData: any = {};

      requestPetServiceData.name = req.body.name;
      requestPetServiceData.order = req.body.order;
      requestPetServiceData.id = req.body.id;

      petService
        .updatePetService(requestPetServiceData)
        .then(() => {
          req.flash(
            "success",
            `Pet Service is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/pet-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/pet-services/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const petService = new PetService();
      petService
        .deletePetService(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Pet Service deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/pet-services")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/pet-services/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const petService = new PetService();
      petService
        .deleteMultiplePetServices(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Pet Services are deleted successfully.`,
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
    "/importPetServices",
    authRedirect(true),
    upload.single('pet_serviceFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const petService = new PetService();

      petService
        .importPetService(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Pet Services are added successfully.`,
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