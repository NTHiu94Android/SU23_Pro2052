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


  const Item = ({ item, onpress, cancel }) => (
    <View style={styles.containerItem}>
      <View style={styles.rowItem}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Order {item._id}</Text>
        <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.dateCreate}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }}></View>
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Quantity: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.quantity}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Total Amount: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.totalPrice}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Date create: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.dateCreate}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Payment method: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.paymentMethod}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Status: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'red' }}>{item.status}</Text>
        </View>
      </View>
      <View style={[styles.rowItem, { marginTop: 16 }]}>
        <TouchableOpacity onPress={onpress} style={styles.buttonDetail}>
          <Text style={styles.textDetail}>Detail</Text>
        </TouchableOpacity>
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
  containerItem: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: 'white',
    shadowColor: 'grey',
    borderRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    marginBottom: 6
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonDetail: {
    backgroundColor: 'black',
    width: 100,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  textDetail: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
})