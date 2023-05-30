import React, { createContext, useState, useEffect } from 'react'
import { login, register, updateFcmToken, forgot_password, update_profile } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import jwt_decode from "jwt-decode";

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);

  GoogleSignin.configure({
    // webClientId: '13705249458-n11h88g38semsu2teplnr0fo05tdnrks.apps.googleusercontent.com'
    webClientId: '1229200979-7dof3i1mi9ih5k2s387s8p113v786p69.apps.googleusercontent.com'
  });

  const onLogin = async (username, email, password, fcmToken) => {
    try {
      const response = await login(username, email, password, fcmToken);
      if (response) {
        const token = response.accessToken;
        await AsyncStorage.setItem('token', token);
        const res = await onUpdateFcmToken(response.data._id, fcmToken);
        setUser(res.data);
        console.log('AccessToken onLogin UserContext: ', token);
        return res.data;
      }
      return null;
    } catch (error) {
      console.log("OnLogin Error: ", error);
      setUser(null);
      return null;
    }
  };

  const onLogout = async (usId) => {
    try {
      await AsyncStorage.removeItem('idUser');
      await AsyncStorage.removeItem('token');
      await onUpdateFcmToken(usId, "");
      await GoogleSignin.signOut();

      setUser(null);

      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const onUpdateFcmToken = async (usId, tokenFcm) => {
    try {
      const respone = await updateFcmToken(usId, tokenFcm);
      return respone;
    } catch (error) {
      console.log("OnUpdateFcmToken Error: ", error);
    }
  };

  const onRegister = async (username,  email, password, name, birthday, numberPhone, avatar) => {
    try {
      const response = await register(username,  email, password, name, birthday, numberPhone, avatar);
      return response.data;
    } catch (error) {
      console.log("OnRegister Error: ", error);
    }
  };

  const onUpdateProfile = async (id, email, name, birthday, numberPhone, avatar) => {
    try {
      const response = await update_profile(id, email, name, birthday, numberPhone, avatar);
      return response.data;
    } catch (error) {
      console.log("OnUpdateProfile Error: ", error);
    }
  };

  const onForgotPassword = async (email) => {
    try {
      const response = await forgot_password(email);
      return response.data;
    } catch (error) {
      console.log("OnForgotPassword Error: ", error);
    }
  }


  return (
    <UserContext.Provider value={{
      user, setUser, onLogin, onLogout, onRegister,
      onUpdateProfile, onUpdateFcmToken, onForgotPassword
    }}>
      {children}
    </UserContext.Provider>
  )
}
