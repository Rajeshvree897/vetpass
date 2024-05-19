import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import UploadFile from "./upload-file";

export default class AnimalTypesIcon extends Model {
  public id!: number;
  public animal_type_id!: number;
  public file_id!: number;
}

AnimalTypesIcon.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    animal_type_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    file_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "animal_types__icon",
    timestamps: false
  }
);
AnimalTypesIcon.belongsTo(UploadFile, {
  foreignKey: "file_id",
//  sourceKey: "file_id",
  as: 'UploadFile'
});