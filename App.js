import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import Home from './HomeScreen';
import User from './user'
import Technicien from './technicien'
const Stack = createStackNavigator();

const AppNavigator = () => {


  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Screen', headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ClientHome" component={User} />
        <Stack.Screen name="TechnicienHome" component={Technicien} />
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
