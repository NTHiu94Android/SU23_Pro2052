import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressDialog from 'react-native-progress-dialog';

import { UserContext } from '../UserContext';

const Login = (props) => {
  const { navigation } = props;
  const { onLogin, onRegister, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // GoogleSignin.configure({
  //   webClientId: '',
  // });


  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      //neu tren android
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset('Please fill all the fields!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      } else {
        Alert.alert('Please fill all the fields!');
      }
      setIsLoading(false);
      return;
    } else {
      // const fcmToken = await AsyncStorage.getItem('fcmToken');
      // const res = await onLogin(email, password, fcmToken);
      // if (res != null || res != undefined) {
      //   console.log("Login success!");
      // } else {
      //   //neu tren android
      //   if (Platform.OS === 'android') {
      //     ToastAndroid.showWithGravityAndOffset('Login fail!', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      //   } else {
      //     Alert.alert('Login fail!');
      //   }
      // }
      setUser(
        {
          "_id": "646b85818ebfde95b7851bd1",
          "email": "1234@gmail.com",
          "password": "$2a$10$xDcWVx/yHlh0ZqBqiqRtz.7KlNSdKty71mfV8Gbem7E1zE4iKHy1C",
          "name": "CoV Music Official",
          "birthday": "15/10/1999",
          "numberPhone": "0778023038",
          "role": "user",
          "avatar": "https://lh3.googleusercontent.com/a/AGNmyxaVUyaBuHtpnd3MTbfbUlYfVfd-gEYYEK7VO7xpSw=s96-c",
          "resetPasswordToken": null,
          "fcmtoken": "eA4h-YdCQiWgCTnc58cNXi:APA91bEgEHhyg2c949skzh9vX_2-ADLDKS8pId5645zQeotHPCVaC9AA9FeRlX_GidlqIgIJEaHYmfH9IlHIfsqudoe9nWcE62Vr6dSXML-U6FdGXkSH9CyHALzcbgK47I4A5H5fYSmA",
          "__v": 0,
          "idCart":  "646b85818ebfde95b7851bd3",
          "idFavorite":  "646b85818ebfde95b7851bd5"
        }
      );


      setIsLoading(false);
    }
  };

  //Login with Google
  const onGoogleButtonPress = async () => {
    try {
      setIsLoading(true);
      setUser(
        {
          "_id": "646b85818ebfde95b7851bd1",
          "email": "1234@gmail.com",
          "password": "$2a$10$xDcWVx/yHlh0ZqBqiqRtz.7KlNSdKty71mfV8Gbem7E1zE4iKHy1C",
          "name": "CoV Music Official",
          "birthday": "15/10/1999",
          "numberPhone": "0778023038",
          "role": "user",
          "avatar": "https://lh3.googleusercontent.com/a/AGNmyxaVUyaBuHtpnd3MTbfbUlYfVfd-gEYYEK7VO7xpSw=s96-c",
          "resetPasswordToken": null,
          "fcmtoken": "eA4h-YdCQiWgCTnc58cNXi:APA91bEgEHhyg2c949skzh9vX_2-ADLDKS8pId5645zQeotHPCVaC9AA9FeRlX_GidlqIgIJEaHYmfH9IlHIfsqudoe9nWcE62Vr6dSXML-U6FdGXkSH9CyHALzcbgK47I4A5H5fYSmA",
          "__v": 0,
          "idCart":  "646b85818ebfde95b7851bd3",
          "idFavorite":  "646b85818ebfde95b7851bd5"
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.log("Error onGoogleButtonPress: ", error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        label="Please wait..." />

      <View style={{ flex: 1, backgroundColor: 'white', marginTop: 50, paddingHorizontal: 50 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
          <View style={{ height: 1, backgroundColor: 'black', flex: 1 }}></View>
          <Image style={{ width: 50, height: 57, marginHorizontal: 10 }} source={require('../../../assets/images/logo.png')}></Image>
          <View style={{ height: 1, backgroundColor: 'black', flex: 1 }}></View>
        </View>

        <View>
          <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 25, }} >Hello !</Text>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20, }} >WELCOME BACK</Text>

          <View style={{}}>
            <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 40 }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={{}} />
            <View style={{ height: 1, backgroundColor: 'black', }} ></View>
          </View>

          <View style={{ position: 'relative' }}>
            <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 20 }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              style={{}}
              secureTextEntry={isShowPassword} />
            {
              !isShowPassword ?
                <TouchableOpacity onPress={() => setIsShowPassword(true)} style={{ position: 'absolute', right: 0, top: 55 }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../../assets/images/eye.png')}
                  />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setIsShowPassword(false)} style={{ position: 'absolute', right: 0, top: 55 }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../../assets/images/eye-off.png')}
                  />
                </TouchableOpacity>
            }
            <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
            <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => onGoogleButtonPress()}>
            <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../../assets/images/google.png')}></Image>
            <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >Login By Google</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontWeight: '600', textAlign: 'center' }}>Do you have account ? </Text>
            <Text
              style={{ color: 'black', fontWeight: '600', textAlign: 'center', marginLeft: 4, textDecorationLine: 'underline' }}
              onPress={() => navigation.navigate('Register')} >
              Signup
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={{ color: 'black', fontWeight: '600', textAlign: 'center', marginTop: 8, textDecorationLine: 'underline' }}>
              Forgot password
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  }
})