import React from 'react';
import { TouchableOpacity, ImageBackground, Text, View, StyleSheet } from 'react-native';

const PropertyCard = (props) => {
  // Extraer los datos de las props
  const { image, image2,title, price, reviews, status,description,location,bathrooms,rooms,parking, onPress } = props;

  return (
    <TouchableOpacity style={styles.contenedorImage} onPress={onPress}>
      <ImageBackground source={image} style={styles.estiloImagenes} imageStyle={{ borderRadius: 20 }}>
        {/* Contenido dentro de la imagen */}
        <Text style={styles.textoSale}>{status}</Text>

        <View style={styles.contenedorInfor}>
          <View>
            <Text style={styles.textoInfo}>{title}</Text>
          </View>

          <View>
            <Text style={styles.textoInfo}>{price}</Text>
            <View style={styles.contenedorReview}>
              <Text style={styles.textoInfo}>{reviews} Reviews</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Estilos 
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
        backgroundColor:'#A95534',
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

export default PropertyCard;