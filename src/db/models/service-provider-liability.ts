import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class ServiceProviderLiability extends Model {
  public id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public name!: string;
  public created_by!: number;
  public updated_by!: number;
}

ServiceProviderLiability.init(
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
    tableName: "service_provider_liabilities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
