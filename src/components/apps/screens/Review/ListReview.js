import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext';
import { UserContext } from '../../../users/UserContext';
import back from '../../../back/back';
import { useRoute } from '@react-navigation/native';

const ListReview = (props) => {
  const { navigation } = props;
  const route = useRoute();
  const [star, setStar] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [listReview, setListReview] = useState([]);
  const { onGetPicturesByIdProduct, onGetSubProductsByIdProduct, onGetReviewsByIdProduct,
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

  return (
    <View style={styleReview.container}>
      <View style={styleReview.header}>
        <View>
          <TouchableOpacity  onPress={() => navigation.navigate("ProductDetail")}>
            <Image
              style={styleReview.icBack}
              source={require('../../../../assets/images/back.png')}
              resizeMode='cover'
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styleReview.DetailTxt}>Rating & Review</Text>
      </View>

      <ScrollView showsVertic alScrollIndicator={false}>
        <View style={styleReview.body}>
          <View style={styleReview.header}>
            <View>
              <Image
                style={styleReview.icImg}
                source={{ uri: listImage[0] }}
              ></Image>
            </View>
            <View style={styleReview.txtheader}>
              {/* <Text>SamSung S23 Utral</Text> */}
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

          <View style={styleReview.AllReview}>
            <FlatList
              data={listReview}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Item
                  // name={item.idUser}
                  // content={item.content}
                  // time={item.time}
                  // rate={item.rating}
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
      </ScrollView>
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
  const { onGetUserById, user } = useContext(UserContext);
  // const getUserName = async (idUser) => {
  //   try {
  //     const userResponse = await onGetUserById(idUser);
  //     const usedatar = userResponse;
  //     setUserName(usedatar.name);
  //     console.log(userName);
  //     return userName;
  //   } catch (error) {
  //     console.log('Error user:', error);
  //   }
  // };
  // console.log(name);
  // const id = getUserName(name);
  // console.log(id);
  useEffect(() => {
    const getUserName = async () => {
      try {
        const user = await onGetUserById(userId);
        const userName = user.name;
        setUserName(userName);
      } catch (error) {
        console.log('Error getting user name:', error);
      }
    };
    getUserName();
  }, [userId]);
  return (
    <View style={styleReview.BoxReview}>
      <Image
        style={styleReview.icImg}
        source={require('../../../../assets/images/avataruser.png')}
      />
      <View style={styleReview.RName}>
        <Text>{userName}</Text>
        <Text>{time}</Text>
      </View>
      <View style={styleReview.RatingStar}>
        <Image
          style={styleReview.icStar01}
          source={require('../../../../assets/images/star.png')}
        />
        <Text>{rate}</Text>
      </View>

      <View style={styleReview.comment}>
        <Text>{content}</Text>
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
    height: '100%'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
    width: 70,
    height: 70,
    borderRadius: 10,
    alignSelf:'center',
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
    width: 30,
    height: 30
  },

  txtStar: {
    fontSize: 20,
    paddingLeft: 10
  },

  //Review
  BoxReview: {
    width: '90%',
    height: 160,
    marginLeft: 20,
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    borderRadius: 8,
  },

  btnText: {
    color: 'white',
    fontSize: 20
  },
})

