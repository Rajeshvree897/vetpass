import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";

export default class VetProfileInterestedAnimalTypes extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "animal-type_id"!: number;
}

VetProfileInterestedAnimalTypes.init(
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
    "animal-type_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__interested_animal_types",
    timestamps: false
  }
);
VetProfileInterestedAnimalTypes.belongsTo(AnimalTypes, {
  foreignKey: "animal-type_id",
  as: 'animalTypes'
});
