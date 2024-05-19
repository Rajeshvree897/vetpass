function connectSocket(queryObj) {
  socketManager.connectSocket(queryObj);
}

function disconnectSocket() {
  socketManager.disconnectSocket();
}

function initUser(userData) {
  user = new User(userData);
}

function emitEvent(event, data) {
  socketManager.emitEvent(event, data);
}

function clearUser() {
  user = null;
}

function createCookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; SameSite: false; " +
    expires +
    "; path=/";
}

function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function setUserDataCookies(user) {
  createCookie("userId", user.id);
  createCookie("username", user.username);
}

function unsetUserDataCookies() {
  eraseCookie("userId");
  createCookie("username");
}

function getForwardedMessageHTML(id, message, from) {}

function appendMessageHtml(messageHTML, parentContainerId) {
  $(parentContainerId).append(messageHTML);
}

function getPrivateMessageContainer() {
  var e =
    "div#" + privateMessageContainerRootId + " > ." + messageContainerClass;
  return e;
}

function getGroupMessageContainer() {
  var e = "div#" + groupMessageContainerRootId + " > ." + messageContainerClass;
  return e;
}

function getSystemMessageContainer() {
  var e =
    "div#" + systemMessageContainerRootId + " > ." + messageContainerClass;
  return e;
}

function createSenderMessageHtml(name) {
  var element = document.createElement("span");
  element.className = "chat-name-tag";
  element.innerText = name;

  return element;
}

function createForwardedMessageNotifierHtml() {
  var element = document.createElement("span");
  element.className = "forwarded-message-tag";
  element.innerText = "forwarded";

  return element;
}

function createForwardInputHtml(messageId) {
  // forward button div html
  var element = document.createElement("span");
  element.className = "forward-message-input-group";

  // text input html
  var input = document.createElement("input");
  input.type = "text";
  input.dataset.messageId = messageId;
  input.className = "forward-forward-message";
  element.append(input);

  // forward button html
  var button = document.createElement("button");
  button.innerText = "Forward";
  button.type = "text";
  button.dataset.messageId = messageId;
  button.className = "forward-forward-message";
  element.append(button);

  return element;
}

function createMessageHtml(message) {
  // main message holder
  var messageHolder = document.createElement("div");
  messageHolder.className = "message";
  messageHolder.dataset.id = message.id;
  messageHolder.innerText = message.message;

  // message sender tag
  messageHolder.append(createSenderMessageHtml(message.sender.username));

  // forwareded message tag
  if (message.isForwarded) {
    messageHolder.prepend(createForwardedMessageNotifierHtml());
  }

  // show forward option only if
  if (!message.sender.isAdmin) {
    messageHolder.append(createForwardInputHtml(message.id));
  }

  return messageHolder;
}

function getMessageHtml(messageData) {
  var messageHtml = document.createElement("div");

  messageData.forEach(function(message) {
    messageHtml.append(createMessageHtml(message));
  });

  return messageHtml.innerHTML;
}

function validateEmpty(value) {
  if (!value) {
    return false;
  }

  if (!value.trim()) {
    return false;
  }

  return true;
}

function validateRegisterUser(username) {
  if (!validateEmpty(username)) {
    return false;
  }

  return true;
}

function validateMessage(message) {
  if (!validateEmpty(message)) {
    return false;
  }

  return true;
}

function validateGroupName(name) {
  if (!validateEmpty(name)) {
    return false;
  }

  return true;
}

function validateSender(name) {
  if (!validateEmpty(name)) {
    return false;
  }

  return true;
}

function registerUserAjax(username) {
  $.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      return xhr;
    },
    type: "POST",
    url: backendUrl + "/auth/register",
    contentType: "application/json",
    data: JSON.stringify({ username: username }),
    success: function(data, status, xhr) {
      alert(data.message);
    },
    error: function(xhr, status, error) {
      alert(error);
    },
  });
}

function registerUser(username) {
  if (!validateRegisterUser(username)) {
    alert(Messages.invalidUsername);
    return;
  }

  registerUserAjax(username);
}

function loginUserAjax(username) {
  $.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      return xhr;
    },
    type: "POST",
    url: backendUrl + "/auth/login",
    contentType: "application/json",
    data: JSON.stringify({ username: username }),
    success: function(data, status, xhr) {
      if (data.user && data.user.id) {
        connectSocket({ query: `userId=${data.user.id}` });
        initUser(data.user);
        setUserDataCookies(data.user);
      } else {
        alert(Messages.userNotFound);
      }
    },
    error: function(xhr, status, error) {
      alert(error);
    },
  });
}

function loginUser(username) {
  if (!validateRegisterUser(username)) {
    alert(Messages.invalidUsername);
    return;
  }

  loginUserAjax(username);
}

function logoutUser() {
  if (!user) {
    alert("User already logged out");
    return;
  }

  emitEvent(SocketEvents.logout);
  clearUser();
  unsetUserDataCookies();
}

function forwardMessageToGroup(messageId, groupName) {}

function forwardMessageToPrivateUser(messageId, username) {}

function sendPrivateMessageAjax(message, to) {
  var data = {
    message,
    to,
    sender: user,
  };

  emitEvent(SocketEvents.privateMessage, data);
}

function sendPrivateMessage(message, to) {
  if (!validateMessage(message)) {
    alert("Invalid Message");
    return;
  }

  if (!validateSender(to)) {
    alert("Other username is invalid");
    return;
  }

  if (!user) {
    alert("user not logged in");
    return;
  }

  sendPrivateMessageAjax(message, to);
}

function sendGroupMessageAjax(message, groupName) {
  var data = {
    message: message,
    groupName: groupName,
    sender: user,
  };

  emitEvent(SocketEvents.groupMessage, data);
}

function sendGroupMessage(message, groupName) {
  if (!validateMessage(message)) {
    alert("Invalid Message");
    return;
  }

  if (!validateSender(groupName)) {
    alert("Group name is invalid");
    return;
  }

  if (!user) {
    alert("user not logged in");
    return;
  }

  sendGroupMessageAjax(message, groupName);
}

function validateGroupName(name) {
  return name && name.trim() != "";
}

function createGroupAjax(name) {
  var data = {
    groupName: name,
    user: user,
  };

  emitEvent(SocketEvents.groupCreate, data);
}

function createGroup(name) {
  if (!user) {
    alert("user not logged in");
    return;
  }

  if (!validateGroupName(name)) {
    alert("invalid group name");
    return;
  }

  createGroupAjax(name);
}

function joinGroup(name) {}

function leaveGroup(name) {}

function addMemberToGroupAjax(username, groupName) {
  var data = {
    groupName: groupName,
    username: username,
  };

  emitEvent(SocketEvents.groupMemberAdd, data);
}

function addMemberToGroup(username, groupName) {
  if (!validateGroupName(groupName)) {
    alert("group name is invalid");
    return;
  }

  if (!validateSender(username)) {
    alert("username is invalid");
    return;
  }

  if (!user) {
    alert("user not logged in");
    return;
  }

  addMemberToGroupAjax(username, groupName);
}

var timeZone = $("#loggedInUserId").attr("timeZone");
var temp = 0;

// GET CHAT DATA
function getChatData(loggedInUserId, contact, offset = 0) {
  let roomId = Number($("#contact").attr("room-id"));
  contact.id = $("#conversationId").val();
  const formData = {
    loggedInUserId,
    contact: contact.id,
    limit: 10,
    offset: offset,
    roomId,
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/getChatData",
      type: "POST",
      data: formData,
      beforeSend: function(xhr) {
        $("#loadingDIV").show();
      },
      success: function(data, textStatus, jqXHR) {
        $("#loadingDIV").hide();
        if (data && data.data && data.data.length) {
          let messages =
            data.data && data.data[0] && data.data[0].messages
              ? data.data[0].messages
              : [];
          let icon =
            data.data &&
            data.data[0] &&
            data.data[0].type == "group" &&
            data.data[0].icon
              ? data.data[0].icon
              : "";
          let is_left =
            Number($("contact").attr("room-id")) !== 0
              ? data.data && data.data[0] && data.data[0].participants
                ? data.data[0].participants.find(
                    (user) => user.user_id == loggedInUserId
                  )?.is_deleted ?? 0
                : 0
              : 0;
          currentConversationMembersArr =
            data.data && data.data[0] && data.data[0].participants
              ? data.data[0].participants
              : [];
          $("#contact").attr("room-id") != "0"
            ? currentConversationMembersArr.push({
                first_name: "all",
                last_name: "",
              })
            : "";
          if (offset != 0) {
            addMongoChatMessage(
              messages,
              loggedInUserId,
              data.data[0].currentTotalMessages
            );
          } else {
            displayMongoChat(
              icon,
              contact,
              messages,
              loggedInUserId,
              data.data[0].currentTotalMessages,
              is_left
            );
            $(".unarchiveChatIcnDef").show();
            $(".archiveChatIcnDef").show();
            if (data.is_archived) {
              $(".unarchiveChatIcnDef").show();
              $(".archiveChatIcnDef").hide();
            } else {
              $(".unarchiveChatIcnDef").hide();
              $(".archiveChatIcnDef").show();
            }
          }
          resolve(data);
        } else {
          if (offset == 0) {
            displayMongoChat((profilePic = null), contact);
            if (data.is_archived) {
              $(".unarchiveChatIcnDef").show();
              $(".archiveChatIcnDef").hide();
            } else {
              $(".unarchiveChatIcnDef").hide();
              $(".archiveChatIcnDef").show();
            }
          }
          resolve(data);
        }
      },
      complete: $("#loadingDIV").hide(),
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a target="_blank" href="' + url + '">' + url + "</a>";
  });
}

//add previous message
// function addChatMessage(chat, loggedInUserId){
// let previousMessag = ''; let showMoreMessageClone = "";
// var username = "";
// temp = 0;
// if(chat && chat.length <= 100){
//   $('.previousmessageclass').remove();
// }else{
//   $('.previousmessageclass').css("display","block")
//   showMoreMessageClone = $('.previousmessageclass').clone();
//   $('.previousmessageclass').remove();
// }
// if (chat && chat.length) {
//     if(chat.length > 100){
//       chat.shift()
//     }
//   for (const i in chat) {
//     var date = new Date(chat[i].created_at);
//     var Replydate = new Date(chat[i].Reply ? chat[i].Reply.created_at:chat[i].created_at);
//     const ReplyTime = Replydate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
//     var getMessage = chat[i].message;
//     const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
//     if($('#contact').attr('room-id') && $('#contact').attr('room-id') != 0){
//       let color = getRandomColor();
//       username = `<span ${color} class="userContact" data-id="${chat[i].sender.id}" name="${chat[i].sender.first_name}" profile="${chat[i] && chat[i].sender && chat[i].sender.UploadProfile && chat[i].sender.UploadProfile.UploadFile && chat[i].sender.UploadProfile.UploadFile.url ? chat[i].sender.UploadProfile.UploadFile.url : '/images/person-default.png'}"> ${chat[i].sender.first_name} : ${chat[i].from}</span>`;
//     }
//     if(chat[i].is_deleted == null || !chat[i].is_deleted.includes(loggedInUserId)){
//       if(chat[i].is_system_msg){
//       previousMessag += `<div class="row message-body"><h4 class="system-message">${chat[i].message}</h4>
//       </div>`;
//       }else{
//         chat[i].plain_message = chat[i].message.toString();
//         chat[i].message = urlify(chat[i].message.toString());
//         let type = "text" ;
//         if(chat[i]  && chat[i].UploadFiles && chat[i].UploadFiles.url){
//           if(chat[i].message == "image"){
//             chat[i].message = `<img src="${chat[i].UploadFiles.url}" class="messageFile" >`;
//             type = "image" ;
//           }else{
//             type = "file" ;
//             chat[i].message = `<a href="${chat[i].UploadFiles.url}" target="_blank"><img src="/images/download-file.png" class="messageFile"></a>`
//           }
//         }
//         if (chat[i].to == loggedInUserId) {
//           previousMessag += `
//           <div class="row message-body forward-selected${chat[i].id}">
//             ${(!chat[i].message_deleted || chat[i].message_deleted == null) ?
//                 `<div class="col-sm-1 forward-check-div checkBoxDiv${chat[i].id}" style="display:none">
//                 <input type="checkbox" class="forward-message comman-cls" originator="${chat[i] && chat[i].sender && chat[i].sender.id ? chat[i].sender.id : 0}" value="${chat[i].id}"  name="forwardMessages" data-message = "${!chat[i].upload_file_id ? chat[i].message : ''}" upload-file = ${chat[i].upload_file_id ? chat[i].upload_file_id : 0} message-type="${chat[i].message == 'image' || chat[i].message == 'file' ? chat[i].message : "text"}">
//                 </div>` : ""}
//               <div class="col-sm-11 message-main-receiver">
//                 <div class="receiver"  id="forwardUniid${chat[i].id}">
//                   ${username}
//                   <div class="message-text" data-message="${getMessage}">
//                   ${!chat[i].message_deleted || chat[i].message_deleted == null ? (
//                     chat[i].Reply && chat[i].Reply.message ? (
//                       `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].Reply.id}')" reply-parent-id="${chat[i].Reply.id}">` +
//                       (
//                         chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "image" ?
//                         `<img src="${chat[i].Reply.UploadFiles.url}" class="messageFile">` :
//                         (
//                           chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "file" ?
//                           `<img src="/images/download-file.png" class="messageFile">` :
//                           chat[i].Reply.message.substring(0, 50)
//                         )
//                       ) +
//                       `</span><br>
//                       <span class="opacityCls">${chat[i] && chat[i].Reply && chat[i].Reply.sender && chat[i].Reply.sender.first_name ? chat[i].Reply.sender.first_name + " " + chat[i].Reply.sender.last_name : ""  }</span>
//                       <span class="message-time pull-right opacityCls">${ReplyTime}</span>
//                       <hr>`
//                     ) : ""
//                   ) : ""
//                   }
//                   ${(!chat[i].message_deleted || chat[i].message_deleted == null) ? (chat[i].forwarded_from ? `<i class="fa fa-share f-message opacityCls"></i><br>` : "") : ""}
//                   ${!chat[i].message_deleted  || chat[i].message_deleted == null ? (chat[i].forwarded_from !=null ? `<i>${chat[i].message}</i>` : chat[i].message + (chat[i] && chat[i].is_edited ? `<span class="edited-msg"> (edited) </span>` : "")) : 'This message was deleted'}
//                   ${chat[i] &&!chat[i].message_deleted && chat[i].Originator && chat[i].Originator.first_name ? `<br><i class="f-originator">${chat[i].Originator.first_name + " " + chat[i].Originator.last_name}</i><br>`  : ""}
//                   </div>
//                   <span class="message-time pull-right">
//                   ${time}
//                   </span>
//                   <span class="forward-menu forwardUniid${chat[i].id}">
//                     ${!chat[i].message_deleted  || chat[i].message_deleted == null ?  `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${chat[i] && chat[i].id ? chat[i].id : ''}"></i></span>${chat[i]  && chat[i].UploadFiles && chat[i].UploadFiles.url ? `<span><a href="${chat[i].UploadFiles.url}" download ="${chat[i].UploadFiles.name}"><i class="fa fa-download comman-cls"></i></a><span>` : ''}` : ""}
//                   </span>
//               </div>
//                 </div>
//               </div>`;
//         } else {
//           if(chat[i].from != loggedInUserId && chat[i].room_id){
//             if(temp == chat[i].from){
//               username = "";
//             }
//             previousMessag += `
//             <div class="row message-body forward-selected${chat[i].id}">
//             ${(!chat[i].message_deleted || chat[i].message_deleted == null) ?
//             `<div class=" col-sm-1 forward-check-div checkBoxDiv${chat[i].id}" style="display:none">
//             <input type="checkbox" class="forward-message delete-check comman-cls" originator="${chat[i] && chat[i].sender && chat[i].sender.id ? chat[i].sender.id : 0}" value="${chat[i].id}"  name="forwardMessages" data-message = "${chat[i].upload_file_id ? '' : chat[i].plain_message}" upload-file = ${chat[i].upload_file_id} message-type="${chat[i].plain_message == 'image' || chat[i].plain_message == 'file' ? chat[i].plain_message : "text"}">
//             </div>` : ""}
//           <div class="col-sm-11 message-main-receiver">
//                 <div class="receiver" id="forwardUniid${chat[i].id}">
//                 ${username}
//                   <div class="message-text" data-message="${getMessage}">
//                   ${!chat[i].message_deleted || chat[i].message_deleted == null ? (
//                     chat[i].Reply && chat[i].Reply.message ? (
//                       `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].Reply.id}')" reply-parent-id="${chat[i].Reply.id}">` +
//                       (
//                         chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "image" ?
//                         `<img src="${chat[i].Reply.UploadFiles.url}" class="messageFile">` :
//                         (
//                           chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "file" ?
//                           `<img src="/images/download-file.png" class="messageFile">` :
//                           chat[i].Reply.message.substring(0, 50)
//                         )
//                       ) +
//                       `</span><br>
//                       <span class="opacityCls">${chat[i] && chat[i].Reply && chat[i].Reply.sender && chat[i].Reply.sender.first_name ? chat[i].Reply.sender.first_name + " " + chat[i].Reply.sender.last_name : ""  }</span>
//                       <span class="message-time pull-right opacityCls">${ReplyTime}</span>                        <hr>`
//                     ) : ""
//                   ) : ""}
//                   ${(!chat[i].message_deleted || chat[i].message_deleted == null) ? (chat[i].forwarded_from ? `<i class="fa fa-share f-message opacityCls"></i><br>` : "") : ""}
//                   ${!chat[i].message_deleted  || chat[i].message_deleted == null ? (chat[i].forwarded_from !=null ? `<i>${chat[i].message}</i>` : chat[i].message + (chat[i] && chat[i].is_edited ? `<span class="edited-msg"> (edited) </span>` : "")) : 'This message was deleted'}
//                   ${chat[i] &&!chat[i].message_deleted && chat[i].Originator && chat[i].Originator.first_name ? `<br><i class="f-originator">${chat[i].Originator.first_name+ " "+chat[i].Originator.last_name}</i><br>`  : ""}

//                   </div>
//                   <span class="message-time pull-right">
//                   ${time}
//                   </span>
//                   <span class="forward-menu forwardUniid${chat[i].id}">
//                     ${!chat[i].message_deleted  || chat[i].message_deleted == null ?  `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${chat[i] && chat[i].id ? chat[i].id : ''}"></i></span>${chat[i]  && chat[i].UploadFiles && chat[i].UploadFiles.url ? `<span><a href="${chat[i].UploadFiles.url}" download ="${chat[i].UploadFiles.name}"><i class="fa fa-download comman-cls"></i></a><span>` : ''}` : ""}
//                   </span>
//                 </div>
//               </div>
//             </div>`;
//             temp = chat[i].from;
//           }else{
//             previousMessag += `
//             <div class="row message-body forward-selected${chat[i].id}">
//             ${(!chat[i].message_deleted || chat[i].message_deleted == null) ?
//             `<div class="col-sm-1 forward-check-div delete-check-div checkBoxDiv${chat[i].id}" style="display:none">
//                 <input type="checkbox" class="forward-message delete-check comman-cls" originator="${chat[i] && chat[i].sender && chat[i].sender.id ? chat[i].sender.id : 0}" value="${chat[i].id}" name="forwardMessages" data-message = "${chat[i].upload_file_id ? '' : chat[i].plain_message}" upload-file = ${chat[i].upload_file_id} message-type="${chat[i].plain_message == 'image' || chat[i].plain_message == 'file' ? chat[i].plain_message : "text"}">
//             </div>` : "" }
//               <div class="col-sm-11 message-main-sender">
//                 <div class="sender"  id="forwardUniid${chat[i].id}">
//                   <div class="message-text" data-message="${getMessage}">
//                   ${!chat[i].message_deleted || chat[i].message_deleted == null ? (
//                     chat[i].Reply && chat[i].Reply.message ? (
//                       `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].Reply.id}')" reply-parent-id="${chat[i].Reply.id}">` +
//                       (
//                         chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "image" ?
//                         `<img src="${chat[i].Reply.UploadFiles.url}" class="messageFile">` :
//                         (
//                           chat[i].Reply && chat[i].Reply.UploadFiles && chat[i].Reply.UploadFiles.url && chat[i].Reply.message == "file" ?
//                           `<img src="/images/download-file.png" class="messageFile">` :
//                           chat[i].Reply.message.substring(0, 50)
//                         )
//                       ) +
//                       `</span><br>
//                       <span class="opacityCls">${chat[i] && chat[i].Reply && chat[i].Reply.sender && chat[i].Reply.sender.first_name ? chat[i].Reply.sender.first_name + " " + chat[i].Reply.sender.last_name : ""  }</span>
//                       <span class="message-time pull-right opacityCls">${ReplyTime}</span>
//                       <hr>`
//                     ) : ""
//                   ) : ""
//                   }
//                   ${(!chat[i].message_deleted || chat[i].message_deleted == null) ? (chat[i].forwarded_from ? `<i class="fa fa-share f-message opacityCls"></i><br>` : "") : ""}
//                   ${!chat[i].message_deleted  || chat[i].message_deleted == null ? (chat[i].forwarded_from  != null? `<i>${chat[i].message}</i>` : chat[i].message  + (chat[i] && chat[i].is_edited ? `<span class="edited-msg"> (edited) </span>` : "")) : 'This message was deleted'}
//                   ${chat[i] &&!chat[i].message_deleted && chat[i].Originator && chat[i].Originator.first_name ? `<br><i class="f-originator">${chat[i].Originator.first_name + " " +chat[i].Originator.last_name}</i><br>`  : ""}
//                   </div>
//                   <span class="message-time pull-right">
//                   ${time}
//                   </span>
//                   <span class="forward-menu forwardUniid${chat[i].id}">
//                   ${!chat[i].message_deleted  || chat[i].message_deleted == null ?  `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${chat[i] && chat[i].id ? chat[i].id : ''}"></i></span><span><i class="fa fa-trash delete-message comman-cls" data-id="${chat[i] && chat[i].id ? chat[i].id : ''}"></i></span>${chat[i]  && chat[i].UploadFiles && chat[i].UploadFiles.url ? `<span><a href="${chat[i].UploadFiles.url}" download ="${chat[i].UploadFiles.name}"><i class="fa fa-download comman-cls"></i></a></span>` : ''}` : ""}
//                   ${(!chat[i].message_deleted  || chat[i].message_deleted == null) && !chat[i].upload_file_id && !chat[i].forwarded_from ? `<span><i class="fa fa-edit edit-message comman-cls" data-id="${chat[i] && chat[i].id ? chat[i].id : ''}"></i></span>` : ""}
//                 </span>
//                 </div>
//               </div>
//             </div>`;
//             temp = chat[i].from;
//           }
//         }
//       }
//     }
//     }
//   $("#conversation").prepend(showMoreMessageClone, previousMessag);
//   $('#comment').focus();
//   $('#conversation').animate({ scrollTop: 0 }, 0);
//   if(isForward){
//     $('.forward-check-div').show();
//   }
// }
// }

function addMongoChatMessage(chat, loggedInUserId, totalMessages) {
  let previousMessag = "";
  let showMoreMessageClone = "";
  let username = "";
  temp = 0;
  if (totalMessages && totalMessages <= 10) {
    $(".previousmessageclass").remove();
  } else {
    $(".previousmessageclass").css("display", "block");
    showMoreMessageClone = $(".previousmessageclass").clone();
    $(".previousmessageclass").remove();
  }
  if (chat && chat.length) {
    if (totalMessages && totalMessages > 10) {
      chat.shift();
    }
    for (const i in chat) {
      var date = new Date(chat[i].created_at);
      var Replydate = new Date(
        chat[i].parent_message
          ? chat[i].parent_message.created_at
          : chat[i].created_at
      );
      const ReplyTime = Replydate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      var getMessage = chat[i].message;
      currentConversationMembersArr.forEach((element) => {
        const tagUserName = `${element.first_name} ${element.last_name}`;
        const regex = new RegExp(`@${tagUserName}\\b`, "g");
        if (regex.test(getMessage)) {
          chat[i].message = getMessage.replace(
            regex,
            (match) => `<b>${match}</b>`
          );
        }
      });
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (
        $("#contact").attr("room-id") &&
        $("#contact").attr("room-id") != "0"
      ) {
        let color = getRandomColor();
        username = `<span ${color} class="userContact" data-id="${
          chat[i].sender ? chat[i].sender.user_id : ""
        }" name="${chat[i].sender ? chat[i].sender.first_name : ""}" profile="${
          chat[i] && chat[i].sender && chat[i].sender.profile
            ? chat[i].sender.profile
            : "/images/person-default.png"
        }">${chat[i].sender ? chat[i].sender.first_name : ""} </span>`;
      }
      if (
        chat[i].deleted_for == null ||
        !chat[i].deleted_for.includes(loggedInUserId)
      ) {
        if (chat[i].is_system_message) {
          previousMessag += `<div class="row message-body"><h4 class="system-message">${chat[i].message}</h4>
            </div>`;
        } else {
          let type = "text";
          chat[i].plain_message = chat[i].message.toString();
          if (
            chat[i].message.includes("jpeg") ||
            chat[i].message.includes("jpg") ||
            chat[i].message.includes("png")
          ) {
            type = "image";
            chat[
              i
            ].message = `<img src="${chat[i].message}" class="messageFile">`;
          } else {
            if (
              chat[i].message.includes("pdf") ||
              chat[i].message.includes("docx")
            ) {
              type = "file";
              chat[
                i
              ].message = `<a href="${chat[i].message}" target="_blank"><img src="/images/download-file.png" class="messageFile"></a>`;
            } else {
              chat[i].message = urlify(chat[i].message.toString());
            }
          }
          if (chat[i].user_id != loggedInUserId) {
            previousMessag += `
                <div class="row message-body forward-selected${chat[i]._id}">
                  ${
                    !chat[i].is_deleted || chat[i].is_deleted == null
                      ? `<div class="col-sm-1 forward-check-div checkBoxDiv${
                          chat[i]._id
                        }" style="display:none">
                      <input type="checkbox" class="forward-message comman-cls" originator="${
                        chat[i].forwarded_from
                          ? chat[i].forwarded_from
                          : chat[i].user_id
                      }" value="${
                          chat[i]._id
                        }"  name="forwardMessages" data-message = "${
                          !chat[i].upload_file_id ? chat[i].message : ""
                        }" upload-file = ${
                          chat[i].upload_file_id ? chat[i].upload_file_id : 0
                        } message-type="${
                          chat[i].message == "image" ||
                          chat[i].message == "file"
                            ? chat[i].message
                            : "text"
                        }"> 
                      </div>`
                      : ""
                  }
                    <div class="col-sm-11 message-main-receiver">
                      <div class="receiver"  id="forwardUniid${chat[i]._id}">
                        ${username} 
                        <div class="message-text" data-message="${getMessage}">
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].parent_message &&
                              chat[i].parent_message.message
                              ? `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].parent_message.id}')" reply-parent-id="${chat[i].parent_message.id}">` +
                                (chat[i].parent_message &&
                                (chat[i].parent_message.message.includes(
                                  "jpeg"
                                ) ||
                                  chat[i].parent_message.message.includes(
                                    "jpg"
                                  ) ||
                                  chat[i].parent_message.message.includes(
                                    "png"
                                  ))
                                  ? `<img src="${chat[i].parent_message.message}" class="messageFile">`
                                  : chat[i].parent_message &&
                                    (chat[i].parent_message.message.includes(
                                      "pdf"
                                    ) ||
                                      chat[i].parent_message.message.includes(
                                        "docx"
                                      ))
                                  ? `<img src="/images/download-file.png" class="messageFile">`
                                  : chat[i].parent_message.message.substring(
                                      0,
                                      50
                                    )) +
                                `</span><br>
                            <span class="opacityCls">${
                              chat[i] &&
                              chat[i].parent_message &&
                              chat[i].parent_message.sender &&
                              chat[i].parent_message.sender.first_name
                                ? chat[i].parent_message.sender.first_name +
                                  " " +
                                  chat[i].parent_message.sender.last_name
                                : ""
                            }</span>
                            <span class="message-time pull-right opacityCls">${ReplyTime}</span>
                            <hr>`
                              : ""
                            : ""
                        }
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].forwarded_from
                              ? `<i class="fa fa-share f-message opacityCls"></i><br>`
                              : ""
                            : ""
                        } 
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].forwarded_from != null
                              ? `<i>${chat[i].message}</i>`
                              : chat[i].message +
                                (chat[i] && chat[i].is_edited
                                  ? `<span class="edited-msg"> (edited) </span>`
                                  : "")
                            : "This message was deleted"
                        }
                        ${
                          chat[i] &&
                          !chat[i].is_deleted &&
                          chat[i].Originator &&
                          chat[i].Originator.first_name
                            ? `<br><i class="f-originator">${chat[i].Originator
                                .first_name +
                                " " +
                                chat[i].Originator.last_name}</i><br>`
                            : ""
                        }
                        </div>
                        <span class="message-time pull-right">
                        ${time}
                        </span>
                        <span class="forward-menu forwardUniid${chat[i]._id}">
                          ${
                            !chat[i].is_deleted || chat[i].is_deleted == null
                              ? `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                                  chat[i] && chat[i]._id ? chat[i]._id : ""
                                }"></i></span>${
                                  getMessage &&
                                  (getMessage.includes("jpeg") ||
                                    getMessage.includes("jpg") ||
                                    (getMessage.includes("png") &&
                                      getMessage.includes("pdf")) ||
                                    getMessage.includes("docx"))
                                    ? `<span><a href="${getMessage}" download><i class="fa fa-download comman-cls"></i></a><span>`
                                    : ""
                                }`
                              : ""
                          }
                        </span>
                    </div>
                      </div>
                    </div>`;
          } else {
            if (temp == chat[i].user_id) {
              username = "";
            }
            previousMessag += `
                  <div class="row message-body forward-selected${chat[i]._id}">
                  ${
                    !chat[i].is_deleted || chat[i].is_deleted == null
                      ? `<div class="col-sm-1 forward-check-div delete-check-div checkBoxDiv${
                          chat[i]._id
                        }" style="display:none"> 
                      <input type="checkbox" class="forward-message delete-check comman-cls" originator="${
                        chat[i].forwarded_from
                          ? chat[i].forwarded_from
                          : chat[i].user_id
                      }" value="${
                          chat[i].id
                        }" name="forwardMessages" data-message = "${
                          chat[i].upload_file_id ? "" : chat[i].plain_message
                        }" upload-file = ${
                          chat[i].upload_file_id
                        } message-type="${
                          chat[i].plain_message == "image" ||
                          chat[i].plain_message == "file"
                            ? chat[i].plain_message
                            : "text"
                        }">
                  </div>`
                      : ""
                  }
                    <div class="col-sm-11 message-main-sender">
                      <div class="sender"  id="forwardUniid${chat[i]._id}">
                        <div class="message-text" data-message="${getMessage}">
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].parent_message &&
                              chat[i].parent_message.message
                              ? `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].parent_message.id}')" reply-parent-id="${chat[i].parent_message.id}">` +
                                (chat[i].parent_message &&
                                (chat[i].parent_message.message.includes(
                                  "jpeg"
                                ) ||
                                  chat[i].parent_message.message.includes(
                                    "jpg"
                                  ) ||
                                  chat[i].parent_message.message.includes(
                                    "png"
                                  ))
                                  ? `<img src="${chat[i].parent_message.message}" class="messageFile">`
                                  : chat[i].parent_message &&
                                    (chat[i].parent_message.message.includes(
                                      "pdf"
                                    ) ||
                                      chat[i].parent_message.message.includes(
                                        "docx"
                                      ))
                                  ? `<img src="/images/download-file.png" class="messageFile">`
                                  : chat[i].parent_message.message.substring(
                                      0,
                                      50
                                    )) +
                                `</span><br>
                            <span class="opacityCls">${
                              chat[i] &&
                              chat[i].parent_message &&
                              chat[i].parent_message.sender &&
                              chat[i].parent_message.sender.first_name
                                ? chat[i].parent_message.sender.first_name +
                                  " " +
                                  chat[i].parent_message.sender.last_name
                                : ""
                            }</span>
                            <span class="message-time pull-right opacityCls">${ReplyTime}</span>                        
                            <hr>`
                              : ""
                            : ""
                        }
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].forwarded_from
                              ? `<i class="fa fa-share f-message opacityCls"></i><br>`
                              : ""
                            : ""
                        } 
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? chat[i].forwarded_from != null
                              ? `<i>${chat[i].message}</i>`
                              : chat[i].message +
                                (chat[i] && chat[i].is_edited
                                  ? `<span class="edited-msg"> (edited) </span>`
                                  : "")
                            : "This message was deleted"
                        }
                        ${
                          chat[i] &&
                          !chat[i].is_deleted &&
                          chat[i].Originator &&
                          chat[i].Originator.first_name
                            ? `<br><i class="f-originator">${chat[i].Originator
                                .first_name +
                                " " +
                                chat[i].Originator.last_name}</i><br>`
                            : ""
                        }
                        </div>
                        <span class="message-time pull-right">
                        ${time} 
                        </span>
                        <span class="forward-menu forwardUniid${chat[i]._id}">
                        ${
                          !chat[i].is_deleted || chat[i].is_deleted == null
                            ? `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                                chat[i] && chat[i]._id ? chat[i]._id : ""
                              }"></i></span>${
                                getMessage &&
                                (getMessage.includes("jpeg") ||
                                  getMessage.includes("jpg") ||
                                  (getMessage.includes("png") &&
                                    getMessage.includes("pdf")) ||
                                  getMessage.includes("docx"))
                                  ? `<span><a href="${getMessage}" download><i class="fa fa-download comman-cls"></i></a><span>`
                                  : ""
                              }`
                            : ""
                        }
                        ${
                          (!chat[i].is_deleted || chat[i].is_deleted == null) &&
                          !(
                            getMessage.includes("jpeg") ||
                            getMessage.includes("jpg") ||
                            getMessage.includes("png") ||
                            getMessage.includes("pdf") ||
                            getMessage.includes("docx")
                          ) &&
                          !chat[i].forwarded_from
                            ? `<span><i class="fa fa-edit edit-message comman-cls" data-id="${
                                chat[i] && chat[i]._id ? chat[i]._id : ""
                              }"></i></span>`
                            : ""
                        }
                      </span>
                      </div>
                    </div>
                  </div>`;
            temp = chat[i].user_id;
            //}
          }
        }
      }
    }
    $("#conversation").prepend(showMoreMessageClone, previousMessag);
    $("#comment").focus();
    $("#conversation").animate({ scrollTop: 0 }, 0);
    if (isForward) {
      $(".forward-check-div").show();
    }
  }
}

var currentConversationMembersArr = [];
document.addEventListener("DOMContentLoaded", function() {
  async function conversationTagList(event) {
    const input = event.target;

    while (tagList.firstChild) {
      tagList.removeChild(tagList.firstChild);
    }

    if (input.value.includes("@")) {
      if (currentConversationMembersArr.length > 0) {
        const users = currentConversationMembersArr
          .filter(
            (participant) => participant.user_id != $("#loggedInUserId").val()
          )
          .map(
            (participant) =>
              `${participant.first_name} ${participant.last_name}`
          );
        users.sort(function(a, b) {
          return a.localeCompare(b);
        });
        // Get all occurrences of "@" in the input value
        const atIndices = [];
        for (let i = 0; i < input.value.length; i++) {
          if (input.value[i] === "@") {
            atIndices.push(i);
          }
        }

        // Create list items for each "@" occurrence
        atIndices.forEach((atIndex) => {
          const query = input.value.substring(atIndex + 1);
          const filteredUsers = users.filter((user) => user.includes(query));

          filteredUsers.forEach((user, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = user;
            listItem.addEventListener("click", () => {
              const currentUsername = getCurrentUsername(input.value, atIndex);
              const replacedValue = input.value.replace(
                new RegExp(`@${currentUsername}(?!.*@${currentUsername})`),
                `@${user}`
              );
              input.value = replacedValue;
              tagList.style.display = "none";
            });
            tagList.appendChild(listItem);
            if (atIndex === input.selectionStart - 1 && index === 0) {
              listItem.classList.add("selected");
              selectedUserIndex = 0;
            }
          });
        });
        tagList.style.display = "block";
      } else {
        tagList.style.display = "none";
      }
    }
  }

  function handleKeyDown(event) {
    const listItems = tagList.getElementsByTagName("li");
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedUserIndex > 0) {
        listItems[selectedUserIndex].classList.remove("selected");
        selectedUserIndex--;
        listItems[selectedUserIndex].classList.add("selected");
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedUserIndex < listItems.length - 1) {
        listItems[selectedUserIndex].classList.remove("selected");
        selectedUserIndex++;
        listItems[selectedUserIndex].classList.add("selected");
      }
    } else if (event.key === "Enter" && selectedUserIndex > -1) {
      const input = document.querySelector(".tag-container");
      const selectedUser = listItems[selectedUserIndex].textContent;
      const currentUsername = getCurrentUsername(input.value);
      const replacedValue = input.value.replace(
        new RegExp(`@${currentUsername}`, "g"),
        `@${selectedUser}`
      );
      input.value = replacedValue;
      tagList.style.display = "none";
      event.preventDefault();
    }
  }

  function getCurrentUsername(inputValue, atIndex) {
    const matches = inputValue.match(/@(\w+)/g) || [];

    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      return lastMatch.slice(1);
    }
    return "";
  }

  document.addEventListener("input", function(event) {
    if (
      event.target.classList.contains("tag-container") &&
      event.target.tagName === "INPUT"
    ) {
      conversationTagList(event);
    }
  });

  document.addEventListener("keydown", function(event) {
    if (
      event.target.classList.contains("tag-container") &&
      event.target.tagName === "INPUT"
    ) {
      handleKeyDown(event);
    }
  });

  function getCurrentUsername(inputValue) {
    const matches = inputValue.match(/@(\w+)/g) || [];

    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      return lastMatch.slice(1);
    }
    return "";
  }
});

function displayMongoChat(
  profilePic,
  contact,
  chat,
  loggedInUserId,
  totalMessages,
  is_left
) {
  var clearChatFlag = 0;
  if (
    $("#contact").attr("room-id") &&
    Number($("#contact").attr("room-id")) !== 0
  ) {
    profilePic = profilePic ? profilePic : "/images/group-default.png";
  } else {
    profilePic = contact.img ? contact.img : "/images/person-default.png";
  }
  var username = "";
  temp = currentUserLeft = 0;
  const screen = $("#chat-screen").empty();
  const input = `<ul class="user-list1" id="conversationUserTagList"></ul>
    <div class="reply message-reply"><div id= "emoji-append"></div>
    <div class="reply-main reply-emojis reply-emojis-toggle">
    <div class="chat-bottom-wrapper"> 
    <i class="fa fa-smile-o fa-2x emojiSection"></i>
    <input type="text" class="form-control send-message-input tag-container" rows="1" id="comment" autocomplete="off" is_edit=0 is_reply = 0>
    <i class="fa fa-paperclip fa-2x uploadpeperClip" aria-hidden="true" onclick="performClick('chatUploadContent');"><input type="file" id="chatUploadContent" name="chatUploadImage" style="display:none" multiple>
    </i>
    <i class="fa fa-send fa-2x reply-emojis send-emoji" id="messsageSend" aria-hidden="true"></i>
    </div>
    </div>
    </div>
    <div class="row reply forward-reply" style="display:none">
      <div class="col-sm-4 col-xs-4 reply-emojis">
        <i class="fa fa-times fa-2x forward-message-count"> 0 Selected</i>
      </div>
      <div class="col-sm-6 col-xs-6 reply-main">
      <!-- <textarea class="form-control" rows="1" id="comment"></textarea> -->
      </div>
      <div class="col-sm-1 col-xs-1 reply-recording">
      <!-- <i class="fa fa-microphone fa-2x" aria-hidden="true"></i> -->
      </div>
      <div class="col-sm-1 col-xs-1 reply-send" id="forward-users">
      <i class="fa fa-share fa-2x" aria-hidden="true"></i>
      </div>
    </div>
    <div class="row reply delete-reply" style="display:none">
      <div class="col-sm-4 col-xs-4 reply-emojis">
        <i class="fa fa-times fa-2x delete-message-count"> 0 Selected</i>
      </div>
      <div class="col-sm-6 col-xs-6 reply-main">
      <!-- <textarea class="form-control" rows="1" id="comment"></textarea> -->
      </div>
      <div class="col-sm-1 col-xs-1 reply-recording">
      <!-- <i class="fa fa-microphone fa-2x" aria-hidden="true"></i> -->
      </div>
      <div class="col-sm-1 col-xs-1 reply-send" id="delete-messages">
      <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
      </div>
    </div>
    <div class="row reply single-reply" style="display:none">
      <div class="col-sm-4 col-xs-1 reply-emojis">
        <i class="fa fa-reply fa-2x"></i>
        <span class="reply-message-view"></span>
      </div>
      <div class="reply-send">
      <i class="fa fa-times fa-2x reply-cross" aria-hidden="true"></i>
      </div>
    </div>
    `;
  let blank_html = `<div class="heading">
    <div class="heading-wrapper">
      <div class="heading-avatar">
        <div class="heading-avatar-icon">
          <img src="${contact.img}" class="user-profile" icon-id =0>
        </div>
      </div>
      <div class="heading-name">
        <a class="heading-name-meta">${contact.name}
        </a>
        <span class="heading-online">Online</span>
      </div>
    </div>
      <div class="heading-dot pull-right">
      </div>
    </div>
    <div class="row message conversationClass" id="conversation">
    </div>
    `;

  let html = `<div class="heading">
    <div class="heading-wrapper">
      <div class="head-with-arrow">
        <div class="back-arrow"> 
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
        <div class="heading-avatar"> 
          <div class="heading-avatar-icon">
            <img src="${profilePic}" class="user-profile" icon-id = "0">
          </div>
        </div>
      </div>
      <div class="heading-name">
        <a class="heading-name-meta">${contact.name}
        </a>
        <span class="heading-online">Online</span>
      </div>
    </div>
    <div class="heading-dot  pull-right clear-chat">
      <i title="Clear Chat" class="fa-2x fa fa-trash pull-right clearChatIcn${
        contact.id
      } clearChatIcnDef" aria-hidden="true" style="${
    !chat ? "display:none" : ""
  }"></i>
      <i title="Archive Chat" class="fa-2x fa fa-archive pull-right archiveChatIcn${
        contact.id
      } archiveChatIcnDef" aria-hidden="true"></i>
      <i title="Unarchive Chat" class="fa-2x  fa fa-duotone pull-right fa-boxes-packing unarchiveChatIcn${
        contact.id
      } unarchiveChatIcnDef" aria-hidden="true"></i>
      <i title="Create Remainder" class="fa-2x fa fa-calendar-plus-o pull-right createRemainder" aria-hidden="true"></i>
      <div class="search-bar pull-right">
          <button id="toggle-search-button">
            <i class="fas fa-search" title="Search Messages"></i>
          </button>
          <input type="text" placeholder="Search messages" autocomplete="off" id="search-input">
          <div id="search-info">
            <span id="match-count"></span>
            <span id="match-position"></span>
            <button id="prev-button" disabled>
              <i class="fas fa-chevron-up"></i>
            </button>
            <button id="next-button" disabled>
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
    </div>
    </div>
    `;
  let loadMoreLink = "";

  if (totalMessages && totalMessages > 10) {
    chat.shift();
    loadMoreLink = `<div class="row message-previous previousmessageclass">
          <div class="col-sm-12 previous">
            <a  class="previousMessageLoad" data-id = "" onclick="loadMoreMessges()">
            Show Previous Message!
            </a>
            <div id="loadingDIV"><img src="/images/chat-loader.gif" alt="Iphone-spinner-2" border="0"></div>
          </div>
        </div>`;
  }
  if (chat && chat.length) {
    html +=
      `<div class="row message conversationClass" id="conversation">` +
      loadMoreLink;
    let forwardMessageType = "text";
    for (const i in chat) {
      var date = new Date(chat[i].created_at);
      var Replydate = new Date(
        chat[i].parent_message
          ? chat[i].parent_message.created_at
          : chat[i].created_at
      );
      var getMessage = chat[i].message;
      currentConversationMembersArr.forEach((element) => {
        const tagUserName = `${element.first_name} ${element.last_name}`;
        const regex = new RegExp(`@${tagUserName}\\b`, "g");
        if (regex.test(getMessage)) {
          chat[i].message = getMessage.replace(
            regex,
            (match) => `<b>${match}</b>`
          );
        }
      });

      if (
        $("#contact").attr("room-id") &&
        Number($("#contact").attr("room-id")) !== 0
      ) {
        let color = getRandomColor();
        username = `<span ${color} class="userContact" data-id="${
          chat[i].sender ? chat[i].sender.user_id : ""
        }" name="${chat[i].sender ? chat[i].sender.first_name : ""}" profile="${
          chat[i] && chat[i].sender && chat[i].sender.profile
            ? chat[i].sender.profile
            : "/images/person-default.png"
        }">${chat[i].sender ? chat[i].sender.first_name : ""} </span>`;
      }
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const ReplyTime = Replydate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (!currentUserLeft) {
        if (
          chat[i].deleted_for == null ||
          !chat[i].deleted_for.includes(loggedInUserId)
        ) {
          clearChatFlag = 0;
          if (
            chat[i].message.includes("jpeg") ||
            chat[i].message.includes("jpg") ||
            chat[i].message.includes("png")
          ) {
            forwardMessageType = "image";
            chat[
              i
            ].message = `<img src="${chat[i].message}" class="messageFile">`;
          } else {
            if (
              chat[i].message.includes("pdf") ||
              chat[i].message.includes("docx")
            ) {
              forwardMessageType = "file";
              chat[
                i
              ].message = `<a href="${getMessage}" target="_blank"><img src="/images/download-file.png" class="messageFile"></a>`;
            } else {
              chat[i].message = urlify(chat[i].message.toString());
            }
          }
          if (Boolean(chat[i].is_system_message)) {
            html += `<div class="row message-body"><h4 class="system-message">${chat[i].message}</h4>
              </div>`;
            temp = 0;
          } else {
            if (chat[i].user_id != loggedInUserId) {
              html += `
                <div class="row message-body forward-selected${chat[i]._id}">
                ${
                  !chat[i].is_deleted || chat[i].is_deleted == null
                    ? `<div class="col-sm-1 forward-check-div checkBoxDiv${
                        chat[i]._id
                      }" style="display:none">
                    <input type="checkbox" class="forward-message comman-cls" originator="${
                      chat[i].forwarded_from && chat[i].forwarded_from
                        ? chat[i].forwarded_from
                        : chat[i].user_id
                    }" value="${
                        chat[i]._id
                      }"  name="forwardMessages" data-message = "${
                        !chat[i].upload_file_id ? getMessage : ""
                      }" upload-file = ${
                        chat[i].upload_file_id ? chat[i].upload_file_id : 0
                      } message-type="${forwardMessageType}"> 
                    </div>`
                    : ""
                }
                  <div class="col-sm-11 message-main-receiver">
                    <div class="receiver"  id="forwardUniid${chat[i]._id}">
                      ${username} 
                      <div class="message-text" data-message="${getMessage}">
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].parent_message &&
                            chat[i].parent_message.message
                            ? `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].parent_message.id}')" reply-parent-id="${chat[i].parent_message.id}">` +
                              (chat[i].parent_message &&
                              (chat[i].parent_message.message.includes(
                                "jpeg"
                              ) ||
                                chat[i].parent_message.message.includes(
                                  "jpg"
                                ) ||
                                chat[i].parent_message.message.includes("png"))
                                ? `<img src="${chat[i].parent_message.message}" class="messageFile">`
                                : chat[i].parent_message &&
                                  (chat[i].parent_message.message.includes(
                                    "pdf"
                                  ) ||
                                    chat[i].parent_message.message.includes(
                                      "docx"
                                    ))
                                ? `<img src="/images/download-file.png" class="messageFile">`
                                : chat[i].parent_message.message.substring(
                                    0,
                                    50
                                  )) +
                              `</span><br>
                          <span class="opacityCls">${
                            chat[i] &&
                            chat[i].parent_message &&
                            chat[i].parent_message.sender &&
                            chat[i].Reply.sender.first_name
                              ? chat[i].parent_message.sender.first_name +
                                " " +
                                chat[i].parent_message.sender.last_name
                              : ""
                          }</span>
                          <span class="message-time pull-right opacityCls">${ReplyTime}</span>
                          <hr>`
                            : ""
                          : ""
                      }
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].forwarded_from
                            ? `<i class="fa fa-share f-message opacityCls"></i><br>`
                            : ""
                          : ""
                      } 
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].forwarded_from != null
                            ? `<i>${chat[i].message}</i>`
                            : chat[i].message +
                              (chat[i] && chat[i].is_edited
                                ? `<span class="edited-msg"> (edited) </span>`
                                : "")
                          : "This message was deleted"
                      }
                      ${
                        chat[i] &&
                        !chat[i].is_deleted &&
                        chat[i].Originator &&
                        chat[i].Originator.first_name
                          ? `<br><br><i class="f-originator">${chat[i]
                              .Originator.first_name +
                              " " +
                              chat[i].Originator.last_name}</i><br>`
                          : ""
                      }
                      </div>
                      <span class="message-time pull-right">
                      ${time} 
                      </span>
                      <span class="forward-menu forwardUniid${chat[i]._id}">
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                              chat[i] && chat[i]._id ? chat[i]._id : ""
                            }"></i></span>${
                              getMessage &&
                              (chat[i].message.includes("jpeg") ||
                                chat[i].message.includes("jpg") ||
                                (getMessage.includes("png") &&
                                  getMessage.includes("pdf")) ||
                                getMessage.includes("docx"))
                                ? `<span><a href="${getMessage}" download><i class="fa fa-download comman-cls"></i></a><span>`
                                : ""
                            }`
                          : ""
                      }
                      </span>
                  </div>
                    </div>
                  </div>`;
              temp = chat[i].user_id;
            } else {
              if (chat[i].user_id == loggedInUserId) {
                if (temp == chat[i].user_id) {
                  username = "";
                }
                html += `
                  <div class="row message-body forward-selected${chat[i]._id}">
                  ${
                    !chat[i].is_deleted || chat[i].is_deleted == null
                      ? `<div class="col-sm-1 forward-check-div delete-check-div checkBoxDiv${
                          chat[i]._id
                        }" style="display:none">
                        <input type="checkbox" class="forward-message delete-check comman-cls" originator="${
                          chat[i].forwarded_from &&
                          chat[i].forwarded_from.user_id
                            ? chat[i].forwarded_from
                            : chat[i].user_id
                        }" value="${
                          chat[i]._id
                        }" name="forwardMessages" data-message = "${
                          !chat[i].upload_file_id ? getMessage : ""
                        }" upload-file = ${
                          chat[i].upload_file_id ? chat[i].upload_file_id : 0
                        } message-type="${forwardMessageType}">
                    </div>`
                      : ""
                  }
                    <div class="col-sm-11 message-main-sender">
                    <div class="sender"  id="forwardUniid${chat[i]._id}">      
                      <div class="message-text" data-message="${getMessage}">
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].parent_message &&
                            chat[i].parent_message.message
                            ? `<i class="fa fa-reply r-message"></i> <br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${chat[i].parent_message.id}')" reply-parent-id="${chat[i].parent_message.id}">` +
                              (chat[i].parent_message &&
                              (chat[i].parent_message.message.includes(
                                "jpeg"
                              ) ||
                                chat[i].parent_message.message.includes(
                                  "jpg"
                                ) ||
                                chat[i].parent_message.message.includes("png"))
                                ? `<img src="${chat[i].parent_message.message}" class="messageFile">`
                                : chat[i].parent_message &&
                                  (chat[i].parent_message.message.includes(
                                    "pdf"
                                  ) ||
                                    chat[i].parent_message.message.includes(
                                      "docx"
                                    ))
                                ? `<img src="/images/download-file.png" class="messageFile">`
                                : chat[i].parent_message.message.substring(
                                    0,
                                    50
                                  )) +
                              `</span><br>
                          <span class="opacityCls">${
                            chat[i] &&
                            chat[i].parent_message &&
                            chat[i].parent_message.sender &&
                            chat[i].parent_message.sender.first_name
                              ? chat[i].parent_message.sender.first_name +
                                " " +
                                chat[i].parent_message.sender.last_name
                              : ""
                          }</span>
                          <span class="message-time pull-right opacityCls">${ReplyTime}</span>
                          <hr>`
                            : ""
                          : ""
                      }
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].forwarded_from
                            ? `<i class="fa fa-share f-message opacityCls"></i><br>`
                            : ""
                          : ""
                      } 
                      ${
                        !chat[i].is_deleted || chat[i].is_deleted == null
                          ? chat[i].forwarded_from != null
                            ? `<i>${chat[i].message}</i>`
                            : chat[i].message +
                              (chat[i] && chat[i].is_edited
                                ? `<span class="edited-msg"> (edited) </span>`
                                : "")
                          : "This message was deleted"
                      }
                      ${
                        chat[i] &&
                        !chat[i].is_deleted &&
                        chat[i].Originator &&
                        chat[i].Originator.first_name
                          ? `<br><i class="f-originator">${chat[i].Originator
                              .first_name +
                              " " +
                              chat[i].Originator.last_name}</i><br>`
                          : ""
                      }
                      </div>
                          <span class="message-time pull-right">
                          ${time} 
                          </span>
                          <span class="forward-menu forwardUniid${chat[i]._id}">
                          ${
                            !chat[i].is_deleted || chat[i].is_deleted == null
                              ? `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                                  chat[i] && chat[i]._id ? chat[i]._id : ""
                                }"></i></span>${
                                  getMessage &&
                                  (getMessage.includes("jpeg") ||
                                    getMessage.includes("jpg") ||
                                    (getMessage.includes("png") &&
                                      getMessage.includes("pdf")) ||
                                    getMessage.includes("docx"))
                                    ? `<span><a href="${getMessage}" download><i class="fa fa-download comman-cls"></i></a><span>`
                                    : ""
                                }`
                              : ""
                          }
                          ${
                            !chat[i].is_deleted || chat[i].is_deleted == null
                              ? `<span><i class="fa fa-trash delete-message comman-cls" data-id="${
                                  chat[i] && chat[i]._id ? chat[i]._id : ""
                                }"></i><span>`
                              : ""
                          }
                          ${
                            (!chat[i].is_deleted ||
                              chat[i].is_deleted == null) &&
                            !(
                              getMessage.includes("jpeg") ||
                              getMessage.includes("jpg") ||
                              getMessage.includes("png") ||
                                getMessage.includes("pdf") ||
                              getMessage.includes("docx")
                            ) &&
                            !chat[i].forwarded_from
                              ? `<span><i class="fa fa-edit edit-message comman-cls" data-id="${
                                  chat[i] && chat[i]._id ? chat[i]._id : ""
                                }"></i></span>`
                              : ""
                          }
                        </span>
                        </div>
                    </div>
                  </div>`;
                temp = chat[i].user_id;
              }
              temp = chat[i].user_id;
            }
          }
        } else {
          clearChatFlag = 1;
        }
      }
      if (is_left && chat[i].is_system_message) {
        currentUserLeft =
          (chat[i].message.indexOf("left") > -1 &&
            chat[i].user_id == loggedInUserId) ||
          chat[i].message.indexOf("removed") > -1
            ? 1
            : 0;
      }
    }
    html += `</div>`;
    $("#chat-screen").prepend(html + input);
    if (clearChatFlag) {
      $(`.clearChatIcn${contact.id}, .previousmessageclass`).hide();
    }
    if (is_left && is_left != null) {
      $(".message-reply, .leave-group").hide();
    }
    if (currentUserLeft) {
      $(".message-reply").attr("left-user", 1);
    }
    $(".conversation").show();
    $("#conversation").animate(
      { scrollTop: $("#conversation").prop("scrollHeight") },
      500
    );
  } else {
    $("#chat-screen").html(blank_html + input);
    $(".conversation").show();
    $("#conversation").animate(
      { scrollTop: $("#conversation").prop("scrollHeight") },
      500
    );
  }
  $("#comment").focus();
  isForward = isDelete = isReply = isEdit = 0;
  tagList = document.getElementById("conversationUserTagList"); // User list element
}

var selectedUserIndex = -1; // Track the currently selected user index
var tagList = ""; // User list element for tag in message
var offsetCount = 0; //message offset
async function loadMoreMessges() {
  if (isDelete) {
    $(".delete-check-div").show();
  }
  let offset = offsetCount++;
  offset = Number(offset) + Number(1);
  $(".previousMessageLoad").attr("data-id", offset);
  const id = $("#conversationId").val();
  var contactObj = {
    id,
    name: $("#contact").attr("data-name"),
    img: $(".contact-list > .sideBar-avatar > .avatar-icon > img").attr("src"),
  };
  const loggedInUserId = $("#loggedInUserId").val();
  await getChatData(loggedInUserId, contactObj, offset);
}

async function appendReceiverMessage(msg) {
  var contact = $("#contact").val();
  var loggedInUserId = $("#loggedInUserId").val();
  var sender = "";
  var roomId = $("#contact").attr("room-id")
    ? $("#contact").attr("room-id")
    : 0;
  if (msg && msg.room_id && msg.room_id != 0) {
    username = `<b>${msg.username}:</b>`;
    msg.sendFrom = msg.room_id;
    sender = msg.sender;
    let color = getRandomColor();
    sender = `<span ${color} class="userContact" data-id="${
      msg && msg.sender && msg.sender.user_id ? msg.sender.user_id : 0
    }" name="${
      msg && msg.sender && msg.sender.first_name && msg.sender.last_name
        ? msg.sender.first_name + " " + msg.sender.last_name
        : ""
    }" profile="${
      msg && msg.sender && msg.sender.profile
        ? msg.sender.profile
        : "/images/person-default.png"
    }">${msg.sender.first_name} ${msg.sender.last_name}</span>`;
  }
  if (!msg.leftUser && msg.leftUser == undefined) {
    if (
      msg.sendFrom &&
      msg.sendFrom == contact &&
      loggedInUserId != msg.username &&
      msg.to == loggedInUserId
    ) {
      await newMessageHtml(msg, sender, contact, loggedInUserId);
    } else {
      if (
        msg.sendFrom &&
        msg.sendFrom == contact &&
        loggedInUserId != msg.username &&
        !msg.to
      ) {
        await newMessageHtml(msg, sender, contact, loggedInUserId);
      }
    }
    if (roomId && roomId == msg.room_id) {
      $(".message-reply").show();
      $(".chat-delete").hide();
    }
  } else {
    if (
      msg.sendFrom &&
      msg.sendFrom == contact &&
      loggedInUserId == msg.username &&
      msg.to == loggedInUserId
    ) {
      await newMessageHtml(msg, sender, contact, loggedInUserId);
    } else {
      if (roomId && msg.room_id == roomId) {
        await newMessageHtml(msg, sender, contact, loggedInUserId);
      }
    }
    if (loggedInUserId == msg.username && roomId == msg.room_id) {
      $(".message-reply").hide();
      $(".chat-delete").show();
    }
  }
  if (
    (msg.to == contact && loggedInUserId == msg.sendFrom) ||
    (msg.room_id == roomId && msg.username == loggedInUserId)
  ) {
    await appendSenderMessage(msg);
  }

  if (!msg.refresh && msg.refresh != 0) {
    socketManager.emitEvent("refresh-chat", {
      loggedUserId: loggedInUserId,
      timeZone: timeZone,
    });
  }
}

function appendSenderMessage(msg) {
  let contactDel = msg.room_id ? msg.room_id : msg.sendFrom;
  var loggedInUserId = $("#loggedInUserId").val();
  $(document)
    .find(`.clearChatIcn${contactDel}, .clearChatIcnDef`)
    .show();
  var date = new Date();
  var Replydate = new Date(
    msg.parent_message ? msg.parent_message.created_at : msg.created_at
  );
  const ReplyTime = Replydate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  var getMessage = msg.orignalMsg ? msg.orignalMsg : msg.message;
  currentConversationMembersArr.forEach((element) => {
    const tagUserName = `${element.first_name} ${element.last_name}`;
    const regex = new RegExp(`@${tagUserName}\\b`, "g");
    if (regex.test(getMessage)) {
      msg.message = getMessage.replace(regex, (match) => `<b>${match}</b>`);
    }
  });
  let data = "";
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  if (msg.is_system_msg && msg.is_system_msg != null) {
    data += `<div class="row message-body"><h4 class="system-message">${msg.message}</h4>
      </div>`;
  } else {
    if (msg && !msg.file) {
      msg.message = urlify(msg.message.toString());
    } else {
      if (
        msg.message.includes("jpeg") ||
        msg.message.includes("jpg") ||
        msg.message.includes("png")
      ) {
        msg.message = `<img src="${msg.message}" class="messageFile">`;
      } else {
        if (msg.message.includes("pdf") || msg.message.includes("docx")) {
          type = "file";
          msg.message = `<a href="${msg.message}" target="_blank"><img src="/images/download-file.png" class="messageFile"></a>`;
        }
      }
    }

    data += `<div class="row message-body forward-selected${msg.id}">
      ${
        !msg.is_deleted || msg.is_deleted == null
          ? `<div class="col-sm-1 forward-check-div delete-check-div checkBoxDiv${
              msg.id
            }" style = ${!isDelete || !isForward ? "display:none" : ""}>
              <input type="checkbox" class="forward-message delete-check comman-cls" originator="${
                msg.sendFrom
              }" value="${msg.id}"  name="forwardMessages" data-message = "${
              msg != null && msg.upload_file_id ? "" : getMessage
            }" upload-file = ${
              msg != null && msg.upload_file_id ? msg.upload_file_id : 0
            } message-type="${
              (msg != null && msg.orignalMsg == "image") ||
              (msg != null && msg.orignalMsg == "file")
                ? msg.orignalMsg
                : "text"
            }">
          </div>`
          : ""
      }
        <div class="col-sm-11 message-main-sender">
          <div class="sender"  id="forwardUniid${msg.id}">
            <div class="message-text" data-message="${getMessage}">
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? msg.parent_message && msg.parent_message.message
                  ? `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${msg.parent_message.id}')" reply-parent-id="${msg.parent_message.id}">` +
                    (msg.parent_message &&
                    (msg.parent_message.message.includes("jpeg") ||
                      msg.parent_message.message.includes("jpg") ||
                      msg.parent_message.message.includes("png"))
                      ? `<img src="${msg.parent_message.message}" class="messageFile">`
                      : msg.parent_message &&
                        (msg.parent_message.message.includes("pdf") ||
                          msg.parent_message.message.includes("docx"))
                      ? `<img src="/images/download-file.png" class="messageFile">`
                      : msg.parent_message.message.substring(0, 50)) +
                    `</span><br>
                <span class="opacityCls">${
                  msg &&
                  msg.parent_message &&
                  msg.parent_message.sender &&
                  msg.parent_message.sender.first_name
                    ? msg.parent_message.sender.first_name +
                      " " +
                      msg.parent_message.sender.last_name
                    : ""
                }</span>
                <span class="message-time pull-right opacityCls">${ReplyTime}</span>
                <hr>`
                  : ""
                : ""
            }
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? msg.message +
                  (msg && msg.is_edited
                    ? `<span class="edited-msg"> (edited) </span>`
                    : "")
                : "This message was deleted"
            }
            </div>
            <span class="message-time pull-right">
              ${time}
            </span>
            <span class="forward-menu forwardUniid${msg.id}">
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? `<span><i class=" forward-btn fa fa-share"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                    msg && msg.id ? msg.id : ""
                  }"></i></span>`
                : ""
            }
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? `<span><i class="fa fa-trash delete-message comman-cls" data-id="${
                    msg && msg.id ? msg.id : ""
                  }"></i><span>`
                : ""
            }
            ${
              (!msg.is_deleted || msg.is_deleted == null) &&
              !(
                getMessage.includes("jpeg") ||
                getMessage.includes("jpg") ||
                getMessage.includes("png") || 
                getMessage.includes("pdf") ||
                getMessage.includes("docx")
              ) &&
              !msg.forwarded_from
                ? `<span><i class="fa fa-edit edit-message comman-cls" data-id="${
                    msg && msg._id ? msg._id : ""
                  }"></i></span>`
                : ""
            }
            ${
              msg != null && msg.url
                ? `<span><a href="${getMessage}" download ="${msg.name}"><i class="fa fa-download comman-cls"></i></a><span>`
                : ""
            }
            </span>
          </div>
        </div>
      </div>`;
    temp = 0;
  }
  $("#conversation").append(data);
  if (isReply) {
    $(".uploadpeperClip").show();
  }
  !$("#conversationId").val() ? $("#conversationId").val(msg && msg.conversationId ? msg.conversationId : 0) : "";
  isReply = isEdit = isForward = isDelete = 0;
  socketManager.emitEvent("refresh-chat", {
    loggedUserId: loggedInUserId,
    timeZone: timeZone,
  });
}

function newMessageHtml(msg, sender, contact, loggedInUserId) {
  let contactDel = msg.room_id ? msg.room_id : msg.sendFrom;
  $(document)
    .find(`.clearChatIcn${contactDel}, .clearChatIcnDef`)
    .show();
  var date = new Date();
  var Replydate = new Date(
    msg.parent_message ? msg.parent_message.created_at : msg.created_at
  );
  const ReplyTime = Replydate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  var getMessage = msg.orignalMsg ? msg.orignalMsg : msg.message;
  currentConversationMembersArr.forEach((element) => {
    const tagUserName = `${element.first_name} ${element.last_name}`;
    const regex = new RegExp(`@${tagUserName}\\b`, "g");
    if (regex.test(getMessage)) {
      msg.message = getMessage.replace(regex, (match) => `<b>${match}</b>`);
    }
  });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let data = "";
  msg.plainMessage = msg.message;
  if (msg.is_system_msg) {
    data += `<div class="row message-body"><h4 class="system-message">${msg.message}</h4>
      </div>`;
    temp = 0;
  } else {
    if (temp == msg.username) {
      sender = "";
    }
    if (msg && !msg.file) {
      msg.message = urlify(msg.message.toString());
    } else {
      if (
        msg.message.includes("jpeg") ||
        msg.message.includes("jpg") ||
        msg.message.includes("png")
      ) {
        msg.message = `<img src="${msg.message}" class="messageFile">`;
      } else {
        if (msg.message.includes("pdf") || msg.message.includes("docx")) {
          type = "file";
          msg.message = `<a href="${msg.message}" target="_blank"><img src="/images/download-file.png" class="messageFile"></a>`;
        }
      }
    }
    data += `<div class="row message-body forward-selected${msg.id}">
        ${
          !msg.is_deleted || msg.is_deleted == null
            ? `<div class=" col-sm-1 forward-check-div checkBoxDiv${
                msg.id
              }" style="display:none">
          <input type="checkbox" class="forward-message comman-cls" originator="${
            msg.username
          }" value="${msg.id}"  name="forwardMessages" data-message = "${
                msg.upload_file_id == null ? msg.plainMessage : ""
              }" upload-file = ${
                msg.upload_file_id != null ? msg.upload_file_id : 0
              } message-type="${msg.type}">
          </div>`
            : ""
        }
        <div class="col-sm-11 message-main-receiver">
          <div class="receiver" id="forwardUniid${msg.id}">
            ${sender}
            <div class="message-text" data-message="${getMessage}">
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? msg.parent_message && msg.parent_message.message
                  ? `<i class="fa fa-reply r-message"></i><br><span class="reply-parent" onclick="scrollToMessage('forwardUniid${msg.parent_message.id}')" reply-parent-id="${msg.parent_message.id}">` +
                    (msg.parent_message &&
                    (msg.parent_message.message.includes("jpeg") ||
                      msg.parent_message.message.includes("jpg") ||
                      msg.parent_message.message.includes("png"))
                      ? `<img src="${msg.parent_message.message}" class="messageFile">`
                      : msg.parent_message &&
                        (msg.parent_message.message.includes("pdf") ||
                          msg.parent_message.message.includes("docx"))
                      ? `<img src="/images/download-file.png" class="messageFile">`
                      : msg.parent_message.message.substring(0, 50)) +
                    `</span><br>
                <span class="opacityCls">${
                  msg &&
                  msg.parent_message &&
                  msg.parent_message.sender &&
                  msg.parent_message.sender.first_name
                    ? msg.parent_message.sender.first_name +
                      " " +
                      msg.parent_message.sender.last_name
                    : ""
                }</span>
                <span class="message-time  pull-right opacityCls">${ReplyTime}</span>
                <hr>`
                  : ""
                : ""
            }

            ${
              !msg.is_deleted || msg.is_deleted == null
                ? msg.forwarded && msg.forwarded_from
                  ? `<i class="fa fa-share f-message opacityCls"></i><br>`
                  : ""
                : ""
            } 
            ${
              !msg.is_deleted || msg.is_deleted == null
                ? msg.forwarded_from
                  ? `<i>${msg.message}</i>`
                  : msg.message +
                    (msg && msg.is_edited
                      ? `<span class="edited-msg"> (edited) </span>`
                      : "")
                : "This message was deleted"
            }
              ${
                msg && !msg.is_deleted && msg.originator
                  ? `<br><i class="f-originator">${msg.originator}</i><br>`
                  : ""
              }
            </div>
            <span class="message-time pull-right">
              ${time}
            </span>
            <span class="forward-menu forwardUniid${msg.id}">
              ${
                !msg.is_deleted || msg.is_deleted == null
                  ? `<span><i class=" forward-btn fa fa-share comman-cls"></i></span><span><i class="fa fa-reply reply-to-message comman-cls" data-id="${
                      msg && msg.id ? msg.id : ""
                    }"></i></span>`
                  : ""
              }
              ${
                msg && msg.url
                  ? `<span><a href="${getMessage}" download ="${msg.name}"><i class="fa fa-download comman-cls"></i></a><span>`
                  : ""
              }
            </span>
          </div>
        </div>
      </div>`;
    temp = msg.username;
  }
  if (!$("#new-message").length && !window_focus) {
    const newMessage = `<h4 class="text-center" id="new-message">New Messages</h4>`;
    $("#conversation").append(newMessage);
  }
  $("#conversation").append(data);
}

async function refreshChat(contactUsers) {
  var contact = $("#contact").val();
  var loggedInUserId = $("#loggedInUserId").val();
  let html = "";
  $(".chat-list").empty();
  if (contactUsers && contactUsers.length > 0) {
    for (var i = 0; i < contactUsers.length; i++) {
      var contactUser = contactUsers[i];
      if (contactUser && contactUser.is_archived === false) {
        var profilePic = contactUser.group_id
          ? contactUser.icon
            ? contactUser.icon
            : "/images/group-default.png"
          : contactUser.contactIcon
          ? contactUser.contactIcon
          : "/images/person-default.png";
        var roomName = contactUser.roomName || contactUser.contactName;
        var roomId = contactUser.group_id && contactUser.group_id !=="null" ?  contactUser.group_id : 0;
        var messagePreview = contactUser.latestMessage.message;
        var isMessageDeleted =
          contactUser.latestMessage.is_deleted === null ||
          contactUser.latestMessage.is_deleted === undefined;
        var messageContent = contactUser.latestMessage.deleted_for.includes(
          loggedInUserId
        )
          ? ""
          : !isMessageDeleted
          ? contactUser.latestMessage.message.replace(
              /<\/?a(?:\s+[^>]+)?>/g,
              ""
            )
          : "This message was deleted";
        var messageDate =
          contactUser.latestMessage.deleted_for === null ||
          !contactUser.latestMessage.deleted_for.includes(loggedInUserId)
            ? contactUser.latestMessage.created_at
            : "";
        html += `<div class="sideBar-body contact-list" last-unread-id="${
          contactUser._id
        }" is_read="${contactUser.is_read ? 1 : 0}" contact-id="${
          contactUser.contactId
        }" room-name="${roomName}" room-id="${
          roomId
        }" onclick="fetchContact('${
          roomId ? contactUser._id : contactUser.contactId
        }', '${roomId}', '${
          contactUser._id
        }')"
            id="${contactUser.contactId}" name="${
          contactUser.contactName
        }" profile="">
            <div class="sideBar-avatar">
              <div class="avatar-icon">
                <img class="contactProfile${
                  contactUsers[i].contactId
                }" src="${profilePic}">
              </div>
            </div>
            <div class="sideBar-main">
              <div class="sidebar-name-wrapper">
                <div class="sideBar-name">
                  <span class="name-meta">${contactUser.contactName}</span>
                  <span class="time-meta previewMsg" contact-id="${
                    contactUser.contactId
                  }">
                    ${
                      !contactUser.is_left && messagePreview && !contactUser.latestMessage.is_deleted  &&
                      (contactUser.latestMessage.deleted_for === null ||
                        !contactUser.latestMessage.deleted_for.includes(
                          loggedInUserId
                        ))
                        ? messageContent
                        : !contactUser.is_left ? "This message was deleted." : ""
                    }
                  </span>
                </div>
                <div class="sideBar-time">
                  <span class="time-meta msgDate" contact-id="${
                    !contactUser.is_left ? 
                    contactUser.contactId : ""
                  }">
                    ${messageDate}
                  </span>
                  ${
                    !contactUser.is_left && contactUser.unread
                      ? `<span class="time-meta read-message${
                          contactUser._id
                        } ${
                          contactUser.unread &&
                          contactUser.user_id != loggedInUserId
                            ? "unread-msg"
                            : "read-msg"
                        }" contact-id="${contactUser.contactId}">
                        <span class="unread-count">${contactUser.unread}</span>
                    </span>`
                      : ""
                  } 
                </div>
              </div>
            </div>
          </div>`;
      }
    }
  }
  $(".chat-list").append(html);
}

function performClick(elemId) {
  var elem = document.getElementById(elemId);
  elem.click(function() {});
}

//send image and files
$(document).on("change", "#chatUploadContent", function() {
  let loggedInUserId = $("#loggedInUserId").val();
  var file_data = this.files;
  if (file_data.length <= 5) {
    var formData = new FormData();
    for (var i = 0; i < file_data.length; i++) {
      var file = file_data[i];
      formData.append("chatUploadImage", file);
    }
    formData.append("loggedInUserId", $("#loggedInUserId").val());
    formData.append("conversationId", $("#conversationId").val());
    formData.append("contact", $("#contact").val());
    formData.append("room_id", $("#contact").attr("room-id"));
    $.ajax({
      url: "/admin/message/upload/image",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(dataArray, textStatus, jqXHR) {
        if (dataArray.length > 0) {
          let msg = "";
          for (let data of dataArray) {
            if (
              $("#contact").attr("room-id") &&
              $("#contact").attr("room-id") != null &&
              Number($("#contact").attr("room-id")) != 0
            ) {
              socketManager.emitEvent("chat", {
                username: loggedInUserId,
                message: data.message,
                roomname: $("#contact").attr("room-id"),
                url: data.url,
                type: data.type,
                sendFiletoRoom: true,
                fileName: data.name,
                fileUrl: data.url,
                fileType: data.mime,
              });
            } else {
              let getRoomId = $("#contact").attr("room-id");
              let formData;
              if (getRoomId && getRoomId != 0) {
                formData = {
                  from: loggedInUserId,
                  to: null,
                  message,
                  room_id: getRoomId,
                };
              } else {
                formData = {
                  from: loggedInUserId,
                  to: $("#contact").val(),
                  message: data.message,
                  url: msg,
                  type: data.type,
                  sendFileToPvt: true,
                  fileName: data.name,
                  fileUrl: data.url,
                  fileType: data.mime,
                };
              }
              socketManager.emitEvent("private-message", formData);
            }
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
      },
    });
  } else {
    alert("Selected file lessthan 5");
  }
});

//upload group icon
$(document).on("change", ".group_permission", function() {
  let loggedInUserId = $("#loggedInUserId").val();
  var file_data = $('input[name="group-icon"]').prop("files")[0];
  var file_extension = file_data.type
    .split("/")
    .pop()
    .toLowerCase();
  if (
    file_extension === "jpeg" ||
    file_extension === "jpg" ||
    file_extension === "png"
  ) {
    var formData = new FormData();
    formData.append("icon", file_data);
    formData.append("icon_id", $(this).attr("icon-id"));
    formData.append("loggedInUserId", $("#loggedInUserId").val());
    // formData.append('room_id', $("#contact").attr('room-id'));
    formData.append("conversationId", $("#conversationId").val());

    $.ajax({
      url: "/admin/message/upload/group/icon",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(dataArray, textStatus, jqXHR) {
        if (dataArray) {
          $(".userAccountProfile").attr({ src: dataArray.icon });
          $(".group_permission").attr("icon-id", dataArray.id);
          $(
            `.contact-list[room-id=${$("#contact").attr(
              "room-id"
            )}] > .sideBar-avatar > .avatar-icon > img, .user-profile`
          ).attr("src", dataArray.icon);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
      },
    });
  } else {
    alert("Please upload JPEG, PNG, JPG");
  }
});

//delete message
$(document).on("click", ".delete-message", function() {
  $(`.delete-check`).prop("checked", false);
  let messageId = $(this).attr("data-id");
  $(".delete-check-div, .delete-reply").show();
  $(".single-reply").hide();
  isDelete = 1;
  $(".message-reply, .forward-menu").hide();
});

$(document).on("click", ".delete-message-count", function(event) {
  $(`.delete-check`).prop("checked", false);
  $(".delete-message-count").text(
    `${$(".delete-check:checked").length} Selected`
  );
  $(".delete-reply, .delete-check-div").hide();
  $(`.message-body, .message-main-receiver, .message-main-sender`).removeClass(
    "selected-forward-style"
  );
  $(".message-reply").show();
  isDelete = 0;
});

$(document).on("click", ".delete-check", function() {
  if (isDelete) {
    if ($(".delete-check:checked").length > 0) {
      $(".delete-message-count").text(
        `${$(".delete-check:checked").length} Selected`
      );
      $(".delete-reply").show();
      $(".message-reply, .forward-reply").hide();
    } else {
      $(".delete-message-count").text(
        `${$(".forward-message:checked").length} Selected`
      );
    }
    let deleremessageVal = $(this).val();
    if ($(this).prop("checked")) {
      $(`.forward-selected${deleremessageVal}`).addClass(
        "selected-forward-style"
      );
    } else {
      $(`.forward-selected${deleremessageVal}`).removeClass(
        "selected-forward-style"
      );
    }
  }
});
var deleteMessagesIds = [];
$(document).on("click", "#delete-messages", function() {
  deleteMessagesIds.length = 0;
  const conversationId = $("#conversationId").val();
  if ($(".delete-check:checked").length > 0) {
    $.each($(".delete-check:checked"), async function() {
      deleteMessagesIds.push($(this).val());
    });
  }
  if (deleteMessagesIds.length > 0) {
    if (confirm("Are you sure you want to delete messages??")) {
      socketManager.emitEvent("delete-messages", {
        conversationId: conversationId,
        username: $("#loggedInUserId").val(),
        ids: deleteMessagesIds,
        contact: $("#contact").val(),
        roomId: $("#contact").attr("room-id"),
      });
      for (let messageId of deleteMessagesIds) {
        if ($(`#forwardUniid${messageId}`).length) {
          $(`#forwardUniid${messageId} > .message-text`).text(
            "This message was deleted."
          );
          $(`.forwardUniid${messageId}, .checkBoxDiv${messageId}`).remove();
        }
      }
      $(".message-body").removeClass("selected-forward-style");
      $(`.delete-check`).prop("checked", false);
      $(".delete-check-div, .delete-reply").hide();
      $(".message-reply").show();
      isDelete = 0;
    }
  }
});

var isReply = 0;
$(document).on("click", ".reply-cross", function() {
  $(".single-reply").hide();
  $(".uploadpeperClip").show();
  $(".comment").attr("is_reply", 0);
  isReply = 0;
});

$(document).on("click", ".reply-to-message", function() {
  $("#comment").attr({
    is_edit: 0,
  });
  $("#comment").val("");
  $(".single-reply").show();
  let messageId = $(this).attr("data-id");
  let previousMessage = $(`#forwardUniid${messageId} > .message-text`).attr(
    "data-message"
  );
  previousMessage &&
        (previousMessage.includes("jpeg") ||
        previousMessage.includes("jpg") ||
        previousMessage.includes("png"))
          ? `<img src="${previousMessage}" class="messageFile">`
          : previousMessage &&
            (previousMessage.includes("pdf") ||
            previousMessage.includes("docx"))
          ? `<img src="/images/download-file.png" class="messageFile"><hr>${previousMessage}`
          : previousMessage
  if ( previousMessage &&
    (previousMessage.includes("jpeg") ||
    previousMessage.includes("jpg") ||
    previousMessage.includes("png")) || previousMessage &&
    (previousMessage.includes("pdf") ||
    previousMessage.includes("docx")) ) {

    previousMessage = previousMessage &&
    (previousMessage.includes("jpeg") ||
    previousMessage.includes("jpg") ||
    previousMessage.includes("png"))
      ? `<img src="${previousMessage}" class="messageFile">`
      : previousMessage &&
        (previousMessage.includes("pdf") ||
        previousMessage.includes("docx"))
      ? `<img src="/images/download-file.png" class="messageFile"><hr>${previousMessage}`
      : previousMessage//$(`#forwardUniid${messageId} > .message-text`).html();
  }
  $(".reply-message-view").html(previousMessage.toLowerCase());
  $("#comment").attr("is_reply", messageId);
  $("#comment").focus();
  $(".uploadpeperClip, .forward-menu").hide();
  isReply = 1;
});
var isEdit = 0;
$(document).on("click", ".edit-message", function() {
  $("#comment").attr({
    is_reply: 0,
  });
  let messageId = $(this).attr("data-id");
  let previousMessage = "";
  previousMessage = $(`#forwardUniid${messageId} > .message-text`).attr(
    "data-message"
  );
  $("#comment").val($.trim(previousMessage));
  $("#comment").attr("is_edit", messageId);
  $(".single-reply, .forward-menu").hide();
  isEdit = 1;
});

async function deleteMessage(data) {
  for (let id of data.ids) {
    if (data.status) {
      var loggedInUserId = $("#loggedInUserId").val();
      if ($(`#forwardUniid${id}`).length) {
        $(`#forwardUniid${id} > .message-text`).text(
          "This message was deleted."
        );
        $(`.checkBoxDiv${id}`).remove();
      }
      socketManager.emitEvent("refresh-chat", {
        loggedUserId: loggedInUserId,
        timeZone: timeZone,
      });
    }
  }
}

async function scrollToMessage(id) {
  const messageElement = document.getElementById(id);
  if (messageElement) {
    messageElement.scrollIntoView({ behavior: "smooth" });
    messageElement.classList.add("highlight");
    setTimeout(() => {
      messageElement.classList.remove("highlight");
    }, 2000);
  }
}

async function editMessage(data) {
  if (data.is_edit) {
    if ($(`#forwardUniid${data.is_edit}`).length) {
      let UpdatedMessage =
        data.parent_message &&
        data.parent_message.message &&
        (data.parent_message.message.includes("jpeg") ||
          data.parent_message.message.includes("jpg") ||
          data.parent_message.message.includes("png"))
          ? `<img src="${data.parent_message.message}" class="messageFile"><hr>${data.message}`
          : data.parent_message &&
            data.parent_message.message &&
            (data.parent_message.message.includes("pdf") ||
              data.parent_message.message.includes("docx"))
          ? `<img src="/images/download-file.png" class="messageFile"><hr>${data.message}`
          : data.parent_message && data.parent_message.message
          ? data.parent_message.message.substring(0, 50) +
            `<hr>` +
            data.message +
            '<span class="edited-msg"> (edited)</span>'
          : data.message + '<span class="edited-msg"> (edited)</span>';
      $(`#forwardUniid${data.is_edit} > .message-text`).html(UpdatedMessage);
      $(`#forwardUniid${data.is_edit} > .message-text`).attr(
        "data-message",
        data.message
      );
    }
  }
  isEdit = 0;
}

async function readMessageFlag(data) {
  if (data) {
    $(`.read-message${data.id}`).hide();
    // $(`.contact-list[contact-id=${data.conatctIDAsRoom}]`).attr('is_read', 1);
  }
}

async function clearChat(data) {
  if (data.status) {
    $("#conversation").empty();
    if (
      $(`.contact-list[last-unread-id=${data.data.last_message_id}]`).length > 0
    ) {
      $(
        `.contact-list[last-unread-id=${data.data.last_message_id}] > .sideBar-main > .sidebar-name-wrapper > .sideBar-name > .previewMsg`
      ).empty();
      $(
        `.contact-list[last-unread-id=${data.data.last_message_id}] > .sideBar-main > .sidebar-name-wrapper > .sideBar-time > .msgDate`
      ).empty();
      $(`.clearChatIcnDef`).hide();
    }
  }
}

async function archiveChat(data) {
  if (data.status) {
    $(`.archiveChatIcnDef`).hide();
    $(`.unarchiveChatIcnDef`).show();
  }
}

// unarchive chat
async function unarchiveChat(data) {
  if (data.status) {
    $(`.unarchiveChatIcnDef`).hide();
    $(`.archiveChatIcnDef`).show();
  }
}

// SEND PRIVATE MESSAGE AND CALL PRIVATE-MESSAGE EMIT
async function messageSend(message, is_edit = 0, is_reply = 0) {
  var date = new Date();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  if (Number(is_edit) != 0) {
    $(`#forwardUniid${is_edit} > .message-text`).text(message);
  }
  $("#conversation").animate(
    { scrollTop: $("#conversation").prop("scrollHeight") },
    500
  );
  $("#comment").val("");
  const contact = $("#contact").val();
  let loggedInUserId = $("#loggedInUserId").val();
  loggedInUserId = contact == loggedInUserId ? 25 : loggedInUserId;
  var data = {
    message,
    from: loggedInUserId,
  };
  if (Number($("#contact").attr("room-id")) != 0) {
    socketManager.emitEvent("chat", {
      username: loggedInUserId,
      message: data.message,
      roomname: $("#contact").attr("room-id"),
      isEdit: is_edit,
      parent_msg_id: is_reply,
    });
    $(`#comment`).attr("is_edit", 0);
    $(`#comment`).attr("is_reply", 0);
  } else {
    let getRoomId = $("#contact").attr("room-id");
    let formData;
    if (getRoomId && getRoomId != 0) {
      formData = {
        from: loggedInUserId,
        to: null,
        message,
        room_id: getRoomId,
        type: "private",
      };
    } else {
      formData = {
        from: loggedInUserId,
        to: contact,
        message,
        isEdit: is_edit,
        parent_msg_id: is_reply,
        type: "private",
      };
    }
    socketManager.emitEvent("private-message", formData);
    $(document)
      .find(`.clearChatIcnDef`)
      .show();
    $(`#comment`).attr("is_edit", 0);
    $(`#comment`).attr("is_reply", 0);
  }
  $(".single-reply").hide();

  //prepend currently chat contact
  let checkExistContact =
    $(`.contact-list[contact-id=${contact}]`).attr("id") || 0;
  if (checkExistContact && $(".contact-list:eq(0)").attr("id") != contact) {
    let clone = $(`.contact-list[contact-id=${contact}]`).clone();
    $(`.contact-list[contact-id=${contact}]`).remove();
    $(".chat-list").prepend(clone);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#9FCF85";
  return `style="color:${color}"`;
}

function addParticipantAjax(
  newGroupMembers,
  conversationId,
  loggedInuser,
  room_id
) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/add-group-member",
      type: "POST",
      data: {
        conversationId: conversationId,
        groupUsers: newGroupMembers,
        loggedInUserId: loggedInuser,
        room_id: room_id,
      },
      success: function(data, textStatus, jqXHR) {
        let participants = (messageText = "");
        if (data && data.data) {
          for (var i of data.data) {
            participants += ` <li class="group-li${i.user_id}">
            <div class="member-avatar">
                <img src="${
                  i && i.profile ? i.profile : "/images/person-default.png"
                }" alt="Member Avatar">
            </div>
            <div class="member-info">
                <h4>${i.first_name}</h4>
                <p>Online</p>
            </div>
            <div>
                <label class="remove_btn  remove-group-member" current_user="0" room-id = "${room_id}" user-id="${
              i.user_id
            }" user-name="${i.first_name}" style="${
              $("#loggedInUserId").val() == i.user_id ? "display:none" : ""
            }">Remove</label>
            </div>
            </li>`;
            messageText +=
              $(`.new-group-member-li[data-id=${i.user_id}]`).attr(
                "user-name"
              ) + ",";
          }
          socketManager.emitEvent("new-group", {
            _id: conversationId,
            username: loggedInuser,
            message: `Admin has added member "${messageText}"`,
            roomname: room_id,
            group_members: newGroupMembers,
            addUser: 1,
          });
          $(".margine_grp_name").text($("#contact").attr("data-name"));
          $(".current-exist-ul").append(participants);
          $(".current-exist-members, .leave-group").show();
          $(".add-memebrs-on, .add-group").hide();
          $(".group-details-popup").toggle();
          $(".app-one").removeClass("app-one-blur");
          $("body").removeClass("popup-open");
          newGroupMembers.length = 0;
          isPopupOpen = 0;
          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

// REFRESH refreshArchivedContacts
async function refreshArchivedContacts() {
  // let loaderId = groupRef ? 'refreshGroupCon' : 'refreshLoad';
  return new Promise((resolve, reject) => {
    const loggedInUserId = $("#loggedInUserId").val();
    $.ajax({
      url: "/admin/message/contact-list",
      type: "POST",
      data: { loggedInUserId },
      beforeSend: function(xhr) {
        // $(`#${loaderId}`).show();
      },
      success: function(data, textStatus, jqXHR) {
        $(".archived-chat-list").html("");
        let html = "";
        const contactUsers = data.data;
        let message = "";
        let created_at;
        if (contactUsers && contactUsers.length > 0) {
          for (let i = 0; i < contactUsers.length; i++) {
            if (
              contactUsers &&
              contactUsers[i] &&
              contactUsers[i].archived_id
            ) {
              if (
                contactUsers[i].is_deleted == null ||
                !contactUsers[i].is_deleted.includes(loggedInUserId)
              ) {
                message =
                  !contactUsers[i].is_deleted ||
                  contactUsers[i].is_deleted == null
                    ? contactUsers[i].message.replace(
                        /<\/?a(?:\s+[^>]+)?>/g,
                        ""
                      )
                    : "This message was deleted";
              }

              if (
                contactUsers[i].is_deleted == null ||
                !contactUsers[i].is_deleted.includes(loggedInUserId)
              ) {
                created_at = contactUsers[i].new_created_at;
              }

              html += `<div class="sideBar-body contact-list" last-unread-id = "${
                contactUsers[i].id
              }" is_read="${contactUsers[i].is_read ? 1 : 0}" contact-id="${
                contactUsers[i].contactId
              }" room-name="${
                contactUsers[i].roomName
                  ? contactUsers[i].roomName
                  : contactUsers[i].contactName
              }" room-id="${
                contactUsers[i].room_id ? contactUsers[i].room_id : 0
              }" onclick="fetchContact('${contactUsers[i].contactId}', '${
                contactUsers[i].group_id ? contactUsers[i].contactId : 0
              }', '${contactUsers[i]._id}')" id="${
                contactUsers[i].contactId
              }" name="${contactUsers[i].contactName}" profile="">
                  <div class="sideBar-avatar">
                    <div class="avatar-icon">
                      <img src='${
                        contactUsers[i].room_id
                          ? contactUsers[i].profilePic
                            ? contactUsers[i].profilePic
                            : "/images/group-default.png"
                          : contactUsers[i].profilePic
                          ? contactUsers[i].profilePic
                          : "/images/person-default.png"
                      }'>
                    </div>
                  </div>
                  <div class="sideBar-main">
                    <div class="sidebar-name-wrapper">
                      <div class="sideBar-name">
                        <span class="name-meta">${
                          contactUsers[i].contactName
                        }</span>
                        <span class="time-meta previewMsg" contact-id="${
                          contactUsers[i].contactId
                        }">
                        ${message}
                        </span>                  
                      </div>
                      <div class="sideBar-time">
                        <span class="time-meta msgDate" contact-id="${
                          contactUsers[i].contactId
                        }">
                        ${created_at}
                        </span>
                        <span class="time-meta read-message${
                          contactUsers[i].id
                        } ${
                !contactUsers[i].is_read &&
                contactUsers[i].from != loggedInUserId
                  ? "unread-msg"
                  : "read-msg"
              }" contact-id="${contactUsers[i].contactId}">
                          <span class="unread-count">${
                            contactUsers[i].leftUse
                              ? ""
                              : contactUsers[i].unread
                          }</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>`;
            }
          }
        }

        resolve(data);
        $(".archived-chat-list").html(html);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

async function refreshArchivedContacts1(groupRef) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/contact-list",
      type: "POST",
      data: { loggedInUserId: $("#loggedInUserId").val() },
      beforeSend: function(xhr) {
        // $(`#${loaderId}`).show();
      },
      success: function(data, textStatus, jqXHR) {
        if (data && data.data && data.data.length) {
          for (let i = 0; i < data.data.length; i++) {}

          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

async function refreshDetails(groupRef) {
  let loaderId = groupRef ? "refreshGroupCon" : "refreshLoad";
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/vetUsers",
      type: "GET",
      beforeSend: function(xhr) {
        $(`#${loaderId}`).show();
      },
      success: function(data, textStatus, jqXHR) {
        let GroupData = data ? data.data : null;
        if (data && data.data && data.data.length) {
          let refreshContactList = "";
          let vetUsers = data.data;
          let groupRefcls = groupRef ? "new-group-cls" : "new_contact_person";
          for (let i = 0; i < vetUsers.length; i++) {
            groupRef
              ? `<div class="sideBar-time checkbox-container">
              <label class="time-meta pull-right">
                <input type="checkbox" class="group-contact-cls comman-cls" name="groupContact" value="${vetUsers[i].id}" id="groupContact${vetUsers[i].id}">
                <span class="checkmark"></span>
              </label>
            </div>`
              : `<div class="sideBar-time">
              <span class="time-meta pull-right">
              </span>
            </div>`;
            refreshContactList += ` <div class="sideBar-body ${groupRefcls} new_contact_person_or_grp" data-id="${
              vetUsers[i].id
            }" contact-id="${vetUsers[i].id}" name="${vetUsers[i].name}">
              <div class="sideBar-avatar">
                <div class="avatar-icon">
                  <img class="vet-img${vetUsers[i].id}" src='${
              vetUsers[i].profileImgPath
                ? vetUsers[i].profileImgPath
                : "/images/person-default.png"
            }'>
                </div>
              </div>
              <div class="sideBar-main">
                <div class="group-contact-row">
                  <div class="sideBar-name">
                    <span class="name-meta">${vetUsers[i].name}
                    </span>
                  </div>
                  ${
                    groupRef
                      ? `<div class="sideBar-time checkbox-container">
                  <label class="time-meta pull-right">
                    <input type="checkbox" class="group-contact-cls comman-cls" name="groupContact" value="${vetUsers[i].id}" id="groupContact${vetUsers[i].id}">
                    <span class="checkmark"></span>
                  </label>
                </div>`
                      : `<div class="sideBar-time">
                  <span class="time-meta pull-right">
                  </span>
                </div>`
                  }
                </div>
              </div>
            </div>`;
          }
          $(`#${loaderId}`).fadeOut(1000);
          if (groupRef) {
            $(".new-group-cls").remove();
            $(".create-group-body").after(refreshContactList);
          } else {
            $(".new-chat-f-pvt").html(refreshContactList);
          }
          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

async function refreshForwardDetails() {
  let loaderId = "refreshForwardCon";
  let contact = $("#contact").val();
  let room = $("#contact").attr("room-id");
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/get-group-contacts",
      type: "GET",
      beforeSend: function(xhr) {
        $(".refresh-chats").hide();
        $(`#${loaderId}`).show();
      },
      success: function(data, textStatus, jqXHR) {
        if (data) {
          let refreshContactList = "";
          let vetUsers = data.vetUsers;
          let rooms = data.rooms;
          for (let i = 0; i < vetUsers.length; i++) {
            refreshContactList += ` <li class="contact_forward" data-id=" ${
              vetUsers[i].id
            }" contact-id="${vetUsers[i].id}" name="${vetUsers[i].name}">
              <div class="member-avatar">
                  <img src='${
                    vetUsers[i].profileImgPath
                      ? vetUsers[i].profileImgPath
                      : "/images/person-default.png"
                  }' alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4 class="user-name forwardComman${vetUsers[i].id}">${
              vetUsers[i].name
            }</h4>
              </div>
              <div class="admin-add-member">
                <input type="checkbox" class="forward-msg-to comman-cls" room-id = 0 id="forwardComman${
                  vetUsers[i].id
                }" name="forwardMessageTo" value="${vetUsers[i].id}">
              </div>
          </li>`;
          }
          for (let i = 0; i < rooms.length; i++) {
            refreshContactList += ` <li class="contact_forward to_room_forward" room-id="${rooms[i].Room.id}" is-left=0>
              <div class="member-avatar">
                  <img src='/images/group-default.png' alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4 class="user-name forwardComman${rooms[i].Room.id}">${rooms[i].Room.name}</h4>
              </div>
              <div class="admin-add-member">
                <input type="checkbox" class="forward-msg-to comman-cls" room-id="${rooms[i].Room.id}" id="forwardComman${rooms[i].Room.id}" name="forwardMessageTo" value="${rooms[i].Room.id}">
              </div>
            </li>`;
          }
          $(`#${loaderId}`).fadeOut(1000);
          $(".forward-to-section").html(refreshContactList);
          $(`.contact_forward[contact-id=${contact}]`).hide();
          if (room && room != 0) {
            $(`.contact_forward[room-id=${room}]`).hide();
          } else {
            $(".to_room_forward").each(function(e) {
              if ($(this).attr("is-left") == "1") {
                $(this).hide();
              }
            });
          }
          $(".refresh-chats").show(1000);
          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

$(document).on("keypress", "#comment", async function(e) {
  $("#emoji-append").empty();
  picker = "";
  var key = e.which;
  let contact = $("#contact").val();
  if ($(`.contact-list[contact-id=${contact}]`).attr("is_read") == 0) {
    let unreadId = $(`.contact-list[contact-id=${contact}]`).attr(
      "last-unread-id"
    );
    $(`.read-message${unreadId}`).hide();
    socketManager.emitEvent("read-message", {
      id: unreadId,
      room: $("#contact").attr("room-id"),
      loggedInuser: $("#loggedInUserId").val(),
      conatctIDAsRoom: $(`.contact-list[contact-id=${contact}]`).attr(
        "contact-id"
      ),
    });
    $(`.contact-list[contact-id=${contact}]`).attr("is_read", 1);
  }
  if (key == 13 && $.trim($(this).val())) {
    // the enter key code
    const message = $.trim($(this).val());
    let is_edit = $("#comment").attr("is_edit")
      ? $("#comment").attr("is_edit")
      : 0;
    let is_reply = $("#comment").attr("is_reply")
      ? $("#comment").attr("is_reply")
      : 0;
    if (Number(is_edit) != 0) {
      await messageSend(message, $("#comment").attr("is_edit"));
    } else {
      if (Number(is_reply) != 0) {
        $("#comment").attr("placeholder", "");
        await messageSend(message, is_edit, is_reply);
      } else {
        await messageSend(message);
      }
    }
  }
});

$(document).on("click", "#messsageSend", async function() {
  if ($.trim($("#comment").val())) {
    const message = $.trim($("#comment").val());
    let is_edit = $("#comment").attr("is_edit")
      ? $("#comment").attr("is_edit")
      : 0;
    let is_reply = $("#comment").attr("is_reply")
      ? $("#comment").attr("is_reply")
      : 0;
    if (Number(is_edit)) {
      await messageSend(message, $("#comment").attr("is_edit"));
    } else {
      if (Number(is_reply)) {
        $("#comment").attr("placeholder", "");
        await messageSend(message, is_edit, is_reply);
      } else {
        await messageSend(message);
      }
    }
  }
  $("#comment").focus();
});

let picker = "";
$(document).on("click", ".emojiSection", function() {
  const input = document.querySelector("#comment");
  if (!picker) {
    // Create the picker
    picker = new EmojiMart.Picker({
      maxFrequentRows: 1,
      set: "google",
      onEmojiSelect: function(selectedEmoji) {
        var startPos = input.selectionStart;
        var endPos = input.selectionEnd;
        // Insert the emoji at the current cursor position
        var newValue =
          input.value.substring(0, startPos) +
          selectedEmoji.native +
          input.value.substring(endPos, input.value.length);
        // Set the new value of the input field
        input.value = newValue;
        // Set the cursor position after the inserted emoji
        input.selectionStart = startPos + selectedEmoji.native.length;
        input.selectionEnd = startPos + selectedEmoji.native.length;
      },
    });
    // Append the picker to the document body
    $("#emoji-append").append(picker);
  } else {
    $("#emoji-append").empty();
    picker = "";
  }
});

var isForward = 0;
var isDelete = 0;
$(document).on("click", ".forward-btn", function() {
  $(`.forward-message`).prop("checked", false);
  $(".single-reply").hide();
  isForward = 1;
  $(".message-reply, .forward-menu").hide();
  $(".forward-check-div, .forward-reply").show();
});

$(document).on("click", ".forward-message-count", function(event) {
  $(`.forward-message`).prop("checked", false);
  $(".forward-message-count").text(
    `${$(".forward-message:checked").length} Selected`
  );
  $(".forward-reply, .forward-check-div").hide();
  $(`.message-body, .message-main-receiver, .message-main-sender`).removeClass(
    "selected-forward-style"
  );
  $(".message-reply").show();
  isForward = 0;
});

var forwardMessages = [];
$(document).on("click", ".forward-message", function() {
  if (isForward) {
    if ($(".forward-message:checked").length > 0) {
      $(".forward-message-count").text(
        `${$(".forward-message:checked").length} Selected`
      );
      $(".forward-reply").show();
      $(".message-reply").hide();
    } else {
      $(".forward-message-count").text(
        `${$(".forward-message:checked").length} Selected`
      );
    }
    let forwardmessageVal = $(this).val();
    if ($(this).prop("checked")) {
      $(`.forward-selected${forwardmessageVal}`).addClass(
        "selected-forward-style"
      );
    } else {
      $(`.forward-selected${forwardmessageVal}`).removeClass(
        "selected-forward-style"
      );
    }
  }
});

const forwardPopup = document.querySelector(".forward-popup");
const searchInput = forwardPopup.querySelector(".search-input");
const userList = forwardPopup.querySelector(".user-list");

$(document).on("click", "#forward-users", function() {
  forwardMessages.length = 0;
  let contact = $("#contact").val();
  let room = $("#conversationId").val(); //$('#contact').attr('room-id');
  $(".forward-msg-to").attr("checked", false);
  if ($(".forward-message:checked").length > 0) {
    $.each($("input[name='forwardMessages']:checked"), async function() {
      let obj = {};
      obj["message"] = $(this).attr("data-message");
      obj["originator"] = $(this).attr("originator");
      forwardMessages.push(obj);
    });
    $(".app-one").addClass("app-one-blur");
    $("body").addClass("popup-open");
    isPopupOpen = 1;
    forwardPopup.style.display = "block";
    $(`.contact_forward[contact-id=${contact}]`).hide();
    if (room && room != 0) {
      $(`.contact_forward[room-id=${room}]`).hide();
    } else {
      $(".to_room_forward").each(function(e) {
        if ($(this).attr("is-left") == "1") {
          $(this).hide();
        }
      });
    }
  }
});

// Close the pop-up window when the Close button is clicked
$(document).on("click", ".forward-close-popup", function() {
  forwardPopup.style.display = "none";
  $(".app-one").removeClass("app-one-blur");
  $("body").removeClass("popup-open");
  isPopupOpen = 0;
  $(`.contact_forward`).show();
});

$(".user-popupcross").on("click", function() {
  $(
    ".group-details-popup, .add-memebrs-on, .add-participanton-group, .create-remainder-popup"
  ).hide();
  if ($(".leave-group").attr("left-status") == 1) {
    $(".leave-group").hide();
  } else {
    $(".leave-group").show();
  }
  $(".app-one").removeClass("app-one-blur");
  $("body").removeClass("popup-open");
  isPopupOpen = 0;
});

// Close the pop-up window when the user clicks outside of it
window.addEventListener("click", function(event) {
  if (event.target === forwardPopup) {
    forwardPopup.style.display = "none";
    $(".app-one").removeClass("app-one-blur");
    $("body").removeClass("popup-open");
    isPopupOpen = 0;
  }
});

//super admin click issue soluction
$(`.navbar-custom-menu > .navbar-nav > .user-menu > .btn-group `).on(
  "click",
  function() {
    const currentURL = window.location.href;
    if (currentURL.includes("chat")) {
      $(this).addClass("open");
    }
  }
);

// Handle search input
searchInput.addEventListener("input", function() {
  const searchText = searchInput.value.toLowerCase();
  const userItems = userList.querySelectorAll(".contact_forward");
  let contact = $("#contact").val();
  let room = $("#contact").attr("room-id");
  for (let i = 0; i < userItems.length; i++) {
    const userName = userItems[i]
      .querySelector(".user-name")
      .textContent.toLowerCase();
    if (userName.includes(searchText)) {
      if (userItems[i].getAttribute("is-left") == "1") {
        userItems[i].style.display = "none";
      } else {
        if (room && room != 0) {
          if (userItems[i].getAttribute("room-id") == room) {
            $(`.contact_forward[room-id=${room}]`).hide();
          } else {
            userItems[i].style.display = "flex";
          }
        } else {
          $(`.contact_forward[contact-id=${contact}]`).hide();
          if (userItems[i].getAttribute("contact-id") == contact) {
            userItems[i].style.display = "none";
          } else {
            userItems[i].style.display = "flex";
          }
        }
      }
    } else {
      userItems[i].style.display = "none";
    }
  }
});

$(document).on(
  "mouseleave",
  ".message-main-sender>.sender,.message-main-receiver>.receiver",
  function() {
    $(".forward-menu").hide();
  }
);

var currentGroupMembers = [];
var isPopupOpen = 0;
$(document).on("click", ".heading-name-meta", function(e) {
  isPopupOpen = 1;
  GroupNameBYClick = $(this).text();
  $(".group-details-popup, .new-group-member-li").show();
  $(".app-one").addClass("app-one-blur");
  $("body").addClass("popup-open");
  let conversationId = $("#conversationId").val();
  const roomID = $("#contact").attr("room-id");
  const roomName = $("#contact").attr("data-name");
  if (roomID == undefined || roomID == 0) {
    $(".user-image-inpt").prop("disabled", true);
    $(".user-profile-camera, user-image-inpt").hide();
    $("#preview").show();
  } else {
    $(".user-image-inpt").prop("disabled", false);
  }
  $(".userAccountProfile").attr(
    "src",
    $(".user-profile").attr("src")
      ? $(".user-profile").attr("src")
      : $("#preview").hide()
  );
  $(".group_permission").attr("icon-id", $(".user-profile").attr("icon-id"));
  let currentUserAdmin = (cuurentUserLeft = 0);
  if (roomID && roomID != 0) {
    $(".group-add-remv-btn, .current-exist-members").show();
    $(
      ".add-participantgroup, .add-participanton-group, .add-memebrs-on"
    ).hide();
    $.ajax({
      url: `/admin/message/group-memebers/${conversationId}`,
      type: "GET",
      beforeSend: function(xhr) {
        $(".current-exist-ul").hide();
        $("#groupLoader").show();
      },
      success: function(data, textStatus, jqXHR) {
        let GroupData = data ? data.data : null;
        let participants = "";
        if (data && data.data.length > 0) {
          for (var i of data.data) {
            if (
              $.inArray(i.user_id, currentGroupMembers) == -1 &&
              i.is_deleted != 1
            ) {
              currentGroupMembers.push(i.user_id);
              $(`.new-group-member-li[data-id=${i.user_id}]`).hide();
            }
            participants += ` <li class="group-li${i.user_id}" style=${
              i.is_deleted ? "display:none" : ""
            }>
              <div class="member-avatar">
                  <img src="${
                    i && i.profile ? i.profile : "/images/person-default.png"
                  }" alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4>${
                    i && i.first_name && i.last_name
                      ? i.first_name + " " + i.last_name
                      : ""
                  }</h4>
                  <p>${i && i.is_room_admin ? "Admin" : ""}</p>
              </div>
              <div class="admin-remove-member">
                <label class="remove_btn  remove-group-member" current_user="0" room-id = "${roomID}" user-id="${
              i.user_id
            }" user-name="${i.first_name}" style="${
              $("#loggedInUserId").val() == i.users_id ? "display:none" : ""
            }">Remove</label>
              </div>
              </li>`;

            if ($("#loggedInUserId").val() == i.user_id && i.is_room_admin) {
              currentUserAdmin = 1;
              $(".group_permission").attr("admin", 1);
            } else {
              $(".group_permission").attr("admin", 0);
            }
            if ($("#loggedInUserId").val() == i.user_id && i.is_deleted) {
              cuurentUserLeft = 1;
            }
          }
          $(".margine_grp_name").text(roomName);
          $(".margine_grp_name").text(GroupNameBYClick);
          $(".current-exist-ul").empty();
          $(".current-exist-ul").append(participants);
          if (!currentUserAdmin) {
            $(".add-participantgroup, .admin-remove-member").hide();
            $(".user-image-inpt").prop("disabled", true);
            $(".user-profile-camera, user-image-inpt").hide();
          } else {
            $(".add-participantgroup, .admin-remove-member").show();
            $(".user-image-inpt").prop("disabled", false);
            $(".user-profile-camera, user-image-inpt").show();
            $(
              `.remove-group-member[user-id="${$("#loggedInUserId").val()}"]`
            ).hide();
          }
          if (cuurentUserLeft) {
            $(".leave-group").attr("left-status", 1);
            $(".leave-group").hide();
            $(".chat-delete").show();
          } else {
            $(".leave-group").show();
            $(".chat-delete").hide();
          }
          $("#groupLoader").fadeOut(1000);
          $(".current-exist-ul").show();
        } else {
          alert("Something went to wrong");
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        //reject("ERROR");
      },
    });
    currentGroupMembers = [];
  } else {
    $(".margine_grp_name").text($(this).text());
    $(".group-add-remv-btn, .group-members, .delete-group").hide();
  }
});

$(document).on("click", ".leave-group, .remove-group-member", function() {
  let roomId = (userId = leaveLoggedIn = 0);
  let leaveMessage = (confrimMessage = "");
  let loggedInUserId = $("#loggedInUserId").val();
  const conversationId = $("#conversationId").val();
  if ($(this).attr("current_user") != 0) {
    roomId = $("#contact").val();
    userId = $("#loggedInUserId").val();
    userName = $("#loggedInUserId").attr("user-name");
    leaveLoggedIn = 1;
    leaveMessage = `"${userName}" has left the chat`;
    confrimMessage = "Are you sure you want to Exit group??";
  } else {
    roomId = $(this).attr("room-id");
    userId = $(this).attr("user-id");
    userName = $(this).attr("user-name");
    leaveMessage = `Admin has removed member "${userName}".`;
    confrimMessage = `Remove "${userName}" from group?.`;
  }
  let groupId = $("#contact").attr("data-name");
  if (confirm(`${confrimMessage}`) == true) {
    $(this).attr("current_user") != 0
      ? $(`.contact_forward[room-id=${roomId}]`).attr("is-left", 1)
      : "";
    $.ajax({
      url: `/admin/message/leave-group/${conversationId}/${userId}`,
      type: "GET",
      // data: formData,
      success: function(data, textStatus, jqXHR) {
        let leaveUser = data ? data.data : null;
        if (data) {
          socketManager.emitEvent("leave-group", {
            _id: conversationId,
            room: groupId,
            roomid: roomId,
            leaveuser: userId,
            userName: userName,
            leaveMessage: leaveMessage,
            loggedInUserId: loggedInUserId,
          });
          if (leaveLoggedIn) {
            $(".message-reply").hide();
            $(".chat-delete").show();
          }
          $(`.group-li${userId}`)
            .remove()
            .fadeIn("slow");
          $(".group-details-popup").toggle();
          $(".app-one").removeClass("app-one-blur");
          $("body").removeClass("popup-open");
          isPopupOpen = 0;
        } else {
          alert("Try again later");
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        //reject("ERROR");
      },
    });
  }
});

$(document).on("click", ".add-participantgroup", function() {
  $(".current-exist-members, .leave-group, .add-participantgroup").hide();
  $(".add-memebrs-on, .add-group").show();
  $(".add-member-on-grp").attr("checked", false);
});

$(document).on("click", ".add-participanton-group", async function() {
  let newGroupMembers = [];
  const conversationId = $("#conversationId").val();
  $.each($("input[name='addParticipant']:checked"), function() {
    if (newGroupMembers.indexOf($(this).val()) === -1) {
      newGroupMembers.push($(this).val());
    }
  });
  if (newGroupMembers.length) {
    await addParticipantAjax(
      newGroupMembers,
      conversationId,
      $("#loggedInUserId").val(),
      $("#contact").attr("room-id")
    );
  } else {
    alert("Please select User");
  }
});

$(document).on(
  "mousemove",
  ".message-main-sender>.sender, .message-main-receiver>.receiver",
  function() {
    if (!isForward && !isReply && !isDelete && !isEdit) {
      let forwardpopClass = $(this).attr("id");
      $(".forward-menu").hide();
      $(`.${forwardpopClass}`).show();
    }
  }
);

$(".app-one").on("click", function(event) {
  // Check if the popup is open
  if (isPopupOpen) {
    event.preventDefault();
    event.stopPropagation();
    $(".group-details-popup, .forward-popup, .create-remainder-popup").hide();
    $(".app-one").removeClass("app-one-blur");
    $("body").removeClass("popup-open");
  } else {
    $(".app-one").removeClass("app-one-blur");
    $("body").removeClass("popup-open");
  }
  isPopupOpen = 0;
});
//chat delete for room
$(document).on("click", ".chat-delete", function() {
  const userId = $("#loggedInUserId").val();
  const roomId = $("#contact").attr("room-id");
  if (confirm("Are you sure you want to delete group??")) {
    $.ajax({
      url: `/admin/message/chat/delete/${roomId}/${userId}`,
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        if (data.data) {
          $(".group-details-popup").hide();
          $(".app-one").removeClass("app-one-blur");
          $("body").removeClass("popup-open");
          let checkExistContact = $(
            `.contact-list[room-id=${roomId}]`
          ).remove();
          if ($(".contact-list").length > 0) {
            // $('.contact-list:first').click();
          } else {
            $(".newConatctChat").show();
            $("#conversation, #chat-screen>.heading").empty();
            $("#conversation").append(
              '<div class="startChatDiv"><h1>Welcome To Vetpass</h1></div>'
            );
          }
          isPopupOpen = 0;
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
      },
    });
  }
});

$(document).on("keydown", function(event) {
  if (event.which === 27) {
    if (isPopupOpen) {
      $(".group-details-popup, .forward-popup").hide();
      $(".app-one").removeClass("app-one-blur");
      $("body").removeClass("popup-open");
    }
    if (picker) {
      $("#emoji-append").empty();
    }
  }
});

//index page scripts..
function fetchContact(id, roomId, conversationId = null) {
  roomId = roomId ? roomId : 0;
  $("#contact").val(id);
  $("#contact").attr("room-id", roomId);
  $("#conversationId").val(conversationId);
}

async function createGroup(groupMembers, groupName, loggedInUserId) {
  groupMembers.push(loggedInUserId);
  const formData = {
    members: groupMembers,
    name: groupName,
    loggedUser: loggedInUserId,
    message: `Admin create group "${groupName}"`,
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/create-group",
      type: "POST",
      data: formData,
      success: function(data, textStatus, jqXHR) {
        let GroupData = data ? data.data : null;
        if (data && data.data) {
          let roomID = data.data.group_id;
          socketManager.emitEvent("new-group", {
            _id: data.data._id,
            username: loggedInUserId,
            message: `Admin create group "${groupName}"`,
            roomname: data.data.group_id,
            group_members: groupMembers,
          });
          $(".forward-popup>.user-list")
            .append(`<li class="contact_forward to_room_forward" contact-id="${data.data.group_id}" room-id="${data.data.group_id}" is-left = 0>
              <div class="member-avatar">
                  <img src="/images/group-default.png" alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4 class="user-name forwardComman2">${data.data.group_name}</h4>
              </div>
              <div class="admin-add-member">
                <input type="checkbox" class="forward-msg-to comman-cls" room-id="${data.data._id}" id="forwardComman${data.data._id}" name="forwardMessageTo" value="${data.data._id}">
              </div>
          </li>`);
          userMapping.push({ [roomID]: data.data._id.toLocaleLowerCase() });
          $(".side-two").css({
            left: "-100%",
          });
          $(".create-group-body").hide();
          $(".group-contact, .refresh-chats").show();
          $(".group-contact-cls").attr("checked", false);
          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

async function createGroupPri(groupMembers, groupName, loggedInUserId) {
  const formData = {
    members: groupMembers,
    name: groupName,
    loggedUser: loggedInUserId,
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/create-group",
      type: "POST",
      data: formData,
      success: function(data, textStatus, jqXHR) {
        let GroupData = data ? data.data : null;
        if (data && data.data) {
          let roomID = data.data.id;
          socketManager.emitEvent("new-group", {
            username: loggedInUserId,
            message: `Admin create group "${data.data.name}"`,
            roomname: data.data.group_id,
            group_members: groupMembers,
          });
          $(".forward-popup>.user-list")
            .append(`<li class="contact_forward to_room_forward" contact-id="${data.data.id}" room-id="${data.data.id}" is-left = 0>
              <div class="member-avatar">
                  <img src="/images/group-default.png" alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4 class="user-name forwardComman2">${data.data.name}</h4>
                  <p>Online</p>
              </div>
              <div class="admin-add-member">
                <input type="checkbox" class="forward-msg-to comman-cls" room-id="${data.data.id}" id="forwardComman${data.data.id}" name="forwardMessageTo" value="${data.data.id}">
              </div>
          </li>`);
          userMapping.push({ [roomID]: data.data.name.toLocaleLowerCase() });
          $(".side-two").css({
            left: "-100%",
          });
          $(".create-group-body").hide();
          $(".group-contact, .refresh-chats").show();
          $(".group-contact-cls").attr("checked", false);
          resolve(data);
        } else {
          alert("Something went to wrong");
          resolve(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}

function forwardMessageAjax(
  forwardMessageToUser,
  forwardMessageTogroups,
  loggedInuser,
  sender
) {
  socketManager.emitEvent("forward-message", {
    toUsers: forwardMessageToUser,
    groups: forwardMessageTogroups,
    messages: forwardMessages,
    loggedInUserId: loggedInuser,
    sender: sender,
    is_app_forward: false,
  });
  $(".forward-popup,.forward-check-div, .forward-reply").hide();
  if ($(".message-reply").attr("left-user")) {
    $(".message-reply").hide();
  } else {
    $(".message-reply").show();
  }
  $(".message-body").removeClass("selected-forward-style");
  $(".app-one").removeClass("app-one-blur");
  $("body").removeClass("popup-open");
  isPopupOpen = 0;
}

$(document).on("keyup", "#searchContact, #SearchFavoritesOwner, #SearchNewContact", function() {
  var toSearch = $(this)
    .val()
    .toLowerCase();
  let contactS =
    $(this).attr("data-id") === "contact" ? userMapping : $(this).attr("data-id") === "favoritesOwners" ? favoritesOwners : newUserMapping;
  let contactClass =
    $(this).attr("data-id") === "contact"
      ? "contact-list"
      : $(this).attr("data-id") === "favoritesOwners" ? "favorites-owners" :  "new_contact_person_or_grp";
  let mainContainClass =
    $(this).attr("data-id") === "contact" ? "chat-list" : "compose-sideBar";
  const filteredData = contactS.filter((obj) => {
    const values = Object.values(obj);
    return values.some((val) => val.includes(toSearch));
  });
  $(`.${contactClass}`).each(function(e) {
    let contact = $(this).attr("contact-id");
    if (!filteredData.some((obj) => Object.keys(obj).includes(contact))) {
      $(this).hide();
      if (!filteredData.length && !$(".no_user_found").length) {
        $(`.${mainContainClass}`).append(
          '<div class="no_user_found">No results founds</div>'
        );
      }
    } else {
      $(this).show();
      if ($(`.${mainContainClass}`).children("no_user_found"))
        $(".no_user_found").remove();
    }
  });
});

$(document).on("click", ".contact-list", function() {
  $(".contact-list").removeClass("active");
  $(this).addClass("active");
  const isRead = $(this).attr("is_read");
  if (isRead == 0) {
    const room = $(this).attr("room-id") ? $(this).attr("room-id") : 0;
    socketManager.emitEvent("read-message", {
      id: $(this).attr("last-unread-id"),
      loggedInuser: $("#loggedInUserId"),
    });
  }
});

var groupMembers = [];
$(document).on("click", "#nextPhase", function() {
  $.each($("input[name='groupContact']:checked"), function() {
    if (groupMembers.indexOf($(this).val()) === -1) {
      groupMembers.push($(this).val());
    }
  });
  if (groupMembers.length) {
    $("#groupName").val("");
    $("#groupName").show();
    $(
      ".group-contact,.group-first-phase, .create-group-search, .refresh-chats"
    ).hide();
    $(".group-second-phase").show();
  }
});

$(document).on("click", "input[name='groupContact']", function() {
  if ($(".group-contact-cls:checked").length) {
    $(".create-group-body, .group-first-phase, .create-group-search").show();
  } else {
    $(".create-group-body, .group-first-phase, .create-group-search").hide();
  }
  $(".group-second-phase").hide();
});

$(document).on("click", "#createGroup", async function() {
  if ($("#groupName").val()) {
    await createGroup(
      groupMembers,
      $("#groupName").val(),
      $("#loggedInUserId").val()
    );
    groupMembers.length = 0;
    $(".create-group-search").show();
  } else {
    alert("Enter Group name");
  }
});

//forward message code
$(document).on("click", ".forward-to-user", async function() {
  let forwardMessageToUser = [];
  let forwardMessageTogroups = [];
  $.each($("input[name='forwardMessageTo']:checked"), async function() {
    if ($(this).attr("room-id") != 0) {
      if (forwardMessageTogroups.indexOf($(this).val()) === -1) {
        forwardMessageTogroups.push($(this).val());
      }
    } else {
      if (forwardMessageToUser.indexOf($(this).val()) === -1) {
        forwardMessageToUser.push($(this).val());
      }
    }
  });
  if (forwardMessageToUser.length || forwardMessageToGroup.length) {
    await forwardMessageAjax(
      forwardMessageToUser,
      forwardMessageTogroups,
      $("#loggedInUserId").val(),
      $("#loggedInUserId").attr("user-name")
    );
    forwardMessages.length = forwardMessageTogroups.length = 0;
    isForward = 0;
  } else {
    alert("Please select User");
  }
});

// OPEN CREATE REMAINDER POP UP
$(document).on("click", ".createRemainder", function() {
  isPopupOpen = 1;
  $(".create-remainder-popup").show();
  $(".app-one").addClass("app-one-blur");
  $("body").addClass("popup-open");
});

//clear chat
$(document).on("click", ".clearChatIcnDef", function() {
  const room_id = $("#contact").attr("room-id");
  const contact = $("#contact").val();
  const conversationId = $("#conversationId").val();
  let loggedInUserId = $("#loggedInUserId").val();
  if (confirm("Are you sure you want to delete chat??")) {
    socketManager.emitEvent("clear-chat", {
      conversationId: conversationId,
      room_id: room_id,
      loggedInUserId: loggedInUserId,
    });
  }
});

// archive chat
$(document).on("click", ".archiveChatIcnDef", function() {
  let room_id = $("#contact").attr("room-id");
  let contact = $("#contact").val();
  const conversationId = $("#conversationId").val();
  let loggedInUserId = $("#loggedInUserId").val();
  if (confirm("Are you sure you want to archive chat??")) {
    let lastMessageId =
      room_id == 0
        ? $(`.contact-list[contact-id=${contact}]`).attr("last-unread-id")
        : $(`.contact-list[room-id=${room_id}]`).attr("last-unread-id");
    socketManager.emitEvent("archive-chat", {
      conversationId: conversationId,
      last_message_id: lastMessageId,
      loggedInUserId: loggedInUserId,
    });
  }
});

// unarchive chat
$(document).on("click", ".unarchiveChatIcnDef", function() {
  let room_id = $("#contact").attr("room-id");
  let contact = $("#contact").val();
  let loggedInUserId = $("#loggedInUserId").val();
  const conversationId = $("#conversationId").val();
  if (confirm("Are you sure you want to unarchive chat??")) {
    let lastMessageId =
      room_id == 0
        ? $(`.contact-list[contact-id=${contact}]`).attr("last-unread-id")
        : $(`.contact-list[room-id=${room_id}]`).attr("last-unread-id");
    socketManager.emitEvent("unarchive-chat", {
      conversationId: conversationId,
      contact: contact,
      room_id: room_id,
      last_message_id: lastMessageId,
      loggedInUserId: loggedInUserId,
    });
  }
});

$(function() {
  // CHAT SEARCH FUNCTIONALITY
  var searchResults = [];
  var currentPosition = 0;
  let isSlidUp = false;

  $(document).on("click", "#toggle-search-button", function() {
    isSlidUp = true;
    $("#search-input").slideToggle();
    $("#search-info").toggle();
    $(".message-text").removeClass("highlight");
    $("#match-count").text("");
    $("#match-position").text("");
    $("#prev-button, #next-button").prop("disabled", true);
    searchResults = [];
    currentPosition = 0;
  });

  $(document).on("input", "#search-input", function() {
    var searchText = $(this)
      .val()
      .trim()
      .toLowerCase();
    if (searchText === "") {
      $(".message-text").removeClass("highlight");
      $("#match-count").text("");
      $("#match-position").text("");
      $("#prev-button, #next-button").prop("disabled", true);
      searchResults = [];
      currentPosition = 0;
      return;
    }

    searchResults = [];
    currentPosition = 0;
    var $messages = $(".message-text");

    $messages.each(function(index) {
      var $message = $(this);
      var messageText = $message.data("message")
        ? $message
            .data("message")
            .toString()
            .toLowerCase()
        : "";

      if (messageText.includes(searchText)) {
        searchResults.push($message);
        $message.addClass("highlight");
      } else {
        $message.removeClass("highlight");
      }
    });

    if (searchResults.length > 0) {
      updateMatchInfo();
      $("#prev-button").prop("disabled", false);
      $("#next-button").prop("disabled", false);
    } else {
      $("#match-count").text("(0)");
      $("#prev-button").prop("disabled", true);
      $("#next-button").prop("disabled", true);
    }
  });

  $(document).on("click", "#prev-button", function() {
    currentPosition--;
    if (currentPosition < 0) {
      currentPosition = searchResults.length - 1;
    }

    scrollToSearchedMessage(searchResults[currentPosition]);
    updateMatchInfo();
  });

  $(document).on("click", "#next-button", function() {
    currentPosition++;
    if (currentPosition >= searchResults.length) {
      currentPosition = 0;
    }

    scrollToSearchedMessage(searchResults[currentPosition]);
    updateMatchInfo();
  });

  function updateMatchInfo() {
    var matchCount = searchResults.length;
    $("#match-count").text("(" + matchCount + ")");
    $("#match-position").text(currentPosition + 1 + "/" + matchCount);
  }

  function scrollToSearchedMessage($message) {
    var parentDiv = $message.parent();
    var parentId = parentDiv.attr("id");
    scrollToMessage(parentId);
  }

  function AddNewContactInList(id, name, profilePic) {
    return `<div class="sideBar-body contact-list" contact-id="${id}" onclick="fetchContact('${id}', 0)" id="${id}" name="${name}" profile="">
            <div class="sideBar-avatar">
              <div class="avatar-icon">
                <img src='${profilePic ? profilePic : ""}'>
              </div>
            </div>
            <div class="sideBar-main">
              <div class="sidebar-name-wrapper">
                <div class="sideBar-name">
                  <span class="name-meta">${name}
                  </span>
                  <span class="time-meta  previewMsg" contact-id="${id}">
                  </span>
                </div>
                <div class="sideBar-time">
                  <span class="time-meta  msgDate" contact-id="${id}">
                  </span>
                </div>
              </div>
            </div>
            </div>`;
  }

  $(".heading-compose").click(function() {
    $(".side-two").css({
      left: "0",
    });
  });

  $(document).on("click", ".back-arrow", function() {
    $(".conversation").hide();
  });

  $(document).on("click", ".contact-list", function() {
    $(".conversation").show();
  });

  $(".newMessage-back").click(function() {
    $(".side-two").css({
      left: "-100%",
    });
  });
  $(".favorite-back").click(function() {
    $(".side-five").css({
      left: "-100%",
    });
  });
  $(".group-back").click(function() {
    $(".create-group-body").hide();
    $(".group-contact, .create-group-search, .refresh-chats").show();
    $(".group-contact-cls").attr("checked", false);
  });

  $(".heading-filter").click(function() {
    $(".side-three").css({
      left: "0",
    });
  });

  $(".create-group").click(function() {
    $(".side-two").css({
      left: "0",
    });
  });

  $(".favorites").click(function() {
    $(".side-five").css({
      left: "0",
    });
  });

  $(".newMessage-back-filter").click(function() {
    $(".side-three").css({
      left: "-100%",
    });
  });

  $(".heading-archived-chat").click(function() {
    $(".side-four").css({
      left: "0",
    });
  });
  $(".archived-chat-back-filter").click(function() {
    $(".side-four").css({
      left: "-100%",
    });
  });

  // ADD NEW CONTACT IN CHAT LISTING
  $(document).on("click", ".new_contact_person, .userContact", function() {
    let id = $(this).attr("data-id");
    let checkExistContact =
      $(`.contact-list[contact-id=${id}]`).attr("id") || 0;
    checkExistContact
      ? $(`.contact-list[contact-id=${id}]`).addClass("active")
      : "";
    const conversationId = checkExistContact ? $(`.contact-list[contact-id=${id}]`).attr('conversationId') : 0;
    $(".startChatDiv").hide();
    $(".side-three, .side-five").css({
      left: "-100%",
    });
    fetchContact(id, 0, conversationId);
    let profile = $(this).attr("profile")
      ? $(this).attr("profile")
      : $(
          `.new_contact_person > .sideBar-avatar > .avatar-icon > .vet-img${id}`
        ).attr("src");
    if (checkExistContact == 0) {
      var clone = AddNewContactInList(
        $(this).attr("data-id"),
        $(this).attr("name"),
        profile
      );
      $(".chat-list").prepend(clone);
      $(".chat-home").hide();
      userMapping.push({
        [id]: $(this)
          .attr("name")
          .toLocaleLowerCase(),
      });
    }
    $(`.contact-list`).removeClass("active");
    $(`.contact-list[contact-id=${id}]`).addClass("active");
    const contact = $("#contact").val();
    const loggedInUserId = $("#loggedInUserId").val();
    var contactObj = {
      id,
      name: $(this).attr("name"),
      img: $(this).attr("profile")
        ? $(this).attr("profile")
        : $(
            `.new_contact_person > .sideBar-avatar > .avatar-icon > .vet-img${id}`
          ).attr("src"),
    };
    getChatData(loggedInUserId, contactObj);
    $("#conversation").animate(
      { scrollTop: $("#conversation").prop("scrollHeight") },
      500
    );
  });

  // ON CLICK OF EXISTING CONTACT LIST
  $(document).on("click", ".contact-list", function() {
    if (isSlidUp) {
      $("#toggle-search-button").click();
      isSlidUp = false;
    }
    offsetCount = 0;
    $(".chat-home").hide();
    var id = $(this).attr("id");
    $("#contact").val(id);
    $("#contact").attr(
      "room-id",
      $(this).attr("room-id") ? $(this).attr("room-id") : 0
    );
    $("#contact").attr("data-name", $(this).attr("room-name"));
    const contact = $("#contact").val();
    const loggedInUserId = $("#loggedInUserId").val();
    var contactObj = {
      id,
      name: $(this).attr("name"),
      img: $(
        `.contact-list > .sideBar-avatar > .avatar-icon > .contactProfile${id}`
      ).attr("src"),
    };
    getChatData(loggedInUserId, contactObj);
    $("#conversation").animate(
      { scrollTop: $("#conversation").prop("scrollHeight") },
      500
    );
  });
});

// CREATE REMAINDER VALIDATIONS
$("#createRemainderForm").validate({
  rules: {
    message: {
      required: true,
    },
    remainder_name: {
      required: true,
    },
    remainder_datetime: {
      required: true,
    },
    before_day: {
      required: true,
      number: true,
      min: 1,
    },
    before_hour: {
      required: true,
      number: true,
      min: 1,
    },
  },
  messages: {
    message: {
      required: "Remainder message is required.",
    },
    remainder_name: {
      required: "Remainder name is required.",
    },
    remainder_datetime: {
      required: "Remainder datetime is required.",
    },
    before_day: {
      required: "Remainder before day field is required.",
      number: "Enter valid number for before day field",
      min: "Enter valid number for before day field",
    },
    before_hour: {
      required: "Remainder before hour field is required.",
      number: "Enter valid number for before day field",
      min: "Enter valid number for before day field",
    },
  },
  errorElement: "span",
  errorLabelContainer: ".error",
  submitHandler: (form) => {
    const room_id = $("#contact").attr("room-id");
    const to = $("#contact").val();
    const data = {
      message: $("#message").val(),
      remainder_name: $("#remainder_name").val(),
      remainder_datetime: $("#remainder_datetime").val(),
      before_day: $("#before_day").val(),
      before_hour: $("#before_hour").val(),
      room_id: room_id && room_id != "0" ? room_id : null,
      to: to && room_id && room_id == "0" ? to : null,
      from: $("#loggedInUserId").val(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    $.ajax({
      url: `/admin/message-remainder`,
      type: "post",
      data,
      success: function(data) {
        form.reset();
        $(".create-remainder-popup").hide();
        $(".app-one").removeClass("app-one-blur");
        $("body").removeClass("popup-open");
        showAlert("Remainder created successfully!");
      },
      error: function(data) {
        showAlert("Something went wrong!");
      },
    });
  },
});

function showAlert(message) {
  var w = window.open("", "", "width=300,height=2px");
  w.document.write(message);
  w.focus();
  setTimeout(function() {
    w.close();
  }, 2000);
}

$("#createRemainderForm").submit(function(e) {
  e.preventDefault();
});


const vetList = document.querySelector('#vet-list');
const ForwardVetList = document.querySelector('#forward-lis-dv');
let isLoading = false; 
var vetPrcticePage = 0;
var vetPage = forwardPage = 1;
const pageLimit = 20;

vetList.addEventListener('scroll', async() => {
  const scrollPosition = vetList.scrollTop;
  const scrollHeight = vetList.scrollHeight;
  const containerHeight = vetList.clientHeight;
  if (scrollPosition + containerHeight >= scrollHeight && !isLoading) {
    containRefresh("vet-list")
    await loadVet(false, vetPage);
    vetPage +=1;
  }
});

ForwardVetList.addEventListener('scroll', async () => {
  const scrollPosition = ForwardVetList.scrollTop;
  const scrollHeight = ForwardVetList.scrollHeight;
  const containerHeight = ForwardVetList.clientHeight;
  if (scrollPosition + containerHeight >= scrollHeight && !isLoading) {
    containRefresh("forward-lis-dv")
    await loadVet(true, forwardPage);
    forwardPage +=1;
  }
});
function containRefresh(id){
  $('#refreshLoad, #refreshForwardCon').removeClass('displayNonecls');
}
loadVet(null, 0);

async function loadVet(status, page) {
  isLoading = true; // set loading flag to true
  $('#refreshLoad, #refreshForwardCon').removeClass('displayNonecls');
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/admin/message/vet-users",
      type: "POST",
      data: {offset: page, limit:pageLimit},
      success: function(data, textStatus, jqXHR) {
        if (data && data.length) {
          let vetHtml  = forwardVetHtml= newVetAppendID = forwardVetAppendID =  "";
          for (const i in data) {
            if(!status){
            vetHtml += `<div class="sideBar-body new_contact_person new_contact_person_or_grp" data-id="${data[i].id}" contact-id="${data[i].id}" name="${data[i].name}">
            <div class="sideBar-avatar">
              <div class="avatar-icon">
                <img class="vet-img${data[i].id}" src='${data[i].profileImgPath ? data[i].profileImgPath : "/images/person-default.png" }'>
              </div>
            </div>
            <div class="sideBar-main">
              <div class="group-contact-row">
                <div class="sideBar-name">
                  <span class="name-meta">${data[i].name}
                  </span>
                </div>
                <div class="sideBar-time">
                  <span class="time-meta pull-right">
                  </span>
                </div>
              </div>
            </div>
            </div>`;
            newVetAppendID = "vet-list";
            }
            if(status || status === null){
              forwardVetHtml += `<li class="contact_forward" data-id="${data[i].id}" contact-id="${data[i].id}" name="${data[i].name}">
              <div class="member-avatar">
                  <img src='${data[i].profileImgPath ? data[i].profileImgPath : "/images/person-default.png" }' alt="Member Avatar">
              </div>
              <div class="member-info">
                  <h4 class="user-name forwardComman${data[i].id}">${data[i].name}</h4>
              </div>
              <div class="admin-add-member">
                <input type="checkbox" class="forward-msg-to comman-cls" room-id = 0 id="forwardComman${data[i].id}" name="forwardMessageTo" value="${data[i].id}">
              </div>
          </li>`;
          forwardVetAppendID = "forward-lis-dv";
          }
        }
        newVetAppendID ? $(`#${newVetAppendID}`).append(vetHtml) : "";
        forwardVetAppendID ? $(`#${forwardVetAppendID}`).append(forwardVetHtml) : "";
          isLoading=false;
          resolve(data);
        } else {
          isLoading=false;
          resolve(data);
        }
        $('#refreshLoad, #refreshForwardCon').addClass('displayNonecls');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR", jqXHR, textStatus, errorThrown);
        reject("ERROR");
      },
    });
  });
}
