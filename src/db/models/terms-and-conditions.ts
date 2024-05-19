import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

export default class TermsAndConditions extends Model {
  public id!: number;
  public terms_and_condition_contents!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

TermsAndConditions.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    terms_and_condition_contents: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TEXT
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
    tableName: "terms_and_conditions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
