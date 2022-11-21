import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/Home'
import SplashScreen from '../pages/Splash'
import ProductsScreen from '../pages/Products'
import ProductsDetail from '../pages/ProductDetail';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductsDetail} options={{headerTitle: "Detail"}} />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})