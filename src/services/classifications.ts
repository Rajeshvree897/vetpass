import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import Classifications from '../db/models/classifications';

export default class InsurerService {
  constructor() { }

  async getClassification(id: number) {
    return Classifications.findOne({
      where: { id: id },
    })
      .then((classification: any) => {
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addClassification(classificationData: Classifications): Promise<Classifications> {
    return Classifications.create(classificationData)
      .then(async (classification: any) => {
        classification.sort_id = classification.id;
        classification.save();
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateClassification(classificationData: Classifications) {
    return Classifications.update(classificationData, { where: { id: classificationData.id } })
      .then(async (classification: any) => {
        return classification;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteClassification(id: number) {
    return Classifications.update({ is_deleted: true }, { where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleClassifications(id: number[]): Promise<boolean> {
    if(id.length) {
      return Classifications.update({ is_deleted: true }, { where: { id: {[Op.in]: id} } })
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
    
    return Promise.all(classificationJsonData.map(async (insurers: any) => {
      const checkInsurer = await Classifications.count({where: { title: insurers.title, is_deleted : null }});
      if(checkInsurer) {
        return;
      }
      await Classifications.create({
        title: insurers.title,
        description: insurers.description,
        order: insurers.order,
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

  async getClassificationReportData(): Promise<Classifications[] | null> {
    return Classifications.findAll({
      group: 'id',
      attributes: [
        'id',
        'title',
        'description'
      ]
    });
  }
}