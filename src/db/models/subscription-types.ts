import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class SubscriptionTypes extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
}

SubscriptionTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "subscription_types",
    timestamps: false
  }
);
