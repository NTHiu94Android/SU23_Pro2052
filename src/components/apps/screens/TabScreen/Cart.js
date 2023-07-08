import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import ProgressDialog from 'react-native-progress-dialog';
import CircleCheckBox from 'react-native-circle-checkbox';
const Cart = (props) => {
  const { navigation } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { user } = useContext(UserContext);
  const {
    onGetOrderDetailsByIdOrder, listCart, setListCart, onGetProductById,
    countCart, onUpdateOrderDetail, onDeleteOrderDetail, onGetSubProductById,
    total, setTotal, onReloadCart,tempIdProduct, setTempIdProduct,
    tempIdSubProduct, setTempIdSubProduct, setQuantity
  } = useContext(AppContext);
  back(navigation);
  const [isLoading, setIsLoading] = useState(false);
  //Lay danh sach san phma trong gio hang
  useEffect(() => {
    const getListCart = async () => {
      try {
        setIsLoading(true);

        let listItem = [];
        const response = await onGetOrderDetailsByIdOrder(user.idCart);
        if (!response) return;
        // console.log("List cart: ", response);

        for (let i = 0; i < response.length; i++) {

          let item = {};

          //Lấy subproduct theo id
          const subProduct = await onGetSubProductById(response[i].idSubProduct);

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
          item.isSelected = false;
          item.idOrder = response[i].idOrder;
          listItem.push(item);
        }
        setListCart(listItem);
       
        setTotalPrice(0);
        
        setTotal(0);
        
        setQuantity(0);
        setDisabled(true);
        setIsLoading(false);
      } catch (error) {
        console.log("Get list cart error: ", error);
      }
    };
    getListCart();
  }, [countCart]);

  const goToProductDetail = (idSubPro, idPro) => {
    navigation.navigate('ProductDetail', { idSubPro: idSubPro, idPro: idPro });
    setTempIdProduct(idPro);
    setTempIdSubProduct(idSubPro);
  };

  const calculateTotalPrice = async (items) => {
    console.log("items", items);
    let totalPrice = 0;
    let quantity = 0;
    items.forEach((item) => {
      if (item.isSelected) {
        totalPrice += item.price * item.quantity;
        quantity += item.quantity;
      }
    });
    setTotalPrice(totalPrice);
    setTotal(totalPrice);
    setQuantity(quantity);
  };

  const handleQuantityChange = (_id, _quantity, _isSelected) => {
    try {
      let newItem = {};
      for (let i = 0; i < listCart.length; i++) {
        if (listCart[i].id === _id) {
          newItem._id = listCart[i].id;
          newItem.quantity = _quantity;
          newItem.price = listCart[i].price;
          newItem.isCmt = listCart[i].isCmt;
          newItem.idOrder = listCart[i].idOrder;
          newItem.idSubProduct = listCart[i].idSubProduct;
          break;
        }
      }

      const updatedItems = listCart.map((item) => {
        if (item.id === _id) {
          return { ...item, quantity: _quantity };
        }
        return item;
      });
      const response = onUpdateOrderDetail(newItem._id, newItem.quantity, newItem.price, newItem.isCmt, newItem.idOrder, newItem.idSubProduct);
      setListCart(updatedItems);

      if (_isSelected) {
        calculateTotalPrice(updatedItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = (_id) => {
    onDeleteOrderDetail(_id);
    for (let i = 0; i < listCart.length; i++) {
      if (listCart[i].id === _id) {
        listCart.splice(i, 1);
        break;
      }
    }
    setListCart([...listCart]);
    calculateTotalPrice(listCart);
    handleSelectedList(listCart);
  };

  const handleCheckBox = async () => {
    try {
      calculateTotalPrice(listCart);
      handleSelectedList(listCart);
    }
    catch (error) {
      console.log("Error handleCheckBox: ", error);
    }
  };

  const deleteSelectedItem = async () => {
    try {
      for (let i = 0; i < listCart.length; i++) {
        if (listCart[i].isSelected) {
          await onDeleteOrderDetail(listCart[i].id);
        }
      }
      const updateCartList = listCart.filter((item) => {
        return !item.isSelected;
      });
      console.log("updateCartList", updateCartList);
      setListCart(updateCartList);
      handleSelectedList(updateCartList);
      calculateTotalPrice(updateCartList);
    } catch (error) {
      console.log("Delete all items error: ", error);
    }
  };

  const handleSelectedList = async (_list) => {
    try {
      setDisabled(() => {
        const list = _list;
        for (let i = 0; i < list.length; i++) {
          if (list[i].isSelected === true) {
            return false;
          }
        }
        return true;
      })
    } catch (error) {
      console.log("Error handleSelectedList: ", error);
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
        <TouchableOpacity onPress={() => deleteSelectedItem()}>
          <Image
            style={{ width: 22, height: 22, display: disabled ? 'none' : 'flex' }}
            resizeMode='cover'
            source={require('../../../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={listCart}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              deleteItem={() => deleteItem(item.id)}
              plus={() => handleQuantityChange(item.id, item.quantity + 1, item.isSelected)}
              minus={() => handleQuantityChange(item.id, item.quantity > 1 ? item.quantity - 1 : 1, item.isSelected)}
              item={item}
              nav={() => goToProductDetail(item.idSubProduct, item.idProduct)}
              onCheckedItem={() => handleCheckBox()}
            />
          )}
          keyExtractor={item => item.id}
        />


      </SafeAreaView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20 }}>Total:</Text>
          <Text style={{ fontSize: 20, color: "red" }}>${totalPrice}</Text>
        </View>
        <TouchableOpacity disabled={disabled} onPress={() => navigation.navigate("CheckOut")} style={[styles.checkOutButton, disabled && styles.checkOutButtonDisable]}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;



const Item = ({ item, plus, minus, deleteItem, nav, onCheckedItem }) => {
  const [checked, setChecked] = useState(item.isSelected);
  const onChangeCheckStatus = async () => {
    // setChecked(!checked);
    item.isSelected = !item.isSelected;
    onCheckedItem();
  };

  return (
    <TouchableOpacity onPress={nav}>
      <View style={styles.item}>
        <CircleCheckBox
          checked={item.isSelected}
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
  checkOutButton: {
    backgroundColor: '#000',
    height: 60,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkOutButtonDisable: {
    backgroundColor: '#cccccc',
  },
});