import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import searchMovies from "../api/omdb";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    searchMovies(searchQuery);
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
    paddingHorizontal: s(7),
    paddingVertical: vs(2),
    borderWidth: s(1),
    borderColor: Colors.border,
    margin: s(10),
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
});
