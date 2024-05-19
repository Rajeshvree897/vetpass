import moment from 'moment';
import "moment-timezone";
import { Op } from "sequelize";

import User from "../db/models/user";
import config from "../config";
import { CustomError } from "./error-service";
import uuidv4 from "uuid/v4";
import bcrypt from "bcryptjs";
import { mailer, MailOptions } from "../helpers/mailer";
import bcryptjs from "bcryptjs";
import VetProfile from "../db/models/vet-profile";
import StrapiAdministrator from "../db/models/strapi-administrator";
import StrapiUserRole from "../db/models/strapi-users-roles";
import { Role } from "../types/common";
import UsersPermissionsRole from '../db/models/users-permissions-role';
import { isNull } from 'util';
import VetPractices from '../db/models/vet-practices';
import Device from '../db/models/device';
const NODE_ENV = process.env.NODE_ENV;
const baseUrl = NODE_ENV == "production" ? "https://admin.vetpass.com/" : "https://staging-admin.vetpass.com/";
type ForgotPasswordMailData = Required<Pick<MailOptions, 'to' | 'subject' | 'data'>>;

export default class AuthService {
  constructor() {}

  async registration (userData: User): Promise<any> {
    const roleId = await UsersPermissionsRole.findOne({ where: { name: config.common.role.third_party_companies_role_name } });
    return User.create({
      company_name: userData.company_name,
      email: userData.email,
      password: bcryptjs.hashSync(userData.password, config.bcryptSalt),
      first_name: userData.first_name,
      last_name: userData.last_name,
      mobile: userData.mobile,
      int_code: (userData.int_code) ? userData.int_code : null,
      role: (roleId) ? roleId.id : 12,
      provider: 'local',
      confirmed: (userData.confirmed) ? 1 : 0,
      blocked: (userData.blocked) ? 1 : 0,
      created_by: 1,
    })
    .catch((error: Error) => {
      throw error;
    });
  }

  async getAdminByEmailPassword(
    email: string,
    password: string
  ): Promise<StrapiAdministrator> {
    return StrapiAdministrator.findOne({ where: { email: email } })
      .then((user: any) => {

        if(user && isNull(user.password)){
          user.password = '';
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return User.findOne({ include:[{ model: UsersPermissionsRole, as: "Role", attributes: ["name"], where: { name:{ [Op.in]: [config.common.role.app_user_role_name, config.common.role.vet_role_name,config.common.role.vet_practice_admin_role_name, config.common.role.third_party_companies_role_name] } } }], where: { email: email } })
          .then(async (userData: any) => {
            if(userData && isNull(userData.password)){
              userData.password = '';
            }
            if (!userData || !bcrypt.compareSync(password, userData.password)) {
              throw new CustomError("Email and password seems invalid");
            }
            const devices = await Device.findAll({
              raw: true,
              where: { user: userData.id }
            });
            const deviceTokens = devices && devices.length ? devices.map(i => i.device_token) : [];
            const vetPractice: any = await VetProfile.findOne({
              attributes: ['practice'],
              include:[
                { model: VetPractices, as: "practices", attributes: ["option", "stripe_account_id"]}
              ],
              where: { user: userData.id },
              raw: true
            });
            userData.timezone = moment.tz.guess();
            userData.save();
            userData = userData.toJSON();
            userData.deviceTokens = deviceTokens;
            userData.roleName = userData.Role.name;
            userData.vetPractice = vetPractice?.practice;
            userData.option = vetPractice?.["practices.option"];
            userData.stripe_account_id = vetPractice?.["practices.stripe_account_id"];
            return userData;
          })
          .catch((userDataError: Error) => {
            throw userDataError;
          });
        }
        return StrapiUserRole.findOne({ where: { user_id: user.id } })
          .then((strapiUserRole) => {
            if (
              strapiUserRole &&
              [Role.SUPER_ADMIN, Role.VETPASS_STAFF].includes(
                strapiUserRole.role_id
              )
            ) {
              user = user.toJSON();
              user.roleName = config.common.role.admin_role_name;
              return user;
            }
            throw new CustomError("You have no access to this portal");
          })
          .catch((error: Error) => {
            throw error;
          });
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async forgotPassword(email: string): Promise<boolean> {
    let user: User | StrapiAdministrator | null;
    
    // find user by email
    user = await User.findOne({ where: { email: email, is_deleted: null } });
    if (!user) {
      user = await StrapiAdministrator.findOne({ where: { email: email} })
    }
    
    // no user found
    if (!user) {
      throw new CustomError("Invalid email address");
    }
    
    // generate new uuid
    user.resetPasswordToken = uuidv4();
    
    // save new data
    await user.save();
    
    // send mail to user
    return await this.sendForgotPasswordMail(user);
  }

  private getForgotPasswordMailData(user: User | StrapiAdministrator): ForgotPasswordMailData {
    return {
      to: user.email,
      subject: config.common.email.mailSubject,
      data: {
        baseUrl,
        resetPasswordURL: config.baseUrl + config.resetPasswordUri + user.resetPasswordToken,
        userName: user instanceof StrapiAdministrator ?
          `${user.firstname} ${user.lastname}` :
          `${user.first_name} ${user.last_name}`
      },
    }
  }

  async sendForgotPasswordMail(user: User | StrapiAdministrator) {
    const mailOptions: ForgotPasswordMailData = this.getForgotPasswordMailData(user);
    const template = 'new_forgot_password_email.ejs';
    
    try {
      await mailer.sendMail(mailOptions, template);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findUserByToken(token: string): Promise<User | StrapiAdministrator | null> {
    let user;
    
    user = await User.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      user = await StrapiAdministrator.findOne({ where: { resetPasswordToken: token } });
    } 

    return user;
  }

  async resetPassword(token: string, password: string): Promise<boolean> {
    try {
      let result;
      let user;

      const updateObj = {
        password: bcryptjs.hashSync(password, config.bcryptSalt),
        resetPasswordToken: null,
      }

      const updateOptions = {
        where: {
          resetPasswordToken: token
        }
      };

      user = await User.findOne({ where: { resetPasswordToken: token } });
      if (!user) {
        user = await StrapiAdministrator.findOne({ where: { resetPasswordToken: token } });
        if (!user) {
          throw new CustomError("Reset password token is invalid or has expired.");    
        }
      }
      
      if (user instanceof StrapiAdministrator) {
        result = await StrapiAdministrator.update(updateObj, updateOptions);
      } else {
        result = await User.update(updateObj, updateOptions);
      }

      return (result && result[0] > 0) 
    } catch (error) {
      return false;
    }
  }
}
