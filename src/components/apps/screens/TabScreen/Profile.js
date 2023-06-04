import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../../users/UserContext';

const Profile = (props) => {
  const { navigation } = props;
  const {user} = useContext(UserContext);
  const handleSettingPress = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileTextBox}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#303030', }}>Profile</Text>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.infoBox}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: '100%', height: '100%', }}
            source={user.avatar ? { uri: user.avatar } : require('../../../../assets/images/avataruser.png')}
            />
        </View>
        <View style={{ marginStart: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 5, color: '#303030' }}>{user.name}</Text>
          <Text style={{ fontWeight: '400', fontSize: 14, color: '#808080' }}>{user.email}</Text>
        </View>
      </View>

      {/* Chức năng con */}
      <View style={{ flex: 1, marginTop: 30 }}>

        {/* Xem danh sách đơn hàng */}
        <TouchableOpacity onPress={() => navigation.navigate('Order')} style={styles.functionBox}>
          <View>
            <Text style={styles.functionName}>My orders</Text>
            <Text style={styles.functionDescription}>Already have 10 orders</Text>
          </View>
          <View style={styles.functionTouchIcon}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/next2.png')}
            />
          </View>
        </TouchableOpacity>

        {/* Xem danh sách địa chỉ nhận hàng */}
        <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')} style={styles.functionBox}>
          <View>
            <Text style={styles.functionName}>Shipping Addresses</Text>
            <Text style={styles.functionDescription}>03 Addresses</Text>
          </View>
          <View style={styles.functionTouchIcon}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/next2.png')}
            />
          </View>
        </TouchableOpacity>

        {/* Xem các phương thức thanh toán */}
        <TouchableOpacity style={styles.functionBox}>
          <View>
            <Text style={styles.functionName}>Payment Method</Text>
            <Text style={styles.functionDescription}>You have 2 cards</Text>
          </View>
          <View style={styles.functionTouchIcon}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/next2.png')}
            />
          </View>
        </TouchableOpacity>

        {/* Xem danh sách sản phẩm đã bình luận */}
        <TouchableOpacity onPress={() => navigation.navigate('ListReview')} style={styles.functionBox}>
          <View>
            <Text style={styles.functionName}>My reviews</Text>
            <Text style={styles.functionDescription}>Reviews for 5 items</Text>
          </View>
          <View style={styles.functionTouchIcon}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/next2.png')}
            />
          </View>
        </TouchableOpacity>

        {/* Đến trang thiết lập */}
        <TouchableOpacity style={styles.functionBox} onPress={handleSettingPress}>
          <View>
            <Text style={styles.functionName}>Setting</Text>
            <Text style={styles.functionDescription}>Notification, Password, FAQ, Contact</Text>
          </View>
          <View style={styles.functionTouchIcon}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/next2.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  profileTextBox: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  infoBox: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  functionBox: {
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    marginBottom: 15,
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
    elevation: 0.5,
  },
  functionTouchIcon: {
    width: 24,
    height: 24,
  },
  functionName: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 5,
    color: '#242424',
  },
  functionDescription: {
    fontWeight: '400',
    fontSize: 12,
    color: '#808080',
  },
});

