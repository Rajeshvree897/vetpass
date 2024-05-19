import csv from 'csvtojson';
import fs from "fs";
import { Op } from "sequelize";

import AgeDropDowns from "../db/models/age-drop-downs";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import NutritionAdvices from "../db/models/nutrition-advices";
import NutritionAdvicesAgeDropDowns from "../db/models/nutrition-advices-age-drop-downs";
import NutritionAdvicesAnimalTypes from "../db/models/nutrition-advices-animal-types";
import NutritionAdvicesBreeds from "../db/models/nutrition-advices-breeds";
import { CustomError } from "./error-service";
import NotificationService from "./notification-service";

export default class NutritionAdvicesService {
  constructor() { }

  async getNutritionAdvice(id: number): Promise<any> {
    return NutritionAdvices.findOne({where: { id: id }})
      .then(async (nutritionAdvices: any) => {
        if(nutritionAdvices) {
          const nutritionAdviceId = nutritionAdvices.id;
          // const NutritionAdvicesAgeDropDownsData = await NutritionAdvicesAgeDropDowns.findAll({where: { nutrition_advice_id: nutritionAdviceId }});
          const NutritionAdvicesBreedsData = await NutritionAdvicesBreeds.findAll({where: { nutrition_advice_id: nutritionAdviceId }});
          const NutritionAdvicesAnimalTypesData = await NutritionAdvicesAnimalTypes.findAll({where: { nutrition_advice_id: nutritionAdviceId }});
          
          // const NutritionAdvicesAgesFinalData: (AgeDropDowns | null)[] = []; 
          // await Promise.all(NutritionAdvicesAgeDropDownsData.map(async (NutritionAdvicesAgeDropDowns) => {
          //   const agesData = await AgeDropDowns.findOne({where: { id: NutritionAdvicesAgeDropDowns['age-drop-down_id'] }, attributes: ['id', 'age'], raw: true});
          //   NutritionAdvicesAgesFinalData.push(agesData);
          // }));

          const NutritionAdvicesBreedsFinalData: (Breeds | null)[] = []; 
          const breedsTypeArray: any = [];
          await Promise.all(NutritionAdvicesBreedsData.map(async (NutritionAdvicesBreeds) => {
            const breedsData = await Breeds.findOne({where: { id: NutritionAdvicesBreeds.breed_id }, attributes: ['id', 'name'], raw: true});
            NutritionAdvicesBreedsFinalData.push(breedsData);
            breedsTypeArray.push(NutritionAdvicesBreeds.breed_id);
          }));
          const nutritionAdvicesAnimalTypeArray: any = [];
          const NutritionAdviceAnimalTypesFinalData: (AnimalTypes | null)[] = []; 
          await Promise.all(NutritionAdvicesAnimalTypesData.map(async (NutritionAdvicesAnimalTypes) => {
            const animalTypesdata = await AnimalTypes.findOne({where: { id: NutritionAdvicesAnimalTypes['animal-type_id'] }, attributes: ['id', 'type'], raw: true});
            NutritionAdviceAnimalTypesFinalData.push(animalTypesdata);
            nutritionAdvicesAnimalTypeArray.push(NutritionAdvicesAnimalTypes['animal-type_id']);
          }));
          
          nutritionAdvices.breeds = NutritionAdvicesBreedsFinalData;
          // nutritionAdvices.ages = NutritionAdvicesAgesFinalData;
          nutritionAdvices.types = [...new Map(NutritionAdviceAnimalTypesFinalData.map(item =>
            [item?.id, item])).values()];
          nutritionAdvices.animalTypeArray = nutritionAdvicesAnimalTypeArray;
          nutritionAdvices.breedsTypeArray = breedsTypeArray;
          return nutritionAdvices;
        }
        return nutritionAdvices;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addNutritionAdvice(
    nutritionAdvices: any
  ): Promise<NutritionAdvices> {
    return NutritionAdvices.create({
      question: nutritionAdvices.question,
      answer: nutritionAdvices.answer,
      age_drop_downs: nutritionAdvices.age_drop_downs || null,
      order: nutritionAdvices.order,
      created_by: nutritionAdvices.created_by
    })
      .then(async nutritionAdvicesData => {
        const nutritionAdvicesDataId = nutritionAdvicesData.id;
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        // let agesData: object[] = [];

        const notification = new NotificationService();

        let type = "nutrition_advice";
        

        nutritionAdvices.type?.split(",").map(async (type: number) => {
          if(type) {
            animalTypesdata.push({ nutrition_advice_id: nutritionAdvicesDataId, "animal-type_id": type })
          }
        });
        
        await NutritionAdvicesAnimalTypes.bulkCreate(animalTypesdata);

        nutritionAdvices.breed?.split(",").map((breed: number) => {
          if(breed){
            breedsData.push({ nutrition_advice_id: nutritionAdvicesDataId, breed_id: breed })
          }
        });

        
        
        
        await NutritionAdvicesBreeds.bulkCreate(breedsData);

        // nutritionAdvices.age?.split(",").map((age: number) => {
        //   if(age) {
        //     agesData.push({ nutrition_advice_id: nutritionAdvicesDataId, "age-drop-down_id": age })
        //   }
        // });
        const notifyData = {
          question: nutritionAdvices.question,
          animal_types: animalTypesdata,
          breeds: breedsData,
          age_drop_downs: nutritionAdvices.age_drop_downs || null,
        }
        notification.sendAdviceNotification(notifyData, type);
        // await NutritionAdvicesAgeDropDowns.bulkCreate(agesData);

        return nutritionAdvicesData;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateNutritionAdvice(
    nutritionAdvicesData: any,
    userId: number
  ): Promise<boolean> {
    return NutritionAdvices.update(
      {
        question: nutritionAdvicesData.question,
        answer: nutritionAdvicesData.answer,
        age_drop_downs: nutritionAdvicesData.age_drop_downs || null,
        order: nutritionAdvicesData.order,
        updated_by: userId
      },
      { where: { id: nutritionAdvicesData.id } }
    )
      .then(async () => {
        const nutritionAdvicesDataId = nutritionAdvicesData.id;
        let animalTypesdata: object[] = [];
        let breedsData: object[] = [];
        let agesData: object[] = [];

        await NutritionAdvicesAnimalTypes.destroy({where: {nutrition_advice_id: nutritionAdvicesDataId}});
        nutritionAdvicesData.type?.split(",").map(async (type: number) => {
          if(type) {
            animalTypesdata.push({ nutrition_advice_id: nutritionAdvicesDataId, "animal-type_id": type })
          }
        });
        await NutritionAdvicesAnimalTypes.bulkCreate(animalTypesdata);

        await NutritionAdvicesBreeds.destroy({where: {nutrition_advice_id: nutritionAdvicesDataId}});
        nutritionAdvicesData.breed?.split(",").map((breed: number) => {
          if(breed){
            breedsData.push({ nutrition_advice_id: nutritionAdvicesDataId, breed_id: breed })
          }
        });
        await NutritionAdvicesBreeds.bulkCreate(breedsData);

        // await NutritionAdvicesAgeDropDowns.destroy({where: {nutrition_advice_id: nutritionAdvicesDataId}});
        // nutritionAdvicesData.age?.split(",").map((age: number) => {
        //   if(age) {
        //     agesData.push({ nutrition_advice_id: nutritionAdvicesDataId, "age-drop-down_id": age })
        //   }
        // });
        
        // await NutritionAdvicesAgeDropDowns.bulkCreate(agesData);

        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importNutritionAdvice(
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
    
    if(!('animal' in wellbeingJsonData[0] && 'age' in wellbeingJsonData[0] && 'question' in wellbeingJsonData[0] && 'answer' in wellbeingJsonData[0])){
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
      await NutritionAdvices.create({
        question: wellbeing.question,
        answer: wellbeing.answer,
        order: wellbeing.order || 1,
        age_drop_downs: (wellbeing && wellbeing.age) ? wellbeing.age : null,
        created_by: userId
      }).then(async (nutritionAdvicesData) => {
        console.log(wellbeing.animal);
        if (wellbeing && wellbeing.animal) {
          const animal = await Promise.all(wellbeing.animal.split("|").map((item: string) => item.trim()));
          await Promise.all(animal.map(async (i: any) => {
            const animalType = i && i.split("#")[0] || null;
            const breed = i && i.split("#")[1] || null;
            if (animalType) {
              types = types.map((i: any) => ({ id: i.id, type: i.type }));
              const type = types.filter((i: any) => i.type === animalType);
              if (type.length && type[0].id) {
                await NutritionAdvicesAnimalTypes.create({ nutrition_advice_id: nutritionAdvicesData.id, "animal-type_id": type[0].id });
              }
              if (breed && type.length && type[0].id) {
                breeds = breeds.map((i: any) => ({ id: i.id, name: i.name, animal_type: i.animal_type }));
                const breedData: any = breeds.filter((i: any) => i.animal_type == type[0].id && i.name == breed);
                if (breedData.length && breedData[0].id) {
                  await NutritionAdvicesBreeds.create({ nutrition_advice_id: nutritionAdvicesData.id, "breed_id": breedData[0].id });
                }
              }
            }
          }));
        }

        // const animalTypes = await Promise.all(wellbeing.animal_type.split(",").map((item: string) => item.trim()));
        // await Promise.all(animalTypes.map(async (animalType: any) => {
        //   const animalTypeData = await AnimalTypes.findOne({ where: { type: animalType }, attributes: ['id'], raw: true });
        //   if (animalTypeData) {
        //     await NutritionAdvicesAnimalTypes.create({ nutrition_advice_id: nutritionAdvicesData.id, "animal-type_id": animalTypeData.id });
        //   }
        // }));

        // const breeds = await Promise.all(wellbeing.breed.split(",").map((item: string) => item.trim()));
        // await Promise.all(breeds.map(async (breed: any) => {
        //   const breedData = await Breeds.findOne({ where: { name: breed }, attributes: ['id'], raw: true });
        //   if (breedData) {
        //     await NutritionAdvicesBreeds.create({ nutrition_advice_id: nutritionAdvicesData.id, "breed_id": breedData.id });
        //   }
        // }));

        // const ages = await Promise.all(wellbeing.age.split(",").map((item: string) => item.trim()));
        // await Promise.all(ages.map(async (age: any) => {
        //   const ageData = await AgeDropDowns.findOne({ where: { age: age }, attributes: ['id'], raw: true });
        //   if (ageData) {
        //     await NutritionAdvicesAgeDropDowns.create({ nutrition_advice_id: nutritionAdvicesData.id, "age-drop-down_id": ageData.id });
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

  async deleteNutritionAdvices(id: number): Promise<boolean> {
    // await NutritionAdvicesAnimalTypes.destroy({ where: { nutrition_advice_id: id } });
    // await NutritionAdvicesBreeds.destroy({ where: { nutrition_advice_id: id } });

    return NutritionAdvices.update({ is_deleted: true }, { where: { id:id } })
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      throw error;
    });
  }

  async deleteMultipleNutritionAdvices(id: number[]): Promise<boolean> {
    if(id.length) {
      // await NutritionAdvicesAnimalTypes.destroy({ where: { nutrition_advice_id: {[Op.in]: id} } });
      // await NutritionAdvicesBreeds.destroy({ where: { nutrition_advice_id: {[Op.in]: id} } });
      // await NutritionAdvicesAgeDropDowns.destroy({ where: { nutrition_advice_id: {[Op.in]: id} } });
      return NutritionAdvices.update({ is_deleted: true },{ where: { id: {[Op.in]: id} } })
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
    return NutritionAdvices.update(
      {
        order
      },
      { where: { id } }
    )
      .then(async (res) => {
        return res[0];
      });
  }

  async updateNutritionAdviceAnswer(
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
    
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }

    return Promise.all(wellbeingJsonData.map(async (wellbeing: any) => {
      if (wellbeing.answer && wellbeing.order) {
        await NutritionAdvices.update({
          answer: wellbeing.answer,
        }, { where: { order: wellbeing.order } });
      } else {
        return;
      }
    })).then(() => {
      return true;
    }).catch(() => {
      throw new CustomError("Something went wrong")
    });
  }
}
