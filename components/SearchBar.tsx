import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * Props for the SearchBar component.
 * @property onSearch - Callback when the search query changes.
 * @property onFocus - Callback when the input is focused.
 * @property isSearching - Whether a search is currently in progress.
 * @property onHistoryToggle - Callback to toggle the search history view.
 */
type SearchBarProps = {
  onSearch: (query: string) => void;
  onFocus: () => void;
  isSearching: boolean;
  onHistoryToggle: () => void;
};

/**
 * SearchBar component for entering and clearing search queries.
 * Displays a loading indicator while searching and a button to show history.
 */
const SearchBar = ({
  onSearch,
  onFocus,
  isSearching,
  onHistoryToggle,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  /**
   * Handles text input changes and triggers the search callback.
   * @param text - The new query string.
   */
  const handleChangeText = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  /**
   * Clears the search input and resets the query.
   */
  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for places..."
          value={query}
          onChangeText={handleChangeText}
          onFocus={onFocus}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888"
        />
        {/* Show loading indicator while searching */}
        {isSearching && (
          <ActivityIndicator
            size="small"
            color="#007AFF"
            style={styles.loading}
          />
        )}
        {/* Show clear button when there is input */}
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="clear" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {/* Button to toggle search history */}
      <TouchableOpacity onPress={onHistoryToggle} style={styles.historyButton}>
        <Icon name="history" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f5f5f5",
  },
  loading: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
  },
  historyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
