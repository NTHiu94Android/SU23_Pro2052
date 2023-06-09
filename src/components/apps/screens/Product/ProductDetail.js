import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import Swiper from 'react-native-swiper';
import back from '../../../back/back';
import { AppContext } from '../../AppContext';
import ProgressDialog from 'react-native-progress-dialog';

const ProductDetail = (props) => {
  const { navigation, route } = props;
  const { idProduct } = route.params;
  const [product, setProduct] = useState();
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { onGetProductById, onGetProducts, onGetSubProducts, onGetReviews, countOrderDetail, onGetPicturesByIdProduct } = useContext(AppContext);
  back(navigation);

  useEffect(() => {
    setIsLoading(true);
    const getData = async (_idProduct) => {

      try {
        const resProduct = await onGetProducts();
        const resSubProduct = await onGetSubProducts();

        if (!resProduct || !resSubProduct) {
          setIsLoading(false);
          return;
        }
        //lấy sản phẩm theo id
        const product = await onGetProductById(_idProduct);

        //lấy tất cả sản phẩm chi tiết theo id sản phẩm
        const subProduct = await onGetSubProductsByIdProduct(product._id, resSubProduct);

        const detail = await subProduct.map((item) => (
          {
            id: item._id,
            color: item.color,
            price: item.price,
            sale: item.sale,
            description: item.description,
          }));

        product.detail = detail;

        setProduct(product);
        setProductDetail(product.detail[0]);
        console.log('product: ', product);
      } catch (error) {
        setIsLoading(false);
        console.log("Error home screen: ", error);
      }
      setIsLoading(false);
    };
    getData(idProduct);
  }, [countOrderDetail]);

  const onGetSubProductsByIdProduct = async (idProduct, res) => {
    try {
      if (!res.data) {
        return;
      } else {
        const subProduct = res.data.filter((item) => item.idProduct == idProduct);
        return subProduct;
      }
    } catch (error) {
      console.log('onGetSubProductsByIdProduct error: ', error);
    }
  };

  const data = [
    {
      _id: '1',
      url: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1657641867367'
    },
    {
      _id: '2',
      url: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg'
    },
    {
      _id: '3',
      url: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg'
    },
  ];

  const mau = [
    { id: '1', color: 'silver' },
    { id: '2', color: 'gold' },
    { id: '3', color: 'green' },
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ProgressDialog
          visible={isLoading}
          loaderColor="black"
          label="Please wait..."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Swiper
            style={{ height: 280 }}
            autoplayTimeout={3}
            autoplay={true}
            loop={true}
            showsPagination={true}
          >
            {data.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={{ width: '100%', height: 280 }}
                  resizeMode='stretch'
                  source={{
                    uri: item.url,
                  }}
                />
              );
            })}
          </Swiper>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.icon}
              source={require('../../../../assets/images/ic_back.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.colorProduct}>
          <FlatList
            horizontal
            data={product.detail}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: item.color,
                  width: 30,
                  height: 30,
                  margin: 3,
                  borderRadius: 10,
                }}
                onPress={() => nextScreen(item)}
              ></TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.nameProduct}>{product.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '60%' }}>
            <Text style={styles.pricProduct}>{productDetail.price - productDetail.price * productDetail.sale / 100}$</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <View style={styles.sale}>
                <Text style={{ color: 'white' }}>{productDetail.sale}%</Text>
              </View>
              <Text style={{ color: 'black', textDecorationLine: 'line-through', marginLeft: 5 }}>{productDetail.price}$</Text>
            </View>
          </View>
          <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Image style={styles.button} source={require('../../../../assets/images/btn_minus.png')} />
            <Text style={{ color: 'black', fontSize: 20 }}>01</Text>
            <Image style={styles.button} source={require('../../../../assets/images/btn_plus.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image style={styles.button} source={require('../../../../assets/images/star.png')} />
          <Text style={{ marginLeft: 10, fontSize: 24, fontWeight: 'bold', color: 'black' }}>{product.rating}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ListReview')}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>(321 reviews)</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 10 }}>Desciption</Text>
        <View style={{ flex: 0.8 }}>
          <Text>
            {productDetail.description}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.button1}>
          <Image style={{ width: 24, height: 24 }} source={require('../../../../assets/images/ic_fvr.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.button2}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 4.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: 20,
  },
  button: {
    width: 30,
    height: 30,
  },
  body: {
    flex: 4.8,
    margin: 10,
  },
  footer: {
    flex: 0.7,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorProduct: {
    flex: 0.2,
    justifyContent: 'center',
  },
  nameProduct: {
    color: 'black',
    fontSize: 24,
    fontFamily: '',
  },
  pricProduct: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sale: {
    width: 40,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#F0F0F0',
    height: 50,
    width: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#000',
    height: 50,
    width: 280,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
