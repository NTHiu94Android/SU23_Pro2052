import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import ProgressDialog from 'react-native-progress-dialog';
import CircleCheckBox from 'react-native-circle-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Cart = (props) => {
  const { navigation } = props;
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(UserContext);
  const {
    onGetOrderDetailsByIdOrder, listCart, setListCart, onGetProductById,
    countCart, onUpdateOrderDetail, onDeleteOrderDetail, onGetSubProductById,
    total, setTotal
  } = useContext(AppContext);
  back(navigation);
  const [isLoading, setIsLoading] = useState(false);
  //Lay danh sach san phma trong gio hang
  useEffect(() => {
    const getListCart = async () => {
      try {
        setIsLoading(true);
        // console.log("list", list);
        let listItem = [];
        const response = await onGetOrderDetailsByIdOrder(user.idCart);
        if (!response) return;
        // console.log("List cart: ", response);

        for (let i = 0; i < response.length; i++) {

          let item = {};

          //Lấy subproduct theo id
          const subProduct = await onGetSubProductById(response[i].idSubProduct);

          // console.log('subProduct: ', subProduct);
          //Lấy product theo idProduct
          const product = await onGetProductById(subProduct.idProduct);

          item.priceBeforeSale = subProduct.price;
          item.price = response[i].price;
          item.image = product.image;
          item.color = subProduct.color;
          item.quantity = response[i].quantity;
          item.name = product.name;
          item.id = response[i]._id;
          item.idSubProduct = subProduct._id;
          item.idProduct = product._id;
          item.isCmt = response[i].isCmt;
          item.idOrder = response[i].idOrder;
          item.checked = false;
          listItem.push(item);
        }
        setCartList(listItem);
        calculateTotalPrice(listItem);
        console.log("listItem", listItem);
        setIsLoading(false);

      } catch (error) {
        console.log("Get list cart error: ", error);
      }
    };
    getListCart();
  }, [totalPrice, countCart]);

  const goToProductDetail = (idSubPro, idPro) => {
    navigation.navigate('ProductDetail', { idSubPro: idSubPro, idPro: idPro });
  };

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(totalPrice);
  };

  const updateQuantityOnServer = async (_id, quantity) => {
    try {
      let newItem = {};
      for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].id === _id) {
          newItem._id = cartList[i].id;
          newItem.quantity = quantity;
          newItem.price = cartList[i].price;
          newItem.isCmt = cartList[i].isCmt;
          newItem.idOrder = cartList[i].idOrder;
          newItem.idSubProduct = cartList[i].idSubProduct;
          break;
        }
      }
      const response = await onUpdateOrderDetail(newItem._id, newItem.quantity, newItem.price, newItem.isCmt, newItem.idOrder, newItem.idSubProduct);
      if (response) {
        const updatedItems = cartList.map(item => {
          if (item.id === _id) {
            return { ...item, quantity: response.quantity };
          }
          return item;
        });
        setCartList(updatedItems);
        calculateTotalPrice(updatedItems);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (_id, quantity) => {
    setTotalPrice(-1);
    await updateQuantityOnServer(_id, quantity);
  };

  const deleteItem = async (_id) => {
    setTotalPrice(-1);
    await onDeleteOrderDetail(_id);
  };

  const handleCheckBox = async (_id, checked) => {
    try {
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].id === _id) {
            cartList[i].checked = !checked;
            console.log("checkedList: ", cartList[i].checked);
            break;
          }
        }
      
    }
    catch (error) {
      console.log("Error handleCheckBox: ", error);
    }
  };


  const deleteAllItems = async () => {
    try {
      if (cartList.length !== 0) {
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].checked === true){
            await onDeleteOrderDetail(cartList[i].id);
          }
        }
        setTotalPrice(-1);
      } else {
        console.log("Delete all items successfully");
      }
    } catch (error) {
      console.log("Delete all items error: ", error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: 'white' }}>
      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait..." />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icon} source={require('../../../../assets/images/back.png')} />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 20, color: 'black' }}>My cart</Text>
        <TouchableOpacity onPress={() => deleteAllItems()}>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode='cover'
            source={require('../../../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={cartList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              deleteItem={() => deleteItem(item.id)}
              plus={() => handleQuantityChange(item.id, item.quantity + 1,)}
              minus={() => handleQuantityChange(item.id, item.quantity > 1 ? item.quantity - 1 : 1)}
              item={item}
              nav={() => goToProductDetail(item.idSubProduct, item.idProduct)}
              onCheckedItem={(checked) => handleCheckBox(item.id, checked)}
            />
          )}
          keyExtractor={item => item.id}
        />


      </SafeAreaView>

      {cartList.length !== 0 ? (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20 }}>Total:</Text>
            <Text style={{ fontSize: 20, color: "red" }}>${totalPrice}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("CheckOut")} style={{ backgroundColor: '#000', height: 60, borderRadius: 30, flexDirection: 'column', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20 }}>Total:</Text>
            <Text style={{ fontSize: 20, color: "red" }}>${totalPrice}</Text>
          </View>
          <View style={{ backgroundColor: '#BBB', height: 60, borderRadius: 30, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;



const Item = ({ item, plus, minus, deleteItem, nav, onCheckedItem }) => {
  const [checked, setChecked] = useState(false);
  const onChangeCheckStatus = async () => {
    setChecked(!checked);
    onCheckedItem(checked);
  };

  return (
    <TouchableOpacity onPress={nav}>
      <View style={styles.item}>
        <CircleCheckBox
          checked={checked}
          onToggle={() => onChangeCheckStatus()}
        />
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ justifyContent: 'space-between', paddingVertical: 5, paddingStart: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '800' }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200 }}>
              <Text style={{ fontSize: 14, fontWeight: '800' }}>Color: {item.color}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={minus}>
                  <Text name="squared-minus" color="black" style={{ fontWeight: '900', fontSize: 26, marginLeft: 8 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, paddingHorizontal: 8 }}>{item.quantity}</Text>
                <TouchableOpacity onPress={plus}>
                  <Text name="squared-plus" color="black" style={{ fontWeight: '500', fontSize: 18, marginRight: 8 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', }}>Price: </Text>
              <Text style={{ fontSize: 14, fontWeight: '600', textDecorationLine: 'line-through', }}>${item.priceBeforeSale * item.quantity}</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: 'red' }}> ${item.price * item.quantity}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={deleteItem}>
          <Text name="closecircleo" color="black" style={{ fontWeight: '700', fontSize: 20 }}>x</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 22,
    height: 22,
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