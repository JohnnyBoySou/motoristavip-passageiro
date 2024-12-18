import React, { useEffect, useReducer, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from './../store/auth'
import API from "./../services/api"
import User from './../services/user';

import { Language } from '../constants'
import config from '../config';

//Stacks
import { createStackNavigator } from "@react-navigation/stack";
import PublicStack from './PublicStack';

const Stack = createStackNavigator();


export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      config.DRIVER_APP=true;
      config.VENDOR_APP=false;
      
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        API.loginUser(data.email,data.password,data.expoPushToken,(responseJson)=>{
           if(responseJson.status){
             //User ok
             User.setLoggedInUser(responseJson,()=>{
              dispatch({ type: 'SIGN_IN', token: responseJson.token });
             })
           }else{
             //Not ok
             Toast.show({
              type: 'error',
              text2: responseJson.message?responseJson.message:responseJson.errMsg
            });
           }
         });
      },
      signOut: async data => {
        User.logout(()=>{
          dispatch({ type: 'SIGN_OUT' })
        })
      },
      signUp: async data => {
        API.registerUser(data.name,data.email,data.password,data.phone,(responseJson)=>{
          console.log(JSON.stringify(responseJson));
           if(responseJson.status){
              //User ok - but needs admin approval
              User.logout(()=>{
                dispatch({ type: 'SIGN_OUT' })
                Toast.show({
                  type: 'error',
                  text2: Language.DriverCreated
                });
              })
           }else{
             //Not ok
             Toast.show({
              type: 'error',
              text2: JSON.stringify(responseJson.errMsg)
            });
           }
         });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="App" component={PublicStack} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}





