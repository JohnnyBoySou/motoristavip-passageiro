import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  Linking,
  TouchableOpacity,
  View
} from "react-native";
import config from '../config';
import { Block, Text } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme, Language } from "../constants";

const { width, height } = Dimensions.get("screen");

import AuthContext from './../store/auth'

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falha ao obter token push para notificação push!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('É necessário usar um dispositivo físico para notificações push');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token.data;
}


const Login = ({ navigation }) => {

  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, }}>
    <ScrollView style={{ backgroundColor: argonTheme.COLORS.PRIMARY, paddingTop: 110, }}>
      <StatusBar backgroundColor={argonTheme.COLORS.PRIMARY} barStyle={"light-content"} />
      <Block flex middle >
        <Block style={styles.registerContainer}>
          <Block flex >
            <Block >
              <Image source={require('../assets/icon.png')} style={{ width: 124, height: 124, objectFit: 'contain', backgroundColor: '#d1d1d1', alignSelf: 'center', borderRadius: 12, marginBottom: 12, }} />
              <Text bold size={18} center>motorista<Text bold size={18} center color='#10B981'>.</Text>vip</Text>
            </Block>
            <Block flex >
              <Block style={{ marginHorizontal: 20, marginTop: 24, }}>
                <Input
                  value={email}
                  borderless
                  onChangeText={text => setEmail(text)}
                  placeholder={"E-mail"}
                  keyboardType="email-address"
                  iconContent={<Feather name="mail" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />}
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
                <Input
                  value={password}
                  password
                  borderles
                  placeholder={Language.password}
                  onChangeText={text => setPassword(text)}
                  iconContent={
                    <Feather name="lock" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
              </Block>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: 10, marginBottom: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 5, }} onPress={() => Linking.openURL(config.domain + "/password/reset").catch(err => console.error("Couldn't load page", err))} >
                <Text size={14} style={{ textDecorationLine: 'underline', textDecorationColor: argonTheme.COLORS.PRIMARY }} color={argonTheme.COLORS.PRIMARY}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
              <Block style={{ marginHorizontal: 20, }}>
                <TouchableOpacity style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 8, }} onPress={() => signIn({ email: email, password: password, expoPushToken: expoPushToken })} >
                  <Text bold size={16} color={argonTheme.COLORS.WHITE} center>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderColor: argonTheme.COLORS.PRIMARY, justifyContent: 'center', marginTop: 16, alignItems: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 2, marginHorizontal: 1, }} onPress={() => navigation.navigate('Register')} >
                  <Text bold size={16} color={argonTheme.COLORS.PRIMARY} center>Criar uma conta</Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      <Block style={{ height: 120, }} />
      </ScrollView>
    </SafeAreaView>
      
  );
};

export default Login;


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    backgroundColor: "#FFF",
    paddingVertical: 30,
    borderRadius: 12,
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    flexGrow: 1,
  }
});

