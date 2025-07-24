/**
 * Base URL for Google Places API endpoints.
 */
const BASE_URL = "https://maps.googleapis.com/maps/api/place";

/**
 * Google Places API key, loaded from environment variables.
 */
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

/**
 * A class for interacting with the Google Places API.
 */
export class GooglePlacesAPI {
  /**
   * Searches for places matching the given query string using the Google Places Autocomplete API.
   * @param query - The search query string (e.g., place name or address).
   * @returns A promise that resolves to an array of place predictions.
   * @throws Will throw an error if the API call fails or returns a non-OK status.
   */
  static async searchPlaces(query: string) {
    try {
      // Encode the query to safely include it in the URL
      const response = await fetch(
        `${BASE_URL}/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        // Return the list of predictions from the API response
        return data.predictions;
      } else {
        // Throw an error with the API's error message if available
        throw new Error(data.error_message || "Failed to search places");
      }
    } catch (error) {
      // Log and rethrow the error for upstream handling
      console.error("Error searching places:", error);
      throw error;
    }
  }

  /**
   * Retrieves detailed information about a place using its place ID.
   * @param placeId - The unique identifier for the place.
   * @returns A promise that resolves to an object containing place details.
   * @throws Will throw an error if the API call fails or returns a non-OK status.
   */
  static async getPlaceDetails(placeId: string) {
    try {
      // Request specific fields for the place details
      const response = await fetch(
        `${BASE_URL}/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,formatted_phone_number,website,opening_hours,types&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        // Return the place details, ensuring place_id is included
        return { ...data.result, place_id: data.result.place_id || placeId };
      } else {
        // Throw an error with the API's error message if available
        throw new Error(data.error_message || "Failed to get place details");
      }
    } catch (error) {
      // Log and rethrow the error for upstream handling
      console.error("Error getting place details:", error);
      throw error;
    }
  }
}
