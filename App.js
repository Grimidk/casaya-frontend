import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Details from './screens/Details';
import userProfile from './screens/userProfile';
import SellerProfile from './screens/SellerProfile';
import BuyerProfile from './screens/BuyerProfile';


export default function App() {

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />    

      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="userProfile" component={userProfile} />
      <Stack.Screen name="SellerProfile" component={SellerProfile}/>
      <Stack.Screen name="BuyerProfile" component={BuyerProfile} />
    </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
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
