import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import PetServices from "./pet-services";

export default class petPracticeServices extends Model {
  public id!: number;
  public vet_practice_id!: number;
  public "pet-service_id"!: number;
}

petPracticeServices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    vet_practice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "pet-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_practices__pet_services",
    timestamps: false
  }
);

petPracticeServices.belongsTo(PetServices, {
  foreignKey: "pet-service_id",
  as: 'PetServices'
});