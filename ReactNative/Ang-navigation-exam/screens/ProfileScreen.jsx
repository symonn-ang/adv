import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { auth, db } from "../firebase/firebaseConfig";

import icon from "../assets/ic_profile.png"

export default function ProfileScreen() {
    const navigation = useNavigation();
    const currentUser = auth.currentUser

    return (
        <SafeAreaView style={{ backgroundColor: "#f4f1e7", flex: 1 }}>
            <View style={styles.container}>
                <Image source={icon}
                    style={styles.pic} />
                <Text style={styles.title}>{currentUser?.email?.split("@")[0]}</Text>


                <View style={{ flexDirection: 'row' }}>
                    <Fontisto name="email" size={24} color="black" style={styles.icon} />
                    <Text style={{ paddingLeft: 10 }}>{currentUser.email}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="contact-phone" size={24} color="black" style={styles.icon} />
                    <Text style={{ paddingLeft: 10 }}>999-999-9999</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Entypo name="address" size={24} color="black" style={styles.icon} />
                    <Text style={{ paddingLeft: 10 }}>123 Main St, Springfield, IL 62704</Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Back to Home</Text>
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
    },
    pic: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    btn: {
        width: 120,
        padding: 10,
        backgroundColor: "#b777c7",
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 10,
    },

});
