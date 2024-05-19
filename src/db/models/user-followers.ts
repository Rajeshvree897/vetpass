import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class UserFollowers extends Model {
  public id!: number;
  public follower_user_id!: Number;
  public following_user_id!: Number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

UserFollowers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    follower_user_id: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    following_user_id: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    created_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    updated_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "user_followers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
UserFollowers.hasOne(User, {
  foreignKey: "id",
  sourceKey: "follower_user_id",
  as: 'Follower'
});
UserFollowers.hasOne(User, {
  foreignKey: "id",
  sourceKey: "following_user_id",
  as: 'Following'
});