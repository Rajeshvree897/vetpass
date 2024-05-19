import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Specialization from "./specialization";
import VetProfile from "./vet-profile";

export default class VetProfileSpecialization extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "specialization_id"!: number;
}

VetProfileSpecialization.init(
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
    "specialization_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__specializations",
    timestamps: false
  }
);
VetProfileSpecialization.belongsTo(Specialization, {
  foreignKey: "specialization_id",
  as: 'specializations'
});
