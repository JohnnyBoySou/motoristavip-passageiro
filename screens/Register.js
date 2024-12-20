import React, { useState } from "react";
import {
  StatusBar,
  View,
  Image,
  ScrollView
} from "react-native";
import { Block, Text } from "galio-framework";
import Input from "@components/Input";
import { argonTheme, Language } from "../constants";

import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from '@theme/button'

import { registerUser } from '@api/auth'

export default function Register({ navigation }) {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [phone, setphone] = useState();
  const [name, setname] = useState();
  const [error, seterror] = useState();

  const refemail = React.createRef();
  const refpassword = React.createRef();
  const refphone = React.createRef();
  const refname = React.createRef();

  const handleRegister = async () => {
    try {
     await registerUser({ email: email, password: password, name: name, phone: phone })
      navigation.replace('Home');
    } catch (error) {
      seterror(error);
    }
  }
  const handlePhoneChange = (text) => {
    let formattedText = text.replace(/[^\d]/g, '');
    if (formattedText.length > 10) {
        formattedText = formattedText.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (formattedText.length > 6) {
        formattedText = formattedText.replace(/(\d{2})(\d{5})/, '($1) $2');
    } else if (formattedText.length > 2) {
        formattedText = formattedText.replace(/(\d{2})/, '($1)');
    }

    setphone(formattedText);
};

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView style={{ backgroundColor: '#fff', paddingTop: 80, }}>
        <StatusBar backgroundColor='#fff' barStyle={"dark-content"} />
        <Block flex middle>
          <Block style={{backgroundColor: "#FFF",paddingVertical: 30, borderRadius: 12, width: '100%', paddingHorizontal: 20,}}>
            <Block flex>
              <Block >
                <Image source={require('../assets/icon.png')} style={{ width: 124, height: 124, objectFit: 'contain', backgroundColor: '#d1d1d1', alignSelf: 'center', borderRadius: 12, marginBottom: 12, }} />
                <Text bold size={18} center>motorista<Text bold size={18} center color='#10B981'>.</Text>vip</Text>
              </Block>
              <Block flex style={{ marginHorizontal: 20, marginTop: 24, rowGap: 6, }}>
                <Input
                  value={name}
                  borderless
                  ref={refname}
                  onChangeText={text => setname(text)}
                  placeholder={Language.name}
                  iconContent={
                    <Feather name="user" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                  onSubmitEditing={() => refphone.current?.focus()}

                />
                <Input
                  value={phone}
                  ref={refphone}
                  onChangeText={handlePhoneChange}
                  maxLength={15}
                  placeholder={Language.phone}
                  keyboardType="phone-pad"
                  iconContent={
                    <Feather name="phone" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                  onSubmitEditing={() => refemail?.current?.focus()}
                />
                <Input
                  value={email}
                  borderless
                  ref={refemail}
                  onChangeText={text => setemail(text)}
                  placeholder={"E-mail"}
                  keyboardType="email-address"
                  iconContent={
                    <Feather name="mail" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                  onSubmitEditing={() => refpassword.current?.focus()}
                />
                <Input
                  value={password}
                  password
                  borderles
                  ref={refpassword}
                  placeholder={Language.password}
                  onChangeText={text => setpassword(text)}
                  keyboardType='password'
                  iconContent={
                    <Feather name="lock" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                  onSubmitEditing={handleRegister}
                />
                <View style={{ rowGap: 16, }}>
                  {error && <Error text={error} />}
                  <Button text='Criar conta' variant="secundary" onPress={handleRegister} />
                  <Button text='Entrar' onPress={() => navigation.navigate('Login')} variant="ghost2" />
                </View>
              </Block>
            </Block>
          </Block>
        </Block>
        <Block style={{ height: 120, }} />
      </ScrollView>
    </SafeAreaView>
  );
}
