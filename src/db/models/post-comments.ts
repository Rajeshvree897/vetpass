import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import Posts from "./posts";

export default class PostComments extends Model {
  public id!: number;
  public post_id!: number;
  public comment!: string;
  public user_id!: number;
  public status!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public parent_comment_id!: number;
}

PostComments.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    post_id: {
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
      type: DataTypes.INTEGER,
    },
    parent_comment_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.NUMBER
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
    tableName: "post_comments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

PostComments.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});

PostComments.hasOne(PostComments, {
  foreignKey: "id",
  sourceKey: "parent_comment_id",
  as: 'parentPost'
});
