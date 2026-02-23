import { Appearance, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/theme'
import React from 'react'

const menu = () => {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const styles = createStyles(theme, colorScheme)

//   const Container 
  
    return (
    <View>
      <Text>menu</Text>
    </View>
  )
}
export default menu

function createStyles(theme, colorScheme) {
    return StyleSheet.create({

    })
}