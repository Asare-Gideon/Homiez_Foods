import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps, NavigationProp } from "@react-navigation/native";
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
  navigation: any;
}
export type homeDrawerParams = {
  Home: undefined;
  Account: undefined;
  ProcessPreviousOrder: undefined;
  AgentConsole: undefined;
};
export type accountInfoStackParams = {
  Account: undefined;
  PreviousOrders: {
    fromOrders?: boolean;
  };
  PreviousOrderDetail: {
    selectedOrder: string;
    fromOrders?: boolean;
  };
  ChangeInfo: undefined;
  Help: undefined;
};
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

export type homeProp = CompositeScreenProps<
  DrawerScreenProps<accountInfoStackParams>,
  StackScreenProps<HomeParams, "Home">
>;

export type headerProp = {
  title: string;
  navigation: any;
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
