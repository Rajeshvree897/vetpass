import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Breeds from "./breeds";

export default class NutritionAdvicesBreeds extends Model {
  public id!: number;
  public nutrition_advice_id!: number;
  public breed_id!: number;
}

NutritionAdvicesBreeds.init(
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
    breed_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "nutrition_advices__breeds",
    timestamps: false
  }
);
NutritionAdvicesBreeds.hasOne(Breeds, {
  foreignKey: "id",
  sourceKey: "breed_id",
  as: 'Breeds'
});
