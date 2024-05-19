import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import TherapistServices from '../db/models/therapists-services';
import VetProfileTherapistsServices from '../db/models/vet-profile-therapists-services';
import VetProfileServices from '../db/models/vet-profile-services';

export default class TherapistService {
  constructor() { }

  async getTherapistService(id: number) {
    return TherapistServices.findOne({
      where: { id: id },
    })
      .then((service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addTherapistService(therapistServiceData: TherapistServices): Promise<TherapistServices> {
    return TherapistServices.create(therapistServiceData)
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateTherapistService(therapistServiceData: TherapistServices) {
    return TherapistServices.update(therapistServiceData, { where: { id: therapistServiceData.id } })
      .then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteTherapistService(id: number) {
    const isService = await VetProfileServices.count({ where: { "service_id": id, type: "therapists" }});
    if (isService) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    await VetProfileServices.destroy({ where: { "service_id": id }});
    return TherapistServices.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleTherapistServices(id: number[]): Promise<boolean> {
    if(id.length) {
      const isService = await VetProfileServices.count({ where: { "service_id": id, type: "therapists" }});
      if (isService) {
        throw new CustomError("Selected services are already in use, you cannot delete this!");
      }
      await VetProfileServices.destroy({ where: { "service_id": {[Op.in]: id}, type: "therapists" }});
      return TherapistServices.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importTherapistService(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const therapistServiceJsonData = await csv().fromFile(file.path);
    if(!therapistServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in therapistServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(therapistServiceJsonData.map(async (data: any) => {
      const checkTherapistService = await TherapistServices.count({where: { service: data.name }});
      if(checkTherapistService) {
        return;
      }
      await TherapistServices.create({
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

  async getTherapistServiceReportData(): Promise<TherapistServices[] | null> {
    return TherapistServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
      ]
    });
  }
}