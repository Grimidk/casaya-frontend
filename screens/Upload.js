import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

// Componente reutilizable Dropdown
const Dropdown = ({ label, items, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  return (
    <View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={toggleExpanded}>
        <Text style={styles.text}>{label}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={16} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.options}>
          <FlatList
            keyExtractor={(item) => item.value}
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionItem}
                onPress={() => {
                  onSelect(item.value);
                  setExpanded(false);
                }}
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
  const [property, setProperty] = useState({
    title: "",
    price: "",
    reviews: "",
    status: "",
    description: "",
    city: "Caracas",
    municipality: "",
    bathrooms: "",
    rooms: "",
    parking: "",
    numberCode: "0424", // Código de área por defecto
    number: "",
    images: [],
  });

  const handleChange = (field, value) => {
    setProperty({ ...property, [field]: value });
  };

  // Seleccionar imágenes
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProperty({ ...property, images: [...property.images, result.assets[0].uri] });
    }
  };

  // Eliminar imagen
  const removeImage = (index) => {
    const newImages = property.images.filter((_, i) => i !== index);
    setProperty({ ...property, images: newImages });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Propiedad</Text>

      <TextInput style={styles.input} placeholder="Título" onChangeText={(text) => handleChange("title", text)} />
      <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" onChangeText={(text) => handleChange("price", text)} />

      <Dropdown
        label="Selecciona el estado"
        items={[
          { label: "Disponible", value: "disponible" },
          { label: "Alquiler", value: "alquiler" },
          { label: "Remate", value: "remate" },
        ]}
        onSelect={(value) => handleChange("status", value)}
      />

      <TextInput style={styles.input} placeholder="Descripción" multiline onChangeText={(text) => handleChange("description", text)} />
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

      {/* Dropdown para código de área */}
      <Dropdown
        label={`Código de área: ${property.numberCode}`}
        items={[
          { label: "0424", value: "0424" },
          { label: "0414", value: "0414" },
          { label: "0412", value: "0412" },
          { label: "0212", value: "0212" },
        ]}
        onSelect={(value) => handleChange("numberCode", value)}
      />

      {/* Campo para el número de teléfono (solo 7 dígitos) */}
      <TextInput
        style={styles.input}
        placeholder="Número de teléfono"
        keyboardType="numeric"
        maxLength={7}
        onChangeText={(text) => handleChange("number", text)}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Seleccionar Imágenes</Text>
      </TouchableOpacity>

      <View style={styles.imagePreview}>
        {property.images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button title="Guardar Propiedad" onPress={() => Alert.alert("Guardando...")} color="#A95534" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#A95534", marginTop:"160" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
  disabledInput: { backgroundColor: "#f0f0f0", color: "gray" },
  imageButton: { backgroundColor: "#A95534", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 10 },
  imageButtonText: { color: "white", fontSize: 16 },
  imagePreview: { flexDirection: "row", flexWrap: "wrap" },
  imageContainer: { position: "relative", margin: 5 },
  image: { width: 80, height: 80, borderRadius: 5 },
  deleteButton: { position: "absolute", top: -5, right: -5, backgroundColor: "#A95534", borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  deleteButtonText: { color: "white", fontSize: 12, fontWeight: "bold" },
  button: { flexDirection: "row", alignItems: "center", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10, justifyContent: "space-between" },
  options: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "white" },
  optionItem: { padding: 10 },
  separator: { height: 1, backgroundColor: "#ccc" }
});

export default AddPropertyScreen;
