// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCUjUpw0vEIP_QY__rhwts7dXWg_koz1XM",
    authDomain: "note-web-c87ea.firebaseapp.com",
    projectId: "note-web-c87ea",
    storageBucket: "note-web-c87ea.appspot.com",
    messagingSenderId: "362382850275",
    appId: "1:362382850275:web:74ced59c51486e8f812dd6",
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Lắng nghe thông báo nền
messaging.onBackgroundMessage((payload) => {
  console.log('Thông báo nền:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
