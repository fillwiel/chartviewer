import {initializeApp} from "firebase/app";
import {getMessaging, getToken, MessagePayload, onMessage} from "firebase/messaging";

const supportsNotifications = typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

const firebaseConfig = {
    apiKey: "AIzaSyCu64zlkiaLSClxQ2HkCVh6buhPV4TjqEc",
    projectId: "flight-price-notification",
    messagingSenderId: "1088182454729",
    appId: "1:1088182454729:web:6a140661d8817750ee0018"
};

const firebaseApp = supportsNotifications ? initializeApp(firebaseConfig) : null;
const messaging = firebaseApp ? getMessaging(firebaseApp) : null;

const setupFirebaseToken = async (): Promise<string | null> => {
    if (!supportsNotifications || !messaging) {
        return null;
    }

    try {
        const permission: NotificationPermission = await Notification.requestPermission();

        if (permission === 'granted') {
            return await getToken(messaging);
        }

        console.log('Notification permission denied.');
        return null;
    } catch (error) {
        console.error('Error setting up notifications:', error);
        return null;
    }
};

const handleForegroundMessage = (): Promise<MessagePayload | undefined> => {
    if (!supportsNotifications || !messaging) {
        return Promise.resolve(undefined);
    }

    return new Promise((resolve) => {
        onMessage(messaging, (payload: any) => {
            resolve(payload);
        });
    });
};

export { messaging, setupFirebaseToken, handleForegroundMessage };
