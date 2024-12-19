import React from "react";
import { TouchableOpacity, Platform } from "react-native";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { argonTheme, } from '../constants'

// screens
import Login from "../screens/Login";
import Register from "../screens/Register";
import { AddAddress, CompleteAddress } from "../screens/AddAddress";

import Home from '../screens/Home';
import FindDriver from "../screens/FindDriver";
import Profile from "../screens/Profile";
import Onboarding from "../screens/Onboarding";

import Cart from "../screens/Cart";
import SelectAddress from "../screens/SelectAddress";
import Items from "../screens/Items";
import Loading from "../screens/Loading";


import { AntDesign, Feather } from "@expo/vector-icons";
import { Block, Text } from "galio-framework";

const Stack = createStackNavigator();

export default function PublicStack() {
    return (
        <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{
                    headerShown: false,
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                 }}
            />
            <Stack.Screen
                name="Loading"
                component={Loading}
                options={{
                    headerShown: false,
                 }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{  alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#000' bold style={{ marginLeft: 18 }} >Meu Perfil</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="FindDriver"
                component={FindDriver}
                options={{
                    gestureEnabled: true,
                    headerShown: false, 
                    ...TransitionPresets.ModalPresentationIOS
                 }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text size={20} color={argonTheme.COLORS.PRIMARY} bold style={{ marginLeft: 18 }} >Entrar</Text>
                    </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color={argonTheme.COLORS.PRIMARY} bold style={{ marginLeft: 18 }} >Criar conta</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            
            <Stack.Screen
                name="AddAdress"
                component={AddAddress}
                options={{
                    headerShown: false,
                    
                }}
            />
            <Stack.Screen
                name="CompleteAddress"
                component={CompleteAddress}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="SelectAddress"
                component={SelectAddress}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen
                name="Items"
                component={Items}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </Block>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    )
}