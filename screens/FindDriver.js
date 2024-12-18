import React, { useState } from 'react';
import { ScrollView, Dimensions, View, TouchableOpacity, StatusBar, Platform, FlatList } from 'react-native';
import { Text } from 'galio-framework'
const { width, height } = Dimensions.get('screen');
import PlacesInput from 'react-native-places-input';
import { argonTheme } from '../constants';
import { AntDesign, Feather } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { AnimatePresence, MotiView } from 'moti';

export default function FindDriver({ navigation }) {
    const [placesStart, setPlacesStart] = useState([]);
    const [placesEnd, setPlacesEnd] = useState([]);

    const [region, setRegion] = useState(null);
    const [nameStart, setnameStart] = useState('Local de embarque');
    const [nameEnd, setnameEnd] = useState('Local de entrega');
    const [searchStart, setsearchStart] = useState(false);
    const [searchEnd, setsearchEnd] = useState(false);





    return (
        <>
            <ScrollView style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}>
                <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                <View style={{ paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ width: 48,  height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_600SemiBold', color: '#F1F1F1', lineHeight: 24, }}>Escolher motorista</Text>
                        <TouchableOpacity style={{ width: 48,  height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="transparent" />
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <FlatList horizontal showsHorizontalScrollIndicator={false}
                            style={{ marginHorizontal: -20, marginVertical: 20, }}
                            contentContainerStyle={{ columnGap: 12, paddingLeft: 20, paddingRight: 20, }}
                            data={data} keyExtractor={item => item.id} renderItem={({ item }) => <CardOrder item={item} />} />
                    </View>
                </View>




            </ScrollView>
        </>
    )
}


const CardOrder = ({ item }) => {
    const handleConfirmRide = () => {
    }

    //<Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 18, }}>Chegará {item?.finish}h ao destino</Text>
    return (
        <View style={{ backgroundColor: '#FFF', width: 250, justifyContent: 'center', borderRadius: 12, padding: 12, }}>
            <View style={{ backgroundColor: '#d1d1d190', flexGrow: 1, height: 200, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                <Feather name="map" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 24, marginVertical: 6, marginTop: 10, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 28, }}>{item?.price}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Inter_300Regular', color: '#334F5C', lineHeight: 18, }}>{item?.time} de distância</Text>
            <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center', }}>
                <Avatar w={42} h={42} size={18} bg="#f1f1f1" />
                <View style={{ flexDirection: 'column', marginLeft: 8, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 14, }}>{item?.name.length > 24 ? item.name.slice(0, 24) + '...' : item.name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: argonTheme.COLORS.PRIMARY + 99, lineHeight: 14, }}>{item?.car.length > 24 ? item?.car.slice(0, 24) + '...' : item.car}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleConfirmRide} style={{ backgroundColor: argonTheme.COLORS.PRIMARY, marginTop: 12,  borderRadius: 8, padding: 14, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontWeight: 900, fontSize: 16, lineHeight: 20, }}>
                    Confirmar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const data = [
    {
        "id": "corrida1",
        "name": "Fernanda Silva",
        "price": "R$ 29,00",
        "car": "RENAULT KWID",
        "placa": "ABC-1234",
        "km": "2.8 km",
        "time": "4 min",
        "finish": "10:28",
    },
    {
        "id": "corrida2",
        "name": "Leonardo Costa",
        "price": "R$ 35,50",
        "car": "HYUNDAI HB20",
        "placa": "DEF-5678",
        "km": "3.5 km",
        "time": "6 min",
        "finish": "10:30",
    },
    {
        "id": "corrida3",
        "name": "Priscila Andrade",
        "price": "R$ 20,75",
        "car": "TOYOTA COROLLA",
        "placa": "GHI-9101",
        "km": "1.5 km",
        "time": "2 min",
        "finish": "10:24",
    },
    {
        "id": "corrida4",
        "name": "Rafael Souza",
        "price": "R$ 27,00",
        "car": "NISSAN MARCH",
        "placa": "JKL-2345",
        "km": "2.3 km",
        "time": "5 min",
        "finish": "10:27",
    },
    {
        "id": "corrida5",
        "name": "Tatiana Moreira",
        "price": "R$ 31,25",
        "car": "CHEVROLET SPIN",
        "placa": "MNO-6789",
        "km": "3.7 km",
        "time": "7 min",
        "finish": "10:30",
    }
]
