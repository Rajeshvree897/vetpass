import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import State from "./state"
import User from "./user"

export default class Country extends Model {
  public id!: number
  public country!: string
  public sort_id!: string
  public created_at!: Date
  public updated_at!: Date
  public code!: string
  public iso_code!: string
  public country_code!: string
  public base64_url!: string
  public created_by!: number
  public updated_by!: number
}

Country.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sort_id: {
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
    code: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    iso_code: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    country_code: {
      defaultValue: null,
      type: DataTypes.STRING,
    },
    base64_url: {
      defaultValue: null,
      type: DataTypes.STRING,
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "country_drop_downs",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      afterUpdate: async (country) => {
        console.log(country);
        await State.update({ is_deleted: true },{ where: { country: country.id } });
      }
    }
  }
)

State.belongsTo(Country, {
  foreignKey: "country",
  as: "countries",
});
