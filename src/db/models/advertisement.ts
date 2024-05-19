import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import AdvertisementsState from "./advertisement-state"
import UploadFileMorph from "./upload-file-morph"
import User from "./user"

export default class Advertisements extends Model {
  public id!: number
  public text!: string
  public title!: string
  public website!: string
  public user_id!: number
  public country!: number
  public subscription_history!: number
  public created_by!: number
  public updated_by!: number
}

Advertisements.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    text: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    website: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    country: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    subscription_history: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
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
    }
  },
  {
    sequelize,
    tableName: "advertisements",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

Advertisements.belongsTo(UploadFileMorph, {
  foreignKey: "id",
  targetKey: 'related_id',
  as: 'banner'
});

Advertisements.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'serviceProvider'
});

Advertisements.hasMany(AdvertisementsState, {
  foreignKey: "advertisement_id",
  as: 'AdvertisementState'
});


