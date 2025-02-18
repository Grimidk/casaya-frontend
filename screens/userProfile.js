
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, Image, TouchableOpacity, FlatList  } from 'react-native';

const properties = [
   require('../assets/casa1.jpg'),
   require('../assets/casa2.jpg'),
   require('../assets/casa3.jpg'),
   require('../assets/casa4.jpg'),
   require('../assets/casa5.jpg'),
   require('../assets/casa6.jpg'),
   require('../assets/casa7.jpg'),
   require('../assets/casa8.jpg'),
   require('../assets/casa9.jpg'),
 ];

const userProfile = () => {
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
   <StatusBar backgroundColor="#A95534" />
   <View
     style={{
       backgroundColor: '#A95534',
       height: 228,
       width: '100%',
     }}
   />

<View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={require('../assets/profile1.jpg')} 
        resizeMode="contain" 
        style={{
          height: 155,
          width: 155,
          borderRadius: 999,
          borderColor: '#A95534',
          borderWidth: 2,
          marginTop: -90,
        }}
      />

      <Text style={{
         color: "#A69D9D",
         marginVertical: 8
      }}> Armando Casas</Text>
      <Text style= {{
         color: "#A69D9D",
      }}>
         armando.casas@gmail.com
      </Text>
      

      <View style= {{
         flex:1,
         paddingVertical: 8,
         flexDirection: "row"

      }}>
         <View style= {{
            flexDirection:"column",
            alignItems: "center",
            marginHorizontal: 10

         }}> <Text style={{
            color: "#A95534",
            fontSize: 55,
         }}> 122</Text>
         <Text style={{
            color: "#A69D9D"
         }}> Propiedades</Text>

         </View>
         <View style= {{
            flexDirection:"column",
            alignItems: "center",
            marginHorizontal: 10

         }}> <Text style={{
            color: "#A95534",
            fontSize: 55,
         }}> 67</Text>
         <Text style={{
            color: "#A69D9D"
         }}> Vendidas</Text>

         </View>
      </View>
    </View>
    <View style={{ flex: 0 }}>
    {/* Galería de propiedades en Matriz 3x3 */}
    <FlatList
  data={properties}
  keyExtractor={(item, index) => index.toString()}
  numColumns={3} // 3 columnas
  renderItem={({ item }) => (
    <View style={styles.propertyContainer}>
      <Image source={item} style={styles.propertyImage} />
    </View>
  )}
  contentContainerStyle={styles.galleryContainer}
/>
</View>

 </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  statsContainer: {
   flexDirection: 'row',
   paddingVertical: 8,
 },
 stat: {
   flexDirection: 'column',
   alignItems: 'center',
   marginHorizontal: 10,
 },
 statNumber: {
   color: '#A95534',
   fontSize: 55,
 },
 statLabel: {
   color: '#A69D9D',
   fontSize: 14,
 },
 galleryContainer: {
   paddingBottom: 20,
   paddingHorizontal: 10,
   justifyContent: "center",
 },
 propertyContainer: {
   flex: 1,
   alignItems: "center",
   margin: 5, // Espacio entre imágenes
 },
 propertyImage: {
   width: 100,  // Tamaño uniforme
   height: 100,
   borderRadius: 8,
 },
 
}); 


export default userProfile; 
