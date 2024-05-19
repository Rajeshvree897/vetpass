import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class Device extends Model {
  public id!: number;
  public device_token!: string;
  public user!: string;
  public device_type!: String;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

Device.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    device_token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    device_type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user: {
      type: DataTypes.NUMBER,
      defaultValue: null,
    },
    updated_at: {
      defaultValue: null,
      type: DataTypes.DATE
    },
    created_by: {
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    updated_by: {
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "device",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
