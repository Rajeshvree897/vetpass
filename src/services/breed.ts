import Breeds from "../db/models/breeds";

export default class BreedsService {
  constructor() {}

  async getBreed(id: number): Promise<Breeds | null> {
    return Breeds.findOne({ where: { id: id } })
      .then(async breed => {
        return breed;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addBreed(breed: Breeds): Promise<Breeds> {
    return Breeds.create(breed)
      .then(breed => {
        return breed;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateBreed(
    breedData: Breeds,
    typeId: number,
    userId: number
  ): Promise<boolean> {
    return Breeds.update(
      { name: breedData.name, status: breedData.status, animal_type: typeId, updated_by: userId },
      { where: { id: breedData.id } }
    )
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteBreeds(id: number): Promise<boolean> {
    return Breeds.update({is_deleted: true }, { where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
