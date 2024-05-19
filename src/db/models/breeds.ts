import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";
export default class Breeds extends Model {
  public id!: number;
  public name!: string;
  public animal_type!: number;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

Breeds.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    animal_type: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "breeds",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
Breeds.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal_type",
  as: 'AnimalTypes'
});
