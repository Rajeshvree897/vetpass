// importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js");

importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js"
);

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBKknNVoIXJYK81D-r1jEnE4oQlVrd_-rw",
  authDomain: "vetpass-43e02.firebaseapp.com",
  databaseURL: "https://vetpass-43e02.firebaseio.com",
  projectId: "vetpass-43e02",
  storageBucket: "vetpass-43e02.appspot.com",
  messagingSenderId: "695778505764",
  appId: "1:695778505764:web:d56e8bfd10c9d387de14b1",
  measurementId: "G-4HY0PNXSQY",
};

// Initialize the firebase in the service worker.
firebase.initializeApp(FIREBASE_CONFIG);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((event) => {  
  var data = event.data.json();
  const title = data && data.notification && data.notification.title ? data.notification.title : "Notification Title";
  var payload = event.data.json();
  var actions = payload.actions;
  const options = {
    data: data && data.notification && data.notification.title ? data.notification.title : "Notification Title",
    body: data && data.notification && data.notification.body ? data.notification.body : "Notification Body",
    icon: "http://localhost:4444/images/favicon.ico",
    actions: actions
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("push", function(event) {
  var data = event.data.json();

  console.log("NOTIFICATION data", data);
  const title = data && data.notification && data.notification.title ? data.notification.title : "Notification Title";
//   data.Data.actions = data.Actions;
  var payload = event.data.json();
  var actions = payload.actions;
  const options = {
    data: data && data.notification && data.notification.title ? data.notification.title : "Notification Title",
    body: data && data.notification && data.notification.body ? data.notification.body : "Notification Body",
    // body: payload.body,
    icon: "http://localhost:4444/images/favicon.ico",
    actions: actions
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.waitUntil(
    clients.openWindow('http://localhost:4444/admin/chat') // Redirect the user to the specified URL
  );
  event.notification.close();
});

self.addEventListener("notificationclose", function(event) {
  event.notification.close();
});
