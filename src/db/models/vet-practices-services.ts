import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import PracticeServices from "./practice-services";

export default class VetPracticeServices extends Model {
  public id!: number;
  public vet_practice_id!: number;
  public "practice-service_id"!: number;
}

VetPracticeServices.init(
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
    "practice-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_practices__practice_services",
    timestamps: false
  }
);

VetPracticeServices.belongsTo(PracticeServices, {
  foreignKey: "practice-service_id",
  as: 'PracticeServices'
});