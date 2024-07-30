import {initializeApp} from "firebase/app";
import {getMessaging, getToken, MessagePayload, onMessage} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCu64zlkiaLSClxQ2HkCVh6buhPV4TjqEc",
    projectId: "flight-price-notification",
    messagingSenderId: "1088182454729",
    appId: "1:1088182454729:web:6a140661d8817750ee0018"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const setupFirebaseToken = async (): Promise<string | null>  => {
    try {
        // Request permission for notifications
        const permission : NotificationPermission = await Notification.requestPermission();

        if (permission === 'granted') {
            // Get the FCM token
            return await getToken(messaging);
        } else {
            console.log('Notification permission denied.');
            return null;
        }
    } catch (error) {
        console.error('Error setting up notifications:', error);
        return null;
    }
};

const handleForegroundMessage = (): Promise<MessagePayload> => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload: any) => {
            resolve(payload);
        });
    });
};
export { messaging, setupFirebaseToken, handleForegroundMessage };
