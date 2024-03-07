import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCCR9VGfOchUKWTcbLBabjeBJ8bJ8JQ9Yg",
  authDomain: "last-12b3a.firebaseapp.com",
  projectId: "last-12b3a",
  storageBucket: "last-12b3a.appspot.com",
  messagingSenderId: "720027948546",
  appId: "1:720027948546:web:f515675c5679f8bc7c791b",
  measurementId: "G-7BT5JLG6R2"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)



export const generateToken = async () => {
    const permission = await Notification.requestPermission()

        if (permission === 'granted') {
            getToken(messaging, {
                vapidKey: "BFRn5sVJ2PGVDR5JOx8g7TM_Sprd6Rpx0iFhWmpxqNi2KkPLPGFMGPEohu0OGf7lQQFDiCeoOnbCkXcgNml_LA0"
            }).then((currentToken) => {
                console.log(currentToken);
                document.getElementById('token').append(currentToken);
            });
        }
}



