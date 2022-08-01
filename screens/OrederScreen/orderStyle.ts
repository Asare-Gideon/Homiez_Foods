import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/Layout";

export const orderStyle = StyleSheet.create({
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
  text: {
    ...Fonts.body2,
    fontSize: 18,
    marginRight: 10,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 60,
  },
  contentContainer: {
    backgroundColor: Colors.warmWhite,
    padding: 15,
  },
  summary: {
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    ...Fonts.h3,
    color: Colors.darkgray,
    paddingBottom: 4,
  },
  text1: {
    ...Fonts.body2,
    color: Colors.deepDarkGray,
    fontSize: 18,
  },
  disheCont: {
    flexDirection: "row",
  },
  disheText: {
    ...Fonts.body2,
    color: Colors.deepDarkGray,
    fontSize: 18,
    marginRight: 15,
  },
  check: {
    position: "absolute",
    right: 1,
    bottom: 1,
  },
});
