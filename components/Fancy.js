import React from 'react'
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Language, argonTheme} from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'galio-framework';

export default function Fancy(props) {
  return (
    <FancyAlert
      visible={props.visible}
      icon={
        <View style={{
          flex: 1,
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          backgroundColor: props.color ? props.color : '#36AB87',
          borderRadius: 100,
          width: '100%',
          justifyContent: 'center', alignItems: 'center',
        }}>
          <Ionicons
            name={Platform.select({ ios: props.icon_ios, android: props.icon_android })}
            size={28}
            color="#FFFFFF"
          /></View>
      }
      style={{ backgroundColor: 'white', }}
    >
      <View style={styles.content}>
        <Text bold style={{ fontSize: 18, textAlign: 'center', color: argonTheme.COLORS.PRIMARY }}>{props.title}</Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: argonTheme.COLORS.PRIMARY }}>{props.subtitle}</Text>
        <View >
          <TouchableOpacity style={styles.btn} onPress={props.action}>
            <Text style={styles.btnText}>{props.button}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btn_cancel]} onPress={props.closeAction}>
            <Text style={styles.btnTextCancel}>{Language.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FancyAlert>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
    width: '100%',
  },
  content: {
    marginTop: -30,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#36AB87',
    width: '100%',
    marginTop: 10,
  },
  btn_cancel: {
    width: '100%',
    borderColor: '#e81925',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  btnwarning: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: 'red',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
    fontFamily: 'ArgonExtra',
  },
  btnTextCancel: {
    color: '#e81925',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontFamily: 'ArgonExtra',
  }
});
