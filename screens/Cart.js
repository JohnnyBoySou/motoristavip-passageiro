import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Block, theme, Text, Button } from 'galio-framework';
import { Card } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import { Language } from '../constants';
import API from './../services/api';
import CartAPI from './../services/cart';
import materialTheme from './../constants/Theme';
import Empty from './../components/Empty';
import config from '../config';

const { width } = Dimensions.get('screen');

const Cart = ({ navigation }) => {
  const [order, setOrder] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getOrders();
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('token');
    setLoggedIn(userToken != null);
  };

  const parseOrders = useCallback((items) => {
    let totalQty = 0;
    let totalValue = 0;
    items.forEach(element => {
      totalQty += element.qty;
      totalValue += element.qty * element.price;
    });

    setOrder(items);
    setTotalValue(totalValue.toFixed(2));
    setTotalQty(totalQty);
    setLoading(false);
  }, []);

  const getOrders = () => {
    CartAPI.getCartContent(parseOrders);
  };

  const renderProceedButton = () => {
    if (loggedIn) {
      return (
        <Button
          style={{ backgroundColor: materialTheme.COLORS.DEFAULT, width: "100%" }}
          onPress={() => { navigation.navigate('SelectAddress', { "restaurant_id": order[0].restaurant_id }) }}
          shadowless
        >
          {Language.proceedToCheckout.toUpperCase()}
        </Button>
      );
    } else {
      return (
        <Button
          style={{ backgroundColor: materialTheme.COLORS.DEFAULT }}
          onPress={() => { navigation.navigate('Login') }}
          shadowless
        >
          {Language.proceedToLoginFirst.toUpperCase()}
        </Button>
      );
    }
  };

  const showProceedButton = () => {
    if (order.length > 0) {
      return (
        <Block center space={"evenly"} width={width} height={100}>
          <Block>
            <Block row>
              <Text>{Language.cartSubtotal}:</Text>
              <Text bold color={materialTheme.COLORS.PRIMARY}>{totalValue}{config.currencySign}</Text>
            </Block>
          </Block>
          {renderProceedButton()}
        </Block>
      );
    } else {
      return null;
    }
  };

  const renderEmpty = () => {
    if (totalQty === 0 && !loading) {
      return (
        <Empty text={Language.noItemsInCart} />
      );
    } else {
      return null;
    }
  };

  const renderItems = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        {renderEmpty()}
        <Block flex>
          {showProceedButton()}
          {
            order.map((item, index) => (
              <TouchableOpacity key={item.id + index}>
                <Card
                  callback={(qty, id) => { CartAPI.updateQty(id, qty, parseOrders) }}
                  isCart
                  key={item.id + index}
                  id={item.id}
                  item={item}
                  horizontal
                  from={"items"}
                />
              </TouchableOpacity>
            ))
          }
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderItems()}
    </Block>
  );
};

const styles = StyleSheet.create({
  cartCheckout: {
    backgroundColor: "white"
  },
  listStyle: {
    padding: theme.SIZES.BASE,
  },
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

Cart.navigationOptions = ({ navigation }) => ({
  header: <Header back options title={Language.order} navigation={navigation} />
});

export default Cart;
