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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Text, theme } from "galio-framework";
import { AntDesign } from '@expo/vector-icons';
import { Language, argonTheme } from "../constants";
import AuthContext from './../store/auth'
import Fancy from "./../components/Fancy"
import API from "./../services/api"

import Avatar from "components/Avatar";
import Button from "@theme/button";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile({ navigation }) {
  const [user, setuser] = useState();
  async function getCurrentUser() {
    var userJSON = await AsyncStorage.getItem('user');
    if (userJSON !== null) {
      var parsedUser = JSON.parse(userJSON)
      setuser(parsedUser)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  const [deleteModal, setdeleteModal] = useState(false);

  const openTerms = () => {
    Linking.openURL('https://motorista.vip/termos')
  }

  if (!user) {
    return (
      <View style={{ justifyContent: 'center', flex: 1,paddingHorizontal: 20,backgroundColor: '#f1f1f1',}}>
        <StatusBar backgroundColor='#f1f1f1' barStyle={"dark-content"} />
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Avatar bg={argonTheme.COLORS.PRIMARY} w={150} h={150} size={72} cl='#fff' />
        </View>
        <Text style={{ fontSize: 22, marginVertical: 12, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, textAlign: 'center', lineHeight: 24, }}>Faça login para acessar seu perfil</Text>
        <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY+20, padding: 12, borderRadius: 12, marginVertical: 12, }}>
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
  }

  return (
    <Block flex style={{ backgroundColor: '#f1f1f1', }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20, }}>
          <AuthContext.Consumer>
            {({ signOut }) => (
              <Fancy
                color="red"
                buttonColor="red"
                visible={deleteModal}
                icon_ios={'trash-bin-outline'} icon_android="trash-bin-outline"
                title={Language.close_account} subtitle={Language.close_account_info}
                button={Language.ok} closeAction={() => { setdeleteModal(false) }}
                action={() => {
                  API.deactivateUser((responseJson) => {
                    setdeleteModal(false);
                    signOut();
                  }, () => {
                  });
                }}
              ></Fancy>
            )}
          </AuthContext.Consumer>

          <Avatar />
          
          <Block flex>
            <Block middle style={{marginTop: 15,}}>
              <Text bold size={28} color="#32325D">{user?.name}</Text>
              <Text size={16} color="#32325D" style={{ marginBottom: 30 }}>{user?.email}</Text>
            </Block>
            <Block style={{ rowGap: 12, }}>
              <AuthContext.Consumer>
                {({ signOut }) => (
                  <TouchableOpacity style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 8, }} onPress={signOut} >
                  <Text bold size={16} color={argonTheme.COLORS.WHITE} center>Sair</Text>
                </TouchableOpacity>
                )}
              </AuthContext.Consumer>
              
              <Button onPress={openTerms} variant="ghost2" text='Acessar termos de uso' />
              <TouchableOpacity style={{ backgroundColor: '#ff000020', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 8, }} onPress={() => { setdeleteModal(true) }}>
                <Text size={16} bold style={{ textAlign: "center", color: "red", }}>
                  {Language.deleteAccount}
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </View>
      </ScrollView>
    </Block>
  );
}




const styles = StyleSheet.create({

  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: theme.COLORS.WHITE,
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

