import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class ReportReasons extends Model {
  public id!: number;
  public reason!: string;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

ReportReasons.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    reason: {
      allowNull: false,
      type: DataTypes.STRING
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
  },
  {
    sequelize,
    tableName: "report_reasons",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
