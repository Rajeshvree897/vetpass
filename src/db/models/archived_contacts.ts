import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import User from './user'
import Room from './rooms'
export default class ArchivedContacts extends Model {
  public id!: number;
  public user_id!: number;
  public contact_id!: number;
  public room_id!: string;
//   public published_at!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

ArchivedContacts.init(
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
        defaultValue:null,
        type: DataTypes.INTEGER
    },
    contact_id: {
        allowNull: true,
        defaultValue:null,
        type: DataTypes.INTEGER
    },
    room_id: {
        allowNull: true,
        defaultValue:null,
        type: DataTypes.INTEGER
    },
    // published_at: {
    //   allowNull: true,
    //   defaultValue:null,
    //   type: DataTypes.DATEONLY
    // },
    created_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    updated_by: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
      }
  },
  {
    sequelize,
    tableName: "archived_contacts",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

// association
ArchivedContacts.belongsTo(User, {
    foreignKey: "user_id",
    as: "archivedFrom",
  });

  ArchivedContacts.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room",
  });

  ArchivedContacts.belongsTo(User, {
    foreignKey: "contact_id",
    as: "archivedTo",
  });