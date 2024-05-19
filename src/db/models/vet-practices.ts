import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Country from "./country";
import State from "./state";
import UploadFileMorph from "./upload-file-morph";
import VetPracticesClassification from "./vet-practices-classification";
import VetPracticeServices from "./vet-practices-services";
import PetPracticeServices from "./vet-practices-pet-services";
import VetPracticeTimeBlocks from "./vet-practices-time-blocks";
import VetPracticesTypeAnimal from "./vet-practices-treates-type-animal";
import VetPracticesStoreClassification from "./vet-practices-store-classifications";

export default class VetPractices extends Model {
  public id!: number;
  public practice_name!: string;
  public option!: string;
  public address1!: string;
  public address2!: string;
  public country!: number;
  public state!: number;
  public city!: string;
  public zip_code!: string;
  public int_code!: string;
  public business_phone!: string;
  public out_of_hr_phone!: string;
  public email!: string;
  public website!: string;
  public monday_from!: string;
  public monday_to!: string;
  public tuesday_from!: string;
  public tuesday_to!: string;
  public wednesday_from!: string;
  public wednesday_to!: string;
  public thursday_from!: string;
  public thursday_to!: string;
  public friday_from!: string;
  public friday_to!: string;
  public saturday_from!: string;
  public saturday_to!: string;
  public sunday_from!: string;
  public sunday_to!: string;
  public practice_accreditation_no!: string;
  public other!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public speciality!: string;
  public img_path!: string;
  public latitude!: number;
  public longitude!: number;
  public location!: string;
  public created_by!: number;
  public updated_by!: number;
  public distance!: number;
  public public_email!: string;
  public flag!: string;
  public claimed_datetime!: Date;
  public stripe_account_id!: String;
}

VetPractices.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    practice_name: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    option: {
      defaultValue: "practice",
      type: DataTypes.STRING
    },
    address1: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    address2: {
      defaultValue: null,
      type: DataTypes.STRING
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
    business_phone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    out_of_hr_phone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    monday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    monday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    tuesday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    tuesday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    wednesday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    wednesday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    thursday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    thursday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    friday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    friday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    saturday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    saturday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    sunday_from: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    sunday_to: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    practice_accreditation_no: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    other: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    created_at: {
      defaultValue: null,
      type: DataTypes.DATE
    },
    updated_at: {
      defaultValue: null,
      type: DataTypes.DATE
    },
    speciality: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    img_path: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    latitude: {
      defaultValue: null,
      type: DataTypes.DOUBLE
    },
    longitude: {
      defaultValue: null,
      type: DataTypes.DOUBLE
    },
    location: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    created_by: {
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    updated_by: {
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    distance: {
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    public_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    },
    is_claimed: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    },
    claimed_datetime: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    stripe_account_id: {
      allowNull: true,
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: "vet_practices",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
VetPractices.hasMany(VetPracticesTypeAnimal, {
  foreignKey: "vet_practice_id",
  sourceKey: "id",
  as: 'VetPracticesTypeAnimal'
});
VetPractices.hasMany(VetPracticesClassification, {
  foreignKey: "vet_practice_id",
  sourceKey: "id",
  as: 'VetPracticesClassification'
});
VetPractices.hasMany(VetPracticesStoreClassification, {
  foreignKey: "vet_practice_id",
  sourceKey: "id",
  as: 'VetPracticesStoreClassification'
});
VetPractices.hasMany(VetPracticeTimeBlocks, {
  foreignKey: "vet_practice",
  sourceKey: "id",
  as: 'VetPracticeTimeBlocks'
});
VetPractices.hasMany(VetPracticeServices, {
  foreignKey: "vet_practice_id",
  sourceKey: "id",
  as: 'VetPracticeService'
});
VetPractices.hasMany(PetPracticeServices, {
  foreignKey: "vet_practice_id",
  sourceKey: "id",
  as: 'PetPracticeService'
});
VetPractices.belongsTo(Country, {
  foreignKey: "country",
  as: "countries",
});
VetPractices.belongsTo(State, {
  foreignKey: "state",
  as: "states",
});
VetPractices.belongsTo(Country, {
  foreignKey: "int_code",
  as: "intCode",
});
VetPractices.belongsTo(UploadFileMorph, {
  foreignKey: "id",
  targetKey: 'related_id',
  as: 'image'
});