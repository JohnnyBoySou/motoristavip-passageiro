import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, ScrollView, Dimensions, View, TouchableOpacity, } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework'
const { width, height } = Dimensions.get('screen');
import PlacesInput from 'react-native-places-input';
import { Language, argonTheme } from '../constants';
import { Input } from './../components'
import API from './../services/api'
import { Feather, Ionicons } from '@expo/vector-icons';

export function AddAddress({ navigation }) {
    const [places, setPlaces] = useState([]);
    const [region, setRegion] = useState(null);
    return (
        <Block flex center style={styles.home}>
            <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ position: 'absolute', left: 20, top: 30, zIndex: 99, width: 48, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: argonTheme.COLORS.PRIMARY, borderRadius: 100, }} >
                <Feather name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 20, zIndex: 99, left: 20, right: 20, borderRadius: 24, padding: 20,  height: 300, backgroundColor: argonTheme.COLORS.PRIMARY, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, }}>
                    <View style={{ width: 24, height: 24,   backgroundColor: argonTheme.COLORS.SUCCESS, borderWidth: 6, borderColor: '#fff', borderRadius: 100, }} />
                    <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: -70,  }}>
                        <PlacesInput
                            queryTypes="address"
                            placeHolder="Insira seu local de embarque"
                            stylesInput={{ backgroundColor: '#FFF', borderRadius: 12, fontFamily: 'ArgonExtra',  width: '100%', }}
                            googleApiKey='AIzaSyCn39Ap3hDfetoQBDLVI05mhyFQRb8q420'
                            queryCountries={['br']}
                            language="pt-BR"
                            searchRadius={500}
                            searchLatitude={-26.4892328}
                            searchLongitude={-49.0687411}
                            onSelect={(place) => {
                                console.log(place);
                                setPlaces([place]);
                                setRegion({
                                    latitude: place.result.geometry.location.lat,
                                    longitude: place.result.geometry.location.lng,
                                    latitudeDelta: 0.008,
                                    longitudeDelta: 0.009,
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, }}>
                    <View style={{ width: 24, height: 24,   backgroundColor: argonTheme.COLORS.INFO, borderWidth: 6, borderColor: '#fff', borderRadius: 100, }} />
                    <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: -70,  }}>
                        <PlacesInput
                            queryTypes="address"
                            placeHolder="Para onde vamos?"
                            stylesInput={{ backgroundColor: '#FFF', borderRadius: 12, fontFamily: 'ArgonExtra',  width: '100%', }}
                            googleApiKey='AIzaSyCn39Ap3hDfetoQBDLVI05mhyFQRb8q420'
                            queryCountries={['br']}
                            language="pt-BR"
                            searchRadius={500}
                            searchLatitude={-26.4892328}
                            searchLongitude={-49.0687411}
                            onSelect={(place) => {
                                console.log(place);
                                setPlaces([place]);
                                setRegion({
                                    latitude: place.result.geometry.location.lat,
                                    longitude: place.result.geometry.location.lng,
                                    latitudeDelta: 0.008,
                                    longitudeDelta: 0.009,
                                });
                            }}
                        />
                    </View>
                </View>

            </View>

            <MapView
                region={region}
                style={styles.home}
                showsScale={true}
                showsBuildings={true}
            >
                {places.map((marker, index) => (
                    <Marker draggable
                        key={index}
                        coordinate={{ latitude: marker.result.geometry.location.lat, longitude: marker.result.geometry.location.lng }}
                        title={marker.result.name}
                        description={marker.formatted_address}
                        onDragEnd={(e) => {
                            var thePlace = places[0];
                            thePlace.result.geometry.location.lat = e.nativeEvent.coordinate.latitude;
                            thePlace.result.geometry.location.lng = e.nativeEvent.coordinate.longitude;

                            setPlaces([thePlace]);

                            setRegion({
                                latitude: thePlace.result.geometry.location.lat,
                                longitude: thePlace.result.geometry.location.lng,
                                latitudeDelta: 0.008,
                                longitudeDelta: 0.009,
                            });


                        }}
                    />
                ))}
            </MapView>
            <Block style={styles.buttonCallout}>
                {places.length == 1 ? <Button onPress={() => {
                    navigation.navigate('CompleteAddress', {
                        lat: places[0].result.geometry.location.lat,
                        lng: places[0].result.geometry.location.lng,
                        fa: places[0].result.formatted_address
                    }
                    )
                }} shadowless color="success">{Language.continue}</Button> : null}
            </Block>
        </Block>
    )
}

export function CompleteAddress({ route, navigation }) {

    const lat = route.params.lat;//navigation.getParam('lat', '');
    const lng = route.params.lng;//navigation.getParam('lng', '');

    const [fa, setFa] = useState(route.params.fa);
    const [addressNumber, setAddressNumber] = useState('');
    const [intercom, setIntercom] = useState('');
    const [floor, setFloor] = useState('');
    const [entry, setEntry] = useState('');
    const [appartment, setAppartment] = useState('');

    return (
        <Block flex center>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>


                <Text bold size={16} style={styles.title}>{Language.addressDetails}
                </Text>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.address} iconContent={<Block />} value={fa} onChange={({ nativeEvent: { text } }) => setFa(text)} />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.addressNumber} iconContent={<Block />} value={addressNumber} onChange={({ nativeEvent: { text } }) => setAddressNumber(text)} />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.appartment} iconContent={<Block />} value={appartment} onChange={({ nativeEvent: { text } }) => setAppartment(text)} />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.intercom} iconContent={<Block />} value={intercom} onChange={({ nativeEvent: { text } }) => setIntercom(text)} />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.entry} iconContent={<Block />} value={entry} onChange={({ nativeEvent: { text } }) => setEntry(text)} />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder={Language.floor} iconContent={<Block />} value={floor} onChange={({ nativeEvent: { text } }) => setFloor(text)} />
                </Block>
                <Block center>
                    <Button shadowless uppercase color="success" style={[styles.button]} onPress={() => {
                        API.saveAddress({
                            lng: lng,
                            lat: lat,
                            address: addressNumber + ", " + fa,
                            intercom: intercom,
                            floor: floor,
                            entry: entry,
                            appartment: appartment
                        }, () => {
                            console.log("address added");
                            navigation.navigate("SelectAddress", { newAddress: fa })
                            //navigation.navigate('Cart')
                        })

                    }}>
                        {Language.addAddress}
                    </Button>
                </Block>
            </ScrollView>
        </Block>
    )

}


const styles = StyleSheet.create({
    button: {
        marginTop: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE
    },
    cartCheckout: {
        backgroundColor: "white"
    },
    listStyle: {
        padding: theme.SIZES.BASE,
    },
    home: {
        width: width,
        height: height,
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: "center"
    },
    buttonCallout: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        alignSelf: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent"
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    title: {
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: argonTheme.COLORS.HEADER
    },
});