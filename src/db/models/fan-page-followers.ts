import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class FanPageFollowers extends Model {
  public id!: number;
  public fan_page_id!: number;
  public follower_id!: number;
  public status!: boolean
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public parent_comment_id!: number;
}

FanPageFollowers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    fan_page_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    follower_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: true,
      defaultValue: null,
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
    tableName: "fan_page_followers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

FanPageFollowers.hasOne(User, {
  foreignKey: "id",
  sourceKey: "follower_id",
  as: 'user'
});
