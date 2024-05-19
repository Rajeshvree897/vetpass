import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import GroomersServices from "./groomers-services";

export default class VetProfileServices extends Model {
  public id!: number;
  public vet_profile_id!: number;
  public price!: number;
  public "service_id"!: number;
  public "type"!: string;

}

VetProfileServices.init(
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
    "service_id": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "price": {
      type: DataTypes.NUMBER,
      defaultValue: null,
      allowNull: true
    },
    "type": {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "components_time_service_provider_services",
    timestamps: false
  }
);
VetProfileServices.belongsTo(GroomersServices, {
  foreignKey: "groomer-service_id",
  as: 'groomersServices'
});
