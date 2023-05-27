import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CheckOut = (props) => {

  const { navigation } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 10, padding: 5, flex: 1 }}>
        {/* Bấm đây nhảy qua cart () */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ width: 10, height: 10 }} >
            <Image source={require('../../../../assets/images/back2.png')} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Check out</Text>
        </View>
        <ScrollView>
          {/* Address */}
          <View style={{ justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>Shipping Address</Text>
              <Image source={require('../../../../assets/images/edit-2.png')} style={{ width: 28, height: 28 }} />
            </View>
            <View style={[styles.box, { backgroundColor: '#fff', borderRadius: 8, paddingVertical: 10 }]}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: 'grey', padding: 10 }}>Bruno Fernandes</Text>
              <Text style={{ fontSize: 14, lineHeight: 25, padding: 10 }}>Tp.Hồ Chí Minh</Text>
            </View>
          </View>

          {/* Delivery method */}
          <View style={{ justifyContent: 'space-between', marginTop: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>Delivery method</Text>
              <Image source={require('../../../../assets/images/edit-2.png')} style={{ width: 28 }} />
            </View>
            <View style={[styles.box, { borderRadius: 8, paddingVertical: 10, flexDirection: 'row' }]}>
              <Image source={{ uri: 'https://theme.hstatic.net/200000472237/1000829412/14/logo.png?v=584' }}
                style={{ height: 20, width: 90, margin: 10 }} />
              <Text style={{ margin: 10, fontSize: 14, fontWeight: 'bold' }}>Fast (2-3 days)</Text>
            </View>
          </View>

          {/* Total price */}
          <View style={[styles.box, { padding: 10, borderRadius: 8, height: 125, justifyContent: 'space-between', marginTop: 30, marginBottom: 30 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Order:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>$95.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Delivery:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>$5.00</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Total:</Text>
              <Text style={{ fontSize: 18, fontWeight: '300' }}>$100.00</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Submit */}
      <View style={{ backgroundColor: 'black', margin: 10, borderRadius: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Success")} style={{ backgroundColor: '#000', height: 60, borderRadius: 8, justifyContent: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>SUBMIT ORDER</Text>
          {/* Bấm đây nhảy qua success */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'grey',
    borderRadius: 4,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  }
})
