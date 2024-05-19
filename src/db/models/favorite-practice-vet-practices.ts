import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import FavoritePractices from "./favorite-practices";
import VetPractices from "./vet-practices";

export default class FavoritePracticeVetPractices extends Model {
  public id!: number;
  public favorite_practice_id!: number;
  public "vet-practice_id"!: number;
}

FavoritePracticeVetPractices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    favorite_practice_id: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    "vet-practice_id": {
      defaultValue: null,
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: "favorite_practices__vet_practices",
    timestamps: false
  }
);
FavoritePracticeVetPractices.belongsTo(VetPractices, {
  foreignKey: "vet-practice_id",
//   sourceKey: "id",
  as: 'VetPractices'
});
FavoritePracticeVetPractices.belongsTo(FavoritePractices, {
    foreignKey: "favorite_practice_id",
  //   sourceKey: "id",
    as: 'FavoriteVetPractices'
  });