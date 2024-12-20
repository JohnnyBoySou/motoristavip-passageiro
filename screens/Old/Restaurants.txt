import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Card } from '../components';
import { useRoute, useNavigation } from '@react-navigation/native';
import API from '../services/api';

const { width } = Dimensions.get('screen');

export default function Restaurants ()  {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  
  const route = useRoute();
  const navigation = useNavigation();

  const getRestaurants = useCallback(() => {
    const cityId = route.params?.cityId || null;
    API.getRestaurants(cityId, (restaurants) => {
      setRestaurants(restaurants);
      setAllRestaurants(restaurants);
    });
  }, [route.params]);

  useEffect(() => {
    getRestaurants();
    navigation.doSearch = _doSearch;
  }, [getRestaurants, navigation]);

  const _doSearch = (text) => {
    if (text.length === 0) {
      setRestaurants(allRestaurants);
    } else {
      const filteredList = allRestaurants.filter(list => 
        list.name.toLowerCase().includes(text.toLowerCase()) || 
        list.description.toLowerCase().includes(text.toLowerCase())
      );
      setRestaurants(filteredList);
    }
  };

  const openDetails = (restaurant) => {
    navigation.navigate('Items', { itemId: restaurant.id, restoName: restaurant.name });
  };

  const renderItems = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}>
      <Block flex>
        {restaurants.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => openDetails(item)}>
            <Card key={item.id} item={item} horizontal />
          </TouchableOpacity>
        ))}
      </Block>
    </ScrollView>
  );

  return (
    <Block flex center style={styles.home}>
      {renderItems()}
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

