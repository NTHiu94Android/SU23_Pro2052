import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';

const Cart = (props) => {

  const { navigation } = props;
  
  const [data, setData] = useState([
    { id: '1', prodName: 'Item 1', price: '50.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '50.00' },
    { id: '2', prodName: 'Item 2', price: '50.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '50.00' },
    { id: '3', prodName: 'Item 3', price: '40.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '40.00' },
    { id: '4', prodName: 'Item 4', price: '30.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '30.00' },
    { id: '5', prodName: 'Item 5', price: '60.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '60.00' },
    { id: '6', prodName: 'Item 6', price: '50.00', quality: '1', imageurl: require('../../../../assets/images/Iphone14.png'), totalPrice: '50.00' },
    // more items
  ]);

  const updateItem = (id, newValue) => {
    const updatedList = data.map(item => {
        if (item.id === id) {
          item.quality = newValue;
          item.totalPrice = (parseFloat(item.price) * parseInt(newValue)).toFixed(2);
        }
        return item;
      });
      setData(updatedList);
  };

  const deleteItem = (id) => {
    const updatedList = data.filter(item => item.id !== id);
    setData(updatedList);
  };


  const calculateTotalPrice = () => {
    let total = 0;
    data.forEach(item => {
      total += parseFloat(item.totalPrice);
    });
    console.log(total+"");
    return total;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 30, paddingHorizontal: 20, backgroundColor: 'white' }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 20 }}>My cart</Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <Item
                  plus={() => updateItem(item.id, parseInt(item.quality) + 1)}
                  minus={() => updateItem(item.id, parseInt(item.quality) > 1 ? parseInt(item.quality) - 1 : 1)}
                  deleteItem={() => deleteItem(item.id)}
                  item={item}
                />
              )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>

        {data.length !== 0 ? (
          <View style={{ height: 150, justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffff', borderRadius: 10, paddingStart: 11 }}>
              <TextInput placeholder="Enter your promo code" />
              <Text name="rightsquare" size={44} color="black" >Enter</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20 }}>Total:</Text>
              <Text style={{ fontSize: 20 }}>${calculateTotalPrice()}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("CheckOut")} style={{ backgroundColor: '#000', height: 60, borderRadius: 8, flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ backgroundColor: '#BBB', height: 60, borderRadius: 8, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
          </View>
        )}
      </View>

    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingBottom: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  qualityRange: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Item = ({ item, plus, minus, deleteItem }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: 'row' }}>
      <Image source={item.imageurl} style={styles.image} />
      <View style={{ justifyContent: 'space-between', paddingVertical: 5, paddingStart: 10 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '800' }}>{item.prodName}</Text>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>${item.totalPrice}</Text>
        </View>
        <View style={styles.qualityRange}>
          <TouchableOpacity onPress={plus}>
            <Text name="squared-plus" color="black" style = {{fontWeight:'500',fontSize: 18}}>+</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>{item.quality}</Text>
          <TouchableOpacity onPress={minus}>
            <Text name="squared-minus"  color="black" style = {{fontWeight:'900', fontSize: 18}}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <TouchableOpacity onPress={deleteItem}>
      <Text name="closecircleo" color="black" style = {{fontWeight:'700',fontSize: 20}}>x</Text>
    </TouchableOpacity>
  </View>
);
