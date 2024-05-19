import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import Specialization from "../db/models/specialization";

export default class SpecializationService {
  constructor() { }

  async getSpecialization(id: number) {
    return Specialization.findOne({
      where: { id: id },
    })
      .then((specialization: any) => {
        return specialization;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addSpecialization(specializationData: Specialization): Promise<Specialization> {
    return Specialization.create(specializationData)
      .then(async (specialization: any) => {
        return specialization;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSpecialization(specializationData: Specialization) {
    return Specialization.update(specializationData, { where: { id: specializationData.id } })
      .then(async (specialization: any) => {
        return specialization;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteSpecialization(id: number) {
    return Specialization.update({ is_deleted: true },{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleSpecializations(id: number[]): Promise<boolean> {
    if(id.length) {
      return Specialization.update({ is_deleted: true },{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importSpecialization(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const specializationJsonData = await csv().fromFile(file.path);
    if(!specializationJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in specializationJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(specializationJsonData.map(async (specializations: any) => {
      const checkSpecialization = await Specialization.count({where: { name: specializations.name, is_deleted : null }});
      if(checkSpecialization) {
        return;
      }
      await Specialization.create({
        name: specializations.name,
        created_by: userId
      }).then(async (specialization: any) => {
        return specialization
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getSpecializationReportData(): Promise<Specialization[] | null> {
    return Specialization.findAll({
      group: 'id',
      attributes: [
        'id',
        'name',
      ]
    });
  }
}