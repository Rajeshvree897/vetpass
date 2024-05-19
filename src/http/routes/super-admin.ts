import { celebrate, Joi } from "celebrate";
import { Router, Request, Response, NextFunction, response } from "express";
import SuperAdminService from "../../services/super-admin";
import { authRedirect } from "../middlewares";

export default (app: Router) => {
  
  app.get('/super-admins',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {    
    res.render("super-admins/index.ejs", {
      title: "Super Admin list",
      userData: req.session && req.session.user ? req.session.user : null
    });
  });

  app.get('/super-admin',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      res.render("super-admins/super-admin.ejs", {
        title: "Create Super Admin",
        userData: req.session && req.session.user ? req.session.user : null
      });
    }
  );

  app.get('/super-admin/:id([0-9]+)',
    authRedirect(true),
    celebrate({
      params: Joi.object({
        id: Joi.number().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service = new SuperAdminService();
        const user = await service.getResource((req.params.id as unknown) as number);  
        res.render("super-admins/super-admin.ejs", {
          title: "Super Admin list",
          user
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  app.post('/super-admin/update',
    authRedirect(true),
    celebrate({
      body: Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().required(),
        firstname: Joi.string().alphanum().min(1).max(255).required(),
        lastname: Joi.string().alphanum().min(1).max(255).required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service = new SuperAdminService();
        await service.updateResource(req.body);

        req.flash("success", `User is updated successfully.`, req, res);
        res.redirect("/admin/super-admins")
      } catch (error) {
        next(error);
      }
    }
  );

  app.post('/super-admin',
    authRedirect(true),
    celebrate({
      body: Joi.object({
        email: Joi.string().email().required(),
        firstname: Joi.string().alphanum().min(1).max(255).required(),
        lastname: Joi.string().alphanum().min(1).max(255).required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const service = new SuperAdminService();
        await service.createResource(req.body);

        req.flash('success', `User is created successfully.`, req, res );
        res.redirect('/admin/super-admins');
      } catch (error) {
        next(error);
      }
    }
  );

  app.get('/super-admin/data',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      const service = new SuperAdminService();

      return res.send(await service.getDatatableListing(req.query));
    }
  );

  app.get('/super-admin/:id([0-9]+)/delete',
    authRedirect(true),
    async (req: Request, res: Response, next: NextFunction) => {
      try {      
        const service = new SuperAdminService();
        await service.deleteResource(req.params.id as unknown as number);

        req.flash("success", "User deleted successfully", req, res);
        res.redirect('/admin/super-admins');
      } catch (error) {
        next(error)
      }
    }
  );
};
