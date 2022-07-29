import { StyleSheet } from "react-native";
import { Sizes, Colors, Fonts } from "../../constants/Layout";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
  },
  top: {
    flex: 0.18,
    backgroundColor: Colors.primary,
    width: Sizes.width,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    width: Sizes.width,
    backgroundColor: Colors.white,
  },
  topText: {
    ...Fonts.h2,
    color: Colors.white,
    marginTop: -20,
  },
  mainContent: {
    position: "absolute",
    width: Sizes.width - 30,
    left: 15,
    right: 15,
    bottom: 0,
    backgroundColor: Colors.white,
    height: "92%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    width: "100%",
    textAlign: "center",
    ...Fonts.h1,
    padding: 10,
    marginTop: 20,
    color: Colors.primary,
  },
  inputContainer: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  inputContent: {
    alignItems: "flex-start",
  },
  lable: {
    ...Fonts.h5,
    color: Colors.primary,
    paddingLeft: 8,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingTop: 7,
    paddingBottom: 5,
    fontSize: 17,
    marginTop: -8,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    paddingBottom: 10,
    marginTop: -10,
  },
  forgotText: {
    ...Fonts.body4,
    color: Colors.primary,
  },
  loginBtnCont: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  loginBtn: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    borderRadius: Sizes.radius,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnCont: {
    width: "80%",
    borderRadius: Sizes.radius,
  },
  newAccount: {
    padding: 5,
    marginTop: 5,
  },
  newAccountText: {
    ...Fonts.body3,
    color: Colors.primary,
    fontSize: 16,
  },
});
