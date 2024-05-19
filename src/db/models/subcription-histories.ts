import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import Advertisements from "./advertisement"
import SubscriptionTypes from "./subscription-types"
import User from "./user"

export default class SubscriptionHistories extends Model {
  public id!: number
  public sub_id!: number
  public user_id!: number
  public sub_start_date!: Date
  public sub_end_date!: Date
  public paymentIntentId!: string;
  public title!: string
  public description!: string
  public duration!: string
  public amount!: number
  public currency_type!: string
  public subscription_for!: string
  public subscription_type!: string
  public is_active!: boolean
  public no_of_subscription_days!: number
  public per_day_price!: number
  public created_by!: number
  public updated_by!: number
}

SubscriptionHistories.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    sub_id: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    user_id: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    sub_start_date: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    sub_end_date: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    description: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    duration: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    amount: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    currency_type: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    subscription_for: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    subscription_type: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    is_active: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    },
    no_of_subscription_days: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    per_day_price: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    }
  },
  {
    sequelize,
    tableName: "subscription_histories",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
SubscriptionHistories.hasOne(SubscriptionTypes, {
  foreignKey: "id",
  sourceKey: "subscription_type",
  as: 'Type'
});

SubscriptionHistories.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});
SubscriptionHistories.belongsTo(Advertisements, {
  foreignKey: "id",
  targetKey: 'subscription_history',
  as: 'advertisements'
});