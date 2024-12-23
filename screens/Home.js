import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StatusBar, Platform, FlatList, RefreshControl } from 'react-native';
import { Text, } from 'galio-framework'
import { argonTheme } from '../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrders } from '@api/orders';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function Home({ navigation }) {
    const [placesStart, setPlacesStart] = useState([]);
    const [placesEnd, setPlacesEnd] = useState([]);

    const [nameStart, setnameStart] = useState('Local de embarque');
    const [nameEnd, setnameEnd] = useState('Local de entrega');
    const [phone, setphone] = useState();

    const isFocused = useIsFocused();

    useEffect(() => {
        const getLocations = async () => {
            if (isFocused) {
                const str = await AsyncStorage.getItem('startLocation');
                const prs = JSON.parse(str);
                setnameStart(prs.name ? prs.name : 'Local de embarque')
                setPlacesStart(prs.place);
                const etr = await AsyncStorage.getItem('endLocation');
                const ers = JSON.parse(etr);
                setnameEnd(ers.name ? ers.name : 'Local de embarque')
                setPlacesEnd(ers.place);
                const ph = await AsyncStorage.getItem('phone');
                setphone(ph);
            } else {
                return;
            }
        }
        getLocations();
    }, [isFocused]);



    const handleRide = () => {
        if (placesStart?.length == 0 || placesEnd?.length == 0) return;
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

    return (
        <>
            <ScrollView style={{ backgroundColor: '#f1f1f1', }}>
                <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                <View style={{ paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ fontSize: 28, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 30, }}>Vamos para {'\n'}onde agora?</Text>
                        <TouchableOpacity onPress={() => { navigation.push('Profile') }} style={{}}>
                            <Avatar bg="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 2, rowGap: 18, marginTop: 30, marginBottom: 10, overflow: 'hidden', paddingTop: 20, borderRadius: 16, backgroundColor: argonTheme.COLORS.PRIMARY, paddingHorizontal: 20, }}>
                        <View style={{ width: 3, height: 50, position: 'absolute', top: 80, left: 46, borderStyle: 'dashed', borderWidth: 2, borderColor: '#fff', }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#fff', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Feather name="map" size={20} color={argonTheme.COLORS.PRIMARY} />
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('StartLocation') }} style={{ backgroundColor: '#ffffff10', flexGrow: 1, marginHorizontal: 12, borderWidth: 2, borderColor: '#ffffff50', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center', flexDirection: 'row', }}>
                                <Text style={{ color: '#d1d1d1', width: 190, marginLeft: 12, fontSize: 14, lineHeight: 18, fontFamily: 'Inter_400Regular' }}>{nameStart?.length > 44 ? nameStart.slice(0, 44) + '...' : nameStart}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#334F5C', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                <Feather name="map-pin" size={20} color='#FFF' />
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('EndLocation') }} style={{ backgroundColor: '#ffffff10', flexGrow: 1, marginHorizontal: 12, borderWidth: 2, borderColor: '#ffffff50', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 100, alignItems: 'center', flexDirection: 'row', }}>
                                <Text style={{ color: '#d1d1d1', width: 190, marginLeft: 12, fontSize: 14, lineHeight: 18, fontFamily: 'Inter_400Regular' }}>{nameEnd?.length > 44 ? nameEnd.slice(0, 44) + '...' : nameEnd}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleRide} style={{ backgroundColor: placesStart?.length == 0 || placesEnd?.length == 0 ? '#B2BDC290' : '#fff', marginBottom: 20, borderRadius: 8, padding: 20, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: placesStart?.length == 0 || placesEnd?.length == 0 ? '#fff' : argonTheme.COLORS.PRIMARY, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontWeight: 900, fontSize: 18, lineHeight: 20, }}>
                                Solicitar corrida
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Orders />
                </View>
            </ScrollView>
        </>
    )
}

const Orders = () => {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    const fetchData = async () => {
        setloading(true)
        try {
            const response = await getOrders();
            setdata(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={{ marginVertical: 20, }}>
            <Text style={{ fontSize: 20, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 24, }}>Minhas corridas</Text>
            <FlatList horizontal showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -20, marginVertical: 20, }}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                contentContainerStyle={{ columnGap: 12, paddingLeft: 20, paddingRight: 20, }}
                ListEmptyComponent={<EmptyOrders />}
                data={data} keyExtractor={item => item.id} renderItem={({ item }) => <CardOrder item={item} />} />
        </View>
    )
}


const EmptyOrders = () => {
    return (
        <View style={{ borderRadius: 12, backgroundColor: argonTheme.COLORS.PRIMARY + 20, padding: 20, width: 200, }}>
            <Ionicons name="car-sport" size={32} color={argonTheme.COLORS.PRIMARY} />
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 18, color: argonTheme.COLORS.PRIMARY, lineHeight: 18, marginVertical: 6, }}>Você ainda não fez nenhuma corrida.</Text>
            <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 14, color: argonTheme.COLORS.PRIMARY + 99 }}>Solicite uma nova preenchendo os dados acima.</Text>

        </View>
    )
}

const CardOrder = ({ item }) => {
    const driver = item?.driver
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {navigation.navigate('OrderDetails', { item: item })}} >
            <View style={{ backgroundColor: '#FFF', width: 250, justifyContent: 'center', borderRadius: 12, padding: 16, }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16, }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 22, }}>R$ {item?.delivery_price}</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Inter_300Regular', color: '#334F5C', lineHeight: 18, marginBottom: 2, marginLeft: 4, }}>({item?.distance} km)</Text>
                </View>
                <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 18, width: 220, }}>{item?.time_created}</Text>
                <View style={{ flexDirection: 'row', marginTop: 12, }}>
                    <Avatar w={42} h={42} size={18} bg="#f1f1f1" src={driver?.avatar} />
                    <View style={{ flexDirection: 'column', marginLeft: 8, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 14, }}>{driver?.name?.length > 24 ? driver?.name.slice(0, 24) + '...' : driver.name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: argonTheme.COLORS.PRIMARY + 99, lineHeight: 14, }}>{item?.restorant.name?.length > 24 ? item?.restorant.name.slice(0, 24) + '...' : item.restorant.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
