import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Specialities from "./specialities";

export default class VetProfileSpecialities extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "speciality_id"!: number;
}

VetProfileSpecialities.init(
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
    "speciality_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__specialities",
    timestamps: false
  }
);
VetProfileSpecialities.belongsTo(Specialities, {
  foreignKey: "speciality_id",
  as: 'specialities'
});
