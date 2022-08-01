import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import { auth } from "../app/Firebase";

const usePhoneAuth = (
  phone: string,
  recaptchaRef: FirebaseRecaptchaVerifierModal
) => {
  const [completeMessage, setCompleteMessage] = useState("");
  const [error, setError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  const sendVerification = async () => {
    setError("");
    setVerificationLoading(true);
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+233${phone.substring(1)}`,
        recaptchaRef
      );
      setVerificationId(verificationId);
      setVerificationLoading(false);
      recaptchaRef._reset();
    } catch (err) {
      setError("A problem was encountered, please try again");
      setVerificationLoading(false);
      console.log(err);
    }
  };

  const handleCreateAccount = async (code: string) => {
    setError("");
    setVerificationLoading(true);
    if (verificationId) {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, code);
        const userInfo = await signInWithCredential(auth, credential);
        if (userInfo.user.email && userInfo.user.displayName) {
          setCompleteMessage(
            `${userInfo.user.displayName} successfully logged in`
          );
        } else {
          setCompleteMessage("Fill Additional Details");
        }
        setTimeout(() => {
          setCompleteMessage("");
        }, 2000);
        setVerificationId("");
        setAccountCreated(true);
      } catch (err) {
        setError(`There was an error, please try again`);
      }
    }
    setVerificationLoading(false);
  };

  return {
    completeMessage,
    sendVerification,
    handleCreateAccount,
    accountCreated,
    verificationLoading,
    verificationId,
    error,
  };
};

export default usePhoneAuth;
