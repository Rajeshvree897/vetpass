import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import UnAvailabilitiesComponents from "./unavailabilities-components";
import UnAvailabilitiesServiceProviderTimeSlots from "./unavailabilities-service-provider-slots";


export default class UnAvailabilities extends Model {
  public id!: number;
  public user_id!: number;
  public description!: string;
  public date!: string;
  public is_full_day!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

UnAvailabilities.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    description: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    is_full_day: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    tableName: "unavailabilities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

UnAvailabilities.hasMany(UnAvailabilitiesComponents, {
  foreignKey: 'unavailability_id'
})

UnAvailabilities.hasMany(UnAvailabilitiesServiceProviderTimeSlots, {
  foreignKey: 'unavailability_id'
})