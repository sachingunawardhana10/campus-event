
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import events from "../../data/events";
import { useFavorites } from "../../context/FavoritesContext";
import { notifyFavoriteAdded } from "../../utils/notifications";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();

  const eventId = Array.isArray(id) ? id[0] : id;

  const event = events.find(
    (item) => item.id.toString() === eventId
  );

  const { toggleFavorite, isFavorite } = useFavorites();

  // Handle adding and removing favorite events
  const handleFavoritePress = async () => {
    const alreadyFavorite = isFavorite(event.id);

    toggleFavorite(event);

    if (!alreadyFavorite) {
      await notifyFavoriteAdded(event.title);
    }
  };

  // Handle invalid event ID
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  const favorite = isFavorite(event.id);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: event.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.category}>
          {event.category}
        </Text>

        <Text style={styles.title}>
          {event.title}
        </Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{event.date}</Text>

        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{event.time}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{event.location}</Text>

        <Text style={styles.label}>Organizer</Text>
        <Text style={styles.value}>{event.organizer}</Text>

        <Text style={styles.label}>About This Event</Text>
        <Text style={styles.description}>
          {event.description}
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <Text style={styles.favoriteText}>
            {favorite
              ? "★ Remove from Favorites"
              : "☆ Add to Favorites"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: "100%",
    height: 230,
  },

  content: {
    padding: 20,
  },

  category: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202A44",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#202A44",
    marginTop: 14,
    marginBottom: 5,
  },

  value: {
    fontSize: 14,
    color: "#555555",
  },

  description: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 23,
  },

  favoriteButton: {
    backgroundColor: "#EEF2FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  favoriteText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 15,
  },
});
