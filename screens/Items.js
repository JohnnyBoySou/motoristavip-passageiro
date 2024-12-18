import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Block, theme } from 'galio-framework';
import { Card } from '../components';
import Tabs from './../components/Tabs';
import config from '../config';
const { width } = Dimensions.get('screen');
import Header from "../components/Header";
import { Language } from '../constants';
import API from './../services/api';

export default function Items (props){
  const navigation = useNavigation();
  const route = useRoute();
  const [itemID, setItemID] = useState(route.params?.itemId || config.SINGLE_MODE_ID);
  const [items, setItems] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [allDisplayList, setAllDisplayList] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          back={!config.SINGLE_MODE}
          search
          searchPlaceholder={Language.searchInRestaurant}
          options
          title={route.params?.name || config.SINGLE_MODE_NAME}
          navigation={navigation}
        />
      )
    });
    getItems();
  }, []);

  const _doSearch = (text) => {
    if (text.length === 0) {
      setDisplayList(allDisplayList);
    } else {
      const filteredList = allDisplayList.filter(list =>
        list.name.toLowerCase().includes(text.toLowerCase()) ||
        list.description.toLowerCase().includes(text.toLowerCase()) ||
        list.category_name.toLowerCase().includes(text.toLowerCase())
      );
      setDisplayList(filteredList);
    }
  };

  const getItems = () => {
    API.getItemsInRestaurant(itemID, (items) => {
      categorizedItemsToSingleListItems(items);
    });
  };

  const categorizedItemsToSingleListItems = (items) => {
    let list = [];
    let tabs = [];
    let addedIDS = [];

    Object.keys(items).forEach((key, index) => {
      Object.keys(items[index]).forEach((key, value) => {
        let item = items[index][key];
        item.restaurant_id = itemID;
        item.has_variants = item.has_variants + "" === "1";
        list.push(item);

        if (addedIDS.indexOf(item.category_name) === -1) {
          tabs.push({ id: item.category_name, title: item.category_name });
          addedIDS.push(item.category_name);
        }
      });
    });

    setDisplayList(list);
    setAllDisplayList(list);
    setTabs(tabs);
  };

  const openDetails = (item) => {
    navigation.navigate('Item', { item: item });
  };

  const renderItems = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {displayList.map((item, index) => (
            <TouchableOpacity key={item.id} onPress={() => openDetails(item)}>
              <Card key={item.id} item={item} horizontal from={"items"} />
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      <SelectableTabs tabs={tabs} changeFunction={(cat_name) => {
        setDisplayList(allDisplayList);
        _doSearch(cat_name);
      }} tabIndex={0} />
      {renderItems()}
    </Block>
  );
};

function SelectableTabs({ tabs, changeFunction, vertical }) {
  if (!tabs) return null;

  return (
    <Block style={{ marginTop: 12 }}>
      <Tabs
        style={{ backgroundColor: "#F8F9FE" }}
        data={tabs || []}
        vertical={vertical}
        initialIndex={0}
        onChange={id => changeFunction(id)}
      />
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});


