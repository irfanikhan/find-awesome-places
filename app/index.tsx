import CustomMapView from "@/components/MapView";
import PlaceDetails from "@/components/PlacesDetails";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResults from "@/components/SearchResult";
import { usePlacesSearch } from "@/hooks/usePlacesSearch";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * HomePage component is the main screen of the app.
 * It manages the search bar, search results, search history, map view, and place details.
 * Uses the usePlacesSearch hook to handle all search and selection logic.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
  // Destructure state and handlers from the custom hook
  const {
    searchResults,      // Array of search result places
    selectedPlace,      // Currently selected place object
    searchHistory,      // Array of previously searched places
    isSearching,        // Boolean indicating if a search is in progress
    showHistory,        // Boolean to toggle search history visibility
    handleSearch,       // Function to handle new search queries
    handlePlaceSelect,  // Function to handle selecting a place from results
    handleHistorySelect,// Function to handle selecting a place from history
    toggleHistory,      // Function to toggle history visibility
    setShowHistory,     // Function to explicitly set history visibility
  } = usePlacesSearch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Search bar for user input */}
        <SearchBar
          onSearch={handleSearch}
          onFocus={() => setShowHistory(true)}
          isSearching={isSearching}
          onHistoryToggle={toggleHistory}
        />

        {/* Show search history if toggled, otherwise show results/map/details */}
        {showHistory ? (
          <SearchHistory
            history={searchHistory}
            onSelectPlace={handleHistorySelect}
          />
        ) : (
          <>
            {/* Show search results if available */}
            {searchResults.length > 0 && (
              <SearchResults
                results={searchResults}
                onSelectPlace={handlePlaceSelect}
              />
            )}
            {/* Map view centered on selected place */}
            <CustomMapView selectedPlace={selectedPlace} />
            {/* Show place details if a place is selected */}
            {selectedPlace && <PlaceDetails place={selectedPlace} />}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

/**
 * Styles for the HomePage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomePage;
