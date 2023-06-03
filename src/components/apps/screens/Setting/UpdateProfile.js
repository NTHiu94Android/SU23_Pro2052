import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid, ScrollView, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import ImagePicker from 'react-native-image-picker';


const UpdateProfile = (props) => {
   const { navigation } = props;
   const { onUpdateProfile, user } = useContext(UserContext);
   const [name, setName] = useState('');
   const [birthday, setBirthday] = useState('');
   const [email, setEmail] = useState('');
   const [numberPhone, setNumberPhone] = useState('');
   const [avatar, setAvatar] = useState('');

   useEffect(() => {
      if (user) {
         setName(user.name);
         setBirthday(user.birthday);
         setEmail(user.email);
         setNumberPhone(user.numberPhone);
         setAvatar(user.avatar);
      }
   }, []);


   const handleUpdateProfile = async () => {
      if (!name || !birthday || !numberPhone || !email) {
         ToastAndroid.show('Please fill all the fields!', ToastAndroid.SHORT);
      };
      const res = await onUpdateProfile(user._id, email, name, birthday, numberPhone, user.avatar);
      if (res) {
         //ToastAndroid.show('Update password successfully!', ToastAndroid.SHORT);
         console.log("update success");
      } else {
         //ToastAndroid.show('Update password fail!', ToastAndroid.SHORT);
         console.log("Update fail!");
      }
      navigation.navigate('Setting');
      console.log(user);

   };
   const handleSelectImage = () => {
      const options = {
         title: 'Select Avatar',
         mediaType: 'photo',
         quality: 0.7
      };

      ImagePicker.launchImageLibrary(options, (response) => {
         if (response.didCancel) {
            console.log('User cancelled image picker');
         } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
         } else {
            setAvatar(response.uri);
         }
      });
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
               <TouchableOpacity style={styles.imageContainer} onPress={handleSelectImage}>
                  <Image
                     style={{ width: '100%', height: '100%' }}
                     source={avatar ? { uri: avatar } : require('../../../../assets/images/avataruser.png')}
                  />
               </TouchableOpacity>


            </View>


            <View style={{ paddingHorizontal: 20, }}>
               <Text style={{ color: 'black', marginTop: 30, marginBottom: 0, fontWeight: 'bold' }}>Name</Text>
               <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  style={{}} />
               <View style={{ height: 1, backgroundColor: 'black', }} ></View>

               <Text style={{ color: 'black', marginTop: 30, marginBottom: 0, fontWeight: 'bold' }}>Email</Text>
               <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  style={{}} />
               <View style={{ height: 1, backgroundColor: 'black', }} ></View>


               <Text style={{ color: 'black', marginTop: 30, marginBottom: 0, fontWeight: 'bold' }}>Birthday</Text>
               <TextInput
                  value={birthday}
                  onChangeText={setBirthday}
                  placeholder="Enter your birthday"
                  style={{}} />
               <View style={{ height: 1, backgroundColor: 'black', }} ></View>



               <Text style={{ color: 'black', marginTop: 30, marginBottom: 0, fontWeight: 'bold' }}>Number phone</Text>
               <TextInput
                  value={numberPhone}
                  onChangeText={setNumberPhone}
                  placeholder="Enter your number phone"
                  style={{}} />
               <View style={{ height: 1, backgroundColor: 'black', }} ></View>


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