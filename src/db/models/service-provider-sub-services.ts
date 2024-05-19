import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import ServiceProviderServices from "./service-provider-main-services";
import User from "./user";

export default class ServiceProviderSubServices extends Model {
  public id!: number;
  public service!: string;
  public main_service_id!: number;
  public description!: string;
  public duration!: number;
  public stack!: number;
  public price!: number;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number;
  public updated_by!: number;
}

ServiceProviderSubServices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    service: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {    
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    main_service_id: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    duration: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    stack: {
      allowNull: true,
      type: DataTypes.NUMBER
    },
    status: {
      allowNull: false,
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
    }
  },
  {
    sequelize,
    tableName: "service_provider_sub_services",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

ServiceProviderSubServices.belongsTo(ServiceProviderServices, {
  foreignKey: "main_service_id",
  as: 'MainServices'
});

ServiceProviderSubServices.belongsTo(User, {
  foreignKey: "created_by",
  as: 'CreatedBy'
});