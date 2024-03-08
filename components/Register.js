import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signUp } from './Auth';
import { auth } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { styles } from '../style/style';

export default function Register({ navigation }) {

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        if (!nickname) {
            alert('Please enter your nickname');
        } else if (!email) {
            alert('Please enter your email');
        } else if (!password) { 
            alert('Please enter your password');
        } else if (!confirmPassword) {
            setPassword('');
        } else if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            signUp(nickname, email, password);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.navigate('Todo', {userUid: user.uid});
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text>Todos</Text>
            <Text style={styles.title}>Create an account</Text>
            <TextInput
                style={styles.input}
                placeholder='Nickname'
                value={nickname}
                onChangeText={(nickname) => setNickname(nickname.trim())}
            />
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
            <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Already have an account?</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
  