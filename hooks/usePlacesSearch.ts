import { GooglePlacesAPI } from "@/services/GooglePlacesAPI";
import { StorageService } from "@/services/StorageService";
import { AutocompletePrediction, Place } from "@/types/googlePlaces";
import { debounce } from "@/utils/hepler";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

/**
 * Custom hook to handle Google Places search, selection, and history.
 * Provides search results, selected place, search history, and handlers for UI.
 *
 * @returns {object} Hook state and handlers for places search and history.
 */
export const usePlacesSearch = () => {
  const [searchResults, setSearchResults] = useState<AutocompletePrediction[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchHistory, setSearchHistory] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history on mount
  useEffect(() => {
    fetchSearchHistory();
  }, []);

  /**
   * Fetches search history from storage and updates state.
   */
  const fetchSearchHistory = async () => {
    try {
      const history = await StorageService.getSearchHistory();
      setSearchHistory(history);
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  /**
   * Saves a place to search history and refreshes the history state.
   * @param {Place} place - The place to save to history.
   */
  const saveToHistory = async (place: Place) => {
    try {
      await StorageService.saveSearchHistory(place);
      fetchSearchHistory();
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  };

  /**
   * Debounced search function to query Google Places API.
   * Only triggers if query length >= 2.
   */
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await GooglePlacesAPI.searchPlaces(query);
        setSearchResults(results);
      } catch (error) {
        Alert.alert("Error", "Failed to search places");
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  /**
   * Handles user search input.
   * @param {string} query - The search query string.
   */
  const handleSearch = (query: string) => {
    debouncedSearch(query);
    setShowHistory(false);
  };

  /**
   * Handles selection of a place from search results.
   * Fetches place details and saves to history.
   * @param {AutocompletePrediction} place - The selected place prediction.
   */
  const handlePlaceSelect = async (place: AutocompletePrediction) => {
    try {
      const placeDetails = await GooglePlacesAPI.getPlaceDetails(place.place_id);
      setSelectedPlace(placeDetails);
      setSearchResults([]);
      setShowHistory(false);
      await saveToHistory(placeDetails);
    } catch (error) {
      Alert.alert("Error", "Failed to get place details");
      console.error("Place details error:", error);
    }
  };

  /**
   * Handles selection of a place from search history.
   * @param {Place} place - The selected place from history.
   */
  const handleHistorySelect = (place: Place) => {
    setSelectedPlace(place);
    setShowHistory(false);
    setSearchResults([]);
  };

  /**
   * Toggles the visibility of the search history.
   */
  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setSearchResults([]);
  };

  // Expose state and handlers for use in components
  return {
    searchResults,
    selectedPlace,
    searchHistory,
    isSearching,
    showHistory,
    handleSearch,
    handlePlaceSelect,
    handleHistorySelect,
    toggleHistory,
    setShowHistory,
  };
};