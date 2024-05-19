import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class Payment extends Model {
  public id!: number;
  public customer_id!: number;
  public user!: number;
  public created_at!: number;
  public updated_at!: number;
}

Payment.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    customer_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    user: {
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
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);