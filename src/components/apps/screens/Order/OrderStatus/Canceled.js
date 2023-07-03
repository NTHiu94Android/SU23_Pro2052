import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../AppContext';
import { UserContext } from '../../../../users/UserContext';

const Canceled = (props) => {
  const { navigation } = props;
  const { user } = useContext(UserContext);
  const { onGetOrdersByIdUser, countOrder, onGetOrderDetailsByIdOrder } = useContext(AppContext);
  const [listCanceled, setListCanceled] = useState([]);

  useEffect(() => {
    const getOrderByIdUserAndStatus = async () => {
      try {
        const resOrders = await onGetOrdersByIdUser(user._id);
        const orders = resOrders.data;
        //console.log(orders);
        //Lay tat ca hoa don tru idCart va idFavorite
        let list = [];
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].status == 'Canceled') {
            const resOrderDetails = await onGetOrderDetailsByIdOrder(orders[i]._id);
            //const orderDetails = resOrderDetails.data;
            //console.log("orderDetails: ",orderDetails);
            let sum = 0;
            for (let j = 0; j < resOrderDetails.length; j++) {
              sum += resOrderDetails[j].quantity;
            }
            orders[i].quantity = sum;
            orders[i].resOrderDetails = resOrderDetails;
            list.push(orders[i]);
          }
        }
        setListCanceled(list);
      } catch (error) {
        console.log("Error getOrders", error);
      }
    };
    getOrderByIdUserAndStatus();
  }, [countOrder]);


  const Item = ({ item, onpress }) => (
    <View style={{ height: 200, justifyContent: 'space-between', marginTop: 25 }}>
      <View style={[styles.functionBox, {  height: 47 }]}>
        <Text style={[styles.text1, { color: '#242424' }]}>{item._id}</Text>
        <Text style={[styles.text2, { color: '#808080' }]}>{item.dateCreate}</Text>
      </View>
      <View style={{ backgroundColor: 'black', height: 1, width: '100%' }}></View>
      <View style={[styles.functionBox, { flexDirection: 'column', alignItems: 'flex-start',}]}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%', marginTop: 15,}}>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between' }}>
            <Text style={[styles.text1, { color: '#808080' }]}>Quantity: </Text>
            <Text style={[styles.text3, { color: '#303030' }]}>{item.quantity}</Text>
          </View>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between' }}>
            <Text style={[styles.text1, { color: '#808080' }]}>Total Amount: </Text>
            <Text style={[styles.text3, { color: '#242424' }]}>{item.totalPrice}</Text>
          </View>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
            <Text style={[styles.text1, { color: '#808080' }]}>Date Create: </Text>
            <Text style={[styles.text3, { color: '#242424' }]}>{item.dateCreate}</Text>
          </View>
          <View style={{ flexDirection: 'row' , justifyContent: 'space-between'}}>
            <Text style={[styles.text1, { color: '#808080' }]}>Payment method: </Text>
            <Text style={[styles.text3, { color: '#242424' }]}>{item.paymentMethod}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 20 }}>
          <TouchableOpacity onPress={onpress} style={[styles.detailButton, { marginBottom: 20 }]}>
            <Text style={[styles.text1, { color: '#fff' }]}>Detail</Text>
          </TouchableOpacity>
          <Text style={[styles.text1, { color: 'red' }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  const gotoOrderDetail = (item) => {
    navigation.navigate('OrderDetail', { item });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}

      {
        listCanceled.length > 0 &&
        listCanceled.map((item) => <Item key={item._id} item={item} onpress={() => gotoOrderDetail(item)} />)
      }
    </View>
    </ScrollView>
  )
}

export default Canceled

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  functionBox: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: 5
  },
  text1: {
    fontWeight: '600',
    fontSize: 16,
  },
  text2: {
    fontWeight: '400',
    fontSize: 14,
  },
  text3: {
    fontWeight: '700',
    fontSize: 16,
  },
  detailButton: {
    width: 100,
    height: 36,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
})