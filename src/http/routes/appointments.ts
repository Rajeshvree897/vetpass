// @ts-ignore:3
import datatable from "sequelize-datatable"
import { Router, Request, Response, NextFunction } from "express"
import { Sequelize, Op } from "sequelize";
import moment from "moment";
import { authRedirect } from "../middlewares/index"
import Appointments from "../../db/models/appointments"
import AnimalProfiles from "../../db/models/animal-profiles"
import VetPractices from "../../db/models/vet-practices";
import AppointmentsService from "../../services/appointments";
import User from "../../db/models/user";

export default (app: Router) => {
  app.get(
    "/appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("appointments/index.ejs", {
        title: "Appointments list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/service-provider-appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
        res.render("appointments/groomers-list.ejs", {
        title: "Groomers Appointments list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/walkers-appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("appointments/walkers-list.ejs", {
        title: "Walkers Appointments list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/therapists-appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("appointments/therapists-list.ejs", {
        title: "Therapists Appointment list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/nutritionist-appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("appointments/nutritionist-list.ejs", {
        title: "Nutritionist Appointment list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/breeders-appointments",
    authRedirect(true),
    (req: Request, res: Response) => {
      res.render("appointments/breeders-list.ejs", {
        title: "Breeder Appointment list",
        userData: req.session && req.session.user ? req.session.user : null,
      })
    }
  )

  app.get(
    "/appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let userData =  req.session && req.session.user ? req.session.user : null;
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [3,6] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			if (req.query && req.query.order && req.query.order[0].column === '4') {
        order = [ [ Sequelize.literal('`vetPractice`.`practice_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            "appointment_date",
            "from_time",
            "to_time",
            "cancelled_by",
            [Sequelize.col("animalName.name"), "animal_name"],
            [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            {
                model: VetPractices, as: "vetPractice", attributes: []
            },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: []
						}
          ],
          where,
          order
      }).then((result: any) => {
         result.data = result?.data.map((i:any) => {
      const day = moment(i.appointment_date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();
      i.appointment_date = moment(i.appointment_date).format('YYYY-MM-DD');
      i.todayDate = moment().format('YYYY-MM-DD');
      let from = i.from_time;
      let to = i.to_time;
          const fromhours = parseInt(from.split(':')[0]);
          const frommin = parseInt(from.split(':')[1]);
          const tohours = parseInt(to.split(':')[0]);
          const tomin = parseInt(to.split(':')[1]);
          let from1 =  moment()
          .utc()
          .day(day)
          .set({ h: fromhours, m: frommin })
          .tz(userData.timeZone);
          let to1 =  moment()
          .utc()
          .day(day)
          .set({ h: tohours, m: tomin })
          .tz(userData.timeZone);
          let dayAfter = from1.day();
          if (day === dayAfter) {
            i.from_time = from1.format("HH:mm");
            i.to_time = to1.format("HH:mm");
            return i;
          }
        });
        res.json(result)
      })
    }
  )

  app.get(
    "/groomers-appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
      let userData =  req.session && req.session.user ? req.session.user : null;
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [10, 8, 9, 7] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					// { '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$vet.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			// if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`vetPractice`.`practice_name`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            "appointment_date",
            "from_time",
            "to_time",
            "cancelled_by",
            [Sequelize.col("animalName.name"), "animal_name"],
            // [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            // {
            //     model: VetPractices, as: "vetPractice", attributes: []
            // },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: ['id', "first_name", 'last_name']
						}
          ],
          where,
          order
      }).then((result: any) => {
        //result = result.toJSON();
        result.data = result?.data.map((i:any) => {
      const day = moment(i.appointment_date)
      .utc()
      .set({ h: 0, m: 0 })
      .day();
      i.appointment_date = moment(i.appointment_date).format('YYYY-MM-DD');
      i.todayDate = moment().format('YYYY-MM-DD');
      let from = i.from_time;
      let to = i.to_time;
          const fromhours = parseInt(from.split(':')[0]);
          const frommin = parseInt(from.split(':')[1]);
          const tohours = parseInt(to.split(':')[0]);
          const tomin = parseInt(to.split(':')[1]);
          let from1 =  moment()
          .utc()
          .day(day)
          .set({ h: fromhours, m: frommin })
          .tz(userData.timeZone);
          let to1 =  moment()
          .utc()
          .day(day)
          .set({ h: tohours, m: tomin })
          .tz(userData.timeZone);
          let dayAfter = from1.day();
          if (day === dayAfter) {
            i.from_time = from1.format("HH:mm");
            i.to_time = to1.format("HH:mm");
            return i;
          }
      });
        res.json(result)
      })
    }
  )

  app.get(
    "/walkers-appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [8] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					// { '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
          { '$vet.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			// if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`vet`.`first_name`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            [Sequelize.col("animalName.name"), "animal_name"],
            // [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            // {
            //     model: VetPractices, as: "vetPractice", attributes: []
            // },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: ['id', "first_name", 'last_name']
						}
          ],
          where,
          order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/therapists-appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [9] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					// { '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
          { '$vet.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			// if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`vet`.`first_name`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            [Sequelize.col("animalName.name"), "animal_name"],
            // [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            // {
            //     model: VetPractices, as: "vetPractice", attributes: []
            // },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: ['id', "first_name", 'last_name']
						}
          ],
          where,
          order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/nutritionist-appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [10] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					// { '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
          { '$vet.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			// if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`vet`.`first_name`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            [Sequelize.col("animalName.name"), "animal_name"],
            // [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            // {
            //     model: VetPractices, as: "vetPractice", attributes: []
            // },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: ['id', "first_name", 'last_name']
						}
          ],
          where,
          order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/breeders-appointments/data",
    authRedirect(true),
    (req: Request, res: Response) => {
			let order:any[] = [];
      let where:any = { '$vet.role$': { [Op.in]: [8] } };
      if(req.query && req.query.search && req.query.search.value !== ''){
        where = { [Op.or]: [ 
					{ symptoms: { [Op.like]: `%${req.query.search.value}%` }},
					{ note: { [Op.like]: `%${req.query.search.value}%` }},
					{ '$animalName.name$' : { [Op.like]: `%${req.query.search.value}%` }},
					// { '$vetPractice.practice_name$' : { [Op.like]: `%${req.query.search.value}%` }},
					{ '$users.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
          { '$vet.first_name$' : { [Op.like]: `%${req.query.search.value}%` }},
				]};
        delete req.query.search; 
      }
      if (req.query && req.query.order && req.query.order[0].column === '1') {
        order = [ [ Sequelize.literal('`animalName`.`name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
			// if (req.query && req.query.order && req.query.order[0].column === '4') {
      //   order = [ [ Sequelize.literal('`vet`.`first_name`'), req.query.order[0].dir ] ];
      //   delete req.query.order;
      // }
			if (req.query && req.query.order && req.query.order[0].column === '5') {
        order = [ [ Sequelize.literal('`users`.`first_name`'), req.query.order[0].dir ] ];
        delete req.query.order;
      }
      where.is_deleted = null;
      datatable(Appointments, req.query, {
        attributes: [
            "id",
            "symptoms",
            "note",
            [Sequelize.col("animalName.name"), "animal_name"],
            // [Sequelize.col("vetPractice.practice_name"), "vet_practice"],
						[Sequelize.col("users.first_name"), "first_name"],
          ],
          include: [
            {
              model: AnimalProfiles, as: "animalName", attributes: []
            },
            // {
            //     model: VetPractices, as: "vetPractice", attributes: []
            // },
						{
							model: User, as: "users", attributes: []
						},
            {
							model: User, as: "vet", attributes: ['id', "first_name", 'last_name']
						}
          ],
          where,
          order
      }).then((result: any) => {
        res.json(result)
      })
    }
  )

  app.get(
    "/appointments/:id",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const appointmentsService = new AppointmentsService();

      appointmentsService
        .getAppointment(+req.params.id)
        .then((responseData: any) => {
					console.log(responseData);
          res.render("appointments/appointments.ejs", {
            title: "Appointments Details",
            userData: req.session && req.session.user ? req.session.user : null,
            responseData,
          })
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )

  app.get(
    "/appointment/:id/delete",
    authRedirect(true),
    (req: Request, res: Response, next: NextFunction) => {
      const animalProfilesService = new AppointmentsService();
      animalProfilesService
        .deleteAppointment(+req.params.id, req.session?.user.timeZone)
        .then(() => {
          req.flash(
            "success",
            "Appointment deleted successfully.",
            req,
            res
          )
          res.redirect("/admin/appointments")
        })
        .catch((error: Error) => {
          return next(error)
        })
    }
  )


}
