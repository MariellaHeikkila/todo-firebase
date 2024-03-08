import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../style/style';

export default Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to Todo App</Text>
        <Text style={styles.text}>For people having lots of things todo</Text>
        <View >
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}