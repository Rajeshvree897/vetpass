import PrivacyPolicy from "../db/models/privacy-policy";

export default class PrivacyPolicyService {
  constructor() {}

  async getPrivacyDetail(): Promise<PrivacyPolicy | null> {
    return PrivacyPolicy.findAll({ limit: 1 })
      .then(result => {
        return result[0];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateprivacyPolicy(updateData: PrivacyPolicy): Promise<boolean> {
    return PrivacyPolicy.update(updateData, { where: { id: updateData.id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
