import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";

export default class ForumsAnimalTypes extends Model {
  public id!: number;
  public forum_id!: number;
  public "animal-type_id"!: number;
}

ForumsAnimalTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    forum_id: {
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
    tableName: "forums__animal_types",
    timestamps: false
  }
);

ForumsAnimalTypes.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal-type_id",
  as: 'Types'
});