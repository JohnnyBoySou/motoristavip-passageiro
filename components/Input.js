import React, { useState, } from "react";
import { View, TextInput } from "react-native";
import { argonTheme } from "../constants";

function Input(props) {
  const [select, setselect] = useState();
  console.log(props)
  return (
    <View>
      <View style={{ position: 'absolute', left: 14, top: 14, }}>
      {props.iconContent}
    </View>
    <TextInput
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      placeholderTextColor={argonTheme.COLORS.MUTED}
      style={{ borderWidth: 1.5, borderColor: select ? argonTheme.COLORS.PRIMARY : '#D1D1D1', paddingLeft: 42, padding: 12, borderRadius: 8, marginBottom: 10, color: argonTheme.COLORS.DEFAULT }}
      onFocus={() => setselect(true)}
      onBlur={() => setselect(false)}
      keyboardType={props.keyboardType}
      secureTextEntry={props.password}
      >
    </TextInput>
      </View>
  );
}


export default Input;
