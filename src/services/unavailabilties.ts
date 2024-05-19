import moment from "moment";
import Availabilities from "../db/models/availabilities";
import AvailabilitiesComponents from "../db/models/availabilities-components";
import AvailabilitiesTimeComponents from "../db/models/components-time-slots";
import AvailabilitiesTimeBlocks from "../db/models/components-time-blocks";
import UnAvailabilities from "../db/models/unavailabilities";
import UnAvailabilitiesComponents from "../db/models/unavailabilities-components";
import UnAvailabilitiesTimeComponents from "../db/models/unavailabilities-time-components";
import ServiceProviderUnAvailabilitiesTimeComponents from "../db/models/unavailabilities-service-provider-slots";

export default class UnAvailabilitiesService {
  constructor() {}

  async getUnAvailabilities(id: number, timezone: any): Promise<any> {
    let unAvailabilities: any = await UnAvailabilities.findOne({
      include: [
        {
          model: UnAvailabilitiesComponents,
          include: [
            {
              model: UnAvailabilitiesTimeComponents,
            },
          ],
        },
      ],
      where: { id: id },
    });
    unAvailabilities = unAvailabilities.toJSON();
    unAvailabilities.UnAvailabilitiesComponents = unAvailabilities?.UnAvailabilitiesComponents.map((i:any) => i.UnAvailabilitiesTimeComponent && i.UnAvailabilitiesTimeComponent.time_slot_id) || [];
    unAvailabilities.slots = await this.getSlots(unAvailabilities.user_id, new Date(unAvailabilities.date), timezone);
    return unAvailabilities;
  }

  async addUnAvailabilities(
    unAvailabilities: UnAvailabilities,
    slotId: any[]
  ): Promise<Boolean> {
    const isExist = await UnAvailabilities.count({
      where: { user_id: unAvailabilities.user_id, date: unAvailabilities.date },
    });
    if (isExist) {
      return false;
    }
    if(unAvailabilities && unAvailabilities.description) {
    }
    return UnAvailabilities.create(unAvailabilities)
      .then(async (unAvailabilities) => {
        if (slotId && slotId.length) {
          slotId = slotId.map((i: any) => {
            return { time_slot_id: i };
          });
          let unAvailabilitiesTimeSlots = await UnAvailabilitiesTimeComponents.bulkCreate(
            slotId
          );
          const unAvailabilitiesComponentObj = {
            field: "timeSlot",
            order: 1,
            component_type: "components_time_unavailability_time_slots",
            unavailability_id: unAvailabilities.id,
          };
          let unvailabilitiesComponentsdata: any[] = [];
          unAvailabilitiesTimeSlots = unAvailabilitiesTimeSlots.map((i: any) =>
            i.toJSON()
          );
          unAvailabilitiesTimeSlots.map((i: any) =>
            unvailabilitiesComponentsdata.push({
              ...unAvailabilitiesComponentObj,
              component_id: i.id,
            })
          );
          await UnAvailabilitiesComponents.bulkCreate(
            unvailabilitiesComponentsdata
          );
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async getServiceProviderUnAvailabilities(id: number, timezone: any): Promise<any> {
    let unAvailabilities: any = await UnAvailabilities.findOne({
      include: [
        {
          model: ServiceProviderUnAvailabilitiesTimeComponents,
        },
      ],
      where: { id: id },
    });
    unAvailabilities = unAvailabilities.toJSON();
    unAvailabilities.UnAvailabilitiesComponents = unAvailabilities?.ServiceProviderUnAvailabilitiesTimesSlots.map((i:any) => {
      const day = moment(unAvailabilities.date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();
        let from = i.from;
        let to = i.to;
            const fromhours = parseInt(from.split(':')[0]);
            const frommin = parseInt(from.split(':')[1]);
            const tohours = parseInt(to.split(':')[0]);
            const tomin = parseInt(to.split(':')[1]);
            let from1 =  moment()
            .utc()
            .day(day)
            .set({ h: fromhours, m: frommin })
            .tz(timezone);
            let to1 =  moment()
            .utc()
            .day(day)
            .set({ h: tohours, m: tomin })
            .tz(timezone);
            let dayAfter = from1.day();
              return {from : from1.format("HH:mm"), to:to1.format("HH:mm"), unavailability_id : unAvailabilities.id};
    });
    return unAvailabilities;
  }

  async addServiceProviderUnAvailabilities(
    unAvailabilities: UnAvailabilities,
    slotTimes: any[],
    timeZone : any
  ): Promise<Boolean> {
    const selectedDay = moment(unAvailabilities.date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();
    const isExist = await UnAvailabilities.count({
      where: { user_id: unAvailabilities.user_id, date: unAvailabilities.date },
    });
    if (isExist) {
      return false;
    }
    if(unAvailabilities && unAvailabilities.description) {
    }
    return UnAvailabilities.create(unAvailabilities)
      .then(async (unAvailabilities) => {
        if (slotTimes && slotTimes.length) {
          let appointmentTimes = [];
          while (slotTimes && slotTimes.length > 0) {
            const val = slotTimes.splice(0, 2);
            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            let from1 = moment().tz(timeZone).day(selectedDay).set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day(selectedDay).set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            appointmentTimes.push({from : from1, to:to1, unavailability_id : unAvailabilities.id});
          }
          let unAvailabilitiesTimeSlots = await ServiceProviderUnAvailabilitiesTimeComponents.bulkCreate(
            appointmentTimes
          );
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
  //service provider unavaibility update 
  async serviceProviderUpdateUnavailabilities(
    unAvailabilitiesData: any,
    userId: number,
    timeZone : any
  ): Promise<any> {
    return UnAvailabilities.update(
      {
        description: unAvailabilitiesData.description,
        date: unAvailabilitiesData.date,
        user_id: unAvailabilitiesData.user_id,
        is_full_day: unAvailabilitiesData.is_full_day,
        updated_by: userId,
      },
      { where: { id: unAvailabilitiesData.id } }
    )
      .then(async (unAvailabilities) => {
        let slotTimes = unAvailabilitiesData.unavaavailableSlotTimes;
        const selectedDay = moment(unAvailabilitiesData.date)
        .utc()
        .set({ h: 0, m: 0 })
        .day();
        await ServiceProviderUnAvailabilitiesTimeComponents.destroy({
          where: { unavailability_id: unAvailabilitiesData.id },
        });
        if (slotTimes && slotTimes.length) {
          let appointmentTimes = [];
          while (slotTimes && slotTimes.length > 0) {
            const val = slotTimes.splice(0, 2);
            const fromhours = parseInt(val[0].split(':')[0])
            const frommin = parseInt(val[0].split(':')[1])
            const tohours = parseInt(val[1].split(':')[0])
            const tomin = parseInt(val[1].split(':')[1])
            let from1 = moment().tz(timeZone).day(selectedDay).set({ hour: fromhours, minute: frommin }).utc().format('HH:mm');
            let to1 = moment().tz(timeZone).day(selectedDay).set({ hour: tohours, minute: tomin }).utc().format('HH:mm');
            appointmentTimes.push({from : from1, to:to1, unavailability_id : unAvailabilitiesData.id});
          }
          let unAvailabilitiesTimeSlots = await ServiceProviderUnAvailabilitiesTimeComponents.bulkCreate(
            appointmentTimes
          );  
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async updateUnavailabilities(
    unAvailabilitiesData: any,
    userId: number
  ): Promise<any> {
    return UnAvailabilities.update(
      {
        description: unAvailabilitiesData.description,
        date: unAvailabilitiesData.date,
        user_id: unAvailabilitiesData.user_id,
        is_full_day: unAvailabilitiesData.is_full_day,
        updated_by: userId,
      },
      { where: { id: unAvailabilitiesData.id } }
    )
      .then(async (unAvailabilities) => {
        let componentId: any[] = await UnAvailabilitiesComponents.findAll({
          attributes: ["component_id"],
          where: { unavailability_id: unAvailabilitiesData.id },
        });
        componentId = componentId.map((i: any) => i.toJSON());
        componentId = componentId.map((i: any) => i.component_id);
        await UnAvailabilitiesTimeComponents.destroy({
          where: { id: componentId },
        });
        await UnAvailabilitiesComponents.destroy({
          where: { unavailability_id: unAvailabilitiesData.id },
        });
        if (unAvailabilitiesData.slotId && unAvailabilitiesData.slotId.length) {
          unAvailabilitiesData.slotId = unAvailabilitiesData.slotId.map((i: any) => {
            return { time_slot_id: i };
          });
          let unAvailabilitiesTimeSlots = await UnAvailabilitiesTimeComponents.bulkCreate(
            unAvailabilitiesData.slotId
          );
          const unAvailabilitiesComponentObj = {
            field: "timeSlot",
            order: 1,
            component_type: "components_time_unavailability_time_slots",
            unavailability_id: unAvailabilitiesData.id,
          };
          let unvailabilitiesComponentsdata: any[] = [];
          unAvailabilitiesTimeSlots = unAvailabilitiesTimeSlots.map((i: any) =>
            i.toJSON()
          );
          unAvailabilitiesTimeSlots.map((i: any) =>
            unvailabilitiesComponentsdata.push({
              ...unAvailabilitiesComponentObj,
              component_id: i.id,
            })
          );
          await UnAvailabilitiesComponents.bulkCreate(
            unvailabilitiesComponentsdata
          );
        } else {
          // await UnAvailabilities.destroy({ where: { id: unAvailabilitiesData.id } });
        }
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteUnavailabilities(id: number) {
    let componentId: any[] = await UnAvailabilitiesComponents.findAll({
      attributes: ["component_id"],
      where: { unavailability_id: id },
    });
    componentId = componentId.map((i: any) => i.toJSON());
    componentId = componentId.map((i: any) => i.component_id);
    await UnAvailabilitiesTimeComponents.destroy({
      where: { id: componentId },
    });
    await UnAvailabilities.destroy({ where: { id: id } });
    await UnAvailabilitiesComponents.destroy({
      where: { unavailability_id: id },
    });
    return true;
  }
  async deleteServiceProviderUnavailabilities(id: number) {
    await ServiceProviderUnAvailabilitiesTimeComponents.destroy({
      where:  { unavailability_id: id },
    });
    await UnAvailabilities.destroy({ where: { id: id } });
    return true;
  }
  async getSlots(user_id: number, date: any, timeZone: any) {
    const selectedDay = moment(date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();

    const availabilitiesData: any = await Availabilities.findAll({
      attributes: ["id", "day"],
      include: [
        {
          model: AvailabilitiesComponents,
          where: { field: "timeSlot" },
          include: [
            {
              model: AvailabilitiesTimeComponents,
            },
          ],
        },
      ],
      where: {
        user_id,
      },
    });
    let appointmentSlots: any[] = [];
    for (let avail of availabilitiesData) {
      if (
        avail &&
        avail.AvailabilitiesComponents &&
        avail.AvailabilitiesComponents.length > 0
      ) {
        for (let i of avail.AvailabilitiesComponents) {
          if (
            i.AvailabilitiesTimeComponent &&
            i.AvailabilitiesTimeComponent.from
          ) {
            const slot = i.AvailabilitiesTimeComponent.toJSON();
            const fromhours = parseInt(slot.from.split(":")[0]) || 0;
            const frommin = parseInt(slot.from.split(":")[1]) || 0;
            const tohours = parseInt(slot.to.split(":")[0]) || 0;
            const tomin = parseInt(slot.to.split(":")[1]) || 0;
            slot.dateFrom = moment()
              .utc()
              .day(slot.day)
              .set({ h: fromhours, m: frommin })
              .tz(timeZone);
            slot.dateto = moment()
              .utc()
              .day(slot.day)
              .set({ h: tohours, m: tomin })
              .tz(timeZone);
            slot.dayAfter = slot.dateFrom.day();
            if (selectedDay === slot.dayAfter) {
              slot.from = slot.dateFrom.format("HH:mm");
              slot.to = slot.dateto.format("HH:mm");
              appointmentSlots.push({ ...slot });
            }
          }
        }
      }
    }
    return appointmentSlots;
  }
  async getDayTime(user_id: number, date: any, timeZone: any) {
    const selectedDay = moment(date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();

      // const isExist = await UnAvailabilities.count({
      //   where: { user_id: user_id, date:date },
      // });
      // console.log("isExist", isExist)
      // if (isExist) {
      //   return {status :true };
      // }
    const availabilitiesData: any = await Availabilities.findAll({
      attributes: ["id", "day"],
      include: [
        {
          model: AvailabilitiesComponents,
          where: { field: "timeBlock" },
          include: [
            {
              model: AvailabilitiesTimeBlocks,
            },
          ],
        },
      ],
      where: {
        user_id,
      },
    });
    let appointmentSlots: any[] = [];
    for (let avail of availabilitiesData) {
      if (
        avail &&
        avail.AvailabilitiesComponents &&
        avail.AvailabilitiesComponents.length > 0
      ) {
        for (let i of avail.AvailabilitiesComponents) {
          if (
            i.AvailabilitiesTimeBlock &&
            i.AvailabilitiesTimeBlock.from
          ){
            const slot = i.AvailabilitiesTimeBlock;
            const fromhours = parseInt(slot.from.split(":")[0]) || 0;
            const frommin = parseInt(slot.from.split(":")[1]) || 0;
            const tohours = parseInt(slot.to.split(":")[0]) || 0;
            const tomin = parseInt(slot.to.split(":")[1]) || 0;
            slot.dateFrom = moment()
              .utc()
              .day(slot.day)
              .set({ h: fromhours, m: frommin })
              .tz(timeZone);
            slot.dateto = moment()
              .utc()
              .day(slot.day)
              .set({ h: tohours, m: tomin })
              .tz(timeZone);
            slot.dayAfter = slot.dateFrom.day();
            if (selectedDay === slot.dayAfter) {
              slot.from = slot.dateFrom.format("HH:mm");
              slot.to = slot.dateto.format("HH:mm");
              appointmentSlots.push({ from : slot.from , to : slot.to });
            }
          }
        }
      }
    }
    return appointmentSlots;
  }
}
