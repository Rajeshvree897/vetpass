import Message from "../db/models/message";
import ArchivedContacts from "../db/models/archived_contacts";
import { Sequelize, Op } from "sequelize";
import Rooms from "../db/models/rooms";
import moment from "moment";
import { sequelize } from "../db";
import User from "../db/models/user";
import vetProfile from "../db/models/vet-profile";
import UploadFile from "../db/models/upload-file";
import UploadFileMorph from "../db/models/upload-file-morph";
import UsersPermissionsRole from "../db/models/users-permissions-role";
import RoomMembers from "../db/models/room-members";
import VetPractices from "../db/models/vet-practices";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import * as path from "path";
import { awsS3 } from "../helpers/aws-s3";
import messages from "../http/routes/messages";
import { includes } from "lodash";
import ConversationModel from "../db/mongoose-models/conversations";
import { Types } from "mongoose";
import Remainder from "../db/models/remainders";
import FavoritePractices from "../db/models/favorite-practices";
import FavoritePracticeVetPractices from "../db/models/favorite-practice-vet-practices";
const NODE_ENV = process.env.NODE_ENV;
const uploadPath =
  NODE_ENV == "production" ? "uploads" : "uploads_staging/uploads";
const baseUrl =
  NODE_ENV == "production"
    ? "https://admin.vetpass.com/"
    : "https://staging-admin.vetpass.com/";

export default class MessageService {
  constructor() {}

  async getUserDetails(ids: any) {
    let users: any = await User.findAll({
      attributes: ["id", "first_name", "last_name"],
      include: [
        {
          model: UploadFileMorph,
          as: "UploadProfile",
          required: false,
          where: { related_type: "users-permissions_user" },
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id", "name"],
            },
          ],
        },
      ],
      where: {
        id: { [Op.in]: ids },
      },
      raw: true,
    });
    users = users.map((i: any) => ({
      user_id: i.id,
      first_name: i.first_name,
      last_name: i.last_name,
      profile: i["UploadProfile.UploadFile.url"],
    }));
    return users;
  }

  //create new conversation and update by conversation id
  async createMongoChat(data: any, conversationId: any) {
    try {
      // if conversation is exist add message in conversation else create new conversation
      if (data && conversationId) {
        const conversation = await ConversationModel.findOneAndUpdate(
          { _id: conversationId },
          {
            $push: {
              messages: {
                _id: new Types.ObjectId(),
                user_id: data.from,
                message: data.message,
                created_at: new Date(),
                updated_at: new Date(),
                is_system_message: data.is_system_msg
                  ? data.is_system_msg
                  : false,
                is_edited: false,
                is_deleted: false,
                parent_message: data.parentMessage ? data.parentMessage : null,
                forwarded_from: data.forwarded_from
                  ? data.forwarded_from
                  : null,
                read_by: [data.from],
                deleted_for: [],
              },
            },
          },
          { new: true }
        );
        return conversation;
      } else {
        let ids;
        if (data.type == "private") {
          ids = [data.from, data.to];
        } else {
          ids = data.members;
        }
        let practice;
        if (data.practiceId) {
          practice = await VetPractices.findOne({
            where: {
              id: Number(data.practiceId),
            },
            include: ["id", "name", "logo"],
          });
        }
        const participants = await this.getUserDetails(ids);
        const conversation = await ConversationModel.create({
          type: data.type,
          is_created_by_owner: false,
          participants,
          messages: [
            {
              _id: new Types.ObjectId(),
              user_id: data.from,
              message: data.message,
              created_at: new Date(),
              updated_at: new Date(),
              is_system_message: false,
              is_edited: false,
              is_deleted: false,
              parent_message: null,
              forwarded_from: data.forwarded_from ? data.forwarded_from : null,
              read_by: [data.from],
              deleted_for: [],
            },
          ],
          group_name: data.groupName ? data.groupName : null,
          group_id: data.type == "group" ? uuidv4 : null,
          practice: practice ? practice : null,
          icon: data.iconUrl ? data.iconUrl : null,
        });
        return conversation;
      }
    } catch (e) {
      console.log("Error Info :", e);
    }
  }

  //Update message
  async editMessage(data: any, conversationId: any) {
    const updatedMessage = await ConversationModel.findOneAndUpdate(
      {
        _id: conversationId,
        "messages._id": data.isEdit,
      },
      {
        $set: {
          "messages.$.message": data.message,
          "messages.$.is_edited": true,
        },
      },
      {
        new: true,
        "messages.$": 1,
      }
    );

    return updatedMessage;
  }

  //Reply message By message ID
  async replyMessage(data: any, parent_msg_id: any, conversationId: any) {
    const messageObj = await ConversationModel.findOne(
      { _id: conversationId, "messages._id": parent_msg_id },
      { "messages.$": 1 }
    );
    if (messageObj) {
      const { _id, user_id, message, created_at, updated_at } =
        messageObj.messages[0];
      const parentMessage = {
        id: _id,
        user_id: user_id,
        message: message,
        created_at: created_at,
        updated_at: updated_at,
      };
      data.parentMessage = parentMessage;
      return await this.createMongoChat(data, conversationId);
    }
  }

  async listRemainders() {
    return Remainder.findAll({
      where: { status: null, sent_datetime: { [Op.lte]: new Date() } },
      raw: true,
    });
  }

  async updateRemainderStatus(id: number) {
    return Remainder.update({ status: 1 }, { where: { id } });
  }
  async vetUsers(
    vetPractice: any,
    option: any,
    loggedInUserId: any,
    offset:any,
    limit:any
  ): Promise<User> {
    let role = [];
    const pagination: any = {};
    if (limit) {
      pagination.offset = offset * limit;
      pagination.limit = limit;
    }
    if (option == "practice") {
      role = [3, 4, 6];
    } else {
      role = [13, 4];
    }
    let Users = await User.findAll({
      include: [
        {
          model: vetProfile,
          as: "VetProfileUser",
          where: { practice: vetPractice },
        },
        {
          model: UploadFileMorph,
          as: "UploadProfile",
          required: false,
          where: { related_type: "users-permissions_user" },
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id", "name"],
            },
          ],
        },
      ],
      attributes: ["id", "first_name", "last_name", "role"],
      where: {
        role: { [Op.in]: role },
        is_deleted: null,
        id: { [Op.ne]: loggedInUserId },
      },
      order: [["id", "ASC"]],
      ...pagination,
      });
    Users = Users.map((i: any) => i.toJSON());
    let VetUsers: any = [];

    await Promise.all(
      Users.map(async (user: any) => {
        VetUsers.push({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          profileImgPath:
            user &&
            user.UploadProfile &&
            user.UploadProfile.UploadFile &&
            user.UploadProfile.UploadFile.url
              ? user.UploadProfile.UploadFile.url
              : "",
        });
      })
    );
    return VetUsers;
  } 
  
//sequelize 
  async findRoomIdByName(name: string) {
    return Rooms.findOne({
      where: { name },
      raw: true,
    });
  }
  //sequelize
  async createChat(data: any, timeZone: any) {
    data.timestamp = Date.now();
    let room_id: any;
    if (
      data.from &&
      data.practice &&
      data.roomName &&
      `${data.from}_${data.practice}` == data.roomName
    ) {
      room_id = await Rooms.findOne({
        where: { name: data.roomName },
      });
      data.room_id = room_id ? room_id.id : null;
      data.read_by = data.from;
      delete data.roomName;
    } else {
      if (data.roomName && data.roomName != 0) {
        room_id = await Rooms.findOne({
          where: { group_id: data.roomName },
        });
        data.room_id = room_id ? room_id.id : null;
        data.read_by = data.from;
        delete data.roomName;
      }
    }
    if (
      data.isEdit != undefined &&
      data.isEdit != null &&
      Number(data.isEdit)
    ) {
      return Message.update(
        { message: data.message, is_edited: 1 },
        { where: { id: data.isEdit } }
      ).then(async (res) => {
        let messageDetails: any = await Message.findOne({
          where: { id: data.isEdit },
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "first_name", "last_name", "role"],
              include: [
                {
                  model: UploadFileMorph,
                  as: "UploadProfile",
                  required: false,
                  where: { related_type: "users-permissions_user" },
                  include: [
                    {
                      model: UploadFile,
                      as: "UploadFile",
                      attributes: ["url", "id", "name"],
                    },
                  ],
                },
              ],
            },
            {
              model: Message,
              as: "Reply",
              required: false,
              include: [
                {
                  model: UploadFile,
                  as: "UploadFiles",
                  attributes: ["url", "id", "mime", "name"],
                },
              ],
            },
          ],
        });
        messageDetails.group_id =
          room_id && room_id.group_id ? room_id.group_id : null;
        return messageDetails;
      });
    } else {
      return await Message.create(data).then(async (res) => {
        let messageDetails: any = await Message.findOne({
          where: { id: res.id },
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "first_name", "last_name", "role"],
            },
            {
              model: Message,
              as: "Reply",
              required: false,
              include: [
                {
                  model: UploadFile,
                  as: "UploadFiles",
                  attributes: ["url", "id", "mime", "name"],
                },
                {
                  model: User,
                  as: "sender",
                  attributes: ["id", "first_name", "last_name"],
                  include: [
                    {
                      model: UploadFileMorph,
                      as: "UploadProfile",
                      required: false,
                      where: { related_type: "users-permissions_user" },
                      include: [
                        {
                          model: UploadFile,
                          as: "UploadFile",
                          attributes: ["url", "id", "name"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });
        messageDetails.group_id =
          room_id && room_id.group_id ? room_id.group_id : null;
        return messageDetails;
      });
    }
  }
  // Exist logged in user in groups 
  async exitOnMongoRoom(loggedInUserId: any) {
    loggedInUserId = Number(loggedInUserId);
    let result = await ConversationModel.aggregate([
      {
        $match: {
          "participants.user_id": loggedInUserId,
          group_id: { $ne: null },
        },
      },
      {
        $project: {
          _id: 1,
          group_id: 1,
          group_name: 1,
          participants : 1,
          practice:1,
          icon: 1,
        },
      },
    ]);
    return Promise.all(
      result.map(async (conversation: any) => {
          if(conversation.group_name && conversation.group_name.includes("_")){
              let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
              if (isAppUser) {
                  let practiceId = conversation.practice &&  conversation.practice.id ?  conversation.practice.id : null;
                  let vetpractice = practiceId && (await this.getVetPractice(practiceId));
                      conversation.group_name = vetpractice && vetpractice.practice_name? vetpractice.practice_name: "Default group",
                      conversation.icon =vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
              } else {
                  const participants = conversation.participants.map((user:any)=> user.user_id)
                  const getAppUser:any = await this.getAppUserByIds(participants);
                    conversation.group_name =  getAppUser && getAppUser.first_name && getAppUser.last_name ? `${getAppUser.first_name} ${getAppUser.last_name}`: "Default group";
                    conversation.icon = getAppUser && getAppUser.UploadProfile && getAppUser.UploadProfile.UploadFile && getAppUser.UploadProfile.UploadFile.url ? getAppUser.UploadProfile.UploadFile.url: null
              }
          }
        return conversation;
      })
    );
    //return result;
  }
  //sequelize
  async existOnRoom(loggedInUserId: any) {
    let roomNames: any = [];
    let rooms: any = await RoomMembers.findAll({
      where: { users_id: loggedInUserId, is_deleted: null },
      include: [
        {
          model: Rooms,
          as: "Room",
        },
      ],
    });
    for (let room of rooms) {
      let RoomName = room && room.Room && room.Room.name;
      if (
        room &&
        room.Room &&
        RoomName.includes("_") &&
        room.Room.is_created_by_user
      ) {
        let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
        if (isAppUser) {
          let practiceId = room.practice_id;
          let vetpractice =
            practiceId && (await this.getVetPractice(practiceId));
          room.Room.name =
            vetpractice && vetpractice.practice_name
              ? vetpractice.practice_name
              : "Default group";
          room.Room.profileImgPath =
            vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
        } else {
          let appuserName: any = await this.getAppUser(room.Room.id);
          room.Room.name =
            appuserName && appuserName.User && appuserName.User.first_name
              ? appuserName.User.first_name
              : "Default group";
          room.Room.profileImgPath =
            appuserName &&
            appuserName.User &&
            appuserName.User.UploadProfile &&
            appuserName.User.UploadProfile.UploadFile &&
            appuserName.User.UploadProfile.UploadFile.url
              ? appuserName.User.UploadProfile.UploadFile.url
              : null;
        }
      } else {
        room.Room.profileImgPath = await this.getGroupIcon(room.Room.icon);
      }
    }
    return rooms;
  }
  //sequelize
  async roomMembers(group_id: any) {
    let members: any = [];
    let rooms: any = await RoomMembers.findAll({
      include: [
        {
          model: Rooms,
          as: "Room",
          where: { group_id: group_id },
          attributes: ["group_id"],
        },
      ],
    });
    rooms = rooms.map((i: any) => i.toJSON());
    rooms.map(async (room: any) => {
      members.push(room.users_id);
    });
    return members;
  }
 //sequelize
  async vetProfileUsers(
    vetPractice: any,
    option: any,
    loggedInUserId: any
  ): Promise<User> {
    let role = [];
    if (option == "practice") {
      role = [3, 4, 6];
    } else {
      role = [13, 4];
    }
    let Users = await User.findAll({
      include: [
        {
          model: vetProfile,
          as: "VetProfileUser",
          where: { practice: vetPractice },
        },
        {
          model: UploadFileMorph,
          as: "UploadProfile",
          required: false,
          where: { related_type: "users-permissions_user" },
          include: [
            {
              model: UploadFile,
              as: "UploadFile",
              attributes: ["url", "id", "name"],
            },
          ],
        },
      ],
      attributes: ["id", "first_name", "last_name", "role"],
      where: {
        role: { [Op.in]: role },
        is_deleted: null,
        id: { [Op.ne]: loggedInUserId },
      },
      order: [["id", "ASC"]],
    });
    Users = Users.map((i: any) => i.toJSON());
    let VetUsers: any = [];

    await Promise.all(
      Users.map(async (user: any) => {
        VetUsers.push({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          profileImgPath:
            user &&
            user.UploadProfile &&
            user.UploadProfile.UploadFile &&
            user.UploadProfile.UploadFile.url
              ? user.UploadProfile.UploadFile.url
              : "",
        });
      })
    );
    return VetUsers;
  }
  //archive contacts
  async getArchivedContacts(id: any) {
    return ArchivedContacts.findAll({ where: { user_id: id }, raw: true });
  }
  //sequelize
  async getContactData(loggedInUserId: Message, timeZone: any) {
    let where: any = {};
    let isArchived: boolean = false;
    where = { [Op.or]: [{ from: loggedInUserId }, { to: loggedInUserId }] };
    let Userwhere: any = { id: { [Op.ne]: loggedInUserId } };
    const archivedData = await this.getArchivedContacts(loggedInUserId);
    let archivedContact: any = archivedData.map((i: any) => {
      if (i && i.contact_id) {
        return { contact_id: i.contact_id, id: i.id };
      }
    });
    archivedContact = archivedContact.filter((e: any) => e != undefined);
    let archivedRooms: any = archivedData.map((i: any) => {
      if (i && i.room_id) {
        return { room_id: i.room_id, id: i.id };
      }
    });
    archivedRooms = archivedRooms.filter((e: any) => e != undefined);

    const newContactWithGroups: any[] = await sequelize.query(
      "SELECT * FROM (SELECT `Messages`.*, `sender`.`first_name` AS `sender.first_name`, `sender`.`role` AS `sender.role`, `sender`.`last_name` AS `sender.last_name`,`recipient`.`role` AS `recipient.role`, `recipient`.`first_name` AS `recipient.first_name`, `recipient`.`last_name` AS `recipient.last_name` ,`room`.`group_id` AS `roomName`,`room`.`icon` AS `groupIcon`,`room`.`is_created_by_user` AS `isCreatedByUser`, `room`.`name` AS `GroupName`, `room`.`practice_id` AS `practiceId` FROM (SELECT IF(`from` = '" +
        loggedInUserId +
        "', `to`, `from`) AS pair, MAX(`timestamp`) AS latest_timestamp FROM `messages`WHERE (`from` = '" +
        loggedInUserId +
        "' OR `to` = '" +
        loggedInUserId +
        "') GROUP BY pair) AS `latest_messages` INNER JOIN `messages` AS `Messages` ON `latest_messages`.`latest_timestamp` = `Messages`.`timestamp` AND `latest_messages`.`pair` = IF(`Messages`.`from` = '" +
        loggedInUserId +
        "', `Messages`.`to`, `Messages`.`from`) LEFT OUTER JOIN `users-permissions_user` AS `sender` ON `Messages`.`from` = `sender`.`id` LEFT OUTER JOIN `users-permissions_user` AS `recipient` ON `Messages`.`to` = `recipient`.`id`  LEFT OUTER JOIN `rooms` AS `room` ON `Messages`.`room_id` = `room`.`id` UNION SELECT `Messages`.*, `sender`.`first_name` AS `sender.first_name`,`sender`.`role` AS `sender.role`, `sender`.`last_name` AS `sender.last_name`,`recipient`.`role` AS `recipient.role`, `recipient`.`first_name` AS `recipient.first_name`, `recipient`.`last_name` AS `recipient.last_name`,`room`.`group_id` AS `roomName`,`room`.`icon` AS `groupIcon`, `room`.`is_created_by_user` AS `isCreatedByUser`, `room`.`name` AS `GroupName`, `room`.`practice_id` AS `practiceId` FROM ( SELECT `Messages`.`room_id`, MAX(`Messages`.`timestamp`) AS `latest_timestamp` FROM `messages` AS `Messages` INNER JOIN `room_members` ON `room_members`.`room_id` = `Messages`.`room_id` WHERE `room_members`.`users_id` = '" +
        loggedInUserId +
        "' AND `room_members`.`is_chat_deleted` IS NULL GROUP BY `Messages`.`room_id`) AS `latest_room_messages` INNER JOIN `messages` AS `Messages` ON `latest_room_messages`.`latest_timestamp` = `Messages`.`timestamp` AND `latest_room_messages`.`room_id` = `Messages`.`room_id` LEFT OUTER JOIN `users-permissions_user` AS `sender` ON `Messages`.`from` = `sender`.`id` LEFT OUTER JOIN `users-permissions_user` AS `recipient` ON `Messages`.`to` = `recipient`.`id`  LEFT OUTER JOIN `rooms` AS `room` ON `Messages`.`room_id` = `room`.`id` WHERE (`Messages`.`from` = '" +
        loggedInUserId +
        "' OR `Messages`.`to` = '" +
        loggedInUserId +
        "') OR `Messages`.`room_id` IN ( SELECT `room_id` FROM `room_members` WHERE `users_id` = '" +
        loggedInUserId +
        "')) AS `all_messages` ORDER BY `all_messages`.`timestamp` DESC;",
      { nest: true }
    );
    for (let i of newContactWithGroups) {
      if (i && i.room_id == null && archivedContact && archivedContact.length) {
        const archived = archivedContact.find(
          (a: any) => a.contact_id == i.from || a.contact_id == i.to
        );
        if (archived) {
          i.archived_id = archived && archived.id;
          isArchived = true;
        } else {
          i.archived_id = null;
        }
      }
      if (i && i.room_id && archivedRooms && archivedRooms.length) {
        const archived = archivedRooms.find((a: any) => a.room_id == i.room_id);
        if (archived) {
          i.archived_id = archived && archived.id;
          isArchived = true;
        } else {
          i.archived_id = null;
        }
      }
      if (
        moment(i.created_at).utc().tz(timeZone).format("Y/M/D") ==
        moment().utc().tz(timeZone).format("Y/M/D")
      ) {
        if (i.room_id != null) {
          i.leftUser = await this.getLeftUser(i.room_id, loggedInUserId);
          if (i.leftUser) {
            let where: any = {
              room_id: i.room_id,
              left_user: loggedInUserId,
              //[Op.or]: [  { 'message' : { [Op.like]: `%left%` }}, { 'message' : { [Op.like]: `%remove%` }}],
            };
            let leftMessage: any = await Message.findOne({ where: where });
            if (leftMessage) {
              i.id = leftMessage.id;
              i.message = leftMessage.message;
              i.timestamp = leftMessage.timestamp;
              i.from = leftMessage.from;
              (i.is_system_msg = leftMessage.is_system_msg),
                (i.created_at = leftMessage.created_at);
            }
          }
        }
        i.new_created_at = moment
          .utc(i.created_at)
          .tz(timeZone)
          .format("hh:mm");
      } else {
        i.new_created_at = moment
          .utc(i.created_at)
          .tz(timeZone)
          .format("Y/M/D");
      }
      i.room_id = i.room_id ? i.room_id : null;
      if (i.room_id != null && i.roomName != null) {
        if (i.isCreatedByUser) {
          let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
          if (isAppUser) {
            let practiceId = i.practiceId;
            let vetpractice =
              practiceId && (await this.getVetPractice(practiceId));
            i.contactId = i.room_id;
            i.contactName =
              vetpractice && vetpractice.practice_name
                ? vetpractice.practice_name
                : "Default group";
            i.profilePic =
              vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
            i.role = null;
            i.contact = {
              user_id: practiceId,
              first_name: i.contactName,
              last_name: null,
              role: null,
              profilePicture: i.profilePic,
              roleName: "Practice",
              practiceId: practiceId,
            };
          } else {
            let appuserName: any = await this.getAppUser(i.room_id);
            i.contactName =
              appuserName &&
              appuserName.User &&
              appuserName.User.first_name &&
              appuserName.User.last_name
                ? appuserName.User.first_name + " " + appuserName.User.last_name
                : "Default group";
            i.contactId = i.room_id;
            i.profilePic =
              appuserName &&
              appuserName.User &&
              appuserName.User.UploadProfile &&
              appuserName.User.UploadProfile.UploadFile &&
              appuserName.User.UploadProfile.UploadFile.url
                ? appuserName.User.UploadProfile.UploadFile.url
                : null;
            i.role =
              appuserName && appuserName.User && appuserName.User.role
                ? appuserName.User.role
                : null;
            i.contact = {
              user_id: null,
              first_name:
                appuserName && appuserName.User && appuserName.User.first_name
                  ? appuserName.User.first_name
                  : null,
              last_name:
                appuserName && appuserName.User && appuserName.User.last_name
                  ? appuserName.User.last_name
                  : null,
              role: i.role,
              profilePicture: i.profilePic,
              roleName: "App User",
            };
          }
        } else {
          let vetpractice =
            i.practiceId && (await this.getVetPractice(i.practiceId));
          i.option =
            vetpractice && vetpractice.option ? vetpractice.option : "";
          i.contactName = i.GroupName ? i.GroupName : "Default Group"; //appuserName && appuserName?.User && appuserName?.User.first_name  ? appuserName?.User.first_name: "Default group";
          i.contactId = i.room_id;
          i.profilePic = await this.getGroupIcon(i.groupIcon);
          i.role = null;
          i.contact = {
            user_id: i.practiceId,
            first_name: i.contactName,
            last_name: null,
            role: i.role,
            profilePicture:
              i.profilePic || `${baseUrl}images/group-default.png`,
            roleName: i.option
              ? i.option.charAt(0).toUpperCase() + i.option.slice(1)
              : "",
          };
        }
      } else {
        if (i.from == loggedInUserId) {
          i.contactId = i.to;
          i.contactName = `${i.recipient.first_name} ${i.recipient.last_name}`;
          i.role = i.recipient.role;
          i.contact = {
            user_id: i.to,
            first_name: i.recipient.first_name,
            last_name: i.recipient.last_name,
            role: i.recipient.role,
            profilePicture: await this.getUserProfile(i.to),
            roleName: await this.getRole(i.role),
          };
        } else {
          i.contactId = i.from;
          i.contactName = `${i.sender.first_name}  ${i.sender.last_name}`;
          i.role = i.sender.role;
          i.contact = {
            user_id: i.from,
            first_name: i.sender.first_name,
            last_name: i.sender.last_name,
            role: i.sender.role,
            profilePicture: await this.getUserProfile(i.from),
            roleName: await this.getRole(i.role),
          };
        }
        i.profilePic = await this.getUserProfile(i.contactId);
      }
      i.rolename = await this.getRole(i.role);

      let fromId = 0;
      if (i.room_id) {
        if (i.read_by != null) {
          let readBy = await i.read_by.split(",");
          i.is_read = readBy.includes(`${loggedInUserId}`) ? 1 : 0;
        } else {
          i.is_read = 0;
        }
        i.unread = await this.getUnreadMessageCount(
          loggedInUserId,
          fromId,
          i.id,
          i.room_id
        );
      } else {
        if (i.from == loggedInUserId) {
          i.is_read = 1;
          fromId = i.to;
        } else {
          i.is_read = i.is_read ? 1 : 0;
          fromId = i.from;
        }
        i.unread = await this.getUnreadMessageCount(
          loggedInUserId,
          fromId,
          i.id,
          null
        );
      }
    }
    let newContact = await newContactWithGroups.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : -1
    );
    return { newContactWithGroups, isArchived };
  }
  //sequelize
  async getGroupIcon(uploadId: any) {
    const groupIcon: any = await UploadFile.findOne({
      where: { id: uploadId },
      attributes: ["id", "url"],
    });
    return groupIcon && groupIcon.url ? groupIcon.url : null;
  }
  //sequelize
  async getLeftUser(room: any, loggedInUserId: any) {
    const leftUser = (await RoomMembers.findOne({
      where: { room_id: room, users_id: loggedInUserId },
      attributes: ["is_deleted"],
    })) as { is_deleted: boolean } | null;
    return leftUser?.is_deleted;
  }
  //Get unreadMessages count
  async getUnreadMessageCountMongo(loggedInuser: any, _id: any) {
    const conversation = await ConversationModel.findOne({ _id: _id });
    let count = 0;
    if (conversation) {
      conversation.messages.forEach((message: any) => {
        const unreadMessage = message.read_by.includes(loggedInuser);
        if (!unreadMessage) {
          count += 1;
        }
      });
    }
    return count;
  }
  //sequelize
  async getUnreadMessageCount(
    loggedInuser: any,
    fromId: any,
    lastID: any,
    room: any
  ) {
    let where: any = {};
    if (room != null) {
      where = {
        room_id: room,
        id: { [Op.lte]: lastID },
        read_by: { [Op.notLike]: `%${loggedInuser}%` },
      };
    } else {
      where = {
        from: fromId,
        to: loggedInuser,
        is_read: { [Op.is]: null },
      };
    }
    return await Message.count({ where: where });
  }
  //Get practice by ID
  async getVetPractice(id: any) {
    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: id, related_type: "vet_practices" },
      include: [
        {
          model: UploadFile,
          as: "UploadFile",
          attributes: ["url", "id", "name"],
        },
      ],
    });
    return VetPractices.findOne({
      where: { id: id },
      attributes: ["practice_name", "option"],
    }).then(async (vetPractice: any) => {
      if (vetPractice) {
        if (uploadFileMorphData) {
          vetPractice.img_path = uploadFileMorphData.UploadFile.url;
        }
      }
      return vetPractice;
    });
  }
  //Get Role by ID
  async getRole(roleId: any) {
    return await UsersPermissionsRole.findOne({
      attributes: ["id", "name"],
      where: { id: roleId },
      raw: true,
    }).then(async (res) => {
      return res ? res.name : null;
    });
  }
  //Get user details by ID
  async getUserProfile(userId: any) {
    const uploadFileMorphData: any = await UploadFileMorph.findOne({
      where: { related_id: userId, related_type: "users-permissions_user" },
      include: [
        { model: UploadFile, as: "UploadFile", attributes: ["url", "id"] },
      ],
    });

    if (uploadFileMorphData && uploadFileMorphData.UploadFile) {
      return uploadFileMorphData.UploadFile.url;
    } else {
      return null;
    }
  }
  //Get loggedIn  user role
  async getLoggedInUserRole(userID: any) {
    return await User.findOne({ where: { id: userID, role: [1, 3, 6, 13] } });
  }
  //sequelize
  async getAppUser(room_id: any) {
    return await RoomMembers.findOne({
      where: { room_id: room_id },
      include: [
        {
          model: User,
          as: "User",
          where: { role: [1, 3, 6, 13] },
          attributes: ["first_name", "last_name", "role"],
          include: [
            {
              model: UploadFileMorph,
              as: "UploadProfile",
              required: false,
              where: { related_type: "users-permissions_user" },
              include: [
                {
                  model: UploadFile,
                  as: "UploadFile",
                  attributes: ["url", "id"],
                },
              ],
            },
          ],
        },
      ],
    });
  }
  //sequelize
  async getGroupID(room_id: any) {
    let where: any = {};
    if (!Number(room_id) && room_id != 0 && room_id.includes("_")) {
      where = { name: room_id };
    } else {
      where = { id: room_id };
    }
    return Rooms.findOne({ where: where });
  }
  //Get group_ids by conversation ids
  async getMongoGroupID(conversationIds: any) {
    let result = await ConversationModel.aggregate([
      {
        $match: {
          _id: { $in: conversationIds },
          group_id: { $ne: null },
        },
      },
      {
        $project: {
          group_id: 1,
        },
      },
    ]);
    const groupIdsAndIds = await result.map(
      (conversation) => conversation.group_id
    );
    return groupIdsAndIds ? groupIdsAndIds : [];
  }

  // GET CONTACT DATA FROM MONGODB
  async getMongodbChatData(loggedInUserId: any, timeZone: any) {
    let result: any = await ConversationModel.aggregate([
      {
        $match: {
          "participants.user_id": loggedInUserId,
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: {
          "messages.created_at": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          type: { $first: "$type" },
          group_name: { $first: "$group_name" },
          group_id: { $first: "$group_id" },
          is_created_by_owner: { $first: "$is_created_by_owner" },
          practice: { $first: "$practice" },
          icon: { $first: "$icon" },
          participants: { $first: "$participants" },
          archived_for: { $first: "$archived_for" },
          latestMessage: { $first: "$messages" }, // Retrieve only the latest message
        },
      },
      {
        $sort: {
          "latestMessage.created_at": -1,
        },
      },
    ]);
    async function convertDatetimeToTimezone(datetime: any, timezone: any) {
      return moment.utc(datetime).tz(timezone).format("HH:mm");
    }

    return Promise.all(
      result.map(async (conversation: any) => {
        // check conversation is archived for loggedIn user
        const is_archived = conversation.archived_for.includes(loggedInUserId);
        // check conversation type is group or private
        let contact: any;
        if (conversation.type == "private") {
          const recipient = conversation.participants.filter(
            (participant: any) => participant.user_id != loggedInUserId
          )[0];
          contact = {
            contactName: `${recipient.first_name} ${recipient.last_name}`,
            contactId: recipient.user_id,
            contactIcon: recipient.profile,
          };
        } else {
          if(conversation.group_name && conversation.group_name.includes("_")){
            let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
            if (isAppUser) {
                let practiceId = conversation.practice &&  conversation.practice.id ?  conversation.practice.id : null;
                let vetpractice =
                practiceId && (await this.getVetPractice(practiceId));
                contact = {
                    contactName: vetpractice && vetpractice.practice_name? vetpractice.practice_name: "Default group",
                    contactId: conversation.group_id,
                };
                conversation.icon =vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
            } else {
                const participants = conversation.participants.map((user:any)=> user.user_id)
                const getAppUser:any = await this.getAppUserByIds(participants);
                contact = {
                    contactName: getAppUser && getAppUser.first_name && getAppUser.last_name ? `${getAppUser.first_name} ${getAppUser.last_name}`: "Default group",
                    contactId: conversation.group_id,
                    contactIcon: getAppUser && getAppUser.UploadProfile && getAppUser.UploadProfile.UploadFile && getAppUser.UploadProfile.UploadFile.url ? getAppUser.UploadProfile.UploadFile.url: null
                };
                conversation.icon = getAppUser && getAppUser.UploadProfile && getAppUser.UploadProfile.UploadFile && getAppUser.UploadProfile.UploadFile.url ? getAppUser.UploadProfile.UploadFile.url: null
            }
        }else{
            contact = {
                contactName: conversation.group_name,
                contactId: conversation.group_id,
              };
        }
        }
        const  is_left = conversation.group_id && conversation.participants
                ? conversation.participants.find(
                    (user:any) => user.user_id == loggedInUserId
                  )?.is_deleted ?? 0 : 0;
        const unread = await this.getUnreadMessageCountMongo(
          loggedInUserId,
          conversation._id
        );
        const latestMessage = {
          ...conversation.latestMessage,
          created_at: await convertDatetimeToTimezone(
            conversation.latestMessage.created_at,
            timeZone
          ),
          updated_at: await convertDatetimeToTimezone(
            conversation.latestMessage.updated_at,
            timeZone
          ),
        };
        return {
          ...conversation,
          latestMessage,
          is_archived,
          ...contact,
          unread,
          is_left
        };
      })
    );
  }

  async getAppUserByIds(participants: any) {
    return await User.findOne({
        where: { role: [1], id : participants },
          include: [
            {
              model: UploadFileMorph,
              as: "UploadProfile",
              required: false,
              where: { related_type: "users-permissions_user" },
              include: [
                {
                  model: UploadFile,
                  as: "UploadFile",
                  attributes: ["url", "id"],
                },
              ],
            },
          ],
    });
  }

  //Get Messages by conversation ID
  async getChatData(
    loggedInUserId: number,
    conversationId: any = null,
    limit: number,
    offset: number
  ): Promise<Message[] | []> {
    limit = limit + 1;
    const conversation: any = await ConversationModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(conversationId),
        },
      },
      {
        $unwind: "$messages", // Unwind the messages array
      },
      {
        $match: {
          "messages.deleted_for": { $ne: loggedInUserId }, // Exclude messages deleted for the logged-in user
        },
      },
      {
        $sort: {
          "messages._id": -1, // Sort by message _id in descending order
        },
      },
      {
        $group: {
          _id: "$_id",
          icon: { $first: "$icon" },
          type: { $first: "$type" },
          practice : { $first: "$practice" },
          group_id : {$first: "$group_id"},
          group_name : {$first: "$group_name"},
          participants: { $first: "$participants" },
          messages: {
            $push: "$messages", // Group the sorted messages back into the messages array
          },
          totalMessages: {
            $sum: 1, // Count the total number of messages
          },
        },
      },
      {
        $project: {
          _id: 1,
          icon: 1,
          type: 1,
          practice:1,
          group_id:1,
          group_name:1,
          participants: 1,
          messages: {
            $slice: ["$messages", offset * limit, limit],
          },
          currentTotalMessages: {
            $sum: {
              $cond: [
                { $gte: [offset * limit, "$totalMessages"] },
                0,
                {
                  $cond: [
                    { $gte: [offset * limit + limit, "$totalMessages"] },
                    { $subtract: ["$totalMessages", offset * limit] },
                    limit,
                  ],
                },
              ],
            },
          },
        },
      },
    ]);
    if(conversation[0].group_name && conversation[0].group_name.includes("_")){
        let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
        if (isAppUser) {
            let practiceId = conversation[0].practice &&  conversation[0].practice.id ?  conversation[0].practice.id : null;
            let vetpractice =
            practiceId && (await this.getVetPractice(practiceId));
            conversation[0].group_name = vetpractice && vetpractice.practice_name? vetpractice.practice_name: "Default group";
            conversation[0].icon =vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
        } else {
            const participants = conversation[0].participants.map((user:any)=> user.user_id)
            const getAppUser:any = await this.getAppUserByIds(participants);
            conversation[0].group_name =  getAppUser && getAppUser.first_name && getAppUser.last_name ? `${getAppUser.first_name} ${getAppUser.last_name}`: "Default group";
            conversation[0].icon = getAppUser && getAppUser.UploadProfile && getAppUser.UploadProfile.UploadFile && getAppUser.UploadProfile.UploadFile.url ? getAppUser.UploadProfile.UploadFile.url: null;
            conversation[0].icon = getAppUser && getAppUser.UploadProfile && getAppUser.UploadProfile.UploadFile && getAppUser.UploadProfile.UploadFile.url ? getAppUser.UploadProfile.UploadFile.url: null;
        }
    }
    conversation[0].messages.reverse();
    if (conversation[0].messages) {
      await Promise.all(
        conversation[0].messages.map(async (i: any) => {
          if (i.forwarded_from) {
            const userDetails = await this.getUserDetails([i.forwarded_from]);
            i.Originator = {
              first_name:
                userDetails[0] && userDetails[0].first_name
                  ? userDetails[0].first_name
                  : "",
              last_name:
                userDetails[0] && userDetails[0].last_name
                  ? userDetails[0].last_name
                  : "",
            };
            return i;
          }
          if (conversation[0].participants) {
            const recipient = conversation[0].participants.filter(
              (participant: any) => participant.user_id == i.user_id
            )[0];
            i.sender = {
              first_name: `${recipient.first_name}`,
              last_name: `${recipient.last_name}`,
              user_id: recipient.user_id,
              profile: recipient.profile,
            };
          }
          return i;
        })
      );
    }
    return conversation;
  }

  /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */
  // async getChatData(
  //   loggedInUserId: number,
  //   contact: any= null,
  //   limit: number,
  //   offset: number,
  //   lastMessageId: number,
  //   room_id: any
  // ): Promise<Message[] | []> {
  //   let is_left: any = null;
  //   if (!Number(room_id) && room_id != 0 && room_id.includes("_")) {
  //   	const room = await this.getGroupID(room_id);
  //     if (room && room.id) {
  //       room_id = room.id;
  //     } else {
  //       return [];
  //     }
  //   }
  //   let where: any = {};
  //   //let room_id = null;
  //   if (lastMessageId != 0) {
  //     if (isNaN(room_id) || room_id == 0) {
  //       where = {
  //         id: { [Op.lte]: lastMessageId },
  //         [Op.or]: [
  //           { from: loggedInUserId, to: contact },
  //           { from: contact, to: loggedInUserId },
  //         ],
  //       };
  //     } else {
  //       where = {
  //         id: { [Op.lte]: lastMessageId },
  //         room_id: room_id,
  //       };
  //     }
  //   } else {
  //     if (isNaN(room_id) || room_id == 0) {
  //       where = {
  //         [Op.or]: [
  //           { from: loggedInUserId, to: contact },
  //           { from: contact, to: loggedInUserId },
  //         ],
  //       };
  //     } else {
  //       where = {
  //         room_id: room_id,
  //       };
  //     }
  //   }

  //   const pagination: any = {};
  //   if (limit) {
  //     pagination.offset = offset * limit;
  //     pagination.limit = limit;
  //   }
  //   if (room_id && room_id != 0) {
  //     is_left = await RoomMembers.findOne({
  //       where: { users_id: loggedInUserId, room_id: room_id },
  //       attributes: ["is_deleted"],
  //     });
  //   }
  //   // check contact or group is archive or not
  //   const archivedUser =  await ArchivedContacts.findOne({
  //     where:{
  //       [Op.and]:{
  //         user_id: loggedInUserId,
  //         [Op.or]:[
  //           {...((room_id&&room_id != 0) && {room_id :room_id} )},
  //           { ...((contact)&& {contact_id: contact})}
  //         ]
  //       }
  //     }
  //   })
  //   // where.is_deleted = {
  //   //   [Op.notILike]: '%727%'
  //   //   // [Op.notLike]: Sequelize.literal(`'%${loggedInUserId}%'`)
  //   // };
  //   return await Message.findAll({
  //     where: where,
  //     include: [
  //       {
  //         model: User,
  //         as: "sender",
  //         attributes: ["id","first_name"],
  //         include: [{
  //           model: UploadFileMorph,
  //           as: "UploadProfile",
  //           required: false,
  //           where: { related_type: "users-permissions_user" },
  //           include: [
  //             {
  //               model: UploadFile,
  //               as: "UploadFile",
  //               attributes: ["url", "id", "name"],
  //             },
  //           ],
  //         }],
  //       },
  //       {
  //         model: UploadFile,
  //         as: "UploadFiles",
  //         required: false
  //       },
  //       {
  //         model : User,
  //         as : "Originator",
  //         attributes : ["id", "first_name", "last_name"],
  //         required :false
  //       },
  //       {
  //         model: Message,
  //         as: "Reply",
  //         required: false,
  //         include : [
  //               {
  //                 model: UploadFile,
  //                 as: "UploadFiles",
  //                 attributes: ["url", "id", "mime", "name"],
  //               },
  //               {
  //                 model: User,
  //                 as: "sender",
  //                 attributes: ["id","first_name", "last_name"],
  //               },
  //         ]
  //       }
  //     ],
  //     order: [["timestamp", "DESC"]],
  //     ...pagination
  //     // limit: limit + 1,
  //     // offset: offset,
  //   }).then(async (res: any) => {
  //     // res.reverse();
  //     if (isNaN(room_id) || room_id == 0) {
  //       const uploadFileMorphData: any = await UploadFileMorph.findOne({
  //         where: {
  //           related_id: contact,
  //           related_type: "users-permissions_user",
  //         },
  //         include: [
  //           { model: UploadFile, as: "UploadFile", attributes: ["url", "id", "name"] },
  //         ],
  //       });

  //       if (uploadFileMorphData && uploadFileMorphData.UploadFile) {
  //         res.img_path = uploadFileMorphData.UploadFile.url;
  //       }
  //     } else {
  //       let isAppUser = await this.getLoggedInUserRole(loggedInUserId);
  //       if (isAppUser) {
  //         let roomName: any = await Rooms.findOne({
  //           where: { id: room_id },
  //           attributes: ["name", "practice_id"],
  //         });
  //         roomName =
  //           roomName &&
  //           roomName.name &&
  //           roomName.name.roomName &&
  //           roomName.name.roomName.name
  //             ? roomName.name.roomName.name
  //             : null;
  //         let practiceId = roomName && roomName.practiceId ? roomName.practiceId : null;
  //         let vetpractice = await this.getVetPractice(practiceId);
  //         res.img_path =
  //           vetpractice && vetpractice.img_path ? vetpractice.img_path : null;
  //       } else {
  //         let appuserName: any = await this.getAppUser(room_id);
  //         res.img_path =
  //           appuserName &&
  //           appuserName.User &&
  //           appuserName.User.UploadProfile &&
  //           appuserName.User.UploadProfile.UploadFile &&
  //           appuserName.User.UploadProfile.UploadFile.url
  //             ? appuserName.User.UploadProfile.UploadFile.url
  //             : null;
  //       }
  //       let roomDetails = await this.getGroupID(room_id);
  //       if(roomDetails && !roomDetails ?.is_created_by_user){
  //         res.img_path = await this.getGroupIcon(roomDetails.icon);
  //         res.iconId   = roomDetails.icon;
  //       }
  //     }
  //     let result = res.map((i: any) => i.toJSON());
  //     result.map((i: any) => {
  //       i._id = i.id;
  //       i.text = i.message;
  //       i.fileType = i && i.UploadFiles && i.UploadFiles.mime ? i.UploadFiles.mime: null;
  //       i.url = i && i.UploadFiles && i.UploadFiles.url ? i.UploadFiles.url: null;
  //       i.image = i && i.UploadFiles && i.UploadFiles.url && i.message == "image" ? i.UploadFiles.url: null;
  //       (i.createdAt = i.created_at),
  //         (i.user = {
  //           _id: i.from,
  //         });
  //     });
  //     result.img_path = res.img_path ? res.img_path : null;
  //     result.is_left = is_left;
  //     result.iconId = res.iconId ? res.iconId : 0;
  //     result.isArchived = archivedUser ? true :false
  //     return result;
  //   });
  // }

  async createRoom(data: Rooms): Promise<Rooms> {
    return Rooms.create(data).then((res) => {
      return res;
    });
  }

  async joinRoom(data: any) {
    let Users: any = await User.findAll({
      include: [
        {
          model: vetProfile,
          as: "VetProfileUser",
          where: { practice: data.practice ? data.practice : 33 },
        },
      ],
      attributes: ["id"],
      where: {
        // role: { [Op.in]: [4] },
        is_deleted: null,
      },
    });
    let isRoomExist = await Rooms.findOne({ where: { name: data.roomname } });
    if (isRoomExist) {
      return isRoomExist;
    }
    const is_created_by_user =
      data && data.is_created_by_user ? data.is_created_by_user : null;
    return Rooms.create({
      name: data.roomname,
      group_id: uuidv4(),
      practice_id: data.practice,
      is_created_by_user,
    }).then(async (res) => {
      const roomMemberData: any = [
        { room_id: res.id, users_id: data.username },
      ];
      Users = Users.map((i: any) => i.toJSON());
      Users.map(async (user: any) => {
        roomMemberData.push({
          room_id: res.id,
          users_id: user.id,
        });
      });
      let members = await RoomMembers.bulkCreate(roomMemberData);
      members = members.map((i: any) => i.toJSON());
      members = members.map((i: any) => i.users_id);
      const result = { group_id: res.group_id, members };
      return result;
    });
  }
  //conversationIds
  async createGroup(data: any, vetPractice: any) {
    const groupMembers = data.members;
    const allParticipants = await this.getUserDetails(groupMembers);
    let vetpracticeDeatils =
      vetPractice && (await this.getVetPractice(vetPractice));
    const practice = {
      id: vetPractice,
      name:
        vetpracticeDeatils && vetpracticeDeatils.practice_name
          ? vetpracticeDeatils.practice_name
          : "Default group",
      logo:
        vetpracticeDeatils && vetpracticeDeatils.img_path
          ? vetpracticeDeatils.img_path
          : null,
    };
    const participants = allParticipants.map((participant: any) => {
      if (participant.user_id == data.loggedUser) {
        participant.is_room_admin = 1;
      } else {
        participant.is_room_admin = 0;
      }
      participant.is_deleted = 0;
      return participant;
    });

    const newGroup = await ConversationModel.create({
      type: "group", //data.type,
      group_name: data.name,
      group_id: uuidv4(),
      is_created_by_owner: false,
      practice,
      participants,
      messages: [],
    });
    return newGroup;
  }

  /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */
  // async forwardMessages(data: any) {
  //   const forwardUserTo = data.toUsers ? data.toUsers : [];
  //   const rooms : any = data.groups ? data.groups : [];
  //   const forwardMessgageBulk: any = [];
  //   const messages: any = data.messages;
  //   const forwardFiles : any  = data && data.forwardFiles && data.forwardFiles.length ? data.forwardFiles : [];
  //   for (const user of forwardUserTo) {
  //     if (user && user != undefined && (messages && messages.length > 0) || (forwardFiles && forwardFiles.length > 0) ) {
  //       for (const message of messages) {
  //         if (message != null && message != "") {
  //           let time = 0;
  //           await new Promise((resolve) => {
  //             setTimeout(() => {
  //               time = Date.now();
  //               resolve(time);
  //             }, 1);
  //           });
  //           forwardMessgageBulk.push({
  //             from: data.loggedInUserId,
  //             to: user,
  //             message: message.message,
  //             forwarded_from : message.originator,
  //             timestamp: time,
  //           });
  //         }
  //       }
  //       for (const file of forwardFiles) {
  //         if (file != null && file != "") {
  //           let time = 0;
  //           await new Promise((resolve) => {
  //             setTimeout(() => {
  //               time = Date.now();
  //               resolve(time);
  //             }, 1);
  //           });
  //           let keys = Object.keys(file);
  //           let key = keys[0]; // Retrieve the first key
  //           let value = file[key];
  //           forwardMessgageBulk.push({
  //             from: data.loggedInUserId,
  //             to: user,
  //             message: key,
  //             upload_file_id : value,
  //             forwarded_from : file.originator,
  //             timestamp: time,
  //           });
  //         }
  //       }
  //     }
  //   }
  //   for (let roomId of rooms) {
  // 	if (data.is_app_forward && !Number(roomId) && roomId != 0 && roomId.includes("_")) {
  // 		const room = await this.getGroupID(roomId);
  // 		roomId = room && room.id ? room.id : 0;
  // 	}
  //     if (roomId && roomId != undefined && (messages && messages.length > 0) || (forwardFiles && forwardFiles.length > 0)) {
  //       for (const message of messages) {
  //         if (message != null && message != "") {
  //           let time = 0;
  //           await new Promise((resolve) => {
  //             setTimeout(() => {
  //               time = Date.now();
  //               resolve(time);
  //             }, 1);
  //           });
  //           forwardMessgageBulk.push({
  //             from: data.loggedInUserId,
  //             message: message.message,
  //             timestamp: time,
  //             room_id: roomId,
  //             forwarded_from : message.originator,
  //             read_by : data.loggedInUserId
  //           });
  //         }
  //       }
  //       for (const file of forwardFiles) {
  //         if (file != null && file != "") {
  //           let time = 0;
  //           await new Promise((resolve) => {
  //             setTimeout(() => {
  //               time = Date.now();
  //               resolve(time);
  //             }, 1);
  //           });
  //           let keys = Object.keys(file);
  //           let key = keys[0]; // Retrieve the first key
  //           let value = file[key];
  //           forwardMessgageBulk.push({
  //             from: data.loggedInUserId,
  //             message: key,
  //             upload_file_id : value,
  //             timestamp: time,
  //             room_id: roomId,
  //             forwarded_from : file.originator,
  //             read_by : data.loggedInUserId
  //           });
  //         }
  //       }
  //     }
  //   }

  //   let bulkCreateMessage:any = await Message.bulkCreate(forwardMessgageBulk);
  //   let uploadFileIds:any = bulkCreateMessage.map((message:any) => message.upload_file_id);
  //   let originator:any = bulkCreateMessage.map((message:any) => message.forwarded_from);
  //   let uploadFileData = await UploadFile.findAll({
  //     where: { id: uploadFileIds },
  //     attributes: ["id", "url", "mime", "name"],
  //   });

  //   let originatorData = await User.findAll({
  //     where: { id: originator }, // Use 'id' field to match the uploadFileIds
  //     attributes: ["id", "first_name", "last_name", "role"],
  //   });

  //   let senderData: any = await User.findOne({
  //     where: { id: data.loggedInUserId }, // Use 'id' field to match the uploadFileIds
  //     attributes: ["id", "first_name", "last_name", "role"],
  //   });
  //   const first_name = senderData && senderData.first_name || "";
  //   const last_name = senderData && senderData.last_name || "";
  //   const senderName = `${first_name} ${last_name}`;

  //   for (let message of bulkCreateMessage) {
  //     message.senderName = senderName;
  //     if (message.upload_file_id ) {
  //       let uploadData = uploadFileData.filter(obj => obj.id == message.upload_file_id);
  //       if (uploadData.length > 0) {
  //         if (uploadData[0].mime.includes("image") && uploadData[0].mime.includes("jpeg") || uploadData[0].mime.includes("jpg") || uploadData[0].mime.includes("png")) {
  //           message.dataValues.type  = "image";
  //         } else {
  //           message.dataValues.type  = "file";
  //         }
  //         message.dataValues.url = uploadData[0].url;
  //         message.dataValues.file = true;
  //       }
  //     }
  //     if(message.forwarded_from){
  //       let originatorDetails = originatorData.filter(obj => obj.id == message.forwarded_from);
  //       if(originatorDetails.length > 0){
  //         if (originatorDetails[0].first_name && originatorDetails[0].id) {
  //           message.dataValues.originator  = originatorDetails[0].first_name+" "+originatorDetails[0].last_name;
  //         }
  //       }
  //     }
  //   }
  //    return bulkCreateMessage;
  // }

  // Forward message to Groups and private 
  async forwardMessages(data: any) {
    const forwardUserTo = data.toUsers ? data.toUsers : [];
    const rooms: any = data.groups ? data.groups : [];
    const forwardMessgageBulk: any = [];
    const messages: any = data.messages;
    for (const user of forwardUserTo) {
      if (user && user != undefined && messages && messages.length > 0) {
        for (const message of messages) {
          if (message != null && message != "") {
            const conversationExist = await ConversationModel.findOne({
              type: "private",
              "participants.user_id": {
                $all: [Number(user), Number(data.loggedInUserId)],
              },
            });
            const conversationId = conversationExist ? conversationExist.id : null;
            const forwardConversation:any = await this.createMongoChat(
              {
                from: data.loggedInUserId,
                to: user,
                message: message.message,
                type: "private",
                forwarded_from: message.originator,
              },
              conversationId
            );
            if (forwardConversation) {
              forwardConversation.message = message.message; 
              forwardConversation.to      = user;
              forwardMessgageBulk.push(forwardConversation);
            }
          }
        }
      }
    }
    for (let conversationId of rooms) {
      // if (data.is_app_forward && !Number(roomId) && roomId != 0 && roomId.includes("_")) {
      // 	const room = await this.getGroupID(roomId);
      // 	roomId = room && room.id ? room.id : 0;
      // }
      if (
        conversationId &&
        conversationId != undefined &&
        messages &&
        messages.length > 0
      ) {
        for (const message of messages) {
          const forwardConversation:any = await this.createMongoChat(
            {
              from: data.loggedInUserId,
              message: message.message,
              forwarded_from: message.originator,
            },
            conversationId
          );
          if (forwardConversation) {
            forwardConversation.message = message.message; // Add a new key 'message' with the value from message.message
            forwardMessgageBulk.push(forwardConversation);
          }
        }
      }
    }

    // let bulkCreateMessage:any = await Message.bulkCreate(forwardMessgageBulk);
    // let originator:any = bulkCreateMessage.map((message:any) => message.forwarded_from);

    // let originatorData = await User.findAll({
    //   where: { id: originator }, // Use 'id' field to match the uploadFileIds
    //   attributes: ["id", "first_name", "last_name", "role"],
    // });

    let senderData: any = await User.findOne({
      where: { id: data.loggedInUserId }, // Use 'id' field to match the uploadFileIds
      attributes: ["id", "first_name", "last_name", "role"],
    });
    const first_name = (senderData && senderData.first_name) || "";
    const last_name = (senderData && senderData.last_name) || "";
    const senderName = `${first_name} ${last_name}`;

    for (let message of forwardMessgageBulk) {
      message.senderName = senderName;
      // if(message.forwarded_from){
      //   let originatorDetails = originatorData.filter(obj => obj.id == message.forwarded_from);
      //   if(originatorDetails.length > 0){
      //     if (originatorDetails[0].first_name && originatorDetails[0].id) {
      //       message.dataValues.originator  = originatorDetails[0].first_name+" "+originatorDetails[0].last_name;
      //     }
      //   }
      // }
    }
    return forwardMessgageBulk;
  }

  //Get user's timeZone 
  async getUserTimeZone(userId: any) {
    return await User.findOne({
      where: { id: userId },
      attributes: ["timeZone"],
    });
  }

  //sequelize
  async groupMembers(roomId: any) {
    return await RoomMembers.findAll({
      where: { room_id: roomId },
      include: [
        { model: Rooms, as: "Room" },
        {
          model: User,
          as: "User",
          attributes: ["id", "first_name", "last_name", "role", "timeZone"],
          include: [
            {
              model: UploadFileMorph,
              as: "UploadProfile",
              required: false,
              where: { related_type: "users-permissions_user" },
              include: [
                {
                  model: UploadFile,
                  as: "UploadFile",
                  attributes: ["url", "id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  //Conversation members By id
  async mongoGroupMembers(conversationId: any) {
    const validConversationId = new Types.ObjectId(conversationId);
    const conversation = await ConversationModel.findOne({
      _id: conversationId,
    });
    if (conversation) {
      const participants = conversation.participants;
      return participants;
    } else {
      // Handle case when conversation with the specified ID is not found
      return [];
    }
  }

  /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */
  // async leaveGroup(data: any) {
  //   if (data.userId) {
  //     let is_admin = await RoomMembers.findOne({
  //       where: { users_id: data.userId, room_id: data.room_id },
  //     });
  //     if (is_admin && is_admin.is_room_admin) {
  //       let make_admin = await RoomMembers.findOne({
  //         where: {
  //           users_id: { [Op.ne]: data.userId },
  //           is_deleted: null,
  //           room_id: data.room_id,
  //         },
  //       }).then(async function(res) {
  //         if (res) {
  //           await RoomMembers.update(
  //             { is_room_admin: 1 },
  //             { where: { id: res.id } }
  //           );
  //         }
  //       });
  //     }
  //   }
  //   return await RoomMembers.update(
  //     { is_deleted: 1, is_room_admin: null },
  //     { where: { room_id: data.room_id, users_id: data.userId } }
  //   );
  // }

  //Left user from group or remove user by admin
  async leaveGroup(data: any) {
    let isAdmin = false;
    let leaveuser = data.userId;
    const isLeaveUserAdmin = await ConversationModel.findOne(
      {
        _id: data.conversationId,
        "participants.user_id": leaveuser,
      },
      { "participants.$": 1 }
    );
    if (isLeaveUserAdmin) {
      const participant = isLeaveUserAdmin.participants[0];
      isAdmin =
        participant && participant.is_room_admin
          ? participant.is_room_admin
          : false;
    }
    const updatedConversation = await ConversationModel.findOneAndUpdate(
      {
        _id: data.conversationId,
        "participants.user_id": leaveuser,
      },
      {
        $set: {
          "participants.$.is_room_admin": 0,
          "participants.$.is_deleted": 1,
        },
      },
      { new: true }
    );
    const updatedParticipant = updatedConversation?.participants.find(
      (participant) => participant.user_id === leaveuser
    );
    if (isAdmin) {
      const makeAdmin = await ConversationModel.findOne({
        _id: data.conversationId,
        "participants.is_deleted": false,
      });
      if (makeAdmin) {
        makeAdmin.participants[0].is_room_admin = true; // Update the is_room_admin field of the first participant
        makeAdmin.save(); // Save the changes to the conversation
      }
    }
    return updatedParticipant;
  }

  /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */
  // async addGroupMember(data: any) {
  //   let newGroupUsers = data.groupUsers;
  //   const newmembers: any = [];
  //   for (let user of newGroupUsers) {
  //     let alreadyInRoom = await RoomMembers.findOne({
  //       where: { room_id: data.room_id, users_id: user },
  //     });
  //     if (alreadyInRoom == null) {
  //       newmembers.push({
  //         room_id: data.room_id,
  //         users_id: user,
  //       });
  //     } else {
  //       await RoomMembers.update(
  //         { is_deleted: null },
  //         { where: { room_id: data.room_id, users_id: user } }
  //       );
  //     }
  //   }
  //   await RoomMembers.bulkCreate(newmembers);
  //   return await RoomMembers.findAll({
  //     where: { room_id: data.room_id, users_id: { [Op.in]: newGroupUsers } },
  //     include: [
  //       { model: Rooms, as: "Room" },
  //       {
  //         model: User,
  //         as: "User",
  //         attributes: ["id","first_name", "last_name", "role"],
  //         include: [
  //           {
  //             model: UploadFileMorph,
  //             as: "UploadProfile",
  //             required: false,
  //             where: { related_type: "users-permissions_user" },
  //             include: [
  //               {
  //                 model: UploadFile,
  //                 as: "UploadFile",
  //                 attributes: ["url", "id"],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // }

  //Add Group member
  async addGroupMember(data: any) {
    let newGroupUsers = data.groupUsers;
    const participants: any = await this.getUserDetails(newGroupUsers);
    const newParticipants = await participants.map((participant: any) => {
      participant.is_room_admin = 0;
      participant.is_deleted = 0;
      return participant;
    });
    await ConversationModel.findOneAndUpdate(
      { _id: data.conversationId }, // Find the conversation by its ID
      { $push: { participants: { $each: newParticipants } } }, // Add new participants to the participants array
      { new: true } // Return the updated document
    );
    return newParticipants;
  }

  //sequelize
  async deleteRoomChat(data: any) {
    const userID = data.userId;
    const roomId = data.room_id;
    return await RoomMembers.update(
      { is_chat_deleted: 1 },
      { where: { room_id: roomId, users_id: userID } }
    );
  }

  //Set read flag on mesage 
  async setReadFlag(data: any) {
    const loggedInUserId = parseInt(data.loggedInuser); // Convert to number if it's a string or another data type
    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: data.id },
      { $addToSet: { "messages.$[].read_by": loggedInUserId } },
      { new: true }
    );
    return conversation;
  }

  //clear messages from group and private from logged user side
  async clearChat(data: any) {
    const loggedInUserId = parseInt(data.loggedInUserId); // Convert to number if it's a string or another data type
    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: data.conversationId },
      { $addToSet: { "messages.$[].deleted_for": loggedInUserId } },
      { new: true }
    );
    return conversation;
  }

  //multiple archive chats(sequelize)
  async multipleArchives(data: any) {
    const record = [];

    if (data && data.contact && data.contact.length) {
      data.contact.map((i: any) =>
        record.push({
          user_id: data.loggedInUserId,
          contact_id: i,
          room_id: null,
        })
      );
    }

    for (let i in data.room_id) {
      const room = await Rooms.findOne({ where: { name: data.room_id[i] } });

      if (room && room.id) {
        record.push({
          user_id: data.loggedInUserId,
          contact_id: null,
          room_id: room.id,
        });
      }
    }

    if (record && record.length) {
      return ArchivedContacts.bulkCreate(record);
    } else {
      return [];
    }
  }

  //multiple unarchive chats(sequelize)
  async multipleUnArchives(data: any) {
    if (data && data.archived_id && data.archived_id.length) {
      await ArchivedContacts.destroy({
        where: { id: { [Op.in]: data.archived_id } },
      });
      return true;
    } else {
      return false;
    }
  }

  // archive chat
  async archiveChat(data: any) {
    // find conversation and push user id
    const conversation = await ConversationModel.findOne({
      _id: data.conversationId,
    });
    if (conversation) {
      const alreadyArchived = conversation.archived_for.includes(
        data.loggedInUserId
      );
      if (!alreadyArchived) {
        conversation.archived_for.push(data.loggedInUserId);
      }
      await conversation.save();
      return {
        status: true,
        data: conversation,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
    /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */
    // const archivedUser =  await ArchivedContacts.findOne({
    //   where:{
    //     [Op.and]:{
    //       user_id: data.loggedInUserId,
    //       [Op.or]:[
    //         {...((data.room_id &&data.room_id != 0) && {room_id : data.room_id} )},
    //         { ...((data.contact)&& {contact_id: data.contact})}
    //       ]
    //     }
    //   }
    // })
    // if(!archivedUser){
    // const newArchivedUser =  await ArchivedContacts.create({
    //     user_id: data.loggedInUserId,
    //     ...(data.contact&& data.room_id == 0&&{ contact_id: data.contact}),
    //     ...(((data.room_id&& data.room_id !=0 && !data.contact)||(data.room_id && data.room_id !=0 &&data.room_id == data.contact))&&{room_id:data.room_id})
    //   })
    //   return {
    //     status : true,
    //     data:newArchivedUser
    //   }

    // }else{
    //   return {
    //     status : false,
    //     data: null
    //   }
    // }
  }

  // unarchive chat
  async unarchiveChat(data: any) {
    // mongodb unarchive chat
    const conversation = await ConversationModel.findOne({
      _id: data.conversationId,
    });
    if (conversation) {
      const index = conversation.archived_for.indexOf(data.loggedInUserId);
      if (index != -1) {
        conversation.archived_for.splice(index, 1);
      }
      await conversation.save();
      return {
        status: true,
        data: conversation,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
    /*
      this code is commented because of create conversation module in mongodb so that no need to this code as of now.
    */

    // check already archived
    // const archivedUser =  await ArchivedContacts.findOne({
    //   where:{
    //     [Op.and]:{
    //       user_id: data.loggedInUserId,
    //       [Op.or]:[
    //         {...((data.room_id &&data.room_id != 0) && {room_id : data.room_id} )},
    //         { ...((data.contact)&& {contact_id: data.contact})}
    //       ]
    //     }
    //   }
    // })
    // if(archivedUser){
    //   // destroy record from table
    //   await ArchivedContacts.destroy({
    //     where:{
    //       id: archivedUser.id
    //     }
    //   })
    //   return {
    //     status : true,
    //     data:archivedUser
    //   }
    // }else{
    //   return {
    //     status : false,
    //     data: null
    //   }
    // }
  }

  // check group or contact is archived or not
  async isArchiveContact(loggedInUserId: any, contactId: any, roomId: any) {
    // check already archived
    const archivedUser = await ArchivedContacts.findOne({
      where: {
        [Op.and]: {
          user_id: loggedInUserId,
          [Op.or]: [
            { ...(roomId && roomId != 0 && { room_id: roomId }) },
            { ...(contactId && { contact_id: contactId }) },
          ],
        },
      },
    });
    if (archivedUser) {
      return {
        status: true,
        data: archivedUser,
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  }

  //Send file in group and private 
  async sendFiles(data: any, files: any[]) {
    if (!files || files.length === 0) {
      console.log("Files are missing");
      return;
    }

    let uploadPromises = [];

    for (const file of files) {
      let type = "";
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const randomSuffix = () => crypto.randomBytes(5).toString("hex");
      const dateNow = Date.now();
      const filename =
        dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;
      let uploadFileData: any; // Define uploadFileData in a higher scope

      // Upload each file to S3
      const key = `${uploadPath}/${filename}`;
      const uploadPromise = await awsS3
        .uploadPublicFileOnS3(file, key)
        .then(async (uploadFile) => {
          if (!uploadFile) {
            console.log("Error:File upload failed");
          }
          return await UploadFile.create({
            name: filename,
            hash: `${basename}_${randomSuffix()}`,
            ext,
            mime: file.mimetype,
            size: file.size,
            url: uploadFile.Location,
            provider: "aws-s3",
            created_by: data.userId,
          });
        })
        .then(async (uploadedFileData) => {
          uploadFileData = uploadedFileData;
          if (
            (file.mimetype.includes("image") &&
              file.mimetype.includes("jpeg")) ||
            file.mimetype.includes("jpg") ||
            file.mimetype.includes("png")
          ) {
            type = "image";
          } else {
            type = "file";
          }
          if (uploadFileData.url) {
            return {
              message: uploadFileData.url,
              user_id: data.loggedInUserId,
              read_by: data.loggedInUserId,
              is_system_message: 0,
              url: uploadFileData.url, // Access uploadFileData from the higher scope
              mime: uploadFileData.mime,
              type: type,
              name: uploadFileData.name,
            };
            // return await this.createChat(messageData, data.conversationId);
          }
        })
        // .then(async(sendMessage) => {
        //   return {
        //     message: sendMessage,
        //     url: uploadFileData.url, // Access uploadFileData from the higher scope
        //     mime: uploadFileData.mime,
        //     type: type,
        //     name : uploadFileData.name
        //   };
        // })
        .catch((error) => {
          console.log("Error: ", error);
        });
      uploadPromises.push(uploadPromise);
    }

    const results = await Promise.all(uploadPromises);
    return results;
  }

  //change group  ICon 
  async changeGroupIcon(data: any, file: any) {
    if (!file || file.length === 0) {
      console.log("Files are missing");
      return;
    }
    let type = "";
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const randomSuffix = () => crypto.randomBytes(5).toString("hex");
    const dateNow = Date.now();
    const filename =
      dateNow + "_" + Math.random().toString(36).substring(2, 15) + ext;
    const key = `${uploadPath}/${filename}`;
    const uploadFileData: any = await awsS3
      .uploadPublicFileOnS3(file, key)
      .then(async (uploadFile) => {
        if (!uploadFile) {
          console.log("Error:File upload failed");
        }
        return await UploadFile.create({
          name: filename,
          hash: `${basename}_${randomSuffix()}`,
          ext,
          mime: file.mimetype,
          size: file.size,
          url: uploadFile.Location,
          provider: "aws-s3",
          created_by: data.userId,
        });
      });
    if (uploadFileData) {
      if (uploadFileData.url) {
        if (data.conversationId && data.conversationId != 0) {
          let updateIcon: any = await ConversationModel.findOneAndUpdate(
            { _id: data.conversationId },
            { $set: { icon: uploadFileData.url } }, // Update the participant in the participants array
            { new: true }
          );
          if (updateIcon) {
            return { id: updateIcon._id, icon: uploadFileData.url };
          }
        }
      }
    }
  }

  //Delete  multiple messages by sender only
  async deleteMessage(data: any) {
    await ConversationModel.updateOne(
      { _id: data.conversationId, "messages._id": { $in: data.ids } },
      { $set: { "messages.$.is_deleted": true } }
    );

    // Fetch the updated conversation
    const updatedConversation = await ConversationModel.findById(
      data.conversationId
    );

    return updatedConversation;
  }

  // CREATE REMAINDER MESSAGES
  async createRemainderMessages(data: any) {
    let remainders = [];
    data.to = data && data.to == "" ? null : data.to;
    data.room_id = data && data.room_id == "" ? null : data.room_id;
    if (data && data.before_day) {
      const givenDateTime = moment(data.remainder_datetime);
      const dayBefore = givenDateTime
        .subtract(data.before_day, "day")
        .format("YYYY-MM-DDTHH:mm");
      remainders.push({ ...data, sent_datetime: dayBefore, before_hour: null });
    }

    if (data && data.before_hour) {
      const givenDateTime = moment(data.remainder_datetime);
      const hourBefore = givenDateTime
        .subtract(data.before_hour, "hour")
        .format("YYYY-MM-DDTHH:mm");
      remainders.push({ ...data, sent_datetime: hourBefore, before_day: null });
    }
    return Remainder.bulkCreate(remainders);
  }

  //conversation members
  async conversationMembers(data: any) {
    const conversation = await ConversationModel.findOne({
      _id: data.conversationId,
    });
    if (conversation) {
      const participants = conversation.participants;
      const allMembers = participants.map(
        (participant: any) =>
          `${participant.first_name} ${participant.last_name}`
      );
      return allMembers;
    }
  }

  async getFavoritesUser(practiceId : any){
    const favoritsUsers = await FavoritePracticeVetPractices.findAll({
      where: {'vet-practice_id': practiceId }, // Use Sequelize's col function
      include : [
        {
          model: FavoritePractices,
          as: "FavoriteVetPractices",
          include: [
            {
              model: User,
              as: "users",
              attributes: [
                "id",
                'first_name', 
                'last_name', 
              ],
              include: [
                {
                  model: UploadFileMorph,
                  as: "UploadProfile",
                  required: false,
                  where: { related_type: "users-permissions_user" },
                  include: [
                    {
                      model: UploadFile,
                      as: "UploadFile",
                      attributes: ["url", "id", "name"],
                    },
                  ],
                },
              ],
            }
          ]
        }
      ],
    });
    return favoritsUsers.map((favoritsUser:any) => {
      const favoriteVetPractice = favoritsUser.FavoriteVetPractices;
      const favoriteUser = favoriteVetPractice.users;
      const uploadProfile = favoriteUser.UploadProfile;
      const uploadFile = uploadProfile && uploadProfile.UploadFile ? uploadProfile.UploadFile : null;
      return {
        id: favoriteUser.id,
        first_name: `${favoriteUser.first_name} ${favoriteUser.last_name}`,
        last_name: favoriteUser.last_name,
        profileImgPath: uploadFile && uploadFile.url ? uploadFile.url : null,
      };
    });
  }
}
