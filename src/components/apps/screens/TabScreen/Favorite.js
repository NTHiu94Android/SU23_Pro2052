import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Favorite = (props) => {
  const [data,setData] = useState([
    { id: '1', name: 'Item 1', price: '50.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    { id: '2', name: 'Item 2', price: '50.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    { id: '3', name: 'Item 3', price: '40.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    { id: '4', name: 'Item 4', price: '30.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    { id: '5', name: 'Item 5', price: '60.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    { id: '6', name: 'Item 6', price: '50.00', imageurl: require('../../../../assets/images/Iphone14.png') },
    // more items
  ]);
  const { navigation } = props;

  const deleteItem = (id) => {
    const updatedList = data.filter(item => item.id !== id);
    setData(updatedList);
  };

  return (
    <View style={{ position: 'relative', flex: 1, backgroundColor: 'white' }}>
      {/* Top bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12 }}>
        <TouchableOpacity>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode='cover'
            source={require('../../../../assets/images/back.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Favorite</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode='cover'
            source={require('../../../../assets/images/ic_search.png')} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <Item item={item}
          deleteFavoriteItem={() => deleteItem(item.id)} />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} // Use the "id" as the key prop
      />
      {
        data.length !== 0 ?
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.button}>
          <Text style={styles.buttonText}>Add all to my cart</Text>
        </TouchableOpacity> :
        <View style={[styles.button, { backgroundColor: '#BBB' }]}>
          <Text style={styles.buttonText}>Add all to my cart</Text>
        </View>
      }
    </View>

    
  );
}

export default Favorite

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Icon: {
    width: 24,
    height: 24,
  },
  h1: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    flex: 8,
    textAlign: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.2)',

  },
  imgLst: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  listItemName: {
    flex: 5,
    paddingStart: 20,
  },
  TextlstName: {
    fontWeight: 'normal',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  TextlstPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  listItemIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
    bottom: 20,
    backgroundColor: '#242424',
    borderRadius: 10,
    paddingVertical: 15,
    zIndex: 1,
    alignSelf: 'center',

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },

})

const Item = ({ item, deleteFavoriteItem }) => {
  return (
    <View style={styles.listItem}>
      <Image source={item.imageurl} style={styles.imgLst} />
      <View style={styles.listItemName}>
        <Text style={styles.TextlstName}>{item.name}</Text>
        <Text style={styles.TextlstPrice}>$ {item.price}</Text>
      </View>
      <View style={styles.listItemIcon}>
        <TouchableOpacity onPress={deleteFavoriteItem}>
          <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
            <Image source={require('../../../../assets/images/del.png')} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
            <Image source={require('../../../../assets/images/shop.png')} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
};

