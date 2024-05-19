import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

export default class UploadFile extends Model {
  public id!: number;
  public name!: string;
  public alternativeText!: string;
  public caption!: string;
  public width!: number;
  public height!: number;
  public formats!: string;
  public hash!: string;
  public ext!: string;
  public mime!: string;
  public size!: number;
  public url!: string;
  public previewUrl!: string;
  public provider!: string;
  public provider_metadata!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

UploadFile.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    alternativeText: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    caption: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    width: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    height: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    formats: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ext: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    mime: {
      allowNull: false,
      type: DataTypes.STRING
    },
    size: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    previewUrl: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    provider: {
      allowNull: false,
      type: DataTypes.STRING
    },
    provider_metadata: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
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
    }
  },
  {
    sequelize,
    tableName: "upload_file",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
