import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const findDriver = async (params) => {
  const { start, end, phone, app = true } = params;
  const url = 'https://motorista.vip/findtaxi';
  const queryParams = new URLSearchParams({
    start,
    end,
    phone,
    app
  }).toString();
  try {
    const response = await axios.get(`${url}?${queryParams}`);
    console.log('Find Taxi response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error finding taxi:', error.response?.data || error.message);
    throw error;
  }
};

export const createOrder = async (params) => {
  const userLogged = JSON.parse(await AsyncStorage.getItem('user'))
  const userid = userLogged.id ? userLogged.id : '';
  const {
    issd,
    driver_id,
    phoneclient,
    comment = '',
    pickup_address,
    delivery_address,
    delivery_lat,
    delivery_lng,
    pickup_lat,
    pickup_lng
  } = params;

  const url = 'https://motorista.vip/order';
  const queryParams = new URLSearchParams({
    issd,
    driver_id,
    phoneclient,
    comment,
    pickup_address,
    delivery_address,
    delivery_lat,
    delivery_lng,
    pickup_lat,
    pickup_lng,
    userid
  }).toString();
  console.log(url + queryParams)
  try {
    const response = await axios.post(`${url}?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

