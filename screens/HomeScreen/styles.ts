import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../../constants/Layout";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Sizes.width,
    height: Sizes.height,
    backgroundColor: "black",
  },
  mainContent: {
    backgroundColor: Colors.white,
    height: Sizes.height - 260,
    width: Sizes.width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    zIndex: 999,
  },
  header: {
    position: "relative",
    zIndex: 50,
    height: 280,
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
  imgCont: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 9999,
  },
  imgCont1: {
    alignSelf: "center",
    height: 240,
    width: 240,
  },
  logoImg: {
    position: "absolute",
    alignSelf: "center",

    zIndex: 333,
  },
  logoImg1: {
    position: "absolute",
    alignSelf: "center",
    top: 100,
    zIndex: 333,
  },
  headerSearchCont: {
    backgroundColor: Colors.warmWhite,
    width: "85%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    borderRadius: 30,
    marginTop: 190,
  },
  headerInput: {
    padding: 6,
    width: "80%",
  },
  scrollContent: {
    paddingTop: 15,
  },
  foodItemCont: {
    marginTop: 10,
  },
  statusBar: {
    position: "absolute",
    height: 30,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: "black",
  },
  loginModal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    zIndex: 9999,
  },
  loginInputCont: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 2,
    borderRadius: 20,
  },
  inputText: {
    fontSize: 15,
    color: Colors.darkgray,
  },
  input: {
    borderWidth: 0,
    padding: 6,
    width: "60%",
  },
  loginBtn: {
    alignSelf: "center",
    marginTop: 30,
  },
});
