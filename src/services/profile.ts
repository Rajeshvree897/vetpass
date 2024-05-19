import { Op } from "sequelize";
import StrapiAdministrator from "../db/models/strapi-administrator";
import User from "../db/models/user";

export default class ProfileService {
  constructor() {}

  async getAdminProfileById(id: number): Promise<any> {
    return StrapiAdministrator.findOne({ where: { id: id } })
      .then((strapiAdministrator: any) => {
        return strapiAdministrator;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateAdminProfile(
    strapiAdministratorData: StrapiAdministrator,
    id: number
  ) {
    return StrapiAdministrator.update(strapiAdministratorData, { where: { id: id } })
      .then((strapiAdministrator: any) => {
        return strapiAdministrator;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getUserProfileById(id: number): Promise<any> {
    return User.findOne({ where: { id: id } })
      .then((user) => {
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getUserProfileByForumUserId(id: number): Promise<any> {
    return User.findOne({ 
        attributes: ['id', 'email', 'first_name', 'last_name'],
        where: { id: id } 
      })
      .then((user) => {
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getMultipleUsersProfileByForumUserId(id: any[]): Promise<any> {
    return User.findAll({ 
        attributes: ['id', 'email', 'first_name', 'last_name'],
        where: { 
          id: {
            [Op.in] : id
          }
        } 
      })
      .then((user) => {
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateUserProfile(
    userData: User,
    id: number
  ) {
    return User.update(userData, { where: { id: id } })
      .then((user: any) => {
        return user;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
