import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../users/UserContext';


const EditPassword = (props) => {
  const { navigation } = props;
  const { onChangePassword, user } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      console.log('Please fill all the fields!');
      //ToastAndroid.show('Please fill all the fields!', ToastAndroid.SHORT);
    };
    const res = await onChangePassword(user._id, password, newPassword, confirmPassword);
    console.log(user);
    if (res.data != undefined) {
      //Thong bao ios va android
      console.log('Update password successfully!');
      ToastAndroid.show('Update password successfully!', ToastAndroid.SHORT);
    } else {
      console.log('Update password fail!');
      ToastAndroid.show('Update password fail!', ToastAndroid.SHORT);
    }
    navigation.navigate('Setting');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 48 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../../../assets/images/back.png')} />
          </TouchableOpacity>

          <Text style={styles.textProfile}>Update password</Text>
          <View style={styles.iconTopBar}></View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0 }}>
            <Text style={{ color: 'grey' }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={true}
              style={{}} />
            {/* <View style={{ height: 1, backgroundColor: 'black', }} ></View> */}

          </View>

          <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0  }}>
            <Text style={{ color: 'grey' }}>New password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={true}
              style={{}} />
          </View>
          <View style={{ backgroundColor: "#E8E8E8", padding: 10, borderRadius: 5, marginBottom: 10, paddingBottom: 0  }}>
            <Text style={{ color: 'grey'}}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Enter confirm password"
              style={{}}
              secureTextEntry={true} />
          </View>
          <View style={{ height: 1, backgroundColor: '#8B8989', marginTop: 20 }} ></View>

          <TouchableOpacity style={styles.btn} onPress={() => handleChangePassword()}>
            <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >Submit</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}

export default EditPassword

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
})