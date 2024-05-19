import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import BreederServices from '../db/models/breeders-services';
import VetProfileServices from '../db/models/vet-profile-services';

export default class BreederService {
  constructor() { }

  async getBreederService(id: number) {
    return BreederServices.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addBreederService(BreederServiceData: BreederServices): Promise<BreederServices> {
    return BreederServices.create(BreederServiceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateBreederService(BreederServiceData: BreederServices) {
    return BreederServices.update(BreederServiceData, { where: { id: BreederServiceData.id } })
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteBreederService(id: number) {
    const isService = await VetProfileServices.count({ where: { "service_id": id, type: "breeders" }});
    if (isService) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    await VetProfileServices.destroy({ where: { "service_id": id }});
    return BreederServices.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleBreederServices(id: number[]): Promise<boolean> {
    if(id.length) {
      const isService = await VetProfileServices.count({ where: { "service_id": id, type: "breeders" }});
      if (isService) {
        throw new CustomError("Selected services are already in use, you cannot delete this!");
      }
      await VetProfileServices.destroy({ where: { "service_id": {[Op.in]: id}, type: "breeders" }});
      return BreederServices.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importBreederService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const BreederServiceJsonData = await csv().fromFile(file.path);
    if(!BreederServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in BreederServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(BreederServiceJsonData.map(async (data: any) => {
      const checkBreederService = await BreederServices.count({where: { service: data.name }});
      if(checkBreederService) {
        return;
      }
      await BreederServices.create({
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

  async getBreederServiceReportData(): Promise<BreederServices[] | null> {
    return BreederServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
      ]
    });
  }
}