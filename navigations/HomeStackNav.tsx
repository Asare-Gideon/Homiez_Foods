import { View, Text } from "react-native";
import React from "react";
import { HomeParams } from "../types";
import Home from "../screens/HomeScreen/Home";
import Carts from "../screens/CartsScreen/Carts";
import AllCat from "../screens/AllCategoriesScreen/AllCat";
import Detail from "../screens/DetailScreen/Detail";
import Order from "../screens/OrederScreen/Order";
import Account from "../screens/AccountScreen/Account";
import PreviousOrder from "../screens/PreviousOrderScreen/PreviousOrder";
import Change from "../screens/ChangeInfoScreen/Change";
import Help from "../screens/HelpScreen/Help";
import OrderDetail from "../screens/PreviousOrderDetailsScreen/OrederDetail";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Agent from "../screens/AgentScreen/Agent";
import Map from "../screens/MapScreen/Map";
import Login from "../screens/LoginScreen/Login";
import Signup from "../screens/SignupScreen/Signup";
import Initial from "../screens/InitialScreen/Initial";
import ProcessPrevOrder from "../screens/processPrevOrderScreen/ProcessPrevOrder";

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: false,
};
const Stack = createStackNavigator<HomeParams>();

const HomeStackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={TransitionScreenOptions}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Carts" component={Carts} />
      <Stack.Screen name="AllCategories" component={AllCat} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PreviousOrders" component={PreviousOrder} />
      <Stack.Screen name="ChangeInfo" component={Change} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="PreviousOrderDetail" component={OrderDetail} />
      <Stack.Screen name="AgentConsole" component={Agent} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="InitialScreen" component={Initial} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="ProcessPreviousOrder" component={ProcessPrevOrder} />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
