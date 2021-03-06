import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/Layout";

export const detailStyle = StyleSheet.create({
  backBtnCont: {
    position: "absolute",
    top: 10,
    marginLeft: 15,
    zIndex: 222,
    backgroundColor: Colors.primary,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    height: Sizes.height,
    width: Sizes.width,
  },
  imageCont: {
    flex: 0.45,
    backgroundColor: Colors.primary,
  },
  contentCont: {
    backgroundColor: Colors.warmWhite,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Sizes.height / 1.7,
    borderTopRightRadius: 30,
    elevation: 6,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerCont: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    ...Fonts.body2,
    color: Colors.darkgray,
  },
  addCartBtn: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 20,
    borderTopLeftRadius: 35,
  },
  addText: {
    color: Colors.white,
    ...Fonts.body3,
  },
  price: {
    ...Fonts.body2,
    marginTop: 5,
    color: Colors.deepDarkGray,
  },
  ingredientCont: {
    marginTop: 10,
    borderTopWidth: 0.2,
    borderColor: Colors.deepDarkGray,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
    borderBottomWidth: 0.2,
  },
  ingText: {
    marginLeft: 5,
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 6,
    ...Fonts.body3,
    marginTop: 7,
    elevation: 2,
  },
  likeText: {
    ...Fonts.style2,
    color: Colors.deepDarkGray,
    marginTop: 10,
  },
});
