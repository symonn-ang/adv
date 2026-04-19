import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen() {
    const navigation = useNavigation();

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
                await createUserWithEmailAndPassword(auth, email, password)
                Alert.alert("Success", "Account Created!");
                navigation.popToTop()
            } catch (error) {
                Alert.alert("Registration Failed", error.message)
            }
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#f4f1e7", flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Register Here</Text>

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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        marginTop: 60,
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
