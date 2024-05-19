import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AgeDropDowns from "./age-drop-downs";

export default class NutritionAdvicesAgeDropDowns extends Model {
  public id!: number;
  public nutrition_advice_id!: number;
  public "age-drop-down_id"!: number;
}

NutritionAdvicesAgeDropDowns.init(
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
    "age-drop-down_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "nutrition_advices__age_drop_downs",
    timestamps: false
  }
);
NutritionAdvicesAgeDropDowns.hasOne(AgeDropDowns, {
  foreignKey: "id",
  sourceKey: "age-drop-down_id",
  as: 'Ages'
});