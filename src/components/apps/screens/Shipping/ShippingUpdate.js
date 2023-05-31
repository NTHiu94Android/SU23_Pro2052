import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import back from '../../../back/back';

const ShippingUpdate = (props) => {
    const { navigation } = props;
    back(navigation);
    return (
        <View style={styleShippingAddress.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12 }}>
                <TouchableOpacity>
                    <Image
                        style={{ width: 22, height: 22 }}
                        resizeMode='cover'
                        source={require('../../../../assets/images/back.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                    <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Update shipping address</Text>
                </View>

                <View style={{ width: 22, height: 22 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styleShippingAddress.body}>
                    {/* Full Name */}
                    <View style={styleShippingAddress.input}>
                        <Text style={{ color: 'black', fontWeight: '700' }}>Full Name</Text>
                        <Text style={{ marginTop: 5 }}>ABC</Text>
                    </View>

                    {/* Address */}
                    <View style={styleShippingAddress.input}>
                        <Text style={{ color: 'black', fontWeight: '700' }}>Andress</Text>
                        <TextInput
                            multiline={true}
                            style={{ marginBottom: 5, maxWidth: '100%' }}
                        />
                    </View>

                    {/* ZipCode */}
                    <View style={styleShippingAddress.input}>
                        <Text style={{ color: 'black', fontWeight: '700' }}>Number phone</Text>
                        <Text style={{ marginTop: 5 }}>0909011123</Text>
                    </View>

                </View>
            </ScrollView>
            {/* SAVE ADDRESS */}
            <View style={styleShippingAddress.btn}>
                <TouchableOpacity>
                    <Text style={styleShippingAddress.btnText}>SAVE ADDRESS</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShippingUpdate

const styleShippingAddress = StyleSheet.create({
    // container
    container: {
        display: 'flex',
        backgroundColor: 'white',
        height: '100%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
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
        backgroundColor: 'white',
        height: '100%',
    },

    input: {
        width: '90%',
        marginLeft: 20,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },

    btn: {
        //position: 'relative',
        backgroundColor: 'black',
        bottom: 20,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
    },

    btnText: {
        color: 'white',
        fontSize: 20
    },

    viewCountry: {
        borderColor: '#F5F5F5',
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