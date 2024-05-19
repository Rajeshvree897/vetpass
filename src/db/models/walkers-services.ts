import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class WalkersServices extends Model {
  public id!: number;
  public service!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

WalkersServices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    service: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
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
    tableName: "walker_services",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
