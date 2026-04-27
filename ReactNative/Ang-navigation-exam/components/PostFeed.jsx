import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from "react-native";

import { useState } from 'react'

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

const PostFeed = () => {

    const [post, setPost] = useState("");

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
            <View style={styles.subSection}>
                <View style={styles.iconSection}>
                    <Entypo name="image" size={24} color="black" style={{ marginLeft: 5 }} />
                    <FontAwesome5 name="poll" size={24} color="black" style={styles.icons} />
                    <Entypo name="emoji-happy" size={24} color="black" style={styles.icons} />
                    <AntDesign name="schedule" size={24} color="black" style={styles.icons} />
                    <Entypo name="location" size={24} color="black" style={{ marginLeft: 25, marginRight: 5, }} />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.popToTop()}
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
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        width: "90%"
    },
    subSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderColor: "#000",
        borderWidth: 2,
    },

    box: {
        borderWidth: 1,
        borderColor: "#000",
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        width: "100%",
        padding: 10,
        minHeight: 100,
        textAlignVertical: "top"
    },

    iconSection: {
        flexDirection: "row",
        flex: 1,
    },

    icons: {
        marginLeft: 25,
    },

    btn: {
        width: 105,
        padding: 10,
        borderEndEndRadius: 3,
        backgroundColor: "#b777c7",
        alignItems: "center",
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2,
    },
})