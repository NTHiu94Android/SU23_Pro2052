import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Swiper from 'react-native-swiper';
import React, { useContext, useEffect, useState } from 'react';
import back from '../../../back/back';
import { AppContext } from '../../AppContext';

const Home = (props) => {
  const { navigation } = props;
  const { categories, fullProducts, onGetProductsByCategory } = useContext(AppContext);
  const [productsByCategory, setProductsByCategory] = useState([]);
  
  // hinh anh banner 
  const data = [
    { image: 'https://hoangphucstore.com/assets/uploads/images/F1NRG392ni19_banner-trang-chu%CC%89.jpg' },
    { image: 'https://www.xtmobile.vn/vnt_upload/news/08_2019/ttip11-15-4.jpg' },
    { image: 'https://bachlongmobile.com/bnews/wp-content/uploads/2020/12/12-01-min.png' },
    { image: 'https://bachlongmobile.com/bnews/wp-content/uploads/2020/11/bh-952x500-min-1_1604280722.png' },
  ];

  const nextScreen = (_category, _categoryId) => {
    const _products = onGetProductsByCategory(_categoryId);
    setProductsByCategory(_products);
    navigation.navigate('ListProduct', { category: _category, products: _products });
  };

  return (
    <ScrollView style={styles.contaier}>
      {/* headerbar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Image style={styles.icon}
            source={require("../../../../assets/images/ic_search.png")} />
        </TouchableOpacity>
        <Text style={styles.text}>Hoàng Long Mobile</Text>
        <Image style={styles.icon}
          source={require("../../../../assets/images/ic_ring.png")} />
      </View>

      {/* -------------------------------------------------------- */}
      {/* slideImage */}
      <View style={{ width: "100%", height: 160, justifyContent: 'center', alignItems: 'center' }}>
        <Swiper
          style={{ height: 150 }}
          autoplayTimeout={5}
          autoplay={true}
          loop={true}
          showsPagination={false}
        >
          <Image
            style={{ width: '100%', height: 150 }}
            resizeMode='stretch'
            source={{ uri: data[0].image }} />
          <Image
            style={{ width: '100%', height: 150 }}
            resizeMode='stretch'
            source={{ uri: data[1].image }} />
          <Image
            style={{ width: '100%', height: 150 }}
            resizeMode='stretch'
            source={{ uri: data[2].image }} />
          <Image
            style={{ width: '100%', height: 150 }}
            resizeMode='stretch'
            source={{ uri: data[3].image }} />
        </Swiper>
      </View>

      {/* ---------------------------------------- */}
      {/* danh sách loại sản phẩm  */}
      <View style={styles.categoryView}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listCategory}
              onPress={() => nextScreen(item, item._id)}
            >
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Banner  */}
      <Image
        style={{ width: '100%', height: 70, marginTop: 16 }}
        resizeMode='cover'
        source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/1/638184972894739287_F-H5_1200x200.png' }} />
      {/* Hotpromotion  */}
      <View style={{ flexDirection: "row", margin: 10, alignItems: "center" }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require("../../../../assets/images/ic_fire.png")} />
        <Text style={{ color: "red", fontSize: 21, fontWeight: "bold" }}>HOT PROMOTION</Text>
      </View >
      {/* Danh sách sản phẩm Hot promotion */}
      <View>
        <FlatList
          horizontal
          data={fullProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ProductDetail', { productItem: item })} >
              <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "red", width: 210, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text style={{ color: "white", fontSize: 16 }}>SALE </Text>
                <Text style={{ color: "yellow", fontSize: 16 }}>Siêu đậm</Text>
              </View>
              {/* Image product */}
              <Image style={styles.imageproduct} source={{ uri: item.image }} />
              {/* name product */}
              <Text style={{ color: "black", fontSize: 16, marginLeft: 5, marginTop: 10 }}>{item.name}</Text>
              {/* star */}
              <View style={{ flexDirection: "row", margin: 5 }}>
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
              </View>
              {/* Price product */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, margin: 5 }}>
                <Text style={{ color: "black", fontSize: 16, textDecorationLine: 'line-through' }}>${item.subProduct.price} </Text>
                <Text style={{ color: "red", fontSize: 16 }}>${item.subProduct.price - item.subProduct.price * (item.subProduct.sale / 100)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* banner */}
      <Image
        style={{ width: '100%', height: 70, marginTop: 16 }}
        resizeMode='cover'
        source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/1/638184972894739287_F-H5_1200x200.png' }} />
      {/* Featured phone */}
      <View style={{ flexDirection: "row", margin: 10, alignItems: "center" }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require("../../../../assets/images/ic_fire.png")} />
        <Text style={{ color: "red", fontSize: 21, fontWeight: "bold" }}>FEATURED PHONE</Text>
      </View >
      {/* Danh sách sản phẩm Freatured phone*/}
      <View>
        <FlatList
          horizontal
          data={fullProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ProductDetail', { productItem: item })} >
              <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "red", width: 210, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text style={{ color: "white", fontSize: 16 }}>SALE </Text>
                <Text style={{ color: "yellow", fontSize: 16 }}>Siêu đậm</Text>
              </View>
              {/* Image product */}
              <Image style={styles.imageproduct} source={{ uri: item.image }} />
              {/* Name */}
              <Text style={{ color: "black", fontSize: 16, marginLeft: 5, marginTop: 10 }}>{item.name}</Text>

              {/* Star */}
              <View style={{ flexDirection: "row", margin: 5 }}>
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
              </View>
              {/* Price product */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, margin: 5 }}>
                <Text style={{ color: "black", fontSize: 16, textDecorationLine: 'line-through' }}>${item.subProduct.price} </Text>
                <Text style={{ color: "red", fontSize: 16 }}>${item.subProduct.price - item.subProduct.price * (item.subProduct.sale / 100)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* BAnner */}
      <Image
        style={{ width: '100%', height: 70, marginTop: 16 }}
        resizeMode='cover'
        source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/1/638184972894739287_F-H5_1200x200.png' }} />
      {/* BEST SELLING LAPTOP */}
      <View style={{ flexDirection: "row", margin: 10, alignItems: "center" }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require("../../../../assets/images/ic_fire.png")} />
        <Text style={{ color: "red", fontSize: 21, fontWeight: "bold" }}>BEST SELLING LAPTOP</Text>
      </View >
      {/* Danh sách sản phẩm best selling laptop */}
      <View>
        <FlatList
          horizontal
          data={fullProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ProductDetail', { productItem: item })} >
              <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "red", width: 210, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text style={{ color: "white", fontSize: 16 }}>SALE </Text>
                <Text style={{ color: "yellow", fontSize: 16 }}>Siêu đậm</Text>
              </View>
              {/* Image product */}
              <Image style={styles.imageproduct} source={{ uri: item.image }} />
              {/* Name product */}
              <Text style={{ color: "black", fontSize: 16, marginLeft: 5, marginTop: 10 }}>{item.name}</Text>
              {/* Star */}
              <View style={{ flexDirection: "row", margin: 5 }}>
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
                <Image style={styles.icon} source={require("../../../../assets/images/star.png")} />
              </View>
              {/* Price product */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, margin: 5 }}>
                <Text style={{ color: "black", fontSize: 16, textDecorationLine: 'line-through' }}>${item.subProduct.price} </Text>
                <Text style={{ color: "red", fontSize: 16 }}>${item.subProduct.price - item.subProduct.price * (item.subProduct.sale / 100)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.05,
    padding: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },

  image: {
    width: 60,
    height: 60,
  },
  hotpromotionView: {
    width: "100%",
    padding: 10
  },
  listCategory: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    height: 300,
    marginRight: 5,
    backgroundColor: "#EEEEEE",
    borderRadius: 20
  },
  imageproduct: {
    width: "99%",
    height: "60%",
  },
})