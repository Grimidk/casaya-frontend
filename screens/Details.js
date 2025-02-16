import React, {Component} from 'react'
import { Text, StyleSheet, View ,StatusBar,SafeAreaView,Image,ImageBackground,ScrollView} from 'react-native'
import {Icon} from '@rneui/themed';


export default function Details({route}){
    const{property}=route.params; //Se obtiene la propiedad seleccionada
    
    return (
      <SafeAreaView style= {{flex:1, backgroundColor: 'white'}}>
        <StatusBar translucent backgroundColor = "rgba(0,0,0,0)"/>
        <View style={{height:400}}>
          <ImageBackground source={require('../assets/image4.jpg')} resizeMode='cover' style={{height:400}}></ImageBackground>
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
          <Text style={styles.description}> Descripcion</Text>
          <Text style={styles.textDescription}>{property.description}</Text>
        </View>

        {/* Seccion facilidades */}
        <View style={styles.contenedorFacilities}>
          <View style={styles.card}>
            <Icon name='car' type='font-awesome' size={20} color={"gray"} style={{marginTop:10}}/>
            <Text style={{color:'slategray', fontSize:15, textAlign:'center'}}>Puestos</Text>
          </View>

          <View style={styles.card}>
            <Icon name='camera' type='font-awesome' size={20} color={"gray"} style={{marginTop:10}}/>
            <Text style={{color:'slategray', fontSize:15, textAlign:'center'}}>CCTV</Text>
          </View>

          <View style={styles.card}>
            <Icon name='user-secret' type='font-awesome' size={20} color={"gray"} style={{marginTop:10}}/>
            <Text style={{color:'slategray', fontSize:15, textAlign:'center'}}>Seguridad</Text>
          </View>

          <View style={styles.card}>
            <Icon name='minus' type='font-awesome' size={20} color={"gray"} style={{marginTop:10}}/>
            <Text style={{color:'slategray', fontSize:15, textAlign:'center'}}>AC</Text>
          </View>
        </View>

        </ScrollView>
      </SafeAreaView>
    )
  
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
  contenedorFacilities:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:20
  },
  card:{
    borderColor:'slategray',
    borderWidth:0.5,
    width:70,
    height: 60,
    borderRadius:12
  }
})