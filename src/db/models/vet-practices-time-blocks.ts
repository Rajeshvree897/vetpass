import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class VetPracticeTimeBlocks extends Model {
  public id!: number;
  public vet_practice!: number;
  public from!: string;
  public to!: string;
  public day!: string;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: number;
  public updated_at!: number;
}

VetPracticeTimeBlocks.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    vet_practice: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    tableName: "vet_practice_time_blocks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
