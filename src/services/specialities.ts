import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import Specialities from "../db/models/specialities";

export default class SpecialityService {
  constructor() { }

  async getSpeciality(id: number) {
    return Specialities.findOne({
      where: { id: id },
    })
      .then((speciality: any) => {
        return speciality;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addSpeciality(specialityData: Specialities): Promise<Specialities> {
    return Specialities.create(specialityData)
      .then(async (speciality: any) => {
        speciality.sort_id = speciality.id;
        speciality.save();
        return speciality;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSpeciality(specialityData: Specialities) {
    return Specialities.update(specialityData, { where: { id: specialityData.id } })
      .then(async (speciality: any) => {
        return speciality;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteSpeciality(id: number) {
    return Specialities.update({ is_deleted: true},{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleSpecialities(id: number[]): Promise<boolean> {
    if(id.length) {
      return Specialities.update({ is_deleted: true},{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importSpeciality(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const specialityJsonData = await csv().fromFile(file.path);
    if(!specialityJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in specialityJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(specialityJsonData.map(async (specialities: any) => {
      const checkSpeciality = await Specialities.count({where: { name: specialities.name, is_deleted : null }});
      if(checkSpeciality) {
        return;
      }
      await Specialities.create({
        name: specialities.name,
        sort_id: 0,
        created_by: userId
      }).then(async (speciality: any) => {
        speciality.sort_id = speciality.id;
        speciality.save();
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getSpecialityReportData(): Promise<Specialities[] | null> {
    return Specialities.findAll({
      group: 'id',
      attributes: [
        'id',
        'sort_id',
        'name',
      ]
    });
  }
}