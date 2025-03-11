import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const savedProperties = [
  require('../assets/casa9.jpg'),
  require('../assets/casa8.jpg'),
  require('../assets/casa7.jpg'),
  require('../assets/casa4.jpg'),
  require('../assets/casa5.jpg'),
  require('../assets/casa6.jpg'),
];

const BuyerProfile = () => {
  const route = useRoute();
  const { username } = route.params || {};
  const [status, setStatus] = useState('Buscando una Casa'); 
  const [viewedProperties, setViewedProperties] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    setViewedProperties(getRandomInt(10, 50));

    // Set userEmail and userPhone based on username
    switch (username) {
      case 'Ana Pérez':
        setUserEmail('ana.perez@email.com');
        setUserPhone('+58(414)1234567');
        setUserLocation('Caracas, La Trinidad');
        break;
      case 'Rodrigo Gonsalves':
        setUserEmail('rodrigo.gonsalves@email.com');
        setUserPhone('+58(412)9876543');
        setUserLocation('Caracas, Altamira');
        break;
      case 'María López':
        setUserEmail('maria.lopez@email.com');
        setUserPhone('+58(424)0987681');
        setUserLocation('La Guaira, Catia La Mar');
        break;
      default:
        setUserEmail('default.email@email.com');
        setUserPhone('+58(414)0000000');
        setUserLocation('Caracas, El Centro');
        break;
    }
  }, [username]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#A95534" /> 
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ backgroundColor: '#A95534', height: 228, width: '100%' }} />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../assets/profile1.jpg')} 
            resizeMode="contain" 
            style={styles.profileImage}
          />

          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.userEmail}>{userPhone}</Text>
          <Text style={styles.userEmail}>{userLocation}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{savedProperties.length}</Text>
              <Text style={styles.statLabel}>Propiedades Guardadas</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{viewedProperties}</Text>
              <Text style={styles.statLabel}>Propiedades Vistas</Text>
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Estado:</Text>
            <Text style={styles.statusText}>{status}</Text>
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
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A95534',
  },
  statusText: {
    fontSize: 16,
    color: '#555',
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

export default BuyerProfile;