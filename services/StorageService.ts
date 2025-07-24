import { Place } from '@/types/googlePlaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Service for managing search history in AsyncStorage.
 */
export class StorageService {
  /**
   * Retrieves the search history from AsyncStorage.
   * @returns {Promise<Place[]>} Array of Place objects from history, or empty array if none.
   */
  static async getSearchHistory(): Promise<Place[]> {
    try {
      const history = await AsyncStorage.getItem(STORAGE_KEY);
      // Parse and return history if exists, otherwise return empty array
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error retrieving search history:', error);
      return [];
    }
  }

  /**
   * Saves a new place to the search history.
   * - Removes duplicates by place_id.
   * - Adds the new place to the beginning of the history.
   * - Limits the history to MAX_HISTORY_ITEMS.
   * @param {Place} place - The place to add to history.
   * @returns {Promise<void>}
   */
  static async saveSearchHistory(place: Place): Promise<void> {
    try {
      const history = await this.getSearchHistory();

      // Remove if already exists to avoid duplicates
      const filteredHistory = history.filter(
        (item: Place) => item.place_id !== place.place_id
      );

      // Add to beginning of array
      const updatedHistory = [place, ...filteredHistory];

      // Limit the number of items
      const limitedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
      throw error;
    }
  }

  /**
   * Clears the entire search history from AsyncStorage.
   * @returns {Promise<void>}
   */
  static async clearSearchHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
      throw error;
    }
  }
}