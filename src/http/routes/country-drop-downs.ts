// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { authRedirect } from "../middlewares/index"
import constants from "../../helpers/constants"
import { CustomError } from "../../services/error-service"
import { celebrate, Joi } from "celebrate"
import Country from "../../db/models/country"
import CountryService from "../../services/country-drop-downs"
import upload from "../../helpers/file-upload";
import { Op } from "sequelize"

export default (app: Router) => {
  app.get(
    "/countries/downloadReport",
    authRedirect(true),
    async (req: any, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      countryService
        .getCountryReportData()
        .then((responseData: any) => {
          responseData = responseData.map((i:any) => i.toJSON());
          responseData = responseData.map((i:any) => ({
            "ID": i.id ? i.id : '',
            "Country Name": i.country ? i.country : '',
            "Sort ID": i.sort_id ? i.sort_id : '',
            "ISO Code": i.iso_code ? i.iso_code : '',
            "Country Code": i.country_code ? i.country_code : '',
            "Base64 URL": i.base64_url ? i.base64_url : '',
          }));
          return res.xls('countryData.xlsx', responseData);
        })
        .catch((error: Error) => {
          return next(error)
        });
    }
  )

  app.get(
    "/countries",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("countries/index.ejs", {
        title: constants.PAGE_TITLE.COUNTRY_LIST,
        userData: req.session && req.session.user ? req.session.user : null
      })
    }
  )

  app.get(
    "/countries/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      datatable(Country, req.query, {
        attributes: [
          "id",
          "sort_id",
          "country",
          "iso_code",
          "country_code",
          "base64_url"
        ],
        where: {is_deleted: null }
      }).then((result: any) => {
        res.json(result);
      })
    }
  )

  app.get('/country', authRedirect(true), async (req: Request, res: Response) => {
    res.render("countries/country.ejs", {
      title: constants.PAGE_TITLE.COUNTRY_EDIT,
      userData: req.session && req.session.user ? req.session.user : null,
    });
  });

  app.post(
    '/country',
    celebrate({
      body: Joi.object({
        country: Joi.string()
          .required()
          .error(new CustomError("Country is required")),
        // sort_id: Joi.number()
        //   .required()
        //   .error(new CustomError("Sort ID is required")),
        iso_code: Joi.string()
          .required()
          .error(new CustomError("ISO Code is required")),
        country_code: Joi.string()
          .required()
          .error(new CustomError("Country Code is required")),
        base64_url: Joi.string()
          .required()
          .error(new CustomError("Base64 URL is required")),
        id: Joi.optional(),
        countryImage: Joi.optional(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      const requestCountryData: any = {};

      requestCountryData.country = req.body.country;
      requestCountryData.sort_id = 0;
      requestCountryData.iso_code = req.body.iso_code;
      requestCountryData.country_code = req.body.country_code;
      requestCountryData.base64_url = req.body.base64_url;
      requestCountryData.created_by = req?.session?.user?.id;

      countryService
        .addCountry(requestCountryData)
        .then(() => {
          req.flash(
            'success',
            `Country is created successfully.`,
            req,
            res
          );
          res.redirect("/admin/countries")
        })
        .catch((error: Error) => {
          return next(error);
        });
    }
  );

  app.post("/checkCountryName", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { country: req.body.country, is_deleted: null };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Country.count({ where: whereObj });
    return res.json({response: result});
  });
  
  app.post("/checkSortID", authRedirect(true), async (req: Request, res: Response) => {
    const whereObj:any = { sort_id: req.body.sort_id };
    if(req.body.id) {
      whereObj.id = { [Op.ne]: req.body.id };
    }
    const result = await Country.count({ where: whereObj });
    return res.json({response: result});
  });

  app.get(
    "/countries/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      countryService
        .getCountry(+req.params.id)
        .then(async (responseData: any) => {
          res.render("countries/country.ejs", {
            title: constants.PAGE_TITLE.COUNTRY_ADD,
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
    "/country/update",
    celebrate({
      body: Joi.object({
        country: Joi.string()
          .required()
          .error(new CustomError("Country is required")),
        sort_id: Joi.number()
          .required()
          .error(new CustomError("Sort ID is required")),
        iso_code: Joi.string()
          .required()
          .error(new CustomError("ISO Code is required")),
        country_code: Joi.string()
          .required()
          .error(new CustomError("Country Code is required")),
        base64_url: Joi.string()
          .required()
          .error(new CustomError("Base64 URL is required")),
        id: Joi.optional(),
        countryImage: Joi.optional()
      }),
    }),
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      const requestCountryData: any = {};

      requestCountryData.country = req.body.country;
      requestCountryData.sort_id = req.body.sort_id;
      requestCountryData.iso_code = req.body.iso_code;
      requestCountryData.country_code = req.body.country_code;
      requestCountryData.base64_url = req.body.base64_url;
      requestCountryData.id = req.body.id;

      countryService
        .updateCountry(requestCountryData)
        .then(() => {
          req.flash(
            "success",
            `Country is updated successfully.`,
            req,
            res
          )
          res.redirect("/admin/countries")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/countries/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      countryService
        .deleteCountry(+req.params.id)
        .then(() => {
          req.flash(
            "success",
            "Country deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/countries")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.post(
    "/countries/delete",
    celebrate({
      body: Joi.object({
        id: Joi.array(),
      }),
    }),
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const countryService = new CountryService();
      countryService
        .deleteMultipleCountries(req.body.id)
        .then(() => {
          req.flash(
            "success",
            `Selected Countries are deleted successfully.`,
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
    "/importCountry",
    authRedirect(true),
    upload.single('countryFile'),
    async (req: any, res: Response, next: NextFunction) => {
      const countryService = new CountryService();

      countryService
        .importCountry(req.file, req.session?.user.id)
        .then(() => {
          req.flash(
            "success",
            `Countries are added successfully.`,
            req,
            res
          )
          res.json({ status: true })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )
}
