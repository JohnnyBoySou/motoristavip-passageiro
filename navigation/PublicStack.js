import React from "react";
import { TouchableOpacity, Platform, View } from "react-native";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { argonTheme, } from '../constants'

// screens
import Login from "@screens/Login";
import Register from "@screens/Register";
import Home from '@screens/Home';
import FindDriver from "@screens/FindDriver";
import Profile from "@screens/Profile";
import Onboarding from "@screens/Onboarding";
import Loading from "@screens/Loading";

import StartLocation from "@screens/StartLocation";
import EndLocation from "@screens/EndLocation";
import OrderDetails from "@screens/OrderDetails";


import { AntDesign, } from "@expo/vector-icons";
import { Text } from "galio-framework";

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
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: argonTheme.COLORS.PRIMARY, paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom:  0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color={argonTheme.COLORS.PRIMARY} />
                            </TouchableOpacity>
                            <Text size={20} color='#FFF' bold style={{ marginLeft: 18 }} >Detalhes da corrida</Text>
                        </View>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.ModalPresentationIOS,
                }}
            />
            <Stack.Screen
                name="StartLocation"
                component={StartLocation}
                options={{
                    headerShown: false,
                    ...TransitionPresets.ModalPresentationIOS
                 }}
            />
            <Stack.Screen
                name="EndLocation"
                component={EndLocation}
                options={{
                    headerShown: false,
                    ...TransitionPresets.ModalPresentationIOS
                 }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    headerMode: "screen",
                    header: ({ navigation, scene }) => (
                        <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#f1f1f1', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom:  0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#000' bold style={{ marginLeft: 18 }} >Meu Perfil</Text>
                        </View>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
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
                        <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text size={20} color={argonTheme.COLORS.PRIMARY} bold style={{ marginLeft: 18 }} >Entrar</Text>
                    </View>
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
                        <View  style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color={argonTheme.COLORS.PRIMARY} bold style={{ marginLeft: 18 }} >Criar conta</Text>
                        </View>
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
                        <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0, }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' bold style={{ marginLeft: 18 }} >Adicionar novo endereço</Text>
                        </View>
                    ),
                    headerTransparent: true,
                    ...TransitionPresets.SlideFromRightIOS,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
        </Stack.Navigator>
    )
}