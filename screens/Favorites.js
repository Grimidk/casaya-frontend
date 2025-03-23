import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
} from 'react-native';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function Favorites({ navigation }) {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [storedUserId, setStoredUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const auxUserId = await AsyncStorage.getItem('userId');
        setStoredUserId(auxUserId);

        if (!auxUserId || auxUserId === 'null') {
          setIsLoggedIn(false);
          setIsGuest(true);
          return;
        }

        setIsLoggedIn(true);
        setIsGuest(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    loadUserData();
  }, []);

  
  useFocusEffect(
    useCallback(() => {
      const fetchFavoriteProperties = async () => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          // Obtener la lista de favoritos del usuario
          const userResponse = await axios.get(
            `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}`
          );
          const favorites = userResponse.data.bookmarks; // Lista de IDs de propiedades favoritas

          // Obtener todas las propiedades
          const propertiesResponse = await axios.get(
            'https://casaya-back-backup-production.up.railway.app/properties/'
          );
          const allProperties = propertiesResponse.data;

          // Filtrar las propiedades que están en la lista de favoritos
          const filteredProperties = allProperties.filter((property) =>
            favorites.includes(property.property_id)
          );

          // Actualizar el estado con las propiedades favoritas
          setFavoriteProperties(filteredProperties);
        } catch (error) {
          console.error('Error fetching favorite properties:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteProperties();
    }, [user]) 
  );

  if (!isLoggedIn && isGuest) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#A95534" />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorMessage}>Estás en modo invitado</Text>
          <Button
            title="Ir a Iniciar Sesión"
            onPress={() => navigation.navigate('LoginScreen')}
            color="#A95534"
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn && isGuest) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#A95534" />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorMessage}>Debes iniciar sesión primero</Text>
          <Button
            title="Ir a Iniciar Sesión"
            onPress={() => navigation.navigate('LoginScreen')}
            color="#A95534"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'} />

      {loading ? (
        <Text>Cargando propiedades favoritas...</Text>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container}>
              {favoriteProperties.map((property) => (
                <PropertyCard
                  key={property.property_id}
                  image={{ uri: property.images[0] }}
                  title={property.name}
                  price={property.price}
                  reviews={property.reviews}
                  status={property.status}
                  onPress={() => {
                    navigation.navigate('Detalles', {
                      property: property,
                      userPhone: property.user.phone,
                      userId: property.user.user_id,
                      latitud: property.latitud,
                      longitud: property.longitud,
                    });
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: '#A95534',
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});