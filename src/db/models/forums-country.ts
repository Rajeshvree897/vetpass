import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import Country from "./country"

export default class ForumsCountry extends Model {
  public id!: number
  public forum_id!: number
  public "country-drop-down_id"!: number
}

ForumsCountry.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    forum_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    },
    "country-drop-down_id": {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    tableName: "forums__country",
    timestamps: false
  }
);

ForumsCountry.hasOne(Country, {
  foreignKey: "id",
  sourceKey: "country-drop-down_id",
  as: 'Country'
});



