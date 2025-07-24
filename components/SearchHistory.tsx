import { Place } from "@/types/googlePlaces";
import Icon from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Props for the SearchHistory component.
 * @property history - Array of previously searched places.
 * @property onSelectPlace - Callback when a place is selected from history.
 */
type SearchHistoryProps = {
  history: Place[];
  onSelectPlace: (place: Place) => void;
};

/**
 * Displays a list of previously searched places.
 * Shows an empty state if there is no history.
 */
const SearchHistory = ({ history, onSelectPlace }: SearchHistoryProps) => {
  /**
   * Renders a single item in the search history list.
   */
  const renderHistoryItem = ({
    item,
    index,
  }: {
    item: Place;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => onSelectPlace(item)}
    >
      <Icon name="history" size={24} color="#666" style={styles.historyIcon} />
      <View style={styles.historyContent}>
        <Text style={styles.placeName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.placeAddress} numberOfLines={1}>
          {item.formatted_address}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with history count */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search History</Text>
        <Text style={styles.headerSubtitle}>
          {history.length} {history.length === 1 ? "place" : "places"}
        </Text>
      </View>
      {/* Empty state if no history */}
      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="history" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No search history yet</Text>
          <Text style={styles.emptySubtext}>
            Search for places to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => `${item.place_id}-${index}`}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyIcon: {
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  placeAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
});

export default SearchHistory;
