import { Block } from 'galio-framework';
import React, { useState, useEffect } from 'react';
import { Linking, TouchableOpacity, } from 'react-native';
import { argonTheme } from '../constants';
import { Text } from 'galio-framework'
export default function Terms({ navigation, }) {

    const handleOpen = () => {
        Linking.openURL("https://motorista.vip/termos");
    }
    useEffect(() => {
    handleOpen();
    }, []);
    return <Block middle flex>
        <TouchableOpacity style={{ backgroundColor: argonTheme.COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, marginHorizontal: 20, borderRadius: 8, }} onPress={handleOpen} >
            <Text bold size={16} color={argonTheme.COLORS.WHITE} center>Abrir termos de uso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderColor: argonTheme.COLORS.PRIMARY, borderWidth: 2, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginTop: 12, paddingHorizontal: 40, marginHorizontal: 20, borderRadius: 8, }} onPress={() => { navigation.goBack(); }} >
            <Text bold size={16} color={argonTheme.COLORS.PRIMARY} center>Voltar</Text>
        </TouchableOpacity>
    </Block>;
}