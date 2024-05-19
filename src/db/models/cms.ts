import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class Cms extends Model {
  public id!: number;
  public slug!: string;
  public title!: string;
  public description!: string;
  public created_by!: number;
  public updated_by!: number;
}

Cms.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
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
    }
  },
  {
    sequelize,
    tableName: "cms",
    timestamps: false
  }
);
