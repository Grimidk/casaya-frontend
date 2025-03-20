import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios"; 
import { UserContext } from "../context/UserContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; 

const Dropdown = ({ label, items, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
    setExpanded(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={toggleExpanded}>
        <Text style={styles.text}>{selectedValue || label}</Text>
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

const AddPropertyScreen = () => {
  const { user } = useContext(UserContext);
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
    images: [],
  });

  const [userId, setUserId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]); // Local state for image preview

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else if (user) {
        setUserId(user.user_id);
      }
    };
    fetchUserId();
  }, [user]);

  const handleChange = (field, value) => {
    setProperty({ ...property, [field]: value });
  };

  // Function to pick images from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso denegado", "Se necesitan permisos para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri, name: `image_${Date.now()}.jpg` };
      setSelectedImages([...selectedImages, newImage]);
    }
  };

  // Function to delete an image
  const deleteImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  // Function to upload image to Firebase
  const uploadImage = async (fileUri, fileName) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `PropertiesImages/${fileName}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "No se ha podido identificar al usuario.");
      return;
    }

    // Upload images to Firebase and get URLs
    const uploadedImageURLs = [];
    for (const image of selectedImages) {
      const url = await uploadImage(image.uri, image.name);
      if (url) uploadedImageURLs.push(url);
    }

    const formattedProperty = {
      ...property,
      price: Number(property.price),
      bathrooms: Number(property.bathrooms),
      bedrooms: Number(property.bedrooms),
      parkingSpots: Number(property.parkingSpots),
      floors: Number(property.floors),
      floorNmr: Number(property.floorNmr),
      latitud: "0",
      longitud: "0",
      zone: "xxxxx",
      images: uploadedImageURLs.length > 0 ? uploadedImageURLs : property.images,
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
          images: [],
        });
        setSelectedImages([]); // Reset selected images
      } else {
        Alert.alert("Error", "No se pudo guardar la propiedad.");
      }
    } catch (error) {
      console.error("Error al guardar la propiedad:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo guardar la propiedad. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Propiedad</Text>

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

      {/* Image Picker Button */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Seleccionar Imágenes</Text>
      </TouchableOpacity>

      {/* Image Preview */}
      {selectedImages.length > 0 && (
        <FlatList
          horizontal
          data={selectedImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
              >
                <AntDesign name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
    marginTop:60,
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
    backgroundColor: "#A95534",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  imageButton: {
    backgroundColor: "#A95534",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
    marginBottom: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 5,
  },
});

export default AddPropertyScreen;
