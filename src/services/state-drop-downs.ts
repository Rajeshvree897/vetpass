import csv from 'csvtojson';
import fs from "fs";
import Country from "../db/models/country";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import State from "../db/models/state";

export default class StateService {
  constructor() { }

  async getState(id: number) {
    return State.findOne({
      where: { id: id },
    })
      .then((state: any) => {
        return state;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addState(stateData: State): Promise<State> {
    return State.create(stateData)
      .then(async (state: any) => {
        return state;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateState(stateData: State) {
    return State.update(stateData, { where: { id: stateData.id } })
      .then(async (state: any) => {
        return state;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteState(id: number) {
    return State.update({ is_deleted: true},{ where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleStates(id: number[]): Promise<boolean> {
    if(id.length) {
      return State.update({ is_deleted: true},{ where: { id: {[Op.in]: id} } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importState(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const stateJsonData = await csv().fromFile(file.path);
    if(!stateJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('state' in stateJsonData[0] && 'country' in stateJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(stateJsonData.map(async (forum: any) => {
      const checkState = await State.count({where: { state: forum.state, is_deleted : null }});
      if(checkState) {
        return;
      }
      await State.create({
        state: forum.state,
        country: forum.country,
        created_by: userId
      }).then(async (state: any) => {
        return state;
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getStateReportData(): Promise<State[] | null> {
    return State.findAll({
      group: 'id',
      attributes: [
        'id',
        'state',
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