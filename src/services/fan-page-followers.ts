import FanPageFollowers from "../db/models/fan-page-followers";
import FanPages from "../db/models/fan-pages";
import NotificationService from "./notification-service";

export default class FanPageFollowerService {
  constructor() { }

  async deleteFanPageFollower(id: number) {
    // return FanPageFollowers.update({ is_deleted: true },{ where: { id: id } })
    return FanPageFollowers.destroy({ where: { id: id } })
      .then(async () => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async acceptFollowRequest(id: number) {
    return FanPageFollowers.update(
      { status: 1 },
      { where: { id: id } }
    )
      .then(async () => {
        const fanPageFollowerData = await FanPageFollowers.findOne({ where: { id: id } });

        if(fanPageFollowerData && typeof fanPageFollowerData === 'object') {
          const fanPageId = fanPageFollowerData.fan_page_id;
          const fanPageData = await FanPages.findOne({ where: { id: fanPageId } });
          
          const notification = new NotificationService();
          let type = "approved_fan_page_follow_request";
          let fanPageTitle = fanPageData?.title;

          if(fanPageTitle && fanPageTitle.length > 50) {
            let length = 50;
            fanPageTitle = fanPageTitle?.substring(0, length) + '...';
          }
  
          const notifyData = {
            id: fanPageId,
            title: fanPageTitle,
            user_id: fanPageFollowerData?.follower_id 
          }
          
          notification.getTokenAndSendNotificationFanPages(notifyData, type);
        }
          
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async rejectFollowRequest(id: number) {
    return FanPageFollowers.update(
      { status: 0, },
      { where: { id: id } }
    )
      .then(async () => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
