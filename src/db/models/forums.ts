import { Sequelize } from "sequelize"
import { Model, DataTypes } from "sequelize"
import { awsS3 } from "../../helpers/aws-s3"
import { sequelize } from "../index"
import ForumsAnimalCategories from "./forums-animal-categories"
import ForumsAnimalTypes from "./forums-animal-types"
import ForumsAnswers from "./forums-answers"
import ForumsBreeds from "./forums-breeds"
import ForumsCountry from "./forums-country"
import ForumsSpecializations from "./forums-specializations"
import ForumsVetID from "./forums-vet-id"
import UploadFile from "./upload-file"
import UploadFileMorph from "./upload-file-morph"
import User from "./user"
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class Forums extends Model {
  public id!: number
  public question!: string
  public description!: string
  public category!: string
  public date!: Date
  public user_id!: number
  public status!: number
  public vet_only!: boolean
  public privacy!: string;
  public is_admin!: boolean
  public created_by!: number
  public updated_by!: number
}

Forums.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    question: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: null
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: null
    },
    category: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    date: {
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
        type: DataTypes.DATEONLY,
    },
    user_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    },
    status: {
      allowNull: true,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    vet_only: {
        allowNull: true,
        defaultValue: 0,
        type: DataTypes.BOOLEAN,
    },
    privacy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_admin: {
      allowNull: true,
      defaultValue: 0,
      type: DataTypes.BOOLEAN,
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "forums",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      afterUpdate: async (forum) => {
      //   await ForumsAnimalTypes.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      //   await ForumsAnswers.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      //   await ForumsBreeds.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      //   await ForumsCountry.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      //   await ForumsSpecializations.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      //   await ForumsVetID.update({ is_deleted: true },{ where: { forum_id: forum.id } });
      }
    }
  }
)

Forums.hasMany(UploadFileMorph, {
  foreignKey: "related_id",
  sourceKey: 'id',
  as: 'ForumsIcon'
});


UploadFileMorph.belongsTo(Forums, {
  foreignKey: "related_id",
  targetKey: 'id',
  as: 'ForumsIcon'
});

Forums.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'Users'
});

Forums.hasMany(ForumsAnimalTypes, {
  foreignKey: "forum_id",
  sourceKey: 'id',
  as: 'ForumTypes'
});

Forums.hasMany(ForumsAnimalCategories, {
  foreignKey: "forum_id",
  sourceKey: 'id',
  as: 'ForumCategories'
});

Forums.hasMany(ForumsBreeds, {
  foreignKey: "forum_id",
  as: 'ForumBreeds'
});

Forums.hasMany(ForumsAnswers, {
  foreignKey: "forum_id",
  as: 'ForumAnswers'
});

Forums.hasMany(ForumsSpecializations, {
  foreignKey: "forum_id",
  as: 'ForumSpecializations'
});

Forums.hasMany(ForumsCountry, {
  foreignKey: "forum_id",
  as: 'ForumCountry'
});
