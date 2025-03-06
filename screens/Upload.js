import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

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
            scrollEnabled={false} // Deshabilitar el desplazamiento del FlatList
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
  const initialPropertyState = {
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
    images: ["https://firebasestorage.googleapis.com/v0/b/autenticadordev.appspot.com/o/PropertiesImages%2Fcasa1.jpg?alt=media&token=171adc53-466e-44cc-9493-50cea330f588"],
  };

  const [property, setProperty] = useState(initialPropertyState);

  const handleChange = (field, value) => {
    setProperty({ ...property, [field]: value });
  };

  const handleSave = () => {
    Alert.alert("Guardando con éxito");
    setProperty(initialPropertyState); // Restablecer los inputs
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}> 
        <Text style={styles.saveButtonText}>Guardar Propiedad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#A95534", marginTop: 160 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
  disabledInput: { backgroundColor: "#f0f0f0", color: "gray" },
  button: { flexDirection: "row", alignItems: "center", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10, justifyContent: "space-between" },
  options: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "white" },
  optionItem: { padding: 10 },
  separator: { height: 1, backgroundColor: "#ccc" },
  saveButton: { borderWidth: 2, borderColor: "#A95534", padding: 10, borderRadius: 5, alignItems: "center", backgroundColor: "#A95534", marginTop: 10 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default AddPropertyScreen;