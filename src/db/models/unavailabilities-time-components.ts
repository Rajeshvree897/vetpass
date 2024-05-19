import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class UnAvailabilitiesTimeComponents extends Model {
  public id!: number;
  public time_slot_id!: string;
}

UnAvailabilitiesTimeComponents.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    time_slot_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "components_time_unavailability_time_slots",
    timestamps: false
  }
);
