import FrequentlyAskedQuestions from "../db/models/frequently-asked-questions";

export default class FrequentlyAskedQuestionsService {
  constructor() {}

  async getQuestion(id: number): Promise<FrequentlyAskedQuestions | null> {
    return FrequentlyAskedQuestions.findOne({ where: { id: id } })
      .then((frequentlyAskedQuestion) => {
        return frequentlyAskedQuestion;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addQuestion(
    frequentlyAskedQuestion: FrequentlyAskedQuestions
  ): Promise<FrequentlyAskedQuestions> {
    return FrequentlyAskedQuestions.create(frequentlyAskedQuestion)
      .then((frequentlyAskedQuestion) => {
        return frequentlyAskedQuestion;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateQuestion(
    frequentlyAskedQuestionsData: FrequentlyAskedQuestions,
    userId: number
  ): Promise<boolean> {
    return FrequentlyAskedQuestions.update(
      { question: frequentlyAskedQuestionsData.question, answer: frequentlyAskedQuestionsData.answer, application: frequentlyAskedQuestionsData.application, updated_by: userId },
      { where: { id: frequentlyAskedQuestionsData.id } }
    )
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteQuestions(id: number): Promise<boolean> {
    // return FrequentlyAskedQuestions.destroy({ where: { id: id } })
    //   .then(() => {
    //     return true;
    //   })
    //   .catch((error: Error) => {
    //     throw error;
    //   });
    return FrequentlyAskedQuestions.update({ is_deleted: true }, { where: { id:id } })
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    });
  }
}
