import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Animated, ScrollView, Dimensions, View, TouchableOpacity, StatusBar, Platform, FlatList, TextInput } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework'
const { width, height } = Dimensions.get('screen');
import PlacesInput from 'react-native-places-input';
import { Language, argonTheme } from '../constants';
import { Input } from '../components'
import API from '../services/api'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import { AnimatePresence, MotiView } from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [placesStart, setPlacesStart] = useState([]);
    const [placesEnd, setPlacesEnd] = useState([]);
    
    const [nameStart, setnameStart] = useState('Local de embarque');
    const [nameEnd, setnameEnd] = useState('Local de entrega');
    const [searchStart, setsearchStart] = useState(false);
    const [searchEnd, setsearchEnd] = useState(false);
    const [phone, setphone] = useState();

    const [user, setuser] = useState();

    const handleRide = () => {
        if(placesStart.length == 0 || placesEnd.length == 0) return;
        navigation.navigate('FindDriver', {
            lat: placesStart[0].result.geometry.location.lat,
            lng: placesStart[0].result.geometry.location.lng,
            fa: placesStart[0].result.formatted_address,
            lat2: placesEnd[0].result.geometry.location.lat,
            lng2: placesEnd[0].result.geometry.location.lng,
            fa2: placesEnd[0].result.formatted_address,
            phone: phone,
        })
    }
    const ModalStart = () => {
        return (
            <MotiView from={{ translateY: height }} animate={{ translateY: 0, }} exit={{ translateY: height, }} transition={{ type: 'timing', duration: 500, }} style={{ backgroundColor: argonTheme.COLORS.PRIMARY,  position: 'absolute', top: 0, width: width, height: height,  }}>
                <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flexGrow: 1, flex: 1,  }}>
                    <View style={{ width: '100%', marginTop: Platform.OS == 'ios' ? 60 : 30, backgroundColor: argonTheme.COLORS.PRIMARY, }}>
                        <TouchableOpacity onPress={() => { setsearchStart(false) }} style={{ width: 48, marginLeft: 20, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 28, marginVertical: 12, fontFamily: 'Inter_700Bold', color: '#FFF', lineHeight: 30, marginHorizontal: 20, }}>Insira seu local de embarque</Text>
                        
                        <View style={{ marginHorizontal: 12, }}>
                            <PlacesInput
                                queryTypes="address"
                                placeHolder="Ex: Rua Rudofo Bosco, Centro, Campinas - SP"
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
                                    setPlacesStart([place]);
                                    setnameStart(place.result.formatted_address);
                                    setsearchStart(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </MotiView>

        )
    }
    const ModalEnd = () => {
        return (
            <MotiView from={{ translateY: height }} animate={{ translateY: 0, }} exit={{ translateY: height, }} transition={{ type: 'timing', duration: 500, }} exitTransition={{ duration: 500, }} style={{ backgroundColor: argonTheme.COLORS.PRIMARY, position: 'absolute', top: 0, width: width, height: height  }}>
                <View style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flexGrow: 1, flex: 1, }}>
                    <View style={{ width: '100%', marginTop: Platform.OS == 'ios' ? 60 : 30, backgroundColor: argonTheme.COLORS.PRIMARY, }}>
                        <TouchableOpacity onPress={() => { setsearchEnd(false) }} style={{ width: 48, marginLeft: 20, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFfff30', borderRadius: 100, }} >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 28, marginVertical: 12, fontFamily: 'Inter_700Bold', color: '#FFF', lineHeight: 30, marginHorizontal: 20, }}>Insira seu local de destino</Text>
                        <View style={{ marginHorizontal: 12, }}>
                            <PlacesInput
                                queryTypes="address"
                                placeHolder="Ex: Rua Rudofo Bosco, Centro, Campinas - SP"
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
                                    setPlacesEnd([place]);
                                    setnameEnd(place.result.formatted_address);
                                    setsearchEnd(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </MotiView>
        )
    }

    useEffect(() => {
        const auth = async () => {
          try {
              const userToken = await AsyncStorage.getItem('token');
              setuser(userToken)
          } catch (error) {
          }
        };
        auth();
      }, []);

    return (
        <>
            <ScrollView style={{ backgroundColor: '#f1f1f1', }}>
                <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                <View style={{ paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ fontSize: 28, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 30, }}>Vamos para {'\n'}onde agora?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={{}}>
                            <Avatar bg="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 2, rowGap: 18, marginTop: 30, marginBottom: 10, overflow: 'hidden', paddingTop: 20, borderRadius: 16, backgroundColor: argonTheme.COLORS.PRIMARY, paddingHorizontal: 20, }}>
                        <View style={{ width: 3, height: 50, position: 'absolute', top: 80, left: 46, borderStyle: 'dashed', borderWidth: 2, borderColor: '#fff', }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#fff', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Feather name="map" size={20} color={argonTheme.COLORS.PRIMARY} />
                            </View>
                            <TouchableOpacity onPress={() => { setsearchStart(true) }} style={{ backgroundColor: '#ffffff10', flexGrow: 1, marginHorizontal: 12, borderWidth: 2, borderColor: '#ffffff50', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <Text style={{ color: '#d1d1d1', width: 190, marginLeft: 12, fontSize: 14, lineHeight: 18, fontFamily: 'Inter_400Regular' }}>{nameStart.length > 44 ? nameStart.slice(0, 44) + '...' : nameStart}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#334F5C', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Feather name="map-pin" size={20} color='#FFF' />
                            </View>
                            <TouchableOpacity onPress={() => { setsearchEnd(true) }} style={{ backgroundColor: '#ffffff10', flexGrow: 1, marginHorizontal: 12, borderWidth: 2, borderColor: '#ffffff50', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 100, alignItems: 'center', flexDirection: 'row', }}>
                                <Text style={{ color: '#d1d1d1', width: 190, marginLeft: 12, fontSize: 14, lineHeight: 18, fontFamily: 'Inter_400Regular' }}>{nameEnd.length > 44 ? nameEnd.slice(0, 44) + '...' : nameEnd}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleRide} style={{ backgroundColor: placesStart.length == 0 || placesEnd.length == 0 ? '#B2BDC290' :  '#fff', marginBottom: 20, borderRadius: 8, padding: 20, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: placesStart.length == 0 || placesEnd.length == 0 ? '#fff' :  argonTheme.COLORS.PRIMARY , alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontWeight: 900, fontSize: 18, lineHeight: 20, }}>
                                Solicitar corrida
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20, }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 24, }}>Minhas corridas</Text>
                        <FlatList horizontal showsHorizontalScrollIndicator={false}
                            style={{ marginHorizontal: -20, marginVertical: 20, }}
                            contentContainerStyle={{ columnGap: 12, paddingLeft: 20, paddingRight: 20, }}
                            ListEmptyComponent={<EmptyOrders />}
                            data={user ? data : null} keyExtractor={item => item.id} renderItem={({ item }) => <CardOrder item={item} />} />
                    </View>
                </View>
            </ScrollView>
            <AnimatePresence>{searchStart && <ModalStart />}</AnimatePresence>
            <AnimatePresence>{searchEnd && <ModalEnd />}</AnimatePresence>
        </>
    )
}

const EmptyOrders = () => {
    return (
        <View style={{ borderRadius: 12, backgroundColor: argonTheme.COLORS.PRIMARY + 20, padding: 20, width: 200, }}>
            <Ionicons name="car-sport" size={32} color={argonTheme.COLORS.PRIMARY} />
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: argonTheme.COLORS.PRIMARY, lineHeight: 18, marginVertical: 6, }}>Você ainda não fez nenhuma corrida.</Text>
            <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 14, color: argonTheme.COLORS.PRIMARY+99 }}>Solicite uma nova preenchendo os dados acima.</Text>
            
    </View>
)}

const CardOrder = ({ item }) => {
    //<Text style={{ fontSize: 16, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 22, }}>{item?.name.length > 12 ? item.name.slice(0, 12) + '...' : item.name}</Text>
    return (
        <View style={{ backgroundColor: '#FFF', height: 160, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 12, }}>
            <Avatar bg="#f1f1f1" />
            <Text style={{ fontSize: 20, marginVertical: 6, marginTop: 10, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 22, }}>{item?.price}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: argonTheme.COLORS.PRIMARY + 99, lineHeight: 18, }}>{item?.car.length > 12 ? item?.car.slice(0, 12) + '...' : item.car}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: '#334F5C', lineHeight: 18, }}>{item?.date}</Text>
        </View>
    )
}


const data = [
    {
        id: "corrida1",
        name: "Julio Cesar",
        price: "R$ 25,00",
        car: "FIAT ARGO - LKXS-2924",
        date: "8 de nov. - 19:28"
    },
    {
        id: "corrida2",
        name: "Ana Beatriz",
        price: "R$ 30,00",
        car: "HONDA CIVIC - PLT-9823",
        date: "12 de nov. - 15:24"
    },
    {
        id: "corrida3",
        name: "Carlos Alberto",
        price: "R$ 18,50",
        car: "VOLKSWAGEN GOL - BTA-4021",
        date: "14 de nov. - 09:20"
    },
    {
        id: "corrida4",
        name: "Mariana Oliveira",
        price: "R$ 22,00",
        car: "CHEVROLET ONIX - QWZ-3718",
        date: "14 de nov. - 15:00"
    },
    {
        id: "corrida5",
        name: "Ricardo Lopes",
        price: "R$ 28,75",
        car: "FORD KA - HTM-6524",
        date: "17 de nov. - 12:21"
    }
]
