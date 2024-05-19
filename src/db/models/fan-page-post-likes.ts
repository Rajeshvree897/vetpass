import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class FanPagePostLikes extends Model {
  public id!: number;
  public fan_page_post_id!: number;
  public user_id!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

FanPagePostLikes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    fan_page_post_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
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
    tableName: "fan_page_post_likes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

FanPagePostLikes.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});