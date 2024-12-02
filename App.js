import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// These commented sections are for the project as it was before changes.

import AboutScreen from './screens/AboutScreen';
import HomeScreen from './screens/HomeScreen';
// import MainScreen from './screens/MainScreen';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} 
          options={{ 
            title: "Currency Converter",
            // onClick for this button is set within the useEffect of the HomeScreen
            headerRight: () => <Button title='About' />
          }}
        />
        {/* <Stack.Screen
          name="MainScreen"
          component={MainScreen} 
          options={{ 
            title: "Main",
            // onClick for this button is set within the useEffect of the MainScreen
            headerRight: () => <Button title='About' />
          }}
        /> */}
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen} 
          options={{ title: "About" }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

