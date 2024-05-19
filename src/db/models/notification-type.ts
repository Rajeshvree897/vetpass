import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class NotificationType extends Model {
  public id!: number;
  public type!: string;
  public type_description!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

NotificationType.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    type_description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    created_at: {
      defaultValue: null,
      type: DataTypes.DATE
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
    tableName: "notification_type",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
