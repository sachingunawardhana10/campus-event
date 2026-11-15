
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

import events from "../../data/events";
import { useFavorites } from "../../context/FavoritesContext";
import { notifyFavoriteAdded } from "../../utils/notifications";

export default function HomeScreen() {
  const router = useRouter();

  const { toggleFavorite, isFavorite } = useFavorites();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle adding and removing favorite events
  const handleFavoritePress = async (event) => {
    const alreadyFavorite = isFavorite(event.id);

    toggleFavorite(event);

    if (!alreadyFavorite) {
      await notifyFavoriteAdded(event.title);
    }
  };

  // Available event categories
  const categories = [
    "All",
    "Career",
    "Sports",
    "Technology",
    "Entertainment",
    "Academic",
  ];

  // Filter events according to selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter(
          (event) => event.category === selectedCategory
        );

  // Display each event
  const renderEvent = ({ item }) => (
    <View style={styles.card}>
      <Pressable
        onPress={() => router.push(`/event/${item.id}`)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        <View style={styles.cardContent}>
          <Text style={styles.category}>
            {item.category}
          </Text>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.details}>
            Date: {item.date}
          </Text>

          <Text style={styles.details}>
            Time: {item.time}
          </Text>

          <Text style={styles.details}>
            Location: {item.location}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => handleFavoritePress(item)}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite(item.id)
            ? "★ Remove from Favorites"
            : "☆ Add to Favorites"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Upcoming Events
        </Text>

        <Pressable
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            Filter Events
          </Text>
        </Pressable>
      </View>

      <Text style={styles.selectedFilter}>
        Category: {selectedCategory}
      </Text>

      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No events found in this category.
          </Text>
        }
      />

      {/* Category Filter Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Filter Events
            </Text>

            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryOption,
                  selectedCategory === category &&
                    styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryOptionText}>
                  {selectedCategory === category
                    ? "✓ "
                    : ""}
                  {category}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                Apply Filter
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },

  filterButton: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
  },

  filterButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  selectedFilter: {
    marginBottom: 12,
    color: "#555555",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 170,
  },

  cardContent: {
    padding: 15,
  },

  category: {
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  details: {
    color: "#555555",
    marginBottom: 4,
  },

  favoriteButton: {
    backgroundColor: "#e8eaf6",
    padding: 12,
    alignItems: "center",
  },

  favoriteButtonText: {
    color: "#263a80",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777777",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  categoryOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: "#f1f1f1",
  },

  selectedCategory: {
    backgroundColor: "#dbeafe",
  },

  categoryOptionText: {
    fontSize: 16,
  },

  closeButton: {
    backgroundColor: "#2563eb",
    padding: 13,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
