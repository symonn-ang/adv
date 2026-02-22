import React from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { Link } from "expo-router"

//@ts-ignore
import therockturtleneck from "@/assets/images/the-rock-turtleneck.avif"

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The rock</Text>

      <Image source={therockturtleneck}
        resizeMode='contain'
        style={styles.image} />
      <Text style={styles.text}>bullet train</Text>
      <Text style={styles.text}>leviosa</Text>
      <Link href="/" style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Go to Home
          </Text>

        </Pressable>
      </Link>
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
  },
  button: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#000000b3',
    padding: 6,
  },

  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,

  }

  })


