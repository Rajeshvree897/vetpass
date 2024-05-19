import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import Specialization from "./specialization"

export default class ForumsSpecializations extends Model {
  public id!: number
  public forum_id!: number
  public specialization_id!: number
}

ForumsSpecializations.init(
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
    specialization_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    tableName: "forums__specializations",
    timestamps: false
  }
);

ForumsSpecializations.hasOne(Specialization, {
  foreignKey: "id",
  sourceKey: "specialization_id",
  as: 'Specializations'
});



