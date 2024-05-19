import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import PetServices from '../db/models/pet-services';
export default class PetService {
  constructor() { }

  async getPetService(id: number) {
    return PetServices.findOne({
      where: { id: id },
    })
      .then((pet: any) => {
        return pet;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addPetService(petData: PetServices): Promise<PetServices> {
    return PetServices.create(petData)
      .then(async (pet: any) => {
        return pet;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updatePetService(petData: PetServices) {
    return PetServices.update(petData, { where: { id: petData.id } })
      .then(async (pet: any) => {
        return pet;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deletePetService(id: number) {
    return PetServices.update({ is_deleted: true},{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultiplePetServices(id: number[]): Promise<boolean> {
    if(id.length) {
      return PetServices.update({ is_deleted: true},{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importPetService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const petJsonData = await csv().fromFile(file.path);
    if(!petJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in petJsonData[0] && 'order' in petJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(petJsonData.map(async (pet: any) => {
      const checkPetService = await PetServices.count({where: { name: pet.name, is_deleted : null }});
      if(checkPetService) {
        return;
      }
      await PetServices.create({
        name: pet.name,
        order: pet.order,
        created_by: userId
      }).then(async (pet: any) => {
        return pet;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getPetServiceReportData(): Promise<PetServices[] | null> {
    return PetServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}