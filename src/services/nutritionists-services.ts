import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import NutritionistServices from '../db/models/nutritionists-services';
import VetProfileServices from '../db/models/vet-profile-services';

export default class NutritionistService {
  constructor() { }

  async getNutritionistService(id: number) {
    return NutritionistServices.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addNutritionistService(nutritionistServiceData: NutritionistServices): Promise<NutritionistServices> {
    return NutritionistServices.create(nutritionistServiceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateNutritionistService(nutritionistServiceData: NutritionistServices) {
    return NutritionistServices.update(nutritionistServiceData, { where: { id: nutritionistServiceData.id } })
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteNutritionistService(id: number) {
    const isService = await VetProfileServices.count({ where: { "service_id": id, type: "nutritionists" }});
    if (isService) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    await VetProfileServices.destroy({ where: { "service_id": id }});
    return NutritionistServices.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleNutritionistServices(id: number[]): Promise<boolean> {
    if(id.length) {
      const isService = await VetProfileServices.count({ where: { "service_id": id, type: "nutritionists" }});
      if (isService) {
        throw new CustomError("Selected services are already in use, you cannot delete this!");
      }
      await VetProfileServices.destroy({ where: { "service_id": {[Op.in]: id}, type: "nutritionists" }});
      return NutritionistServices.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importNutritionistService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const nutritionistServiceJsonData = await csv().fromFile(file.path);
    console.log("here", nutritionistServiceJsonData);
    if(!nutritionistServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in nutritionistServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(nutritionistServiceJsonData.map(async (data: any) => {
      const checkNutritionistService = await NutritionistServices.count({where: { service: data.name }});
      if(checkNutritionistService) {
        return;
      }
      await NutritionistServices.create({
        service: data.name,
        created_by: userId
      }).then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getNutritionistServiceReportData(): Promise<NutritionistServices[] | null> {
    return NutritionistServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
      ]
    });
  }
}