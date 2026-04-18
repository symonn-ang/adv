import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';

import wiz from "../assets/intro-1640634122.jpg"

export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Image source={wiz}
                style={styles.pic} />
            <Text style={styles.title}>Emma Watson</Text>


            <View style={{ flexDirection: 'row' }}>
                <Fontisto name="email" size={24} color="black" style={styles.icon} />
                <Text style={{ paddingLeft: 10 }}>emmawatson@gmail.com</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="contact-phone" size={24} color="black" style={styles.icon} />
                <Text style={{ paddingLeft: 10 }}>999-999-9999</Text>
            </View>


            <View style={{ flexDirection: 'row' }}>
                <Entypo name="address" size={24} color="black" style={styles.icon} />
                <Text style={{ paddingLeft: 10 }}>123 Main St, Springfield, IL 62704</Text>
            </View>
            <Button
                title="Back to Home"
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f4f1e7",
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


});
