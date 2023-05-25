import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'

const AddReview = () => {
  return (
    <View style={styleReview.container}>
        <View style={styleReview.header}>
            <View>
                <TouchableOpacity>
                    <Image
                        style={styleReview.icBack}
                        source={require('../../../../assets/images/back.png')}
                        resizeMode='cover'
                    ></Image>
                </TouchableOpacity>
            </View>
            <Text style={styleReview.DetailTxt}>Rating & Comment</Text>
        </View>

        <View style={styleReview.body}>
            <View style={styleReview.header01}>
                <View>
                    <Image
                        style={styleReview.icAva}
                        source={require('../../../../assets/images/avataruser.png')}></Image>
                </View>

                <View style={styleReview.Star}>
                    <Image
                        style={styleReview.icStar}
                        source={require('../../../../assets/images/star.png')}></Image>
                    <Image
                        style={styleReview.icStar}
                        source={require('../../../../assets/images/star.png')}></Image>

                    <Image
                        style={styleReview.icStar}
                        source={require('../../../../assets/images/star.png')}></Image>

                    <Image
                        style={styleReview.icStar}
                        source={require('../../../../assets/images/star.png')}></Image>

                    <Image
                        style={styleReview.icStar}
                        source={require('../../../../assets/images/star.png')}></Image>
                </View>

                <View style={styleReview.txtInputView}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder='Comment'
                        style={styleReview.txtInput}></TextInput>
                </View>

                <View style={styleReview.btn}>
                    <TouchableOpacity>
                        <Text style={styleReview.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </View>
)
}

export default AddReview

const styleReview = StyleSheet.create({
  // container
  container: {
      display: 'flex',
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
  },

  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20,
      paddingHorizontal: 20
  },

  icBack: {
      width: 20,
      height: 20,
  },

  DetailTxt: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      width: '65%'
  },

  //Body
  body: {
      height: '100%',
      width: '100%',
      marginTop: 30
  },

  header01: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 130,
  },

  icAva: {
      width: 100,
      height: 100,
      marginLeft: 130
  },

  Star: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 255
  },

  icStar: {
      marginTop: 20,
      width: 50,
      height: 50
  },

  txtInputView: {
      paddingLeft: 150,
      paddingHorizontal: 20
  },

  txtInput: {
      width: 300,
      height: 100,
      marginTop: 20,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 5
  },

  //Button
  btn: {
      backgroundColor: 'black',
      width: '90%',
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      borderRadius: 8,
      marginTop: 100,
      marginLeft: 150
  },

  btnText: {
      color: 'white',
      fontSize: 20
  },
})