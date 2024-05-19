import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import PracticeServices from '../db/models/practice-services';

export default class PracticeService {
  constructor() { }

  async getPracticeService(id: number) {
    return PracticeServices.findOne({
      where: { id: id },
    })
      .then((practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addPracticeService(practiceData: PracticeServices): Promise<PracticeServices> {
    return PracticeServices.create(practiceData)
      .then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updatePracticeService(practiceData: PracticeServices) {
    return PracticeServices.update(practiceData, { where: { id: practiceData.id } })
      .then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deletePracticeService(id: number) {
    return PracticeServices.update({ is_deleted: true},{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultiplePracticeServices(id: number[]): Promise<boolean> {
    if(id.length) {
      return PracticeServices.update({ is_deleted: true},{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importPracticeService(
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
    
    if(!('name' in practiceJsonData[0] && 'order' in practiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(practiceJsonData.map(async (practices: any) => {
      const checkPracticeService = await PracticeServices.count({where: { name: practices.name, is_deleted : null }});
      if(checkPracticeService) {
        return;
      }
      await PracticeServices.create({
        name: practices.name,
        order: practices.order,
        created_by: userId
      }).then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getPracticeServiceReportData(): Promise<PracticeServices[] | null> {
    return PracticeServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}