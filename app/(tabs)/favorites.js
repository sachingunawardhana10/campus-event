
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesScreen() {
  const router = useRouter();

  const { favorites, toggleFavorite } = useFavorites();

  const renderFavorite = ({ item }) => {
    return (
      <View style={styles.eventCard}>
        <Pressable
          onPress={() => router.push(`/event/${item.id}`)}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.eventImage}
          />

          <View style={styles.eventInfo}>
            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            <Text style={styles.eventDate}>
              {item.date} | {item.time}
            </Text>

            <Text style={styles.eventLocation}>
              {item.location}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.removeButton}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.removeText}>
            ★ Remove from Favorites
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        My Favorite Events
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't bookmarked any events yet.
          </Text>

          <Text style={styles.emptySubtext}>
            Visit the Home tab to add your favorite events.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 16,
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#202A44",
    marginBottom: 18,
  },

  list: {
    paddingBottom: 20,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 3,
  },

  eventImage: {
    width: "100%",
    height: 170,
  },

  eventInfo: {
    padding: 15,
  },

  category: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202A44",
    marginBottom: 8,
  },

  eventDate: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 5,
  },

  eventLocation: {
    fontSize: 13,
    color: "#555555",
  },

  removeButton: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    alignItems: "center",
  },

  removeText: {
    color: "#DC2626",
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#202A44",
    textAlign: "center",
    marginBottom: 10,
  },

  emptySubtext: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
});
