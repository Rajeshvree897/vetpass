import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AvailabilitiesComponents from './availabilities-components'
export default class AvailabilitiesTimeComponents extends Model {
  public id!: number;
  public day!: string;
  public from!: string;
  public to!: string;
  public block_id!: string;
}

AvailabilitiesTimeComponents.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    day: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    from: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    to: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    block_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: "components_time_time_slots",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

// AvailabilitiesTimeComponents.belongsTo(AvailabilitiesComponents, {
//   foreignKey: 'id'
// })