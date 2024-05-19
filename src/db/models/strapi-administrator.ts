import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"

export default class StrapiAdministrator extends Model {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public resetPasswordToken!: string
  public blocked!: number
  // public profile_id!: number
  // public confirmed!: number
  public firstname!: string
  public lastname!: string
  public registrationToken!: string
  public isActive!: number
}

StrapiAdministrator.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    username: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    resetPasswordToken: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    blocked: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
    // profile_id: {
    //   allowNull: true,
    //   defaultValue: null,
    //   type: DataTypes.INTEGER,
    // },
    // confirmed: {
    //   allowNull: true,
    //   defaultValue: null,
    //   type: DataTypes.TINYINT,
    // },
    firstname: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    registrationToken: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    isActive: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    tableName: "strapi_administrator",
    timestamps: false,
  }
)
