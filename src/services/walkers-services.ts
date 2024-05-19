import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import WalkerServices from '../db/models/walkers-services';
import VetProfileServices from '../db/models/vet-profile-services';

export default class WalkerService {
  constructor() { }

  async getWalkerService(id: number) {
    return WalkerServices.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addWalkerService(walkerServiceData: WalkerServices): Promise<WalkerServices> {
    return WalkerServices.create(walkerServiceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateWalkerService(walkerServiceData: WalkerServices) {
    return WalkerServices.update(walkerServiceData, { where: { id: walkerServiceData.id } })
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteWalkerService(id: number) {
    const isService = await VetProfileServices.count({ where: { "service_id": id, type: "walkers" }});
    if (isService) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    await VetProfileServices.destroy({ where: { "service_id": id }});
    return WalkerServices.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleWalkerServices(id: number[]): Promise<boolean> {
    if(id.length) {
      const isService = await VetProfileServices.count({ where: { "service_id": id, type: "walkers" }});
      if (isService) {
        throw new CustomError("Selected services are already in use, you cannot delete this!");
      }
      await VetProfileServices.destroy({ where: { "service_id": {[Op.in]: id}, type: "walkers" }});
      return WalkerServices.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importWalkerService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const walkerServiceJsonData = await csv().fromFile(file.path);
    if(!walkerServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in walkerServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(walkerServiceJsonData.map(async (data: any) => {
      const checkWalkerService = await WalkerServices.count({where: { service: data.name }});
      if(checkWalkerService) {
        return;
      }
      await WalkerServices.create({
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

  async getWalkerServiceReportData(): Promise<WalkerServices[] | null> {
    return WalkerServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
      ]
    });
  }
}