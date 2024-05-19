import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Breeds from "./breeds";

export default class FirstAidAdvicesBreeds extends Model {
  public id!: number;
  public first_aid_advice_id!: number;
  public breed_id!: number;
}

FirstAidAdvicesBreeds.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    first_aid_advice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    breed_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "first_aid_advices__breeds",
    timestamps: false
  }
);
FirstAidAdvicesBreeds.hasOne(Breeds, {
  foreignKey: "id",
  sourceKey: "breed_id",
  as: 'Breeds'
});
