import FanPagePostComments from "../db/models/fan-page-post-comments";

export default class FanPagePostCommentService {
  constructor() { }

  // async deleteFanPagePostComment(fanPagePostId: number, id: number) {
  //   return FanPagePostComments.update({ is_deleted: true },{ where: { fan_page_post_id: fanPagePostId, id: id } })
  //     .then(async () => {
  //       await FanPagePostComments.update({ is_deleted: true },{ where: { fan_page_post_id: fanPagePostId, parent_comment_id: id } })
  //     })
  //     .catch((error: Error) => {
  //       throw error;
  //     });
  // }
  async deleteFanPagePostComment(fanPagePostId: number, id: number) {
    return FanPagePostComments.destroy({ where: { fan_page_post_id: fanPagePostId, id: id } })
      .then(async () => {
        await FanPagePostComments.destroy({ where: { fan_page_post_id: fanPagePostId, parent_comment_id: id } })
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
