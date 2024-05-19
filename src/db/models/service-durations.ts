import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class ServiceDurations extends Model {
  public id!: number;
  public name!: string;
  public duration!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

ServiceDurations.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    duration: {
      allowNull: true,
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
    }
  },
  {
    sequelize,
    tableName: "service_durations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);