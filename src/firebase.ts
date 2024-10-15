// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Cấu hình Firebase (dùng thông tin từ Firebase Console)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_YOUR_API_KEY,
    authDomain: import.meta.env.VITE_YOUR_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_YOUR_PROJECT_ID,
    storageBucket: import.meta.env.VITE_YOUR_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_YOUR_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_YOUR_APP_ID
    //   measurementId: "G-M5WMT3PZQT"
}

// Khởi tạo Firebase
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

// Hàm lấy token FCM
export const getFCMToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_YOUR_PUBLIC_VAPID_KEY // Lấy từ Firebase Console
        })
        if (token) {
            console.log('FCM Token:', token)
            return token
        } else {
            console.error('Không thể lấy được token FCM')
        }
    } catch (error) {
        console.error('Lỗi khi lấy token FCM:', error)
    }
}

export { messaging }

// // Xử lý thông báo khi ứng dụng đang mở
// onMessage(messaging, (payload: any) => {
//     console.log('Thông báo nhận được:', payload)
//     alert(`Message: ${payload.notification.title} - ${payload.notification.body}`)
// })
