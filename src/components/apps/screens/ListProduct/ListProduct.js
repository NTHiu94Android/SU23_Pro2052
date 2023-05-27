import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import back from '../../../back/back';

const ListProduct = (props) => {
  const { navigation } = props;
  back(navigation);
  const brand = [
    { image: "https://static.vecteezy.com/system/resources/previews/020/927/329/original/lenovo-logo-brand-phone-symbol-name-black-design-china-mobile-illustration-with-red-background-free-vector.jpg" },
    { image: "https://logoeps.com/wp-content/uploads/2011/08/asus-logo-vector.png" },
    { image: "data:image/png;base64,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" },
    { image: "https://cdn.dribbble.com/users/3144264/screenshots/16080159/media/76c03dd932c1e3f797c3fb5869826de9.png?compress=1&resize=400x300&vertical=top" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png" },
    { image: "https://maychucmc.vn/wp-content/uploads/2016/11/Samsung-Logo.png" },
    { image: "https://phukienbaominh.com/wp-content/uploads/2019/04/Oppo-Logo-Vector-photo.jpg" },

  ];
  const product = [
    {
      sale: 10,
      name: "Macbook Pro 2022",
      image: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg",
      price: 2000
    },
    {
      sale: 10,
      name: "Macbook Pro 2023",
      image: "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/11/12/637408006342832761_mbp-2020-m1-silver-1.png",
      price: 2000
    },
    {
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
        <Text style={styles.text}>Smart phone</Text>
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
          data={product}
          keyExtractor={(item) => item.id}
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
                <Text style={{ color: "black", fontSize: 16, textDecorationLine: 'line-through' }}>${item.price} </Text>
                <Text style={{ color: "red", fontSize: 16 }}>${item.price - item.price * (item.sale / 100)}</Text>
              </View>
              <TouchableOpacity style={{ width: 35, height: 35, position: 'absolute', right: 13, bottom: 90 }}>
              <Image
                style={{ width: 35, height: 35}}
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