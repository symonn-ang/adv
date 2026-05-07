import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { getDoc, doc, collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Posts from "../components/Posts";
import PostFeed from "../components/PostFeed";
import Entypo from '@expo/vector-icons/Entypo';
import logo from "../assets/logo.png";

export default function FeedScreen() {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 90;
    const lastScrollY = useRef(0);

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -headerHeight],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsubscribe;
    }, []);

    // assignment 5 useeffect
    useEffect(() => {
        if (!currentUser) return;
        const fetchUserData = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setUserData(docSnap.data());
        };
        fetchUserData();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;
        const q = query(
            collection(db, "posts"),
            // where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        // mb add trycatch later
        return unsubscribe;
    }, [currentUser]);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
                <View style={styles.headerContent}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>Home</Text>
                    <TouchableOpacity onPress={() => navigation.popToTop()}>
                        <Entypo name="log-out" size={32} color="black" />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <ScrollView
                contentContainerStyle={{ paddingTop: headerHeight + -50, paddingBottom: 50 }}
                onScroll={(event) => {
                    const currentY = event.nativeEvent.contentOffset.y;

                    if (currentY > lastScrollY.current + 10) {
                        // Scrolling down
                        Animated.timing(scrollY, {
                            toValue: 150,
                            duration: 100,
                            useNativeDriver: true,
                        }).start();
                    } else if (currentY < lastScrollY.current - 10) {
                        // Scrolling up
                        Animated.timing(scrollY, {
                            toValue: 0,
                            duration: 100,
                            useNativeDriver: true,
                        }).start();
                    }

                    lastScrollY.current = currentY;
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <PostFeed userData={userData} />

                {posts.map((item) => (
                    <Posts
                        key={item.id}
                        post={item}
                        currentUserPhoto={userData?.photoURL}
                    />
                ))}

                <View style={{ height: 120, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#aaa", fontSize: 18 }}>• • •</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f7fb" },

    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: "#f5f7fb",
        zIndex: 1000,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    headerContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
});