import ContactDetails from "../db/models/contact-details";

export default class ContactUsService {
  constructor() {}

  async getContactDetail(): Promise<ContactDetails | null> {
    return ContactDetails.findAll({ limit: 1 })
      .then(result => {
        return result[0];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateContactUs(updateData: ContactDetails): Promise<any> {
    const contactUsDetail = await ContactDetails.count({where: { id: updateData.id }});
    if(contactUsDetail) {
      return ContactDetails.update(updateData, { where: { id: updateData.id } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return ContactDetails.create(updateData)
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
