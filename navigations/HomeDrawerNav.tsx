import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useAppSelector } from "../app/reduxHooks/hooks";
import { selectAppVersion } from "../features/appConfig/appConfigSlice";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import Agent from "../screens/AgentScreen/Agent";
import ProcessPrevOrder from "../screens/processPrevOrderScreen/ProcessPrevOrder";
import { homeDrawerParams } from "../types";
import AccountInfoStack from "./AccountInfoStack";
import HomeStackNav from "./HomeStackNav";

const Drawer = createDrawerNavigator<homeDrawerParams>();

export default function HomeDrawer() {
  const { user } = useFirebaseAuth();
  const appVersion = useAppSelector(selectAppVersion);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      useLegacyImplementation={true}
      initialRouteName="Home"
      drawerContent={(props) => {
        const { state, ...rest } = props;
        const newState = { ...state };
        newState.routes = newState.routes.filter(
          (item) => item.name !== "ProcessPreviousOrder"
        );
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderWidth: 0.3,
                marginTop: 20,
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text>App Version - {appVersion}</Text>
            </View>
            {/* <Button
              buttonStyle={{
                backgroundColor: "#fff",
                padding: 14,
              }}
              titleStyle={{
                color: "#333333",
                fontSize: 14,
                textAlign: "left",
              }}
              containerStyle={{
                width: "100%",
              }}
              title="Repeat Previous Order"
            /> */}
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNav} />
      <Drawer.Screen name="Account" component={AccountInfoStack} />
      {user && (
        <Drawer.Screen
          options={{
            drawerLabel: "Repeat Previous Order",
          }}
          name="ProcessPreviousOrder"
          component={ProcessPrevOrder}
        />
      )}
      {user?.agent && (
        <Drawer.Screen
          options={{
            drawerLabel: "Agent Console",
          }}
          name="AgentConsole"
          component={Agent}
        />
      )}
    </Drawer.Navigator>
  );
}
