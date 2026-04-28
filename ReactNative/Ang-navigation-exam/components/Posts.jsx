import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Alert, TextInput } from "react-native";
import React, { useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import rockImage from "../assets/the-rock-turtleneck.avif"

const Posts = ({ post }) => {

  const currentUser = auth.currentUser
  const date = post.createdAt
    ? post.createdAt.toDate().toLocaleDateString()
    : "Loading...";

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
      Alert.alert("Deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        text: editedText,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "column" }}>
        <Image source={rockImage}
          style={styles.image} />

        {currentUser?.uid === post.userId && (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (isEditing) {
                  handleUpdate();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
                {isEditing ? "Save" : "Update"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleDelete}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12, }}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
        
      </View>

      <View style={styles.rightSection}>
        <View style={styles.topSection}>
          <Text style={{ fontWeight: "bold" }}>{currentUser?.email?.split("@")[0]}</Text>
          <Text style={{ color: "#818181", marginLeft: 6 }}>{post.userEmail}</Text>
          <Text style={{ marginLeft: 60, }}>{date}</Text>
        </View>
        <View style={styles.botSection}>
          {isEditing ? (
            <TextInput
              value={editedText}
              onChangeText={setEditedText}
              style={{ borderWidth: 1, padding: 5, minHeight: 150 }}
              multiline
            />
          ) : (
            <Text style={{ flexShrink: 1 }}>{post.text}</Text>
          )}
        </View>
      </View>

    </View>
  )
}

export default Posts

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    width: "90%",
    marginTop: 10,
    marginBottom: 5,
  },

  image: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 100,
    marginLeft: 5,
    marginBottom: 40,
  },
  btn: {
    width: 50,
    padding: 10,
    backgroundColor: "#b777c7",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  rightSection: {
    marginLeft: 8,
    flex: 1,
    flexDirection: "column",
  },

  topSection: {
    flexDirection: "row"
  },

  botSection: {
    marginTop: 6,
    width: "90%",
    minHeight: 160,
    textAlignVertical: "top"
  },

})