import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import LottieView from "lottie-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomLoading from "../components/CustomLoading";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = async (pageNum: number, isNewSearch = false) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasMore(false);
      return;
    }

    if (isNewSearch) setLoading(true);

    setError("");

    try {
      const res = await searchMovies(searchQuery, pageNum);
      if (res?.Response?.toLowerCase() === "true") {
        const incomingMovies = res.Search || [];

        setHasMore(incomingMovies.length === 10);

        //Bu kısımda aynı filmden birden fazla gelmesini engelleyerek her filmden bir adet göstermeyi sağlarız.
        setMovies((prev) => {
          const baseList =
            pageNum === 1 ? incomingMovies : [...prev, ...incomingMovies];
          const seenIds = new Set<string>();
          const uniqueMovies = baseList.filter((movie: OmdbSearchItem) => {
            if (seenIds.has(movie.imdbID)) {
              return false;
            }
            seenIds.add(movie.imdbID);
            return true;
          });
          return uniqueMovies;
        });
      } else {
        if (pageNum === 1) {
          setMovies([]);
          setError(res?.Error || "No movies found");
        }
        setHasMore(false);
      }
    } catch (error) {
      if (pageNum === 1) {
        setMovies([]);
        setError("Something went wrong while searching for movies.");
      }
    } finally {
      if (isNewSearch) setLoading(false);
    }
  };

  const handleSearch = async () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    fetchMovies(1, true);
  };

  const loadMoreMovies = async () => {
    if (!hasMore || loading || loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      await fetchMovies(nextPage, false);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setMovies([]);
      setError("");
      return;
    }
    handleSearch();
  }, []);

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
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footerContainer}>
                <LottieView
                  source={require("../../assets/animations/chip-loader.json")}
                  autoPlay
                  loop
                  style={styles.chipsAnimation}
                />
              </View>
            ) : !hasMore && movies.length > 0 ? (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  {"You've seen all movies"}
                </Text>
              </View>
            ) : undefined
          }
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

  footerContainer: {
    paddingVertical: vs(10),
    alignItems: "center",
    justifyContent: "center",
  },
  chipsAnimation: {
    width: s(40),
    height: s(40),
  },
  footerText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.accent,
  },
});
