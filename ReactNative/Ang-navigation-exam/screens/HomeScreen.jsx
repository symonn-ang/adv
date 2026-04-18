import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import rockImage from "../assets/the-rock-turtleneck.avif"

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Home</Text>
            <Image source={rockImage}
                style={{ width: 200, height: 200 }} />
            <View style={{ marginTop: 10, }}></View>

            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate("Profile")}
            />
            <View style={{ marginTop: 10, }}></View>
            <Button
                title="Log Out"
                onPress={() => navigation.popToTop()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f1e7",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
});
