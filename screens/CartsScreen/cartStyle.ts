import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/Layout";

export const cartStyle = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    backgroundColor: Colors.warmWhite,
    flex: 0.9,
  },
  header: {
    flex: 0.1,
  },
  mainListCont: {
    marginTop: 15,
    paddingLeft: 12,
    paddingRight: 12,
  },
  sumCont: {
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
    backgroundColor: Colors.white,
    paddingTop: 10,
    paddingBottom: 5,
    padding: 6,
    borderRadius: 10,
    zIndex: 222,
  },
  totalCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  totalText: {
    ...Fonts.h3,
    color: Colors.darkgray,
  },
  orderBtnCont: {
    width: "100%",
  },
  orderBtn: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    marginBottom: 4,
    borderRadius: 10,
  },
  orderBtnText: {
    color: Colors.warmWhite,
    ...Fonts.body2,
  },
});
