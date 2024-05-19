import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import Country from "./country";
import PractitionerLiability from "./practitioner-liability";
import ServiceProviderLiability from "./service-provider-liability";
import User from "./user";
import VetPractices from "./vet-practices";
import VetProfileInterestedAnimalTypes from "./vet-profile-interested-animal-types";
import VetProfileInterestedSpecializations from "./vet-profile-interested-specializations";
import VetProfileSpecialities from "./vet-profile-specialities";
import VetProfileSpecialization from "./vet-profile-specialization";
import VetProfileTreatesTypeAnimal from "./vet-profile-treates-type-animal";

export default class VetProfile extends Model {
  public id!: number;
  public education!: string;
  // public speciality!: string;
  // public treates_type_animal!: string;
  // public experience!: number;
  // public work_detail!: string;
  // public img_path!: string;
  public created_at!: Date;
  public updated_at!: Date;
  // public latitude!: number;
  // public longitude!: number;
  // public date_of_qualification!: Date;
  public personal_bio!: string;
  public registration_number!: string;
  // public practice_ID!: string;
  public currency_type!: string;
  public in_clinic_consultation!: number;
  public online_consultation!: number;
  public is_in_clinic_consultation!: number;
  public is_online_consultation!: number;
  public practice!: number;
  public educationDuration!: string;
  public public_email!: string;
  public public_contact_no!: string;
  public public_out_of_hr_phone!: string;
  public public_contact_no_int_code!: string;
  public public_out_of_hr_phone_int_code!: string;
  public passout_date!: string;
  public user!: number;
  public practitioner_liability!: number;
  public service_provider_liability!: number;
  public created_by!: number;
  public updated_by!: number;
}

VetProfile.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    education: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    // speciality: {
    //   allowNull: true,
    //   type: DataTypes.STRING
    // },
    // treates_type_animal: {
    //   type: DataTypes.STRING,
    //   defaultValue: null
    // },
    // experience: {
    //   type: DataTypes.NUMBER,
    //   defaultValue: null
    // },
    // work_detail: {
    //   type: DataTypes.STRING,
    //   defaultValue: null
    // },
    // img_path: {
    //   type: DataTypes.STRING,
    //   defaultValue: null
    // },
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
    // latitude: {
    //   defaultValue: null,
    //   type: DataTypes.DOUBLE
    // },
    // longitude: {
    //   defaultValue: null,
    //   type: DataTypes.DOUBLE
    // },
    // date_of_qualification: {
    //   defaultValue: null,
    //   type: DataTypes.DATE
    // },
    personal_bio: {
      defaultValue: null,
      type: DataTypes.TEXT
    },
    registration_number: {
      defaultValue: null,
      type: DataTypes.STRING
    },
    // practice_ID: {
    //   defaultValue: null,
    //   type: DataTypes.STRING
    // },
    currency_type: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING
    },
    in_clinic_consultation: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    online_consultation: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    is_in_clinic_consultation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_online_consultation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    practice: {
      type: DataTypes.INTEGER
    },
    educationDuration: {
      type: DataTypes.STRING
    },
    public_email: {
      type: DataTypes.STRING
    },
    public_contact_no: {
      type: DataTypes.STRING
    },
    public_out_of_hr_phone: {
      type: DataTypes.STRING
    },
    public_contact_no_int_code: {
      type: DataTypes.STRING
    },
    public_out_of_hr_phone_int_code: {
      type: DataTypes.STRING
    },
    passout_date: {
      type: DataTypes.STRING
    },
    user: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    practitioner_liability: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    service_provider_liability: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.NUMBER
    },
    b_user_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_user_email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_country: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_currency: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_account_number: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_iban: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_ncc: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_sort_code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_swiftbic: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bank_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    b_address: {
      allowNull: true,
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
    }
  },
  {
    sequelize,
    tableName: "vet_profile",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);
VetProfile.belongsTo(VetPractices, {
  foreignKey: "practice",
  as: 'practices'
});
VetProfile.belongsTo(Country, {
  foreignKey: "b_country",
  as: "countries",
});
VetProfile.belongsTo(PractitionerLiability, {
  foreignKey: "practitioner_liability",
  as: "practitionerliabilities",
});
VetProfile.belongsTo(ServiceProviderLiability, {
  foreignKey: "service_provider_liability",
  as: "serviceProviderliabilities",
});
VetProfile.hasOne(VetProfileSpecialization, {
  foreignKey: "vet_profile_id",
  as: 'vetprofilespecializations'
});
VetProfile.hasOne(VetProfileSpecialities, {
  foreignKey: "vet_profile_id",
  as: 'vetprofilespecialities'
});
VetProfile.hasOne(VetProfileTreatesTypeAnimal, {
  foreignKey: "vet_profile_id",
  as: 'vetprofiletreatstypeanimal'
});
VetProfile.hasOne(VetProfileInterestedAnimalTypes, {
  foreignKey: "vet_profile_id",
  as: 'vetprofileinterestedanimaltypes'
});
VetProfile.hasOne(VetProfileInterestedSpecializations, {
  foreignKey: "vet_profile_id",
  as: 'vetprofileinterestedspecializations'
});