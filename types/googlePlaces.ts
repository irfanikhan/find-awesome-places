
/**
 * Google Places API TypeScript Definitions
 * Based on Google Places API Web Service documentation
 */

// Base coordinate interface
export interface LatLng {
  lat: number;
  lng: number;
}

// Geometry information for a place
export interface Geometry {
  location: LatLng;
  viewport: {
    northeast: LatLng;
    southwest: LatLng;
  };
}

// Address component structure
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

// Photo reference for place photos
export interface PlacePhoto {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

// Opening hours information
export interface OpeningHours {
  open_now: boolean;
  periods?: {
    close?: {
      day: number;
      time: string;
    };
    open: {
      day: number;
      time: string;
    };
  }[];
  weekday_text?: string[];
}

// Plus code information
export interface PlusCode {
  compound_code: string;
  global_code: string;
}

// Review information
export interface PlaceReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Main Place interface for Place Details API
export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: Geometry;
  types: string[];
  
  // Optional fields that can be requested
  address_components?: AddressComponent[];
  adr_address?: string;
  business_status?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  formatted_phone_number?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  international_phone_number?: string;
  opening_hours?: OpeningHours;
  photos?: PlacePhoto[];
  plus_code?: PlusCode;
  price_level?: number; // 0-4 scale
  rating?: number;
  reference?: string;
  reviews?: PlaceReview[];
  scope?: string;
  url?: string;
  user_ratings_total?: number;
  utc_offset?: number;
  vicinity?: string;
  website?: string;
}

// Autocomplete prediction structure
export interface AutocompletePrediction {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
    secondary_text_matched_substrings?: {
      length: number;
      offset: number;
    }[];
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}

// API Response interfaces
export interface PlaceAutocompleteResponse {
  predictions: AutocompletePrediction[];
  status: 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST';
  error_message?: string;
}

export interface PlaceDetailsResponse {
  result: Place;
  status: 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'NOT_FOUND';
  error_message?: string;
  html_attributions: string[];
}

// Search History interface for local storage
export interface SearchHistoryItem {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: Geometry;
  types: string[];
  timestamp: number;
  rating?: number;
  user_ratings_total?: number;
}

// Commonly used place types enum
export enum PlaceType {
  ACCOUNTING = 'accounting',
  AIRPORT = 'airport',
  AMUSEMENT_PARK = 'amusement_park',
  AQUARIUM = 'aquarium',
  ART_GALLERY = 'art_gallery',
  ATM = 'atm',
  BAKERY = 'bakery',
  BANK = 'bank',
  BAR = 'bar',
  BEAUTY_SALON = 'beauty_salon',
  BICYCLE_STORE = 'bicycle_store',
  BOOK_STORE = 'book_store',
  BOWLING_ALLEY = 'bowling_alley',
  BUS_STATION = 'bus_station',
  CAFE = 'cafe',
  CAMPGROUND = 'campground',
  CAR_DEALER = 'car_dealer',
  CAR_RENTAL = 'car_rental',
  CAR_REPAIR = 'car_repair',
  CAR_WASH = 'car_wash',
  CASINO = 'casino',
  CEMETERY = 'cemetery',
  CHURCH = 'church',
  CITY_HALL = 'city_hall',
  CLOTHING_STORE = 'clothing_store',
  CONVENIENCE_STORE = 'convenience_store',
  COURTHOUSE = 'courthouse',
  DENTIST = 'dentist',
  DEPARTMENT_STORE = 'department_store',
  DOCTOR = 'doctor',
  DRUGSTORE = 'drugstore',
  ELECTRICIAN = 'electrician',
  ELECTRONICS_STORE = 'electronics_store',
  EMBASSY = 'embassy',
  ESTABLISHMENT = 'establishment',
  FINANCE = 'finance',
  FIRE_STATION = 'fire_station',
  FLORIST = 'florist',
  FOOD = 'food',
  FUNERAL_HOME = 'funeral_home',
  FURNITURE_STORE = 'furniture_store',
  GAS_STATION = 'gas_station',
  GYM = 'gym',
  HAIR_CARE = 'hair_care',
  HARDWARE_STORE = 'hardware_store',
  HEALTH = 'health',
  HINDU_TEMPLE = 'hindu_temple',
  HOME_GOODS_STORE = 'home_goods_store',
  HOSPITAL = 'hospital',
  INSURANCE_AGENCY = 'insurance_agency',
  JEWELRY_STORE = 'jewelry_store',
  LAUNDRY = 'laundry',
  LAWYER = 'lawyer',
  LIBRARY = 'library',
  LIQUOR_STORE = 'liquor_store',
  LOCAL_GOVERNMENT_OFFICE = 'local_government_office',
  LOCKSMITH = 'locksmith',
  LODGING = 'lodging',
  MEAL_DELIVERY = 'meal_delivery',
  MEAL_TAKEAWAY = 'meal_takeaway',
  MOSQUE = 'mosque',
  MOVIE_RENTAL = 'movie_rental',
  MOVIE_THEATER = 'movie_theater',
  MOVING_COMPANY = 'moving_company',
  MUSEUM = 'museum',
  NIGHT_CLUB = 'night_club',
  PAINTER = 'painter',
  PARK = 'park',
  PARKING = 'parking',
  PET_STORE = 'pet_store',
  PHARMACY = 'pharmacy',
  PHYSIOTHERAPIST = 'physiotherapist',
  PLACE_OF_WORSHIP = 'place_of_worship',
  PLUMBER = 'plumber',
  POLICE = 'police',
  POST_OFFICE = 'post_office',
  REAL_ESTATE_AGENCY = 'real_estate_agency',
  RESTAURANT = 'restaurant',
  ROOFING_CONTRACTOR = 'roofing_contractor',
  RV_PARK = 'rv_park',
  SCHOOL = 'school',
  SHOE_STORE = 'shoe_store',
  SHOPPING_MALL = 'shopping_mall',
  SPA = 'spa',
  STADIUM = 'stadium',
  STORAGE = 'storage',
  STORE = 'store',
  SUBWAY_STATION = 'subway_station',
  SYNAGOGUE = 'synagogue',
  TAXI_STAND = 'taxi_stand',
  TRAIN_STATION = 'train_station',
  TRANSIT_STATION = 'transit_station',
  TRAVEL_AGENCY = 'travel_agency',
  UNIVERSITY = 'university',
  VETERINARY_CARE = 'veterinary_care',
  ZOO = 'zoo'
}

// API Status enum
export enum ApiStatus {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_FOUND = 'NOT_FOUND'
}

// Business Status enum
export enum BusinessStatus {
  OPERATIONAL = 'OPERATIONAL',
  CLOSED_TEMPORARILY = 'CLOSED_TEMPORARILY',
  CLOSED_PERMANENTLY = 'CLOSED_PERMANENTLY'
}

// Price Level enum (0-4 scale)
export enum PriceLevel {
  FREE = 0,
  INEXPENSIVE = 1,
  MODERATE = 2,
  EXPENSIVE = 3,
  VERY_EXPENSIVE = 4
}

// Fields that can be requested for Place Details API
export type PlaceField = 
  | 'address_components'
  | 'adr_address'
  | 'business_status'
  | 'formatted_address'
  | 'geometry'
  | 'icon'
  | 'icon_background_color'
  | 'icon_mask_base_uri'
  | 'name'
  | 'opening_hours'
  | 'photos'
  | 'place_id'
  | 'plus_code'
  | 'price_level'
  | 'rating'
  | 'reference'
  | 'reviews'
  | 'scope'
  | 'types'
  | 'url'
  | 'user_ratings_total'
  | 'utc_offset'
  | 'vicinity'
  | 'website'
  | 'formatted_phone_number'
  | 'international_phone_number';

// Utility type for partial place updates
export type PlaceUpdate = Partial<Place>;

/**
 * 
 * @description Checks if the place object has all required fields.
 * @param place Place object to validate
 * @returns boolean indicating if the place is valid
 */
export const isValidPlace = (place: any): place is Place => {
  return (
    typeof place === 'object' &&
    typeof place.place_id === 'string' &&
    typeof place.name === 'string' &&
    typeof place.formatted_address === 'string' &&
    place.geometry &&
    typeof place.geometry.location.lat === 'number' &&
    typeof place.geometry.location.lng === 'number' &&
    Array.isArray(place.types)
  );
};

/**
 * 
 * @description Checks if the coordinate object has valid latitude and longitude values.
 * @param coord Coordinate object to validate
 * @returns boolean indicating if the coordinate is valid
 */
export const isValidLatLng = (coord: any): coord is LatLng => {
  return (
    typeof coord === 'object' &&
    typeof coord.lat === 'number' &&
    typeof coord.lng === 'number' &&
    coord.lat >= -90 &&
    coord.lat <= 90 &&
    coord.lng >= -180 &&
    coord.lng <= 180
  );
};
