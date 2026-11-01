import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { OmdbSearchItem } from "../api/omdb";
import { s, vs } from "react-native-size-matters";
import { Colors } from "../theme/colors";

export default function MovieCard({ movie }: { movie: OmdbSearchItem }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.movieCard,
        pressed && styles.movieCardPressed,
      ]}
    >
      <View style={styles.movieCardImageContainer}>
        <Image source={{ uri: movie.Poster }} style={styles.movieCardImage} />
        <View style={styles.movieCardInfo}>
          <Text style={styles.movieCardTitle}>{movie.Title}</Text>
          <Text style={styles.movieCardYear}>{movie.Year}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieCard: {
    width: "50%",
    padding: s(7),
  },
  movieCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  movieCardImageContainer: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: s(10),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  movieCardImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: Colors.cardElevated,
    resizeMode: "cover",
  },
  movieCardInfo: {
    padding: s(8),
    gap: vs(3),
  },
  movieCardTitle: {
    fontSize: s(13),
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  movieCardYear: {
    fontSize: s(12),
    color: Colors.textMuted,
  },
});
