import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); // Campo de texto para el género
  const [password, setPassword] = useState(''); // Campo para la contraseña

  // Función para validar la contraseña
  const validatePassword = (password) => {
    // Mínimo 8 caracteres
    const hasMinLength = password.length >= 8;

    // Al menos una letra
    const hasLetter = /[a-zA-Z]/.test(password);

    // Al menos un número
    const hasNumber = /\d/.test(password);

    // Retorna true si cumple con todos los requisitos
    return hasMinLength && hasLetter && hasNumber;
  };

  const handleRegister = async () => {
    if (!name || !email || !phone || !gender || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar la contraseña
    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.',
      );
      return;
    }

    const userData = {
      name,
      email,
      phone,
      gender,
      password,
    };

    try {
      // Hacer una petición POST al backend para registrar al usuario
      const response = await axios.post(
        'https://casaya-back-backup-production.up.railway.app/users', // URL del endpoint de registro
        userData, // Datos del usuario
      );

      // Si la respuesta es exitosa (código 201 o 200)
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('LoginScreen'); // Redirigir al usuario a la pantalla de inicio de sesión
      } else {
        Alert.alert('Error', 'No se pudo completar el registro');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()} 
                >
                  <Text style={styles.backButton}>Atrás</Text>
                </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>

        {/* Input para el nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />

        {/* Input para el correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input para el teléfono */}
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Input para el género */}
        <TextInput
          style={styles.input}
          placeholder="Género (Masculino, Femenino, Otro)"
          value={gender}
          onChangeText={setGender}
        />

        {/* Input para la contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Botón de Registrarse */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Enlace para ir a la pantalla de inicio de sesión */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>
            ¿Ya tienes una cuenta? <Text style={styles.link}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#58A9FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },backButton: {
    position: 'absolute', 
    top: 40, 
    left: 20, 
    zIndex: 1, 
  },
  linkText: {
    marginTop: 10,
    color: '#000',
  },
  link: {
    color: '#58A9FF',
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: -20,
  },
});

export default RegisterScreen;