import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Language, argonTheme } from '../../constants'

// screens
import Orders from "./../../screens/Orders";
import OrderDetails from './../../screens/OrderDetails'

import { TouchableOpacity, Platform, View, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Block, Text } from "galio-framework";

import Avatar from "../../components/Avatar";

const Stack = createStackNavigator();

export default function OrdersStack(props) {
   
    return (
        <Stack.Navigator presentation="card" >
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'space-between', alignItems: 'center',  paddingHorizontal: 20,  paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 20, }}>
                            <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <Feather name="menu" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Corridas</Text>
                            <Avatar />
                        </Block>
                    ),
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'space-between',  alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 20,}}>
                            <TouchableOpacity onPress={() => { navigation.goBack()}} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <Feather name="arrow-left" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Detalhes da corrida</Text>
                            <Block style={{ width: 48, height: 48}} />
                        </Block>
                    ),
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    )
}