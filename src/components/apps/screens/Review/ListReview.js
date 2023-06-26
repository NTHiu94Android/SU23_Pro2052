import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import { useRoute } from '@react-navigation/native';

const ListReview = (props) => {
  const { navigation } = props;
  const route = useRoute();
  // const { idProduct } = route.params;
  const idProduct = route.params?.idProduct;

  console.log(route);
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

        }

        setIsLoading(true);
      } catch (error) {
        console.log("Error fetching sub-products: ", error);
      }
    };

    getSubProducts();

  }, []);
  console.log(listReview);

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

  // hiện thị review theo số sao
  const showReviewsForStar = (rating) => {
    // Filter the listReview based on the selected star rating
    const filtered = listReview.filter((review) => review.rating === rating);
    setFilteredReviews(filtered);
  };

  // hiển thị tất cả review
  const toggleShowAllReviews = () => {
    setShowAllReviews
    setShowAllReviews(!showAllReviews);
  };

  return (
    <View style={styleReview.container}>
      <View style={styleReview.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { idProduct: route.params.idProduct })}>
            <Image
              style={styleReview.icBack}
              source={require('../../../../assets/images/back.png')}
              resizeMode='cover'
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styleReview.DetailTxt}>Rating & Review</Text>
      </View>

      <View style={styleReview.body}>
        <View style={styleReview.header}>
          <View>
            <Image
              style={styleReview.icImg}
              source={{ uri: listImage[0] }}
            ></Image>
          </View>
          <View style={styleReview.txtheader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.name}</Text>
            <View style={styleReview.Star}>
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star.png')}
              ></Image>
              <Text style={styleReview.txtStar}>{star}</Text>
            </View>
            <Text>{review} Reviews</Text>
          </View>

        </View>

        <View style={styleReview.viewSeeStart}>
          <View>
            <TouchableOpacity
              onPress={toggleShowAllReviews}>
              <Image
                style={styleReview.icSeeAll}
                source={require('../../../../assets/images/all.png')}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={styleReview.viewStart}>
            <TouchableOpacity
              onPress={() => showReviewsForStar(1)}
            >
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star2.png')}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showReviewsForStar(2)}
            >
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star2.png')}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showReviewsForStar(3)}
            >
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star2.png')}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showReviewsForStar(4)}
            >
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star2.png')}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => showReviewsForStar(5)}
            >
              <Image
                style={styleReview.icStar}
                source={require('../../../../assets/images/star2.png')}
              ></Image>
            </TouchableOpacity>

          </View>

        </View>

        <View style={styleReview.AllReview}>
          <FlatList
            data={showAllReviews ? listReview : filteredReviews}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Item
                userId={item.idUser}
                content={item.content}
                time={item.time}
                rate={item.rating}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>

      </View>
      {/* WRITE A REVIEW */}
      <View style={styleReview.btn}>
        <TouchableOpacity>
          <Text style={styleReview.btnText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}
export default ListReview

const Item = ({ userId, content, time, rate }) => {
  const [userName, setUserName] = useState();
  const [userAva, setUserAva] = useState();
  const { onGetUserById, user } = useContext(UserContext);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const user = await onGetUserById(userId);
        const userName = user.name;
        const userAva = user.avatar;
        setUserName(userName);
        setUserAva(userAva);
      } catch (error) {
        console.log('Error getting user name:', error);
      }
    };
    getUserName();
  }, [userId]);
  return (
    <View style={styleReview.BoxReview}>
      <View style={{}}>
        <Image
          style={styleReview.icImg}
          source={userAva ? { uri: userAva } : require('../../../../assets/images/avataruser.png')}
        />
        <View style={styleReview.RName}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{userName}</Text>
          <Text>{time}</Text>
        </View>
        <View style={styleReview.RatingStar}>
          <Image
            style={styleReview.icStar01}
            source={require('../../../../assets/images/star.png')}
          />
          <Text>  {rate}</Text>
        </View>

        <View style={styleReview.comment}>
          <Text>{content}</Text>
        </View>
      </View>
    </View>

  );
};


const styleReview = StyleSheet.create({
  // container
  container: {
    display: 'flex',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,


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
    width: 70,
    height: 70,
    borderRadius: 10,
    alignSelf: 'center',
  },

  txtheader: {
    width: '70%',

  },

  //Star Point
  viewStart: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  viewSeeStart: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,

  },
  Star: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icStar: {
    width: 24,
    height: 24,
    marginHorizontal: 5
  },
  icSeeAll: {
    width: 36,
    height: 36
  },

  txtStar: {
    fontSize: 20,
    paddingLeft: 10
  },

  //Review
  BoxReview: {
    width: '90%',
    height: 100,
    marginLeft: 20,
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 35,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    justifyContent: 'center'

  },

  icAva: {
    width: 50,
    height: 50,
    bottom: 40,
    marginLeft: 130
  },

  RName: {
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  RatingStar: {
    bottom: 25,
    flexDirection: 'row'
  },

  icStar01: {
    width: 20,
    height: 20
  },

  //Comment
  comment: {
    bottom: 15,
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
    marginBottom: 20,
  },

  btnText: {
    color: 'white',
    fontSize: 20
  },
})

