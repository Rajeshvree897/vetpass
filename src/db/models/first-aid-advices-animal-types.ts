import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";

export default class FirstAidAdvicesAnimalTypes extends Model {
  public id!: number;
  public first_aid_advice_id!: number;
  public "animal-type_id"!: number;
}

FirstAidAdvicesAnimalTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    first_aid_advice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "animal-type_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "first_aid_advices__animal_types",
    timestamps: false
  }
);
FirstAidAdvicesAnimalTypes.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal-type_id", 
  as: 'Types'
});