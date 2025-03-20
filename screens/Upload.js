import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios"; 
import { UserContext } from "../context/UserContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";


const Dropdown = ({ label, items, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // Estado para el valor seleccionado
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  

  const handleSelect = (value) => {
    setSelectedValue(value); // Actualizar el valor seleccionado
    onSelect(value); // Llamar la función onSelect pasada desde el componente padre
    setExpanded(false); // Cerrar el dropdown
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={toggleExpanded}>
        <Text style={styles.text}>{selectedValue || label}</Text> {/* Mostrar el valor seleccionado o el label */}
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={16} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.options}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.value}
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionItem}
                onPress={() => handleSelect(item.value)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      )}
    </View>
  );
};

const AddPropertyScreen = ({ navigation }) => {
  const { user } = useContext(UserContext); // Obtener usuario desde el contexto
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isGuest, setIsGuest] = useState(false); // Define isGuest state
  const [userId, setUserId] = useState(null); // Nuevo estado para manejar el userId

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const auxUserId = await AsyncStorage.getItem("userId");
        setUserId(auxUserId);

        if (!auxUserId || auxUserId === "null") {
          setIsLoggedIn(false);
          setIsGuest(true);
          return;
        }

        setIsLoggedIn(true);
        setIsGuest(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    loadUserData();
  }, [user]);

  const [property, setProperty] = useState({
    name: "",
    price: "",
    status: "",
    description: "",
    city: "Caracas",
    municipality: "",
    bathrooms: "",
    bedrooms: "",
    parkingSpots: "",
    floors: "",
    isApartment: false,
    floorNmr: "",
    latitud: 0,
    longitud: 0,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/autenticadordev.appspot.com/o/PropertiesImages%2Fcasa1.jpg?alt=media&token=171adc53-466e-44cc-9493-50cea330f588",
    ],
  });

  const handleChange = (field, value) => {
    setProperty({ ...property, [field]: value });
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "No se ha podido identificar al usuario.");
      return;
    }

    let latitud = "0";
    let longitud = "0";

    if (property.municipality === "libertador") {
      latitud = "10.48801";
      longitud = "-66.87919";
    } else if (property.municipality === "baruta") {
      latitud = "10.42971";
      longitud = "-66.87088";
    } else if (property.municipality === "chacao") {
      latitud = "10.49606";
      longitud = "-66.85312";
    } else if (property.municipality === "el_hatillo") {
      latitud = "10.42472";
      longitud = "-66.83096";
    } else if (property.municipality === "sucre") {
      latitud = "10.49596";
      longitud = "-66.81827";
    } else {
    }

    // Convert values to numbers before sending
    const formattedProperty = {
      ...property,
      price: Number(property.price),
      bathrooms: Number(property.bathrooms),
      bedrooms: Number(property.bedrooms),
      parkingSpots: Number(property.parkingSpots),
      floors: Number(property.floors),
      floorNmr: Number(property.floorNmr),
      latitud,
      longitud,
      zone: "xxxxx",
    };

    const requiredFields = ["name", "price", "status", "description", "municipality", "bathrooms", "bedrooms", "parkingSpots", "floors"];
    for (const field of requiredFields) {
      if (!formattedProperty[field]) {
        Alert.alert("Error", `El campo "${field}" es obligatorio.`);
        return;
      }
    }

    try {
      console.log("Enviando propiedad:", formattedProperty);
      const response = await axios.post(
        `https://casaya-back-backup-production.up.railway.app/properties/${userId}`, 
        formattedProperty
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Éxito", "Propiedad guardada con éxito.");
        setProperty({
          name: "",
          price: "",
          status: "",
          description: "",
          city: "Caracas",
          municipality: "",
          bathrooms: "",
          bedrooms: "",
          parkingSpots: "",
          floors: "",
          isApartment: false,
          floorNmr: "",
          latitud: "",
          longitud: "",
          zone: "",
          images: [
            "https://firebasestorage.googleapis.com/v0/b/autenticadordev.appspot.com/o/PropertiesImages%2Fcasa1.jpg?alt=media&token=171adc53-466e-44cc-9493-50cea330f588",
          ],
        });
      } else {
        Alert.alert("Error", "No se pudo guardar la propiedad.");
      }
    } catch (error) {
      console.error("Error al guardar la propiedad:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo guardar la propiedad. Inténtalo de nuevo más tarde.");
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
   
     if (!isLoggedIn && isGuest) {
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingresa los datos</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={property.name} onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" value={property.price} onChangeText={(text) => handleChange("price", text)} />

      <Dropdown
        label="Selecciona el estado"
        items={[
          { label: "Disponible", value: "disponible" },
          { label: "Alquiler", value: "alquiler" },
          { label: "Remate", value: "remate" },
        ]}
        onSelect={(value) => handleChange("status", value)}
      />

      <TextInput style={styles.input} placeholder="Descripción" multiline value={property.description} onChangeText={(text) => handleChange("description", text)} />
      <TextInput style={[styles.input, styles.disabledInput]} value="Caracas" editable={false} />

      <Dropdown
        label="Selecciona el municipio"
        items={[
          { label: "Libertador", value: "libertador" },
          { label: "Baruta", value: "baruta" },
          { label: "Chacao", value: "chacao" },
          { label: "El Hatillo", value: "el_hatillo" },
          { label: "Sucre", value: "sucre" },
        ]}
        onSelect={(value) => handleChange("municipality", value)}
      />

      <TextInput style={styles.input} placeholder="Baños" keyboardType="numeric" value={property.bathrooms} onChangeText={(text) => handleChange("bathrooms", text)} />
      <TextInput style={styles.input} placeholder="Habitaciones" keyboardType="numeric" value={property.bedrooms} onChangeText={(text) => handleChange("bedrooms", text)} />
      <TextInput style={styles.input} placeholder="Puestos de estacionamiento" keyboardType="numeric" value={property.parkingSpots} onChangeText={(text) => handleChange("parkingSpots", text)} />
      <TextInput style={styles.input} placeholder="Número de pisos" keyboardType="numeric" value={property.floors} onChangeText={(text) => handleChange("floors", text)} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Propiedad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
  options: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionItem: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  disabledInput: {
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: '#58A9FF',
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
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
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AddPropertyScreen;