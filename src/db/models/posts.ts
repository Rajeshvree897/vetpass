import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import StrapiAdministrator from "./strapi-administrator";
import UploadFileMorph from "./upload-file-morph";
import PostComments from "./post-comments";
import PostLikes from "./post-likes";
import UploadFile from "./upload-file";
import { awsS3 } from "../../helpers/aws-s3";
import ReportPosts from "./report-posts";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class Posts extends Model {
  public id!: number;
  public user_id!: number;
  public privacy!: string;
  public title!: string;
  public description!: string;
  public hashtag!: string;
  public status!: number;
  public is_admin!: boolean;
  public deep_link!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

Posts.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    privacy: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    hashtag: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    deep_link: {
      allowNull: true,
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
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      afterUpdate: async (post)  => {
        await PostComments.update({ is_deleted: true }, { where: { post_id: post.id } });
        await PostLikes.update({ is_deleted: true },{ where: { post_id: post.id } });
        await ReportPosts.update({ is_deleted: true },{ where: { post_id: post.id }, individualHooks: true  });
      }
    }
  }
);

Posts.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});

Posts.hasOne(StrapiAdministrator, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'admin'
});

PostComments.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: 'post'
});

PostLikes.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: 'postLikes'
});

ReportPosts.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: 'post'
});

Posts.hasOne(UploadFileMorph, {
  foreignKey: "related_id",
  sourceKey: 'id',
  as: 'PostMedia'
});