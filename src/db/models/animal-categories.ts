import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"

export default class AnimalCategories extends Model {
  public id!: number
  public category!: string
  public status!: number
  public order!: number;
  public created_at!: Date
  public updated_at!: Date
  public created_by!: number
  public updated_by!: number
}

AnimalCategories.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: null,
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "animal_categories",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)
