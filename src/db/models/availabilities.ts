import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AvailabilitiesComponents from './availabilities-components'
export default class Availabilities extends Model {
  public id!: number;
	public user_id!: number;
	public published_at!: number;
	public created_by!: number;
	public updated_by!: number;
	public created_at!: number;
	public updated_at!: number;
	public day!: string;
}

Availabilities.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
		},
		user_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
		published_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE
    },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    updated_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
		},
		day: {
      type: DataTypes.STRING,
      allowNull: false
		}
  },
  {
    sequelize,
    tableName: "availabilities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

Availabilities.hasMany(AvailabilitiesComponents, {
    foreignKey: 'availability_id'
  })
  