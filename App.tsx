import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './app/store/store';
import Loader from './components/Loader';
import useCachedResources from './hooks/useCachedResources';
import HomeStackNav from './navigations/HomeStackNav';
import InitialStack from './navigations/InitialStack';

export default function App() {
  const isLoadingComplete = useCachedResources()
  const [isLogedIn, setIsLogedIn] = useState(true);


  if (!isLoadingComplete) {
    return (
      <Loader />
    )
  } else {
    if (isLogedIn) {
      return (
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <HomeStackNav />
          </NavigationContainer>
        </Provider>
      );

    } else {
      return (
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <InitialStack />
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
