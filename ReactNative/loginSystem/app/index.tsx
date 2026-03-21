import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validator, setValidator] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email == 'john111@gmail.com' && password == '12345' ||
        email == 'alex222@gmail.com' && password == '123456'
    ) {
      setIsLoggedIn(true);
      router.replace({
        pathname: '/Dashboard',
        params: {email, isLoggedIn: 'true'}
      });
    } else {
      setValidator('Please Enter Valid Email & Password')
    }

  };
  return (

    <View style={styles.container}>
      <Text style={styles.labelText}>
        Login to proceed
      </Text>
      <View style={styles.row}>
        <Fontisto name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.searchText}
          placeholder='Enter Email...'
          value={email}
          onChangeText={setEmail}
        />

      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="onepassword" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.searchText}
          placeholder='Enter Password...'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      {validator ?  (<Text style={styles.label}>
            {validator}
      </Text>) : (<Text></Text>)}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={{ color: '#FFFFFF', alignSelf: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6d6b69b1',
    width: 300,
    height: 350,
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
    marginLeft: 10,
  },

  searchText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#ffffff',
  },

  loginButton: {
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