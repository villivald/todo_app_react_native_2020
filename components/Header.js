import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>To Do App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C8D76',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    marginTop: 35,
    color: '#F5F5F5',
  },
})

export default Header
