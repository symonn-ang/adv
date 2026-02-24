import { SafeAreaView, Image, SectionList, FlatList, ScrollView, Platform, Appearance, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/theme'
import React from 'react'
import { MOVIE_ITEMS } from '@/constants/MovieItems';
import MOVIE_IMAGES from '@/constants/MovieImages';
// import { SafeAreaView } from 'react-native-safe-area-context';

// type Theme = typeof Colors.light;
// type ColorScheme = 'light' | 'dark' | null;

export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const styles = createStyles(theme, colorScheme)

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  const separatorComponent = () => <View style={styles.separator} />

  const headerComp = <Text>Top of List</Text>
  const footerComp = <Text style={{color: theme.text}}>End of Movie List</Text>

  return (
    <Container>
      <FlatList
        data={MOVIE_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContentContainer}
        ItemSeparatorComponent={separatorComponent}
        // ListHeaderComponent={headerComp}
        // ListHeaderComponentStyle={styles.footerComp}
        ListFooterComponent={footerComp}
        ListFooterComponentStyle={styles.footerComponent}
        ListEmptyComponent={<Text>No Items</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.moviesTextRow}>
              <Text style={[styles.movieItemTitle, styles.movieItemText]}>Title: {item.title}</Text>
              <Text style={styles.movieItemText}>Description: {item.description}</Text>
            </View>
            <Image
              source={MOVIE_IMAGES[item.id - 1]}
              style={styles.movieImage}
            />
          </View>
        )}
      />
      
    </Container>
  )
}

//@ts-ignore
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    ContentContainer: {
      paddingTop: 10,
      paddingBottom: '100%',
      paddingHorizontal: 12,
      backgroundColor: theme.background,
      
    },

    separator: {
      width: '50%',
      maxWidth: 300,
      height: 5,
      backgroundColor: colorScheme === 'dark' ? '#9fc602' : '#000000',
      // marginHorizontal: 'auto',
      alignSelf: 'center',
      marginBottom: 10,
    },

    footerComponent: {
      // marginHorizontal: 'auto',
      alignSelf: 'center',
      // color: theme.text // wont work, go to return

    },

    row: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: 600,
      height: 100,
      marginBottom: 10,
      borderStyle: 'solid',
      borderColor: colorScheme === 'dark' ? '#9fc602' : '#000000',
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
      fontSize: 18,
      textDecorationLine: 'underline',
    },

    movieItemText: {
      color: theme.text,
    },

    movieImage: {
      width: 100,
      height: 100,
    },

  })
}