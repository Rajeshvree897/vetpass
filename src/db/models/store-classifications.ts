import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class StoreClassifications extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public order!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

StoreClassifications.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    description: {
      defaultValue: null,
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    created_at: {
      defaultValue: null,
      type: DataTypes.DATE,
    },
    updated_at: {
      defaultValue: null,
      type: DataTypes.DATE,
    },
    created_by: {
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: "store_classifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
