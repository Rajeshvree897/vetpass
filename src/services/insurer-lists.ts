import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import Insurers from '../db/models/insurer';
import Country from '../db/models/country';

export default class InsurerService {
  constructor() { }

  async getInsurer(id: number) {
    return Insurers.findOne({
      where: { id: id },
    })
      .then((insurer: any) => {
        return insurer;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addInsurer(insurerData: Insurers): Promise<Insurers> {
    return Insurers.create(insurerData)
      .then(async (insurer: any) => {
        insurer.sort_id = insurer.id;
        insurer.save();
        return insurer;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateInsurer(insurerData: Insurers) {
    return Insurers.update(insurerData, { where: { id: insurerData.id } })
      .then(async (insurer: any) => {
        return insurer;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteInsurer(id: number) {
    return Insurers.update({ is_deleted: true }, { where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleInsurers(id: number[]): Promise<boolean> {
    if(id.length) {
      return Insurers.update({ is_deleted: true }, { where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importInsurer(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const insurerJsonData = await csv().fromFile(file.path);
    if(!insurerJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in insurerJsonData[0] && 'country' in insurerJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(insurerJsonData.map(async (insurers: any) => {
      const checkInsurer = await Insurers.count({where: { name: insurers.name, is_deleted : null }});
      if(checkInsurer) {
        return;
      }
      await Insurers.create({
        name: insurers.name,
        sort_id: 0,
        country: insurers.country,
        created_by: userId
      }).then(async (insurer: any) => {
        insurer.sort_id = insurer.id;
        insurer.save();
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getInsurerReportData(): Promise<Insurers[] | null> {
    return Insurers.findAll({
      group: 'id',
      attributes: [
        'id',
        'sort_id',
        'name',
        ['country', 'Country'],
      ],
      include: [
        {
          model: Country,
          as: "countries",
          attributes: ["country", "id"],
        },
      ],
    });
  }
}