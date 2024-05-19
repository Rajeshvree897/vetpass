import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class UsersPermissionsRole extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public type!: string;
  public created_by!: number;
  public updated_by!: number;
}

UsersPermissionsRole.init(
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
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    created_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    updated_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: "users-permissions_role",
    timestamps: false
  }
);
