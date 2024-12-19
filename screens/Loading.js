import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import { argonTheme } from '../constants';
import { MotiImage, MotiView } from 'moti';

export default function Loading({ navigation }) {
  const isFocused = navigation.isFocused();
  useEffect(() => {
    const auth = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const telefone = await AsyncStorage.getItem('phone');
        if (userToken || telefone) {
          navigation.replace('Home');
        }
      } catch (error) {
        navigation.replace('Onboarding');        
      }
    };
    auth();
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center',  flex: 1, }}>
      <StatusBar barStyle="default" />
      <MotiImage from={{opacity: 0, translateY: 50,}} animate={{opacity: 1, translateY: 0,}}  source={require('../assets/icon.png')} style={{ width: 200, height: 200, objectFit: 'contain' }}/>
      <MotiView from={{opacity: 0, scale: 0.2}} animate={{opacity: 1, scale: 1,}} transition={{delay: 400}}>
        <ActivityIndicator size={32} color="#FFF" />
      </MotiView>
    </View>
  );
};

