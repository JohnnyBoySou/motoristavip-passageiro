import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Block, Text } from "galio-framework";
import { Input } from "../components";
import { argonTheme, Language } from "../constants";
const { width, height } = Dimensions.get("screen");

import AuthContext from './../store/auth'

import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from '@theme/button'
import { View } from "moti";

export default function Register({ navigation }) {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [phone, setphone] = useState();
  const [name, setname] = useState();
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView style={{ backgroundColor: '#fff', paddingTop: 80, }}>
        <StatusBar backgroundColor='#fff' barStyle={"dark-content"} />
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block >
                <Image source={require('../assets/icon.png')} style={{ width: 124, height: 124, objectFit: 'contain', backgroundColor: '#d1d1d1', alignSelf: 'center', borderRadius: 12, marginBottom: 12, }} />
                <Text bold size={18} center>motorista<Text bold size={18} center color='#10B981'>.</Text>vip</Text>
              </Block>
              <Block flex style={{ marginHorizontal: 20, marginTop: 24, rowGap: 6, }}>
                <Input
                  value={name}
                  borderless
                  onChangeText={text => setname(text)}
                  placeholder={Language.name}
                  iconContent={
                    <Feather name="user" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
                <Input
                  value={phone}
                  borderless
                  onChangeText={text => setphone(text)}
                  placeholder={Language.phone}
                  keyboardType="phone-pad"
                  iconContent={
                    <Feather name="phone" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
                <Input
                  value={email}
                  borderless
                  onChangeText={text => setemail(text)}
                  placeholder={"E-mail"}
                  keyboardType="email-address"
                  iconContent={
                    <Feather name="mail" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
                <Input
                  value={password}
                  password
                  borderles
                  placeholder={Language.password}
                  onChangeText={text => setpassword(text)}
                  iconContent={
                    <Feather name="lock" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                  }
                  style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                />
                <View style={{ rowGap: 16, }}>
                  <AuthContext.Consumer>
                    {({ signUp }) => (
                      <Button text='Criar conta' variant="secundary" onPress={() => signUp({ email: email, password: password, name: name, phone: phone })} />
                    )}
                  </AuthContext.Consumer>
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
    width: width * 0.5,
    marginTop: 25
  }
});

