import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"

export default class FrequentlyAskedQuestions extends Model {
  public id!: number
  public question!: string
  public answer!: string
  public application!: string
  public created_at!: Date
  public updated_at!: Date
  public created_by!: number
  public updated_by!: number
}

FrequentlyAskedQuestions.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    question: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    answer: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    application: {
      allowNull: false,
      type: DataTypes.STRING,
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
    tableName: "faqs",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)
