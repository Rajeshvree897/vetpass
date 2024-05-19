import uuidv4 from "uuid/v4";
import config from "../config";
import StrapiAdministrator from "../db/models/strapi-administrator";
import { SuperAdminRepository } from "../db/repositories/super-admin.repository";
import { mailer } from "../helpers/mailer";
import { CustomError } from "./error-service";

const NODE_ENV = process.env.NODE_ENV;
const baseUrl = NODE_ENV == "production" ? "https://admin.vetpass.com/" : "https://staging-admin.vetpass.com/";

export default class SuperAdminService {
  private superAdminRepository: SuperAdminRepository;
  constructor() {
    this.superAdminRepository = new SuperAdminRepository();
   }

  async getDatatableListing(query: any): Promise<any> {
    return await this.superAdminRepository.getDataTableListing(query);
  }

  async getResource(id: number): Promise<StrapiAdministrator | null> {
    return await this.superAdminRepository.getById(id);
  }

  async createResource(user: { email: string, firstname: string, lastname: string }): Promise<StrapiAdministrator> {
    const passwordResetUUID = uuidv4();

    const userObject = {
      resetPasswordToken: passwordResetUUID,
      ...user
    }
    
    const { data: createdUser } = await this.superAdminRepository.create(userObject);
    await this.sendCreationMail(createdUser);

    return createdUser;
  }

  async sendCreationMail(user: StrapiAdministrator): Promise<void> {
    const mailOption = {
      to: user.email || '',
      subject: config.common.createUser.mailSubject,
      data: {
        userName: `${user.firstname} ${user.lastname}`,
        baseUrl,
        resetPasswordURL:
          config.baseUrl +
          config.resetPasswordUri +
          user.resetPasswordToken
      }
    };

    await mailer.sendMail(mailOption, "create-super-admin.ejs");
  }

  async updateResource(body: any): Promise<StrapiAdministrator[]> {
    const {id, ...user} = body

    return await this.superAdminRepository.update(id, user);
  }

  async deleteResource(id: number): Promise<void> {
    const isDeleted = await this.superAdminRepository.deleteById(id);

    if (!isDeleted) {
      throw new CustomError("The resource was not deleted");
    }
  }
}
