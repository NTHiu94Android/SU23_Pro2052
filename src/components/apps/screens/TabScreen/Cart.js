import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import ProgressDialog from 'react-native-progress-dialog';
import back from '../../../back/back';
const Cart = (props) => {
  const { navigation } = props;
  const { user } = useContext(UserContext);
  const {
    onGetOrderDetailsByIdOrder, listCart, setListCart, onGetProductById,
    countCart, onUpdateOrderDetail, onDeleteOrderDetail, onGetSubProductById,
    total, setTotal
  } = useContext(AppContext);
  back(navigation);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const updateItem = (id, newValue) => {
    let sum = 0;
    let priceTemp = 0;
    const newItems2 = listCart.map(item => {
      if (item._id === id) {
        const price = item.beforeSale;
        const salePrice = item.price;
        const quantity = newValue;
  
        item.quantity = quantity;
        item.itemPrice = price * quantity;
        item.itemSalePrice = salePrice * quantity;
        item.totalPrice = item.itemSalePrice;
        priceTemp = item.totalPrice;


      }
      console.log("itemMap", item);
      sum += item.itemSalePrice;
      console.log("newTotal", sum);

      return item;
    });


    const newTotal = newItems2.reduce((total, item) => total + item.totalPrice, 0);
    setTotal(sum);
    setListCart(newItems2);
  
    listCart.forEach(item => {
      if (item._id === id) {
        const itemNew = { ...item, quantity: newValue, totalPrice: item.price * newValue };
        updateItemCart(itemNew._id, itemNew.totalPrice, itemNew.quantity, itemNew.idOrder, itemNew.idSubProduct);
      }
    });
  };
  
  

  const deleteItem = async (id) => {
    const newItems = listCart.filter(item => item._id !== id);
    console.log("Delete item cart: ", newItems);
    if (newItems.length === 0) {
      setTotal(0);
    } else {
      let sum = 0;
      newItems.map(item => {
        console.log("total", total);
        console.log('name', item.prodName);
        sum = sum + item.price;
        console.log("sum ", sum);
        return item;
      });
      setTotal(sum);
    }
    setListCart(newItems);
    //setTotal(total - listCart.find(item => item._id === id).totalPrice);
    const res = await onDeleteOrderDetail(id);
    console.log("Delete item cart: ", res);
  };

  const deleteAllItems = async () => {
    try {
      // Xóa tất cả các mục trong listCart
      const deletedItems = await Promise.all(listCart.map(item => onDeleteOrderDetail(item._id)));
      console.log("Deleted items: ", deletedItems);
  
      // Đặt lại giá trị của listCart và tổng giá trị
      setListCart([]);
      setTotal(0);
    } catch (error) {
      console.log("Delete all items error: ", error);
    }
  };
  
  //Lay danh sach san phma trong gio hang
  useEffect(() => {
    const getListCart = async () => {
      try {
        setIsLoading(true);
        // console.log("list", list);
        let sum = 0;
        const response = await onGetOrderDetailsByIdOrder(user.idCart);
        if (!response) return;
        // console.log("List cart: ", response);

        for (let i = 0; i < response.length; i++) {

          //Lấy subproduct theo id
          const subProduct = await onGetSubProductById(response[i].idSubProduct);

          // console.log('subProduct: ', subProduct);
          //Lấy product theo idProduct
          const product = await onGetProductById(subProduct.idProduct);
          // console.log('products', product);
          response[i].imageurl = product.image;
          // console.log("Product image: ", product.image);
          response[i].prodName = product.name;
          response[i].idSubPro = subProduct._id;
          response[i].Color_order = subProduct.color;
          response[i].idPro = subProduct.idProduct;
          response[i].beforeSale = subProduct.price;
          response[i].itemPrice = subProduct.price * response[i].quantity;
          response[i].itemSalePrice = (subProduct.price - (subProduct.price * subProduct.sale)/100) * response[i].quantity;
          // response[i].totalPrice = product.price * response[i].quantity;
          // response[i].price = product.price;
          sum = sum + response[i].itemSalePrice;
          // console.log("gía", response[i]);

        }
        setListCart(response);
        setTotal(sum);
        setIsLoading(false);

      } catch (error) {
        console.log("Get list cart error: ", error);
      }
    };
    getListCart();
  }, [countCart]);


  const updateItemCart = async (_idOrderDetail, _totalPrice, _quantity, _idOrder, idSubProduct) => {
    try {
      const subProduct = await onGetSubProductById(idSubProduct);
      if (subProduct.quantity < _quantity) {
        Alert("Số lượng sản phẩm trong kho không đủ!");
        return;
      }
      const response = await onUpdateOrderDetail(_idOrderDetail, _quantity, _totalPrice, false, _idOrder, idSubProduct);
      // console.log("Update item cart: ", response.quantity + " ... " + response.price);
      //setCountCart(countCart + 1);
    } catch (error) {
      console.log("Update item cart error: ", error);
    }
  };
  const goToProductDetail = (idSubPro, idPro) => {
    navigation.navigate('ProductDetail', { idSubPro: idSubPro, idPro: idPro });
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: 'white' }}>
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
          data={listCart}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Item
              key={item._id}
              deleteItem={() => deleteItem(item._id)}
              plus={() => updateItem(item._id, item.quantity + 1)}
              minus={() => updateItem(item._id, item.quantity > 1 ? item.quantity - 1 : 1)}
              item={item}
              nav={() => goToProductDetail(item.idSubPro, item.idPro)}
            />
          )}
          keyExtractor={item => item._id}
        />


      </SafeAreaView>

      {listCart.length !== 0 ? (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20 }}>Total:</Text>
              <Text style={{ fontSize: 20, color:"red" }}>${total}</Text>
            </View>
          <TouchableOpacity onPress={() => navigation.navigate("CheckOut")} style={{ backgroundColor: '#000', height: 60, borderRadius: 30, flexDirection: 'column', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: '#BBB', height: 60, borderRadius: 30, flexDirection: 'column', justifyContent: 'center' }}>
          <TouchableOpacity>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>

          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;



const Item = ({ item, plus, minus, deleteItem, nav }) => (

  <TouchableOpacity onPress={nav}>
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.imageurl }} style={styles.image} />
        <View style={{ justifyContent: 'space-between', paddingVertical: 5, paddingStart: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '800' }}>{item.prodName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200 }}>
            <Text style={{ fontSize: 14, fontWeight: '800' }}>Color: {item.Color_order}</Text>
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
          <View style={{flexDirection: 'row'}}>
          <Text style={{ fontSize: 14, fontWeight: '600', }}>Price: </Text>
          <Text style={{ fontSize: 14, fontWeight: '600',  textDecorationLine: 'line-through', }}>${item.itemPrice}</Text>
          <Text style={{ fontSize: 14, fontWeight: '800', color:'red' }}> ${item.itemSalePrice}</Text>

          </View>
        

        </View>
      </View>
      <TouchableOpacity onPress={deleteItem}>
        <Text name="closecircleo" color="black" style={{ fontWeight: '700', fontSize: 20 }}>x</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

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