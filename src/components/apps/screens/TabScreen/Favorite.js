import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';

const Favorite = (props) => {
  const [data, setData] = useState([
    { id: '1', name: 'Item 1', price: '50.00', color: 'red', imageurl: require('../../../../assets/images/Iphone14.png') },
    // more items
  ]);
  const { navigation } = props;
  const { onGetOrderDetailsByIdOrder, listFavorite, setListFavorite, onGetSubProductById, onGetProductById, countFavorite, onDeleteOrderDetail, tempIdProduct, setTempIdProduct,
    tempIdSubProduct, setTempIdSubProduct, onAddToCart } = useContext(AppContext);
  const { user } = useContext(UserContext);

  //Lấy danh sách yêu thích
  const getFavoriteList = async () => {
    try {
      const resFav = await onGetOrderDetailsByIdOrder(user.idFavorite);
      if (resFav) return resFav;
    }
    catch (error) {
      console.log('getFavoriteList error: ', error);
    }
  }

  const getSubProducts = async (resFav) => {
    const subProducts = [];
    try {
      if (!resFav) return;
      for (const item of resFav) {
        const resSub = await onGetSubProductById(item.idSubProduct);
        subProducts.push(resSub);
      }
    } catch (error) {
      console.log('getSubProducts error: ', error);
    }
    return subProducts;
  }

  const getProducts = async (resSubProducts) => {
    const products = [];
    try {
      if (!resSubProducts) return;
      for (const item of resSubProducts) {
        const resProduct = await onGetProductById(item.idProduct);
        products.push(resProduct);
      }
    } catch (error) {
      console.log('getProducts error: ', error);
    }
    return products;
  }

  const getDatas = async (favItem, subItem, prodItem) => {
    const datas = [];
    try {
      for (const fav of favItem) {
        const sub = subItem.find((item) => item._id === fav.idSubProduct);
        if (sub) {
          const prod = prodItem.find((item) => item._id === sub.idProduct);
          if (prod) {
            const data = {
              id: fav._id,
              name: prod.name,
              price: sub.price,
              sale: sub.sale,
              color: sub.color,
              imageUrl: prod.image,
              idPro: sub.idProduct,
              idSubPro: fav.idSubProduct,
              stockQuantity: sub.quantity,
            }
            datas.push(data);
          }
        }
      }
    } catch (error) {
      console.log('getDatas error: ', error);
    }
    return datas;
  }
  const goToProductDetail = (idSubPro, idPro) => {
    navigation.navigate('ProductDetail', { idSubPro: idSubPro, idPro: idPro });
    setTempIdProduct(idPro);
    setTempIdSubProduct(idSubPro);
  };
  useEffect(() => {
    const loadData = async () => {
      const favItem = await getFavoriteList();
      const subItem = await getSubProducts(favItem);

      const prodItem = await getProducts(subItem);

      getDatas(favItem, subItem, prodItem).then((res) => {
        setListFavorite(res);
        console.log('res123: ', res);
      });
    }
    loadData();
  }, [countFavorite]);
  const deleteItem = async (id) => {
    console.log("favoriteId: ", id);
    await onDeleteOrderDetail(id);
    const updatedList = listFavorite.filter(item => item.id !== id);
    setListFavorite(updatedList);
  };

  //Thêm sản phẩm vào giỏ hàng
  const addToCart = async (item) => {
    try {
      const _quantity = 1;
      console.log('StockQuantity: ', item.stockQuantity);
      const _price = item.price - (item.price * item.sale) / 100
      const resAddToCart = await onAddToCart(_quantity, _price, user.idCart, item.idSubPro);
      if (resAddToCart) console.log('Đã thêm một ' + item.name + ' vào giỏ hàng');
    } catch (error) {
      console.log('addToCart error: ', error);
    }
  }

  //Thêm toàn bộ sản phẩm vào giỏ hàng
  const addAllToCart = async () => {
    try {
      for (const item of listFavorite) {
        addToCart(item);
      }
    } catch (error) {
      console.log('addAllToCart error: ', error);
    }
  }

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
        data={listFavorite}
        renderItem={({ item }) =>
          <Item item={item}
            deleteFavoriteItem={() => deleteItem(item.id)}
            nav={() => goToProductDetail(item.idSubPro, item.idPro)}
            addToCart={() => addToCart(item)} />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} // Use the "id" as the key prop
      />
      {
        listFavorite.length !== 0 ?
          <TouchableOpacity onPress={() => addAllToCart()} style={styles.button}>
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

const Item = ({ item, deleteFavoriteItem, nav, addToCart }) => {
  return (
    <TouchableOpacity onPress={nav}>

    <View style={styles.listItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.imgLst} />
      <View style={styles.listItemName}>
        <Text style={styles.TextlstName}>{item.name}</Text>
        <Text style={styles.TextlstPrice}>{item.color}</Text>
        <Text style={styles.TextlstPrice}>$ {item.price}</Text>
      </View>
      <View style={styles.listItemIcon}>
        <TouchableOpacity onPress={deleteFavoriteItem}>
          <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
            <Image source={require('../../../../assets/images/del.png')} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addToCart}>
          <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
            <Image source={require('../../../../assets/images/shop.png')} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
</TouchableOpacity>
  );
};

