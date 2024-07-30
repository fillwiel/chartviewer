// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCu64zlkiaLSClxQ2HkCVh6buhPV4TjqEc",
    projectId: "flight-price-notification",
    messagingSenderId: "1088182454729",
    appId: "1:1088182454729:web:6a140661d8817750ee0018"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    // eslint-disable-next-line no-undef,no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});