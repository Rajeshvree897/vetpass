import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class StrapiUserRole extends Model {
  public id!: number;
  public user_id!: number;
  public role_id!: number;
}

StrapiUserRole.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    user_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "strapi_users_roles",
    timestamps: false
  }
);
