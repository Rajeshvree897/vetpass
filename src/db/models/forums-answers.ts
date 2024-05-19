import { Model, DataTypes } from "sequelize"
import { sequelize } from "../index"
import User from "./user"

export default class ForumsAnswers extends Model {
  public id!: number
  public forum_id!: number
  public user_id!: number
}

ForumsAnswers.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    answer: {
        allowNull: false,
        type: DataTypes.STRING,
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
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN
    }
    
  },
  {
    sequelize,
    tableName: "forum_answers",
    timestamps: false
  }
);

ForumsAnswers.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'Users'
});



