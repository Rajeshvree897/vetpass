//TODO : Remove ts-ignore and make definitions for `sequelize-datatable` and fix typescript issues
// @ts-ignore:3
import datatable from "sequelize-datatable";

import { Op, Transaction, where } from "sequelize";
import StrapiAdministrator from "../models/strapi-administrator";
import StrapiUserRole from "../models/strapi-users-roles";
import { sequelize } from "..";

export class SuperAdminRepository {

  async getById(id: number): Promise<StrapiAdministrator | null> {
    return await StrapiAdministrator.findByPk(id, {
      raw: true
    });
  }

  async getByEmail(email: string): Promise<StrapiAdministrator | null> {
    return await StrapiAdministrator.findOne({ where: { email } });
  }

  async getByResetPasswordToken(token: string): Promise<StrapiAdministrator | null> {
    return await StrapiAdministrator.findOne({ where: { resetPasswordToken: token } });
  }

  async update(id: number, user: any): Promise<StrapiAdministrator[] | []> {
    const result = await StrapiAdministrator.update(user, { where: { id } });
    
    return result[0] >= 1 ? result[1] : [];
  }

  async getDataTableListing(query: any): Promise<any> {
    let whereObj: any = {};
    
    if (query && query.search && query.search.value !== '') {
      whereObj[Op.or] = [
        { firstname: { [Op.like]: `%${query.search.value}%` } },
        { lastname: { [Op.like]: `%${query.search.value}%` } },
        { email: { [Op.like]: `%${query.search.value}%` } },
      ];
      delete query.search;
    }

    return await datatable(StrapiAdministrator, query, {
      distinct: true,
      col: 'id',
      subQuery: false,
      attributes: [
        "id",
        "email",
        "firstname",
        "lastname",
      ],
      where: whereObj
    });
  }

  async create(userObj: any): Promise<{data: StrapiAdministrator}> {
    const transaction = async (t: Transaction) => {
      // create super admin
      const newUser = await StrapiAdministrator.create(userObj, { transaction: t });

      // assign super admin roles
      const roleAttr = {
        user_id: newUser.id,
        role_id: 1
      };
      await StrapiUserRole.create(roleAttr, { transaction: t })

      return { data: newUser };
    }
    
    return this.runTransaction(transaction);
  }

  async deleteById(id: number): Promise<boolean> {
    const transaction = async (t: Transaction): Promise<boolean> => {
      const admin = await StrapiAdministrator.findByPk(id, { transaction: t });
      if (!admin) {
        return false;
      }
      await admin.destroy({ transaction: t });
      
      const role = await StrapiUserRole.findOne({ where: { user_id: id }, transaction: t })
      if (!role) {
        return true;
      }
      await role.destroy({ transaction: t });
      return true;
    }
     
    return this.runTransaction(transaction);
  }

  async runTransaction(callback: (t: Transaction) => Promise<any>): Promise<any> {
    const t = await sequelize.transaction();

    try {
      const result = await callback(t);
      await t.commit();

      return result;
    } catch (error) {
      await t.rollback();
    }
  }
}
