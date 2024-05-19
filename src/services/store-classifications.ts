import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import StoreClassifications from '../db/models/store-classifications';

export default class StoreClassification {
  constructor() { }

  async getClassification(id: number) {
    return StoreClassifications.findOne({
      where: { id: id },
    })
      .then((classification: any) => {
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addClassification(classificationData: StoreClassifications): Promise<StoreClassifications> {
    return StoreClassifications.create(classificationData)
      .then(async (classification: any) => {
        classification.sort_id = classification.id;
        classification.save();
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateClassification(classificationData: StoreClassifications) {
    return StoreClassifications.update(classificationData, { where: { id: classificationData.id } })
      .then(async (classification: any) => {
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteClassification(id: number) {
    return StoreClassifications.update({ is_deleted: true }, { where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleClassifications(id: number[]): Promise<boolean> {
    if(id.length) {
      return StoreClassifications.update({ is_deleted: true }, { where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importClassification(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const classificationJsonData = await csv().fromFile(file.path);
    if(!classificationJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('title' in classificationJsonData[0] && 'description' in classificationJsonData[0] && 'order' in classificationJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(classificationJsonData.map(async (data: any) => {
      const checkInsurer = await StoreClassifications.count({where: { title: data.title, is_deleted : null }});
      if(checkInsurer) {
        return;
      }
      await StoreClassifications.create({
        title: data && data.title ? data.title : "",
        description: data && data.description ? data.description: "",
        order: data && data.order ? data.order : 1,
        created_by: userId
      }).then(async (classification: any) => {
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getClassificationReportData(): Promise<StoreClassifications[] | null> {
    return StoreClassifications.findAll({
      group: 'id',
      attributes: [
        'id',
        'title',
        'description',
        'order'
      ]
    });
  }
}