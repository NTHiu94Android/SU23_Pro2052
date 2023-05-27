import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import back from '../../../back/back';

const ProductDetail = (props) => {
  const { navigation } = props;
  back(navigation);
  // hinh anh banner 
  const data = [
    { image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg' },
    { image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg' },
    { image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg' },
    { image: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg' },
  ];

  const mau = [
    { id: '1', color: 'red' },
    { id: '2', color: 'blue' },
    { id: '3', color: 'green' },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        {/* slideImage */}
        <View style={{ flex: 1 }}>
          {/* <Swiper
            style={{ height: 280 }}
            autoplayTimeout={3}
            autoplay={true}
            loop={true}
            showsPagination={true}>
            {data.map((image, index) => {
              return (
                <Image
                  key={index}
                  style={{ width: '100%', height: 280 }}
                  resizeMode='stretch'
                  source={{
                    uri: image,
                  }} />
              )
            })}
          </Swiper> */}
          <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image style={styles.icon} source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.colorProduct}>
          {/* Color product */}
          <FlatList
            horizontal
            data={mau}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ backgroundColor: item.color, width: 30, height: 30, margin: 3, borderRadius:10}}
                onPress={() => nextScreen(item)}
              >
              </TouchableOpacity>
            )}
          />

        </View>
        {/* Name product */}
        <Text style={styles.nameProduct}>SAMSUNG S20 256GB</Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            {/* Price product */}
            <Text style={styles.pricProduct}>18.00$</Text>
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
          <Text style={{ marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "black" }}>4.5</Text>
          {/* So luong reviews */}
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold", }}>(321 reviews)</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginTop: 10 }}>Desciption</Text>
        {/* Mo ta san pham */}
        <View style={{ flex: 0.8, }}>
          <Text>
            Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home. Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button1}>
          <Image style={{ width: 24, height: 24 }}
            source={require('../../../../assets/images/ic_fvr.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addOrderDatail(count, 'Cart')} style={styles.button2}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              Add to cart</Text>
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
    justifyContent:"space-between"

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