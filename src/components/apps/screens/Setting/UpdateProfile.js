import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid, ScrollView, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
//import ImagePicker from 'react-native-image-crop-picker';


const UpdateProfile = (props) => {
   const { navigation } = props;
   const { onUpdateProfile, user } = useContext(UserContext);
   const [name, setName] = useState('');
   const [birthday, setBirthday] = useState('');
   // const [address, setAddress] = useState('');
   const [numberPhone, setNumberPhone] = useState('');
   const [avatar, setAvatar] = useState('');

   useEffect(() => {
      if (user) {
         setName(user.name);
         setBirthday(user.birthday);
         // setAddress(user.address);
         setNumberPhone(user.numberPhone);
         setAvatar(user.avatar);
      }
   }, []);


   const handleUpdateProfile = async () => {
      if (!name || !birthday || !numberPhone) {
         ToastAndroid.show('Please fill all the fields!', ToastAndroid.SHORT);
      };
      const res = await onUpdateProfile(user._id, user.email, name, birthday, numberPhone, user.avatar);
      if (!res.status === 200) {
         //ToastAndroid.show('Update password successfully!', ToastAndroid.SHORT);
         console.log(res.data);
      } else {
         //ToastAndroid.show('Update password fail!', ToastAndroid.SHORT);
         console.log("Update password fail!");
      }
      navigation.navigate('Setting');
      console.log(user);

   };


   return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
         <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 48 }}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                     style={styles.iconTopBar}
                     resizeMode='cover'
                     source={require('../../../../assets/images/back.png')} />
               </TouchableOpacity>

               <Text style={styles.textProfile}>Update profile</Text>
               <View style={styles.iconTopBar}></View>
            </View>
            <View style={{ width: "100%", alignItems: 'center', marginTop: 30 }}>
               <TouchableOpacity style={styles.imageContainer}>
                  <Image
                     style={{ width: '100%', height: '100%', }}
                     source={avatar ? { uri: avatar } : require('../../../../assets/images/avataruser.png')}
                  />

               </TouchableOpacity>

            </View>


            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
               <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0 }}>
                  <Text style={{ color: 'grey' }}>Name</Text>
                  <TextInput
                     value={name}
                     onChangeText={setName}
                     placeholder="Enter your name"
                     style={{}} />
               </View>
               <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0 }}>

                  <Text style={{ color: 'grey' }}>Birthday</Text>
                  <TextInput
                     value={birthday}
                     onChangeText={setBirthday}
                     placeholder="Enter your birthday"
                     style={{}} />
               </View>
               {/* <Text style={{ color: 'grey', marginTop: 20, marginBottom: 8 }}>Address</Text>
               <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
                  style={{}} />
               <View style={{ height: 1, backgroundColor: 'black' }} ></View> */}
               <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0 }}>

                  <Text style={{ color: 'grey' }}>Number phone</Text>
                  <TextInput
                     value={numberPhone}
                     onChangeText={setNumberPhone}
                     placeholder="Enter your number phone"
                     style={{}} />
               </View>

               <View style={{ height: 1, backgroundColor: '#8B8989', marginTop: 20 }} ></View>

               <TouchableOpacity style={styles.btn} onPress={() => handleUpdateProfile()}>
                  <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >Submit</Text>
               </TouchableOpacity>

            </View>
         </View>
      </ScrollView>
   )
}

export default UpdateProfile

const styles = StyleSheet.create({
   btn: {
      height: 50,
      backgroundColor: 'black',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 8
   },
   iconTopBar: {
      width: 24, height: 24,
   },
   textProfile: {
      textAlign: 'center',
      color: 'black',
      fontSize: 18,
      fontWeight: '800',
   },
   imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 50,
      overflow: 'hidden',
   },
})