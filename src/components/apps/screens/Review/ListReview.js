import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import back from '../../../back/back';

const ListReview = (props) => {
  const { navigation } = props;
  back(navigation);
  return (
    <View style={styleReview.container}>
      <View style={styleReview.header}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styleReview.icBack}
              source={require('../../../../assets/images/back.png')}
              resizeMode='cover'
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styleReview.DetailTxt}>Rating & Review</Text>
      </View>

      <ScrollView showsVertic alScrollIndicator={false}>
        <View style={styleReview.body}>
          <View style={styleReview.header}>
            <View>
              <Image
                style={styleReview.icImg}
                source={require('../../../../assets/images/s23.jpg')}
              ></Image>
            </View>
            <View style={styleReview.txtheader}>
              <Text>SamSung S23 Utral</Text>
              <View style={styleReview.Star}>
                <Image
                  style={styleReview.icStar}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
                <Text style={styleReview.txtStar}>5.0</Text>
              </View>
              <Text>1 Reviews</Text>
            </View>
          </View>

          <View style={styleReview.AllReview}>

            {/* 1 */}
            <View style={styleReview.BoxReview}>
              <Image
                style={styleReview.icAva}
                source={require('../../../../assets/images/avataruser.png')}
              ></Image>

              <View style={styleReview.RName}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>CoV Music Offical</Text>
                <Text style={{ color: 'black', fontWeight: 'bold' }} >26/05/2023</Text>
              </View>
              <View style={styleReview.RatingStar}>
                <Image
                  style={styleReview.icStar01}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
                <Image
                  style={styleReview.icStar01}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
                <Image
                  style={styleReview.icStar01}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
                <Image
                  style={styleReview.icStar01}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
                <Image
                  style={styleReview.icStar01}
                  source={require('../../../../assets/images/star.png')}
                ></Image>
              </View>

              <View style={styleReview.imgCmt} >
                <Image
                  style={styleReview.imgComment}
                  source={require('../../../../assets/images/Meo.jpg')}
                ></Image>
                <Image
                  style={styleReview.imgComment01}
                  source={require('../../../../assets/images/Meo.jpg')}
                ></Image>
              </View>

              <View style={styleReview.comment}>
                <Text>Net như Ngọc Trinh :))</Text>
              </View>
            </View>

          </View>

        </View>
      </ScrollView>
      {/* WRITE A REVIEW */}
      {/* <View style={styleReview.btn}>
        <TouchableOpacity>
          <Text style={styleReview.btnText}>Write a Review</Text>
        </TouchableOpacity>
      </View> */}
    </View>

  )
}

export default ListReview

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
    width: '70%'
  },

  //body
  body: {
    height: '100%',
    width: '100%'
  },

  icImg: {
    width: 100,
    height: 100,
    borderRadius: 10
  },

  txtheader: {
    paddingHorizontal: 20,
    width: '70%'
  },

  //Star Point
  Star: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icStar: {
    width: 30,
    height: 30
  },

  txtStar: {
    fontSize: 20,
    paddingLeft: 10
  },

  //Review
  BoxReview: {
    width: '90%',
    height: 160,
    marginLeft: 20,
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    justifyContent: 'center'
  },

  icAva: {
    width: 40,
    height: 40,
    bottom: 15,
    marginLeft: 130
  },

  RName: {
    marginTop: 10,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  RatingStar: {
    bottom: 20,
    flexDirection: 'row',
  },

  icStar01: {
    width: 20,
    height: 20
  },

  imgCmt: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  imgComment: {
    width: 50,
    height: 50,
    bottom: 5,
    borderRadius: 10,
  },

  imgComment01: {
    width: 50,
    height: 50,
    bottom: 5,
    borderRadius: 10,
    marginLeft: 5
  },

  //Comment
  comment: {
    marginTop: 20,
    bottom: 15,
  },

  //Button
  // btn: {
  //   backgroundColor: 'black',
  //   width: '90%',
  //   height: 55,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginHorizontal: 20,
  //   borderRadius: 8,
  // },

  // btnText: {
  //   color: 'white',
  //   fontSize: 20
  // },
})