import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Dimensions, Platform, Linking, ScrollView } from 'react-native';
import { argonTheme } from '../constants';
import Button from '@theme/button';
import Avatar from '@components/Avatar';
import MapView, { Marker } from 'react-native-maps';


export default function OrderDetails({ navigation, route }) {

    const item = route.params.item;
    const driver = item.driver;

    const handlePhone = () => {
        Linking.openURL(`tel:${driver?.phone}`);
    }

    const lat = item?.delivery_lat;
    const lng = item?.delivery_lng;

    return (
        <ScrollView style={{ backgroundColor: argonTheme.COLORS.PRIMARY, flex: 1, paddingTop: 70, }}>

            <View style={{ marginHorizontal: 30, flexDirection: 'row', marginBottom: -15, zIndex: 2, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
            </View>

            <View style={{ backgroundColor: '#f1f1f1', padding: 12, marginHorizontal: 30, paddingTop: 40, }}>
                <View style={{ justifyContent: 'center', borderRadius: 12, padding: 10, rowGap: 20, }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Inter_500Medium', color: argonTheme.COLORS.PRIMARY, lineHeight: 18, }}>Identificador: #{item?.id}</Text>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Valor: </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 6, }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 22, }}>R$ {item?.delivery_price}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Distância percorrida: </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 6, }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: argonTheme.COLORS.PRIMARY, lineHeight: 22, }}>{item?.distance} km</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Data: </Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: '#334F5C', lineHeight: 22, }}>{item?.time_created}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Embarque: </Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: '#334F5C', lineHeight: 22, }}>{item?.pickup_address}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Destino: </Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: '#334F5C', lineHeight: 22, }}>{item?.delivery_address}</Text>
                    </View>

                    <View style={{}}>
                        <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: '#334F5C', lineHeight: 20, }}>Motorista: </Text>
                        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-between', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <Avatar w={42} h={42} size={18} bg="#fff" />
                                <View style={{ flexDirection: 'column', marginLeft: 8, justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Inter_600SemiBold', color: argonTheme.COLORS.PRIMARY, lineHeight: 14, }}>{driver?.name?.length > 24 ? driver?.name.slice(0, 24) + '...' : driver.name}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: 'Inter_300Regular', color: argonTheme.COLORS.PRIMARY + 99, lineHeight: 14, }}>{item?.restorant.name?.length > 24 ? item?.restorant.name.slice(0, 24) + '...' : item.restorant.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handlePhone} style={{ backgroundColor: argonTheme.COLORS.PRIMARY, width: 46, height: 46, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <Feather name="phone" size={18} color='#FFF' />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ borderRadius: 24, overflow: 'hidden', width: '100%', height: 200, flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <MapView
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            initialRegion={{
                                latitude: parseInt(lat),
                                longitude: parseInt(lng),
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            <Marker coordinate={{lat, lng,}}/>
                        </MapView>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 30, flexDirection: 'row', marginTop: -15, zIndex: 2, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
                <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: argonTheme.COLORS.PRIMARY, }} />
            </View>
            <View style={{ height: 100, }}/>
        </ScrollView>
    )
}
