import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Enter valid Email and Password")
            return;
        }
        else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setEmail("")
                setPassword("")
                navigation.navigate("Home")
            } catch (error) {
                Alert.alert("Login Failed", error.message)
            }
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#f4f1e7", flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome! Login to proceed</Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.box}
                    placeholder="Enter Email Address.."
                    placeholderTextColor="#919191"
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.box}
                    placeholder="Enter Password.."
                    placeholderTextColor="#919191"
                    secureTextEntry

                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleLogin}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 10, marginTop: 10, }}><Text>or</Text></View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 100,
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: "rgba(245, 244, 244, 0.8)",
        width: "85%",
        paddingTop: 50,
        paddingBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    box: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        width: 200,
        padding: 10,
        marginBottom: 10,
    },
    btn: {
        width: 100,
        padding: 10,
        backgroundColor: "#b777c7",
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 10,
    },
});
