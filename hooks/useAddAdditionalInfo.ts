import {
  getIdToken,
  signInWithCustomToken,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../app/Firebase";
import axios from "../app/axios";
import useFirebaseAuth from "./useFirebaseAuth";

const useAddAdditionalInfo = () => {
  const { user } = useFirebaseAuth();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [completeMessage, setCompleteMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const [refCode, setRefCode] = useState("");

  const handleUpdateDetails = async () => {
    setUpdateLoading(true);
    setError("");
    if (auth.currentUser && email && username) {
      try {
        //await updateEmail(auth.currentUser, email);
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        const token = await getIdToken(auth.currentUser);
        const res = await axios.post("/auth/registerCustomer", {
          uid: auth.currentUser.uid,
          email,
          refCode,
          token,
        });
        if (res.data.error) {
          //setError(res.data.error);
        }
        setUpdateLoading(false);
        await signInWithCustomToken(auth, res.data.customToken);
        setCompleteMessage(`${user?.username || ""} successfully logged in`);
        setComplete(true);
      } catch (err) {
        if (typeof err === "object") {
          if ((err as any).code === "auth/email-already-in-use") {
            setError("Email already in use");
            setUpdateLoading(false);
            return;
          }
        }
        setError("There was an error, please try again");
      }
    }
    setUpdateLoading(false);
  };

  return {
    handleUpdateDetails,
    updateLoading,
    error,
    email,
    setEmail,
    refCode,
    setRefCode,
    username,
    setUsername,
    completeMessage,
    complete,
  };
};

export default useAddAdditionalInfo;
