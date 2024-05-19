import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class PetServices extends Model {
  public id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public name!: string;
  public order!: number;
  public created_by!: number;
  public updated_by!: number;
}

PetServices.init(
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
    order: {
      type: DataTypes.INTEGER,
      defaultValue: null,
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
    tableName: "pet_services",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
