import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import SymptomsHowLong from '../db/models/symptoms-how-long';

export default class SymptomsHowLongervice {
  constructor() { }

  async getSymptomsHowLong(id: number) {
    return SymptomsHowLong.findOne({
      where: { id: id },
    })
      .then((symptomsHowLong: any) => {
        return symptomsHowLong;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addSymptomsHowLong(symptomsHowLongData: SymptomsHowLong): Promise<SymptomsHowLong> {
    return SymptomsHowLong.create(symptomsHowLongData)
      .then(async (symptomsHowLong: any) => {
        return symptomsHowLong;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSymptomsHowLong(symptomsHowLongData: SymptomsHowLong) {
    return SymptomsHowLong.update(symptomsHowLongData, { where: { id: symptomsHowLongData.id } })
      .then(async (symptomsHowLong: any) => {
        return symptomsHowLong;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteSymptomsHowLong(id: number) {
    return SymptomsHowLong.update({ is_deleted: true }, { where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleSymptomsHowLong(id: number[]): Promise<boolean> {
    if(id.length) {
      return SymptomsHowLong.update({ is_deleted: true },{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importSymptomsHowLong(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const symptomsHowLongJsonData = await csv().fromFile(file.path);
    if(!symptomsHowLongJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in symptomsHowLongJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(symptomsHowLongJsonData.map(async (symptomsHowLong: any) => {
      const checksymptomsHowLong = await SymptomsHowLong.count({where: { name: symptomsHowLong.name, is_deleted : null }});
      if(checksymptomsHowLong) {
        return;
      }
      await SymptomsHowLong.create({
        name: symptomsHowLong.name,
        created_by: userId
      }).then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getSymptomsHowLongReportData(): Promise<SymptomsHowLong[] | null> {
    return SymptomsHowLong.findAll({
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}