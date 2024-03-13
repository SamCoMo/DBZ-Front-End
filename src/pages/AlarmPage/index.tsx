import HeaderTitle from "@/components/common/HeaderTitle";
// import "../../firebase/index.js";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const AlarmPage = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_PUBLIC_KEY,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);

  return (
    <>
      <HeaderTitle title="알림" back={true} />
    </>
  );
};

export default AlarmPage;
