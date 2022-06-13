import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/Layout";

export const homeStyle = StyleSheet.create({
  cartsBtnCont: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    zIndex: 2222,
  },
  viewCartsBent: {
    backgroundColor: Colors.primary,
    width: "80%",
    alignSelf: "center",
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 2,
  },
  viewBtnText: {
    color: Colors.warmWhite,
    textAlign: "center",
    ...Fonts.body2,
    fontSize: 18,
  },
  recomText: {
    ...Fonts.style,
    fontSize: 22,
    marginTop: 10,
    color: Colors.darkgray,
    paddingLeft: 10,
  },
  itemsContainer: {
    alignSelf: "center",
    paddingBottom: 40,
  },
  categoryHeaderCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 5,
  },
  categoryHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  catBtnText: {
    ...Fonts.style2,
    color: Colors.darkgray,
    fontSize: 16,
  },
  catHeaderText: {
    ...Fonts.style,
    color: Colors.darkgray,
    fontSize: 20,
  },
  btnMid: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: Colors.deepDarkGray,
  },
  recentCont: {
    backgroundColor: Colors.white,
    padding: 5,
    elevation: 2,
  },
  recentBtn: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  recentText: {
    ...Fonts.h3,
    fontSize: 18,
    color: Colors.deepDarkGray,
    marginLeft: 10,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  search: {
    backgroundColor: Colors.warmWhite,
    width: "100%",
    flexDirection: "row",
    padding: 5,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 10,
  },
  searchInput: {
    width: "90%",
    height: 30,
    marginLeft: 5,
    color: Colors.black,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
    width: Sizes.width,
    height: Sizes.height,
  },
  header: {
    paddingLeft: Sizes.padding * 2,
    paddingRight: Sizes.padding * 2,
    zIndex: 10,
    height: 117,
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  cartBtn: {
    backgroundColor: Colors.secondary,
    flexDirection: "row",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  cartNum: {
    ...Fonts.body3,
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    zIndex: 8,
  },
  headerText: {
    ...Fonts.h2,
    color: Colors.warmWhite,
  },
});