import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store/store";
import Loader from "./components/Loader";
import useCachedResources from "./hooks/useCachedResources";
import HomeStackNav from "./navigations/HomeStackNav";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [isLogedIn, setIsLogedIn] = useState(true);

  if (!isLoadingComplete) {
    return <Loader />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <HomeStackNav />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
