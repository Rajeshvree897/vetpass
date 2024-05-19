import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class SymptomsHowLong extends Model {
  public id!: number;
  public name!: string;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

SymptomsHowLong.init(
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "symptoms_how_long_drop_downs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
