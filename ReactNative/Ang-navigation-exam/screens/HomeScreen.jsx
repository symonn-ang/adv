import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import rockImage from "../assets/the-rock-turtleneck.avif"
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

import Posts from "../components/Posts"
import PostFeed from "../components/PostFeed"

export default function HomeScreen() {
    const navigation = useNavigation();
    const currentUser = auth.currentUser

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                }
            }
        }
        fetchUserData();
    }, [currentUser])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Welcome Home</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{currentUser?.email?.split("@")[0]}!</Text>
                    <Text>  Created at: {userData?.createdAt
                        ? userData.createdAt.toDate().toLocaleDateString()
                        : "Loading..."}</Text>
                    <View style={styles.heroSection}>
                        <Image source={rockImage}
                            style={styles.image} />
                        <View style={{ marginTop: 10, }}></View>

                        <View style={styles.subSection}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.navigate("Profile")}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Visit Profile</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 10 }}></View>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.popToTop()}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20, }}>Today's Blog~</Text>
                    </View>

                    <PostFeed />
                    <Posts />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f1e7",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderRadius: 100,
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

    heroSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    subSection: {
        flexDirection: "column",
        marginLeft: 10,
    },
});
