import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const OrderDetail = (props) => {
  const { navigation } = props;

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity style={{ width: 12, height: 12 }} onPress={handleBackPress}>
          <Image
            style={{ width: '100%', height: '100%', }}
            source={require('../../../../assets/images/back2.png')}
          />
        </TouchableOpacity>
        <Text style={[styles.text1, { color: '#303030' }]}>Order detail</Text>
        {/* View trống dùng để căn giữa chữ setting */}
        <View></View>
      </View>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 16,
    fontWeight: '700',
  },
})