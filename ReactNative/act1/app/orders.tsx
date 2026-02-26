import { SafeAreaView, ImageBackground, Image, SectionList, FlatList, ScrollView, Platform, Appearance, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/theme'
import React from 'react'
import SearchBar from "@/components/SearchBar";

//@ts-ignore
import { MOVIE_ITEMS } from '@/constants/MovieItems';
//@ts-ignore
import MOVIE_IMAGES from '@/constants/MovieImages';
//@ts-ignore
import movieBG from '@/assets/images/bgImage2.jpg'

const orders = () => {
  const separatorComponent = () => <View style={styles.separator} />
  const footerComp = <Text style={{fontSize: 20}}>End of Movie List</Text>

  return (

    <ImageBackground
      source={movieBG}
      resizeMode="cover"
      style={styles.bgImage}
    >
            <SearchBar />

      <FlatList
        data={MOVIE_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContentContainer}
        ItemSeparatorComponent={separatorComponent}
        ListFooterComponent={footerComp}
        ListFooterComponentStyle={styles.footerComponent}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.moviesTextRow}>
              <Text style={[styles.movieItemTitle]}>Title: {item.title}</Text>
              <Text style={styles.movieItemText}>Description: {item.description}</Text>
            </View>
            <Image
              source={MOVIE_IMAGES[item.id - 1]}
              style={styles.movieImage}
            />
          </View>
        )}
      />
    </ImageBackground>

  )
}

export default orders

const styles = StyleSheet.create({

  ContentContainer: {
    paddingTop: 10,
    paddingBottom: '100%',
    paddingHorizontal: 12,

  },

  bgImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },

  separator: {
    width: '50%',
    maxWidth: 300,
    height: 5,
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginBottom: 10,
  },

  footerComponent: {
    alignSelf: 'center',
    // color: '#000000' // wont work, go to return

  },

  row: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 600,
    height: 100,
    marginBottom: 10,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  moviesTextRow: {
    width: '65%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    flexGrow: 1,
  },

  movieItemTitle: {
    fontSize: 24,
    color: '#000000',
    textDecorationLine: 'underline',
  },

  movieItemText: {
    fontSize: 18,
    color: '#000000',
  },

  movieImage: {
    width: 100,
    height: 100,
  },

})
