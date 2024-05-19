import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Country from "./country";

export default class Insurers extends Model {
  public id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public name!: string;
  public sort_id!: number;
  public created_by!: number;
  public updated_by!: number;
}

Insurers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    country: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    sort_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
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
    tableName: "insurer_lists",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

Insurers.belongsTo(Country, {
  foreignKey: "country",
  as: "countries",
});