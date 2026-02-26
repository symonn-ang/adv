import { StyleSheet, View, Text, TextInput } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';


const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Feather name="search" size={24} color="black" style={styles.icon} />
        <TextInput style={styles.searchText} placeholder='Search here...'/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6d6b69b1',
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 80,
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 300,
    marginTop: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
  },

  icon: {
    marginLeft: 10,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#ffffff',
  },
});

export default SearchBar; 
