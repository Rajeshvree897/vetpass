import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class FanPagePostComments extends Model {
  public id!: number;
  public fan_page_post_id!: number;
  public comment!: string;
  public user_id!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public parent_comment_id!: number;
}

FanPagePostComments.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    fan_page_post_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    parent_comment_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
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
    tableName: "fan_page_post_comments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

FanPagePostComments.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});

FanPagePostComments.hasOne(FanPagePostComments, {
  foreignKey: "id",
  sourceKey: "parent_comment_id",
  as: 'parentPost'
});