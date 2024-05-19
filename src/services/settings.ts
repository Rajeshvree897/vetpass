import Settings from "../db/models/settings";

export default class SettingService {
  constructor() {}

  async getSetting(id: number): Promise<Settings | null> {
    return Settings.findOne({ where: { id: id } })
      .then(async setting => {
        return setting;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSetting(settingData: Settings): Promise<boolean> {
    return Settings.update(settingData, { where: { id: settingData.id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

}
