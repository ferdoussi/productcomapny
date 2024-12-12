import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginPage/login/LoginScreen';
import Home from './HomeScreen';
import User from './user'
import Technicien from './technicien'
import Marketplace from './component/Marketplace';
import PageDetails from './component/pageDetails'
const Stack = createStackNavigator();
const AppNavigator = () => {


  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Stack.Screen name="ClientHome" component={User}   options={{ headerShown: false }}/>
        <Stack.Screen name="TechnicienHome" component={Technicien} options={{ headerShown: false }}/>
        <Stack.Screen name="PageDetails" component={PageDetails}  options={{ headerShown: false }}/>
        <Stack.Screen name="Marketplace" component={Marketplace} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    
  );
};

export default App;
