import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './app/store/store';
import Loader from './components/Loader';
import useCachedResources from './hooks/useCachedResources';
import HomeStackNav from './navigations/HomeStackNav';
import InitialStack from './navigations/InitialStack';
import Home from './screens/HomeScreen/Home';

export default function App() {
  const isLoadingComplete = useCachedResources()
  const [isLogedIn, setIsLogedIn] = useState(false)


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

