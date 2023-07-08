import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../users/UserContext';
import { AppContext } from '../../AppContext';
import back from '../../../back/back';

// const Data = [
//     {
//         "__v": 0, "_id": "64a669c02afc5d72e9da40dd", "condition": 100, "content": "Giảm 10% tổng đơn hàng", "dayEnd": "15/072023", "dayStart": "01/07/2023", "expirateDate": 14, "idUser": "6481e126e54beeae3d8ef4f9",
//         "isSubmit": false, "maxSale": 100, "sale": 10
//     }
// ];

const ListVoucher = (props) => {
    const { navigation } = props;
    back(navigation);
    const { user } = useContext(UserContext);
    const { onGetPromotions } = useContext(AppContext);
    const [listVoucher, setListVoucher] = useState([]);

    useEffect(() => {
        const getListVoucher = async () => {
            try {
                const response = await onGetPromotions(user._id);

                let list = [];

                response.data.filter(item => {
                    //Lay ngay ket thuc
                    const dayStart = item.dayStart.split('/')[0];

                    //Lay ngay ket thuc
                    const dayEnd = item.dayEnd.split('/')[0];

                    if (item.isSubmit == false) {
                        item.expirateDate = dayEnd - dayStart;
                        list.push(item);
                    }
                })
                setListVoucher(list);
            } catch (error) {
                console.log('Error get list promotion screen: ', error);
            }
        };
        getListVoucher();
    }, []);

    return (
        <View style={{ position: 'relative', flex: 1, backgroundColor: 'white' }}>
            {/* Top bar */}
            <View style={
                {
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    paddingVertical: 6, paddingHorizontal: 12, borderColor: '#ddd', borderBottomWidth: 1
                }
            }>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={{ width: 22, height: 22 }}
                        resizeMode='cover'
                        source={require('../../../../assets/images/back.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                    <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>List voucher</Text>

                </View>

                <View style={{ width: 22, height: 22 }}></View>
            </View>

            <FlatList
                data={listVoucher}
                renderItem={({ item }) =>
                    <Item item={item} />
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default ListVoucher

const styles = StyleSheet.create({});

const Item = ({ item }) => {
    const { content, sale, maxSale, code, dayStart, dayEnd, condition, expirateDate } = item;
    console.log('item: ', item);

    return (

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
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>Expires later: {expirateDate} day</Text>
                    </View>
                </View>

            </View>
        </View>
    )
};