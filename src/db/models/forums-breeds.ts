import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Breeds from "./breeds";

export default class ForumsBreeds extends Model {
  public id!: number;
  public forum_id!: number;
  public breed_id!: number;
}

ForumsBreeds.init(
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
    breed_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "forums__breeds",
    timestamps: false
  }
);

ForumsBreeds.hasOne(Breeds, {
  foreignKey: "id",
  sourceKey: "breed_id",
  as: 'Breeds'
});
