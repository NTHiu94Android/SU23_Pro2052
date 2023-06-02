import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import React, { useContext, useState } from 'react'
import back from '../../../back/back';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../AppContext';

const ListProduct = (props) => {
  const { navigation } = props;
  const { category, products } = useRoute().params;
  console.log(JSON.stringify(products));
  back(navigation);
  const brand = [
    { image: "https://static.vecteezy.com/system/resources/previews/020/927/329/original/lenovo-logo-brand-phone-symbol-name-black-design-china-mobile-illustration-with-red-background-free-vector.jpg" },
    { image: "https://logoeps.com/wp-content/uploads/2011/08/asus-logo-vector.png" },
    { image: "https://cdn.dribbble.com/users/3144264/screenshots/16080159/media/76c03dd932c1e3f797c3fb5869826de9.png?compress=1&resize=400x300&vertical=top" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png" },
    { image: "https://maychucmc.vn/wp-content/uploads/2016/11/Samsung-Logo.png" },
    { image: "https://phukienbaominh.com/wp-content/uploads/2019/04/Oppo-Logo-Vector-photo.jpg" },

  ];
  const product = [
    {
      _id: '1',
      sale: 10,
      name: "Macbook Pro 2022",
      image: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg",
      price: 2000
    },
    {
      _id: '2',
      sale: 10,
      name: "Macbook Pro 2023",
      image: "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/11/12/637408006342832761_mbp-2020-m1-silver-1.png",
      price: 2000
    },
    {
      _id: '3',
      sale: 10,
      name: "Macbook Pro 2023",
      image: "https://cdn.tgdd.vn/Products/Images/42/213031/iphone-12-tim-1-600x600.jpg",
      price: 2000
    },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* headerbar */}
      <View style={styles.header}>
        <Image style={styles.icon}
          source={require("../../../../assets/images/ic_search.png")} />
        <Text style={styles.text}>Hoàng Long Mobile</Text>
        <Image style={styles.icon}
          source={require("../../../../assets/images/ic_ring.png")} />
      </View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        {/* Ten loai san pham  */}
        <Text style={styles.text}>{category.name}</Text>
        {/* So luong san pham cua loai san pham */}
        <Text style={styles.text}>(113)</Text>
      </View>
      {/* Danh sach cac nhan hang */}
      <View style={styles.categoryView}>
        <FlatList
          horizontal
          data={brand}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listCategory}
              onPress={() => nextScreen(item)}
            >
              <Image style={styles.image} source={{ uri: item.image }} />
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Danh sach san pham */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FlatList
          numColumns={2}
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>

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
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "black", fontSize: 16, textDecorationLine: 'line-through' }}>${item.subProduct.price} </Text>
                <Text style={{ color: "red", fontSize: 16 }}>${item.subProduct.price - item.subProduct.price * (item.subProduct.sale / 100)}</Text>
              </View>
              <TouchableOpacity style={{ width: 35, height: 35, position: 'absolute', right: 13, bottom: 90 }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  resizeMode='cover'
                  source={require('../../../../assets/images/ic_shop.png')} />
              </TouchableOpacity>

            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  )
}

export default ListProduct

const styles = StyleSheet.create({
  container: {
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
    width: 40,
    height: 40,
  },

  listCategory: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    margin: 5,
    height: 300,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    width: "47%",
    borderColor: "#EEEEEE",
    borderWidth: 2
  },
  imageproduct: {
    width: "100%",
    height: "70%",
  },
  categoryView: {
    margin: 10
  },
})