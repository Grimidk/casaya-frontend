import React, {Component} from 'react'
import { Text, StyleSheet, View ,StatusBar,SafeAreaView,Image,ImageBackground,ScrollView, TouchableOpacity, Linking} from 'react-native'
import {Icon} from '@rneui/themed';

;


export default function Detalles({route}){
    const { property } = route.params; //Se obtiene la propiedad seleccionada
    const openWhatsApp = () => {
      const phoneNumber = property.number;
      const url = 'https://wa.me/'+phoneNumber;
      Linking.openURL(url).catch(err => console.error('Error al abrir WhatsApp', err));
  };

    return (
      <SafeAreaView style= {{flex:1, backgroundColor: 'white'}}>
        <StatusBar translucent backgroundColor = "rgba(0,0,0,0)"/>
        <View style={{height:400}}>
          <ImageBackground source={property.image2} resizeMode='cover' style={{height:400}}></ImageBackground>
        </View>
        <ScrollView> 
          {/*Seccion de titulo*/}
          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>{property.title}</Text>
            <Text style={styles.textTitle}>{property.price}</Text>
          </View>

          {/*Seccion de subtitulo */}
          <View style={styles.containerSubtitle}>
            <View style={styles.location}>
              <Icon name='bookmark-outline' type='ionicon' size={20} color={'gray'}/>
              <Text style={{color:'slategray',fontSize:15}}>{property.location}</Text>
            </View> 
            
            <View style={styles.location}>
              <Icon name='star' type='font-awesome' size={20} color="#A95534"/>
              <Text style={{color:'slategray',fontSize:15}}>{property.reviews} Reviews</Text>
            </View> 
          </View>

          {/*Seccion de iconos */}
          <View style={styles.contenedorIcons}>
            <View>
              <Icon name='bed' type='font-awesome' size={20} color={'gray'}/>
              <Text style={{color:'slategray', fontSize:15}}> {property.rooms} </Text>
            </View>

            <View>
              <Icon name='bath' type='font-awesome' size={20} color={'gray'}/>
              <Text style= {{color:'slategray', fontSize:15}}>{property.bathrooms} </Text>
            </View>

            <View>
              <Icon name='car' type='font-awesome' size={20} color={'gray'}/>
              <Text style ={{color:'slategray', fontSize:15}}> {property.parking} </Text>
            </View>
          </View>

          {/*Seccion descripcion */}
          <View style={{marginTop:40, marginBottom: 40, paddingHorizontal:20}}>
            <Text style={styles.description}>Reseña </Text>
            <Text style={styles.textDescription}>{property.description}</Text>
          </View>

          {/* Sección facilidades */}
          <View style={styles.facilitiesContainer}>
            <View style={styles.facilityItem}>
              <Icon name='car' type='font-awesome' size={20} color={"gray"} />
              <Text style={styles.facilityText}>Puestos</Text>
            </View>

            <View style={styles.facilityItem}>
              <Icon name='camera' type='font-awesome' size={20} color={"gray"} />
              <Text style={styles.facilityText}>CCTV</Text>
            </View>

            <View style={styles.facilityItem}>
              <Icon name='user-secret' type='font-awesome' size={20} color={"gray"} />
              <Text style={styles.facilityText}>Seguridad</Text>
            </View>

            <View style={styles.facilityItem}>
              <Icon name='minus' type='font-awesome' size={20} color={"gray"} />
              <Text style={styles.facilityText}>AC</Text>
            </View>
          </View>

          {/* Sección de contacto por WhatsApp */}
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
              <Icon name='whatsapp' type='font-awesome' size={20} color='white' />
              <Text style={{ color: 'white', marginLeft: 10 }}>Contactar por WhatsApp</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  containerTitle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom:5
  },
  textTitle:{
    fontSize:20,
    fontWeight: 'bold',
  },

  containerSubtitle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20
  },
  location:{
    flexDirection:'row'
  },
  contenedorIcons:{
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal:20,
    marginTop:45
  },
  description:{
    fontWeight:'bold',
    fontSize:20
  },
  textDescription:{
    fontSize:15,
    color:'slategray',
    marginTop:5
  },
  facilitiesContainer:{
    paddingHorizontal:20,
    marginVertical: 20
  },
  facilityItem:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  facilityText:{
    marginLeft: 10,
    color:'slategray',
    fontSize:15,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  }
})