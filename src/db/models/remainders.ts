import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class Remainder extends Model {
  public id!: number;
  public message!: number;
  public remainder_name!: string;
  public remainder_datetime!: Date;
  public sent_datetime!: Date;
  public before_day!: number;
  public before_hour!: number;
  public from!: number;
  public to!: number;
  public room_id!: number;
  public status!: boolean;
  public timezone!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

Remainder.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    message: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    remainder_name: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    remainder_datetime: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    sent_datetime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    before_hour: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    before_day: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    from: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    to: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    room_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    timezone: {
      allowNull: true,
      defaultValue: "UTC",
      type: DataTypes.STRING,
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
    }
  },
  {
    sequelize,
    tableName: "remainders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
