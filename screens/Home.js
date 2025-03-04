
import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Cargar propiedades 
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://casaya-back-backup-production.up.railway.app/properties'); 
        setFilteredProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  const searchProperty = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = filteredProperties.filter(property => 
        property.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(filteredProperties);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={"#fff"} barStyle={"dark-content"} />
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Buscar por ciudad..." 
          onChangeText={searchProperty} 
          value={searchQuery}
        />
      </View>

      {loading ? (
        <Text>Cargando propiedades...</Text>
      ) : (
        <>
          <Text style={styles.result}> {filteredProperties.length} Resultados Encontrados</Text>
          <ScrollView>
            <View style={styles.container}>
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={{ uri: property.images[0] }}  //toma la primera imagen del array
                title={property.name}
                price={property.price}
                reviews={property.reviews}
                status={property.status}
                onPress={() => { navigation.navigate('Detalles', { property }); }}
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
    borderRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'slategray',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
  

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