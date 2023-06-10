import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';

import Swiper from 'react-native-swiper';
import ProgressDialog from 'react-native-progress-dialog';
import back from '../../../back/back';


const ProductDetail = ({ route, navigation }) => {
  // const { item } = route.params.idProduct;
  // console.log("cua tao");
  // console.log(route); 
  const { idProduct } = route.params;

  const { onGetProductById, onGetProducts, onGetSubProducts, onGetPicturesByIdProduct, countOrderDetail, onGetSubProductsByIdProduct, onGetReviewsByIdProduct
  } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [listImage, setListImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const [listPrice, setPrice] = useState([]);
  const [star, setStar] = useState([]);
  const [review, setReview] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [item, setItem] = useState([]);
  back(navigation);


  //lay tat ca san pham
  useEffect(() => {
    setIsLoading(false);

    const getSubProducts = async () => {
      try {
        const response = await onGetSubProductsByIdProduct(route.params.idProduct);
        const products = response.data;
        setItem(products);
        const tempReview = await onGetReviewsByIdProduct(route.params.idProduct);
        const reviews = tempReview.data;

        console.log(response); // Kiểm tra dữ liệu reviews trong console

        const reviewCount = reviews.length; // Lấy số lượng reviews
        console.log(reviewCount); // Kiểm tra số lượng reviews trong console
        setReview(reviewCount);
        // Tính tổng rating
        let totalRating = 0;
        reviews.forEach(review => {
          totalRating += review.rating;
        });

        const averageRating = totalRating / reviewCount; // Tính trung bình cộng của rate
        setStar(averageRating);
        console.log(averageRating); // Kiểm tra trung bình cộng của rate trong console

        if (products.length > 0) {
          const productId = products[0]._id; // Giả sử bạn muốn lấy hình ảnh dựa trên _id của sản phẩm đầu tiên
          const imagesResponse = await onGetPicturesByIdProduct(productId);
          const images = imagesResponse.data;

          let list = [];
          for (let i = 0; i < images.length; i++) {
            list.push(images[i].url);
          }
          setListImage(list);

          const firstPrice = products[0].price;
          setPrice(firstPrice);
        }

        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching sub-products: ", error);
      }
    };

    getSubProducts();

  }, []);

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
        const subProduct = await onGetSubProductsByIdProducts(product._id, resSubProduct);

        //gộp những dự liệu cần thiết từ subProduct vào product
        const detail = await subProduct.map((item) => ({
          id: item._id,
          color: item.color,
          price: item.price,
          sale: item.sale,
          description: item.description,
        }));
        product.detail = detail;

        setProduct(product);
        setProductDetail(product.detail[0]);
      } catch (error) {
        setIsLoading(false);
        console.log("Error home screen: ", error);
      }
      setIsLoading(false);
    };

    getData(idProduct);
  }, [countOrderDetail]);

  const onGetSubProductsByIdProducts = async (idProduct, res) => {
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

  const selectColor = async (item) => {
    for (let i = 0; i < product.detail.length; i++) {
      if (item.id === product.detail[i].id) {
        setSelectedIndex(i);
        setProductDetail(product.detail[i]);
      }
    }
    const imagesResponse = await onGetPicturesByIdProduct(item.id);
    const images = imagesResponse.data;

    let list = [];
    for (let i = 0; i < images.length; i++) {
      list.push(images[i].url);
    }
    setListImage(list);
  };

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <ProgressDialog
  //         visible={isLoading}
  //         loaderColor="black"
  //         label="Please wait..."
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.icon} source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
        </View>
        {/* slideImage */}
        <View style={{ flex: 1, marginTop: 30 }}>

          <Swiper
            style={{ height: 280 }}
            autoplayTimeout={3}
            autoplay={true}
            loop={true}
            showsPagination={true}>
            {listImage.map((image, index) => {
              return (
                <Image
                  key={index}
                  style={{ width: '100%', height: 280 }}
                  resizeMode='stretch'
                  source={{
                    uri: image,
                  }} />
              );
            })}
          </Swiper>



        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.colorProduct}>
          <FlatList
            horizontal
            data={product.detail}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: item.color,
                  width: 30,
                  height: 30,
                  margin: 3,
                  borderRadius: 10,
                  borderWidth: index === selectedIndex ? 2 : 0,
                  borderColor: index === selectedIndex ? 'red' : 'transparent',
                }}
                onPress={() => selectColor(item)}
              ></TouchableOpacity>
            )}
          />
        </View>
        {/* Name product */}
        <Text style={styles.nameProduct}>{product.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            {/* Price product */}
            <Text style={styles.pricProduct}>
              {productDetail?.price - (productDetail?.price * productDetail?.sale) / 100}$
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, }}>
              {/* Sale */}
              <View style={styles.sale}>
                <Text style={{ color: 'white' }}>{productDetail?.sale}%</Text>
              </View>
              <Text style={{ color: 'black', textDecorationLine: 'line-through', marginLeft: 5 }}>{productDetail?.price}$</Text>
            </View>
          </View>
          <View style={{ width: "40%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Image style={styles.button} source={require('../../../../assets/images/btn_minus.png')} />
            {/* So luong san pham */}
            <Text style={{ color: "black", fontSize: 20 }}>01</Text>
            <Image style={styles.button} source={require('../../../../assets/images/btn_plus.png')} />
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, }}>
          <Image style={styles.button} source={require('../../../../assets/images/star.png')} />
          {/* Star */}
          <Text style={{ marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "black" }}>{star}</Text>
          {/* So luong reviews */}
          <TouchableOpacity onPress={() => navigation.navigate('ListReview', { idProduct: route.params.idProduct })}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>{review} Reviews</Text>
          </TouchableOpacity>

        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginTop: 10 }}>Desciption</Text>
        {/* Mo ta san pham */}
        <View style={{ flex: 0.8, }}>
          <Text>
            {productDetail?.description}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.button1}>
          <Image style={{ width: 24, height: 24 }}
            source={require('../../../../assets/images/ic_fvr.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.button2}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 4.5,
  },
  image: {
    width: "100%",
    height: "100%",

  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
    top: 20
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  colorProduct: {
    flex: 0.2,
    justifyContent: "center"
  },
  nameProduct: {
    color: "black",
    fontSize: 24,
    fontFamily: ""
  },
  pricProduct: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold"
  },
  sale: {
    width: 40,
    height: 30,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  button1: {
    backgroundColor: '#F0F0F0', height: 50, width: 50,
    borderRadius: 8, justifyContent: 'center', alignItems: 'center'
  },
  button2: {
    backgroundColor: '#000', height: 50, width: 280,
    borderRadius: 8, flexDirection: 'column', justifyContent: 'center'
  },
})
