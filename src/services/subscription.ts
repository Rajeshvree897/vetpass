import { Sequelize, Op } from "sequelize";
import config from "../config";
import Subcriptions from "../db/models/subcription";
import SubscriptionHistories from "../db/models/subcription-histories";
import SubscriptionTypes from "../db/models/subscription-types";
import User from "../db/models/user";
import UsersPermissionsRole from "../db/models/users-permissions-role";
import { CustomError } from "./error-service";

export default class SubcriptionServices {
  constructor() { }

  async getSubscription(id: number): Promise<any> {
    return Subcriptions.findOne({
      where: { id: id },
    })
      .then((subscriptions: any) => {
        return subscriptions;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getSubscriptionList(userId: number, role: number): Promise<any> {
    let subscription_for:any = "";
    const userRole = await UsersPermissionsRole.findOne({ where: {id: role}, attributes: ['id', 'name'] });
    console.log(userRole?.name)
    if (userRole && userRole.name == config.common.role.third_party_companies_role_name) {
      subscription_for = "third_party_company";
    } else if (userRole && userRole.name == config.common.role.vet_practice_admin_role_name) {
      subscription_for = "vet_practice";
    }
    const subscriptionList = await Subcriptions.findAll({
      where: { subscription_for },
      include: [
        { model: SubscriptionTypes, as: "Type" },
      ],
      order: [Sequelize.literal("case when `Subscriptions`.`duration` = 'Custom' then 1 else 2 end")]
    })
      .then((subscriptions: any) => {
        return subscriptions.map((i: any) => i.toJSON());
      })
      .catch((error: Error) => {
        throw error;
      });

      const activeSubscriptionList = await SubscriptionHistories.findAll({
        where: { user_id: userId, is_active: true },
        include: [
          { model: SubscriptionTypes, as: "Type" },
        ],
        order: [[ "id", "desc" ]]
      })
      .then((subscriptions: any) => {
        return subscriptions.map((i: any) => i.toJSON());
      })
      .catch((error: Error) => {
        throw error;
      });
      
      // const current_date = new Date();
      // const mySubcriptionId = await User.findOne({
      //   where: { id: userId }
      // });

      // const upcommingSubscriptionList = await SubscriptionHistories.findAll({
      //   where: {
      //     // id: { [Op.ne]: mySubcriptionId?.sub_history_id },
      //     user_id: userId,
      //     sub_end_date: { [Op.gte]: current_date.toISOString().split('T')[0] }
      //   },
      //   include: [
      //     { model: SubscriptionTypes, as: "Type" },
      //   ],
      // })

      return { subscriptionList, activeSubscriptionList };
  }

  async addSubscription(
    subscriptions: any,
    userId: number,
  ): Promise<Subcriptions> {
    const isExist = await Subcriptions.count({
      where: {
        // title: subscriptions.title,
        // description: subscriptions.description,
        amount: subscriptions?.amount || null,
        currency_type: subscriptions.currency_type,
        subscription_for: subscriptions.subscription_for,
        subscription_type: subscriptions.subscription_type,
        duration: subscriptions.duration,
        per_day_price: subscriptions?.per_day_price || null
      }
    });

    if (isExist) {
      throw new CustomError("Subscription already exists!");
    }

    return Subcriptions.create({
      title: subscriptions.title,
      description: subscriptions.description,
      amount: subscriptions?.amount || null,
      currency_type: subscriptions.currency_type,
      subscription_for: subscriptions.subscription_for,
      subscription_type: subscriptions.subscription_type,
      duration: subscriptions.duration,
      per_day_price: subscriptions?.per_day_price || null,
      created_by: userId
    })
      .then(subscriptionData => {
        return subscriptionData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSubscription(
    subscriptionData: any,
    userId: number,
  ): Promise<boolean> {
    const isExist = await Subcriptions.count({
      where: {
        id: { [Op.ne]: subscriptionData.id },
        // title: subscriptionData.title,
        // description: subscriptionData.description,
        amount: subscriptionData?.amount || null,
        currency_type: subscriptionData.currency_type,
        subscription_for: subscriptionData.subscription_for,
        subscription_type: subscriptionData.subscription_type,
        duration: subscriptionData.duration,
        per_day_price: subscriptionData?.per_day_price || null
      }
    });

    if (isExist) {
      throw new CustomError("Subscription already exists!");
    }

    return Subcriptions.update(
      { 
        title: subscriptionData.title,
        description: subscriptionData.description,
        amount: subscriptionData?.amount || null,
        currency_type: subscriptionData.currency_type,
        subscription_for: subscriptionData.subscription_for,
        subscription_type: subscriptionData.subscription_type,
        duration: subscriptionData.duration,
        per_day_price: subscriptionData?.per_day_price || null,
        updated_by: userId 
      },

      { where: { id: subscriptionData.id } }
    )
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteSubscriptions(id: number): Promise<object> {
    const isSubscribed = await SubscriptionHistories.count({ where: { "sub_id": id }});
    if (isSubscribed) {
      return Subcriptions.update({ is_archived: true }, { where: { id: id }})
      .then(() => {
        return { is_archived: true };
      })
      .catch((error: Error) => {
        throw error;
      });
    }
    return Subcriptions.destroy({ where: { id: id }})
      .then(() => {
        return { is_deleted: true };
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async unArchiveSubscription(id: number): Promise<boolean> {
    return Subcriptions.update({ is_archived: null }, { where: { id: id }})
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    });
  }
}
