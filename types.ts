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
  id: string;
  active: string;
  handle: (id: string) => void;
  image: ImageSourcePropType;
  color?: string;
}
export type categoriesDataTyp = {
  id: string;
  title: string;
  selected: boolean;
  image: ImageSourcePropType;
}[];
export interface cartsProp {
  image: string;
  title: string;
  price: number;
  quantity: number;
  id: string;
}
export interface itemProp {
  id: string;
  image: ImageSourcePropType;
  title: string;
  price: number;
  available?: boolean;
  like?: boolean;
  includes?: string[];
  navigation: StackNavigationProp<HomeParams, "Home">;
}
export type HomeParams = {
  Home: undefined;
  Carts: undefined;
  AllCategories: undefined;
  Detail: {
    selectedFood: string;
    //id: string;
    //imgURL: string;
    //name: string;
    //price: number;
    //includes?: string;
  };
  Order: undefined;
  Account: undefined;
  PreviousOrders: {
    fromOrders?: boolean;
  };
  ChangeInfo: undefined;
  Help: undefined;
  PreviousOrderDetail: {
    selectedOrder: string;
    fromOrders?: boolean;
  };
  ProcessPreviousOrder: {
    prevOrder: string;
  };
  AgentConsole: undefined;
  Map: undefined;
  InitialScreen: undefined;
  SignupScreen: undefined;
  LoginScreen: undefined;
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
  onBackPressed?: () => void;
};

export enum notificationTypes {
  order,
}

export enum paymentMethods {
  manual = 1,
  agent,
  electronic,
}
