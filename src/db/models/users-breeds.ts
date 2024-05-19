import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Breeds from "./breeds";

export default class UsersBreeds extends Model {
  public id!: number;
  public "users-permissions_user_id"!: number;
  public breed_id!: number;
}

UsersBreeds.init(
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
    breed_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "users-permissions_user__breeds",
    timestamps: false
  }
);

UsersBreeds.hasOne(Breeds, {
  foreignKey: "id",
  sourceKey: "breed_id",
  as: 'Breeds'
});
