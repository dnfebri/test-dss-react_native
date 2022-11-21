import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'

function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App