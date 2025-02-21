import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Crea tu anuncio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default UploadScreen;