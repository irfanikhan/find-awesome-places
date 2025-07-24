import { Place } from "./googlePlaces";

export type RootStackParamList = {
  Home: { selectedPlace?: Place } | undefined;
  History: undefined;
};