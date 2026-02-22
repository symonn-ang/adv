import React from 'react'
import { Pressable, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

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
        <Text style={styles.title}>fud table</Text>

        <Link href="/contact" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Go to Contact
            </Text>

          </Pressable>
        </Link>

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

  title: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000b3',
    marginBottom: 120,
  },
  linkText: {
    color: 'blue',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: '#000000b3',
    padding: 4,

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