import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

//@ts-ignore
import yep11 from "@/assets/images/yep11.webp"

const index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={yep11}
        resizeMode="cover"
        style={styles.image}
      >
      <Text style={styles.text}>fud table</Text>
        
      </ImageBackground>
    </View>
  )
}


export default index


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',

  },
  
    image: {
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },

  text: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000b3'
    
  }

})