import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const backBtn = () => {
    router.back()
  }


  return (

    <View style={styles.container}>
      <Text style={styles.labelText}>
        Profile
      </Text>

      <MaterialIcons name="account-circle" size={100} color="black" style={styles.profileIcon} />

      <View style={{ flexDirection: 'row' }}>
        <Fontisto name="email" size={24} color="black" style={styles.icon} />
        <Text>{email}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name="contact-phone" size={24} color="black" style={styles.icon} />
        <Text>999-999-9999</Text>
      </View>


      <View style={{ flexDirection: 'row' }}>
        <Entypo name="address" size={24} color="black" style={styles.icon} />
        <Text>123 Main St, Springfield, IL 62704</Text>
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={backBtn}
      >
        <Entypo name="back" size={24} color="white" style={styles.icon} />
        <Text style={{ color: '#FFFFFF', alignSelf: 'center' }}>Back</Text>
      </TouchableOpacity>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6d6b69b1',
    width: 500,
    height: 400,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    marginLeft: 20,
  },
  labelText: {
    color: "#FFFFFF",
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 40,
    marginBottom: 10,

  },
  profileIcon: {
    marginBottom: 20,
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
    marginRight: 10,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#ffffff',
  },

  button: {
    flexDirection: 'row',
    backgroundColor: "#000000",
    borderRadius: 30,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    justifyContent: 'center',
  },

  label: {
    color: "#ed0000"
  }
});
