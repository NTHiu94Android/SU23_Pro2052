import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import back from '../../../back/back';

const UpdateProfile = (props) => {
  const { navigation } = props;
  back(navigation);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('../../../../assets/images/back.png')} ></Image>
        <View style={styles.viewHeader}>
          <Text style={styles.title}>Update profile</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.viewAvatar}>
          <Image
            style={styles.avatar}
            source={require('../../../../assets/images/meow.jpg')} ></Image>
          <Pressable style={styles.btnEdit}>
            <Image
              style={styles.icEdit}
              source={require('../../../../assets/images/edit-2.png')} ></Image>
          </Pressable>
        </View>

        <View>
          <Text style={styles.txt}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder="Your email"></TextInput>
        </View>


        <View>
          <Text style={styles.txt}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"></TextInput>
        </View>


        <View>
          <Text style={styles.txt}>Birthday</Text>
          <TextInput
            style={styles.input}
            keyboardType='birthday'
            placeholder="Your birthday"></TextInput>
        </View>

        <View>
          <Text style={styles.txt}>Phone number</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder="Your phone number"></TextInput>
        </View>

        <Pressable style={styles.btn}>
          <Text style={styles.txtBtn}>Submit</Text>
        </Pressable>
      </View>

      <View style={styles.footer}></View>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  footer: {
    flex: 0.5,
  },

  // body
  txtBtn: {
    color: 'white',
    fontSize: 16,
  },
  btn: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 250,
    borderRadius: 50,
    backgroundColor: 'black',
  },
  txt:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,

  },
  input: {
    height: 40,
    width: 300,
    borderBottomWidth: 1,

  },
  icEdit: {
    width: 30,
    height: 30,
  },
  btnEdit: {
    alignItems: 'flex-end',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  viewAvatar: {
    flexDirection: 'column',
  },
  body: {
    flex: 5,
    marginVertical: 20,
    alignItems: 'center',
  },


  // header

  title: {
    marginHorizontal: 25,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    

  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    width: 16,
    height: 16,
  },
  header: {
    marginHorizontal: 15,
    alignItems: 'center',
    flex: 0.5,
    flexDirection: 'row',

  },
  container: {
    flex: 1,
  },

})