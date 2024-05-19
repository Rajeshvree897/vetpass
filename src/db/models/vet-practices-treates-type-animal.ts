import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalCategories from "./animal-categories";
import Breeds from "./breeds";

export default class VetPracticesTypeAnimal extends Model {
  public id!: number;
  public vet_practice_id!: number;
  // public "animal-type_id"!: number;
  public "animal-category_id"!: number;
}

VetPracticesTypeAnimal.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    vet_practice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    // "animal-type_id": {
    //   type: DataTypes.NUMBER,
    //   defaultValue: null,
    //   allowNull: true
    // },
    "animal-category_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_practices__treates_type_animal",
    timestamps: false
  }
);

VetPracticesTypeAnimal.belongsTo(AnimalCategories, {
  foreignKey: "animal-category_id",
  as: 'animalcategories'
});
