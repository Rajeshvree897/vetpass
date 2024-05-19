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
