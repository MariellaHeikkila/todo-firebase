import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { styles } from '../style/style';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        if (!email) {
            alert('Please enter your email');
        } else if (!password) { 
            alert('Please enter your password');
        } else {
            signIn(email, password);
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    navigation.navigate('Todo', {userUid: user.uid});
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text>Todos</Text>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Don't have an account?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
  