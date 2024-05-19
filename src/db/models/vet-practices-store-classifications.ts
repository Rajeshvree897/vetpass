import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import StoreClassifications from "./store-classifications";

export default class VetPracticesStoreClassification extends Model {
  public id!: number;
  public vet_practice_id!: number;
  public "store-classification_id"!: number;
}

VetPracticesStoreClassification.init(
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
    "store-classification_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_practices__store_classifications",
    timestamps: false
  }
);

VetPracticesStoreClassification.belongsTo(StoreClassifications, {
  foreignKey: "store-classification_id",
  as: 'StoreClassifications'
});