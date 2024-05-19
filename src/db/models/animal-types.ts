import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import UploadFileMorph from "./upload-file-morph";
import AnimalCategories from "./animal-categories";

export default class AnimalTypes extends Model {
  public id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public type!: string;
  public animal_category!: number;
  public status!: number;
  public created_by!: number;
  public updated_by!: number;
}

AnimalTypes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
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
    type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    animal_category: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "animal_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
AnimalTypes.belongsTo(UploadFileMorph, {
  // foreignKey: "animal_type_id",
  foreignKey: "id",
  targetKey: 'related_id',
  as: 'AnimalTypesIcon'
});
AnimalTypes.belongsTo(AnimalCategories, {
  // foreignKey: "id",
  foreignKey: "animal_category",
  as: 'AnimalCategories'
});