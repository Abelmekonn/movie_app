import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, useColorScheme } from "react-native"; // Use View instead of SafeAreaView
import './global.css';

export default function RootLayout() {
  const theme = useColorScheme(); // Detect system theme

  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      {/* Adaptive Status Bar */}
      <StatusBar
        hidden={true}
        translucent
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor="transparent" // Make the StatusBar background transparent
      />

      {/* Navigation Stack */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(movies)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
