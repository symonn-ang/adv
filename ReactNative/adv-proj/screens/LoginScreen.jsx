import { StyleSheet, Text, View, Button, TextInput, Platform, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from "../assets/logo.png"

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
                navigation.navigate("MainTabs")
            } catch (error) {
                Alert.alert("Login Failed", error.message)
            }
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#f5f7fb", flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={styles.logo}>
                        <Image source={logo}
                            style={styles.image} />
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}>Chill
                            <Text style={{ color: "#ff3377" }}>Net</Text></Text>
                    </View>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
        width: "88%",
        paddingVertical: 50,
        paddingHorizontal: 25,
        backgroundColor: "#ffffff",
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 18,
        elevation: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginLeft: 20,
    },
    logo: {
        alignSelf: "center",
        alignItems: 'center',
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f1f1f",
        marginBottom: 28,
        textAlign: "center",
        letterSpacing: 0.3,
    },
    box: {
        width: "100%",
        backgroundColor: "#f7f7f7",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 18,
        marginBottom: 16,
        fontSize: 15,
        color: "#222",

        borderWidth: 1,
        borderColor: "#e5e5e5",
    },
    btn: {
        width: "100%",
        padding: 15,
        backgroundColor: "#ff3377",
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
    },
});
