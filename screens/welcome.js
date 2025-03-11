import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  const handleGuestLogin = async () => {
    await AsyncStorage.setItem('userId', 'null');
    navigation.navigate('MyTabs');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Bienvenido a Casayá</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#58A9FF' }]}
          onPress={handleGuestLogin}
        >
          <Text style={styles.buttonText}>Continuar como invitado</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#58A9FF' }]}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: -20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#58A9FF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;