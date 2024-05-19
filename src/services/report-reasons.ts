import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import ReportReasons from "../db/models/report-reasons";

export default class ReportReasonService {
  constructor() { }

  async getReportReason(id: number) {
    return ReportReasons.findOne({
      where: { id: id },
    })
      .then((reportReason: any) => {
        return reportReason;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addReportReason(reportReasonData: ReportReasons): Promise<ReportReasons> {
    return ReportReasons.create(reportReasonData)
      .then(async (reportReason: any) => {
        return reportReason;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateReportReason(reportReasonData: ReportReasons) {
    return ReportReasons.update(reportReasonData, { where: { id: reportReasonData.id } })
      .then(async (reportReason: any) => {
        return reportReason;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteReportReason(id: number) {
    return ReportReasons.destroy({ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleReportReasons(id: number[]): Promise<boolean> {
    if(id.length) {
      return ReportReasons.destroy({ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importReportReason(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const reportReasonJsonData = await csv().fromFile(file.path);
    if(!reportReasonJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in reportReasonJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(reportReasonJsonData.map(async (reportReason: any) => {
      const checkReportReason = await ReportReasons.count({where: { reason: reportReason.name, is_deleted : null }});
      if(checkReportReason) {
        return;
      }
      await ReportReasons.create({
        reason: reportReason.name,
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

  async getreportReasonReportData(): Promise<ReportReasons[] | null> {
    return ReportReasons.findAll({
      group: 'id',
      attributes: [
        'id',
        'reason',
      ]
    });
  }
}