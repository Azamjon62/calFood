/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCCR9VGfOchUKWTcbLBabjeBJ8bJ8JQ9Yg",
    authDomain: "last-12b3a.firebaseapp.com",
    projectId: "last-12b3a",
    storageBucket: "last-12b3a.appspot.com",
    messagingSenderId: "720027948546",
    appId: "1:720027948546:web:f515675c5679f8bc7c791b",
    measurementId: "G-7BT5JLG6R2"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});
