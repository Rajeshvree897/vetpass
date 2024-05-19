import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";

export default class UsersAnimalTypes extends Model {
  public id!: number;
  public "users-permissions_user_id"!: number;
  public "animal-type_id"!: number;
}

UsersAnimalTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    "users-permissions_user_id": {
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
    tableName: "users-permissions_user__animal_types",
    timestamps: false
  }
);
UsersAnimalTypes.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal-type_id",
  as: 'AnimalTypes'
});