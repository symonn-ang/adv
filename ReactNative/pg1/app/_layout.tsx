// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

import { Appearance } from 'react-native';
import { Colors } from '@/constants/theme'

// import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pressable } from 'react-native';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
<>
      <Stack screenOptions={{ headerStyle: {
        backgroundColor: theme.headerBackground},
        headerTintColor: theme.text,
        headerShadowVisible: false
      }}>
        <Stack.Screen name="index" options={{ headerShown: false,
          title: 'Home'
         }} />
         <Stack.Screen name="menu" options={{ headerShown: true,
          title: 'Menu',
          headerTitle: 'Peeps Catalog'
         }} />
         <Stack.Screen name="contact" options={{ headerShown: true,
          title: 'Contact',
          headerTitle: 'Contact Us'
         }} />
        
        {/* <Stack.Screen name="(Peeps)" options={{ headerShown: false }} /> */}

        
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        
        {/* <Stack.Screen name="index" options={{ title: "Home", headerShown: false}} /> */}
        {/* <Stack.Screen name="contact" options={{ title: "Contact Us" }} /> */}


      </Stack>
      <StatusBar style="auto" />
      </>
    // </ThemeProvider>
  );
}
