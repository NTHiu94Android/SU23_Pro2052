import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Delivered = () => {
  const data = [
    { id: 'Order No238562311', time: '20/03/2020', quantity: '03', totalAmount: '$150', status:'Delivered' },
    { id: 'Order No238562312', time: '20/03/2020', quantity: '03', totalAmount: '$150', status:'Delivered' },
    { id: 'Order No238562313', time: '20/03/2020', quantity: '03', totalAmount: '$150', status:'Delivered' },
    { id: 'Order No238562314', time: '20/03/2020', quantity: '03', totalAmount: '$150', status:'Delivered' },
  ];
  const renderItem = ({ item }) => (
    <View style={{ height: 172, justifyContent: 'space-between', marginTop: 25 }}>
      <View style={[styles.functionBox, { borderTopRightRadius: 8, height: 47 }]}>
        <Text style={[styles.text1, { color: '#242424' }]}>{item.id}</Text>
        <Text style={[styles.text2, { color: '#808080' }]}>{item.time}</Text>
      </View>
      <View style={{ backgroundColor: '#F0F0F0', height: 1, width: '100%' }}></View>
      <View style={[styles.functionBox, { flexDirection: 'column', alignItems: 'flex-start', borderBottomRightRadius: 8 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.text1, { color: '#808080' }]}>Quantity: </Text>
            <Text style={[styles.text3, { color: '#303030' }]}>{item.quantity}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.text1, { color: '#808080' }]}>Total Amount: </Text>
            <Text style={[styles.text3, { color: '#242424' }]}>{item.totalAmount}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', width: '100%', marginTop: 30 }}>
          <TouchableOpacity style={[styles.detailButton, { marginBottom: 20 }]}>
            <Text style={[styles.text1, { color: '#fff' }]}>Detail</Text>
          </TouchableOpacity>
          <Text style={[styles.text1, { color: '#27AE60' }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Delivered

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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