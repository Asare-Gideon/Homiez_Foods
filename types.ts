import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export type postStackNavParams = {
  Home: undefined;
  Tracking: undefined;
  Calculator: undefined;
  History: undefined;
  Account: undefined;
};
export interface categoriesProp {
  title: string;
  toggle: boolean;
  handle: any;
  image: ImageSourcePropType;
}
export type categoriesDataTyp = {
  id: string;
  title: string;
  selected: boolean;
  image: ImageSourcePropType;
}[];
export interface cartsProp {
  image: ImageSourcePropType;
  title: string;
  text: string;
  price: number;
  order: boolean;
}
export interface itemProp {
  image: ImageSourcePropType;
  title: string;
  price: number;
  like?: boolean;
  navigation: StackNavigationProp<HomeParams, "Home">;
}
export type HomeParams = {
  Home: undefined;
  Carts: undefined;
  AllCategories: undefined;
  Detail: undefined;
  Order: undefined;
  Account: undefined;
  PreviousOrders: undefined;
  ChangeInfo: undefined;
  Help: undefined;
  PreviousOrderDetail: undefined;
  AgentConsole: undefined;
};
export type initallProp = StackScreenProps<InitialParams, "InitialScreen">;
export type InitialParams = {
  InitialScreen: undefined;
  SignupScreen: undefined;
  LoginScreen: undefined;
};

export type homeProp = StackScreenProps<HomeParams, "Home">;

export type headerProp = {
  title: string;
  navigation: StackNavigationProp<HomeParams, "Home">;
};
