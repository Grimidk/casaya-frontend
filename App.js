import React from 'react';
import { StyleSheet, Image } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Usando Ionicons de @expo/vector-icons
import Home from './screens/Home';
import Detalles from './screens/Detalles';
import userProfile from './screens/userProfile'; 
import welcome from './screens/welcome';
import splashScreen from './screens/splashScreen';
import Favorites from './screens/Favorites';
import Upload from './screens/Upload';
import LoginScreen from './screens/LoginScreen';
import Edit from './screens/Edit'
import { UserContext, UserProvider } from './context/UserContext';
import { View } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Cambiado a true para mostrar el header
        headerRight: () => (
          
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          
        ),
        headerStyle:{
          backgroundColor:'#A95534'
        },
        headerTintColor:'white',
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detalles" component={Detalles} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Edit" component={Edit} /> 
    </Stack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = 'home-outline';
          } else if (route.name === "Favorites") {
            iconName = 'heart-outline';
          } else if (route.name === "Perfil") {
            iconName = 'person-outline';
          } else if (route.name === "Upload") {
            iconName = 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown:false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Perfil" component={userProfile} /> 
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splashScreen" component={splashScreen} />
          <Stack.Screen name="welcome" component={welcome} /> 
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Edit" component={Edit}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});