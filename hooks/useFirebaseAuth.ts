import { onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../app/Firebase";

export type userType = {
  uid: string;
  username: string | null;
  phone: string | null;
  email: string | null;
  admin?: boolean;
  superadmin?: boolean;
  agent?: boolean;
};
const useFirebaseAuth = () => {
  const [completed, setCompleted] = useState(false);
  const [user, setUser] = useState<userType | null>(null);
  const [error, setError] = useState("");

  const onStateChanged = async (user: User | null) => {
    if (user) {
      try {
        const idTokenResult = await user.getIdTokenResult();
        const u: userType = {
          uid: user.uid,
          email: user.email,
          phone: user.phoneNumber,
          username: user.displayName,
          agent: Boolean(idTokenResult.claims.agent),
          admin: Boolean(idTokenResult.claims.admin),
          superadmin: Boolean(idTokenResult.claims.superadmin),
        };
        setUser(u);
        setCompleted(true);
      } catch (err) {
        console.log("user state changed err ============> ", err);
        setError("There was an error, please try again");
        setCompleted(true);
      }
    } else {
      setUser(user);
      setCompleted(true);
    }
  };
  useEffect(() => {
    let unsubscribe: Unsubscribe;
    (async () => {
      unsubscribe = await onAuthStateChanged(auth, onStateChanged);
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, completed, error };
};

export default useFirebaseAuth;
