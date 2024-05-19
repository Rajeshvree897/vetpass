var socket = io("http://localhost:3000");

socket.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("invalid userId"));
  }
  socket.userId = userId;
  next();
});

socket.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("invalid userId"));
  }
  socket.userId = userId;
  next();
  
  const users = [];
  for (let [id, socket] of socket.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  // ...
});

// this.emitEvent = function (event, data) {
//   this.socket.emit(event, data);
// }

$('input[name="butAssignProd"]').click(function () {
  alert('Hello...!');
});

// press enter on text area..
$('#comment').keypress(function (e) {
  var key = e.which;
  if (key == 13 && $.trim($(this).val())) // the enter key code
  {
    const message = $.trim($(this).val());
    appendSenderMessage(message);
    $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
    this.value = "";
    const contact = 25;
    const loggedInUserId = $("#loggedInUserId").val() || 31;
    createChatData(loggedInUserId, contact, message);
  }
});


// APPEND SENDER MESSAGE
function appendSenderMessage(msg) {
  var date = new Date();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const data = `<div class="row message-body">
      <div class="col-sm-12 message-main-sender">
        <div class="sender">
          <div class="message-text">
            ${msg}
          </div>
          <span class="message-time pull-right">
            ${time}
          </span>
        </div>
      </div>
    </div>`;
  $("#conversation").append(data);
}

// GET CHAT
function displayChat(chat, loggedInUserId) {
  const screen = $("#chat-screen");
  const input = `<div class="row reply">
  <div class="col-sm-1 col-xs-1 reply-emojis">
    <i class="fa fa-smile-o fa-2x"></i>
  </div>
  <div class="col-sm-9 col-xs-9 reply-main">
    <!-- <textarea class="form-control" rows="1" id="comment"></textarea> -->
    <input type="text" class="form-control" rows="1" id="comment">
  </div>
  <div class="col-sm-1 col-xs-1 reply-recording">
    <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
  </div>
  <div class="col-sm-1 col-xs-1 reply-send">
    <i class="fa fa-send fa-2x" aria-hidden="true"></i>
  </div>
</div>`;
  let html = `<div class="row heading">
    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
      <div class="heading-avatar-icon">
        <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
      </div>
    </div>
    <div class="col-sm-8 col-xs-7 heading-name">
      <a class="heading-name-meta">John Doe from here
      </a>
      <span class="heading-online">Online</span>
    </div>
    <div class="col-sm-1 col-xs-1  heading-dot pull-right">
      <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
    </div>
  </div>

  `;
  if (chat && chat.length) {
    html += `<div class="row message" id="conversation">`;
    for (const i in chat) {
      console.log(chat[i].from, loggedInUserId, chat[i].from == loggedInUserId);
      if (chat[i].to == loggedInUserId) {
        html += `
        <div class="row message-body">
          <div class="col-sm-12 message-main-receiver">
            <div class="receiver">
              <div class="message-text">
                ${chat[i].message}
              </div>
              <span class="message-time pull-right">
              ${chat[i].created_at}
              </span>
            </div>
          </div>
        </div>`;
      } else {
        html += `
        <div class="row message-body">
          <div class="col-sm-12 message-main-sender">
            <div class="sender">
              <div class="message-text">
                ${chat[i].message}
              </div>
              <span class="message-time pull-right">
              ${chat[i].created_at}
              </span>
            </div>
          </div>
        </div>`;
      }
    }
    html += `</div>`;
    $("#chat-screen").prepend(html + input);
    $(".conversation").show()
    $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
  } else {
    console.log("else");
    $("#chat-screen").prepend(html + input);
    $(".conversation").show()
    $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
  }
}

// GET CHAT DATA
function getChatData(loggedInUserId, contact) {
  const formData = { loggedInUserId, contact, limit: 100, offset: 0 }; //Array 
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/getChatData",
      type: "POST",
      data: formData,
      success: function (data, textStatus, jqXHR) {
        console.log(data.data)
        if (data && data.data && data.data.length) {
          displayChat(data.data, loggedInUserId);
          resolve(data);
        } else {
          displayChat();
          resolve(data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("ERROR");
        reject("ERROR");
      }
    });
  });
}

// CREATE CHAT DATA
function createChatData(loggedInUserId, contact, message) {
  const formData = { from: loggedInUserId, to: contact, message };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message",
      type: "POST",
      data: formData,
      success: function (data, textStatus, jqXHR) {
        // alert(data);
        console.log("created msg data", data);
        //data - response from server
        resolve(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("ERROR");
        reject("Error");
      }
    });
  })
}


$(document).on("keypress", '#comment', async function (e) {
  var key = e.which;
  if (key == 13 && $.trim($(this).val())) // the enter key code
  {
    const message = $.trim($(this).val());
    appendSenderMessage(message);
    $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
    this.value = "";
    const contact = 25;
    const loggedInUserId = $("#loggedInUserId").val() || 31;
    await createChatData(loggedInUserId, contact, message);
    var data = {
      message, to: 25, from: loggedInUserId
    }
    console.log("emit called", data);
    // socket.emit('chat message', input.value);
    socket.emit('private message', data);
  }
});