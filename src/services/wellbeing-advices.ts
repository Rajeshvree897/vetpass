import csv from 'csvtojson';
import fs from "fs";
import { Op } from "sequelize";

import AgeDropDowns from "../db/models/age-drop-downs";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import WellbeingAdvices from "../db/models/first-aid-advices";
import WellbeingAgeDropDowns from "../db/models/first-aid-advices-age-drop-downs";
import WellbeingAnimalTypes from "../db/models/first-aid-advices-animal-types";
import WellbeingBreeds from "../db/models/first-aid-advices-breeds";
import { CustomError } from "./error-service";
import NotificationService from "./notification-service";

export default class WellbeingAdvicesService {
  constructor() { }

  async getWellbeingAdvice(id: number): Promise<any> {
    return WellbeingAdvices.findOne({ where: { id: id } })
      .then(async (wellbeingAdvices: any) => {
        if (wellbeingAdvices) {
          const wellbeingAdviceId = wellbeingAdvices.id;
          // const WellbeingAgeDropDownsData = await WellbeingAgeDropDowns.findAll({ where: { first_aid_advice_id: wellbeingAdviceId } });
          const WellbeingBreedsData = await WellbeingBreeds.findAll({ where: { first_aid_advice_id: wellbeingAdviceId } });
          const WellbeingAnimalTypesData = await WellbeingAnimalTypes.findAll({ where: { first_aid_advice_id: wellbeingAdviceId } });

          // const wellbeingAdvicesAgesFinalData: (AgeDropDowns | null)[] = [];
          // await Promise.all(WellbeingAgeDropDownsData.map(async (WellbeingAgeDropDowns) => {
          //   const agesData = await AgeDropDowns.findOne({ where: { id: WellbeingAgeDropDowns['age-drop-down_id'] }, attributes: ['id', 'age'], raw: true });
          //   wellbeingAdvicesAgesFinalData.push(agesData);
          // }));

          const WellbeingBreedsFinalData: (Breeds | null)[] = [];
          const breedsTypeArray: any = [];
          await Promise.all(WellbeingBreedsData.map(async (WellbeingBreeds) => {
            const breedsData = await Breeds.findOne({ where: { id: WellbeingBreeds.breed_id }, attributes: ['id', 'name'], raw: true });
            WellbeingBreedsFinalData.push(breedsData);
            breedsTypeArray.push(WellbeingBreeds.breed_id);
          }));

          const WellbeingAdviceAnimalTypesFinalData: (AnimalTypes | null)[] = [];
          const animalTypesArray: any = [];
          await Promise.all(WellbeingAnimalTypesData.map(async (WellbeingAnimalTypes) => {
            const animalTypesdata = await AnimalTypes.findOne({ where: { id: WellbeingAnimalTypes['animal-type_id'] }, attributes: ['id', 'type'], raw: true });
            WellbeingAdviceAnimalTypesFinalData.push(animalTypesdata);
            animalTypesArray.push(WellbeingAnimalTypes['animal-type_id']);
          }));

          wellbeingAdvices.breeds = WellbeingBreedsFinalData;
          wellbeingAdvices.animalTypesArray = animalTypesArray;
          wellbeingAdvices.breedsTypeArray =breedsTypeArray;
          // wellbeingAdvices.ages = wellbeingAdvicesAgesFinalData;
          wellbeingAdvices.types = [...new Map(WellbeingAdviceAnimalTypesFinalData.map(item =>
            [item?.id, item])).values()];
          return wellbeingAdvices;
        }
        return wellbeingAdvices;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addWellbeingAdvice(
    wellbeingAdvices: any
  ): Promise<WellbeingAdvices> {
    return WellbeingAdvices.create({
      question: wellbeingAdvices.question,
      answer: wellbeingAdvices.answer,
      order: wellbeingAdvices.order,
      age_drop_downs: wellbeingAdvices.age_drop_downs || null,
      created_by: wellbeingAdvices.created_by
    })
      .then(async wellbeingAdvicesData => {
        const wellbeingAdvicesDataId = wellbeingAdvicesData.id;
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        // let agesData: object[] = [];

        const notification = new NotificationService();

        wellbeingAdvices.type?.split(",").map(async (type: number) => {
          if (type) {
            animalTypesdata.push({ first_aid_advice_id: wellbeingAdvicesDataId, "animal-type_id": type })
          }
        });
        await WellbeingAnimalTypes.bulkCreate(animalTypesdata);

        wellbeingAdvices.breed?.split(",").map((breed: number) => {
          if (breed) {
            breedsData.push({ first_aid_advice_id: wellbeingAdvicesDataId, breed_id: breed })
          }
        });
        await WellbeingBreeds.bulkCreate(breedsData);

        // wellbeingAdvices.age?.split(",").map((age: number) => {
        //   if (age) {
        //     agesData.push({ first_aid_advice_id: wellbeingAdvicesDataId, "age-drop-down_id": age })
        //   }
        // });
        // await WellbeingAgeDropDowns.bulkCreate(agesData);

        const notifyData = {
          question: wellbeingAdvices.question,
          animal_types: animalTypesdata,
          breeds: breedsData,
          age_drop_downs: wellbeingAdvices.age_drop_downs || null
        }
        notification.sendAdviceNotification(notifyData, 'wellbeing_advice');

        return wellbeingAdvicesData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importWellbeingAdvice(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const wellbeingJsonData = await csv().fromFile(file.path);
    if(!wellbeingJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('animal' in wellbeingJsonData[0] && 'age' in wellbeingJsonData[0] && 'question' in wellbeingJsonData[0] && 'answer' in wellbeingJsonData[0] && 'order' in wellbeingJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    let ages:any[] = []
    let types:any[] = []
    let breeds:any[] = []
    if(wellbeingJsonData.length) {
      ages = await AgeDropDowns.findAll({attributes:['id', 'age']});
      types = await AnimalTypes.findAll({attributes:['id', 'type']});
      breeds = await Breeds.findAll({attributes:['id', 'name', 'animal_type']});
    }
    return Promise.all(wellbeingJsonData.map(async (wellbeing: any) => {
      if (!wellbeing.question && !wellbeing.answer) {
        return;
      }
      if(wellbeing && wellbeing.age) {
        ages = ages.map((i: any) => ({id: i.id, age: i.age}));
        const age = ages.filter((i: any) => i.age === wellbeing.age);
        wellbeing.age = age && age.length ? age[0].id : null;
      }
      await WellbeingAdvices.create({
        question: wellbeing.question,
        answer: wellbeing.answer,
        order: wellbeing.order || 1,
        age_drop_downs: (wellbeing && wellbeing.age) ? wellbeing.age : null,
        created_by: userId
      }).then(async (wellbeingAdvicesData) => {
        if (wellbeing && wellbeing.animal) {
          const animal = await Promise.all(wellbeing.animal.split("|").map((item: string) => item.trim()));
          await Promise.all(animal.map(async (i: any) => {
            const animalType = i && i.split("#")[0] || null;
            const breed = i && i.split("#")[1] || null;
            if (animalType) {
              types = types.map((i: any) => ({ id: i.id, type: i.type }));
              const type = types.filter((i: any) => i.type === animalType);
              if (type.length && type[0].id) {
                await WellbeingAnimalTypes.create({ first_aid_advice_id: wellbeingAdvicesData.id, "animal-type_id": type[0].id });
              }
              if (breed && type.length && type[0].id) {
                breeds = breeds.map((i: any) => ({ id: i.id, name: i.name, animal_type: i.animal_type }));
                const breedData: any = breeds.filter((i: any) => i.animal_type == type[0].id && i.name == breed);
                if (breedData.length && breedData[0].id) {
                  await WellbeingBreeds.create({ first_aid_advice_id: wellbeingAdvicesData.id, "breed_id": breedData[0].id });
                }
              }
            }
          }));
        }

        // const animalTypes = await Promise.all(wellbeing.animal_type.split(",").map((item: string) => item.trim()));
        // await Promise.all(animalTypes.map(async (animalType: any) => {
        //   const animalTypeData = await AnimalTypes.findOne({ where: { type: animalType }, attributes: ['id'], raw: true });
        //   if (animalTypeData) {
        //     await WellbeingAnimalTypes.create({ first_aid_advice_id: wellbeingAdvicesData.id, "animal-type_id": animalTypeData.id });
        //   }
        // }));

        // const breeds = await Promise.all(wellbeing.breed.split(",").map((item: string) => item.trim()));
        // await Promise.all(breeds.map(async (breed: any) => {
        //   const breedData = await Breeds.findOne({ where: { name: breed }, attributes: ['id'], raw: true });
        //   if (breedData) {
        //     await WellbeingBreeds.create({ first_aid_advice_id: wellbeingAdvicesData.id, "breed_id": breedData.id });
        //   }
        // }));

        // const ages = await Promise.all(wellbeing.age.split(",").map((item: string) => item.trim()));
        // await Promise.all(ages.map(async (age: any) => {
        //   const ageData = await AgeDropDowns.findOne({ where: { age: age }, attributes: ['id'], raw: true });
        //   if (ageData) {
        //     await WellbeingAgeDropDowns.create({ first_aid_advice_id: wellbeingAdvicesData.id, "age-drop-down_id": ageData.id });
        //   }
        // }));
      })
        .catch((error: Error) => {
          throw error;
        });
    })).then(() => {
      return true;
    }).catch(() => {
      throw new CustomError("Something went wrong")
    });
  }

  async updateWellbeingAdvice(
    wellbeingAdvicesData: any,
    userId: number
  ): Promise<boolean> {
    return WellbeingAdvices.update(
      {
        question: wellbeingAdvicesData.question,
        answer: wellbeingAdvicesData.answer,
        order: wellbeingAdvicesData.order,
        age_drop_downs: wellbeingAdvicesData.age_drop_downs || null,
        updated_by: userId
      },
      { where: { id: wellbeingAdvicesData.id } }
    )
      .then(async () => {
        const wellbeingAdvicesDataId = wellbeingAdvicesData.id;
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        // let agesData: object[] = [];

        await WellbeingAnimalTypes.destroy({ where: { first_aid_advice_id: wellbeingAdvicesDataId } });
        wellbeingAdvicesData.type?.split(",").map(async (type: number) => {
          if (type) {
            animalTypesdata.push({ first_aid_advice_id: wellbeingAdvicesDataId, "animal-type_id": type })
          }
        });
        await WellbeingAnimalTypes.bulkCreate(animalTypesdata);

        await WellbeingBreeds.destroy({ where: { first_aid_advice_id: wellbeingAdvicesDataId } });
        wellbeingAdvicesData.breed?.split(",").map((breed: number) => {
          if (breed) {
            breedsData.push({ first_aid_advice_id: wellbeingAdvicesDataId, breed_id: breed })
          }
        });
        await WellbeingBreeds.bulkCreate(breedsData);

        // await WellbeingAgeDropDowns.destroy({ where: { first_aid_advice_id: wellbeingAdvicesDataId } });
        // wellbeingAdvicesData.age?.split(",").map((age: number) => {
        //   if (age) {
        //     agesData.push({ first_aid_advice_id: wellbeingAdvicesDataId, "age-drop-down_id": age })
        //   }
        // });

        // await WellbeingAgeDropDowns.bulkCreate(agesData);

        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deletewellbeingAdvices(id: number): Promise<boolean> {
    // await WellbeingAnimalTypes.destroy({ where: { first_aid_advice_id: id } });
    // await WellbeingBreeds.destroy({ where: { first_aid_advice_id: id } });
    // await WellbeingAgeDropDowns.destroy({ where: { first_aid_advice_id: id } });
    // return WellbeingAdvices.destroy({ where: { id: id } })
    return WellbeingAdvices.update({ is_deleted: true }, { where: { id:id } })
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    });
  }

  async deleteMultipleWellbeingAdvices(id: number[]): Promise<boolean> {
    if(id.length) {
      // await WellbeingAnimalTypes.destroy({ where: { first_aid_advice_id: {[Op.in]: id} } });
      // await WellbeingBreeds.destroy({ where: { first_aid_advice_id: {[Op.in]: id} } });
      // await WellbeingAgeDropDowns.destroy({ where: { first_aid_advice_id: {[Op.in]: id} } });
      return WellbeingAdvices.update({ is_deleted: true }, { where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  async updateOrder(id: number, order: number): Promise<number> {
    return WellbeingAdvices.update(
      {
        order
      },
      { where: { id } }
    )
      .then(async (res) => {
        return res[0];
      });
  }
}
