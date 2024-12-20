import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://motorista.vip/api/v2/';

export async function getOrders() {
  var token = await AsyncStorage.getItem('token');
  const link = `${API_BASE_URL}client/orders?api_token=${token}`;
  try {
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
}
