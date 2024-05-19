import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalTypes from "./animal-types";
import Breeds from "./breeds";
import Chips from "./chips";
import Insurers from "./insurer";
import UploadFileMorph from "./upload-file-morph";
import User from "./user";

export default class AnimalProfiles extends Model {
  public id!: number;
  public animal_type!: number;
  public breed!: number;
  public colour!: string;
  public user!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public gender!: string;
  public name!: string;
  public spayed_neutered!: string;
  public height!: number;
  public height_type!: string;
  public weight!: number;
  public weight_type!: string;
  public date_of_birth!: Date;
  public chip_details!: string;
  public status!: string;
  public regd_breed_name!: string;
  public breed_regd_number!: string;
  public breeder!: string;
  public sire_name!: string;
  public sire_breed!: string;
  public dam_name!: string;
  public dam_breed!: string;
  public breed_reference!: string;
  public other!: string;
  public other_information!: string;
  public educationPassoutDate!: Date;
  public created_by!: number;
  public updated_by!: number;
  public insurance!: string;
  public insurers!: number;
  public InsuranceRenewalDate!: Date;
  public wantContact!: string;
  public chip!: number;
  public allergies!: string;
  public medications!: string;
}

AnimalProfiles.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    animal_type: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    breed: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    colour: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    user: {
      type: DataTypes.INTEGER,
      defaultValue: null
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    spayed_neutered: {
      allowNull: false,
      type: DataTypes.STRING
    },
    height: {
      defaultValue: null,
      type: DataTypes.DECIMAL(10, 2)
    },
    height_type: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    weight: {
      defaultValue: null,
      type: DataTypes.DECIMAL(10, 2)
    },
    weight_type: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    date_of_birth: {
      defaultValue: null,
      type: DataTypes.DATEONLY
    },
    chip_details: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    regd_breed_name: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    breed_regd_number: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    breeder: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    sire_name: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    sire_breed: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    dam_name: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    dam_breed: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    breed_reference: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    other: {
      defaultValue: null,
      type: DataTypes.TEXT
    },
    other_information: {
      defaultValue: null,
      type: DataTypes.TEXT
    },
    educationPassoutDate: {
      defaultValue: null,
      type: DataTypes.DATE
    },
    insurance: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    insurers: {
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    InsuranceRenewalDate: {
      defaultValue: null,
      type: DataTypes.DATEONLY
    },
    wantContact: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    chip: {
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    allergies: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    medications: {
      defaultValue: null,
      type: DataTypes.STRING
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
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "animal_profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
AnimalProfiles.hasOne(AnimalTypes, {
  foreignKey: "id",
  sourceKey: "animal_type",
  as: 'AnimalType'
});
AnimalProfiles.hasOne(Breeds, {
  foreignKey: "id",
  sourceKey: "breed",
  as: 'Breed'
});
AnimalProfiles.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user",
  as: 'User'
});
AnimalProfiles.hasOne(Insurers, {
  foreignKey: "id",
  sourceKey: "insurers",
  as: 'insurer'
});
AnimalProfiles.hasOne(Chips, {
  foreignKey: "id",
  sourceKey: "chip",
  as: 'Chip'
});
User.belongsTo(AnimalProfiles, {
  targetKey: 'user', 
  foreignKey: "id", 
  as: 'animalProfile' 
});
AnimalProfiles.belongsTo(UploadFileMorph, {
  foreignKey: "id",
  targetKey: 'related_id',
  as: 'AnimalProfilesIcon'
});