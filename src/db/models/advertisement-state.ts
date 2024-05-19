import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import State from "./state"

export default class AdvertisementsState extends Model {
  public id!: number
  public forum_id!: number
  public "state-drop-down_id"!: number
}

AdvertisementsState.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    advertisement_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    },
    "state-drop-down_id": {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    tableName: "advertisements__state",
    timestamps: false
  }
);

AdvertisementsState.hasOne(State, {
  foreignKey: "id",
  sourceKey: "state-drop-down_id",
  as: 'State'
});



