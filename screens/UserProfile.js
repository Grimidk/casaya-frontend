import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropertyCard from "../components/PropertyCard";

const UserProfile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [storedUserId, setStoredUserId] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const auxUserId = await AsyncStorage.getItem("userId");
        setStoredUserId(auxUserId);

        if (!auxUserId || auxUserId === "null") {
          setIsLoggedIn(false);
          setIsGuest(true);
          return;
        }

        setIsLoggedIn(true);
        setIsGuest(false);

        // Fetch user data
        const userData = await fetchUserDataById(auxUserId);
        if (userData) {
          setUsername(userData.name);
          setUserEmail(userData.email);
          setUserPhone(userData.phone);
          setUserLocation(userData.location || "Ubicación no disponible");
        }

        // Fetch property data
        const properties = await fetchPropertyData(auxUserId);
        setPropertyData(properties);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const fetchUserDataById = async (userId) => {
    try {
      const response = await axios.get(
        `https://casaya-back-backup-production.up.railway.app/users/${userId}`
      );
      console.log(userId)
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  };

  const fetchPropertyData = async (userId) => {
    const response = await axios.get(`https://casaya-back-backup-production.up.railway.app/properties/${userId}`);
    return response.data;
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!isLoggedIn && isGuest) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#A95534" />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorMessage}>Estás en modo invitado</Text>
          <Button
            title="Ir a Iniciar Sesión"
            onPress={() => navigation.navigate("LoginScreen")}
            color="#A95534"
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#A95534" />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorMessage}>Debes iniciar sesión primero</Text>
          <Button
            title="Ir a Iniciar Sesión"
            onPress={() => navigation.navigate("LoginScreen")}
            color="#A95534"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#A95534" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header} />
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profile1.jpg")}
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
              <Text style={styles.statNumber}>
                {propertyData.length === 0 ? 0 : propertyData.length - 1}
              </Text>
              <Text style={styles.statLabel}>Vendidas</Text>
            </View>
          </View>
        </View>

        <View style={styles.galleryWrapper}>
          {loading ? (
            <Text>Cargando propiedades...</Text>
          ) : propertyData.length > 0 ? (
            <ScrollView>
              <View style={styles.container}>
                {propertyData.map((property) => (
                  <View key={property.id} style={styles.propertyWrapper}>
                    <PropertyCard
                      key={property.id}
                      image={{ uri: property.images[0] }}
                      title={property.name}
                      price={property.price}
                      reviews={property.reviews}
                      status={property.status}
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        navigation.navigate("Edit", { propertyData: property })
                      }
                    >
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text>El usuario no tiene propiedades publicadas</Text>
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButton}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#A95534",
    height: 228,
    width: "100%",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: "#A95534",
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    color: "#A95534",
    marginBottom: 20,
  },
  propertyWrapper: {
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#A95534",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;