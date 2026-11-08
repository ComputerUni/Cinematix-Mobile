import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import CATEGORIES from "../constants/categories";
import { s, vs } from "react-native-size-matters";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import MovieCard from "../components/MovieCard";
import CustomLoading from "../components/CustomLoading";

export default function CategoriesScreen() {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(true);
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
    } catch (err) {
      setMovies([]);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [active]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesWrapper}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((c) => {
          const isSelected = active.key === c.key;

          return (
            <Pressable
              key={c.key}
              onPress={() => setActive(c)}
              style={({ pressed }) => [
                styles.categoriesContainer,
                {
                  backgroundColor: isSelected
                    ? Colors.accent
                    : Colors.cardElevated,
                  borderColor: isSelected ? Colors.accent : Colors.border,
                },
                pressed && styles.categoriesContainerPressed,
              ]}
            >
              <Text
                style={[
                  styles.categories,
                  {
                    color: isSelected
                      ? Colors.textInverse
                      : Colors.textSecondary,
                  },
                ]}
              >
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {loading ? (
        <CustomLoading />
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
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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

  categoriesWrapper: {
    flexGrow: 0,
  },

  categoriesContent: {
    paddingHorizontal: s(12),
    paddingVertical: vs(8),
    gap: s(8),
    alignItems: "center",
  },

  categoriesContainer: {
    height: vs(32),
    paddingHorizontal: s(14),
    borderRadius: s(16),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  categoriesContainerPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  categories: {
    fontSize: s(13),
    fontWeight: "700",
  },

  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: s(12),
  },

  listContent: {
    paddingTop: vs(8),
    paddingBottom: vs(20),
    gap: vs(12),
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lottieAnimation: {
    width: s(60),
    height: s(60),
  },
});
