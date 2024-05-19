import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import VetProfileBreederServices from "./breeders-services";

export default class VetProfileVetProfileBreederServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "breeder-service_id"!: number;
}

VetProfileVetProfileBreederServices.init(
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
    "breeder-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__breeder_services",
    timestamps: false
  }
);
VetProfileVetProfileBreederServices.belongsTo(VetProfileBreederServices, {
  foreignKey: "breeder-service_id",
  as: 'VetProfileBreederServices'
});
