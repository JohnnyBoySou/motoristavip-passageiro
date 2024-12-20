import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { argonTheme } from "../constants";
import { Feather } from "@expo/vector-icons";

const Input = forwardRef((props, ref) => {
  const [select, setselect] = useState(false);
  const inputRef = React.useRef();
  const [password, setpassword] = useState(props?.password ? true : false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <View>
      <View style={{ position: 'absolute', left: 16, top: 20 }}>
        {props.iconContent}
      </View>
      <TextInput
        ref={inputRef}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        placeholderTextColor={argonTheme.COLORS.MUTED}
        style={{
          borderWidth: 1.5,
          borderColor: select ? argonTheme.COLORS.PRIMARY : '#D1D1D1',
          paddingLeft: 46,
          padding: 14,
          borderRadius: 8,
          marginBottom: 16,
          fontSize: 18,
          fontFamily: 'Inter_400Regular',
          color: argonTheme.COLORS.DEFAULT,
        }}
        onFocus={() => setselect(true)}
        onBlur={() => setselect(false)}
        value={props.value}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        secureTextEntry={password}
        returnKeyType={props.returnKeyType || "next"} // Define o tipo de tecla
        onSubmitEditing={props.onSubmitEditing} // Chama o evento passado do pai
      />
      {props.password &&
        <TouchableOpacity onPress={() => setpassword(!password)} style={{ position: 'absolute', width: 42, height: 42, right: 8, top: 8, justifyContent: 'center', alignItems: 'center',  }}>
          <Feather name={password ? 'eye-off' : 'eye'} size={18} color={argonTheme.COLORS.PRIMARY+90} />
        </TouchableOpacity>}
    </View>
  );
});

export default Input;
