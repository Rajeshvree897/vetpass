import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class AppointmentNotes extends Model {
  public id!: number;
  public appointment!: number;
  public history!: string;
  public examination!: string;
  public diagnosis!: string;
  public plan!: string;
  public follow_up!: string;
  public prescription!: string;
  public note!: string;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

AppointmentNotes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    appointment: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },  
    history: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    examination: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    diagnosis: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    plan: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    follow_up: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    prescription: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    note: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointment_notes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);