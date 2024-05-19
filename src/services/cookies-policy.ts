import CookiesPolicy from "../db/models/cookies-policy";

export default class CookiePolicyService {
  constructor() {}

  async getCookieDetail(): Promise<CookiesPolicy | null> {
    return CookiesPolicy.findAll({ limit: 1 })
      .then(result => {
        return result[0];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateCookiePolicy(updateData: CookiesPolicy): Promise<boolean> {
    return CookiesPolicy.update(updateData, { where: { id: updateData.id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
