import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import PropertyCard from '../components/PropertyCard';
import { PropertyService } from '../services/property.service';

const properties = [
  {
    id: 1,
    image: require('../assets/image1.jpg'),
    image2: require('../assets/image4.jpg'),
    title: 'Casa en la playa',
    price: '$500,000',
    reviews: '4.8',
    status: ' Venta',
    description: 'Casa lujosa en la playa con vista al mar.',
    location: 'Margarita, Pampatar',
    bathrooms:'2',
    rooms: '2',
    parking:'1',
    number:'+584241818540'
  },
  {
    id: 2,
    image: require('../assets/image2.jpg'),
    image2: require('../assets/image5.jpeg'),
    title: 'Casa en la ciudad',
    price: '$150,000',
    reviews: '4.5',
    status: 'Remate',
    description: 'Casa moderna alejada del centro de la ciudad.',
    location: 'Caracas, La Miranda',
    bathrooms:'2',
    rooms: '3',
    parking:'2',
    number:'+584241818540'
  },
  {
    id: 3,
    image: require('../assets/image3.jpg'),
    image2: require('../assets/image6.jpg'),
    title: 'Chalet en las montañas',
    price: '$700,000',
    reviews: '4.9',
    status: ' Venta',
    description: 'Chalet acogedor en las montañas con vistas impresionantes.',
    location: 'Caracas, La Lagunita',
    bathrooms:'3',
    rooms: '4',
    parking:'2',
    number:'+584241818540'
  },
];

export default function Home({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const searchProperty = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = properties.filter(property => 
        property.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        translucent={false}
        backgroundColor={"#fff"}
        barStyle={"dark-content"}
      />
      <View style={styles.header}>
        <Text style={styles.textoProfile}>Buscar Propiedad</Text>
        <Image
          source={require("../assets/profile1.jpg")}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Buscar por ciudad..." 
          onChangeText={searchProperty} 
          value={searchQuery}
        />
      </View>

      <Text style={styles.result}> {filteredProperties.length} Resultados Encontrados</Text>
      {/* la lista de las imagenes */}
      <ScrollView>
        <View style={styles.container}>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image}
              title={property.title}
              price={property.price}
              reviews={property.reviews}
              status={property.status} 
              onPress={() => {navigation.navigate('Details', { property });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    paddingVertical:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
    paddingHorizontal:20
  },
  profileImage:{
    width:50,
    height:50,
    borderRadius:50
  },
  textoProfile:{
    fontSize:22,
    fontWeight:'bold'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:30,
    borderBottomWidth:0.5,
    borderBottomColor:'slategray'
  },
  result:{
    fontSize:18,
    fontWeight:'bold',
    paddingHorizontal:20
  },

  estiloImagenes:{
    height:230,
  },
  contenedorImage:{
   margin:20
  },
  textoSale:{
    color:'white',
    backgroundColor:'#58A9FF',
    height:30,
    width:70,
    borderRadius:20,
    marginTop:10,
    marginLeft:10,
    paddingLeft:10,
    paddingTop:5,
    fontWeight:'bold'
  },
  contenedorInfor:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'flex-end',

    margin:20
  },
  textoInfo:{
    color:'white',
    fontWeight:'800',
    fontSize:16,
  },
  contenedorReview:{
    flexDirection:'row',
  }
});