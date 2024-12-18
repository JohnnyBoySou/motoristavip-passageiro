import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Block, Text } from "galio-framework";
import { argonTheme } from "../../constants";
import Profile from "./../../screens/Profile";

const Stack = createStackNavigator();

export default function  ProfileStack(props) {
    return (
        <Stack.Navigator presentation="card">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    header: ({ navigation, scene }) => (
                        <Block row style={{ backgroundColor: argonTheme.COLORS.PRIMARY,  alignItems: 'center',  paddingHorizontal: 20,  paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: Platform.OS === 'ios' ? 20 : 20,}}>
                            <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                                <Feather name="menu" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text size={20} color='#fff' style={{ marginLeft: 20, }} bold >Perfil</Text>
                        </Block>
                    ),
                    headerMode:"screen",
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    )
}