
import { TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ImageBackground, Image, ScrollView, Button, StyleSheet, Text, View, Touchable } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

import SearchBar from "@/components/SearchBar";
//@ts-ignore
import movies from '@/assets/images/movieCat.webp'
//@ts-ignore
import movieBG from '@/assets/images/movieBg.jpg'

const index = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={movieBG}
          resizeMode="cover"
          style={styles.BGimage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <SearchBar />

            <Text style={styles.title}>Home Screen</Text>

            <View style={styles.modal}>
              <Button title="Show Modal"
                color={"#1f1e1e"}
                onPress={() => {
                  Alert.alert("Opening Modal...")
                  router.push("/modal")
                }} />
            </View>

            <TouchableOpacity
              onPress={() => router.push("/orders")}
              style={styles.orderButton}
            >
              <Text style={{ color: '#FFFFFF', alignSelf: 'center' }}>Go to Movie List</Text>
            </TouchableOpacity>

            <Image
              source={movies}
              style={styles.image}
            />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </ScrollView >
  )
}

export default index

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  orderButton: {
    backgroundColor: "#1f1e1e",
    height: 35,
    justifyContent: 'center',
  },

  BGimage: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  modal: {
    width: 300,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20,
    marginBottom: 10,
  },

  title: {
    width: 400,
    alignSelf: 'center',
    padding: 10,
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#00000033',
    borderRadius: 40,
    marginBottom: 120,
  },

})