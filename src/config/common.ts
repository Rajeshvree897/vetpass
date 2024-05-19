import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file️.");
}

export default {
  role: {
    admin: 1,
    super_admin_role_name: 'Super Admin',
    admin_role_name: 'admin',
    app_user_role_name: 'App User',
    vet_practice_admin_role_name: 'Administrator',
    vet_role_name: 'Vet',
    public_role_name: 'Public',
    vetpass_staff_role_name: 'VETPass Staff',
    technician_nurse_role_name: 'Vet Technician/Nurse',
    groomer_role_name: 'Groomers',
    walker_role_name: 'Walkers',
    therapist_role_name: 'Therapists',
    nutritionists_role_name: 'Nutritionists',
    breeders_role_name: 'Breeders',
    third_party_companies_role_name: 'Third Party Companies',
    service_provider_role_name: 'Service Provider',
  },
  mailSmtp: {
    host: process.env.AWS_SMTP_HOST,
    port: process.env.AWS_SMTP_PORT,
    secure: process.env.AWS_SMTP_SECURE,
    user: process.env.AWS_SMTP_USERNAME,
    pass: process.env.AWS_SMTP_PASSWORD,
    from: process.env.AWS_SMTP_FROM
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || '1000',
      secure: false, // true for 465, false for other ports
      service: '',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    },
    mailSubject:'Reset password request',
    mailFromName: 'Tatvasoft',
    mailFromEmail: 'harsh.malvi@internal.mail'
  },
  createUser: {
    mailSubject:'Welcome to VETPASS',
  },
  addForumVetUser: {
    mailSubject:'Welcome to VETPASS Forum'
  }
};
