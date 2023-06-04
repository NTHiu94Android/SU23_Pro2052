import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import back from '../../../back/back';


const Shipping = (props) => {
    const { navigation } = props;
    back(navigation);
    return (
        <View style={styleShippingAddress.container}>
            <View style={styleShippingAddress.header}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styleShippingAddress.icBack}
                            source={require('../../../../assets/images/back.png')}
                            resizeMode='cover'
                        ></Image>
                    </TouchableOpacity>
                </View>
                <Text style={styleShippingAddress.DetailTxt}>Add shipping address</Text>
            </View>

            <ScrollView showsVertic alScrollIndicator={false}>
                <View style={styleShippingAddress.body}>
                    {/* Full Name */}
                    <View style={styleShippingAddress.input}>
                        <Text style={{fontSize: 12, marginTop: 5}} >Full Name</Text>
                        <TextInput style={{fontSize: 16, marginStart: -5, marginTop: -5}} placeholder='Ex: Bruno Pham' ></TextInput>
                    </View>

                    {/* Address */}
                    <View style={styleShippingAddress.input}>
                        <Text style={{fontSize: 12, marginTop: 5}} >Andress</Text>
                        <TextInput style={{fontSize: 16, marginStart: -5, marginTop: -5}} placeholder='Ex: 25 Robert Latouche Street' ></TextInput>
                    </View>

                    {/* ZipCode */}
                    <View style={styleShippingAddress.input1}>
                        <Text style={{fontSize: 12, marginTop: 5}} >ZipCode (Postal Code)</Text>
                        <TextInput style={{fontSize: 16, marginStart: -5, marginTop: -5}} placeholder='Ex: Pham Cong Thanh' ></TextInput>
                    </View>

                    {/* Country */}
                    <View style={styleShippingAddress.viewCountry}>
                        <View>
                            <Text style={{fontSize: 12}} >Country</Text>
                            <Text style={{fontSize: 16, marginTop: 10}} >Select Country</Text>
                        </View>
                        <View>
                            <Image
                                style={styleShippingAddress.imgDown}
                                source={require('../../../../assets/images/down.png')}
                                resizeMode="cover"></Image>
                        </View>
                    </View>

                    {/* City */}
                    <View style={styleShippingAddress.viewCountry1}>
                        <View>
                            <Text style={{fontSize: 12}} >City</Text>
                            <Text style={{fontSize: 16, marginTop: 10}} >New York</Text>
                        </View>
                        <View>
                            <Image
                                style={styleShippingAddress.imgDown}
                                source={require('../../../../assets/images/down.png')}
                                resizeMode="cover"></Image>
                        </View>
                    </View>

                    {/* District */}
                    <View style={styleShippingAddress.viewCountry}>
                        <View>
                            <Text style={{fontSize: 12}} >District</Text>
                            <Text style={{fontSize: 16, marginTop: 10}} >Select District</Text>
                        </View>
                        <View>
                            <Image
                                style={styleShippingAddress.imgDown}
                                source={require('../../../../assets/images/down.png')}
                                resizeMode="cover"></Image>
                        </View>
                    </View>

                    {/* SAVE ADDRESS */}
                    <View style={styleShippingAddress.btn}>
                        <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')}>
                            <Text style={styleShippingAddress.btnText}>SAVE ADDRESS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Shipping

const styleShippingAddress = StyleSheet.create({
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
        marginTop: 10
    },

    input: {
        width: '90%',
        height: 66,
        marginLeft: 20,
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    input1: {
        width: '90%',
        height: 66,
        marginLeft: 20,
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DBDBDB',
    },

    btn: {
        backgroundColor: 'black',
        marginTop: 120,
        width: '90%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 50,
    },

    btnText: {
        color: 'white',
        fontSize: 20
    },

    viewCountry: {
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        width: '90%',
        height: 66,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewCountry1: {
        borderColor: '#DBDBDB',
        borderWidth: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        width: '90%',
        height: 65,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgDown: {
        width: 12,
        height: 12,
    },
})