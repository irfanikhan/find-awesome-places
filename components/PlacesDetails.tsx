import { Place } from "@/types/googlePlaces";
import Icon from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

/**
 * Displays detailed information about a Google Place.
 * @param place The place object containing details to display.
 */
const PlaceDetails = ({ place }: { place: Place }) => {
  if (!place) return null;

  /**
   * Renders the rating as a row of stars and the numeric value.
   * @param rating The rating value (0-5).
   */
  const renderRating = (rating: number) => {
    if (!rating) return null;
    const stars = Math.floor(rating);
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="star"
            size={16}
            color={i < stars ? "#FFD700" : "#e0e0e0"}
          />
        ))}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Place Name */}
        <Text style={styles.name}>{place.name}</Text>
        {/* Place Address */}
        <Text style={styles.address}>{place.formatted_address}</Text>

        {/* Place Rating */}
        {place.rating && renderRating(place.rating)}

        {/* Phone Number */}
        {place.formatted_phone_number && (
          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color="#666" />
            <Text style={styles.detailText}>
              {place.formatted_phone_number}
            </Text>
          </View>
        )}

        {/* Website */}
        {place.website && (
          <View style={styles.detailRow}>
            <Icon name="language" size={20} color="#666" />
            <Text style={styles.detailText}>{place.website}</Text>
          </View>
        )}

        {/* Opening Hours */}
        {place.opening_hours && (
          <View style={styles.detailRow}>
            <Icon name="schedule" size={20} color="#666" />
            <Text style={styles.detailText}>
              {place.opening_hours.open_now ? "Open Now" : "Closed"}
            </Text>
          </View>
        )}

        {/* Place Types (Tags) */}
        {place.types && place.types.length > 0 && (
          <View style={styles.tagsContainer}>
            {place.types.slice(0, 3).map((type: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>
                  {type
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

/**
 * Styles for the PlaceDetails component.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: height * 0.7,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#666666",
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default PlaceDetails;
