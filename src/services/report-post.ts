import ReportPosts from "../db/models/report-posts";
import ReportPostsReasons from "../db/models/report-posts-reasons";
import User from "../db/models/user";
import Posts from "../db/models/posts";

export default class ReportPostService {
  constructor() { }

  async getReportPost(id: number) {
    return ReportPosts.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          as: "user",
          required: false,
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Posts,
          as: "post",
          required: false,
          attributes: ['id', 'title', 'status']
        }
      ]
    })
      .then((ReportPost: any) => {
        return ReportPost;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteReportPost(id: number) {
    return ReportPosts.update({is_deleted: true},{ where: { id: id }, individualHooks: true })
      .then(async () => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
