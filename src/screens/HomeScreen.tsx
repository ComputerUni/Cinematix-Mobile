import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import LottieView from "lottie-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await searchMovies(searchQuery);
      if (res?.Response?.toLowerCase() === "true") {
        const incomingMovies = res.Search || [];
        setMovies(incomingMovies);
      } else {
        setMovies([]);
        setError(res?.Error || "No movies found");
      }
    } catch (error) {
      setError("Something went wrong while searching for movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or series..."
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.accent}
          returnKeyType="search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.searchButtonPressed,
          ]}
          onPress={handleSearch}
        >
          <MaterialCommunityIcons
            name="movie-search-outline"
            size={s(20)}
            color={Colors.accent}
          />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/animations/dice-loader.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="error-outline"
            size={s(36)}
            color={Colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.imdbID}
          key={`movies-${movies.length}`}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: s(10),
    padding: s(7),
    borderWidth: s(1),
    borderColor: Colors.border,
    margin: s(7),
  },
  searchInput: {
    flex: 1,
    marginLeft: s(6),
    color: Colors.textPrimary,
    fontSize: s(13),
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderRadius: s(8),
    marginLeft: s(6),
  },
  searchButtonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.92 }],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: s(40),
    height: s(40),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: Colors.error,
    fontSize: s(16),
    textAlign: "center",
    margin: s(7),
    fontWeight: "bold",
  },
});
