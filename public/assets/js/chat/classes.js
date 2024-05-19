function User(user) {
  this.id = user.id;
  this.username = user.username;
}

function SocketManager() {
  this.socket;

  this.connectSocket = function(queryObj) {
    this.socket = io(socketIOUrl, {
      ...queryObj,
    });
    this.bindListeners();
  };

  this.bindListeners = function() {
    this.socket.on(SocketEvents.disconnected, function() {
      disconnectSocket();
    });

    this.socket.on(SocketEvents.systemMessage, function(data) {
      appendMessageHtml(
        getMessageHtml(data.messages),
        getSystemMessageContainer()
      );
    });

    this.socket.on(SocketEvents.forceServerDisconnect, function(data) {
      appendMessageHtml(
        getMessageHtml(data.messages),
        getSystemMessageContainer()
      );
    });

    // RETRIVE PRIVATE-MESSAGES AND APPEND TO HTML
    this.socket.on(SocketEvents.privateMessage, function(data) {
      data.refresh = 0;
      data.id = data.id ? data.id : data._id;
      if (data.is_edit != 0) {
        editMessage(data);
      } else {
        appendReceiverMessage(data);
      }
    });

    this.socket.on(SocketEvents.groupMessage, function(data) {
      appendMessageHtml(
        getMessageHtml(data.messages),
        getGroupMessageContainer()
      );
    });
    this.socket.on("chat", function(data) {
      data.sendFrom = data.username;
      data.refresh = 0;
      data.id = data.id ? data.id : data._id;
      if (data.is_edit != 0) {
        editMessage(data);
      } else {
        if(!data.is_left){
          appendReceiverMessage(data);
        }
      }
    });

    this.socket.on("new-group", function(data) {
      data.sendFrom = data.username;
      appendReceiverMessage(data);
    });

    this.socket.on("delete-messages", function(data) {
      deleteMessage(data);
    });

    this.socket.on("user-left", function(data) {
      appendReceiverMessage(data);
    });

    this.socket.on("refresh-chat", async function(data) {
      refreshChat(data.contacts);
      await refreshArchivedContacts();
    });

    this.socket.on("read-message", async function(data) {
      await readMessageFlag(data);
    });

    this.socket.on("clear-chat", async function(data) {
      await clearChat(data);
    });

    this.socket.on("archive-chat", async function(data) {
      await archiveChat(data);
    });

    this.socket.on("unarchive-chat", async function(data) {
      await unarchiveChat(data);
    });

    this.socket.on("forward-message", async function(data) {
      let forwardData = data.forwardData;
      await forwardData.forEach(async function(user) {
        user.forwarded = true;
        user.dataMessage = user.message;
        user.orignalMsg = user.message;
        if (user.upload_file_id) {
          if (user.type == "image") {
            user.message = `<img src = "${user.url}" class="messageFile">`;
          } else {
            user.message = `<a href="${user.url}" target="_blank"><img src = "/images/download-file.png" class="messageFile"></a>`;
          }
        }
        user.sendFrom = user.from;
        user.sender = {
          first_name: data.sender,
          last_name: "",
          id: user.sendFrom,
        };
        user.refresh = 0;
        await appendReceiverMessage(user);
      });
    });
  };

  this.emitEvent = function(event, data) {
    this.socket.emit(event, data);
  };

  this.disconnectSocket = function() {
    this.socket = null;
  };
}
