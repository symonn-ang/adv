import { Link } from 'expo-router';
import { StyleSheet, Alert, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@react-navigation/elements';
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <View style={styles.closeModal}>

        <AntDesign name="close-circle" size={24} color="black"
          onPress={() => {
            Alert.alert("Closing Modal...")
            router.push("/")
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  closeModal: {
    marginLeft: 20,
    paddingVertical: 15,
  },
});
