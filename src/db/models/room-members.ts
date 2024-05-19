import { number } from "joi";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Rooms from "./rooms";
import User from "./user";

export default class RoomMembers extends Model {
  public id!: number;
  public room_id!: number;
  public users_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
  public is_room_admin!: number;
  public is_deleted!:number;
  public is_chat_deleted!:number;

}

RoomMembers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    room_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    users_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    is_room_admin: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
    is_chat_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    tableName: "room_members",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
RoomMembers.hasOne(User, {
  foreignKey: "id",
  sourceKey: "users_id",
  as: "User",
});
RoomMembers.hasOne(Rooms, {
  foreignKey: "id",
  sourceKey: "room_id",
  as: "Room",
});
