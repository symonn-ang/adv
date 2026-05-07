import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alert } from 'react-native';

const PostComp = () => {

    const {
        content,
        setContent,
        selectedImage,
        isCreating,
        pickImageFromGallery,
        takePhoto,
        removeImage,
        createPost,
    } = useCreatePost();

    return (
        <View>
            <Text>yep</Text>
        </View>
  )
}

export default PostComp

const styles = StyleSheet.create({})