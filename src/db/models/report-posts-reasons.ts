import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import ReportReasons from "./report-reasons";
import ReportPosts from "./report-posts";

export default class ReportPostsReasons extends Model {
    public id!: number;
    public report_post_id!: number;
    public "report-reason_id"!: number;
}

ReportPostsReasons.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrementIdentity: true
        },
        report_post_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        "report-reason_id": {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        tableName: "report_posts__report_reasons",
        timestamps: false
    }
);

ReportPostsReasons.hasOne(ReportReasons, {
    foreignKey: 'id',
    sourceKey: "report-reason_id",
    as: 'reason'
});