import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/reduxHooks/hooks";
import { registerForPushNotificationsAsync } from "../app/utils";
import { selectExpoToken, setExpoToken } from "../features/auth/AuthSlice";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import {
  addDoc,
  collection,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../app/Firebase";
import useFirebaseAuth from "./useFirebaseAuth";

const useNotificationToken = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectExpoToken);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const { user, completed } = useFirebaseAuth();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [tokenIsSaved, setTokenIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] =
    useState<Notifications.NotificationResponse | null>(null);

  useEffect(() => {
    (() => {
      if (completed) {
        setLoading(true);
        registerForPushNotificationsAsync().then(async (token) => {
          try {
            const q = query(
              collection(db, "expoTokens"),
              where("token", "==", token)
            );
            const tokenRes = await getDocs(q);
            dispatch(setExpoToken(token));
            if (!tokenRes.empty) {
              try {
                const data = tokenRes.docs[0].data();
                if (!data.uid && user) {
                  await setDoc(
                    tokenRes.docs[0].ref,
                    {
                      uid: user.uid,
                    },
                    { merge: true }
                  );
                  setTokenIsSaved(true);
                }
              } catch (err) {
                console.log("expo token =========> ", err);
              }
            } else {
              try {
                await addDoc(collection(db, "expoTokens"), {
                  token,
                  ...(user && { uid: user.uid }),
                });
              } catch (err) {
                console.log(err);
              }
            }
          } catch {}
        });
      }
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
          setResponse(response);
        });
      setLoading(false);
    })();

    return () => {
      try {
        Notifications.removeNotificationSubscription(
          notificationListener.current as Subscription
        );
        Notifications.removeNotificationSubscription(
          responseListener.current as Subscription
        );
      } catch {}
    };
  }, [completed, user]);

  return { token, notification, tokenIsSaved, loading, response };
};

export default useNotificationToken;
