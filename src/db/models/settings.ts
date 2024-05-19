import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class Settings extends Model {
  public id!: number;
  public current_version!: string;
  public minimum_version!: string;
  public base_url!: string;
  public platform_type!: string;
  public app_name!: string;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Settings.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    current_version: {
      allowNull: false,
      type: DataTypes.STRING
    },
    minimum_version: {
      allowNull: false,
      type: DataTypes.STRING
    },
    base_url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    platform_type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    app_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
  },
  {
    sequelize,
    tableName: "settings",
    timestamps: false
  }
);
