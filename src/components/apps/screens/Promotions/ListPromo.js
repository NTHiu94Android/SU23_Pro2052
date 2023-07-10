import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'

const data=
    [{
        "__v": 0, "_id": "64a669c02afc5d72e9da40dd", "condition": 100, "content": "Giảm 10% tổng đơn hàng", "dayEnd": "15/072023", "dayStart": "01/07/2023", "expirateDate": 14, "idUser": "6481e126e54beeae3d8ef4f9",
        "isSubmit": false, "maxSale": 100, "sale": 10
    }];


const ListPromo = () => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Item item={item} />
                }
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default ListPromo

const Item = ({ item }) => {
    const { content, sale, maxSale, code, dayStart, dayEnd, condition, expirateDate } = item;
    console.log('itemLayout: ', item);

    <View style={{ flexDirection: 'row', padding: 12, borderColor: '#ddd', borderWidth: 1, marginHorizontal: 12, marginTop: 8, borderRadius: 8 }}>
        <View style={{ flex: 1 }}>
            <Text style={{ color: 'black', fontWeight: '900', fontSize: 20, marginBottom: 12 }}>{content}</Text>
            <View style={{ flexDirection: 'row' }}>

                <Image
                    style={{ width: 120, height: 100, borderRadius: 8, marginRight: 12 }}
                    resizeMode='cover'
                    source={{ uri: 'https://kids.royalfashion.vn/wp-content/uploads/2020/03/sale.jpg' }}
                />
                <View>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 14 }}>Sale off {sale}%</Text>
                    <Text style={{ color: 'red', fontWeight: '600', fontSize: 14 }}>Max sale {maxSale}$</Text>
                    <Text style={{ color: 'black', fontWeight: '800', fontSize: 14 }}>Code: {code}</Text>
                    <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>Condition: orders from {condition}</Text>
                    <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>Expires later:: {expirateDate} day</Text>
                </View>
            </View>

        </View>
    </View>
};