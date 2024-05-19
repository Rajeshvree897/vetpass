import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class ContactDetails extends Model {
  public id!: number;
  public contact_email!: string;
  public contact_mobile!: string;
  public contact_address!: string;
  public contact_about!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
  public compnay_name!: string;
}

ContactDetails.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    contact_email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contact_mobile: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contact_address: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    contact_about: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TEXT
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
    compnay_name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: "contact_details",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
