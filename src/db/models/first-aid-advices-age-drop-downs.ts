import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AgeDropDowns from "./age-drop-downs";

export default class FirstAidAdvicesAgeDropDowns extends Model {
  public id!: number;
  public first_aid_advice_id!: number;
  public "age-drop-down_id"!: number;
}

FirstAidAdvicesAgeDropDowns.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    first_aid_advice_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "age-drop-down_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "first_aid_advices__age_drop_downs",
    timestamps: false
  }
);
FirstAidAdvicesAgeDropDowns.hasOne(AgeDropDowns, {
  foreignKey: "id",
  sourceKey: "age-drop-down_id",
  as: 'Ages'
});