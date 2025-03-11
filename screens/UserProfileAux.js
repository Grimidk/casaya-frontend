import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

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

const UserProfileAux = ({ route }) => {
  const { userId } = route.params; 
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserDataById(userId);
      if (userData) {
        setUsername(userData.name);
        setUserEmail(userData.email);
        setUserPhone(userData.phone);
        setUserLocation(userData.location || 'Ubicación no disponible');
      }
      const properties = await fetchPropertyData(userId);
      setPropertyData(properties);
    };

    loadUserData();
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    const response = await fetch(`https://casaya-back-backup-production.up.railway.app/users/${userId}`);
    const data = await response.json();
    return data;
  };

  const fetchPropertyData = async (userId) => {
    const response = await axios.get(`https://casaya-back-backup-production.up.railway.app/properties`);
    return response.data;
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#A95534" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header} />

        <View style={styles.profileContainer}>
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
              <Text style={styles.statNumber}>{propertyData.length}</Text>
              <Text style={styles.statLabel}>Propiedades</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{propertyData.length - 1}</Text>
              <Text style={styles.statLabel}>Vendidas</Text>
            </View>
          </View>
        </View>

        <View style={styles.galleryWrapper}>
          <FlatList
            data={properties}
            keyExtractor={(item, index) => index.toString()}
            horizontal
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
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#A95534',
    height: 228,
    width: '100%',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
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
    flex: 1,
    paddingVertical: 8,
    flexDirection: "row",
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
  galleryWrapper: {
    flex: 1,
  },
  galleryContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  propertyContainer: {
    alignItems: "center",
    margin: 5,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: '#A95534',
    marginBottom: 20,
  },
  logoutButton: {
    color: '#A95534',
    fontWeight: 'bold',
  },
});

export default UserProfileAux;