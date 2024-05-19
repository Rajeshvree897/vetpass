import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Forums from "./forums";
import UploadFile from "./upload-file";

export default class UploadFileMorph extends Model {
  public id!: number;
  public upload_file_id!: number;
  public related_id!: number;
  public related_type!: string;
  public field!: string;
  public order!: number;
}

UploadFileMorph.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    upload_file_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    related_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    related_type: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    field: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    order: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "upload_file_morph",
    timestamps: false
  }
);

UploadFileMorph.belongsTo(UploadFile, {
  foreignKey: "upload_file_id",
  targetKey: "id",
  as: 'UploadFile'
});
