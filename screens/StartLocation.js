import React from 'react';
import * as Location from 'expo-location';
import { AntDesign, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Dimensions, Platform, Linking } from 'react-native';
import PlacesInput from 'react-native-places-input';
import { argonTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@theme/button';
const { width, height } = Dimensions.get('window');

export default function StartLocation({ navigation }) {


    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
            } else {
                Linking.openSettings();
            }
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            let address = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            const name = `${address[0].street}, ${address[0].district}, ${address[0].subregion} - ${address[0].region}`;
            const place = [{ result: { formatted_address: `${address[0].street}, ${address[0].district}, ${address[0].subregion} - ${address[0].region}`, geometry: { location: { lat: location.coords.latitude, lng: location.coords.longitude } } }, }]
            handleSetStart(place, name);
        }
    }

    const handleSetStart = async (place, name) => {
        try {
            const start = { place: place, name: name };
            await AsyncStorage.setItem('startLocation', JSON.stringify(start));
        } catch (error) {
            console.log(error);
        } finally {
            navigation.goBack();
        }
    }

    return (
        <View from={{ translateY: height }} animate={{ translateY: 0, }} exit={{ translateY: height, }} transition={{ type: 'timing', duration: 500, }} style={{ backgroundColor: argonTheme.COLORS.PRIMARY, position: 'absolute', top: 0, width: width, height: height, }}>
            <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flexGrow: 1, flex: 1, }}>
                <View style={{ width: '100%', marginTop: Platform.OS == 'ios' ? 60 : 30, backgroundColor: argonTheme.COLORS.PRIMARY, }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, marginLeft: 20, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, marginVertical: 12, fontFamily: 'Inter_700Bold', color: '#FFF', lineHeight: 30, marginHorizontal: 20, }}>Insira seu local de embarque</Text>

                    <View style={{ marginHorizontal: 12, }}>
                        <PlacesInput
                            queryTypes="address"
                            placeHolder="Ex: Rua Rodolfo Bosco, Centro, Campinas - SP"
                            stylesInput={{ backgroundColor: '#FFF', fontFamily: 'Inter_400Regular', width: '100%', }}
                            googleApiKey='AIzaSyCn39Ap3hDfetoQBDLVI05mhyFQRb8q420'
                            queryCountries={['br']}
                            language="pt-BR"
                            stylesItemText={{ fontFamily: 'Inter_400Regular', color: argonTheme.COLORS.PRIMARY + 99 }}
                            searchRadius={500}
                            searchLatitude={-26.4892328}
                            iconResult={<Feather name="map-pin" size={18} color={argonTheme.COLORS.SUCCESS} style={{ alignSelf: 'center', position: 'absolute', right: 20, }} />}
                            searchLongitude={-49.0687411}
                            onSelect={(place) => {
                                handleSetStart([place], place.result.formatted_address);
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 150, left: 40, right: 40, }}>
                <Button text="Usar minha localização atual" variant='ghost' onPress={getCurrentLocation} />
            </View>
        </View>

    )
}