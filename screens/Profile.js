import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  View,
  Linking,
  StatusBar,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { AntDesign, Feather } from '@expo/vector-icons';
import { Language, argonTheme } from "../constants";
import Fancy from "@components/Fancy"

import Avatar from "@components/Avatar";
import Button from "@theme/button";
import Input from "@components/Input";
import { getUser, logout } from "@api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile({ navigation }) {
  const [user, setuser] = useState();
  async function getCurrentUser() {
    try {
      const res = await getUser();
      setemail(res.email);
      setphone(res.phone);
      setname(res.name);
      setuser(res);
    } catch (error) {
      console.log(error)
      setuser(null)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  const [deleteModal, setdeleteModal] = useState(false);

  const openTerms = () => {
    Linking.openURL('https://motorista.vip/termos')
  }

 

  const handleDelete = async () => {
    try {
      await disableUser()
      navigation.navigate('Onboarding');
    } catch (error) {
      console.log(error)
    }
  }
  const handleExit = async () => {
    try {
      await logout()
      navigation.navigate('Onboarding');
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = () => {
  }

  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [name, setname] = useState();

  const emailRef = React.createRef();
  const refphone = React.createRef();

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

  if (user == null) { 
    return (
      <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20, backgroundColor: '#f1f1f1', }}>
        <StatusBar backgroundColor='#f1f1f1' barStyle={"dark-content"} />
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Avatar bg={argonTheme.COLORS.PRIMARY} w={150} h={150} size={72} cl='#fff' />
        </View>
        <Text style={{ fontSize: 22, marginVertical: 12, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, textAlign: 'center', lineHeight: 24, }}>Faça login para acessar seu perfil</Text>
        
        <View style={{ rowGap: 16, marginTop: 12, }}>
          <Button onPress={() => { navigation.navigate('Login') }} variant='secundary' text="Entrar" />
          <Button onPress={() => { navigation.navigate('Register') }} variant='ghost2' text="Criar conta" />
          <Button onPress={openTerms} variant="outline" text='Acessar termos de uso' />
        </View>
      </View>
    )

  }

  return (
    <Block flex style={{ backgroundColor: '#f1f1f1', }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20, paddingTop: Platform.OS == 'android' ? 40 : 60, paddingBottom: 120, }}>
          <Fancy
            color="red"
            buttonColor="red"
            visible={deleteModal}
            icon_ios={'trash-bin-outline'} icon_android="trash-bin-outline"
            title={Language.close_account} subtitle={Language.close_account_info}
            button={Language.ok} closeAction={() => { setdeleteModal(false) }}
            action={handleDelete}
          ></Fancy>
          <Block flex>
            <Block style={{ marginTop: 20, }}>
              <View style={{ marginVertical: 24, justifyContent: 'center', alignItems: 'center',  }}>
                <Avatar bg={argonTheme.COLORS.PRIMARY} cl="#fff" w={150} h={150} size={72} />
              </View>
              <Input
                value={name}
                onChangeText={text => setname(text)}
                placeholder='Nome'
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
                placeholder="Telefone"
                keyboardType="phone-pad"
                iconContent={
                  <Feather name="phone" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                }
                style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                onSubmitEditing={() => emailRef?.current?.focus()}
              />
              <Input
                value={email}
                borderless
                ref={emailRef}
                onChangeText={text => setemail(text)}
                placeholder={"E-mail"}
                keyboardType="email-address"
                iconContent={
                  <Feather name="mail" size={18} style={{ marginRight: 6, }} color={argonTheme.COLORS.ICON} />
                }
                style={{ borderWidth: 1, borderColor: argonTheme.COLORS.INPUT }}
                onSubmitEditing={handleUpdate}
              />
            </Block>



            <Block style={{ rowGap: 12, }}>
              <Button onPress={handleUpdate} variant="secundary" text='Atualizar' />
              <View style={{ height: 2, backgroundColor: argonTheme.COLORS.BORDER, marginVertical: 12, }}/>
              <Button variant="ghost2" text="Sair" onPress={handleExit} />
              <Button onPress={openTerms} variant="ghost2" text='Acessar termos de uso' />
              <Button onPress={() => { setdeleteModal(true) }} variant="red" text='Deletar conta' />
            </Block>
          </Block>
        </View>
      </ScrollView>
    </Block>
  );
}



 /*
 if (!user) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20, backgroundColor: '#f1f1f1', }}>
        <StatusBar backgroundColor='#f1f1f1' barStyle={"dark-content"} />
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Avatar bg={argonTheme.COLORS.PRIMARY} w={150} h={150} size={72} cl='#fff' />
        </View>
        <Text style={{ fontSize: 22, marginVertical: 12, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, textAlign: 'center', lineHeight: 24, }}>Faça login para acessar seu perfil</Text>
        <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY + 20, padding: 12, borderRadius: 12, marginVertical: 12, }}>
          <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 16, lineHeight: 22, color: argonTheme.COLORS.PRIMARY, }}>
            - Acompanhe suas corridas {'\n'}
            - Acesse seus dados {'\n'}
            - Acesse seus cupons {'\n'}
            - Acesse seus pontos {'\n'}
          </Text>
        </View>
        <View style={{ rowGap: 16, marginTop: 12, }}>
          <Button onPress={() => { navigation.navigate('Login') }} variant='secundary' text="Entrar" />
          <Button onPress={openTerms} variant="ghost2" text='Acessar termos de uso' />
        </View>
      </View>
    )
  } */