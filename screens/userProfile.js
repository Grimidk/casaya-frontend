import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, FlatList ,Button,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const properties = [
   require('../assets/casa1.jpg'),
   require('../assets/casa2.jpg'),
   require('../assets/casa3.jpg'),
   require('../assets/casa4.jpg'),
   require('../assets/casa5.jpg'),
   require('../assets/casa6.jpg'),
   require('../assets/casa7.jpg'),
   require('../assets/casa8.jpg'),
   require('../assets/casa9.jpg'),
];

const userProfile = () => {
  const navigation = useNavigation(); 
  const { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigation.navigate('welcome'); // Redirigir al usuario a la pantalla de bienvenida
  };
  const propertyData = {
    title: "Hermosa Casa en Caracas",
    price: "250000",
    reviews: "5",
    status: "disponible",
    description: "Casa espaciosa y bien ubicada",
    city: "Caracas",
    municipality: "Libertador",
    bathrooms: "3",
    rooms: "4",
    parking: "2",
    numberCode: "0424",
    number: "1234567",
    images: ['../assets/image1.jpg']
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#A95534" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={{
            backgroundColor: '#A95534',
            height: 228,
            width: '100%',
          }}
        />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/profile1.jpg')}
            resizeMode="contain"
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderColor: '#A95534',
              borderWidth: 2,
              marginTop: -90,
            }}
          />

          <Text style={{
            color: "#A69D9D",
            marginVertical: 8
          }}> Armando Casas</Text>
          <Text style={{
            color: "#A69D9D",
          }}>
            armando.casas@gmail.com
          </Text>

          <View style={{
            flex: 1,
            paddingVertical: 8,
            flexDirection: "row"
          }}>
            <View style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10
            }}> 
              <Text style={{
                color: "#A95534",
                fontSize: 55,
              }}> 122</Text>
              <Text style={{
                color: "#A69D9D"
              }}> Propiedades</Text>
            </View>
            <View style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: 10
            }}> 
              <Text style={{
                color: "#A95534",
                fontSize: 55,
              }}> 67</Text>
              <Text style={{
                color: "#A69D9D"
              }}> Vendidas</Text>
            </View>
          </View>

          {/* Botón para navegar a la pantalla de edición */}
          <Button
            title="Editar Propiedad"
            onPress={() => navigation.navigate('Edit', { propertyData: propertyData })}
            color="#A95534"
          />
        </View>

        <View style={{ flex: 1 }}>
          {/* Galería de propiedades en fila con bordes redondeados */}
          <FlatList
            data={properties}
            keyExtractor={(item, index) => index.toString()}
            horizontal // Mostrar imágenes en fila
            renderItem={({ item }) => (
              <View style={styles.propertyContainer}>
                <Image source={item} style={styles.propertyImage} />
              </View>
            )}
            contentContainerStyle={styles.galleryContainer}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButton}>Cerrar Sesión</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 30, 
    backgroundColor: '#A95534', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  stat: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statNumber: {
    color: '#A95534',
    fontSize: 55,
  },
  statLabel: {
    color: '#A69D9D',
    fontSize: 14,
  },
  galleryContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row", // Asegura que se muestran en fila
  },
  propertyContainer: {
    alignItems: "center",
    margin: 5, // Espacio entre imágenes
  },
  propertyImage: {
    width: 100,  // Tamaño uniforme
    height: 100,
    borderRadius: 50, // Bordes redondeados
  },
});

export default userProfile;