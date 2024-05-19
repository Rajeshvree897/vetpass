import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Classifications from "./classifications";

export default class VetPracticesClassification extends Model {
  public id!: number;
  public vet_practice_id!: number;
  public "classification_id"!: number;
}

VetPracticesClassification.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    vet_practice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "classification_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_practices__classification",
    timestamps: false
  }
);

VetPracticesClassification.belongsTo(Classifications, {
  foreignKey: "classification_id",
  as: 'classifications'
});