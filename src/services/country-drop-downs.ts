import { toString } from "lodash";
import csv from 'csvtojson';
import fs from "fs";
import Country from "../db/models/country";
import { CustomError } from "./error-service";
import { Op } from "sequelize";

export default class CountryService {
  constructor() { }

  async getCountry(id: number) {
    return Country.findOne({
      where: { id: id },
    })
      .then((country: any) => {
        return country;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addCountry(countryData: Country): Promise<Country> {
    return Country.create(countryData)
      .then(async (country) => {
        country.sort_id = toString(country.id);
        country.save();
        return country;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateCountry(countryData: Country) {
    return Country.update(countryData, { where: { id: countryData.id } })
      .then(async (country: any) => {
        return country;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteCountry(id: number): Promise<boolean> {
    return Country.update({ is_deleted: true },{ where: { id: id }, individualHooks: true })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMultipleCountries(id: number[]): Promise<boolean> {
    if(id.length) {
      return Country.update({is_deleted : true},{ where: { id: {[Op.in]: id} }, individualHooks: true })
        .then(() => {
          return true;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    return true;
  }
  
  async importCountry(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const countryJsonData = await csv().fromFile(file.path);
    if(!countryJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('country' in countryJsonData[0] && 'iso_code' in countryJsonData[0] && 'country_code' in countryJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    return Promise.all(countryJsonData.map(async (countries: any) => {
      const checkCountry = await Country.count({where: { country: countries.country, is_deleted : null }});
      if(checkCountry) {
        return;
      }
      await Country.create({
        country: countries.country,
        sort_id: 0,
        iso_code: countries.iso_code,
        country_code: countries.country_code,
        base64_url: null,
        created_by: userId
      }).then(async (country) => {
        country.sort_id = toString(country.id);
        country.save();
      })
      .catch((error: Error) => {
        throw error;
      });
    })).then(() => {
      return true;
    });
  }

  async getCountryReportData(): Promise<Country[] | null> {
    return Country.findAll({
      group: 'id',
      attributes: [
        'id',
        'sort_id',
        'country',
        'iso_code',
        'country_code',
        'base64_url'
      ]
    });
  }
}