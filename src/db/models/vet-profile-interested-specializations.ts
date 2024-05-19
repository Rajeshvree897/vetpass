import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Specialization from "./specialization";

export default class VetProfileInterestedSpecializations extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public specialization_id!: number;
}

VetProfileInterestedSpecializations.init(
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
    specialization_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__interested_specializations",
    timestamps: false
  }
);
VetProfileInterestedSpecializations.belongsTo(Specialization, {
  foreignKey: "specialization_id",
  as: 'specializations'
});
