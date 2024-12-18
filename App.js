import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from "expo-asset";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts,  Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_300Light } from '@expo-google-fonts/inter';

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();
import { Block, GalioProvider } from "galio-framework";

import config from './config';

//App Screens
import Screens from './navigation/Screens';

import { Images, articles, argonTheme } from './constants';
import { SharedStateProvider } from './store/store';
import 'expo-asset';

// cache app images
const assetImages = [
  Images.noData,
  Images.RemoteLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let [interFontsLoaded] = useFonts({ Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, });

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'ArgonExtra': require('./assets/font/ArgonExtra.ttf')
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <SharedStateProvider>
            <Block flex>
              <Screens />
            </Block>
          </SharedStateProvider>
        </GalioProvider>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
