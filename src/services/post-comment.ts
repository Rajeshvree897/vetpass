import PostComments from "../db/models/post-comments";

export default class PostCommentService {
  constructor() { }

  async deletePostComment(postId: number, id: number) {
    return PostComments.destroy({ where: { post_id: postId, id: id } })
      .then(async () => {
        await PostComments.destroy({ where: { post_id: postId, parent_comment_id: id } })
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
