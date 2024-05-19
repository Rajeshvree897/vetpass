import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import PractitionerLiability from '../db/models/practitioner-liability';

export default class PractitionerLiabilities {
  constructor() { }

  async getPractitionerLiability(id: number) {
    return PractitionerLiability.findOne({
      where: { id: id },
    })
      .then((practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addPractitionerLiability(practiceData: PractitionerLiability): Promise<PractitionerLiability> {
    return PractitionerLiability.create(practiceData)
      .then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updatePractitionerLiability(practiceData: PractitionerLiability) {
    return PractitionerLiability.update(practiceData, { where: { id: practiceData.id } })
      .then(async (practice: any) => {
        return practice;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deletePractitionerLiability(id: number) {
    return PractitionerLiability.update({ is_deleted: true },{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultiplePractitionerLiabilities(id: number[]): Promise<boolean> {
    if(id.length) {
      return PractitionerLiability.update({ is_deleted: true },{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importPractitionerLiability(
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
    
    return Promise.all(practiceJsonData.map(async (practices: any) => {
      const checkPractitionerLiability = await PractitionerLiability.count({where: { name: practices.name, is_deleted : null }});
      if(checkPractitionerLiability) {
        return;
      }
      await PractitionerLiability.create({
        name: practices.name,
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

  async getPractitionerLiabilityReportData(): Promise<PractitionerLiability[] | null> {
    return PractitionerLiability.findAll({
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}