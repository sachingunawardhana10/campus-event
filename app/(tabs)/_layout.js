import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Campus Events",
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerTitle: "Favorite Events",
        }}
      />
    </Tabs>
  );
}