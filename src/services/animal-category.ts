import AnimalCategories from "../db/models/animal-categories";

export default class AnimalCategoriesService {
  constructor() {}

  async getAnimalCategory(id: number): Promise<AnimalCategories | null> {
    return AnimalCategories.findOne({ where: { id: id } })
      .then((animalCategory) => {
        return animalCategory;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addAnimalCategory(
    animalCategory: AnimalCategories
  ): Promise<AnimalCategories> {
    return AnimalCategories.create(animalCategory)
      .then((animalCategory) => {
        return animalCategory;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateAnimalCategory(
    animalCategoryData: AnimalCategories,
    userId: number
  ): Promise<any> {
    return AnimalCategories.update(
      { category: animalCategoryData.category, status:animalCategoryData.status, order: animalCategoryData.order, updated_by: userId },
      { where: { id: animalCategoryData.id } }
    )
      .then((animalCategory) => {
        return animalCategory;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAnimalCategories(id: number) {
    return AnimalCategories.update({is_deleted: true }, { where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
