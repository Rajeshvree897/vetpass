import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import User from "./user"

export default class ForumsVetID extends Model {
  public id!: number
  public forum_id!: number
  public user_id!: number
}

ForumsVetID.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    forum_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    },
    user_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    tableName: "forums__vet_id",
    timestamps: false
  }
);

ForumsVetID.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'Users'
});



