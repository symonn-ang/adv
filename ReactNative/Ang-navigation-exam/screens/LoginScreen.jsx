import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: "#f4f1e7", paddingBottom: 600,}}>
            <View style={styles.container}>
            <Text style={styles.title}>Welcome! Login to proceed</Text>
            
            <View style={styles.box}>
                <Text style={{ color: "#848383" }}>Enter Email Address...</Text>
            </View>

            <View style={styles.box}>
                <Text style={{ color: "#848383" }}>Enter Password...</Text>
            </View>

            <Button
                title="Login"
                onPress={() => navigation.navigate("Home")}
            />
            <View style={{marginBottom: 10, marginTop: 10,}}>or</View>
            <Button
                title="Register"
                onPress={() => navigation.navigate("Register")}
            />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 60,
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
});
