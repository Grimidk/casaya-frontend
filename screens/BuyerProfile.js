import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';

const savedProperties = [
  require('../assets/casa10.jpg'),
  require('../assets/casa11.jpg'),
  require('../assets/casa12.jpg'),
  require('../assets/casa13.jpg'),
  require('../assets/casa14.jpg'),
  require('../assets/casa15.jpg'),
  require('../assets/casa16.jpg'),
  require('../assets/casa17.jpg'),
  require('../assets/casa18.jpg'),
];

const buyerProfile = () => {
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
          source={require('../assets/profile2.jpg')} 
          resizeMode="contain" 
          style={styles.profileImage}
        />

        <Text style={styles.userName}>Maria Gonzalez</Text>
        <Text style={styles.userEmail}>maria.gonzalez@email.com</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>58</Text>
            <Text style={styles.statLabel}>Saved Listings</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Viewed</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 0 }}>
        {/* Display saved properties in a 3x3 grid */}
        <FlatList
          data={savedProperties}
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
});

export default buyerProfile;
