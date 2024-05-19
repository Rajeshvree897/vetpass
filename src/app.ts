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
  io.on("connection", async (socket: any) => {
    var user: any = {};
    const id = socket.handshake.query.userId;
    if (id) {
      activeUserHolder.addUsernameSocket(id, socket.id);
      let roomname: any = [];
      let rooms: any = await messageService.exitOnMongoRoom(id);
      rooms.map(async (groups: any) => {
        roomname.push(groups.group_id);
      });
      if (roomname) {
        roomname.forEach(function (roomname: any) {
          user[socket.id] = id;
          if (users[roomname]) {
            users[roomname].push(user);
          } else {
            users[roomname] = [user];
          }
          socket.join(roomname);
        });
      }
    }

    //read messages
    socket.on("read-message", async (data: any) => {
      const setReadFlag = await messageService.setReadFlag({
        id: data.id,
        loggedInuser: id,
      });
      if (setReadFlag) {
        await socket.emit("read-message", data);
      }
    });

    //delete message
    socket.on("delete-messages", async (data: any) => {
      let toId;
      if (data) {
        let isDelete = await messageService.deleteMessage(data);
        data.status = isDelete;
        if (data.roomId && data.roomId != 0) {
          toId = data.roomId;
        } else {
          const array = activeUserHolder.getAllUserSockets();
          toId = array[data.contact];
        }
        io.to(toId).emit("delete-messages", data);
      }
    });

    //join new group
    socket.on("new-group", async (data: any) => {
      activeUserHolder.addUsernameSocket(data.username, socket.id);
      const array = activeUserHolder.getAllUserSockets();
      let groupMmebers: any = data.group_members;
      socket.join(data.roomname);
      if (groupMmebers) {
        groupMmebers.forEach(function (member: any) {
          const socketIds = array[member];
          if (socketIds != undefined) {
            const roomName = data.roomname;
            const room = io.sockets.adapter.rooms.get(roomName) || new Set(); // get the room object or create a new one
            socketIds.forEach((socketId) => {
              room.add(socketId); // add each socket id to the room
            });
            io.sockets.adapter.rooms.set(roomName, room);
          }
        });
        socket.join(data.roomname);
      }
      let messageData = {
        _id: data._id,
        type: "group",
        from: data.username,
        message: data.message,
        is_system_msg: 1,
      };
      let chatDetails: any = await messageService.createMongoChat(
        messageData,
        data._id
      );
      const resultSend = {
        _id: chatDetails._id,
        text: data.message,
        createdAt: chatDetails.messages[0].created_at,
        user: { _id: data.username },
        is_system_msg: 1,
        username: data.username,
        sender: {},
        message: data.message,
        room_id: chatDetails.group_id,
      };
      io.to(data.roomname).emit("new-group", resultSend);
    });

    //clear chat
    socket.on("clear-chat", async (data: any) => {
      const clearChat = await messageService.clearChat(data);
      if (clearChat) {
        await socket.emit("clear-chat", { data: data, status: true });
      }
    });

    // multiple archives for app
    socket.on("archive-contacts", async (data: any) => {
      const archiveChat = await messageService.multipleArchives(data);
      if (archiveChat && archiveChat.length) {
        const timeZone: any = await messageService.getUserTimeZone(
          data.loggedInUserId
        );
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: data.loggedInUserId,
            timeZone: timeZone.dataValues.timeZone,
          });
        }
      }
    });

    // multiple unArchives for app
    socket.on("unarchive-contacts", async (data: any) => {
      const unarchiveChat = await messageService.multipleUnArchives(data);
      if (unarchiveChat) {
        const timeZone: any = await messageService.getUserTimeZone(
          data.loggedInUserId
        );
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: data.loggedInUserId,
            timeZone: timeZone.dataValues.timeZone,
          });
        }
      }
    });

    // archive chat
    socket.on("archive-chat", async (data: any) => {
      const archiveChat = await messageService.archiveChat(data);
      if (archiveChat.status) {
        await socket.emit("archive-chat", { data: data, status: true });
        const timeZone: any = await messageService.getUserTimeZone(
          data.loggedInUserId
        );
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: data.loggedInUserId,
            timeZone: timeZone.dataValues.timeZone,
          });
        }
      }
    });

    // unarchive chat
    socket.on("unarchive-chat", async (data: any) => {
      const unarchiveChat = await messageService.unarchiveChat(data);
      if (unarchiveChat.status) {
        await socket.emit("unarchive-chat", { data: data, status: true });
        const timeZone: any = await messageService.getUserTimeZone(
          data.loggedInUserId
        );
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: data.loggedInUserId,
            timeZone: timeZone.dataValues.timeZone,
          });
        }
      }
    });

    socket.on("leave-group", async (data: any) => {
      let messageData = {
        _id: data._id,
        from: data.leaveuser,
        message: data.leaveMessage,
        is_system_msg: 1,
      };

      let chatDetails: any = await messageService.createMongoChat(
        messageData,
        data._id
      );
      let room_id = data.roomid;
      const resultSend = {
        username: data.leaveuser,
        sender: "",
        message: data.leaveMessage,
        is_system_msg: 1,
        sendFrom: data.leaveuser,
        leftUser: 1,
        room_id: room_id,
        loggedInUserId: data.loggedInUserId,
      };
      await socket.to(data.roomid).emit("user-left", resultSend);
      const array = activeUserHolder.getAllUserSockets();
      let groupId: any = room_id;
      if (groupId) {
        const socketIds = array[data.leaveuser];
        if (socketIds != undefined) {
          const roomName = room_id;
          const room = io.sockets.adapter.rooms.get(roomName) || new Set();
          socketIds.forEach((socketId) => {
            if (room && room.has(socketId)) {
              room.delete(socketId);
            }
          });
        }
      }
      await io.to(array[data.loggedInUserId]).emit("user-left", resultSend);
    });

    //mongo DB group and pvt forward
    socket.on("forward-message", async (data: any) => {
      if (data) {
        const forwardMessageToRoom = data.groups;
        let forwardToRooms = await messageService.getMongoGroupID(
          forwardMessageToRoom
        );
        const forwardMessges: any = await messageService.forwardMessages(data);
        const sockeIDArr = activeUserHolder.getAllUserSockets();
        const forwardMessageTo = data.toUsers;
        let forwardUsersSocket: any = [];
        let forwardToPvt: any = [];
        let forwardTogrp: any = [];
        let notificationForPVTMessages = [];
        let notificationForGRPMessages = [];
        let senderName: any = "";
        forwardMessageTo.forEach(function (user: any) {
          const socketId = sockeIDArr[user];
          if (socketId) {
            forwardUsersSocket.push(socketId[0]);
          }
        });

        if (forwardMessges && forwardMessges.length > 0) {
          for (var i of forwardMessges) {
            senderName = i.senderName;
            if (i.group_id && i.group_id != null) {
              notificationForGRPMessages.push({ message: i.message, senderName: i.senderName, room_id: i.group_id, from: data.loggedInUserId });
              i.sender = data.sender;
              forwardTogrp.push(i);
            } else {
               notificationForPVTMessages.push({ message: i.message, senderName: i.senderName, to: i.to, from: data.from });
              forwardToPvt.push(i);
            }
          }
          forwardToPvt.push({ username: data.loggedInUserId });
          forwardTogrp.push({ username: data.loggedInUserId });
        }
        if (forwardToPvt.length > 0) {
          await io
            .to(forwardUsersSocket)
            .emit("forward-message", {
              forwardData: forwardToPvt,
              sender: null,
            });
          data.toUsers.push(data.loggedInUserId);
          await Promise.all(notificationForPVTMessages.map(async (msg: any) => {
            const notificationData = {
              title: `New Message from ${senderName}`,
              body: msg.message || "",
              userIds: [ msg.to ],
              payload: {
                loggedInUserId: msg.to,
                contact: data.loggedInuser,
                senderName
              }
            }
           // await notification.sendChatNotifications(notificationData, "private-message");
          }));
          await Promise.all(
            data.toUsers.map(async (userId: any) => {
              const timeZone: any = await messageService.getUserTimeZone(
                userId
              );
              if (
                timeZone &&
                timeZone.dataValues &&
                timeZone.dataValues.timeZone
              ) {
                await refreshChat({
                  loggedUserId: userId,
                  timeZone: timeZone.dataValues.timeZone,
                });
              }
            })
          );
        }
        if (forwardTogrp.length > 0) {
          io.to(forwardToRooms).emit("forward-message", {
            forwardData: forwardTogrp,
            sender: data.sender,
          });
          await Promise.all(
            data.groups.map(async (conversationId: any) => {
              const groupMembers: any = await messageService.mongoGroupMembers(
                conversationId
              );
              await Promise.all(
                groupMembers.map(async (i: any) => {
                  const timeZone: any = await messageService.getUserTimeZone(
                    i.user_id
                  );
                  if (
                    i.user_id &&
                    timeZone &&
                    timeZone.dataValues &&
                    timeZone.dataValues.timeZone
                  ) {
                    const notificationData = {
                      title: `New Message from ${senderName}`,
                      body: i.message || "",
                      userIds: [ i.user_id ],
                      payload: {
                        room_id: data && data.roomname || "",
                        practice: data && data.practice || "",
                        senderName,
                        loggedInUserId: data && data.username || "",
                      }
                    }
                  //  await notification.sendChatNotifications(notificationData, "group-message");
                    await refreshChat({
                      loggedUserId: i.user_id,
                      timeZone: timeZone.dataValues.timeZone,
                    });
                  }
                })
              );
            })
          );
        }
      }
    });

    const welcomeMessage = `${id} connected with ${socket.id}`;
    const responseData = {
      messages: [
        {
          id: 123,
          message: welcomeMessage,
          sender: {
            id: 1,
            username: "system",
            isAdmin: true,
          },
          isForwarded: false,
        },
      ],
    };
    socket.emit("system-message", responseData);

    socket.on("private-message", async (data: any) => {
      // check is conversation exist already
      const conversationExist = await ConversationModel.findOne({
        type: "private",
        "participants.user_id": { $all: [Number(data.from), Number(data.to)] },
      });
      const conversationId = conversationExist ? conversationExist.id : null;
      let file = false;
      let index = -1;
      let createdChat: any = {};
      const array = activeUserHolder.getAllUserSockets();
      if (data.sendFileToPvt) {
        file = true;
      }
      data.type = "private";
      if (data.isEdit && Number(data.isEdit) != 0) {
        createdChat = await messageService.editMessage(data, conversationId);
        index = createdChat.messages.findIndex(
          (message: any) => message._id == data.isEdit
        );
      } else {
        if (data.parent_msg_id && Number(data.parent_msg_id) != 0) {
          createdChat = await messageService.replyMessage(
            data,
            data.parent_msg_id,
            conversationId
          );
        } else {
          createdChat = await messageService.createMongoChat(
            data,
            conversationId
          );
        }
      }
      if (createdChat) {
        const sender = createdChat.participants.filter(
          (participant: any) => participant.user_id == data.from
        )[0];
        let messageObj = createdChat.messages;
        if (messageObj.length) {
          index = index != -1 ? index : messageObj.length - 1;
          messageObj = messageObj[index];
        }
        const resultSend = {
          conversationId : createdChat && createdChat._id ? createdChat._id : 0,
          _id: messageObj && messageObj._id ? messageObj._id : 0,
          id: messageObj && messageObj._id ? messageObj._id : 0,
          text: messageObj.message,
          createdAt: messageObj ? messageObj.created_at : "",
          user: { _id: Number(messageObj.user_id) },
          message: messageObj.message,
          from: socket.id,
          sendFrom: data.from,
          to: data.to,
          upload_file_id: "",
          type: data.type ? data.type : "text",
          url: data.fileUrl ? data.fileUrl : null,
          fileType: data.fileType ? data.fileType : null,
          name: data.fileName ? data.fileName : "",
          file: file,
          is_edit: data.isEdit ? data.isEdit : 0,
          is_reply: data.parent_msg_id ? data.parent_msg_id : 0,
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
          image:
            data && data.fileUrl && data.message == "image"
              ? data.fileUrl
              : null,
        };

        await socket.to(array[data.to]).emit("private-message", resultSend);
        io.to(array[data.from]).emit("private-message", resultSend);
        const timeZone: any = await messageService.getUserTimeZone(data.to);
        if (timeZone && timeZone.dataValues && timeZone.dataValues.timeZone) {
          await refreshChat({
            loggedUserId: data.to,
            timeZone: timeZone.dataValues.timeZone,
          });
        }

        const first_name = sender && sender.first_name || "";
        const last_name = sender && sender.last_name || "";
        const senderName = `${first_name} ${last_name}`;
        const notificationData = {
          title: `New Message from ${senderName}`,
          body: messageObj.message || "",
          userIds: [ data.to ],
          payload: {
            loggedInUserId: data.to,
            contact: data.from,
            senderName
          }
        }

        //await notification.sendChatNotifications(notificationData, "private-message");
      }
    });

    socket.on("disconnect", () => {
      activeUserHolder.findAndDeleteSingleSocket(id, socket.id);
      activeUserHolder.findAndDeleteAllSockets(socket.id);
    });

    socket.on("joined-user", async (data: any) => {
      user[socket.id] = data.username;
      const roomDetails: any = await messageService.joinRoom(data);
      const group_id = roomDetails && roomDetails.group_id;
      const array = activeUserHolder.getAllUserSockets();
      if (roomDetails && roomDetails.members && roomDetails.members.length) {
        roomDetails.members.forEach(function (member: any) {
          const socketIds = array[member];
          if (socketIds != undefined) {
            const room = io.sockets.adapter.rooms.get(group_id) || new Set(); // get the room object or create a new one
            socketIds.forEach((socketId) => {
              room.add(socketId); // add each socket id to the room
            });
            io.sockets.adapter.rooms.set(group_id, room);
          }
        });
        socket.join(group_id);
      }

      //Emitting New Username to Clients
      io.to(data.roomname).emit("joined-user", { username: data.username });

      // FIRST MESSAGE SEND WHEN GROUP CHAT INITIALIZE
      let chatDetails: any = "";
      let message: any = "";
      let file: any = false;

      let messageData = {
        from: data.username,
        message: data.message,
        roomName: data.roomname,
        parent_msg_id: data.parent_msg_id ? data.parent_msg_id : 0,
        isEdit: data.isEdit ? data.isEdit : 0,
        practice: data.practice || null,
        upload_file_id: data.upload_file_id,
      };

      chatDetails = await messageService.createChat(messageData, null);
      message = data.message;

      let room_id = chatDetails.room_id ? chatDetails.room_id : 0;
      const resultSend = {
        _id: chatDetails.id,
        id: chatDetails.id,
        text: message,
        createdAt: chatDetails.created_at,
        user: { _id: Number(data.username) },
        username: data.username,
        senderID: chatDetails.sender.id,
        senderProfile:
          chatDetails.sender &&
          chatDetails.sender.UploadProfile &&
          chatDetails.sender.UploadProfile.UploadFile
            ? chatDetails.sender.UploadProfile.UploadFile
            : "",
        message: message,
        room_id: room_id,
        upload_file_id: chatDetails.upload_file_id,
        type: data.type ? data.type : "text",
        url: data.fileUrl ? data.fileUrl : null,
        fileType: data.fileType ? data.fileType : null,
        name: data.name ? data.fileName : "",
        file: file,
        is_edit: data.isEdit ? data.isEdit : 0,
        is_reply: data.parent_msg_id ? data.parent_msg_id : 0,
        message_deleted: chatDetails.message_deleted,
        Reply: chatDetails && chatDetails.Reply ? chatDetails.Reply : null,
        orignalMsg: chatDetails.message,
        is_edited: chatDetails.is_edited ? chatDetails.is_edited : 0,
        sender: {
          id: chatDetails.from,
          first_name:
            (chatDetails &&
              chatDetails.sender &&
              chatDetails.sender.first_name) ||
            "",
          last_name:
            (chatDetails &&
              chatDetails.sender &&
              chatDetails.sender.last_name) ||
            "",
        },
        Originator: null,
        image:
          data && data.fileUrl && data.message == "image" ? data.fileUrl : null,
      };
      io.to(chatDetails.group_id).emit("chat", resultSend);
      const groupMembers: any = await messageService.groupMembers(room_id);
      await Promise.all(
        groupMembers.map(async (i: any) => {
          if (
            !i.is_deleted &&
            i.User &&
            i.User.dataValues.timeZone &&
            i.User.dataValues.id
          ) {
            await refreshChat({
              loggedUserId: i.User.id,
              timeZone: i.User.dataValues.timeZone,
            });

            if (i && i.users_id && i.users_id != message.from) {
              const first_name =
                (chatDetails &&
                  chatDetails.sender &&
                  chatDetails.sender.first_name) ||
                "";
              const last_name =
                (chatDetails &&
                  chatDetails.sender &&
                  chatDetails.sender.last_name) ||
                "";
              const senderName = `${first_name} ${last_name}`;
              const notificationData = {
                title: `New Message from ${senderName}`,
                body: chatDetails.message || "",
                userIds: [i.users_id],
                payload: {
                  room_id: (data && data.roomname) || "",
                  practice:
                    i && i.Room && i.Room.practice_id
                      ? i.Room.practice_id
                      : null,
                  senderName,
                  loggedInUserId: i.users_id,
                },
              };
              //await notification.sendChatNotifications(notificationData, "group-message");
            }
          }
        })
      );
    });

    //Emitting messages to Clients
    socket.on("chat", async (data: any) => {
      let file = false;
      let chatDetails: any = {};
      const conversationExist = await ConversationModel.findOne({
        type: "group",
        "participants.user_id": { $all: [Number(data.username)] },
        group_id: data.roomname,
      });
      const conversationId = conversationExist ? conversationExist.id : null;
      if (data.sendFiletoRoom) {
        file = true;
      }
      let messageData = {
        from: data.username,
        message: data.message,
        is_system_msg: 0,
      };
      if (data.isEdit && Number(data.isEdit) != 0) {
        chatDetails = await messageService.editMessage(data, conversationId);
      } else {
        if (data.parent_msg_id && Number(data.parent_msg_id) != 0) {
          chatDetails = await messageService.replyMessage(
            messageData,
            data.parent_msg_id,
            conversationId
          );
        } else {
          chatDetails = await messageService.createMongoChat(
            messageData,
            conversationId
          );
        }
      }
      if (chatDetails) {
        const sender = chatDetails.participants.filter(
          (participant: any) => participant.user_id == data.username
        )[0];
        const  is_left = chatDetails.group_id && chatDetails.participants
                ? chatDetails.participants.find(
                    (user:any) => user.user_id == data.username
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
          username: data.username,
          senderID: messageObj.user_id,
          senderProfile: sender && sender.profile ? sender.profile : "",
          message: messageObj.message,
          room_id: chatDetails.group_id,
          type: data.type ? data.type : "text",
          url: data.fileUrl ? data.fileUrl : null,
          fileType: data.fileType ? data.fileType : null,
          name: data.name ? data.fileName : "",
          file: file,
          is_edit: data.isEdit ? data.isEdit : 0,
          is_reply: data.parent_msg_id ? data.parent_msg_id : 0,
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
          image: data && data.fileUrl ? data.fileUrl : null,
        };
        io.to(data.roomname).emit("chat", resultSend);
        await Promise.all(
          chatDetails.participants.map(async (i: any) => {
            const timeZone: any = await messageService.getUserTimeZone(
              i.user_id
            );
            await refreshChat({
              loggedUserId: i.user_id,
              timeZone: timeZone.dataValues.timeZone,
            });

            if (i && i.user_id && i.user_id != data.username) {
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
                body: data.message || "",
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
    });

    // GET ACTIVE CHAT LISTING
    socket.on("req-active-chats", async (data: any) => {
      const array = activeUserHolder.getAllUserSockets();
      const { loggedInUserId, timeZone } = data;
      const result = await messageService.getContactData(
        loggedInUserId,
        timeZone
      );
      io.to(array[data.loggedInUserId]).emit("req-active-chats", {
        result: result.newContactWithGroups,
        isArchived: result.isArchived,
      });
    });

    //refresh chats and conatcts needs parameters : { loggedUserId : loggedInUserId, timeZone:timeZone }
    socket.on("refresh-chat", async (data: any) => {
      await refreshChat(data);
    });

    // GET CHAT HISTORY
    socket.on("req-chats", async (data: any) => {
      const array = activeUserHolder.getAllUserSockets();
      const { loggedInUserId, contact, limit, offset, lastMessageId, room_id } =
        data;
      const result = await messageService.getChatData(
        loggedInUserId,
        contact,
        limit,
        offset
      );
      io.to(array[data.loggedInUserId]).emit("req-chats", { result });
    });

    socket.on("disconnecting", () => {
      var rooms = [...socket.rooms];
      var socketId = rooms[0];
      var roomname = rooms[1];
      if (roomname && socketId && users && users[roomname]) {
        users[roomname].forEach((user: any, index: any) => {
          if (user[socketId]) {
            users[roomname].splice(index, 1);
          }
        });
      }
    });
  });

  // COMMON FUNCTION TO REFREASH CHATS
  async function refreshChat(data: any) {
    const array = activeUserHolder.getAllUserSockets();
    const { loggedUserId, timeZone } = data;
    if (loggedUserId && timeZone) {
      const loggedInUserId = Number(loggedUserId);
      const result = await messageService.getMongodbChatData(
        loggedInUserId,
        timeZone
      );
      io.to(array[data.loggedUserId]).emit("refresh-chat", {
        contacts: result,
      });
    }
  }

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
