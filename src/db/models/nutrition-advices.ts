import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AgeDropDowns from "./age-drop-downs";
import NutritionAdvicesAnimalTypes from "./nutrition-advices-animal-types";
import NutritionAdvicesBreeds from "./nutrition-advices-breeds";

export default class NutritionAdvices extends Model {
  public id!: number;
  public question!: string;
  public answer!: string;
  public age_drop_downs!: number;
  public order!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

NutritionAdvices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    question: {
      allowNull: false,
      type: DataTypes.STRING
    },
    answer: {
      allowNull: false,
      type: DataTypes.STRING
    },
    age_drop_downs: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "nutrition_advices",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
NutritionAdvices.hasOne(AgeDropDowns, {
  foreignKey: "id",
  sourceKey: "age_drop_downs",
  as: 'AgeDropDowns'
});
// NutritionAdvices.hasOne(AgeDropDowns, {
//   foreignKey: "id",
//   sourceKey: "age_drop_downs",
//   as: 'AdviceAges'
// });
NutritionAdvices.hasMany(NutritionAdvicesAnimalTypes, {
  foreignKey: "nutrition_advice_id",
  sourceKey: 'id',
  as: 'AdviceTypes'
});
NutritionAdvices.hasMany(NutritionAdvicesBreeds, {
  foreignKey: "nutrition_advice_id",
  as: 'AdviceBreeds'
});
