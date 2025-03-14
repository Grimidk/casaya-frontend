import React, { useState, useContext } from 'react'; // Importa useState y useContext
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { UserContext } from '../context/UserContext'; // Importa UserContext

export default function Detalles({ route }) {
  const { property } = route.params; // Se obtiene la propiedad seleccionada
  const { user } = useContext(UserContext); // Obtener el estado del usuario
  const [liked, setLiked] = useState(false); // Estado para controlar si la propiedad está marcada como "Me gusta"

  const openWhatsApp = () => {
    const phoneNumber = property.number;
    const url = 'https://wa.me/' + phoneNumber;
    Linking.openURL(url).catch((err) => console.error('Error al abrir WhatsApp', err));
  };

  const handleLike = () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para marcar esta propiedad como favorita.');
      return;
    }

    // Cambia el estado de "Me gusta"
    setLiked(!liked);

    console.log('Propiedad marcada como favorita:', property.id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={{ height: 400 }}>
        <ImageBackground source={property.image2} resizeMode="cover" style={{ height: 400 }}></ImageBackground>
      </View>
      <ScrollView>
        {/* Sección de título */}
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>{property.title}</Text>
          <Text style={styles.textTitle}>{property.price}</Text>
        </View>

        {/* Sección de subtítulo */}
        <View style={styles.containerSubtitle}>
          <View style={styles.location}>
            <Icon name="bookmark-outline" type="ionicon" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.location}</Text>
          </View>

          <View style={styles.location}>
            <Icon name="star" type="font-awesome" size={20} color="#A95534" />
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.reviews} Reviews</Text>
          </View>
        </View>

        {/* Sección de iconos */}
        <View style={styles.contenedorIcons}>
          <View>
            <Icon name="bed" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}> {property.rooms} </Text>
          </View>

          <View>
            <Icon name="bath" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}>{property.bathrooms} </Text>
          </View>

          <View>
            <Icon name="car" type="font-awesome" size={20} color={'gray'} />
            <Text style={{ color: 'slategray', fontSize: 15 }}> {property.parking} </Text>
          </View>
        </View>

        {/* Sección descripción */}
        <View style={{ marginTop: 40, marginBottom: 40, paddingHorizontal: 20 }}>
          <Text style={styles.description}>Reseña </Text>
          <Text style={styles.textDescription}>{property.description}</Text>
        </View>

        {/* Sección facilidades */}
        <View style={styles.contenedorFacilities}>
          <View style={styles.card}>
            <Icon name="car" type="font-awesome" size={20} color={'gray'} style={{ marginTop: 10 }} />
            <Text style={{ color: 'slategray', fontSize: 15, textAlign: 'center' }}>Puestos</Text>
          </View>

          <View style={styles.card}>
            <Icon name="camera" type="font-awesome" size={20} color={'gray'} style={{ marginTop: 10 }} />
            <Text style={{ color: 'slategray', fontSize: 15, textAlign: 'center' }}>CCTV</Text>
          </View>

          <View style={styles.card}>
            <Icon name="user-secret" type="font-awesome" size={20} color={'gray'} style={{ marginTop: 10 }} />
            <Text style={{ color: 'slategray', fontSize: 15, textAlign: 'center' }}>Seguridad</Text>
          </View>

          <View style={styles.card}>
            <Icon name="minus" type="font-awesome" size={20} color={'gray'} style={{ marginTop: 10 }} />
            <Text style={{ color: 'slategray', fontSize: 15, textAlign: 'center' }}>AC</Text>
          </View>
        </View>

        {/* Botón de "Me gusta" */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Icon
              name={liked ? 'heart' : 'heart-o'} // Cambia el ícono si está marcado como favorito
              type="font-awesome"
              size={20}
              color={liked ? '#FF3B30' : 'gray'} // Cambia el color si está marcado como favorito
            />
            <Text style={{ color: liked ? '#FF3B30' : 'gray', marginLeft: 10 }}>
              {liked ? 'Quitar de favoritos' : 'Marcar como favorito'}
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
  contenedorFacilities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    borderColor: 'slategray',
    borderWidth: 0.5,
    width: 70,
    height: 60,
    borderRadius: 12,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
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