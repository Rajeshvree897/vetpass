var http = require('http');

const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-adminSDK");

const _ = require('lodash');
import NotificationType from "../db/models/notification-type";
import { sequelize } from '../db';
import { Op } from "sequelize";
import Device from "../db/models/device";
require('dotenv').config()
export default class NotificationService {
    constructor() {
            if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount.config),
                databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
            });
        }
     }





async  sendPushNotification(notification:any, notificationTokens:any, type: any) {
    let registrationTokens:any = [];
    _.forEach(notificationTokens, (device:any) => {
        if (
            device.device_token !== null &&
            device.device_token !== undefined &&
            device.device_token !== ""
        ) {
            registrationTokens.push(device.device_token);
        }
    });
    if (!registrationTokens.length) {
        return false;
    }
    const payload =  {
        data: {
         type: type
        },
        android: {
          priority: 'high'
        },
        apns: {
          headers: {
            'apns-priority': '5',
            'apns-push-type': 'background',
            'apns-topic': 'com.vetpass.user'
          },
          payload: {
            aps: {
              contentAvailable: true
            }
          }
        },
        tokens: registrationTokens
      };


    return admin
        .messaging()
        .sendMulticast(payload)
        .then((response:any) => {
            if (response.failureCount > 0) {
                const failedTokens:any = [];
                response.results.forEach((resp:any, idx:any) => {
                    if (!resp.messageId) {
                        failedTokens.push(registrationTokens[idx]);
                    }
                });
                return failedTokens;
            }
            return null;
        })
        .then((tokens:any) => {
            return true;
        });
}

async  sendPushNotificationPop(notification:any, notificationTokens:any) {
    let registrationTokens:any = [];
    _.forEach(notificationTokens, (device:any) => {
        if (
            device.device_token !== null &&
            device.device_token !== undefined &&
            device.device_token !== ""
        ) {
            registrationTokens.push(device.device_token);
        }
    });
    if (!registrationTokens.length) {
        return false;
    }
    const payload =  {
        data: {
         type: 'logout'
        },
        android: {
          priority: 'high'
        },
        apns: {
          headers: {
            'apns-priority': '5',
            'apns-push-type': 'background',
            'apns-topic': 'com.vetpass.user'
          },
          payload: {

          }
        },
        tokens: registrationTokens
      };


    return admin
        .messaging()
        .sendMulticast(payload)
        .then((response:any) => {
            if (response.failureCount > 0) {
                const failedTokens:any = [];
                response.results.forEach((resp:any, idx:any) => {
                    if (!resp.messageId) {
                        failedTokens.push(registrationTokens[idx]);
                    }
                });
                return failedTokens;
            }
            return null;
        })
        .then((tokens:any) => {
            return true;
        });
}

async sendPushNotificationWithPayload(notification: any, notificationTokens: any, type: String) {
  let registrationTokens: any[] = [];
  _.forEach(notificationTokens, (device: any) => {
    if (
      device.device_token !== null &&
      device.device_token !== undefined &&
      device.device_token !== ""
    ) {
      registrationTokens.push(device.device_token);
    }
  });
  if (!registrationTokens.length) {
    return false;
  }

  const payload = {
    notification: {
      title: notification.title,
      body: notification.body,
    },
    data: {
      title: notification.title,
      body: notification.body,
      type: type,
      payload: notification.data
        ? JSON.stringify(notification.data)
        : JSON.stringify({}),
    }
  };
  const options = {
    priority: 'high'
  };

  return admin
    .messaging()
    .sendToDevice(registrationTokens, payload, options);
}

async getTokenAndSendNotification(notification:any, type: any) {
    let notificationTokens: any = [];
    if (!notification.users || !notification.users.length) {
        return;
    } else {
       const devices =  await Device.findAll({
            where: {
                user: {
                    [Op.in]: notification.users
                }
            }
        })
        await Device.destroy({
            where: {
                user: {
                    [Op.in]: notification.users
                }
            }
        })
        this.sendPushNotification(notification, devices, type);

    }
}

async getTokenAndSendNotificationPosts(notification:any, type: any) {
  if (!notification.user_id || notification.user_id === 'null') {
      return;
  } else {
     const devices =  await Device.findAll({
          where: {
              user: notification.user_id
          }
      })
      
      const notificationType = await NotificationType.findOne({ where: { type: type } });

      const notificationData = {
        title:
          notificationType && notificationType.type
            ? this.getNotificationTitle(notificationType.type)
            : this.getNotificationTitle(type),
        body: notification.title,
        priority: "high",
        pending: 1,
        data: notification.id,
        users: notification.user_id,
        notification_type: notificationType ? notificationType.id : null,
      };
      this.sendPushNotificationWithPayload(notificationData, devices, type);
  }
}

async getTokenAndSendNotificationFanPagePosts(notification:any, type: any) {
  if (!notification.user_id || notification.user_id === 'null') {
      return;
  } else {
     const devices =  await Device.findAll({
          where: {
              user: notification.user_id
          }
      })
      
      const notificationType = await NotificationType.findOne({ where: { type: type } });

      const notificationData = {
        title:
          notificationType && notificationType.type
            ? this.getNotificationTitle(notificationType.type)
            : this.getNotificationTitle(type),
        body: notification.description,
        priority: "high",
        pending: 1,
        data: notification.id ? { 
          id: notification.id 
        } : null,
        users: notification.user_id,
        notification_type: notificationType ? notificationType.id : null,
      };
      this.sendPushNotificationWithPayload(notificationData, devices, type);
  }
}

async getTokenAndSendNotificationForums(notification:any, type: any) {
  if (!notification.user_id || notification.user_id === 'null') {
      return;
  } else {
     const devices =  await Device.findAll({
          where: {
              user: notification.user_id
          }
      })
      
      const notificationType = await NotificationType.findOne({ where: { type: type } });

      const notificationData = {
        title:
          notificationType && notificationType.type
            ? this.getNotificationTitle(notificationType.type)
            : this.getNotificationTitle(type),
        body: notification.question,
        priority: "high",
        pending: 1,
        data: notification.id ? { 
          id: notification.id 
        } : null,
        users: notification.user_id,
        notification_type: notificationType ? notificationType.id : null,
      };
      this.sendPushNotificationWithPayload(notificationData, devices, type);
  }
}

async getTokenAndSendNotificationFanPages(notification:any, type: any) {
  if (!notification.user_id || notification.user_id === 'null') {
      return;
  } else {
     const devices =  await Device.findAll({
          where: {
              user: notification.user_id
          }
      })
      
      const notificationType = await NotificationType.findOne({ where: { type: type } });

      const notificationData = {
        title:
          notificationType && notificationType.type
            ? this.getNotificationTitle(notificationType.type)
            : this.getNotificationTitle(type),
        body: notification.title,
        priority: "high",
        pending: 1,
        data: notification.id,
        users: notification.user_id,
        notification_type: notificationType ? notificationType.id : null,
      };
      this.sendPushNotificationWithPayload(notificationData, devices, type);
  }
}

async getTokenAndSendNotificationVetUsersForum(notification:any, type: any) {
  if (!notification.userIds || notification.userIds === 'null' || !notification.userIds.length) {
      return;
  } else {
     const devices =  await Device.findAll({
          where: {
            user: {
              [Op.in]: notification.userIds
            }
          }
      })
      
      const notificationType = await NotificationType.findOne({ where: { type: type } });

      const notificationData = {
        title:
          notificationType && notificationType.type
            ? this.getNotificationTitle(notificationType.type)
            : this.getNotificationTitle(type),
        body: notification.username + " has invited you for new forum.",
        priority: "high",
        pending: 1,
        data: notification.id ? { 
          id: notification.id 
        } : null,
        users: notification.user_id,
        notification_type: notificationType ? notificationType.id : null,
      };
      this.sendPushNotificationWithPayload(notificationData, devices, type);
  }
}

async sendNotification(id: any, type: any) {

    // const start = moment().utc().add(5, 'm').format()
    // const end = moment().utc().add(6, 'm').format()
    // let sql = 'SELECT * FROM `users-permissions_user` where id = ' + id;

    const notificationDataUser = { users: [ id ], title: '', body: ``,notification_type: {type: "logout"}, data: {}, priority: 'high' }
    this.getTokenAndSendNotification(notificationDataUser, type)
}
async sendAdviceNotification(adviceData: any, type: any) {
    try {
        let userIds = [];
        let notificationTokens: any = [];
        let where: any = {};
        if (adviceData && adviceData.animal_types.length > 0) {
          where["animal_type_in"] = _.map(adviceData.animal_types, "animal-type_id");
          adviceData.animal_types.forEach((obj: any) => {
            delete obj.created_by;
            delete obj.updated_by;
          });
        }

        if (adviceData && adviceData.breeds.length > 0) {
          where["breed_in"] = _.map(adviceData.breeds, "breed_id");
          adviceData.breeds.forEach((obj:any) => {
            delete obj.created_by;
            delete obj.updated_by;
          });
        }
        // Filter by age
        if (adviceData && adviceData.age_drop_downs) {
          // where["ages_in"] = _.map(adviceData.age_drop_downs, "age-drop-down_id");
          where["ages_in"] = adviceData.age_drop_downs;
        }

        const notificationType = await NotificationType.findOne({ where: { type: type } })

        if (Object.keys(where).length > 0) {
          let query =
            "SELECT distinct animal_profiles.* " +
            "FROM animal_profiles " +
            "LEFT JOIN `animal_types` as animal_types ON animal_profiles.animal_type = animal_types.id " +
            "LEFT JOIN `breeds` as breeds ON animal_profiles.breed = breeds.id ";
          let whereCondition = "WHERE ";
          if (where["animal_type_in"]) {
            whereCondition =
              whereCondition +
              "animal_types.id IN (" +
              where["animal_type_in"] +
              ")";
          }
          if (where["breed_in"]) {
            if (where["animal_type_in"])
              whereCondition = whereCondition + " AND ";
            whereCondition =
              whereCondition + "breeds.id IN (" + where["breed_in"] + ")";
          }
          if (where["ages_in"]) {
            if (!where["animal_type_in"] && !where["breed_in"]) {
              if(adviceData.age_drop_downs == 2) {
                whereCondition =
                  whereCondition +
                  " (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) < 1 ";
              } else if(adviceData.age_drop_downs >= 3 && adviceData.age_drop_downs <= 51) {
                const age = adviceData.age_drop_downs - 2;
                whereCondition =
                  whereCondition +
                  " (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) = "+ age +" ";
              } else if(adviceData.age_drop_downs == 52) {
                whereCondition =
                  whereCondition +
                  " (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) >= 50 ";
              }
              // whereCondition =
              //   whereCondition +
              //   " DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0 IN (" +
              //   where["ages_in"] +
              //   ")";
            } else {
              if(adviceData.age_drop_downs == 2) {
                whereCondition =
                  whereCondition +
                  " AND (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) < 1 ";
              } else if(adviceData.age_drop_downs >= 3 && adviceData.age_drop_downs <= 51) {
                const age = adviceData.age_drop_downs - 2;
                whereCondition =
                  whereCondition +
                  " AND (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) = "+ age +" ";
              } else if(adviceData.age_drop_downs == 52) {
                whereCondition =
                  whereCondition +
                  " AND (DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0) >= 50 ";
              }
              // whereCondition =
              //   whereCondition +
              //   " AND DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),animal_profiles.date_of_birth)), '%Y')+0 IN (" +
              //   where["ages_in"] +
              //   ")";
            }
          }
          if(where["animal_type_in"] || where["breed_in"] || adviceData.age_drop_downs != 1) {
            query += whereCondition;
          }
          let animalProfile: any = await sequelize.query(
            query
          );
          if (animalProfile && animalProfile[0]) {
            animalProfile = animalProfile[0];
          }
          // animalProfile = await strapi.query("animal-profile").find(where);
          if (animalProfile.length > 0) {
            userIds = _.map(animalProfile, "user");
              notificationTokens =  await Device.findAll({
                where: {
                    user: {
                        [Op.in]: userIds
                    }
                }
            });
        }

        if (!userIds || !userIds.length) {
          return false;
        }
        delete adviceData.created_by;
        delete adviceData.updated_by;
        const notificationData = {
          title:
            notificationType && notificationType.type
              ? this.getNotificationTitle(notificationType.type)
              : this.getNotificationTitle(type),
          body: adviceData.question,
          priority: "high",
          pending: 1,
          data: adviceData,
          users: userIds,
          notification_type: notificationType ? notificationType.id : null,
        };
        this.sendPushNotificationWithPayload(notificationData, notificationTokens, type);
        }
      } catch {
        console.log("Error in send advice notification : ");
        return false;
      }
}

// SEND MESSAGE NOTITFICATIONS
async sendChatNotifications(data: any, type: string) {
  let deviceTokens = await Device.findAll({
    attributes: ["device_token"],
    where: {
      user: {
        [Op.in]: data.userIds
      },
    },
    raw: true
  });
  deviceTokens = deviceTokens && deviceTokens.length ? deviceTokens.map((i: any) => i.device_token) : [];

  const payload = {
    notification: {
      title: data.title,
      body: data.body,
    },
    data: {
      title: data.title,
      body: data.body,
      type,
      payload: JSON.stringify(data.payload),
    }
  };
  const options = {
    priority: 'high'
  };

  if (deviceTokens && deviceTokens.length) {
    return admin
      .messaging()
      .sendToDevice(deviceTokens, payload, options);
  } else {
    return true;
  }

}

getNotificationTitle(type: any) {
    let title = "Vet pass";
    switch (type) {
      case "wellbeing_advice":
        title = "Added new wellbeing advice";
        break;
      case "nutrition_advice":
        title = "Added new nutrition advice";
        break;
      case "approved_post":
        title = "VETPASS ADMIN has approved your post";
        break;
      case "approved_forum":
        title = "VETPASS ADMIN has approved your forum";
        break;
      case "approved_fan_page":
        title = "VETPASS ADMIN has approved your fan page";
        break;
      case "approved_fan_page_post":
        title = "VETPASS ADMIN has approved your fan page post";
        break;
      case "vet_users_forum":
        title = "Vet invitation";
        break;
      case "approved_fan_page_follow_request":
        title = "VETPASS ADMIN has approved your fan page follow request";
        break;
      case "cancel appointment":
        title = "Appointment Cancelled";
        break;
      default:
        title = "Vet Pass1";
    }
    return title;
  };
}