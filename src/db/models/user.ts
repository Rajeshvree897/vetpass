import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Country from "./country";
import State from "./state";
import UsersPermissionsRole from "./users-permissions-role";
import VetProfile from "./vet-profile";
import UploadFileMorph from "./upload-file-morph";
import Appointments from "./appointments";


export default class User extends Model {
  public id!: number;
  public company_name!: string;
  public sub_id!: number;
  public sub_history_id!: number;
  public sub_start_date!: Date;
  public sub_end_date!: Date;
  public paymentIntentId!: string;
  public email!: string;
  public provider!: string;
  public password!: string;
  public resetPasswordToken!: string;
  public blocked!: number;
  public role!: number;
  public first_name!: string;
  public last_name!: string;
  public dob!: Date;
  public mobile!: string;
  // public home_address!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public confirmed!: number;
  public otp!: number;
  public created_by!: number;
  public updated_by!: number;
  // public username!: string;
  public address1!: string;
  public address2!: string;
  public country!: number;
  public state!: number;
  public city!: string;
  public zip_code!: string;
  public int_code!: string;
  // public user_profile!: number;
  public timezone!: string;
  public latitude!: number;
  public longitude!: number;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    blocked: {
      type: DataTypes.TINYINT,
      defaultValue: null
    },
    role: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    mobile: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    // home_address: {
    //   type: DataTypes.STRING,
    //   defaultValue: null
    // },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    confirmed: {
      type: DataTypes.TINYINT,
      defaultValue: null
    },
    otp: {
      type: DataTypes.BIGINT,
      defaultValue: null
    },
    created_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    updated_by: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    // username: {
    //   type: DataTypes.STRING,
    //   defaultValue: null
    // },
    address1: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    address2: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    country: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    state: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    zip_code: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    int_code: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    sub_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    sub_history_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    sub_start_date: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    sub_end_date: {
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    // user_profile: {
    //   type: DataTypes.NUMBER,
    //   defaultValue: null
    // },
    timezone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    latitude: {
      type: DataTypes.FLOAT,
      defaultValue: null
    },
    longitude: {
      type: DataTypes.FLOAT,
      defaultValue: null
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "users-permissions_user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
User.belongsTo(UsersPermissionsRole, {
  foreignKey: 'role',
  // sourceKey: 'role',
  as: 'Role'
})
User.hasMany(VetProfile, {
  foreignKey: "user",
  sourceKey: "id",
  as: 'VetProfileUser'
});
User.belongsTo(Country, {
  foreignKey: "country",
  as: "countries",
});
User.belongsTo(State, {
  foreignKey: "state",
  as: "states",
});
User.belongsTo(Country, {
  foreignKey: "int_code",
  as: "intCode",
});
User.hasOne(UploadFileMorph, {
  foreignKey : "related_id",
  as: "UploadProfile"
});
// User.hasMany(Appointments, {
//   foreignKey: "user_id",
//   // sourceKey: "id",
//   as: 'AppointmentUser'
// });

