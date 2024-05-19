import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AvailabilitiesTimeBlocks from "./components-time-blocks";
import  AvailabilitiesTimeComponents from './components-time-slots';
export default class AvailabilitiesComponents extends Model {
  public id!: number;
  public field!: string;
  public order!: string;
  public component_type!: string;
  public component_id!: number;
  public availability_id!: number;
}

AvailabilitiesComponents.init(
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
    availability_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "availabilities_components",
    timestamps: false,
    // createdAt: "created_at",
    // updatedAt: "updated_at"
  }
);

AvailabilitiesComponents.belongsTo(AvailabilitiesTimeComponents, {
  foreignKey: 'component_id'
})
AvailabilitiesComponents.belongsTo(AvailabilitiesTimeBlocks, {
  foreignKey: 'component_id'
})