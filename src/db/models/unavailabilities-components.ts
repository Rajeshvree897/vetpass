import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import UnAvailabilitiesTimeComponents from "./unavailabilities-time-components";
import ServiceProviderUnAvailabilitiesTimeComponents from "./unavailabilities-service-provider-slots";
export default class UnAvailabilitiesComponents extends Model {
  public id!: number;
  public field!: string;
  public order!: string;
  public component_type!: string;
  public component_id!: number;
  public unavailability_id!: number;
}

UnAvailabilitiesComponents.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    field: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    order: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    component_type: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    component_id: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    unavailability_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "unavailabilities_components",
    timestamps: false
  }
);

UnAvailabilitiesComponents.belongsTo(UnAvailabilitiesTimeComponents, {
  foreignKey: 'component_id'
})

UnAvailabilitiesComponents.belongsTo(ServiceProviderUnAvailabilitiesTimeComponents, {
  foreignKey: 'component_id'
})