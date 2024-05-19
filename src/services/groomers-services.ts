import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service"
import { Op } from "sequelize";
import GroomerServices from '../db/models/groomers-services';
import VetProfileServices from '../db/models/vet-profile-services';

export default class GroomerService {
  constructor() { }

  async getGroomerService(id: number) {
    return GroomerServices.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addGroomerService(groomerServiceData: GroomerServices): Promise<GroomerServices> {
    return GroomerServices.create(groomerServiceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateGroomerService(groomerServiceData: GroomerServices) {
    return GroomerServices.update(groomerServiceData, { where: { id: groomerServiceData.id } })
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteGroomerService(id: number) {
    const isService = await VetProfileServices.count({ where: { "service_id": id, type: "groomers" }});
    if (isService) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    await VetProfileServices.destroy({ where: { "service_id": id, type: "groomers" }});
    return GroomerServices.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleGroomerServices(id: number[]): Promise<boolean> {
    if(id.length) {
      const isService = await VetProfileServices.count({ where: { "service_id": id, type: "groomers" }});
      if (isService) {
        throw new CustomError("Selected services are already in use, you cannot delete this!");
      }
      await VetProfileServices.destroy({ where: { "service_id": {[Op.in]: id}, type: "groomers" }});
      return GroomerServices.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importGroomerService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const groomerServiceJsonData = await csv().fromFile(file.path);
    if(!groomerServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in groomerServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(groomerServiceJsonData.map(async (data: any) => {
      const checkGroomerService = await GroomerServices.count({where: { service: data.name }});
      if(checkGroomerService) {
        return;
      }
      await GroomerServices.create({
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

  async getGroomerServiceReportData(): Promise<GroomerServices[] | null> {
    return GroomerServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
      ]
    });
  }
}