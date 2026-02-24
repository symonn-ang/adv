import React from 'react'
import { ImageBackground, Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { Link } from "expo-router"
import { ScrollView } from 'react-native'


//@ts-ignore
import therockturtleneck from "@/assets/images/the-rock-turtleneck.avif"
//@ts-ignore
import yep10 from "@/assets/images/yep10.webp"
//@ts-ignore
import intro1640634122 from "@/assets/images/intro-1640634122.jpg"
//@ts-ignore
import instabg from "@/assets/images/instabg.png"


// check other components later

const explore = () => {
  return (
    <ScrollView >
      <ImageBackground
        source={instabg}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <View style={styles.container}>

          <Text style={styles.text}>The rock</Text>
          <Image source={therockturtleneck}
            resizeMode='cover'
            style={styles.image} />

          <Text style={styles.text}>bradds pit</Text>
          <Image source={yep10}
            resizeMode='cover'
            style={styles.image} />

          <Text style={styles.text}>leviosa</Text>
          <Image source={intro1640634122}
            resizeMode='cover'
            style={styles.image} />
          {/* onPress={() => console.log("Pressed!")} */}
          {/* link can be asChild  */}
          <Link href="/" asChild>
            <Pressable
              style={styles.button}
            // style={({ pressed, hovered }) => [
            //   styles.button,           // static styles
            //   {
            //     opacity: pressed ? 0.5 : 1,
            //     backgroundColor: hovered ? 'blue' : '#000000b3'
            //   } // dynamic pressed state
            // ]}
            >
              <Text style={styles.buttonText}>
                Go to Home
              </Text>

            </Pressable>
          </Link>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default explore

const styles = StyleSheet.create({

  container: {
    // flex: 1, // removing this fixed stagnant page use only for stretching
    // flexDirection: "column", // view defaults to column already
    // justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center", // items if want childs too
    // alignSelf: "center" // self if only the thing itself

  },
  bgImage: {
    width: '100%',
    height: '100%',
    // flex: 1,
    // resizeMode: 'cover',
    // justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    // flex: 1,
    borderRadius: 100,
    // margin: "auto",
    // resizeMode: 'cover',
    // justifyContent: 'center',

    // alignSelf: "center", //
    marginVertical: 10,
  },

  text: {
    color: "#FFFFFF",
    width: 300,
    // paddingHorizontal: 20, // width may be more cleaner in this case
    // margin: "auto",
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: "#000000b3",
    paddingVertical: 10,
    marginVertical: 10,
  },
  button: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center', // items inside, align not gon work here
    backgroundColor: '#000000b3',
    // padding: 6,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,

  }

})


