import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class AvailabilitiesTimeBlocks extends Model {
  public id!: number;
  public day!: string;
  public from!: string;
  public to!: string;
  public interval!: string;
  public stack!: string;
}

AvailabilitiesTimeBlocks.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    day: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    from: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    to: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    interval: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    stack: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    tableName: "components_time_block_times",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
