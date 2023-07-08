import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import back from '../../../back/back';
import { UserContext } from '../../../users/UserContext';
import { AppContext } from '../../AppContext';
import { useFocusEffect } from '@react-navigation/native';

const CheckOut = (props) => {
  const { user } = useContext(UserContext);
  const {
    onGetAddressByIdUser, total, onAddOrder, quantity
  } = useContext(AppContext);
  const { navigation } = props;
  back(navigation);
  const [address, setAddress] = useState();
  const [tempAddress, setTempAddress] = useState([]);

  const gotoSuccess = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const idUser = user._id;
    const totalPrice = total;
    const orderDate = `${day}/${month}/${year}`;
    const status = "Processing";
    const paymentMethod = "paypal";
    const order = await onAddOrder(orderDate, orderDate, totalPrice, status, paymentMethod, address, idUser);
    console.log("Add order: ", order);
    navigation.navigate("Success");
  }

  useFocusEffect(
    React.useCallback(() => {
      const getListAddress = async () => {
        try {
          const res = await onGetAddressByIdUser(user._id);
          console.log("getAddress", res.data);
          const addressData = res.data;
          setTempAddress(addressData);
          const selectedAddress = addressData.find((item) => item.status === true);
          if (selectedAddress) {
            setAddress(selectedAddress.body);
            console.log('Selected address:', selectedAddress.body);
          }
        } catch (error) {
          console.log('getListAddress error: ', error);
        }
      };

      getListAddress();
    }, [])
  );
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ marginTop: 10, padding: 5, flex: 1 }}>
        {/* Bấm đây nhảy qua cart () */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ width: 40, height: 40 }} >
            <Image source={require('../../../../assets/images/back2.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center', alignItems: 'center', color: "black", marginTop: 6, marginEnd: 20 }}>Check out</Text>
        </View>
        <ScrollView  style={{ marginHorizontal: 6 }}>
          {/* Address */}
          <View style={{ justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text  style={{ fontSize: 20, fontWeight: 'bold', flex: 1, color: "black", marginTop: 6 }}>Shipping Address</Text>
              <Image source={require('../../../../assets/images/edit2.png')} style={{ width: 28, height: 28 }} />
            </View>
            <View style={[styles.box, { backgroundColor: '#fff', borderRadius: 8, paddingVertical: 10 }]}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: 'grey', padding: 10 }}>{user.name}</Text>
              <Text style={{ fontSize: 14, lineHeight: 25, fontWeight: '500', padding: 10 }}>{address}</Text>
            </View>
          </View>

          {/* Delivery method */}
          <View style={{ justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1, color: "black", marginTop: 6 }}>Payment method</Text>
              <Image source={require('../../../../assets/images/edit2.png')} style={{ width: 28 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={[styles.box, { borderRadius: 8, paddingVertical: 10, flexDirection: 'column', padding: 32 }]}>
                <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png' }}
                  style={{ height: 20, width: 90, margin: 10 }} />
                <Text style={{ margin: 10, fontSize: 14, fontWeight: 'bold' }}>Fast (2-3 days)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.box, { borderRadius: 8, paddingVertical: 10, flexDirection: 'column', padding: 32 }]}>
                <Image source={{ uri: 'https://theme.hstatic.net/200000472237/1000829412/14/logo.png?v=584' }}
                  style={{ height: 20, width: 90, margin: 10 }} />
                <Text style={{ margin: 10, fontSize: 14, fontWeight: 'bold' }}>Fast (2-3 days)</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
          
            style={{flex: 5, borderRadius: 10, borderWidth: 2, borderColor: "black", paddingStart: 10}}
            keyboardType='password'
            placeholder="Enter code promotion"
            placeholderTextColor="gray"
            ></TextInput>
            <TouchableOpacity style={{flex: 1, alignContent: 'center', alignItems: 'center', alignSelf:'center', padding: 10, backgroundColor:'black', marginHorizontal: 5, borderRadius: 10, paddingVertical: 15}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Check</Text>
            </TouchableOpacity>
          </View>
          {/* Total price */}

          <View style={[styles.box, { padding: 10, borderRadius: 8, height: 125, justifyContent: 'space-between', marginTop: 30, marginBottom: 30 }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", marginTop: 6 }}>Infomation and Order</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Number of products:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>{quantity}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Order:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>${total}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Delivery:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>$5.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Total:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>${total - 5.00}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Submit */}
      <View style={{ backgroundColor: 'black', margin: 10, borderRadius: 20 }}>
        <TouchableOpacity
          onPress={() => {
            if (tempAddress.length === 0) {
              Alert.alert('No address', 'Please add an address', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('ShippingAddress')
                }
              ]);
            } else {
              gotoSuccess();
            }
          }}
          style={{ backgroundColor: '#000', height: 60, borderRadius: 8, justifyContent: 'center' }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>SUBMIT ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'grey',
    borderRadius: 4,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  }
})
