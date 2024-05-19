import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import NutritionistServices from "./nutritionists-services";

export default class VetProfileNutritionistServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "nutritionist-service_id"!: number;
}

VetProfileNutritionistServices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    vet_profile_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "nutritionist-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__nutritionist_services",
    timestamps: false
  }
);
VetProfileNutritionistServices.belongsTo(NutritionistServices, {
  foreignKey: "nutritionist-service_id",
  as: 'nutritionistsServices'
});
