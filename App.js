import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, { isLoggedInVar, tokenVar, cache } from './apollo';
import LoggedInNav from './navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  const preloadAssets = () => {
    const fontsToLoad = [
      Ionicons.font
    ]
    console.log(Ionicons.font)
    const fontPromises = fontsToLoad.map((font) => {
      return Font.loadAsync(font)
    });

    const imagesToLoad = [
      require("./assets/logo.png"),
    ]
    const ImagePromises = imagesToLoad.map(image => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...ImagePromises]);
  }

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }

    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      // serialize: false,
    });

    return preloadAssets();
  }

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />)
  }
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}


