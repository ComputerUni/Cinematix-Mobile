import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import CATEGORIES from "../constants/categories";
import { s, vs } from "react-native-size-matters";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CategoriesScreen() {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await searchMovies(active.query, 1);
      if (res.Response === "True" && res.Search) {
        setMovies(res.Search);
      } else {
        setMovies([]);
        setError(res.Error || "Movie not found!");
      }
    } catch (error) {
      setMovies([]);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        horizontal
        contentContainerStyle={{ padding: s(12), gap: s(8) }}
      >
        {CATEGORIES.map((c) => (
          <Pressable
            style={({ pressed }) => [
              styles.categoriesContainer,
              pressed && styles.categoriesContainerPressed,
            ]}
          >
            <Text style={styles.categories}>{c.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {error !== "" ? (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="error-outline"
            size={s(36)}
            color={Colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  categoriesContainer: {
    backgroundColor: Colors.cardElevated,
    height: vs(32),
    paddingHorizontal: s(14),
    borderRadius: s(16),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  categoriesContainerPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  categories: {
    color: Colors.textSecondary,
    fontSize: s(13),
    fontWeight: "700",
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
