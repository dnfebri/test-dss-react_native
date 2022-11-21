import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Products');
    }, 3000)
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.logo}>LOGO</Text>
      <Text style={{fontSize:21, color:"#000"}}>Welcome</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  logo:{
    margin:10,
    color:"#000",
    fontSize:55,
    fontWeight:"bold",
  }
})