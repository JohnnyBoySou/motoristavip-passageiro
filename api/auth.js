import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://motorista.vip/api/v2/';

export async function loginUser( params) {
  const link = `${API_BASE_URL}client/auth/gettoken`;
  const data = {
    email: params.email,
    password: params.password
  };
  try {
    const response = await axios.post(link, data);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      const user = await axios.get(`https://motorista.vip/api/user?api_token=${response.data.token}`);
      if (user.request._response) {
        await AsyncStorage.setItem('user', user.request._response);
        return response.data;
      }
    }
    } catch (error) {
    throw error.response.data.error;
  }
}

export async function registerUser(params) {
  const link = `${API_BASE_URL}client/auth/register`;
  const data = {
    name: params.name,
    email: params.email,
    password: params.password,
    phone: params.phone,
  };
  try {
    const response = await axios.post(link, data);
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      const user = await axios.get(`https://motorista.vip/api/user?api_token=${response.data.token}`);
      if (user.request._response) {
        await AsyncStorage.setItem('user', user.request._response);
        return response.data;
      }
    }
  } catch (error) {
    console.log(error)
    throw error.response.data.error;
  }
}

export async function getUser() {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios.get(`${API_BASE_URL}client/auth/data?api_token=${token}`); 
    return res.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
}

export async function logout(){
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('phone');
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function disableUser() {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}client/auth/deactivate?api_token=${token}`);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('phone');
    return response.data;
  }
  catch (error) {
    throw error.response.data.error;
  }
};

