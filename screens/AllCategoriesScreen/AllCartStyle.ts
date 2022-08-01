import { StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/Layout";

export const allCartStyle = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 60,
  },
  contentCont: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    padding: 15,
  },
  headerText: {
    ...Fonts.style2,
    color: Colors.darkgray,
  },
  itemsContainer: {
    alignSelf: "center",
    paddingBottom: 40,
  },
});
