import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import EditPassword from './src/components/apps/screens/Setting/EditPassword'
import UpdateProfile from './src/components/apps/screens/Setting/UpdateProfile'
import UpdateProfileDark from './src/components/apps/screens/Setting/UpdateProfileDark'
import UpdateAvatar from './src/components/apps/screens/Setting/UpdateAvatar'
import EditPasswordDark from './src/components/apps/screens/Setting/EditPasswordDark'


import Started from './src/components/splash/Started';

const App = () => {
  useEffect(() => {
    const GetToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      //console.log("Token firebase: ", token);
      AsyncStorage.setItem('fcmToken', token);
    }
    GetToken();
  }, []);

  

  return (
    // <Started />
    <UpdateProfile/>
  )
}

export default App