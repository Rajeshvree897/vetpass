import express from "express";
import { getUsers, users } from "./getUsers";
import config from "./config";
import Logger from "./loaders/logger";
import ActiveUserHolder from "./ActiveUserHolder";
import MessageService from "./services/messages";
import ConversationModel from "./db/mongoose-models/conversations";
import NotificationService from "./services/notification-service";
const cron = require("node-cron");

async function startServer() {
  const app = express();
  const http = require("http").createServer(app);
  const io = require("socket.io")(http, {
    cors: { origin: "*", secure: true },
  });
  await require("./loaders").default(app);

  // socket io connection
  const activeUserHolder = new ActiveUserHolder();
  const messageService = new MessageService();
  const notification = new NotificationService();


  // Schedule task to send reminder messages
  // cron.schedule("* * * * *", async () => {
  //   // Retrieve pending reminder messages
  //   const reminderMessages = await messageService.listRemainders();

  //   // Emit reminder messages to clients
  //   reminderMessages.forEach(async (message) => {
  //     // GROUP MESSAGE
  //     const remainderMessage =
  //       message.message ||
  //       `Remainder: ${message.remainder_name} &amp; ${message.message}`;
  //     if (message && message.room_id) {
  //       let chatDetails: any = "";
  //       let file: any = false;

  //       const room = await messageService.getGroupID(message.room_id);
  //       let messageData = {
  //         from: message.from,
  //         message: remainderMessage,
  //         roomName: room?.group_id,
  //         practice: room?.practice_id,
  //       };

  //       chatDetails = await messageService.createChat(messageData, null);

  //       let room_id = chatDetails.room_id ? chatDetails.room_id : 0;
  //       const resultSend = {
  //         _id: chatDetails.id,
  //         id: chatDetails.id,
  //         text: remainderMessage,
  //         createdAt: chatDetails.created_at,
  //         user: { _id: Number(message.from) },
  //         username: message.from,
  //         senderID: chatDetails.sender.id,
  //         senderProfile:
  //           chatDetails.sender &&
  //           chatDetails.sender.UploadProfile &&
  //           chatDetails.sender.UploadProfile.UploadFile
  //             ? chatDetails.sender.UploadProfile.UploadFile
  //             : "",
  //         message: remainderMessage,
  //         room_id: room_id,
  //         upload_file_id: chatDetails.upload_file_id,
  //         type: "text",
  //         url: null,
  //         fileType: null,
  //         name: "",
  //         file: file,
  //         is_edit: 0,
  //         is_reply: 0,
  //         message_deleted: chatDetails.message_deleted,
  //         Reply: chatDetails && chatDetails.Reply ? chatDetails.Reply : null,
  //         orignalMsg: chatDetails.message,
  //         is_edited: chatDetails.is_edited ? chatDetails.is_edited : 0,
  //         sender: {
  //           id: chatDetails.from,
  //           first_name:
  //             (chatDetails &&
  //               chatDetails.sender &&
  //               chatDetails.sender.first_name) ||
  //             "",
  //           last_name:
  //             (chatDetails &&
  //               chatDetails.sender &&
  //               chatDetails.sender.last_name) ||
  //             "",
  //         },
  //         Originator: null,
  //         image: null,
  //       };
  //       io.to(chatDetails.group_id).emit("chat", resultSend);
  //       const groupMembers: any = await messageService.groupMembers(room_id);
  //       await Promise.all(
  //         groupMembers.map(async (i: any) => {
  //           if (
  //             !i.is_deleted &&
  //             i.User &&
  //             i.User.dataValues.timeZone &&
  //             i.User.dataValues.id
  //           ) {
  //             await refreshChat({
  //               loggedUserId: i.User.id,
  //               timeZone: i.User.dataValues.timeZone,
  //             });

  //             if (i && i.users_id && i.users_id != message.from) {
  //               const first_name =
  //                 (chatDetails &&
  //                   chatDetails.sender &&
  //                   chatDetails.sender.first_name) ||
  //                 "";
  //               const last_name =
  //                 (chatDetails &&
  //                   chatDetails.sender &&
  //                   chatDetails.sender.last_name) ||
  //                 "";
  //               const senderName = `${first_name} ${last_name}`;
  //               const notificationData = {
  //                 title: `New Message from ${senderName}`,
  //                 body: chatDetails.message || "",
  //                 userIds: [i.users_id],
  //                 payload: {
  //                   room_id: room && room.name ? room.name : null,
  //                   practice:
  //                     i && i.Room && i.Room.practice_id
  //                       ? i.Room.practice_id
  //                       : null,
  //                   senderName,
  //                   loggedInUserId: i.users_id,
  //                 },
  //               };
  //               //await notification.sendChatNotifications(notificationData, "group-message");
  //             }
  //           }
  //         })
  //       );
  //     } else {
  //       // PRIVATE MESSAGE
  //       const array = activeUserHolder.getAllUserSockets();
  //       const conversationExist = await ConversationModel.findOne({
  //         type: "private",
  //         "participants.user_id": { $all: [Number(message.from), Number(message.to)] },
  //       });
  //       const conversationId = conversationExist ? conversationExist.id : null;
  //       const data = {
  //         from: message.from,
  //         to: message.to,
  //         message: remainderMessage,
  //       };
  //       const createdChat = await messageService.createChat(data, null);
  //       const resultSend = {
  //         _id: createdChat.id,
  //         id: createdChat.id,
  //         text: remainderMessage,
  //         createdAt: createdChat.created_at,
  //         user: { _id: Number(createdChat.from) },
  //         message: remainderMessage,
  //         from: message.from,
  //         sendFrom: createdChat.from,
  //         to: createdChat.to,
  //         upload_file_id: createdChat.upload_file_id,
  //         type: "text",
  //         url: null,
  //         fileType: null,
  //         name: "",
  //         file: false,
  //         is_edit: 0,
  //         is_reply: 0,
  //         message_deleted: createdChat.message_deleted,
  //         Reply: null,
  //         orignalMsg: createdChat.message,
  //         is_edited: 0,
  //         senderID: createdChat.sender.id,
  //         sender: {
  //           id: createdChat.from,
  //           first_name:
  //             (createdChat &&
  //               createdChat.sender &&
  //               createdChat.sender.first_name) ||
  //             "",
  //           last_name:
  //             (createdChat &&
  //               createdChat.sender &&
  //               createdChat.sender.last_name) ||
  //             "",
  //         },
  //         Originator: null,
  //         image: null,
  //       };
  //       io.to(array[createdChat.to]).emit("private-message", resultSend);
  //       io.to(array[createdChat.from]).emit("private-message", resultSend);
  //       const timeZone: any = await messageService.getUserTimeZone(
  //         createdChat.to
  //       );
  //       if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
  //         await refreshChat({
  //           loggedUserId: createdChat.to,
  //           timeZone: timeZone.dataValues.timeZone,
  //         });
  //       }

  //       const first_name =
  //         (createdChat &&
  //           createdChat.sender &&
  //           createdChat.sender.first_name) ||
  //         "";
  //       const last_name =
  //         (createdChat && createdChat.sender && createdChat.sender.last_name) ||
  //         "";
  //       const senderName = `${first_name} ${last_name}`;
  //       const notificationData = {
  //         title: `New Message from ${senderName}`,
  //         body: createdChat.message || "",
  //         userIds: [createdChat.to],
  //         payload: {
  //           loggedInUserId: createdChat.to,
  //           contact: createdChat.from,
  //           senderName,
  //         },
  //       };
  //       //await notification.sendChatNotifications(notificationData, "private-message");
  //     }

  //     // UPDATE REMAINDER MESSAGES STATUS
  //     await messageService.updateRemainderStatus(message.id);
  //   });
  // });

  cron.schedule("* * * * *", async () => {
    // Retrieve pending reminder messages
    const reminderMessages = await messageService.listRemainders();
    
    // Emit reminder messages to clients
    reminderMessages.forEach(async (message) => {
      // GROUP MESSAGE
      const remainderMessage =
        message.message ||
        `Remainder: ${message.remainder_name} &amp; ${message.message}`;
      if (message && message.room_id) {
        let chatDetails: any = "";
        let file: any = false;
        const conversationExist = await ConversationModel.findOne({
          type: "group",
          "participants.user_id": { $all: [Number(message.from)] },
          group_id: message.room_id,
        });
        const conversationId = conversationExist ? conversationExist.id : null;
        let messageData = {
          from: message.from,
          message: remainderMessage,
          is_system_msg : 1
        };
         chatDetails = await messageService.createMongoChat(
            messageData,
            conversationId
          );
        let room_id = chatDetails.group_id ? chatDetails.group_id : 0;
        if (chatDetails) {
          const sender = chatDetails.participants.filter(
            (participant: any) => participant.user_id == message.from
          )[0];
          const  is_left = chatDetails.group_id && chatDetails.participants
                  ? chatDetails.participants.find(
                      (user:any) => user.user_id == message.from
                    )?.is_deleted ?? 0 : 0;
          let messageObj = chatDetails.messages;
          if (messageObj.length) {
            messageObj = messageObj[messageObj.length - 1];
          }
          const resultSend = {
            conversationId : chatDetails && chatDetails._id ? chatDetails._id : 0,
            _id: messageObj && messageObj._id ? messageObj._id : 0,
            id: messageObj && messageObj._id ? messageObj._id : 0,
            text: messageObj.message,
            createdAt: messageObj.created_at,
            user: { _id: Number(messageObj.user_id) },
            username: message.from,
            senderID: messageObj.user_id,
            senderProfile: sender && sender.profile ? sender.profile : "",
            message: remainderMessage,
            room_id: chatDetails.group_id,
            type: "text",
            is_edit: 0,
            is_reply: 0,
            is_deleted: messageObj.is_deleted,
            parent_message:
              messageObj && messageObj && messageObj.parent_message
                ? messageObj.parent_message
                : null,
            orignalMsg: chatDetails.message,
            is_edited: messageObj.is_edited ? messageObj.is_edited : 0,
            sender: sender,
            Originator: null,
            is_left : is_left,
            image: null,
          };
        io.to(chatDetails.group_id).emit("chat", resultSend);
        const groupMembers: any = await messageService.groupMembers(room_id);
        await Promise.all(
          chatDetails.participants.map(async (i: any) => {
            const timeZone: any = await messageService.getUserTimeZone(
              i.user_id
            );
            await refreshChat({
              loggedUserId: i.user_id,
              timeZone: timeZone.dataValues.timeZone,
            });

            if (i && i.user_id && i.user_id != message.from) {
              const first_name =
                (sender  &&
                  sender.first_name) ||
                "";
              const last_name =
                (sender &&
                  sender.last_name) ||
                "";
              const senderName = `${first_name} ${last_name}`;
              const notificationData = {
                title: `New Message from ${senderName}`,
                body: remainderMessage || "",
                userIds: [i.user_id],
                payload: {
                  room_id: chatDetails && chatDetails.group_name ? chatDetails.group_name : null,
                  practice:
                    chatDetails && chatDetails.practice && chatDetails.practice.id
                      ? chatDetails.practice.id
                      : null,
                  senderName,
                  loggedInUserId: i.user_id,
                },
              };
              //await notification.sendChatNotifications(notificationData, "group-message");
            }
          })
        );
      }
      } else {
        // PRIVATE MESSAGE
        const array = activeUserHolder.getAllUserSockets();
        const conversationExist = await ConversationModel.findOne({
          type: "private",
          "participants.user_id": { $all: [Number(message.from), Number(message.to)] },
        });
        const conversationId = conversationExist ? conversationExist.id : null;
        const data = {
          from: message.from,
          is_system_msg : 1,
          message: remainderMessage,
        };
         const createdChat = await messageService.createMongoChat(
            data,
            conversationId
          );
       if (createdChat) {
        const sender = createdChat.participants.filter(
          (participant: any) => participant.user_id == data.from
        )[0];
        let messageObj:any = createdChat.messages;
        if (messageObj.length) {
          messageObj = messageObj[messageObj.length - 1];
        }
        const resultSend = {
          conversationId : createdChat && createdChat._id ? createdChat._id : 0,
          _id: messageObj && messageObj._id ? messageObj._id : 0,
          id: messageObj && messageObj._id ? messageObj._id : 0,
          text: messageObj.message,
          createdAt: messageObj ? messageObj.created_at : "",
          user: { _id: Number(messageObj.user_id) },
          message: messageObj.message,
          sendFrom: data.from,
          is_edit: 0,
          is_reply: 0,
          is_deleted: messageObj ? messageObj.is_deleted : 0,
          parent_message:
            messageObj && messageObj.parent_message
              ? messageObj.parent_message
              : null,
          orignalMsg: data.message,
          is_edited:
            messageObj && messageObj.is_edited ? messageObj.is_edited : 0,
          senderID: messageObj && messageObj.user_id ? messageObj.user_id : 0,
          sender: sender,
          Originator: null,
          image:null
        };  
        io.to(array[message.to]).emit("private-message", resultSend);
        io.to(array[message.from]).emit("private-message", resultSend);
        const timeZone: any = await messageService.getUserTimeZone(
          message.to
        );
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: message.to,
            timeZone: timeZone.dataValues.timeZone,
          });
        }

        const first_name =
          (sender &&
            sender.first_name) ||
          "";
        const last_name =
          (sender && sender.last_name) ||
          "";
        const senderName = `${first_name} ${last_name}`;
        const notificationData = {
          title: `New Message from ${senderName}`,
          body: remainderMessage || "",
          userIds: [message.to],
          payload: {
            loggedInUserId: message.to,
            contact: message.from,
            senderName,
          },
        };
       // await notification.sendChatNotifications(notificationData, "private-message");
       }
      }

      // UPDATE REMAINDER MESSAGES STATUS
      await messageService.updateRemainderStatus(message.id);
    });
  });

  var server = http.listen(parseInt(config.port), (error: Error) => {
    if (error) {
      Logger.error(error);
      process.exit(1);
    }

    Logger.info(`Server listening on port: ${config.port}`);
  });

  server.timeout = 0;
}

startServer();
