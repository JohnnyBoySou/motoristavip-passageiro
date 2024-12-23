import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StatusBar, Platform, FlatList, ActivityIndicator, Linking } from 'react-native';
import { Text } from 'galio-framework'
import { argonTheme } from '../constants';
import { AntDesign, Feather } from '@expo/vector-icons';
import Avatar from '../components/Avatar';

import { findDriver, createOrder } from '@api/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FindDriver({ navigation, route }) {
    const [drivers, setdrivers] = useState([]);
    const [ride, setride] = useState();
    const [loading, setloading] = useState(true);
    const start = route?.params?.fa ? route.params.fa : 'R. Maria Antônia da Silva Mascarenhas - Ilha da Figueira, Jaraguá do Sul - SC, 89258-140, Brasil'
    const end = route?.params?.fa2 ? route.params.fa2 : 'R. Marcos Emílio Verbinenn - Água Verde, Jaraguá do Sul - SC, 89254-640, Brasil'
    const start_lat = route?.params?.lat ? route.params.lat : '-26.7254701';
    const start_long = route?.params?.lng ? route.params.lng : '-48.693386'
    const end_lat = route?.params?.lat2 ? route.params.lat2 : '-26.487062';
    const end_long = route?.params?.lng2 ? route.params.lng2 : '-49.079829'
    // const user_phone = route?.params?.phone ? route.params.phone : '11999999999';

    const [user_phone, setuser_phone] = useState();
    const getDrivers = async () => {
        try {
            const res = await findDriver({ start: start, end: end, phone: '11999999999' });
            const phone = await AsyncStorage.getItem('phone');
            setuser_phone(phone);
            setride(res)
            setdrivers(res.drivers)
        } catch (error) {

        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        getDrivers()
    }, [])

    return (
        <>
            <ScrollView style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}>
                <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                <View style={{ paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_600SemiBold', color: '#F1F1F1', lineHeight: 24, }}>Escolher motorista</Text>
                        <TouchableOpacity style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="transparent" />
                        </TouchableOpacity>
                    </View>
                    {loading ? <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20, }} /> :
                        <View>
                            <FlatList showsHorizontalScrollIndicator={false}
                                style={{  marginVertical: 20, }}
                                contentContainerStyle={{ rowGap: 20, }}
                                data={drivers} keyExtractor={item => item.id} renderItem={({ item }) => <CardOrder item={item}
                                    end={end} start={start}
                                    start_lat={start_lat} end_lat={end_lat}
                                    start_long={start_long} end_long={end_long}
                                    user_phone={user_phone}
                                />} />
                        </View>}
                </View>




            </ScrollView>
        </>
    )
}


const CardOrder = ({ item, start, end, start_lat, start_long, end_lat, end_long, user_phone }) => {
    const navigation = useNavigation();

    const params = {
        issd: 1,
        driver_id: item.id, // ID do motorista
        phoneclient: user_phone, // Telefone do cliente
        comment: '', // Comentário inicial 
        pickup_address: start, // Endereço de coleta
        delivery_address: end, // Endereço de entrega 
        delivery_lat: end_lat, // Latitude do destino
        delivery_lng: end_long, // Longitude do destino
        pickup_lat: start_lat, // Latitude de coleta
        pickup_lng: start_long // Longitude de coleta
    };
    const handleConfirmRide = async () => {
        try {
            const res = await createOrder(params);
            if (res) {
                const message = `Olá, quero pedir uma corrida. 👇\n
📍 Local de embarque\n${params.pickup_address}\n
🏁 Meu destino\n${params.delivery_address}\n
📱 Meu telefone: ${user_phone}\n
🧾 Preço estimado: ${item.ride_cost_formated}\n
🚕 Informações do veículo\n
MOTORISTA: ${item.name}\n
SEM MODELO\n
PLACA`;
                Linking.openURL(`https://wa.me/+55${item.phone}/?text=${encodeURIComponent(message)}`);
            }
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 12, padding: 12, }}>
            <Text style={{ fontSize: 24, marginTop: 10, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 28, }}>{item?.ride_cost_formated}</Text>
            <Text style={{ fontSize: 16, marginVertical: 6, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 18, }}>Duração da corrida: {item?.ride_time}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Inter_300Regular', color: '#334F5C', lineHeight: 18, }}>{item?.distance} de distância ({item.duration_text})</Text>
            <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: argonTheme.COLORS.PRIMARY+10, }}>
                <Avatar w={42} h={42} size={18} bg="#fff" src={item.avatar} />
                <View style={{ flexDirection: 'column', marginLeft: 8, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 14, }}>{item?.name?.length > 24 ? item?.name.slice(0, 24) + '...' : item.name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: argonTheme.COLORS.PRIMARY + 99, lineHeight: 14, }}>{item?.restorant.name?.length > 24 ? item?.restorant.name.slice(0, 24) + '...' : item.restorant.name}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleConfirmRide} style={{ backgroundColor: argonTheme.COLORS.PRIMARY, marginTop: 12, borderRadius: 8, padding: 14, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontWeight: 900, fontSize: 16, lineHeight: 20, }}>
                    Confirmar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

