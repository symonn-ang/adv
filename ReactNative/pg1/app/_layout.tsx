import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pressable } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* <Stack.Screen name="(Peeps)" options={{ headerShown: false }} /> */}

        
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        
        {/* <Stack.Screen name="index" options={{ title: "Home", headerShown: false}} /> */}
        {/* <Stack.Screen name="contact" options={{ title: "Contact Us" }} /> */}


      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
