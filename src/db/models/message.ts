import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";
import User from "./user";
import UploadFileMorph from "./upload-file-morph";
import UploadFile from "./upload-file";
export default class Message extends Model {
	public id!: number;
	public from!: number;
	public to!: number;
	public message!: number;
	public timestamp!: number;
	public created_at!: Date;
	public updated_at!: Date;
	public created_by!: number;
	public updated_by!: number; 
	public room_id!: number;
	public is_system_msg!:number;
	public left_user !:number;
	public is_deleted !:number;
	public upload_file_id !:number;
	public parent_msg_id !:number;
	public is_edited !:number;
	public message_deleted !:number;
	public forwarded_from !:number;
}

Message.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrementIdentity: true
		},
		from: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		to: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
		message: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.TEXT
		},
		timestamp: {
			allowNull: false,
			type: DataTypes.BIGINT
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
		room_id: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.NUMBER
		},
		is_system_msg: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.TINYINT,
		},
		is_read: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.TINYINT,
		},
		read_by: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.STRING
		},
		left_user: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
		is_deleted: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.STRING
		},
		upload_file_id: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
		message_deleted: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.TINYINT,
		},
		is_edited: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.TINYINT,
		},
		parent_msg_id: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
		forwarded_from :{
			allowNull: true,
			type: DataTypes.INTEGER
		},
	},
	{
		sequelize,
		tableName: "messages",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
);

Message.hasMany(User, {
	foreignKey: "id",
	sourceKey: "to",
	as: "contactUser",
  });
Message.belongsTo(User, { foreignKey: 'from', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'to', as: 'recipient' });
Message.belongsTo(User, { foreignKey: 'forwarded_from', as: 'Originator' });
Message.hasOne(UploadFileMorph, {
	foreignKey : "related_id",
	sourceKey: "id",
	as: "UploadChatFile"
  });

  Message.hasOne(UploadFile, {
	foreignKey : "id",
	sourceKey: "upload_file_id",
	as: "UploadFiles"
  });

  Message.belongsTo(Message, {
	foreignKey: 'parent_msg_id',
  	as: 'Reply',
  });