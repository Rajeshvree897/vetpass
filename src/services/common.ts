import AgeDropDowns from "../db/models/age-drop-downs";
import AnimalCategories from "../db/models/animal-categories";
import AnimalTypes from "../db/models/animal-types";
import Breeds from "../db/models/breeds";
import Country from "../db/models/country";
import State from "../db/models/state";
import UsersPermissionsRole from "../db/models/users-permissions-role";
import User from "../db/models/user";
import VetPractices from "../db/models/vet-practices";
import { CurrencyType, ForumStatus, Gender, HeightType, PostPrivacy, PostStatus, SpayedNeutered, Status, WeightType, SubscriptionDuration, SubscriptionFor, SubscriptionTitle } from "../types/common";
import Classifications from "../db/models/classifications";
import Specialization from "../db/models/specialization";
import Chips from "../db/models/chips";
import Insurers from "../db/models/insurer";
import PractitionerLiability from "../db/models/practitioner-liability";
import ServiceProvoderLiability from "../db/models/service-provider-liability";
import Specialities from "../db/models/specialities";
import PracticeServices from "../db/models/practice-services";
import PetServices from "../db/models/pet-services";
import Forums from "../db/models/forums";
import ForumCategories from "../db/models/forums-animal-types";
import { Op } from "sequelize";
import FanPages from "../db/models/fan-pages";
import GroomersServices from "../db/models/groomers-services";
import WalkersServices from "../db/models/walkers-services";
import TherapistsServices from "../db/models/therapists-services";
import NutritionistsServices from "../db/models/nutritionists-services";
import BreedersServices from "../db/models/breeders-services";
import Advertisements from "../db/models/advertisement";
import SubscriptionTypes from "../db/models/subscription-types";
import Subscriptions from "../db/models/subcription";
import ServiceProviderMainServices from "../db/models/service-provider-main-services";
import ServiceDuration from "../db/models/service-durations";
import StoreClassifications from "../db/models/store-classifications";

export default class BreedsService {
  constructor() {}
  async getPractitionerLiabilities(id: any = null, isEdit = false): Promise<PractitionerLiability[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null};
    }
    return PractitionerLiability.findAll({ 
      attributes: ["id", "name"], 
      raw: true,
      where
    });
  }
  async getServiceProviderLiabilities(id: any = null, isEdit = false): Promise<ServiceProvoderLiability[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null};
    }
    return ServiceProvoderLiability.findAll({ 
      attributes: ["id", "name"], 
      raw: true,
      where
    });
  }

  async getChips(id: any = null, isEdit = false): Promise<Chips[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null};
    }
    return Chips.findAll({ 
      attributes: ["id", "name"], 
      order: [['sort_id', 'ASC']], 
      raw: true,
      where 
    });
  }

  async getInsurers(id: any = null, isEdit = false): Promise<Insurers[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null};
    }
    return Insurers.findAll({ 
      attributes: ["id", "name"], 
      order: [['sort_id', 'ASC']], 
      raw: true,
      where
    });
  }

  async getAnimalTypes(id: any = null, isEdit = false): Promise<AnimalTypes[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id: { [Op.in]: id } },  { status : 1, is_deleted: null}]
    }else{
      where = { status : 1, is_deleted: null};
    }
    return AnimalTypes.findAll({ attributes: ["id", "type"], where, raw: true });
  }

  async getForumsAnimalTypes(animalCategory?: Array<string> | Array<number> | number, id: any = null, isEdit = false ): Promise<AnimalTypes[] | null> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      if (animalCategory) {
        where[Op.or] = [{is_deleted: true, id: { [Op.in]: id } },  { animal_category: animalCategory, status: 1, is_deleted : null }]
      }else{
        where[Op.or] = [{is_deleted: true, id: { [Op.in]: id } },  { status: 1, is_deleted : null }]
      }
    }else{
      if (animalCategory) {
        where = { animal_category: animalCategory, status: 1, is_deleted : null };
      }else{
        where = { status: 1, is_deleted : null };
      }
    }
    if (animalCategory) {
      return AnimalTypes.findAll({
        attributes: [ "id", "type" ],
        raw: true,
        where
      });
    }
    return AnimalTypes.findAll({ attributes: ["id", "type"], raw: true, where });
  }

  async getSpecializations(id: any = null, isEdit = false): Promise<Specialization[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null};
    }
    return Specialization.findAll({ 
      attributes: ["id", "name"], 
      raw: true,
      where
    });
  }

  async getSpecialities(id: any = null, isEdit = false): Promise<Specialities[]> {
    let where: any = {};
      if(isEdit) {
        id = typeof id === "string" || typeof id === "number" ? [id] : id;
        where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
      }else{
        where = { is_deleted: null};
      }
    return Specialities.findAll({ 
      attributes: ["id", "name"], 
      order: [['sort_id', 'ASC']], 
      raw: true,
      where
    });
  }

  async getBreeds(animalType?: Array<string> | Array<number> | number, id: any = null, isEdit = false ): Promise<Breeds[] | null> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      if (animalType) {
        where[Op.or] = [{is_deleted: true, id: { [Op.in]: id } },  { animal_type: animalType, status: 1, is_deleted : null }]
      }else{
        where[Op.or] = [{is_deleted: true, id: { [Op.in]: id } },  { status: 1, is_deleted : null }]
      }
    }else{
      if (animalType) {
        where = { animal_type: animalType, status: 1, is_deleted : null };
      }else{
        where = { status: 1, is_deleted : null };
      }
    }
    if (animalType) {
      return Breeds.findAll({
        attributes: [ "id", "name" ],
        raw: true,
        where
      });
    }
    return Breeds.findAll({ attributes: ["id", "name"], raw: true, where });
  }

  async getStates(country?: number, id: any = null, isEdit = false): Promise<State[] | null> {
    if (country) {
      let where: any = {};
      if(isEdit) {
        id = typeof id === "string" || typeof id === "number" ? [id] : id;
        where[Op.or] = [{is_deleted: true, id},  { country: country , is_deleted: null}]
      }else{
        where = { country: country , is_deleted: null};
      }
      return State.findAll({
        attributes: ["id", "state"],
        raw: true,
        where,
        order: [['state', 'ASC']]
      });
    }
    return [];
  }

  async getAges(): Promise<AgeDropDowns[]> {
    return AgeDropDowns.findAll({ attributes: ["id", "age"], raw: true });
  }

  async getGroomersService(): Promise<GroomersServices[]> {
    return GroomersServices.findAll({ attributes: ["id", "service"], raw: true });
  }

  async getWalkersService(): Promise<WalkersServices[]> {
    return WalkersServices.findAll({ attributes: ["id", "service"], raw: true });
  }

  async getTherapistsService(): Promise<TherapistsServices[]> {
    return TherapistsServices.findAll({ attributes: ["id", "service"], raw: true });
  }

  async getNutritionistsService(): Promise<NutritionistsServices[]> {
    return NutritionistsServices.findAll({ attributes: ["id", "service"], raw: true });
  }
  
  async getBreedersService(): Promise<BreedersServices[]> {
    return BreedersServices.findAll({ attributes: ["id", "service"], raw: true });
  }

  async getServiceProviderMainServices(): Promise<ServiceProviderMainServices[]> {
    const where: any = { status : 1 };
    return ServiceProviderMainServices.findAll({
      attributes: ["id", "service"],
      where,
      raw: true
    });
  }
  async getUserServiceProviderSubServices(userSubService: any = null): Promise<ServiceProviderMainServices[]> {
    if(userSubService == null){
      return [];
    }
    let subService=  userSubService.map(function(subService : any){
      // let key = subService.dataValues.service;
      // return {
      //   [key] :  subService.dataValues.id
      //   }
      return subService.dataValues.service;
    });
    return subService;
  }

  async getAnimalCategories(id: any = null, isEdit = false): Promise<AnimalCategories[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{ is_deleted: true, id: { [Op.in]: id } },  { status : 1, is_deleted: null}]
    }else{
      where = { status : 1, is_deleted: null};
    }
    
    return AnimalCategories.findAll({
      attributes: ["id", "category"],
      where,
      raw: true
    });
  }

  async getserviceProviderServices(id: any = null, isEdit = false): Promise<ServiceProviderMainServices[]> {
    console.log('mainService')
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{ id: { [Op.in]: id } },  { status : 1}]
    }else{
      where = { status : 1};
    }
    
    return ServiceProviderMainServices.findAll({
      attributes: ["id", "service"],
      where,
      raw: true
    });
  }

  async getRoles(): Promise<UsersPermissionsRole[]> {
    return UsersPermissionsRole.findAll({
      attributes: ["id", "name"],
      where: { id: { [Op.notIn]: [ 7,8,9,10,11,12 ] } },
      raw: true
    });
  }

  async getUsers(vetOnly = false): Promise<User[]> {
    let where:any = {};
    if(vetOnly) {
      where = {
        role : {[Op.in]: [3,6]}
      }
    }
    return User.findAll({
      attributes: ["id", "first_name", "last_name"],
      raw: true,
      where
    });
  }

  async getServiceProviders(): Promise<User[]> {
    return User.findAll({
      attributes: ["id", "first_name", "last_name"],
      raw: true,
      where: {
        role : {[Op.in]: [3,6,7,8,9,10,11,12]}
      }
    });
  }

  async getAdvertisement(userId: number): Promise<Advertisements|null> {
    return Advertisements.findOne({
      raw: true,
      where: {
        user_id : userId
      }
    });
  }

  async getCountries(id: any = null, isEdit = false): Promise<Country[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return Country.findAll({ 
      attributes: ["id", "country", "sort_id", "country_code", "iso_code"], 
      order: [['sort_id', 'ASC']], 
      raw: true, 
      where 
    });
  }

  async getClassifications(id: any = null, isEdit = false): Promise<Classifications[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return Classifications.findAll({ 
      attributes: ["id", "title"], 
      raw: true,
      where 
    });
  }

  async getStoreClassifications(id: any = null, isEdit = false): Promise<StoreClassifications[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return StoreClassifications.findAll({ 
      attributes: ["id", "title"], 
      raw: true,
      where 
    });
  }

  async getPracticeServces(id: any = null, isEdit = false): Promise<PracticeServices[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return PracticeServices.findAll({ 
      attributes: ["id", "name"], 
      order: [['name', 'ASC']], 
      raw: true,
      where
    });
  }

  async getPetServices(id: any = null, isEdit = false): Promise<PetServices[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return PetServices.findAll({ 
      attributes: ["id", "name"], 
      order: [['name', 'ASC']], 
      raw: true,
      where
    });
  }

  async getPractices(id: any = null, isEdit = false): Promise<VetPractices[]> {
    let where: any = {};
    if(isEdit) {
      id = typeof id === "string" || typeof id === "number" ? [id] : id;
      where[Op.or] = [{is_deleted: true, id},  { is_deleted: null}]
    }else{
      where = { is_deleted: null };
    }
    return VetPractices.findAll({
      attributes: ["id", "practice_name", "flag", "address1", "country", "state", "city", "zip_code"],
      include: [ 
        { 
            model: Country,
            as: "countries",
            attributes: ["id", "country", "sort_id", "country_code", "iso_code"], 
        }, 
        { 
            model: State,  
            as: "states",   
            attributes: ["id", "state"], 
        }, 
      ],
      raw: true,
      where
    });
  }

  async getForums(): Promise<Forums[]> {
    return Forums.findAll({ attributes: ["id", "title", "description", "category", "date", "user_id", "status", "is_approved"], where: { status: 1 }, raw: true });
  }

  async getSubscriptiontypes(): Promise<SubscriptionTypes[]> {
    return SubscriptionTypes.findAll({ attributes: ["id", "name", "type"], raw: true });
  }

  async getSubscriptions(): Promise<Subscriptions[]> {
    return Subscriptions.findAll({ attributes: ["id", "title", "subscription_type"], raw: true });
  }

  async getServiceDurations():Promise<ServiceDuration[]>{
    return await ServiceDuration.findAll({ 
      attributes: ["duration", "name"], 
    });
  }
  async getFanPages(): Promise<FanPages[]> {
    let fanPages =  await FanPages.findAll({ attributes: ["id", "title"], raw: true, where: { is_deleted : null } });
    if (fanPages) {
      fanPages.map((item: any) => item.title && item.title.length > 50 ? item.title = item.title.substring(0, 50) + '...' : item.title);
    }
    return fanPages;
  }

  async get(): Promise<ForumCategories[]> {
    return ForumCategories.findAll({
      attributes: ["id", "name",],
      raw: true
    });
  }

  getSubscriptionDuration(): Array<string> {
    const keys = Object.keys(SubscriptionDuration);
    return keys;
  }

  getSubscriptionFor(): Array<string> {
    const keys = Object.keys(SubscriptionFor);
    return keys;
  }

  getSubscriptionTitle(): Array<string> {
    const keys = Object.keys(SubscriptionTitle);
    return keys;
  }

  getCurrencyType(): Array<string> {
    const keys = Object.keys(CurrencyType);
    return keys;
  }

  getWeightType(): Array<string> {
    const keys = Object.keys(WeightType);
    return keys.slice(keys.length / 2);
  }

  getHeightType(): Array<string> {
    const keys = Object.keys(HeightType);
    return keys.slice(keys.length / 2);
  }

  getGender(): Array<string> {
    const keys = Object.keys(Gender);
    return keys.slice(keys.length / 2);
  }

  getSpayedNeutered(): Array<string> {
    const keys = Object.keys(SpayedNeutered);
    return keys.slice(keys.length / 2);
  }

  getStatus(): Array<string> {
    const keys = Object.keys(Status);
    return keys.slice(keys.length / 2);
  }

  getPostPrivacy(): Array<string> {
    const keys = Object.keys(PostPrivacy);
    return keys.slice(keys.length / 2);
  }

  getPostStatus(): Array<string> {
    const keys = Object.keys(PostStatus);
    return keys.slice(keys.length / 2);
  }

  getForumStatus(): Array<string> {
    const keys = Object.keys(ForumStatus);
    return keys.slice(keys.length / 2);
  }
}
