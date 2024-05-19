import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import WalkersServices from "./walkers-services";

export default class VetProfileWalkersServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public "walker-service_id"!: number;
}

VetProfileWalkersServices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    vet_profile_id: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "walker-service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "vet_profile__walker_services",
    timestamps: false
  }
);
VetProfileWalkersServices.belongsTo(WalkersServices, {
  foreignKey: "walker-service_id",
  as: 'walkersServices'
});
