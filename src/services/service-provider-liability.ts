import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import ServiceProviderLiability from '../db/models/service-provider-liability';


export default class PractitionerLiabilities {
  constructor() { }

  async getServiceProviderLiability(id: number) {
    return ServiceProviderLiability.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async ServiceProviderLiability(serviceData: ServiceProviderLiability): Promise<ServiceProviderLiability> {
    return ServiceProviderLiability.create(serviceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateServiceProviderLiability(serviceData: ServiceProviderLiability) {
    return ServiceProviderLiability.update(serviceData, { where: { id: serviceData.id } })
      .then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteServiceProviderLiability(id: number) {
    return ServiceProviderLiability.update({ is_deleted: true },{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleServiceProviderLiabilities(id: number[]): Promise<boolean> {
    if(id.length) {
      return ServiceProviderLiability.update({ is_deleted: true },{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importServiceProviderLiability(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const practiceJsonData = await csv().fromFile(file.path);
    if(!practiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in practiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(practiceJsonData.map(async (serviceProvider: any) => {
      const checkServiceProviderLiability = await ServiceProviderLiability.count({where: { name: serviceProvider.name, is_deleted : null }});
      if(checkServiceProviderLiability) {
        return;
      }
      await ServiceProviderLiability.create({
        name: serviceProvider.name,
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

  async getServiceProviderLiabilityReportData(): Promise<ServiceProviderLiability[] | null> {
    return ServiceProviderLiability.findAll({
      where: { is_deleted : null},
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}