import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Linking,
  TouchableOpacity} from "react-native";
import config from '../config';
import { Block, Text } from "galio-framework";

import Button  from '@theme/button'
import Input from "@components/Input";

import { argonTheme, } from "../constants";

import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from '@api/auth'
import Error from "@theme/error";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const refPass = useRef();

  const handleLogin = async () => {
    if (!email || !password) return seterror('Preencha todos os campos');
    setloading(true)
    try {
      await loginUser({ email: email, password: password });
      navigation.replace('Home');
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',}}>
      <ScrollView style={{ paddingTop: 110, }}>
        <StatusBar backgroundColor='#FFF' barStyle={"dark-content"} />
        <Block flex middle >
          <Block style={{backgroundColor: "#FFF",paddingVertical: 30, borderRadius: 12, width: '100%', paddingHorizontal: 20,}}>
            <Block flex >
              <Block >
                <Image source={require('../assets/icon2.png')} style={{ width: 124, height: 124, objectFit: 'contain', backgroundColor: '#d1d1d1', alignSelf: 'center', borderRadius: 12, marginBottom: 12, }} />
                <Text bold size={18} center>motorista<Text bold size={18} center color='#10B981'>.</Text>vip</Text>
              </Block>
              <Block flex >
                <Block style={{ marginHorizontal: 20, marginTop: 24, }}>
                  <Input
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder={"E-mail"}
                    keyboardType="email-address"
                    iconContent={<Feather name="mail" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />}
                    style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                    onSubmitEditing={() => refPass.current.focus()}
                  />
                  <Input
                    value={password}
                    password
                    borderles
                    ref={refPass}
                    placeholder='Senha'
                    onChangeText={text => setPassword(text)}
                    iconContent={
                      <Feather name="lock" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                    }
                    style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                    onSubmitEditing={handleLogin}
                  />
                </Block>
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: 10, marginBottom: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 5, }} onPress={() => Linking.openURL(config.domain + "/password/reset").catch(err => console.error("Couldn't load page", err))} >
                  <Text size={14} style={{ textDecorationLine: 'underline', textDecorationColor: argonTheme.COLORS.PRIMARY }} color={argonTheme.COLORS.PRIMARY}>
                    Esqueceu sua senha?
                  </Text>
                </TouchableOpacity>
                <Block style={{ marginHorizontal: 20, rowGap: 16, }}>
                  {error && <Error text={error} />}
                  <Button loading={loading} text='Entrar' onPress={handleLogin} variant="secundary"/>
                  <Button text='Criar conta' onPress={() => navigation.navigate('Register')} variant="ghost2"/>
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


/*
useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);
/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
*/

/*
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
      import Input from './../components/Input';
vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token.data;
}
*/