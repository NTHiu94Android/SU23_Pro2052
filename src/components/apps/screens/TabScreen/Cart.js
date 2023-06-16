import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, {  useContext, useEffect, useState  } from 'react';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import ProgressDialog from 'react-native-progress-dialog';

const Cart = (props) => {
  const { navigation } = props;
  const { user } = useContext(UserContext);
  const {
    onGetOrderDetailsByIdOrder, listCart, setListCart, onGetProductById,
    countCart, onUpdateOrderDetail, onDeleteOrderDetail, onGetSubProductById,
    total, setTotal
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList]=useState([]);

  const updateItem = (id, newValue) => {
    //Cap nhat tren giao dien 
    let sum = 0;
    const newItems2 = listCart.map(item => {
      if (item._id === id) {
        const price = item.price;
        item.quantity = newValue;
        item.totalPrice = price * newValue;
      }
      console.log("total",total);
      sum = sum + item.totalPrice;
      
      return item;
    });
    setTotal(sum);
    setListCart(newItems2);

    //Cap nhat tren server mongodb
    listCart.map(item => {
      if (item._id === id) {
        const itemNew = { ...item, quantity: newValue, totalPrice: item.price * newValue };
        console.log(">>>>>>>>>>>>TotalPrice: ", itemNew.price * itemNew.quantity);
        console.log("New Item: ", itemNew);
        updateItemCart(itemNew._id, itemNew.totalPrice, itemNew.quantity, itemNew.idOrder, itemNew.idSubProduct);
      }
      return item;
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
        sum += item.totalPrice;
        return item;
      });
      setTotal(sum);
    }
    setListCart(newItems);
    //setTotal(total - listCart.find(item => item._id === id).totalPrice);
    const res = await onDeleteOrderDetail(id);
    console.log("Delete item cart: ", res);
  };


//Lay danh sach san phma trong gio hang
useEffect(() => {
  const getListCart = async () => {
    try {
      setIsLoading(true);
      console.log("list", list);
      let sum = 0;
      const response = await onGetOrderDetailsByIdOrder(user.idCart);
      if (!response) return;
      console.log("List cart: ", response);
      
      for (let i = 0; i < response.length; i++) {

        //Lấy subproduct theo id
        const subProduct = await onGetSubProductById(response[i].idSubProduct);
        console.log('subProduct: ', subProduct._id);

        //Lấy product theo idProduct
        const product = await onGetProductById(subProduct.idProduct);
        console.log('products',product);
        response[i].imageurl = product.image;
        // console.log("Product image: ", product.image);
        response[i].prodName = product.name;
        response[i].idSubPro = subProduct._id;
        response[i].idPro = subProduct.idProduct;
        // response[i].totalPrice = product.price * response[i].quantity;
        // response[i].price = product.price;
        sum = sum + response[i].price;
        console.log("gía",response[i].price);

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
    console.log("Update item cart: ", response.quantity + " ... " + response.price);
    //setCountCart(countCart + 1);
  } catch (error) {
    console.log("Update item cart error: ", error);
  }
};
const goToProductDetail = (idSubPro, idPro) => {
  navigation.navigate('ProductDetail', { idSubPro: idSubPro, idPro: idPro });
};


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 30, paddingHorizontal: 20, backgroundColor: 'white' }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 20 }}>My cart</Text>
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
          <View style={{ height: 150, justifyContent: 'space-between' }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffff', borderRadius: 10, paddingStart: 11 }}>
              <TextInput placeholder="Enter your promo code" />
              <Text name="rightsquare" size={44} color="black" >Enter</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20 }}>Total:</Text>
              <Text style={{ fontSize: 20 }}>${total}</Text>
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



const Item = ({ item, plus, minus, deleteItem, nav }) => (
  <TouchableOpacity onPress={nav}>
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.imageurl }} style={styles.image} />
        <View style={{ justifyContent: 'space-between', paddingVertical: 5, paddingStart: 10 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '800' }}>{item.prodName}</Text>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>${item.price}</Text>
          </View>
          <View style={styles.qualityRange}>
            <TouchableOpacity onPress={plus}>
              <Text name="squared-plus" color="black" style={{ fontWeight: '500', fontSize: 18 }}>+</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
            <TouchableOpacity onPress={minus}>
              <Text name="squared-minus" color="black" style={{ fontWeight: '900', fontSize: 18 }}>-</Text>
            </TouchableOpacity>
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