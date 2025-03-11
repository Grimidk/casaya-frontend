import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const properties = [
    require('../assets/casa1.jpg'),
    require('../assets/casa2.jpg'),
    require('../assets/casa3.jpg'),
    require('../assets/casa4.jpg'),
    require('../assets/casa5.jpg'),
    require('../assets/casa6.jpg'),
];

const reviews = [
    { id: '1', reviewer: 'Ana Pérez', rating: 5, comment: 'Excelente vendedor, muy confiable.' },
    { id: '2', reviewer: 'Rodrigo Gonsalves', rating: 4, comment: 'Buena experiencia, respondió rápido.' },
    { id: '3', reviewer: 'María López', rating: 3, comment: 'La propiedad no estaba como en las fotos.' },
];

const SellerProfile = ({ route }) => {
  const { sellerLocation, sellerNumber } = route.params || {};
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#A95534" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
            style={styles.profileImage}
          />

          <Text style={styles.userName}>Luis Jiménez</Text>
          <Text style={styles.userEmail}>{sellerNumber}</Text> {/* Display phone number */}
          <Text style={styles.userEmail}>{sellerLocation}</Text> {/* Display location */}

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Propiedades</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Vendidas</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 0 }}>
          {/* Display listed properties in a 3x3 grid */}
          <FlatList
            data={properties}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.propertyContainer}>
                <Image source={item} style={styles.propertyImage} />
              </View>
            )}
            contentContainerStyle={styles.galleryContainer}
          />
        </View>

        {/* Display reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Comentarios</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <TouchableOpacity onPress={() => navigation.navigate('BuyerProfile', { username: item.reviewer })}>
                  <Text style={styles.reviewerName}>{item.reviewer}</Text>
                </TouchableOpacity>
                <Text style={styles.reviewText}>{item.rating}⭐</Text>
                <Text style={styles.reviewText}>{item.comment}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: '#A95534',
    borderWidth: 2,
    marginTop: -90,
  },
  userName: {
    color: "#A69D9D",
    marginVertical: 8,
    fontSize: 22,
  },
  userEmail: {
    color: "#A69D9D",
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  statNumber: {
    color: "#A95534",
    fontSize: 55,
  },
  statLabel: {
    color: "#A69D9D",
  },
  galleryContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  propertyContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  reviewsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#A95534",
  },
  reviewCard: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A95534",
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
  }
});

export default SellerProfile;