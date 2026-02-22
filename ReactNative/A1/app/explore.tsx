import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

//@ts-ignore
import therockturtleneck from "@/assets/images/the-rock-turtleneck.avif"

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pizza</Text>

      <Image source={therockturtleneck}
        resizeMode='contain'
        style={styles.image} />
      <Text style={styles.text}>Burger</Text>
      <Text style={styles.text}>Fries</Text>
    </View>
  )
}

export default explore

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

  },

  image: {
    width: 200,
    height: 200,
    flex: 1,
    margin: "auto",
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  text: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: "#000000b3"
  }

})


