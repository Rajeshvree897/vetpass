import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalCategories from "./animal-categories";

export default class ForumsAnimalCategories extends Model {
  public id!: number;
  public forum_id!: number;
  public "animal-category_id"!: number;
}

ForumsAnimalCategories.init(
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
    "animal-category_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "forums__animal_category",
    timestamps: false
  }
);

ForumsAnimalCategories.hasOne(AnimalCategories, {
  foreignKey: "id",
  sourceKey: "animal-category_id",
  as: 'Categories'
});