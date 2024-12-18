import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { argonTheme } from '../constants';

export default function Avatar({ w = 48, h = 48, size=20, bg = "#f1f1f1", cl = argonTheme.COLORS.PRIMARY }) {
    const [user, setuser] = useState();
    async function getCurrentUser() {
        var userJSON = await AsyncStorage.getItem('user');
        if (userJSON !== null) {
            var parsedUser = JSON.parse(userJSON)
            setuser(parsedUser)
        }
    }
    useEffect(() => {
        getCurrentUser()
    }, [])

    if (user?.avatar) {
        return <Image source={{ uri: user?.avatar }} style={{ width: w, height: h, borderRadius: 100, backgroundColor: bg, }} />
    }
    return (<View style={{ width: w, height: h, backgroundColor: bg, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
        <AntDesign
            name="user"
            style={{ textAlign: 'center' }}
            size={size}
            color={cl}
        />
    </View>
    )
}