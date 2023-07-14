import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import { useRoute } from '@react-navigation/native';
import ProgressDialog from 'react-native-progress-dialog';


const ListReview = (props) => {
  const { navigation } = props;
  const route = useRoute();
  back(navigation);

  const { onGetReviews, onGetUsers, onGetPicturesByIdReview } = useContext(AppContext);

  const [numberReview1, setNumberReview1] = useState(0);
  const [numberReview2, setNumberReview2] = useState(0);
  const [numberReview3, setNumberReview3] = useState(0);
  const [numberReview4, setNumberReview4] = useState(0);
  const [numberReview5, setNumberReview5] = useState(0);


  // const { idProduct } = route.params;
  const idProduct = route.params?.idProduct;

  // console.log(route);
  const [star, setStar] = useState([]);
  const [listImage, setListImage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [listReview, setListReview] = useState([]);


  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);


  const [productDetail, setProductDetail] = useState();
  const [listPrice, setPrice] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [product, setProduct] = useState({});
  const { onGetPicturesByIdProduct, onGetSubProductsByIdProduct, onGetReviewsByIdProduct, onGetProductById, onGetProducts, onGetSubProducts, countOrderDetail
  } = useContext(AppContext);


  let reviewsRef = useRef([]);

  useEffect(() => {
    const getReviewsByIdProduct = async () => {
      setIsLoading(true);
      const resReviews = await onGetReviews();
      const resUser = await onGetUsers();
      const listUser = resUser.data;
      const reviews = resReviews.data;
      if (!reviews || !listUser) {
        setIsLoading(false);
        return;
      }
      //Loc ra danh sach review theo san pham sau do lay user tuong ung
      const reviewsByIdProduct = reviews.filter(review => review.idProduct === productItem._id);
      reviewsRef.current = reviewsByIdProduct;
      let numberReview = 0;
      for (let i = 0; i < reviewsByIdProduct.length; i++) {
        for (let j = 0; j < listUser.length; j++) {
          if (reviewsByIdProduct[i].idUser === listUser[j]._id) {
            reviewsByIdProduct[i].user = listUser[j];
            numberReview += 1;
            break;
          }
        }
        const listPicture = await onGetPicturesByIdReview(reviewsByIdProduct[i]._id);
        reviewsByIdProduct[i].pictures = listPicture;

      }
      productItem.numberReview = numberReview;
      setListReview(reviewsByIdProduct);
      getNumberReviewByStar(reviewsByIdProduct);
      setIsLoading(false);
    };
    getReviewsByIdProduct();
  }, []);

  useEffect(() => {
    setIsLoading(false);

    const getSubProducts = async () => {
      try {
        const response = await onGetSubProductsByIdProduct(route.params.idProduct);
        const products = response.data;

        const tempReview = await onGetReviewsByIdProduct(route.params.idProduct);
        const reviews = tempReview.data;
        setListReview(reviews);
        // Kiểm tra dữ liệu reviews trong console

        const reviewCount = reviews.length; // Lấy số lượng reviews
        // console.log(reviewCount); // Kiểm tra số lượng reviews trong console
        setReview(reviewCount);
        // Tính tổng rating
        let totalRating = 0;
        reviews.forEach(review => {
          totalRating += review.rating;
        });

        const averageRating = (totalRating / reviewCount).toFixed(1); // Tính trung bình cộng của rate
        setStar(averageRating);
        // console.log(averageRating); // Kiểm tra trung bình cộng của rate trong console

        if (products.length > 0) {
          const productId = products[0]._id; // Giả sử bạn muốn lấy hình ảnh dựa trên _id của sản phẩm đầu tiên
          const imagesResponse = await onGetPicturesByIdProduct(productId);
          const images = imagesResponse.data;

          let list = [];
          for (let i = 0; i < images.length; i++) {
            list.push(images[i].url);
          }
          setListImage(list);

        }

        setIsLoading(true);
      } catch (error) {
        // console.log("Error fetching sub-products: ", error);
      }
    };

    getSubProducts();

  }, []);
  // console.log(listReview);

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
        // console.log("Error home screen: ", error);
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
      // console.log('onGetSubProductsByIdProduct error: ', error);
    }
  };

  // hiện thị review theo số sao
  const showReviewsForStar = (star) => {
    let list = [];
    if (star === 1) {
      setShowAllReviews(true);
      list = reviewsRef.current.filter(review => review.rating === 1);
    }
    if (star === 2) {
      setShowAllReviews(true);
      list = reviewsRef.current.filter(review => review.rating === 2);
    }
    if (star === 3) {
      setShowAllReviews(true);
      list = reviewsRef.current.filter(review => review.rating === 3);
    }
    if (star === 4) {
      setShowAllReviews(true);
      list = reviewsRef.current.filter(review => review.rating === 4);
    }
    if (star === 5) {
      setShowAllReviews(true);
      list = reviewsRef.current.filter(review => review.rating === 5);
    }
    setListReview(list);
  };

  // hiển thị tất cả review
  const toggleShowAllReviews = () => {
    setShowAllReviews(true);
  };

  useEffect(() => {
    toggleShowAllReviews()
  }, [])

  const getNumberReviewByStar = (listReview) => {
    let numberReview1 = 0;
    let numberReview2 = 0;
    let numberReview3 = 0;
    let numberReview4 = 0;
    let numberReview5 = 0;
    for (let i = 0; i < listReview.length; i++) {
      if (listReview[i].rating === 1) {
        numberReview1 += 1;
      }
      if (listReview[i].rating === 2) {
        numberReview2 += 1;
      }
      if (listReview[i].rating === 3) {
        numberReview3 += 1;
      }
      if (listReview[i].rating === 4) {
        numberReview4 += 1;
      }
      if (listReview[i].rating === 5) {
        numberReview5 += 1;
      }
    }

    setNumberReview1(numberReview1);
    setNumberReview2(numberReview2);
    setNumberReview3(numberReview3);
    setNumberReview4(numberReview4);
    setNumberReview5(numberReview5);

  }

  return (
    <View style={styleReview.container}>

      <ProgressDialog
        visible={isLoading}
        loaderColor='black'
        lable="Please wait..." />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require('../../../../assets/images/back.png')}
            resizeMode='cover'
          ></Image>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Rating & review</Text>
        </View>

        <View style={{ width: 22, height: 22 }} />
      </View>



      {/* header */}
      <ScrollView showsVertic alScrollIndicator={false}>
        <View style={styleReview.body}>
          <View style={styleReview.header}>
            <View>
              <Image
                style={styleReview.icImg}
                source={{ uri: listImage[1] }}
              />
            </View>

            <View style={styleReview.txtheader}>
              <Text
                numberOfLines={1}
                maxWidth={180}
                style={{ fontWeight: '800', fontSize: 18, color: 'black', marginBottom: 2 }}>
                {product.name}
              </Text>
              {/* onPress={toggleShowAllReviews}> */}

              <TouchableOpacity onPress={toggleShowAllReviews}>
                <View style={[styleReview.Star, { marginBottom: 2 }]}>
                  <Image
                    style={styleReview.icStar}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>{star} / {review} Reviews</Text>
                </View>
              </TouchableOpacity>


              {/* 5 sao */}
              <TouchableOpacity onPress={() => showReviewsForStar(5)}>
                <View style={[styleReview.Star]}>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>({numberReview5})</Text>
                </View>
              </TouchableOpacity>

              {/* 4 sao */}
              <TouchableOpacity onPress={() => showReviewsForStar(4)}>
                <View style={[styleReview.Star]}>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>({numberReview4})</Text>
                </View>
              </TouchableOpacity>

              {/* 3 sao */}
              <TouchableOpacity onPress={() => showReviewsForStar(3)}>
                <View style={[styleReview.Star]}>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>({numberReview3})</Text>
                </View>
              </TouchableOpacity>

              {/* 2 sao */}
              <TouchableOpacity onPress={() => showReviewsForStar(2)}>
                <View style={[styleReview.Star]}>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>({numberReview2})</Text>
                </View>
              </TouchableOpacity>

              {/* 1 sao */}
              <TouchableOpacity onPress={() => showReviewsForStar(1)}>
                <View style={[styleReview.Star]}>
                  <Image
                    style={styleReview.icStar2}
                    source={require('../../../../assets/images/star.png')}
                  ></Image>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>({numberReview1})</Text>
                </View>
              </TouchableOpacity>

            </View>


          </View>



          <View style={{ marginTop: 12 }}>
            {
              listReview.map((review, index) => {
                return (
                  <Item review={review} key={index} />
                )
              })
            }
          </View>

        </View>

      </ScrollView>



    </View>

  )
}
export default ListReview





const styleReview = StyleSheet.create({
  // container
  container: {
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  icBack: {
    width: 20,
    height: 20,
  },

  DetailTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%'
  },

  //body
  body: {
    height: '100%',
    width: '100%'
  },

  icImg: {
    width: 150,
    height: 150,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },

  txtheader: {
    width: '70%'
  },

  //Star Point
  Star: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icStar: {
    width: 18,
    height: 18
  },

  icStar2: {
    width: 12,
    height: 12
  },

  txtStar: {
    fontSize: 20,
    paddingLeft: 10
  },

  //Review
  BoxReview: {
    width: '90%',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 5,
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    justifyContent: 'center',
    position: 'relative'
  },

  icAva: {
    width: 50,
    height: 50,
    top: -25,
    left: '50%',
    borderRadius: 50, position: 'absolute',
  },

  RName: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  RatingStar: {
    flexDirection: 'row'
  },

  icStar01: {
    width: 20,
    height: 20
  },

  //Button
  btn: {
    backgroundColor: 'black',
    width: '90%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 30,
  },

  btnText: {
    color: 'white',
    fontSize: 20,
  },
});


const Item = ({ review }) => {

  const [userName, setUserName] = useState();
  const [userAva, setUserAva] = useState();
  const [imgReview, setPictureReview] = useState([]);
  const { onGetUserById, user } = useContext(UserContext);
  const { onGetPicturesByIdReview, picture } = useContext(AppContext);
  const [listImage, setListImage] = useState([]);
  useEffect(() => {
    const getUserName = async () => {
      try {
        const user = await onGetUserById(review.idUser);
        const userName = user.name;
        const userAva = user.avatar;
        setUserName(userName);
        setUserAva(userAva);
      } catch (error) {
        // console.log('Error getting user name:', error);
      }
    };
    getUserName();
  }, [review.idUser]);

  useEffect(() => {
    const getPictureReview = async () => {
      try {
        const picture = await onGetPicturesByIdReview(review);
        const imgReview = picture;
        console.log('imgreview:', imgReview);
        setPictureReview(imgReview);
      } catch (error) {
        console.log('Error getting picture review:', error);
      }
    };
  
    getPictureReview();
  }, [review.idReview]);

  return (
    <View style={styleReview.BoxReview}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontWeight: '800', fontSize: 16, color: 'black' }}>{userName}</Text>
        <Text style={{ fontWeight: '600', fontSize: 16, color: 'black' }}>{review.time}</Text>
      </View>
      {
        review.rating === 1 &&
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
        </View>
      }
      {
        review.rating === 2 &&
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
        </View>
      }
      {
        review.rating === 3 &&
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
        </View>
      }
      {
        review.rating === 4 &&
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
        </View>
      }
      {
        review.rating === 5 &&
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
        </View>
      }

      <View style={{ flexDirection: 'row', maxWidth: '90%', marginTop: 8 }}>
      

        
      {imgReview !== null && imgReview.length > 0 ? (
  imgReview.map((url, index) => (
    <Image
      key={index}
      style={{ width: 100, height: 100, borderRadius: 10, marginRight: 5, marginVertical: 5 }}
      source={{ uri: url }}
    />
  ))
) : (
  <Image style={{ display: 'none' }} />
)}


          

       
      </View>



      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 14, }}>{review.content}</Text>
      </View>


      <Image
        style={styleReview.icAva}
        source={userAva ? { uri: userAva } : require('../../../../assets/images/avataruser.png')}
      />
    </View>
  )
}

