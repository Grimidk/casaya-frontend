import React, { useState, useContext, useEffect  } from 'react';
import { Text, StyleSheet, View, StatusBar, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

export default function Detalles({ route }) {
  const { property, userPhone, userId, latitud, longitud } = route.params; 
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
 
  // Llama a la función cuando la pantalla se carga o cuando el usuario cambia
  useEffect(() => {
    checkIfPropertyIsLiked();
  }, [user, property.property_id]);

  const openWhatsApp = () => {
    const url = 'https://wa.me/' + '+58' + userPhone;
    Linking.openURL(url).catch(err => console.error('Error al abrir WhatsApp', err));

  };
  const checkIfPropertyIsLiked = async () => {
    if (!user) {
      return; // Si no hay usuario, no hay nada que verificar
    }
  
    try {
      const response = await axios.get(
        `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}`
      );
      const favorites = response.data.bookmarks; // Lista de propiedades favoritas
      
      const isPropertyLiked = favorites.includes(property.property_id); 
      
      setLiked(isPropertyLiked); // Actualiza el estado local
    } catch (error) {
      console.error('Error al verificar favoritos:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para marcar esta propiedad como favorita.');
      return;
    }
  
    try {
      let response;
  
      if (liked) {
        // Si ya está marcada como favorita, enviar una solicitud DELETE para quitarla
        response = await axios.delete(
          `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}/bookmark/${property.property_id}`
        );
      } else {
        // Si no está marcada como favorita, enviar una solicitud PATCH para agregarla
        response = await axios.patch(
          `https://casaya-back-backup-production.up.railway.app/users/${user.user_id}/bookmark/${property.property_id}`
        );
      }
  
      if (response.status === 200) {
        // Actualizar el estado local
        console.log(user)
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

  const propertyMap = (latitud, longitud) => {const App = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: latitud,
              longitude: longitud
            }}
            customMapStyle={mapStyle}>
            <Marker
              draggable
              coordinate={{
                latitude: latitud,
                longitude: longitud,
              }}
              onDragEnd={
                (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
              }
            />
          </MapView>
        </View>
      </SafeAreaView>
    );}; 
  };

//   function initMap() {
//     const ubicacion = { lat: 19.432608, lng: -99.133209 }; // Ejemplo: CDMX
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 15,
//         center: ubicacion,
//     });

//     new google.maps.Marker({
//         position: ubicacion,
//         map: map,
//         title: "Ubicación de la propiedad",
//     });
// }

// const GoogleMap = ({ lat, lng }) => {
//   useEffect(() => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDs-nsLFRQc0j1awjGUaLves8-8Xwp3ag8&callback=initMap`;
//       script.async = true;
//       document.body.appendChild(script);

//       window.initMap = () => {
//           const map = new google.maps.Map(document.getElementById("map"), {
//               zoom: 9,
//               center: { lat, lng },
//           });

//           new google.maps.Marker({
//               position: { lat, lng },
//               map: map,
//               title: "Ubicación de la propiedad",
//           });
//       };
//       return () => document.body.removeChild(script);
//   }, [lat, lng]);
// };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={{ height: 400 }}>
        <ImageBackground source={{ uri: property.images[0] }} resizeMode="cover" style={{ height: 400 }}></ImageBackground>
      </View>
      <ScrollView>
        {/* Seccion de titulo */}
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>{property.name}</Text>
          <Text style={styles.textTitle}>{property.price + "$"}</Text>
        </View>

        {/* Seccion de subtitulo */}
        <View style={styles.containerSubtitle}>
          <View style={styles.location}>
            
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.location}</Text>
          </View>

          <View style={styles.location}>
            <Icon name="star" type="font-awesome" size={20} color="#A95534" />
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.reviews} Reviews</Text>
          </View>
        </View>

        {/* Seccion de iconos */}
        <View style={styles.contenedorIcons}>
          <View>
            <Icon name="bed" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}> {property.bedrooms} </Text>
          </View>

          <View>
            <Icon name="bath" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.bathrooms} </Text>
          </View>

          <View>
            <Icon name="car" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}> {property.parkingSpots} </Text>
          </View>
        </View>

        {/* Seccion descripcion */}
        <View style={{ marginTop: 40, marginBottom: 40, paddingHorizontal: 20 }}>
          <Text style={styles.description}>Reseña </Text>
          <Text style={styles.textDescription}>{property.description}</Text>
        </View>

        {/* Google Maps Section */}
        <View style={{ height: 200, width: '100%' }}>
        {property.latitude && property.longitude ? (
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: property.latitude,
              longitude: property.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: property.latitude,
                longitude: property.longitude,
            }}
            title="Ubicación de la propiedad"
            description="Esta es la ubicación de la propiedad"
          />
        </MapView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No se pudo cargar la ubicación de la propiedad.
        </Text>
    )}
  </View>

        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity style={styles.moreInfoButton} onPress={goToSellerProfile}>
            <Text style={{ color: 'white', marginLeft: 10 }}>Perfil del vendedor</Text>
          </TouchableOpacity>
        </View>
        {/* Botón de "Me gusta" */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Icon
              name={liked ? 'bookmark' : 'bookmark-outline'}
              type="ionicon"
              size={20}
              color={liked ? 'gray' : 'gray'}
            />
            <Text style={{ color: liked ? 'grey' : 'gray', marginLeft: 10 }}>
              {liked ? 'Eliminar de gurdados' : 'Guardad Propiedad'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sección de contacto por WhatsApp */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
            <Icon name="whatsapp" type="font-awesome" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 10 }}>Contactar por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  contenedorIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 45,
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
  facilitiesContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  facilityText: {
    marginLeft: 10,
    color: 'slategray',
    fontSize: 15,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A95534',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});