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
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
  // updateDoc,
  // as updateDocAgain
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  increment,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import Feather from '@expo/vector-icons/Feather';
import rockImage from "../assets/ic_profile.png"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as ImagePicker from "expo-image-picker";
import { getTimeAgo } from "../hooks/timeAgo";

const Posts = ({ post, currentUserPhoto }) => {

  const currentUser = auth.currentUser;
  const date = getTimeAgo(post.createdAt);

  const [isEdited, setIsEdited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);


  const [modalVisible, setModalVisible] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [editedImage, setEditedImage] = useState(post.image || null);

  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null); // for editing comment


  const isOwner = currentUser?.uid === post.userId;

  // ==================== for likes ====================
  useEffect(() => {
    if (post.likedBy && currentUser?.uid) {
      setIsLiked(post.likedBy.includes(currentUser.uid));
    }
  }, [post.likedBy, currentUser]);

  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = doc(db, "posts", post.id);

    try {
      if (isLiked) {
        // Unlike
        await updateDoc(postRef, {
          likeCount: increment(-1),
          likedBy: arrayRemove(currentUser.uid),
        });
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        await updateDoc(postRef, {
          likeCount: increment(1),
          likedBy: arrayUnion(currentUser.uid),
        });
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Like error:", error);
      Alert.alert("Error", "Failed to like post");
    }
  };

  // ==================== for comments ====================
  useEffect(() => {
    if (!commentModalVisible) return;

    const commentsRef = collection(db, "posts", post.id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(data);
      setCommentCount(data.length);
    });

    return () => unsubscribe();
  }, [commentModalVisible, post.id]);

  const handleAddComment = async () => {
    if (!newCommentText.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, "posts", post.id, "comments"), {
        text: newCommentText.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        // userPhotoURL: post.userPhotoURL || currentUser.photoURL || null, prop nln
        userPhotoURL: currentUserPhoto || currentUser.photoURL || null,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "posts", post.id), {
        commentCount: increment(1),
      });

      setNewCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
      Alert.alert("Error", "Failed to post comment");
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editingComment || !editingComment.text.trim()) return;

    try {
      await updateDoc(doc(db, "posts", post.id, "comments", commentId), {
        text: editingComment.text,
        edited: true,           // optional: mark as edited
      });

      setEditingComment(null);   // exit edit mode
      setNewCommentText("");     // clear input
    } catch (error) {
      console.error("Edit comment error:", error);
      Alert.alert("Error", "Failed to edit comment");
    }
  };

  // Delete Comment
  const handleDeleteComment = (commentId) => {
    Alert.alert("Delete Comment", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "posts", post.id, "comments", commentId));
            await updateDoc(doc(db, "posts", post.id), {
              commentCount: increment(-1),
            });
          } catch (error) {
            Alert.alert("Error", "Failed to delete comment");
          }
        },
      },
    ]);
  };


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
        marginLeft: "14%",
        maxWidth: 325,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,

      }}>
        {/* Comment Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setCommentModalVisible(true)}
        >
          <Feather name="message-circle" size={20} color="#818181" />
          <Text style={styles.actionText}>{commentCount}</Text>
        </TouchableOpacity>

        {/* Like Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
        >
          {isLiked ? (
            <AntDesign name="heart" size={20} color="#E0245E" />
          ) : (
            <Feather name="heart" size={20} color="#818181" />
          )}
          <Text style={styles.actionText}>{likeCount}</Text>
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

      {/* >>>>>>>>>>>>>>>>>>>>>>>>> edit modal <<<<<<<<<<<<<<<<<<<<<<<<< */}

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

      {/* ==================== COMMENTS MODAL ==================== */}
      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity // lisod so kani ra sa, swipe down (supposedly)
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setCommentModalVisible(false)}
          />
          <View style={styles.commentsModal}>
            <View style={styles.swipeIndicator} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments ({comments.length})</Text>
              <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                <Text style={{ fontSize: 24 }}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsList}>
              {comments.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
                  No comments yet. Be the first!
                </Text>
              ) : (
                comments.map(comment => (
                  <View key={comment.id} style={styles.commentItem}>
                    <Image
                      source={comment.userPhotoURL ? { uri: comment.userPhotoURL } : rockImage}
                      style={styles.commentAvatar}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", }}>

                          <Text style={{ fontWeight: "600" }}>
                            {comment.userEmail?.split("@")[0]}
                          </Text>
                          <Text style={{ color: "#818181", marginLeft: 3, }}>
                            {comment.userEmail}
                          </Text>
                          {comment.edited && (
                            <Text style={{ fontSize: 12, color: "#818181", marginLeft: 5, }}>(Edited)</Text>
                          )}
                        </View>

                        <Text style={{ fontSize: 12, color: "#818181" }}>
                          {getTimeAgo(comment.createdAt)}
                        </Text>
                      </View>
                      <Text>{comment.text}</Text>

                      {currentUser?.uid === comment.userId && (
                        <View style={{ flexDirection: "row", marginTop: 6, gap: 15 }}>
                          <TouchableOpacity onPress={() => setEditingComment(comment)}>
                            <Text style={{ color: "#ff3377", fontSize: 13, fontWeight: "600" }}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                            <Text style={{ color: "red", fontSize: 13, fontWeight: "600" }}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <TextInput
                value={editingComment ? editingComment.text : newCommentText}
                onChangeText={(text) => {
                  if (editingComment) {
                    setEditingComment({ ...editingComment, text });
                  } else {
                    setNewCommentText(text);
                  }
                }}
                placeholder={editingComment ? "Edit comment..." : "Write a comment..."}
                multiline
                style={styles.commentInput}
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                {editingComment && (
                  <TouchableOpacity onPress={() => setEditingComment(null)}>
                    <Text style={{ color: "#666", fontWeight: "600" }}>Cancel</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => {
                    if (editingComment) {
                      handleEditComment(editingComment.id);
                    } else {
                      handleAddComment();
                    }
                  }}
                >
                  <Text style={{ color: "#ff3377", fontWeight: "bold" }}>
                    {editingComment ? "Save" : "Send"}
                  </Text>
                </TouchableOpacity>
              </View>
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
    marginTop: 2,
    width: "100%",
    textAlignVertical: "top"
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    color: "#818181",
    fontWeight: "500",
  },
  // commentsz
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  commentsModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "75%",
    padding: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderColor: "#818181",
    width: "100%",
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  swipeIndicator: { // lisod
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 10,
  },

})