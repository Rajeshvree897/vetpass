import Cms from "../db/models/cms";

export default class CmsService {
  constructor() {}

  async getCMS(id: number): Promise<Cms | null> {
    return Cms.findOne({ where: { id: id } })
      .then(async cms => {
        return cms;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateCMS(
    cmsData: Cms,
    userId: number
  ): Promise<boolean> {
    return Cms.update(
      { title: cmsData.title, description: cmsData.description, updated_by: userId },
      { where: { id: cmsData.id } }
    )
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

}
