import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";
import AnimalProfiles from "./animal-profiles";
import User from "./user";
import VetPractices from "./vet-practices";
import SubService from "./service-provider-sub-services";
import  AvailabilitiesTimeComponents from './components-time-slots';
import  AppointmentNotes from './appointment-notes';
export default class Appointments extends Model {
  public id!: number;
  public animal_name!: number;
  public symptoms!: string;
  public note!: string;
  public vet_practice!: number;
  public vet_id!: number;
  public user_id!: number;
  public service_id!: number;
  public date!: Date;
  public isOnlineAppointment!: number;
  public isTakingMedications!: string;
  public isAnyAllergies!: string;
  public appointmentSlotId!: number;
  public sinceFromSymptoms!: number;
  public appointment_note!: number;
  public appointment_date!: Date;
  public paymentIntentId!: number;
  public from_time!: string;
  public to_time!: string;
  public cancelled_by!: string;
  public published_at!: number;
  public created_by!: number;
  public updated_by!: number;
  public created_at!: number;
  public updated_at!: number;
}

Appointments.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    animal_name: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    symptoms: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    note: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    vet_practice: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    vet_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isOnlineAppointment: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.TINYINT,
    },
    isTakingMedications: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    isAnyAllergies: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    appointmentSlotId: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    sinceFromSymptoms: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    appointment_note: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATEONLY,
    },
    paymentIntentId: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    service_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER,
    },
    from_time: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    to_time: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    cancelled_by: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.STRING,
    },
    published_at: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATEONLY,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Appointments.hasOne(AnimalProfiles, {
  foreignKey: "id",
  sourceKey: "animal_name",
  as: 'animalName'
});

Appointments.hasOne(VetPractices, {
  foreignKey: "id",
  sourceKey: "vet_practice",
  as: 'vetPractice'
});

Appointments.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: 'users'
});

Appointments.hasOne(User, {
  foreignKey: "id",
  sourceKey: "vet_id",
  as: 'vet'
});

Appointments.hasOne(AvailabilitiesTimeComponents, {
  foreignKey: "id",
  sourceKey: "appointmentSlotId",
  as: 'appointmentSlot'
});

Appointments.hasOne(AppointmentNotes, {
  foreignKey: "id",
  sourceKey: "appointment_note",
  as: 'appointmentNote'
});


Appointments.hasOne(SubService, {
  foreignKey: "id",
  sourceKey: "service_id",
  as: 'service'
});