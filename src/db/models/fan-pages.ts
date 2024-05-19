import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import StrapiAdministrator from "./strapi-administrator";
import UploadFileMorph from "./upload-file-morph";
import FanPageFollowers from "./fan-page-followers";
import FanPagePosts from "./fan-page-posts";
import UploadFile from "./upload-file";
import { awsS3 } from "../../helpers/aws-s3";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath = NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";

export default class FanPages extends Model {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public description!: string;
  public website!: string;
  public email!: string;
  public int_code!: string;
  public mobile!: string;
  public status!: string;
  public is_admin!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

FanPages.init(
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
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    website: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    int_code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mobile: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
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
    tableName: "fan_pages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      afterUpdate: async (FanPageData) => {
        await FanPageFollowers.update({ is_deleted: true }, { where: { fan_page_id: FanPageData.id } });
        await FanPagePosts.update({ is_deleted: true }, { where: { fan_page_id: FanPageData.id }, individualHooks: true });
      }
    }
  }
);

FanPages.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'user'
});

FanPages.hasOne(UploadFileMorph, {
  foreignKey: "related_id",
  sourceKey: 'id',
  as: 'FanPageImage'
});

FanPages.hasOne(UploadFileMorph, {
  foreignKey: "related_id",
  sourceKey: 'id',
  as: 'FanPageBannerImage'
});

FanPageFollowers.belongsTo(FanPages, {
  foreignKey: 'fan_page_id',
  as: 'fanPage'
});

FanPagePosts.belongsTo(FanPages, {
  foreignKey: 'fan_page_id',
  as: 'fanPage'
});