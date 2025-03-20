import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { UserContext } from '../context/UserContext'; 
import { useContext } from 'react';

export default function Favorites({ navigation }) {
  const [favoriteProperties, setFavoriteProperties] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        //lista de favoritos del usuario
        const userResponse = await axios.get(
          `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}`
        );
        const favorites = userResponse.data.bookmarks; // Lista de IDs de propiedades favoritas

      
        const propertiesResponse = await axios.get(
          'https://casaya-back-backup-production.up.railway.app/properties/'
        );
        const allProperties = propertiesResponse.data;

        // Filtrar las propiedadrs
        const filteredProperties = allProperties.filter(property =>
          favorites.includes(property.property_id)
        );

        //Actualizar el estao
        setFavoriteProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching favorite properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProperties();
  }, [user]); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={"#fff"} barStyle={"dark-content"} />

      {loading ? (
        <Text>Cargando propiedades favoritas...</Text>
      ) : (
        <>
          <Text style={styles.result}> {favoriteProperties.length} Propiedades Favoritas</Text>
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
                      longitud: property.longitud
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
});