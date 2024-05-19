import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import TherapistsServices from "./therapists-services";

export default class VetProfileTherapistsServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "therapist-service_id"!: number;
}

VetProfileTherapistsServices.init(
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
    "therapist-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__therapist_services",
    timestamps: false
  }
);
VetProfileTherapistsServices.belongsTo(TherapistsServices, {
  foreignKey: "therapist-service_id",
  as: 'therapistsServices'
});
