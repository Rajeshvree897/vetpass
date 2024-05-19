import ServiceProviderMainServices from "../db/models/service-provider-main-services";
import ServiceProviderSubServices from "../db/models/service-provider-sub-services";
import csv from 'csvtojson';
import fs from "fs";
import { CustomError } from "./error-service";
import { trim } from "lodash";
import VetProfileMainServices from "../db/models/vet-profile-main-services";
export default class ServiceProviderMainService {
  constructor() {}

  async getMainService(id: number): Promise<ServiceProviderMainServices | null> {
    return ServiceProviderMainServices.findOne({ where: { id: id } })
      .then((mainService) => {
        return mainService;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async addMainService(
    mainService: ServiceProviderMainServices
  ): Promise<ServiceProviderMainServices> {
     return ServiceProviderMainServices.create(mainService)
      .then((mainService) => {
        return mainService;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateMainService(
    serviceProviderMainServiceData: ServiceProviderMainServices,
    userId: number
  ): Promise<any> {
    return ServiceProviderMainServices.update(
      { service: trim(serviceProviderMainServiceData.service), status:serviceProviderMainServiceData.status, updated_by: userId },
      { where: { id: serviceProviderMainServiceData.id } }
    )
      .then((mainService) => {
        return mainService;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteMainService(id: number):Promise<boolean> {
    const checkMainServiceInSub = await ServiceProviderSubServices.count({where: { main_service_id: id }});
    const isMainServiceIdExists = await VetProfileMainServices.count({where: { "service-provider-main-service_id": id }});
    if(checkMainServiceInSub || isMainServiceIdExists) {
      throw new CustomError("This service is already in use, you cannot delete this!");
    }
    return ServiceProviderMainServices.destroy({ where: { id: id } })
      .then(() => {
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async importServices(
    file: any,
    userId: number
  ): Promise<boolean> {
    if(!file) {
      throw new CustomError('Please upload file');
    }
    console.log("csv check", file.mimetyp , file.originalname)
    if (!file.mimetype.includes("csv") && !file.originalname.includes(".csv")) {
      throw new CustomError('Please upload only csv file');
    }
    
    const ServiceJsonData = await csv().fromFile(file.path);
    if(!ServiceJsonData) {
      throw new CustomError('Unable to import data');
    }
    
    if(!('service' in ServiceJsonData[0])){
      throw new CustomError('Please set header as sample excel');
    }
    if (fs.existsSync(file.path)) {
      await fs.unlinkSync(file.path);
    }
    const AllSubServices = await ServiceProviderMainServices.findAll();
    let serviceArr = new Array();

    return Promise.all(ServiceJsonData.map(async (data: any) => {
      var checkService =  AllSubServices.filter(function(service) {
        return service.service == data.sub_service_name ? 1 : 0
      });
      if(checkService  && checkService.length !=0) {
        return;
      }
        serviceArr.push({
          service: trim(data.service),
          status: data.status=="" ? 1 : data.status.toLowerCase()=="active" ? 1 : 0,
          created_by: userId
        });
    })).then(() => {
      ServiceProviderMainServices.bulkCreate(serviceArr).then(async (service: any) => {
        console.log('service')
        return service;
      })
      .catch((error: Error) => {
        throw error;
      });
      return true;
    });
  }

  async getServiceReportData(): Promise<ServiceProviderMainServices[] | null> {
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
