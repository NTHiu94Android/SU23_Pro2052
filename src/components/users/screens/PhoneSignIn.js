import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../UserContext';

const PhoneSignIn = (props) => {
    const { navigation } = props;
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    //const { user, setUser } = useContext(UserContext);
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    const onAuthStateChanged = (user) => {
        //setUser(user);
        //if (initializing) setInitializing(false);
    }

    const signInWithPhoneNumber = async () => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    };

    const confirmCode = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            let userData = await auth().currentUser.linkWithCredential(credential);
            console.log('userData', userData.user);
            //setUser(userData.user);
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }
    if (!confirm) {
        return (
            <View>
                <Text>PhoneSignIn</Text>
                <TextInput value={phoneNumber} onChangeText={text => setPhoneNumber(text)} />
                <Button
                    title="Phone Number Sign In"
                    onPress={() => signInWithPhoneNumber()}
                />
            </View>
        );
    }
    return (
        <View>
            <Text>PhoneSignIn</Text>
            <TextInput value={code} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
    )
}

export default PhoneSignIn

const styles = StyleSheet.create({})