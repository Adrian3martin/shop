import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './screens/HomeScreen';
import  ProductsScreen from './screens/ProductsScreen';
import  ProductDetail from './screens/ProductDetail';
import  ProfileScreen from './screens/ProfileScreen';
import  CartScreen from './screens/CartScreen';


const Main = createNativeStackNavigator();

const AppNavigator = () => {
  
  return (
    <NavigationContainer>
      <Main.Navigator 
      screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: 'white'
          },
          headerTintColor: 'black',
          animationEnabled: false,
        })}
      initialRouteName="ProfileScreen"
      >
        <Main.Screen name="Home" component={HomeScreen} />
        <Main.Screen name="Products" component={ProductsScreen} />
        <Main.Screen name="ProductDetail" component={ProductDetail} />
        <Main.Screen name="ProfileScreen" component={ProfileScreen} />
        <Main.Screen name="CartScreen" component={CartScreen} />
      </Main.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;
