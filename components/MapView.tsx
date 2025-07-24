import { Place } from '@/types/googlePlaces';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { height } = Dimensions.get('window');

/**
 * Props for CustomMapView component.
 * @property {Place | null} selectedPlace - The currently selected place to display on the map.
 */
type CustomMapViewProps = {  
  selectedPlace: Place | null;
};

/**
 * CustomMapView displays a Google Map centered on a selected place, or a default region.
 * If a place is selected, a marker is shown at its location.
 * 
 * @param {CustomMapViewProps} props - The props for the component.
 * @returns {JSX.Element}
 */
const CustomMapView = ({ selectedPlace }: CustomMapViewProps) => {
  // Default region (San Francisco) if no place is selected
  const defaultRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  /**
   * Returns the region to display on the map.
   * If a place is selected, centers on that place; otherwise uses the default region.
   */
  const getRegion = () => {
    if (selectedPlace && selectedPlace.geometry) {
      const { lat, lng } = selectedPlace.geometry.location;
      return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return defaultRegion;
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[
          styles.map,
          // If a place is selected, reduce map height to half the screen
          !!selectedPlace && { height: height * 0.5 }
        ]}
        region={getRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {/* Show marker if a place is selected */}
        {selectedPlace && selectedPlace.geometry && (
          <Marker
            coordinate={{
              latitude: selectedPlace.geometry.location.lat,
              longitude: selectedPlace.geometry.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.formatted_address}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomMapView;