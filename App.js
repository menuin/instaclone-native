import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ]
    const ImagePromises = imagesToLoad.map(image =>
      Asset.loadAsync(image))
    return Promise.all([...fontPromises, ...ImagePromises]);
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
          <LoggedOutNav />
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}


