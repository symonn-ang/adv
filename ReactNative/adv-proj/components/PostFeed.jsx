import { Image, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import rockImage from "../assets/the-rock-turtleneck.avif"

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const PostFeed = ({ userData }) => {

    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Camera permission required");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePost = async () => {
        const user = auth.currentUser;

        if (!post.trim() && image === null) {
            Alert.alert("Empty post");
            return;
        }

        try {
            await addDoc(collection(db, "posts"), {
                text: post,
                image: image || null,
                createdAt: serverTimestamp(),
                userId: user.uid,
                userEmail: user.email,
                userPhotoURL: userData?.photoURL || null,
            });

            setPost("");
            setImage(null);
            Alert.alert("Posted!");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                value={post}
                onChangeText={setPost}
                style={styles.box}
                placeholder="Enter your blog... "
                placeholderTextColor="#919191"
                multiline={true}
            />
            {image && (
                <View style={{ position: "relative", marginBottom: 10 }}>

                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 10,
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => setImage(null)}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            ×
                        </Text>
                    </TouchableOpacity>

                </View>
            )}
            <View style={styles.subSection}>
                <View style={styles.iconSection}>
                    <TouchableOpacity onPress={pickImage}>
                        <Entypo name="image" size={24} color="black" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhoto}>
                        <AntDesign name="camera" size={24} color="black" style={styles.icons} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={handlePost}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Post</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default PostFeed

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 12,
        marginTop: 10,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    subSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
        // borderColor: "#000",
        // borderWidth: 2,
        // borderEndStartRadius: 8,
        // borderEndEndRadius: 8,
    },

    box: {
        width: "100%",
        padding: 14,
        minHeight: 110,
        textAlignVertical: "top",

        backgroundColor: "#f7f8fa",

        fontSize: 15,
        color: "#222",

        borderWidth: 1,
        borderColor: "#ececec",
    },

    iconSection: {
        flexDirection: "row",
        flex: 1,
        marginLeft: 10,
    },

    icons: {
        marginLeft: 25,
    },

    btn: {
        width: 110,
        paddingVertical: 10,
        paddingHorizontal: 14,

        borderRadius: 12,
        backgroundColor: "#ff3377",

        alignItems: "center",
        justifyContent: "center",

    },
})