import React, { Component } from 'react'
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


export default function Home(props)   {
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
        
        <TextInput placeholder="espacio de busq" />
      </View>

      <Text style={styles.result}>50 Resultados Encontrados</Text>
      {/* la lista de las imagenes */}
      <ScrollView>
        <TouchableOpacity style={styles.contenedorImage} 
        onPress={()=>props.navigation.navigate('Detail')}>
          
          <ImageBackground source={require('../assets/image3.jpg')} 
          style={styles.estiloImagenes} imageStyle={{borderRadius:20}} > 
          {/* contenido dentro de la imagen */}
            <Text style={styles.textoSale}>For Sale</Text>

            <View style={styles.contenedorInfor}>
              <View>
                <Text style={styles.textoInfo}>Day House</Text>

              </View>

              <View>
                <Text style={styles.textoInfo}>$3.500.00</Text>
                <View style={styles.contenedorReview}>
                  
                  <Text style={styles.textoInfo}>4.5 Reviews</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.contenedorImage}>
          <ImageBackground source={require('../assets/image1.jpg')} 
          style={styles.estiloImagenes} 
          imageStyle={{borderRadius:20}}> 
            {/* contenido dentro de la imagen */}
            <Text style={styles.textoSale}>For Sale</Text>
            <View style={styles.contenedorInfor}>
              <View>
                <Text style={styles.textoInfo}>Bill House</Text>

              </View>

              <View>
                <Text style={styles.textoInfo}>$2.500.00</Text>
                <View style={styles.contenedorReview}>
                  
                  <Text style={styles.textoInfo}>4.2 Reviews</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contenedorImage}>
          <ImageBackground source={require('../assets/image4.jpg')}
           style={styles.estiloImagenes} 
           imageStyle={{borderRadius:20}}> 
           {/* contenido dentro de la imagen */}
           <Text style={styles.textoSale}>For Sale</Text>

           <View style={styles.contenedorInfor}>
              <View>
                <Text style={styles.textoInfo}>Clint Villa</Text>

              </View>

              <View>
                <Text style={styles.textoInfo}>$5.500.00</Text>
                <View style={styles.contenedorReview}>
                  
                  <Text style={styles.textoInfo}>4.0 Reviews</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
    backgroundColor:'#00CCFF',
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
})