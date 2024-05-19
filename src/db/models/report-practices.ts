import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import VetPractices from "./vet-practices";

export default class ReportPractices extends Model {
  public id!: number;
  public user!: Number;
  public practice!: Number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

ReportPractices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    user: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    practice: {
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
    tableName: "report_practices",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
ReportPractices.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user",
  as: 'User'
});
ReportPractices.hasOne(VetPractices, {
  foreignKey: "id",
  sourceKey: "practice",
  as: 'Practice'
});