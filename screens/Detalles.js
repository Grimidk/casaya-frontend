import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, StatusBar, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

export default function Detalles({ route }) {
  const { property, userPhone, userId, latitud: initialLatitud, longitud: initialLongitud, municipio } = route.params;
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [latitud, setLatitud] = useState(initialLatitud);
  const [longitud, setLongitud] = useState(initialLongitud);

  useEffect(() => {
    if (latitud === "0" && longitud === "0") {
      placeholderCords(municipio);
    }
  }, [latitud, longitud, municipio]);

  const placeholderCords = (municipality) => {
    if (municipality == "libertador") {
      setLatitud("10.48801");
      setLongitud("-66.87919");
    } else if (municipality == "baruta") {
      setLatitud("10.42971");
      setLongitud("-66.87088");
    } else if (municipality == "chacao") {
      setLatitud("10.49606");
      setLongitud("-66.85312");
    } else if (municipality == "el_hatillo") {
      setLatitud("10.42472");
      setLongitud("-66.83096");
    } else if (municipality == "sucre") {
      setLatitud("10.49596");
      setLongitud("-66.81827");
    } else {
      setLatitud("10.49830");
      setLongitud("-66.90130");
    }
  };

  const checkIfPropertyIsLiked = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.get(
        `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}`
      );
      const favorites = response.data.bookmarks;
      const isPropertyLiked = favorites.includes(property.property_id);
      setLiked(isPropertyLiked);
    } catch (error) {
      console.error('Error al verificar favoritos:', error);
    }
  };

  useEffect(() => {
    checkIfPropertyIsLiked();
  }, [user, property.property_id]);

  const openWhatsApp = () => {
    const url = 'https://wa.me/' + '+58' + userPhone;
    Linking.openURL(url).catch(err => console.error('Error al abrir WhatsApp', err));
  };

  const handleLike = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para marcar esta propiedad como favorita.');
      return;
    }

    try {
      let response;

      if (liked) {
        response = await axios.delete(
          `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}/bookmark/${property.property_id}`
        );
      } else {
        response = await axios.patch(
          `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}/bookmark/${property.property_id}`, 
        );
      }

      if (response.status === 200) {
        setLiked(!liked);
        Alert.alert('Éxito', liked ? 'Propiedad quitada de favoritos.' : 'Propiedad agregada a favoritos.');
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo actualizar la lista de favoritos.');
    }
  };

  const goToSellerProfile = () => {
    navigation.navigate('UserProfileAux', { userId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: property.images[0] }} resizeMode="cover" style={styles.imageBackground} />
      </View>
      <ScrollView>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>{property.name}</Text>
          <Text style={styles.textTitle}>{property.price + "$"}</Text>
        </View>

        <View style={styles.containerSubtitle}>
          <View style={styles.location}>
            <Text style={styles.locationText}>{property.location}</Text>
          </View>
          <View style={styles.location}>
            <Icon name="star" type="font-awesome" size={20} color="#A95534" />
            <Text style={styles.reviewsText}>{property.reviews} Reviews</Text>
          </View>
        </View>

        <View style={styles.contenedorIcons}>
          <View>
            <Icon name="bed" type="font-awesome" size={20} color={'gray'} />
            <Text style={styles.iconText}>{property.bedrooms}</Text>
          </View>
          <View>
            <Icon name="bath" type="font-awesome" size={20} color={'gray'} />
            <Text style={styles.iconText}>{property.bathrooms}</Text>
          </View>
          <View>
            <Icon name="car" type="font-awesome" size={20} color={'gray'} />
            <Text style={styles.iconText}>{property.parkingSpots}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Reseña</Text>
          <Text style={styles.textDescription}>{property.description}</Text>
        </View>

        <View style={styles.mapContainer}>
          {latitud != "0" && longitud != "0" ? (
            <MapView
              style={styles.map}
              region={{
                latitude: parseFloat(latitud),
                longitude: parseFloat(longitud),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(latitud),
                  longitude: parseFloat(longitud),
                }}
                title="Ubicación de la propiedad"
                description="Esta es la ubicación de la propiedad"
              />
            </MapView>
          ) : (
            <Text style={styles.noLocationText}>
              No se pudo cargar la ubicación de la propiedad.
            </Text>
          )}
        </View>

        <View style={styles.centeredContainer}>
          <TouchableOpacity style={styles.moreInfoButton} onPress={goToSellerProfile}>
            <Text style={styles.moreInfoButtonText}>Perfil del vendedor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Icon
              name={liked ? 'bookmark' : 'bookmark-outline'}
              type="ionicon"
              size={20}
              color="gray"
            />
            <Text style={{ color: liked ? 'grey' : 'gray', marginLeft: 10 }}>
              {liked ? 'Eliminar de guardados' : 'Guardad Propiedad'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centeredContainer}>
          <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
            <Icon name="whatsapp" type="font-awesome" size={20} color="white" />
            <Text style={styles.whatsappButtonText}>Contactar por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 400,
  },
  imageBackground: {
    height: '100%',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerSubtitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  location: {
    flexDirection: 'row',
  },
  locationText: {
    color: 'slategray',
    fontSize: 15,
  },
  reviewsText: {
    color: 'slategray',
    fontSize: 15,
  },
  contenedorIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 45,
  },
  iconText: {
    color: 'slategray',
    fontSize: 15,
  },
  descriptionContainer: {
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textDescription: {
    fontSize: 15,
    color: 'slategray',
    marginTop: 5,
  },
  mapContainer: {
    height: 150, 
    width: '90%', 
    alignSelf: 'center',
    borderRadius: 10, 
    overflow: 'hidden',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#A95534',
  },
  map: {
    flex: 1,
  },
  noLocationText: {
    textAlign: 'center',
    marginTop: 20,
  },
  centeredContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A95534',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  moreInfoButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  likeButtonText: {
    color: 'gray',
    marginLeft: 10,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  whatsappButtonText: {
    color: 'white',
    marginLeft: 10,
  },
});