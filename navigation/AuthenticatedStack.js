import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Stacks
import OrdersStack from "./CommonStacks/OrdersStack.js"
import NotificationsStack from "./CommonStacks/NotificationsStack.js"
import ProfileStack from "./CommonStacks/ProfileStack.js"
import EarningsStack from "./CommonStacks/EarningsStacks.js"

import { AntDesign, MaterialCommunityIcons, } from "@expo/vector-icons";
import { argonTheme } from "../constants/index.js";
import CustomDrawerContent from "./DriverStacks/CustomDrawerContent.js";

const Drawer = createDrawerNavigator();

export default function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color }) => {
          switch (route.name) {
            case "Notifications":
              return (
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={18}
                  color={color}
                />
              );
            case "Orders":
              return (
                <AntDesign
                  name="car"
                  size={18}
                  color={color}
                />
              );
            case "Earnings":
              return (
                <MaterialCommunityIcons
                  name="piggy-bank-outline"
                  size={18}
                  color={color}
                />
              );
            case "Profile":
              return (
                <AntDesign
                  name="user"
                  size={18}
                  color={color}
                />
              );
            case "Terms":
              return (
                <AntDesign
                  name="filetext1"
                  size={18}
                  color={color}
                />
              );
            default:
              return null;
          }
        },
        headerShown: false,
        drawerType: "slide",
        drawerActiveTintColor: argonTheme.COLORS.PRIMARY,
        drawerInactiveTintColor: argonTheme.COLORS.WHITE,
        drawerActiveBackgroundColor: '#FFF',
        drawerLabelStyle: {
          marginLeft: -16,
        },
        drawerItemStyle: {
          paddingHorizontal: 8,
        },
        drawerContentStyle: {
          backgroundColor: argonTheme.COLORS.PRIMARY,
          paddingTop: 30,
          paddingHorizontal: 10,
        }
      })}
      initialRouteName="Orders"
    >
      <Drawer.Screen name="Orders"  component={OrdersStack} options={{title: 'Corridas'}}/>
      <Drawer.Screen name="Earnings" component={EarningsStack} options={{title: 'Ganhos'}} />
      <Drawer.Screen name="Notifications" component={NotificationsStack}  options={{title: 'Notificações'}}/>
      <Drawer.Screen name="Profile" component={ProfileStack}  options={{title: 'Minha Conta'}} />
    </Drawer.Navigator>
  );
}

/*drawerContent={props => <CustomDrawerContent {...props} screens={[
          {"title":'Corridas','link':"Orders"},
          {"title":Language.earnings,'link':"Earnings"},
          {"title":Language.notifications,'link':"Notifications"},
          { "title": Language.profile, 'link': "Profile" },
        ]} />} */