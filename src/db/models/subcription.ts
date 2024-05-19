import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import SubscriptionTypes from "./subscription-types"

export default class Subscriptions extends Model {
  public id!: number
  public title!: string
  public description!: string
  public duration!: string
  public amount!: number
  public currency_type!: string
  public subscription_for!: string
  public subscription_type!: number
  public stripe_price_id!: string
  public is_archived!: boolean
  public per_day_price!: number
  public created_by!: number
  public updated_by!: number
}

Subscriptions.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
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
    stripe_price_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    is_archived: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
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
    tableName: "subscriptions",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
Subscriptions.hasOne(SubscriptionTypes, {
  foreignKey: "id",
  sourceKey: "subscription_type",
  as: 'Type'
});

