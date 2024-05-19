import crypto from "crypto";
import path from "path";
import { Op } from 'sequelize';

import ServiceProviderSubServices from "../db/models/service-provider-sub-services";
import ServiceProviderMainServices from "../db/models/service-provider-main-services";
import VetProfileServices from '../db/models/vet-profile-services';
import User from "../db/models/user"
// import AnimalTypesIcon from "../db/models/animal-types-icon";
import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { result } from "lodash";
import Appointments from "../db/models/appointments";
import { description } from "joi";
export default class ServiceProviderSubService {
  constructor() {}

  async getSubService(id: number): Promise<ServiceProviderSubServices | null> {
    return ServiceProviderSubServices.findOne({ where: { id: id }
    })
      .then((subService: any) => {
        return subService;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addSubService(
    serviceProviderSubService: ServiceProviderSubServices,
    file: any
  ): Promise<ServiceProviderSubServices> {
    const checkSubService = await ServiceProviderSubServices.count({where: { service: serviceProviderSubService.service, main_service_id: serviceProviderSubService.main_service_id}});
    if(checkSubService) {
      throw new CustomError("Sub Service already exist");
    }
   
    return ServiceProviderSubServices.create(serviceProviderSubService)
      .then(async ServiceProviderSubServices => {

        return ServiceProviderSubServices;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateSubService(
    subServiceData: ServiceProviderSubServices,
    userId: number,
    main_service_id: number,
  ): Promise<any> {
    return ServiceProviderSubServices.update(
      {
        service: subServiceData.service,
        main_service_id: main_service_id,
        status: subServiceData.status, 
        updated_by: userId
      },
      { where: { id: subServiceData.id } }
    )
      .then(async SubService => {
        return SubService;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteSubService(id: number) {
    const checkServiceInProfile = await VetProfileServices.count({where: { service_id: id }});
    const isSubServiceIdExists = await Appointments.count({where: { service_id: id }});
    if (checkServiceInProfile || isSubServiceIdExists) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    return ServiceProviderSubServices.destroy({ where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importSubServices(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    const ServiceJsonData = await csv().fromFile(file.path);
    if(!ServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('sub_service_name' in ServiceJsonData[0]) || !('main_service_name' in ServiceJsonData[0]) || !('email' in ServiceJsonData[0]) || !('description' in ServiceJsonData[0]) || !('duration' in ServiceJsonData[0]) || !('price' in ServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    const AllSubServices = await ServiceProviderSubServices.findAll();
    const users = await User.findAll();
    let SubServiceArr = new Array();
    return Promise.all(ServiceJsonData.map(async (data: any) => {
      let existUser = await User.findOne({where: { email: data.email }}).then((result)=>{
        return result;
      }).catch((error)=>{
        return error;
      });
      if(!existUser){
        return ;
      }
      var checkService =  AllSubServices.filter(function(service) {
        return service.service == data.sub_service_name ? 1 : 0
      });
      if(checkService && checkService.length !=0) {
        return;
      }
      let getMainServiceId = await ServiceProviderMainServices.findOne({where: { service: data.main_service_name }}).then((result)=>{
        return result;
      }).catch((error)=>{
        return error;
      });
      if(!getMainServiceId){
       return ;
      }
        SubServiceArr.push({
          service: data.sub_service_name,
          main_service_id:getMainServiceId.dataValues.id,
          status: 1,
          created_by: existUser.dataValues.id,
          description: data.description,
          price: data.price,
          duration: data.duration,
        })
    })).then(() => {
       ServiceProviderSubServices.bulkCreate(SubServiceArr).then(async (service: any) => {
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });

      return true;
    });
  }

  async getSubServiceReportData(): Promise<ServiceProviderMainServices[] | null> {
    return ServiceProviderMainServices.findAll({
      group: 'id',
      attributes: [
        'id',
        'service',
        'status',
      ]
    });
  }
}
