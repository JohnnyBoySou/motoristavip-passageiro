import React from "react";
import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Block, Text } from "galio-framework";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import argonTheme from "../constants/Theme";

const CustomDrawerContent = (props) => {
  const renderIcon = (title, focused) => {
    switch (title) {
      case "Notifications":
        return <MaterialCommunityIcons name="bell-outline" size={18} color={focused ? "white" : "black"} />
      case "Orders":
        return <AntDesign name="car" size={18} color={focused ? "white" : "black"} />;
      case "Earnings":
        return <MaterialCommunityIcons name="piggy-bank-outline" size={18} color={focused ? "white" : "black"} />
      case "Profile":
        return <AntDesign name="user" size={18} color={focused ? "white" : "black"} />
      default:
        return null;
    }
  };

  const renderDrawerItem = (title, focused, onPress) => (
    <TouchableOpacity style={{ height: 60 }} onPress={onPress}>
      <Block
        flex
        row
        style={focused ? styles.activeStyle : styles.inactiveStyle}
      >
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {renderIcon(title, focused)}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={18}
            bold={focused}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
  return null;
  return (
    <DrawerContentScrollView {...props}>
       <Block>
        {props?.map((item, index) => {
          return renderDrawerItem({
            title: item.title,
            screen: item.screen,
            focused: item.focused,
            onPress: item.onPress,
          });
        })}
      </Block>
    </DrawerContentScrollView>
  );
};




const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 1,
  },
  inactiveStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: "transparent",
  },
});

export default CustomDrawerContent;
