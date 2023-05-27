import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const OrderDetail = (props) => {
  const { navigation } = props;

  const handleBackPress = () => {
    navigation.navigate('Order');
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
        <Text style={[styles.text3, { color: '#303030' }]}>Order detail</Text>
        {/* View trống dùng để căn giữa chữ setting */}
        <View></View>
      </View>

      <View style={{ height: 172, justifyContent: 'space-between', marginTop: 25 }}>
        <View style={[styles.functionBox, { borderTopRightRadius: 8, height: 47 }]}>
          <Text style={[styles.text1, { color: '#242424' }]}>Order No238562312</Text>
          <Text style={[styles.text2, { color: '#808080' }]}>20/03/2020</Text>
        </View>
        <View style={{ backgroundColor: '#F0F0F0', height: 1, width: '100%' }}></View>
        <View style={[styles.functionBox, { flexDirection: 'column', alignItems: 'flex-start', borderBottomRightRadius: 8, paddingBottom:13 }]}>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Total: </Text>
            <Text style={[styles.text1, { color: '#303030', flex:1 }]}>$150</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Payments: </Text>
            <Text style={[styles.text1, { color: '#242424', flex:1 }]}>Cash</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Status: </Text>
            <Text style={[styles.text1, { color: '#27AE60', flex:1 }]}>Success</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 172, justifyContent: 'space-between', marginTop: 25 }}>
        <View style={[styles.functionBox, { borderTopRightRadius: 8, height: 47 }]}>
          <Text style={[styles.text1, { color: '#242424' }]}>Customer Information</Text>
        </View>
        <View style={{ backgroundColor: '#F0F0F0', height: 1, width: '100%' }}></View>
        <View style={[styles.functionBox, { flexDirection: 'column', alignItems: 'flex-start', borderBottomRightRadius: 8, paddingBottom:13 }]}>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Name: </Text>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Phạm Quốc Tín</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Phone number: </Text>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>113</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop:15 }}>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>Address: </Text>
            <Text style={[styles.text1, { color: '#808080', flex:1 }]}>FPT</Text>
          </View>
        </View>
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
  functionBox: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  text1: {
    fontWeight: '600',
    fontSize: 16,
  },
  text2: {
    fontWeight: '400',
    fontSize: 14,
  },
  text3: {
    fontWeight: '700',
    fontSize: 16,
  },
  detailButton: {
    width: 100,
    height: 36,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
})