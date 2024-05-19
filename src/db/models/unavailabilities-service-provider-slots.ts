import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
export default class ServiceProviderUnAvailabilitiesTimesSlots extends Model {
  public id!: number;
  public from!: string;
  public to!: string;
  public unavailability_id!: number;
}

ServiceProviderUnAvailabilitiesTimesSlots.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    from: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    to: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    unavailability_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.NUMBER
      }
  },
  {
    sequelize,
    tableName: "service_provider_unavailability_time_slots",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
