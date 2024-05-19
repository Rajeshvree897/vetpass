import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";

export default class ReviewAndRating extends Model {
  public id!: number;
  public user_id!: Number;
  public service_provider_id!: Number;
  public review!: String;
  public rating!: Number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

ReviewAndRating.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    user_id: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    service_provider_id: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    review: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    rating: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    created_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    updated_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    tableName: "review_and_ratings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
ReviewAndRating.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'User'
});
ReviewAndRating.hasOne(User, {
  foreignKey: "id",
  sourceKey: "service_provider_id",
  as: 'ServiceProvider'
});