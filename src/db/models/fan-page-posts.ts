import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import FanPagePostComments from "./fan-page-post-comments";
import UploadFileMorph from "./upload-file-morph";
import FanPagePostLikes from "./fan-page-post-likes";
import StrapiAdministrator from "./strapi-administrator";
import UploadFile from "./upload-file";
import { awsS3 } from "../../helpers/aws-s3";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class FanPagePosts extends Model {
  public id!: number;
  public fan_page_id!: number;
  public description!: string;
  public user_id!: number;
  public status!: number;
  public is_admin!: boolean;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

FanPagePosts.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    fan_page_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      type: DataTypes.NUMBER
    },
    is_admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
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
    tableName: "fan_page_posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      afterUpdate: async (fanPagePost) => {
        await FanPagePostComments.update({ is_deleted: true}, { where: { fan_page_post_id: fanPagePost.id } })
        await FanPagePostLikes.update({ is_deleted: true}, { where: { fan_page_post_id: fanPagePost.id } })
      }
    }
  }
);

FanPagePosts.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});

FanPagePosts.hasOne(StrapiAdministrator, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'admin'
});

FanPagePostComments.belongsTo(FanPagePosts, {
  foreignKey: 'fan_page_post_id',
  as: 'fanPagePost'
}); 

FanPagePostLikes.belongsTo(FanPagePosts, {
  foreignKey: 'fan_page_post_id',
  as: 'fanPagePostLikes'
});

FanPagePosts.hasOne(UploadFileMorph, {
  foreignKey: "related_id",
  sourceKey: 'id',
  as: 'PostMedia'
});