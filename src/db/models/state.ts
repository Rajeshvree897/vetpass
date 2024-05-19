import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Country from "./country";

export default class State extends Model {
  public id!: number;
  public state!: string;
  public country!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

State.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: null
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
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "state_drop_downs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);


