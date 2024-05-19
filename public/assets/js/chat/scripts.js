$( document ).ready(function() {
  socketManager = new SocketManager();
  const contact = $("#contact").val();
  let loggedInUserId = $("#loggedInUserId").val();
  // loggedInUserId = contact == loggedInUserId ? 25 : loggedInUserId;
  connectSocket({ query: `userId=${loggedInUserId}` });
});

$(window).focus(function() {
    window_focus = true;
    if ($("#new-message").length) {
      $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
      setTimeout(function() { $("#new-message").remove() }, 30000);
    }
})
.blur(function() {
    window_focus = false;
});

$(document).on('click',"#new-message",function(){
  this.remove();
  $('#conversation').animate({ scrollTop: $('#conversation').prop("scrollHeight") }, 500);
});

$(function () {
  

  // register button click event
  $("#control-user-create").on("click", function (e) {
    e.preventDefault();

    registerUser($("#control-username").val());
  });

  // login button click event
  $("#control-user-login").on("click", function (e) {
    e.preventDefault();

    loginUser($("#control-username").val());
  });

  // logout button click event
  $("#control-user-logout").on("click", function (e) {
    e.preventDefault();

    logoutUser($("#control-username").val());
  });

  // private message button click event
  $("#chats-send-personal-message").on("click", function (e) {
    e.preventDefault();

    sendPrivateMessage($("#chats-pm-chat-message").val(), $("#chats-pm-chat-name").val());
  });

  // group create button click event
  $("#control-group-chat-create").on("click", function (e) {
    e.preventDefault();

    createGroup($("#control-group-chat-name").val());
  });

  // group add member button click event\
  $("#control-group-chat-member-add").on("click", function (e) {
    e.preventDefault();

    addMemberToGroup($("#control-group-chat-member-name").val(), $("#control-group-chat-name").val());
  });

  // group message send button click event
  $("#control-group-chat-send").on("click", function (e) {
    e.preventDefault();

    sendGroupMessage($("#chats-group-chat-message").val(), $("#chats-group-chat-name").val());
  });

})
