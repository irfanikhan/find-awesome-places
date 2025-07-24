import { LatLng } from "@/types/googlePlaces";

/**
 * A debounced version of a function that delays invoking until after 
 * delay milliseconds have elapsed since the last time the debounced function was invoked.
 * 
 * @param func - The function to debounce
 * @param delay - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | number | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Formats a distance in meters to a more readable string.
 * 
 * @param distance - Distance in meters
 * @returns A formatted string representing the distance
 */
export const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

/**
 * Validates if the provided latitude and longitude are within valid ranges.
 * 
 * @param lat - Latitude value
 * @param lng - Longitude value
 * @returns True if valid, false otherwise
 */
export const isValidCoordinate = (lat: LatLng, lng: LatLng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};