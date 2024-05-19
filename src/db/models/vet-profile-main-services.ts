import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class VetProfileMainServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "service-provider-main-service_id"!: number;
}

VetProfileMainServices.init(
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
    "service-provider-main-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__main_services",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
