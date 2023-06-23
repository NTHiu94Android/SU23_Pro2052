import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';

const Dialog = ({ visible, onClose, prodQuantity, onSave }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const getData = () => {
            try {
                handleChangeText(prodQuantity);
                console.log(prodQuantity);
            }
            catch (err) {
                console.log('Get number of prod err:', err)
            }
        };
        getData();

    }, [prodQuantity])
    const handleChangeText = (text) => {
        setInputValue(text);
    };

    const handleSave = () => {
        // Xử lý lưu giá trị nhập liệu tại đây
        onSave(inputValue);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Tùy chỉnh số lượng</Text>
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={handleChangeText}
                    />
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
};

export default Dialog;
