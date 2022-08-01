import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Account from "../screens/AccountScreen/Account";
import Change from "../screens/ChangeInfoScreen/Change";
import Help from "../screens/HelpScreen/Help";
import OrderDetail from "../screens/PreviousOrderDetailsScreen/OrederDetail";
import PreviousOrder from "../screens/PreviousOrderScreen/PreviousOrder";
import { accountInfoStackParams } from "../types";

const Stack = createStackNavigator<accountInfoStackParams>();

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};
export default function AccountInfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionScreenOptions,
        headerShown: false,
      }}
      initialRouteName="Account"
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PreviousOrders" component={PreviousOrder} />
      <Stack.Screen name="PreviousOrderDetail" component={OrderDetail} />
      <Stack.Screen name="ChangeInfo" component={Change} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
}
