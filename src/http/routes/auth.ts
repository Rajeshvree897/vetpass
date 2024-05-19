import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';

import { authRedirect } from '../middlewares';
import AuthService from '../../services/auth-service';
import Logger from '../../loaders/logger';
import { CustomError } from '../../services/error-service';
import config from '../../config';
import CommonService from "../../services/common";

export default (app: Router) => {
  app.get(['/', '/login'], authRedirect(false), (req: Request, res: Response) => {
    res.render('auth/login.ejs', { title: ' Login Page' });
  });

  app.get('/registration', authRedirect(false), async (req: Request, res: Response) => {
    const commonService = new CommonService();
    res.render('auth/registration.ejs', { 
      title: ' Registration Page',
      countryData: await commonService.getCountries(),
   });
  });

  app.post(
    '/registration',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required()
          .error(new CustomError('EMAIL is required.')),
        password: Joi.any()
          .required()
          .error(new CustomError('PASSWORD is required.')),
        confirm_password: Joi.any().optional(),
        company_name: Joi.any()
          .required()
          .error(new CustomError('Company name is required.')),
        first_name: Joi.any()
          .required()
          .error(new CustomError('First name is required.')),
        last_name: Joi.any()
          .required()
          .error(new CustomError('Last name is required.')),
        int_code: Joi.any()
          .required()
          .error(new CustomError('Int code is required.')),
        mobile: Joi.any()
          .required()
          .error(new CustomError('Contact No is required.')),
      })
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const authService = new AuthService();
      authService
        .registration(req.body)
        .then((responseData: any) => {
          if (responseData) {
            req.flash('info', 'Registeration Successfull.', req, res);
          } else {
            req.flash('error', 'Something went wrong, Please try again.', req, res);
          }
          return res.redirect('/admin/login');
        })
        .catch((error: Error) => next(error));
    }
  );

  app.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required()
          .error(new CustomError('EMAIL is invalid.')),
        password: Joi.any()
          .required()
          .error(new CustomError('PASSWORD is invalid.')),
          timeZone: Joi.any()
          .required()
          .error(new CustomError('Somthing Wrong'))
      })
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const email: string = req.body.email,
        password: string = req.body.password;

      const timeZone = req.body.timeZone;

      const authService = new AuthService();
      authService
        .getAdminByEmailPassword(email, password)
        .then((user: any) => {
          if (req.session){
            req.session.user = user;
            req.session.user.timeZone = timeZone;
            req.session.user.practiceAdminName = config.common.role.vet_practice_admin_role_name;
            req.session.user.vetpassStaffRoleName = config.common.role.vetpass_staff_role_name;
            req.session.user.thirdPartyCompanyRoleName = config.common.role.third_party_companies_role_name;
            req.session.user.adminRoleName = config.common.role.admin_role_name;
            req.session.user.appUserRoleName = config.common.role.app_user_role_name;
            req.session.user.vetRoleName = config.common.role.vet_role_name;
            req.session.user.technicianNurseRoleName = config.common.role.technician_nurse_role_name;
            req.session.user.serviceProviderRoleName = config.common.role.service_provider_role_name;
            req.session.user.groomerRoleName = config.common.role.groomer_role_name;
            req.session.user.walkerRoleName = config.common.role.walker_role_name;
            req.session.user.therapistRoleName = config.common.role.therapist_role_name;
            req.session.user.nutritionistRoleName = config.common.role.nutritionists_role_name;
            req.session.user.breederRoleName = config.common.role.breeders_role_name;
            req.session.user.publicRoleName = config.common.role.public_role_name;
            req.session.user.vetPractice = user?.vetPractice;
          }
          // if (user && user.Role && user.Role.name && user && user.Role && user.Role.name == config.common.role.third_party_companies_role_name) {
          //   return res.redirect('/admin/subscriptionList');
          // }
          return res.redirect('/admin/dashboard');
        })
        .catch(error => {
          return next(error);
        });
    }
  );

  app.get('/logout', (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((error: Error) => {
        if (error) {
          Logger.error(error.message);
        }
      });
    }
    res.redirect('/admin/login');
  });

  app.get('/forgot-password', (req: Request, res: Response) => {
    res.render('auth/forgot-password.ejs', { title: 'Forgot password' });
  });

  app.post(
    '/forgot-password',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required()
          .error(new CustomError('EMAIL is invalid.'))
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = new AuthService();

      try {
        const response = await authService.forgotPassword(req.body.email);

        if (response) {
          req.flash('info', 'Kindly check your email for further instructions.', req, res);
        } else {
          req.flash('error', 'Something went wrong, Please try again.', req, res);
        }

        return res.redirect('forgot-password');
      } catch (error) {
        return next(error);
      }
    }
  );

  app.get('/reset-password/:token', async (req: Request, res: Response, next: NextFunction) => {
    const authService = new AuthService();

    try {
      const user = await authService.findUserByToken(req.params.token);

      if (!user) {
        req.flash('error', 'Reset password link expired. Please try again with valid email Id.', req, res);
        return res.redirect('/admin/forgot-password');
      }

      return res.render('auth/reset-password.ejs', {
        title: 'Reset password',
        responseData: user,
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/reset-password',
    celebrate({
      body: Joi.object({
        token: Joi.optional(),
        password: Joi.string().required().error(new CustomError('PASSWORD is invalid.')),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).error(new CustomError('RETYPE PASSWORD must match to PASSWORD.'))
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const authService = new AuthService();

      try {
        const isPasswordChanged = await authService.resetPassword(req.body.token, req.body.password);
        
        if (isPasswordChanged) {
          req.flash('success', 'Password updated successfully.', req, res);
        } else {
          req.flash('error', 'Something went wrong, Please try again.', req, res);
        }

        const redirectUrl = isPasswordChanged ? '/admin/login' : `/admin/reset-password/${req.body.token}`;
        return res.redirect(redirectUrl);
      } catch (error) {
        return next(error);
      }
    });
};
