import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalCategories from "./animal-categories";

export default class VetProfileTreatesTypeAnimal extends Model {
  public id!: number;
  public vet_profile_id!: number;
  // public "animal-type_id"!: number;
  public "animal-category_id"!: number;
}

VetProfileTreatesTypeAnimal.init(
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
    tableName: "vet_profile__treates_type_animal",
    timestamps: false
  }
);
VetProfileTreatesTypeAnimal.belongsTo(AnimalCategories, {
  foreignKey: "animal-category_id",
  as: 'animalcategories'
});
