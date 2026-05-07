import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Feather from '@expo/vector-icons/Feather';
import rockImage from "../assets/ic_profile.png"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as ImagePicker from "expo-image-picker";
import { getTimeAgo } from "../hooks/timeAgo";

const Posts = ({ post }) => {

  const currentUser = auth.currentUser;
  const date = getTimeAgo(post.createdAt);

  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [isComment, setIsComment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [editedText, setEditedText] = useState(post.text);
  const [editedImage, setEditedImage] = useState(post.image || null);

  const [modalVisible, setModalVisible] = useState(false);

  const isOwner = currentUser?.uid === post.userId;

  const pickEditImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setEditedImage(result.assets[0].uri);
    }
  };

  const takeEditPhoto = async () => {
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
      setEditedImage(result.assets[0].uri);
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert(
        "Delete Post",
        "Are you sure?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deleteDoc(doc(db, "posts", post.id));
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        text: editedText,
        image: editedImage,
      });
      setIsEdited(true);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            post.userPhotoURL
              ? { uri: post.userPhotoURL }
              : rockImage
          }
          style={styles.image}
        />

        <View style={styles.rightSection}>
          <View style={styles.topSection}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>
                {post.userEmail?.split("@")[0]}
              </Text>
              <Text style={{ color: "#818181", marginLeft: 5, }}>
                {post.userEmail}
              </Text>
            </View>
            {isEdited ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 5, color: "#818181", }}>(Edited)</Text>
                <Text style={{ marginRight: 10, color: "#818181", }}>{date}</Text>
              </View>
            ) : (
              <Text style={{ marginRight: 10, color: "#818181", }}>{date}</Text>
            )}
          </View>
          <View style={styles.botSection}>

            <View>
              <Text style={{ flexShrink: 1 }}>
                {post.text}
              </Text>

              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={{
                    width: "100%",
                    height: 250,
                    borderRadius: 12,
                    marginTop: 10,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>

          </View>
        </View>

      </View>


      <View style={{
        marginLeft: "20%",
        maxWidth: 280,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,

      }}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
          <Feather name="message-circle" size={18} color="#818181" />
          <Text style={{ color: "#818181", marginLeft: 2, }}>
            {isComment ? (
              10
            ) : (
              0
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }}>
          {isLiked ? (
            <AntDesign name="heart" size={18} color="#E0245E" />
          ) : (
            <Feather name="heart" size={18} color="#818181" />
          )}
          <Text style={{ color: "#818181", marginLeft: 2, }}>
            {isComment ? (
              10
            ) : (
              0
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isOwner}
          style={{ opacity: isOwner ? 1 : 0.3 }}
          onPress={() => {
            if (!isOwner) return;
            setEditedText(post.text);
            setEditedImage(post.image || null);
            setModalVisible(true);
          }}
        >
          <Feather name="edit" size={18} color="#818181" />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!isOwner}
          style={{
            flexDirection: "row",
            alignItems: "center",
            opacity: isOwner ? 1 : 0.3,
          }}
          onPress={() => {
            if (!isOwner) return;
            handleDelete();
          }}
        >
          <MaterialCommunityIcons
            name="delete-off"
            size={18}
            color="#818181"
          />
        </TouchableOpacity>

      </View>

      {/* >>>>>>>>>>>>>>>>>>>>>>>>> Modal start here <<<<<<<<<<<<<<<<<<<<<<<<< */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Edit Post
            </Text>

            <TextInput
              value={editedText}
              onChangeText={setEditedText}
              multiline
              style={{
                minHeight: 120,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 12,
                textAlignVertical: "top",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={pickEditImage}
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Entypo name="image" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={takeEditPhoto}
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <AntDesign name="camera" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {editedImage && (
              <View style={{ marginTop: 15, position: "relative" }}>
                <Image
                  source={{ uri: editedImage }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  onPress={() => setEditedImage(null)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  marginRight: 15,
                  backgroundColor: "#e0e0e0",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#777",
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await handleUpdate();
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "#ff3377",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>


  )
}

export default Posts

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    // borderRadius: 10,
    width: "100%",
    padding: 10,
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 5,
    marginBottom: 40,
  },
  btn: {
    width: 50,
    padding: 10,
    backgroundColor: "#ff3377",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  rightSection: {
    marginLeft: 5,
    flex: 1,
    flexDirection: "column",
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",

  },

  botSection: {
    marginTop: 6,
    width: "100%",
    textAlignVertical: "top"
  },

})