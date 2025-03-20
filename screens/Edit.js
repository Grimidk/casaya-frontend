import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AntDesign } from "@expo/vector-icons";

const Dropdown = ({ label, items, onSelect, initialValue }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] =useState(initialValue || "");
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

const EditPropertyScreen = ({ route, navigation }) => {
  const { propertyData } = route.params; // Recibir el property seleccionado desde UserProfile
  const { user } = useContext(UserContext);
  const [property, setProperty] = useState(propertyData); // Inicializar con la propiedad pasada
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setProperty({ ...property, [field]: value });
  };

  const propertyId = property.property_id
  
  const handleUpdate = async () => {
    if (!property || !propertyId) {
      console.log(propertyId)
      Alert.alert("Error", "Falta información necesaria para actualizar la propiedad.");
      return;
    }



    try {
      setLoading(true);
      const userId = user?.user_id; // Obtener el user ID desde el contexto
      console.log(userId)
      if (!userId) {
        Alert.alert("Error", "El usuario no está autenticado.");
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `https://casaya-back-backup-production.up.railway.app/properties/${userId}/${propertyId}`,
        property
      );

      if (response.status === 200 || response.status === 204) {
        Alert.alert("Éxito", "Propiedad actualizada con éxito.");
        navigation.goBack(); // Regresar a la pantalla anterior
      } else {
        console.log(propertyId,userId)
        Alert.alert("Error", "No se pudo actualizar la propiedad.");
      }
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo actualizar la propiedad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return <Text>Error al cargar la propiedad.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Propiedad</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={property.name} onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" value={String(property.price)} onChangeText={(text) => handleChange("price", text)} />

      <Dropdown
        label="Selecciona el estado"
        items={[
          { label: "Disponible", value: "disponible" },
          { label: "Alquiler", value: "alquiler" },
          { label: "Remate", value: "remate" },
        ]}
        onSelect={(value) => handleChange("status", value)}
        initialValue={property.status}
      />

      <TextInput style={styles.input} placeholder="Descripción" multiline value={property.description} onChangeText={(text) => handleChange("description", text)} />

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
        initialValue={property.municipality}
      />

      <TextInput style={styles.input} placeholder="Baños" keyboardType="numeric" value={String(property.bathrooms)} onChangeText={(text) => handleChange("bathrooms", text)} />
      <TextInput style={styles.input} placeholder="Habitaciones" keyboardType="numeric" value={String(property.bedrooms)} onChangeText={(text) => handleChange("bedrooms", text)} />
      <TextInput style={styles.input} placeholder="Puestos de estacionamiento" keyboardType="numeric" value={String(property.parkingSpots)} onChangeText={(text) => handleChange("parkingSpots", text)} />
      <TextInput style={styles.input} placeholder="Latitud" keyboardType="default" value={String(property.latitud)} onChangeText={(text) => handleChange("latitud", text)} />
      <TextInput style={styles.input} placeholder="Longitud" keyboardType="default" value={String(property.longitud)} onChangeText={(text) => handleChange("longitud", text)} />


      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={loading}>
        <Text style={styles.saveButtonText}>
          {loading ? "Actualizando..." : "Actualizar Propiedad"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:40
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
  saveButton: {
    backgroundColor: "#58A9FF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EditPropertyScreen;