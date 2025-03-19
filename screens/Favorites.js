import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const FavoritesScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Uso del contexto para obtener datos del usuario

  // Función para cargar las propiedades favoritas
  const fetchFavorites = async () => {
    try {
      if (!user || !user.user_id) {
        Alert.alert("Error", "No se ha podido identificar al usuario. Inicia sesión.");
        setLoading(false);
        return;
      }

      // Obtener los favoritos del usuario desde la API
      const userResponse = await axios.get(`https://casaya-back-backup-production.up.railway.app/users/${user.user_id}`);
      const userBookmarks = userResponse.data.bookmarks; // Lista de favoritos
      
      if (!userBookmarks || userBookmarks.length === 0) {
        Alert.alert("Información", "No tienes favoritos guardados.");
        setProperties([]);
        setLoading(false);
        return;
      }

      // Obtener detalles de cada propiedad favorita
      const propertiesData = await Promise.all(
        userBookmarks.map(async (propertyId) => {
          const propertyResponse = await axios.get(`https://casaya-back-backup-production.up.railway.app/properties/${propertyId}`);
          return propertyResponse.data; // Datos de la propiedad
        })
      );
      
      setProperties(propertiesData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los favoritos:", error);
      Alert.alert("Error", "Ocurrió un problema al cargar los favoritos.");
      setLoading(false);
    }
  };

  // Cargar favoritos al montar el componente
  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando favoritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {properties.length === 0 ? (
        <Text style={styles.emptyText}>No tienes favoritos todavía</Text>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detalles', { property: item })}
              style={styles.propertyItem}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#888',
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#888',
  },
  propertyItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    color: '#444',
  },
});

export default FavoritesScreen;