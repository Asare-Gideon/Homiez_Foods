import { ImageSourcePropType } from "react-native";
type img = ImageSourcePropType;

interface ImageType {
  categories: img[];
  items: img[];
  lottie: any[];
  logo: img;
}
const images: ImageType = {
  logo: require("../assets/images/logo.png"),
  lottie: [
    require("../assets/images/lottie/initial.json"),
    require("../assets/images/lottie/loadin.json"),
  ],
  categories: [
    require("../assets/images/categoris/img1.jpg"),
    require("../assets/images/categoris/img2.jpg"),
    require("../assets/images/categoris/img3.jpg"),
    require("../assets/images/categoris/img4.jpg"),
  ],
  items: [
    require("../assets/images/items/item1.png"),
    require("../assets/images/items/item7.jpg"),
    require("../assets/images/items/just.png"),
    require("../assets/images/items/item9.png"),
    require("../assets/images/items/item2.png"),
    require("../assets/images/items/cart.png"),
    require("../assets/images/items/bg1.jpg"),
  ],
};

export default images;
