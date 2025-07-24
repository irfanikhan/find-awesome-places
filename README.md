# Google Places React Native App

A cross-platform React Native app built with [Expo](https://expo.dev) that allows users to search for places using the Google Places API, view place details, see results on a map, and manage search history. The app supports both light and dark themes and is optimized for iOS, Android, and web.

---

## Features

- **Google Places Autocomplete**: Search for places with real-time suggestions.
- **Map Integration**: View selected places on a Google Map.
- **Place Details**: See address, rating, phone, website, opening hours, and types.
- **Search History**: Quickly access previously searched places.
- **Light/Dark Theme**: Adapts to system color scheme.
- **Persistent Storage**: Search history is saved using AsyncStorage.
- **Debounced Search**: Reduces API calls for better performance.
- **Cross-Platform**: Works on iOS, Android, and web.

---

## Project Structure

```
.
├── app/                  # App entry and screens (file-based routing)
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   └── index.tsx
├── assets/               # Fonts and images
├── components/           # UI components (MapView, SearchBar, etc.)
│   └── ui/               # Platform-specific UI shims
├── constants/            # App-wide constants (e.g., Colors)
├── context/              # React Context providers (e.g., HistoryContext)
├── hooks/                # Custom React hooks
├── services/             # API and storage services
├── types/                # TypeScript types and interfaces
├── utils/                # Utility functions and mock data
├── scripts/              # Project scripts (e.g., reset-project.js)
├── .env                  # Environment variables (not committed)
├── app.config.js         # Expo app configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/irfanikhan/google-places.git
cd google-places
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Google Places API key:

```
EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

- The `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY` is used for Google Places API requests.
- The `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` is used for displaying maps.

> **Note:** Never commit your API keys to version control.

### 4. Start the App

```sh
npx expo start
```

- Use the Expo CLI to open the app in an Android/iOS simulator, device, or web browser.

### 5. Add Environment Variables to EAS

To ensure your builds have access to the required API keys, add the same environment variables to your EAS project:

1. **Via EAS CLI:**

   ```sh
   eas secret:create --name EXPO_PUBLIC_GOOGLE_PLACES_API_KEY --value your_google_places_api_key
   eas secret:create --name EXPO_PUBLIC_GOOGLE_MAPS_API_KEY --value your_google_maps_api_key
   ```

2. **Or via Expo Dashboard:**

   - Go to [Expo Dashboard](https://expo.dev/accounts)
   - Select your project.
   - Navigate to **Project > Environment Variables**.
   - Add:
     - `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`
     - `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Set their values to match your local `.env` file.

> **Note:** These environment variables will be available during your EAS builds, ensuring your app works correctly in preview and production.

---

## Usage

- **Search**: Type a place name or address in the search bar.
- **View Results**: Select a suggestion to view details and see it on the map.
- **History**: Tap the history icon to view or select from previous searches.
- **Clear Search**: Use the clear button in the search bar to reset your query.

---

## Main Technologies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Key Files and Modules

- **[app/index.tsx](app/index.tsx)**: Main screen, search bar, map, results, and details.
- **[components/](components/)**: UI components like [`MapView`](components/MapView.tsx), [`SearchBar`](components/SearchBar.tsx), [`SearchHistory`](components/SearchHistory.tsx), [`SearchResult`](components/SearchResult.tsx), [`PlacesDetails`](components/PlacesDetails.tsx).
- **[hooks/usePlacesSearch.ts](hooks/usePlacesSearch.ts)**: Custom hook for search logic and state.
- **[services/GooglePlacesAPI.ts](services/GooglePlacesAPI.ts)**: Handles Google Places API requests.
- **[services/StorageService.ts](services/StorageService.ts)**: Manages persistent search history.
- **[context/HistoryContext.tsx](context/HistoryContext.tsx)**: Provides search history context.
- **[types/googlePlaces.ts](types/googlePlaces.ts)**: TypeScript types for Google Places API.

---

## Customization

- **Colors/Theming**: Edit [`constants/Colors.ts`](constants/Colors.ts) for app colors.
- **Fonts**: Add or change fonts in `assets/fonts` and update [`app/_layout.tsx`](app/_layout.tsx).
- **API Fields**: Modify requested fields in [`services/GooglePlacesAPI.ts`](services/GooglePlacesAPI.ts).

---

## Scripts

- **Reset Project**: Move starter code to `app-example` and create a blank app directory.
  ```sh
  npm run reset-project
  ```

---

## Troubleshooting

- Make sure your API keys are correct and enabled for the required Google APIs.
- If you see map or autocomplete errors, check your `.env` and Google Cloud Console restrictions.
- For iOS/Android, ensure you have the correct simulators or devices set up.

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service/overview)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

---

## Building the App

You can build the app for Android using [EAS Build](https://docs.expo.dev/build/introduction/).

### 1. Install EAS CLI

If you haven't already, install the EAS CLI globally:

```sh
npm install -g eas-cli
```

### 2. Login to Expo

Authenticate with your Expo account:

```sh
eas login
```

Follow the prompts to log in or create an account.

### 3. Configure EAS

Initialize EAS in your project (if not already done):

```sh
eas build:configure
```

This will create or update the `eas.json` file in your project.

### 4. Build for Android

#### For Preview (Development)

```sh
eas build --platform android --profile preview
```

#### For Production

```sh
eas build --platform android --profile production
```

- The build process will upload your project and generate an APK or AAB file.
- Once the build is complete, you will receive a download link in the terminal or on the Expo dashboard.

> **Note:** You may need to set up Android keystore credentials if building for production. Follow the prompts or see the [Expo docs](https://docs.expo.dev/build/android/credentials/) for more information.

