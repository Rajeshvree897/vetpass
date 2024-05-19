import { Sequelize, col } from "sequelize";
import moment from "moment";

import Appointments from "../db/models/appointments";
import AnimalProfiles from "../db/models/animal-profiles";
import VetPractices from "../db/models/vet-practices";
import User from "../db/models/user";
import AvailabilitiesTimeComponents from "../db/models/components-time-slots";
import AppointmentNotes from "../db/models/appointment-notes";
import SubService from "../db/models/service-provider-sub-services";
import NotificationService from "./notification-service";

export default class AppointmentsService {
  constructor() {}

  async getAppointment(id: number): Promise<Appointments | {}> {
    return Appointments.findOne({
      include: [
        {
          model: AnimalProfiles,
          as: "animalName",
          attributes: ["name"],
        },
        {
          model: VetPractices,
          as: "vetPractice",
          attributes: ["practice_name"],
        },
        {
          model: User,
          as: "users",
          attributes: [[Sequelize.fn('CONCAT', col('`users`.`first_name`'), ' ', col('`users`.`last_name`')), 'user_name']]
        },
        {
          model: User,
          as: "vet",
          attributes: [[Sequelize.fn('CONCAT', col('`vet`.`first_name`'), ' ', col('`vet`.`last_name`')), 'vet_name']]
        },
        {
          model: AvailabilitiesTimeComponents,
          as: "appointmentSlot",
          attributes: ['from', 'to']
        },
        {
          model: AppointmentNotes,
          as: "appointmentNote",
          attributes: ['history', 'examination', 'diagnosis', 'plan', 'follow_up', 'prescription','note']
        },
        {
          model: SubService,
          as: "service",
          attributes: ['service', 'description', 'price', 'duration']
        },
      ],
      where: { id: id },
    })
      .then((appointments: any) => {
        const data = appointments?.toJSON() || {};
        const today = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + new Date().getDate();

        const fromSplit = appointments && appointments.from_time && appointments.from_time.split(":") || 0;
        const toSplit = appointments && appointments.to_time && appointments.to_time.split(":") || 0;
        const fromTime = fromSplit && fromSplit[0] && fromSplit[1] && new Date(`${today} ${fromSplit[0]}:${fromSplit[1]}`);
        const toTime = toSplit && toSplit[0] && toSplit[1] && new Date(`${today} ${toSplit[0]}:${toSplit[1]}`);

        const ftime = moment(fromTime).format("YYYY-MM-DD hh:mm:ss");
        const ttime = moment(toTime).format("YYYY-MM-DD hh:mm:ss");
        if(fromSplit && ftime) {
          data.from_time = moment.utc(ftime).local().format('hh:mm');
        }
        if(toSplit && ttime) {
          data.to_time = moment.utc(ttime).local().format('hh:mm');
        }
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  async deleteAppointment(id: number, timeZone: any): Promise<boolean> {
    return Appointments.update(
      {is_deleted: true, cancelled_by: "admin" },
      {
        where: { id },
      })
      .then(async () => {
        const appointment = await Appointments.findOne({where: {id}});
        const notification = new NotificationService();
        const type = "cancel appointment";
        const userNotifyData = {
          id,
          title: `Appointment has been cancelled by VETPASS ADMIN.`,
          user_id:  appointment?.user_id
        };
        notification.getTokenAndSendNotificationFanPages(userNotifyData, type);
        const vetNotifyData = {
          id,
          title: `Appointment has been cancelled by VETPASS ADMIN.`,
          user_id:  appointment?.vet_id
        };
        notification.getTokenAndSendNotificationFanPages(vetNotifyData, type);
        return true;
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
