import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import rockImage from "../assets/the-rock-turtleneck.avif"
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc, collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

import Posts from "../components/Posts"
import PostFeed from "../components/PostFeed"
import { onAuthStateChanged } from "firebase/auth";

import Entypo from '@expo/vector-icons/Entypo';
import logo from "../assets/logo.png"

export default function FeedScreen() {
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
            // where("userId", "==", currentUser.uid),
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 4,
                    paddingVertical: 3,
                }}>
                    <Image source={logo}
                        style={styles.image} />
                    <Text style={styles.title}>Home</Text>
                    <TouchableOpacity
                        onPress={() => navigation.popToTop()}
                    >
                        <Entypo name="log-out" size={32} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", marginTop: 30, }}>

                    <PostFeed userData={userData} />
                    {posts.map((item) => (
                        <Posts 
                            key={item.id} 
                            post={item} 
                            currentUserPhoto={userData?.photoURL}
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
        width: 40,
        height: 40,
        resizeMode: "contain",
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
