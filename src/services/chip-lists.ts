import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { Op } from "sequelize";
import Chips from "../db/models/chips";
import Country from '../db/models/country';

export default class ChipService {
  constructor() { }

  async getChip(id: number) {
    return Chips.findOne({
      where: { id: id },
    })
      .then((chip: any) => {
        return chip;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addChip(chipData: Chips): Promise<Chips> {
    return Chips.create(chipData)
      .then(async (chip: any) => {
        chip.sort_id = chip.id;
        chip.save();
        return chip;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateChip(chipData: Chips) {
    return Chips.update(chipData, { where: { id: chipData.id } })
      .then(async (chip: any) => {
        return chip;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteChip(id: number) {
    return Chips.update({ is_deleted: true }, { where: { id: id }})
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleChips(id: number[]): Promise<boolean> {
    if(id.length) {
      return Chips.update({ is_deleted: true }, { where: { id: { [Op.in]: id } } })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importChip(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const chipJsonData = await csv().fromFile(file.path);
    if(!chipJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('name' in chipJsonData[0] && 'country' in chipJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    
    return Promise.all(chipJsonData.map(async (chips: any) => {
      const checkChip = await Chips.count({where: { name: chips.name, is_deleted : null }});
      if(checkChip) {
        return;
      }
      await Chips.create({
        name: chips.name,
        sort_id: 0,
        country: chips.country,
        created_by: userId
      }).then(async (chip: any) => {
        chip.sort_id = chip.id;
        chip.save();
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getChipReportData(): Promise<Chips[] | null> {
    return Chips.findAll({
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