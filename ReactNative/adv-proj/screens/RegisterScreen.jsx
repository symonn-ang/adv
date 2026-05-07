import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import logo from "../assets/logo.png"

export default function RegisterScreen() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    async function handleRegister() {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Enter valid Email and Password")
            return;
        }
        else if (password !== confirmPassword) {
            Alert.alert("Passwords do not match")
            return;
        }
        else if (password.length < 6) {
            Alert.alert("Password must at least 6 characters long")
            return;
        }
        else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                });

                Alert.alert("Success", "Account Created!");
                navigation.popToTop()
            } catch (error) {
                Alert.alert("Registration Failed", error.message)
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
                    <View style={styles.container}>
                        <Image source={logo}
                            style={styles.image} />
                        <Text style={styles.title}>Create your account</Text>

                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            style={styles.box}
                            placeholder="Enter Username.."
                            placeholderTextColor="#919191"
                        />
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

                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.box}
                            placeholder="Confirm Password.."
                            placeholderTextColor="#919191"
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handleRegister}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 20, }}
                            onPress={() => navigation.goBack()}>
                            <Text
                                style={{
                                    color: "#ff3377",
                                    fontWeight: "bold",
                                    marginLeft: 5,
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 100,
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
        width: 50,
        height: 50,
        resizeMode: "contain",
        alignSelf: "center",
        marginLeft: 20,
        marginBottom: 10,
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
