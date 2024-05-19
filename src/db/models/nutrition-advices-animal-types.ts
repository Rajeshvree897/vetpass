import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";

export default class NutritionAdvicesAnimalTypes extends Model {
  public id!: number;
  public nutrition_advice_id!: number;
  public "animal-type_id"!: number;
}

NutritionAdvicesAnimalTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    nutrition_advice_id: {
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
    tableName: "nutrition_advices__animal_types",
    timestamps: false
  }
);
NutritionAdvicesAnimalTypes.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal-type_id",
  as: 'Types'
});