import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { homeProp } from "../../types";
import Header from "../../components/Header";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { auth } from "../../app/Firebase";
import { getIdToken, updateProfile } from "firebase/auth";
import axios from "../../app/axios";
import SnackBar from "react-native-snackbar-component";
import { Button } from "react-native-elements";

export type accountFormErrors = {
  username: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
};

export type accountForm = {
  username: { v: string; active: boolean };
  phoneNumber: { v: string; active: boolean };
  email: { v: string; active: boolean };
  errors: accountFormErrors | null;
};
const Change = ({ navigation }: homeProp) => {
  const { user, completed } = useFirebaseAuth();
  const [form, setForm] = useState<accountForm>({
    email: { v: "", active: false },
    phoneNumber: { v: "", active: false },
    username: { v: "", active: false },
    errors: null,
  });
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setForm({
      email: { ...form.email, v: user?.email || "" },
      phoneNumber: {
        ...form.phoneNumber,
        v: `0${user?.phone?.substring(4)}` || "",
      },
      username: { ...form.username, v: user?.username || "" },
      errors: null,
    });
  }, [user, completed]);

  const resetForm = () => {
    setForm({
      email: { v: form.email.v, active: false },
      phoneNumber: { v: form.phoneNumber.v, active: false },
      username: { v: form.username.v, active: false },
      errors: null,
    });
  };

  const handleUpdate = async () => {
    setError("");
    if (user && auth.currentUser) {
      setSubmitLoading(true);
      if (form.username.v !== user.username) {
        await updateProfile(auth.currentUser, {
          displayName: form.username.v,
        });
      }
      if (
        form.email.v !== user.email ||
        form.phoneNumber.v !== `0${user.phone?.substring(4)}`
      ) {
        try {
          const token = await getIdToken(auth.currentUser);
          const res = await axios.post("/users/changeDetails", {
            token,
            email: form.email.v,
            phoneNumber: form.phoneNumber.v,
          });
          if (res.data.error) {
            setError(res.data.error);
            setSubmitLoading(false);
            return;
          }
          setSnackbarMessage(
            `Email has been sent to ${user.email}, follow instructions to change details`
          );
        } catch (err) {
          console.log(err);
          setError("There was an error, please try again");
        }
      }
      resetForm();
      setSubmitLoading(false);
    } else {
      setError("No Authenticated User");
    }
  };

  return (
    <View style={styles.main}>
      <SnackBar
        visible={Boolean(snackbarMessage)}
        textMessage={snackbarMessage}
        backgroundColor={error ? "red" : "green"}
        accentColor="white"
        actionHandler={() => {
          setSnackbarMessage("");
        }}
        actionText="Close"
      />
      <View style={styles.header}>
        <Header title="Change Info" navigation={navigation} />
      </View>
      <ScrollView style={styles.ContentCont}>
        <View>
          <View>
            <View style={styles.infoCont}>
              <Text style={styles.infoText}>Username</Text>
              <Text style={styles.infoText}>{user?.username}</Text>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    username: {
                      ...form.username,
                      active: !form.username.active,
                    },
                  })
                }
              >
                <Feather name="edit" size={23} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {form.username.active ? (
              <View style={styles.newInfoCont}>
                <Text style={styles.infoHeaderText}>Change Username</Text>
                <TextInput
                  style={styles.newInput}
                  value={form.username.v}
                  onChangeText={(text) =>
                    setForm({
                      ...form,
                      username: { ...form.username, v: text },
                    })
                  }
                  placeholder="Enter New Username"
                />
              </View>
            ) : null}
          </View>
          <View>
            <View style={styles.infoCont}>
              <Text style={styles.infoText}>Phone Number</Text>
              <Text style={styles.infoText}>{user?.phone}</Text>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    phoneNumber: {
                      ...form.phoneNumber,
                      active: !form.phoneNumber.active,
                    },
                  })
                }
              >
                <Feather name="edit" size={23} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {form.phoneNumber.active ? (
              <View style={styles.newInfoCont}>
                <Text style={styles.infoHeaderText}>Change Phone Number</Text>
                <TextInput
                  style={styles.newInput}
                  value={form.phoneNumber.v}
                  onChangeText={(text) =>
                    setForm({
                      ...form,
                      phoneNumber: { ...form.phoneNumber, v: text },
                    })
                  }
                  placeholder="Enter Phone Number"
                />
              </View>
            ) : null}
          </View>
          <View>
            <View style={styles.infoCont}>
              <Text style={styles.infoText}>Your Email</Text>
              <Text style={styles.infoText}>{user?.email}</Text>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    email: { ...form.email, active: !form.email.active },
                  })
                }
              >
                <Feather name="edit" size={23} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {form.email.active ? (
              <View style={styles.newInfoCont}>
                <Text style={styles.infoHeaderText}>Change Email</Text>
                <TextInput
                  style={styles.newInput}
                  value={form.email.v}
                  onChangeText={(text) =>
                    setForm({ ...form, email: { ...form.email, v: text } })
                  }
                  placeholder="Enter New Email"
                />
              </View>
            ) : null}
          </View>
          <Button
            loading={submitLoading}
            title="Change Details"
            containerStyle={{
              marginTop: 20,
              width: "100%",
            }}
            buttonStyle={{
              backgroundColor: Colors.primary,
            }}
            onPress={handleUpdate}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  infoHeaderText: {
    ...Fonts.body2,
    fontSize: 18,
    marginTop: 5,
    color: Colors.darkgray,
  },
  updateText: {
    color: Colors.warmWhite,
    ...Fonts.body3,
    textAlign: "center",
  },
  updateBtn: {
    backgroundColor: Colors.primary,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8,
  },
  newInput: {
    width: "90%",
    borderBottomWidth: 0.3,
    padding: 8,
    ...Fonts.body3,
    borderWidth: 0.3,
    marginTop: 12,
    borderRadius: 10,
    borderColor: Colors.darkgray,
    marginBottom: 8,
  },
  newInfoCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    ...Fonts.body2,
    fontSize: 17,
    color: Colors.darkgray,
  },
  infoCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 1,
    borderBottomWidth: 0.3,
    paddingTop: 14,
    paddingBottom: 14,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 60,
  },
  ContentCont: {
    backgroundColor: Colors.warmWhite,
    padding: 15,
    flex: 1,
  },
});

export default Change;
