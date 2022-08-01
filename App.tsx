import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store/store";
import Loader from "./components/Loader";
import useCachedResources from "./hooks/useCachedResources";
import HomeDrawer from "./navigations/HomeDrawerNav";
// import HomeStackNav from "./navigations/HomeStackNav";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <Loader />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style="light" />
          <NavigationContainer>
            <HomeDrawer />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
