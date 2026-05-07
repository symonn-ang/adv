import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import rockImage from "../assets/ic_profile.png"
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc, collection, query, where, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Posts from "../components/Posts"
import PostFeed from "../components/PostFeed"
import { onAuthStateChanged } from "firebase/auth";



export default function HomeScreen() {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth user:", user?.uid);
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    // assignment 5 useeffect
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

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "posts"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("Docs:", snapshot.docs.length);
            const postList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPosts(postList);
        },
            (error) => {
                console.log("Firestore error:", error);
            });

        return unsubscribe;
    }, [currentUser]);

    const pickProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            try {
                const userRef = doc(db, "users", currentUser.uid);

                await updateDoc(userRef, {
                    photoURL: imageUri,
                });

                // update UI immediately
                setUserData((prev) => ({
                    ...prev,
                    photoURL: imageUri,
                }));

            } catch (error) {
                console.log("Update profile error:", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Welcome Home</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{currentUser?.email?.split("@")[0]}!</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome name="calendar" size={16} color="#646464" />
                        <Text style={{ color: "#646464", marginLeft: 10, }}>Joined {userData?.createdAt
                            ? userData.createdAt.toDate().toLocaleDateString()
                            : "Loading..."}</Text>
                    </View>

                    <View style={styles.heroSection}>
                        <Image
                            source={
                                userData?.photoURL
                                    ? { uri: userData.photoURL }
                                    : rockImage
                            }
                            style={styles.image}
                        />
                        <View style={{ marginTop: 10, }}></View>

                        <View style={styles.subSection}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={pickProfileImage}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Edit Profile
                                </Text>
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

                    <PostFeed userData={userData} />
                    {posts.map((item) => (
                        <Posts
                            key={item.id}
                            post={item}
                            userData={userData}
                        />
                    ))}

                    <Text style={{ marginTop: 10, color: "#646464", fontSize: 20, fontWeight: "700" }}>. . .</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
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
        backgroundColor: "#ff3377",
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
