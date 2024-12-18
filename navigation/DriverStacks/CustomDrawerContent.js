import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text } from "galio-framework";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const handleOpen = () => {
    Linking.openURL("https://motorista.vip/termos");
  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text bold size={18} color='#fff' center>motorista<Text bold size={18} center color='#10B981'>.</Text>vip</Text>
      </View>
      {/* Drawer Items */}
      <DrawerItemList {...props} />
      <TouchableOpacity style={{ backgroundColor: '#002333', display: 'flex', flexDirection: 'row', alignItems: 'center',   paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, }} onPress={handleOpen} >
        <AntDesign
          name="filetext1"
          size={18}
          color='#FFF'
          style={{ marginRight: 14, marginLeft: 8, }}
        />
        <Text bold size={14} color='#FFF' center>Termos de uso</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002333", // ou argonTheme.COLORS.PRIMARY, se preferir
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 140,
    height: 120,
    marginBottom: -10,
    resizeMode: "contain",
  },
});

export default CustomDrawerContent;
