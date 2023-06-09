import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
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

  const { onAddToCart, onAddToFavorite, setListCart,
    setListFavorite, setCountCart, countCart, onGetProductById,
    total, setTotal, onGetPicturesByIdProduct, onGetImageByIdProductAndColor, onGetCommentsByIdProduct, onGetSubProductsByIdProduct, onGetReviewsByIdProduct
  } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(1);
  const [listImage, setListImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listCmt, setListCmt] = useState([]);
  const [listPrice, setPrice] = useState([]);
  const [item, setItem] = useState([]);
  const [star, setStar] = useState([]);
  const [review, setReview] = useState([]);
  // back(navigation);
  // // const [item, setItem] = useState([]);
  // // setItem(onGetProductById(idProduct));
  // console.log('item');
  // console.log(item);
  // const handleCountPlus = () => {
  //   setCount(count + 1);
  // };
  // const handleCountMinus = () => {
  //   if (count > 1) {
  //     setCount(count - 1);
  //   }
  // };

  // //Them san pham vao gio hang
  // const addToCart = async () => {
  //   try {
  //     const totalPrice = item.price * count;
  //     const amount = count;
  //     const idOrder = user.cart;
  //     const idProduct = item._id;
  //     const order_detail = await onAddToCart(totalPrice, amount, idOrder, idProduct);
  //     console.log("Add to cart: ", order_detail);
  //     setListCart(current => [...current, order_detail]);
  //     setCountCart(countCart + 1);
  //     console.log("Total: ", total);
  //     console.log("Total price: ", totalPrice + total);
  //     setTotal(total + totalPrice);
  //     setCount(1);
  //     navigation.navigate('Cart');
  //   } catch (error) {
  //     console.log("Add to cart error: ", error);
  //   }
  // };

  // //Them san pham vao favorite
  // const addToFavorite = async () => {
  //   try {
  //     const totalPrice = item.price;
  //     const amount = 1;
  //     const idOrder = user.favorite;
  //     const idProduct = item._id;
  //     const order_detail = await onAddToFavorite(totalPrice, amount, idOrder, idProduct);
  //     console.log("Add to favorite: ", order_detail);
  //     setListFavorite(current => [...current, order_detail]);
  //     navigation.navigate('Favorite');
  //   } catch (error) {
  //     console.log("Add to favorite error: ", error);
  //   }
  // };

  //Lay tat ca hinhanh cua san pham

  //lay tat ca san pham
  useEffect(() => {
    setIsLoading(false);

    const getSubProducts = async () => {
      try {
        const response = await onGetSubProductsByIdProduct(route.params.idProduct);
        const products = response.data;

        const tempReview = await onGetReviewsByIdProduct(route.params.idProduct);
        const reviews = tempReview.data;

        console.log(reviews); // Kiểm tra dữ liệu reviews trong console

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

  // useEffect(() => {
  //   getListCmt();
  // }, []);

  // //Lay danh sach cmt
  // const getListCmt = async () => {
  //   try{
  //     const cmts = await onGetCommentsByIdProduct(item._id);
  //     console.log("Get list cmt: ", cmts);

  //     let rate = 0;
  //     if(cmts.length > 0){
  //       for (let i = 0; i < cmts.length; i++) {
  //         rate += cmts[i].rate/cmts.length;
  //         cmts.rate = rate.toFixed(1);
  //       }
  //     }else{
  //       cmts.rate = 0;
  //     }
  //     setListCmt(cmts);
  //   }catch(error){
  //     console.log("Get list cmt error: ", error);
  //   }
  // };

  //Lay anh theo mau
  // const getImageByColor = async (color) => {
  //   try {
  //     const image = await onGetImageByIdProductAndColor(item._id, color);
  //     //console.log("Image: ", image);
  //     //set image vao item
  //     item.listImage = [image];
  //   } catch (error) {
  //     console.log("Get image by color error: ", error);
  //   }
  // };

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.icon} source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
        </View>
        {/* slideImage */}
        <View style={{ flex: 1 }}>

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
          {/* Color product */}
          {/* <FlatList
            horizontal
            data={mau}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ backgroundColor: item.color, width: 30, height: 30, margin: 3, borderRadius: 10 }}
                onPress={() => nextScreen(item)}
              >
              </TouchableOpacity>
            )}
          /> */}

        </View>
        {/* Name product */}
        <Text style={styles.nameProduct}>SAMSUNG S20 256GB</Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            {/* Price product */}
            <Text style={styles.pricProduct}>{listPrice} $</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, }}>
              {/* Sale */}
              <View style={styles.sale}>
                <Text style={{ color: "white", }}>5%</Text>
              </View>
              <Text style={{ color: "black", textDecorationLine: 'line-through', marginLeft: 5 }}>21.00%</Text>
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
            Minimal Stand is made of by natural wood. It is designed to be simple and solid.
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
