import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState, useContext } from 'react'
import back from '../../../back/back';
import { UserContext } from '../../../users/UserContext';

const Setting = (props) => {
  const { navigation } = props;
  back(navigation);

  const {user} = useContext(UserContext);

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity style={{ width: 12, height: 12 }} onPress={handleBackPress}>
          <Image
            style={{ width: 24, height: 24, }}
            source={require('../../../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={[styles.text1, { color: '#303030' }]}>Setting</Text>
        {/* View trống dùng để căn giữa chữ setting */}
        <View></View>
      </View>

      {/* Thông tin cá nhân */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.titleBox}>
          <Text style={styles.text2}>Personal Information</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('UpdateProfile')}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/edit2.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 15 }}>
          <View style={styles.infoBox}>
            <Text style={[styles.text3, { marginBottom: 5 }]}>Name</Text>
            <Text style={styles.text4}>{user.name}</Text>
          </View>
          <View style={[styles.infoBox, { marginTop: 15 }]}>
            <Text style={[styles.text3, { marginBottom: 5 }]}>Email</Text>
            <Text style={styles.text4}>{user.email}</Text>
          </View>
        </View>
      </View>

      {/* Mật khẩu */}
      <View style={{ marginTop: 38 }}>
        <View style={styles.titleBox}>
          <Text style={styles.text2}>Password</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditPassword')}>
            <Image
              style={{ width: '100%', height: '100%', }}
              source={require('../../../../assets/images/edit2.png')}
            />
          </TouchableOpacity>
        </View>

        
      </View>

      {/* Thông báo */}
      <View style={{ marginTop: 35 }}>
        <View style={styles.titleBox}>
          <Text style={styles.text2}>Notifications</Text>
        </View>

        <View style={{ marginTop: 11 }}>
          <View style={[styles.infoBox, { height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={[styles.text2, { color: '#242424' }]}>Sales</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#27AE60' }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>

      {/* Trung tâm hỗ trợ */}
      <View style={{ marginTop: 22 }}>
        <View style={styles.titleBox}>
          <Text style={styles.text2}>Help Center</Text>
        </View>

        {/* FAQ */}
        <TouchableOpacity style={{ marginTop: 15 }}>
          <View style={[styles.infoBox, { height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={[styles.text1, { color: '#242424' }]}>FAQ</Text>
            <View style={styles.editIcon} onPress={handleBackPress}>
              <Image
                style={{ width: '100%', height: '100%', }}
                source={require('../../../../assets/images/next2.png')}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Liên hệ */}
        <TouchableOpacity style={{ marginTop: 10 }}>
          <View style={[styles.infoBox, { height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={[styles.text1, { color: '#242424' }]}>Contact Us</Text>
            <View style={styles.editIcon} onPress={handleBackPress}>
              <Image
                style={{ width: '100%', height: '100%', }}
                source={require('../../../../assets/images/next2.png')}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Đăng xuất */}
        <TouchableOpacity style={{ marginTop: 10 }}>
          <View style={[styles.infoBox, { height: 54, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={[styles.text1, { color: '#242424' }]}>Log out</Text>
            <View style={styles.editIcon} onPress={handleBackPress}>
              <Image
                style={{ width: '100%', height: '100%', }}
                source={require('../../../../assets/images/next2.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
};


export default Setting

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

  infoBox: {
    backgroundColor: '#fff',
    width: '100%',
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
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
  text1: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '800',
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#909191',
  },
  text3: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
  },
  text4: {
    fontSize: 14,
    fontWeight: '600',
    color: '#242424',
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
});

