import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    console.log('User ID:', userId); // Depuración
    return userId;
  } catch (error) {
    console.error('Error retrieving userId:', error);
    return null;
  }
};

export const getPropertyId = async () => {
  try {
    const propertyId = await AsyncStorage.getItem('property_id');
    console.log('Property ID:', propertyId); 
    return propertyId;
  } catch (error) {
    console.error('Error retrieving propertyId:', error);
    return null;
  }
};
