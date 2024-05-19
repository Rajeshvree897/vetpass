// @ts-ignore:3
import datatable from "sequelize-datatable";
import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import moment from "moment";
import { Sequelize, Op } from "sequelize";
import { authRedirect } from "../middlewares/index";
import MessageService from "../../services/messages";
import CommonService from "../../services/common";
import multer from "multer";
import upload from "../../helpers/file-upload";
import constants from "../../helpers/constants";
import { CustomError } from "../../services/error-service";
import { join } from "bluebird";

export default (app: Router) => {

	app.post(
		'/message',
		celebrate({
			body: Joi.object({
				from: Joi.number().required(),
				to: Joi.optional(),
				message: Joi.string().required(),
				room_id: Joi.optional()
			}),
		}),
		// authRedirect(false),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.createChat(req.body, null)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.get(
		"/chat",
		authRedirect(true),
		async (req: Request, res: Response) => {
			let timeZone = req.session?.user.timeZone;
			const messageService = new MessageService();
			const vetPractice = req.session && req.session.user && req.session.user.vetPractice ? req.session.user.vetPractice : null;
			const option = req.session && req.session.user && req.session.user.option ? req.session.user.option : null;
			const loggedInUserId = req.session && req.session.user ? req.session.user.id : null;
			let messagesTemp = await messageService.getMongodbChatData(loggedInUserId, timeZone);
			res.render("chat/index.ejs", {
				title: constants.PAGE_TITLE.INSURER_LIST,
				loggedInUserId,
				userData: req.session && req.session.user ? req.session.user : null,
				contactUsers: messagesTemp,//await messageService.getContactData(loggedInUserId),
				vetUsers: await messageService.vetProfileUsers(vetPractice, option, loggedInUserId),
				rooms: await messageService.exitOnMongoRoom(loggedInUserId),//await messageService.existOnRoom(loggedInUserId),
				timeZone: timeZone,
				profilePic: await messageService.getUserProfile(loggedInUserId),
				favorites : await messageService.getFavoritesUser(vetPractice)
			})
		}
	)

	app.get(
		"/message/vetUsers",
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const vetPractice = req.session && req.session.user && req.session.user.vetPractice ? req.session.user.vetPractice : null;
			const option = req.session && req.session.user && req.session.user.option ? req.session.user.option : null;
			const loggedInUserId = req.session && req.session.user ? req.session.user.id : null;
			const messageService = new MessageService();
			messageService
				.vetProfileUsers(vetPractice, option, loggedInUserId)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		});

	app.post(
		"/message/getChatData",
		celebrate({
			body: Joi.object({
				loggedInUserId: Joi.number().required(),
				contact: Joi.string().required(),
				offset: Joi.number().required(),
				limit: Joi.number().required(),
				roomId: Joi.optional()
			}),
		}),
		// authRedirect(false),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.getChatData(req.body.loggedInUserId, req.body.contact, req.body.limit, req.body.offset)
				.then((data: any) => {
					return res.json({ data: data, profilePic: data.img_path, is_left: data.is_left, iconId: data.iconId, isArchived: data.isArchived });

				})
				.catch((error: Error) => {
					return next(error)
				})
		}
	)

	app.post(
		"/message/contact-list",
		celebrate({
			body: Joi.object({
				loggedInUserId: Joi.number().required(),
			}),
		}),
		// authRedirect(false),
		(req: Request, res: Response, next: NextFunction) => {
			let timeZone = req.session?.user.timeZone;
			const messageService = new MessageService();
			// get mongo chat data
			messageService.getMongodbChatData(req.body.loggedInUserId, timeZone)
				// messageService
				// .getContactData(req.body.loggedInUserId, timeZone)
				.then((data: any) => {
					return res.json({ data: data });
				})
				.catch((error: Error) => {
					return next(error)
				})
		}
	)

	app.post(
		'/message/create-group',
		(req: Request, res: Response, next: NextFunction) => {
			const vetPractice = req.session && req.session.user && req.session.user.vetPractice ? req.session.user.vetPractice : null;
			const messageService = new MessageService();
			messageService
				.createGroup(req.body, vetPractice)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.post(
		'/message/forward-messages',
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.forwardMessages(req.body)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);
	app.get(
		'/message/group-memebers/:conversationId',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.mongoGroupMembers(req.params.conversationId)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.get(
		'/message/leave-group/:conversationId/:userId',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.leaveGroup(req.params)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);
	app.post(
		'/message/add-group-member',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.addGroupMember(req.body)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);
	app.get(
		'/message/chat/delete/:room_id/:userId',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.deleteRoomChat(req.params)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.post(
		'/message/read-flag',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			messageService
				.setReadFlag(req.body)
				.then((data) => {
					return res.json({ data });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.get(
		'/message/get-group-contacts',
		authRedirect(true),
		(req: Request, res: Response, next: NextFunction) => {
			const vetPractice = req.session && req.session.user && req.session.user.vetPractice ? req.session.user.vetPractice : null;
			const option = req.session && req.session.user && req.session.user.option ? req.session.user.option : null;
			const loggedInUserId = req.session && req.session.user ? req.session.user.id : null;
			const messageService = new MessageService();
			messageService
				.vetProfileUsers(vetPractice, option, loggedInUserId)
				.then(async (data) => {
					const rooms = await messageService.existOnRoom(loggedInUserId)
					return res.json({ vetUsers: data, rooms: rooms });
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.post(
		'/message/upload/image',
		multer().array('chatUploadImage', 5), // Set the maximum count of files as needed (here, it's set to 5)
		authRedirect(true),
		async (req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			const files = req.files as Express.Multer.File[]; // Cast req.files to the correct type
			await messageService.sendFiles(req.body, files)
				.then(async (data) => {
					return res.json(data);
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.post(
		'/message/upload/group/icon',
		multer().single('icon'),
		authRedirect(true),
		async (req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			const file: any = req.file as Express.Multer.File;
			await messageService.changeGroupIcon(req.body, file)
				.then(async (data) => {
					return res.json(data);
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);

	app.post(
		'/message-remainder',
		// authRedirect(true),
		async (req: Request, res: Response, next: NextFunction) => {
			const messageService = new MessageService();
			await messageService.createRemainderMessages(req.body)
				.then(async (data) => {
					return res.json(data);
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	);
	app.post(
		"/message/vet-users",
		celebrate({
			body: Joi.object({
				offset: Joi.number().required(),
				limit: Joi.number().required(),
			}),
		}),
		// authRedirect(false),
		(req: Request, res: Response, next: NextFunction) => {
			const vetPractice = req.session && req.session.user && req.session.user.vetPractice ? req.session.user.vetPractice : null;
			const option = req.session && req.session.user && req.session.user.option ? req.session.user.option : null;
			const loggedInUserId = req.session && req.session.user ? req.session.user.id : null;
			const messageService = new MessageService();
			messageService
				.vetUsers(vetPractice, option, loggedInUserId, req.body.offset, req.body.limit)
				.then((data) => {
					return res.json(data);
				})
				.catch((error: Error) => {
					return next(error);
				});
		}
	)
}

