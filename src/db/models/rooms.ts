import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import UploadFile from "./upload-file";

export default class Rooms extends Model {
  public id!: number;
  public name!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
  public group_id!:string;
  public practice_id!: number;
  public is_created_by_user!:number;
  public icon!:number;

}

Rooms.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
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
    group_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    practice_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    is_created_by_user: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
    icon: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
  },
  {
    sequelize,
    tableName: "rooms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

Rooms.hasOne(UploadFile, {
	foreignKey : "id",
	sourceKey: "icon",
	as: "GroupIcon"
  });