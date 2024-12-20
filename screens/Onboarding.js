import React, { useState } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    StatusBar,
    View,
    Text,
    Platform,
    TextInput
} from 'react-native';
import { argonTheme } from '../constants';
import { MotiImage, MotiView, AnimatePresence } from 'moti';
import Button from '@theme/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default function Onboarding({ navigation }) {

    const [modalPhone, setmodalPhone] = useState();
    const [phone, setphone] = useState('');
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
    const handleNotLogin = async () => {
        if(phone.length != 15) return;
        try {
            await AsyncStorage.setItem('phone', phone)
            navigation.replace('Home')
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, alignItems: 'center', flex: 1, }}>
            <StatusBar barStyle="default" backgroundColor={argonTheme.COLORS.PRIMARY} />
            <MotiImage from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} source={require('../assets/icon.png')} style={{ width: 200, height: 200, objectFit: 'contain', marginTop: 60, }} />
            <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} transition={{ delay: 400, type: 'timing' }} >
                <Text style={{ fontSize: 28, marginVertical: 12, fontFamily: 'Inter_700Bold', color: '#FFF', textAlign: 'center', lineHeight: 30, marginHorizontal: 40, }}>Corridas fáceis, atendimento ideal!</Text>
                <Text style={{ fontSize: 16, marginVertical: 12, marginBottom: 80, fontFamily: 'Inter_400Regular', color: '#FFF', textAlign: 'center', lineHeight: 20, marginHorizontal: 40, }}>Peça uma corrida em poucos cliques, com profissionais especializados em te atender bem.</Text>
            </MotiView>
            <MotiView from={{opacity: 0, translateY: 30,}} animate={{opacity: 1, translateY: 0,}} transition={{type: 'timing', delay: 800}} style={{ rowGap: 18, left: 40, right: 40, position: 'absolute', bottom: 50, }}>
                <Button onPress={handleLogin} variant='primary' text="Entrar" />
                <Button onPress={handleRegister} variant='white' text="Criar conta" />
                <View style={{ flexGrow: 1, height: 1, backgroundColor: '#ffffff30', }}/>
                <Button onPress={() => {setmodalPhone(true)}} variant='ghost' text="Continuar sem login" />
            </MotiView>

            <AnimatePresence>{modalPhone && <ModalSelectPhone phone={phone} setmodalPhone={setmodalPhone} setphone={setphone} handleNotLogin={handleNotLogin} />}</AnimatePresence>
        </View>
    );
};

const ModalSelectPhone = ({ setmodalPhone, phone, setphone, handleNotLogin }) => {
    const handlePhoneChange = (text) => {
        // Remove todos os caracteres não numéricos
        let formattedText = text.replace(/[^\d]/g, '');

        // Aplica a formatação desejada (ex: (11) 99999-9999)
        if (formattedText.length > 10) {
            formattedText = formattedText.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (formattedText.length > 6) {
            formattedText = formattedText.replace(/(\d{2})(\d{5})/, '($1) $2');
        } else if (formattedText.length > 2) {
            formattedText = formattedText.replace(/(\d{2})/, '($1)');
        }

        setphone(formattedText);
    };
    return (
        <MotiView from={{ translateY: height }} animate={{ translateY: 0, }} exit={{ translateY: height, }} transition={{ type: 'timing', duration: 500, }} style={{ backgroundColor: argonTheme.COLORS.PRIMARY,  position: 'absolute', top: 0, width: width, height: height,  }}>
            <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flexGrow: 1, flex: 1,  }}>
                <View style={{ width: '100%', marginTop: Platform.OS == 'ios' ? 60 : 30, backgroundColor: argonTheme.COLORS.PRIMARY, }}>
                    <TouchableOpacity onPress={() => { setmodalPhone(false) }} style={{ width: 48, marginLeft: 20, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, marginVertical: 12, fontFamily: 'Inter_700Bold', color: '#FFF', lineHeight: 30, marginHorizontal: 20, }}>Insira seu telefone</Text>
                    
                    <View style={{ marginHorizontal: 12, }}>
                        <TextInput
                            value={phone}
                            onChangeText={handlePhoneChange}
                            keyboardType='phone-pad'
                            maxLength={15}
                            placeholder="Ex: (11) 99999-9999"
                            placeholderTextColor='#fffFFF90'
                            autoFocus
                            style={{ backgroundColor: 'transparent', fontSize: 28, marginBottom: 32, padding: 12, paddingHorizontal: 8, fontFamily: 'Inter_500Medium', color: '#fff', borderBottomWidth:2, borderBottomColor: '#FFFF',  marginVertical: 12, }}
                        />
                        <Button onPress={handleNotLogin} variant={phone?.length < 14 ? 'ghost' : 'primary'} text="Continuar" />
                    </View>
                </View>
            </View>
        </MotiView>

    )
}