
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { Stack } from "expo-router";

import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        // Detect when the app returns to the foreground
        if (
          appState.current &&
          /inactive|background/.test(appState.current) &&
          nextAppState === "active"
        ) {
          console.log("App has returned to the foreground");
        }

        // Store the latest application state
        appState.current = nextAppState;
      }
    );

    // Remove the listener when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="event"
          options={{ headerShown: false }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
