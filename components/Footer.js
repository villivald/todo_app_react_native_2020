import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

const Footer = () => {
  return (
    <View style={styles.footer}>
      <AntDesign name="filter" size={24} color="black" />
      <MaterialIcons name="favorite-border" size={24} color="black" />
      <FontAwesome5 name="lightbulb" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#5C8D76',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default Footer
