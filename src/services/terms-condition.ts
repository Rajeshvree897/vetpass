import TermsAndConditions from "../db/models/terms-and-conditions";

export default class TermsAndConditionsService {
  constructor() {}

  async getTermsAndConditionsDetail(): Promise<TermsAndConditions | null> {
    return TermsAndConditions.findAll({ limit: 1 })
      .then(result => {
        return result[0];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateTermsAndConditions(updateData: TermsAndConditions): Promise<boolean> {
    return TermsAndConditions.update(updateData, { where: { id: updateData.id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
