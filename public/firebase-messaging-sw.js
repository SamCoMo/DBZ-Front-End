importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBSQv5sUV_d9v6bVsuNZ45RWnPxQyzJTaY",
  authDomain: "dbz24-d8690.firebaseapp.com",
  projectId: "dbz24-d8690",
  storageBucket: "dbz24-d8690.appspot.com",
  messagingSenderId: "832842123134",
  appId: "1:832842123134:web:cee9bff80e8359598c152f",
  measurementId: "G-66C0CBZ8HQ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
