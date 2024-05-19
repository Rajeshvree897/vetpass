import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import Posts from "./posts";
import ReportPostsReasons from "./report-posts-reasons";

export default class ReportPosts extends Model {
    public id!: number;
    public post_id!: number;
    public user_id!: number;
    public created_by!: number;
    public updated_by!: number;
    public created_at!: Date;
    public updated_at!: Date;
}

ReportPosts.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        post_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        user_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
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
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        tableName: "report_posts",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        hooks: {
            afterUpdate: async (reportPosts) => {
                await ReportPostsReasons.update({ is_deleted: true }, { where: { report_post_id: reportPosts.id } });
            }
        }
    }
);

ReportPosts.hasOne(User, {
    foreignKey: "id",
    sourceKey: "user_id",
    as: 'user'
});

ReportPosts.hasMany(ReportPostsReasons, {
    foreignKey: 'report_post_id',
    as: 'reportReasons',
    /* onDelete: 'cascade',
    hooks: true */
});