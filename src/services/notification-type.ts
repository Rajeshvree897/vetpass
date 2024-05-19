import NotificationType from "../db/models/notification-type";
import { CustomError } from "./error-service";

export default class NotificationTypeService {
  constructor() {}

  async getNotificationType(id: number): Promise<NotificationType | null> {
    return NotificationType.findOne({ where: { id: id } })
      .then(notificationType => {
        return notificationType;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addNotificationType(
    notificationType: NotificationType
  ): Promise<NotificationType> {
    return NotificationType.create(notificationType)
      .then(notificationType => {
        return notificationType;
      })
      .catch((error: any) => {
        throw error;
      });
  }

  async updatenotificationType(
    notificationTypeData: NotificationType,
    userId: number
  ): Promise<any> {
    return NotificationType.update(
      {
        type: notificationTypeData.type,
        type_description: notificationTypeData.type_description,
        updated_by: userId
      },
      { where: { id: notificationTypeData.id } }
    )
      .then(notificationType => {
        return notificationType;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteNotificationType(id: number) {
    return NotificationType.destroy({ where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
