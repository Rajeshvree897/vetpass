import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class FavoritePractices extends Model {
  public id!: number;
  public user!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

FavoritePractices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    user: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    created_by: {
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    tableName: "favorite_practices",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
FavoritePractices.belongsTo(User, {
  foreignKey: "user",
  as: "users",
});
