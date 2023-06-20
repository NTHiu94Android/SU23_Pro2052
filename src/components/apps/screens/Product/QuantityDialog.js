import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

const QuantityDialog = ({ visible, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState('');

  const handleConfirm = () => {
    if (quantity) {
      onConfirm(quantity);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.dialogContainer}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Tùy chỉnh số lượng</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={text => setQuantity(text)}
          />
                    <View style={styles.buttonContainer}>
         <TouchableOpacity style={[styles.cancel]} onPress={onClose}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
              <Text style={{color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
            </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 50,
    borderRadius: 10,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cancel: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",

    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: "white",
  },
  confirm:{
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",

    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: "black",
  }
});

export default QuantityDialog;
