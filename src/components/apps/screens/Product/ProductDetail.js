import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';

import Swiper from 'react-native-swiper';
import ProgressDialog from 'react-native-progress-dialog';
import back from '../../../back/back';
import QuantityDialog from './QuantityDialog';


const ProductDetail = ({ route, navigation }) => {
  const { idProduct } = route.params;
  const { idSubPro, idPro } = route.params;


  const { onGetProductById, onGetProducts, onGetSubProducts, onGetPicturesByIdProduct, countOrderDetail, onGetSubProductsByIdProduct, onGetReviewsByIdProduct, onGetSubProductById,
    onAddToCart, onAddToFavorite,
    setListFavorite, setCountCart, countCart, setListCmt, onReloadFavorite, countFavorite,
    total, setTotal, onGetImagesByIdProduct, onGetCommentsByIdProduct, onUpdateOrderDetail, onGetOrderDetailsByIdOrder, onDeleteOrderDetail
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
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [caonhat, setCaoNhat] = useState(0);
  const [color, setColor] = useState();
  const [id, setId] = useState();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [like, setLike] = useState(false);
  const [favoriteId, setFavoriteId] = useState('');

  back(navigation);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const handleConfirm = value => {
    setQuantity(parseInt(value));
    if (value < caonhat) {
      console.log("so luong", value);
      setDialogVisible(false);
    } else {
      ToastAndroid.show('Số lượng quá lớn', ToastAndroid.SHORT);
    }
  };

  //Thêm vào danh sách yêu thích
  const addToFavorite = async () => {
    try {
      const favQuantity = 1;
      if(like == true){
        setLike(false);
        console.log("favoriteId: ", favoriteId);
        await onDeleteOrderDetail(favoriteId);
      }else{
        const favorite = await onAddToCart(favQuantity, productDetail.price, user.idFavorite, productDetail.id);
        if (favorite) {
          setLike(true);
        }
      }
      onReloadFavorite();
    } catch (error) {
      console.log("Add to favorite error: ", error);
    }
  };

  //Kiểm tra danh sách yêu thích
  const checkFavorite = async (_idSubProduct) => {
    try {
      const resFavorite = await onGetOrderDetailsByIdOrder(user.idFavorite);
      for (const item of resFavorite) {
        console.log('item: ', item);
        if (item.idSubProduct === _idSubProduct) {
          setLike(true);
          setFavoriteId(item._id);
          break;
        }
      }
    } catch (error) {
      console.log("Check favorite error: ", error);
    }
  };


  const addToCart = async () => {

    try {
      const amount = quantity;
      const idOrder = user.idCart;
      const price = (productDetail?.price - (productDetail?.price * productDetail?.sale) / 100);
      let found = false;
      let i;
      for (i = 0; i < listOrderDetail.length; i++) {
        if (productDetail.id === listOrderDetail[i].idSubProduct) {
          console.log("Sản phẩm đã có trong giỏ hàng");
          found = true;
          break;
        }
      }
      if (found === false) {
        const order_detail = await onAddToCart(amount, price, idOrder, productDetail.id);
        console.log("Add to cart: ", order_detail);
        navigation.navigate('Cart');
      } else {
        const up_amount = quantity + parseInt(listOrderDetail[i].quantity);
        console.log("up_amount", up_amount);
        if (up_amount < caonhat) {
          const up_idOdert = listOrderDetail[i].idOrder;
          const up_price = (productDetail?.price - (productDetail?.price * productDetail?.sale) / 100);
          console.log("Price1:", quantity)
          const up_listID = listOrderDetail[i]._id;
          const update_deait = await onUpdateOrderDetail(up_listID, up_amount, up_price, 'false', up_idOdert, productDetail.id);
          console.log("updateeeeeeeeeeee", update_deait);
          // setlistOrderDetail(current => [...current.slice(0, i), update_deait, ...current.slice(i + 1)]);
          setCountCart(countCart + 1);
          setQuantity(up_amount);
          navigation.navigate('Cart');
        } else {
          ToastAndroid.show('Số lượng ko đủ', ToastAndroid.SHORT);
        }

      }
    } catch (error) {
      console.log("Add to cart error: ", error);
    }
  };

  const handleCountPlus = () => {
    if (quantity < caonhat) {
      setQuantity(quantity + 1);
    }
  };
  const handleCountMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };



  useEffect(() => {
    setIsLoading(true);
    let tempId = idProduct !== undefined ? idProduct : idPro;

    const getData = async (_idProduct) => {
      try {
        const resProduct = await onGetProducts();
        const resSubProduct = await onGetSubProducts();

        //Lấy danh sách order detail theo id order
        const resOrderDetail = await onGetOrderDetailsByIdOrder(user.idCart);

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
          inStock: item.quantity,
        }));
        product.detail = detail;
        setProduct(product);
        setProductDetail(product.detail[0]);
        checkFavorite(detail[0].id);
        setListOrderDetail(resOrderDetail);
      } catch (error) {
        setIsLoading(false);
        console.log("Error home screen: ", error);
      }
      setIsLoading(false);
    };

    getData(tempId);
  }, [countOrderDetail, countFavorite]);
  //lay tat ca san pham
  useEffect(() => {
    setIsLoading(false);


    const getSubProducts = async () => {
      try {
        let tempId = idProduct !== undefined ? idProduct : idPro;
        setId(tempId);
        // console.log("id", tempId);
        // lấy sub-product theo idProduct
        const response = await onGetSubProductsByIdProduct(tempId);
        const products = response.data;
        setItem(products);
        // lấy review theo idProduct
        const tempReview = await onGetReviewsByIdProduct(tempId);
        const reviews = tempReview.data;
        const soluong = products.length;
        // console.log(products);
        console.log("products: ", response); // Kiểm tra dữ liệu reviews trong console
        setCaoNhat(products[0].quantity);
        // console.log(caonhat);
        const reviewCount = reviews.length; // Lấy số lượng reviews
        // console.log(reviewCount); // Kiểm tra số lượng reviews trong console
        setReview(reviewCount);
        // Tính tổng rating
        let totalRating = 0;
        reviews.forEach(review => {
          totalRating += review.rating;
        });

        const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0; // Tính trung bình cộng của rate
        setStar(averageRating);
        console.log(averageRating); // Kiểm tra trung bình cộng của rate trong console

        if (idSubPro !== undefined) {
          const subProduct = await onGetSubProductById(idSubPro);
          // console.log("Sub", subProduct);
          setColor(subProduct._id);
          setSelectedColor(subProduct.color);
          const imagesResponse = await onGetPicturesByIdProduct(subProduct._id);
          const images = imagesResponse.data;
          // console.log("detail", product);

          for (let i = 0; i < soluong; i++) {
            if (subProduct._id === products[i]._id) {
              setSelectedIndex(i);
              break; // Nếu chỉ cần lấy vị trí đầu tiên tìm thấy, có thể dùng break để kết thúc vòng lặp

            }
          }

          let list = [];
          for (let i = 0; i < images.length; i++) {
            list.push(images[i].url);
          }
          setListImage(list);
        }
        else {
          if (products.length > 0) {
            const productId = products[0]._id; // Giả sử bạn muốn lấy hình ảnh dựa trên _id của sản phẩm đầu tiên
            // lấy id của sub-product
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
        }

        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching sub-products: ", error);
      }
    };

    getSubProducts();

  }, []);
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

    console.log(item);
    console.log("product color", product);
    // item trả về data sub-product
    for (let i = 0; i < product.detail.length; i++) {
      if (item.id === product.detail[i].id) {
        setSelectedIndex(i);
        setProductDetail(product.detail[i]);
      }
    }
    // console.log(item);
    setColor(item.id);
    setSelectedColor(item.color);
    const imagesResponse = await onGetPicturesByIdProduct(item.id);
    const images = imagesResponse.data;

    let list = [];
    for (let i = 0; i < images.length; i++) {
      list.push(images[i].url);
    }
    setListImage(list);
  };

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
            <TouchableOpacity onPress={() => handleCountMinus()} >
              <Image style={styles.button} source={require('../../../../assets/images/btn_minus.png')} />

            </TouchableOpacity>
            {/* So luong san pham */}
            <View>
              <TouchableOpacity onPress={openDialog} style={{ paddingHorizontal: 30, }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{quantity}</Text>
              </TouchableOpacity>
              <QuantityDialog
                visible={isDialogVisible}
                onClose={closeDialog}
                onConfirm={handleConfirm}
              />
            </View>
            <TouchableOpacity onPress={() => handleCountPlus()}>
              <Image style={styles.button} source={require('../../../../assets/images/btn_plus.png')} />

            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, }}>
          <Image style={styles.button} source={require('../../../../assets/images/star.png')} />
          {/* Star */}
          <Text style={{ marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "black" }}>{star ?? 0}</Text>
          {/* So luong reviews */}
          <TouchableOpacity onPress={() => navigation.navigate('ListReview', { idProduct: id })}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>({review} Reviews)</Text>
          </TouchableOpacity>
          <View style={{ marginLeft: 50, }}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>In Stock: {productDetail?.inStock}</Text>
          </View>
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
        <TouchableOpacity onPress={() => addToFavorite()} style={styles.button1}>
          <Image style={{ width: 24, height: 24, }}
            source={like? require('../../../../assets/images/ic_fvr1.png') : require('../../../../assets/images/ic_fvr.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart()} style={styles.button2}>
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
