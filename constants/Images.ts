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
    require("../assets/images/items/img1.jpg"),
    require("../assets/images/items/img2.jpg"),
    require("../assets/images/items/img3.jpg"),
    require("../assets/images/items/img4.jpg"),
    require("../assets/images/items/img5.jpg"),
    require("../assets/images/items/img6.jpg"),
  ],
};

export default images;
