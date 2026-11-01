import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { OmdbSearchItem } from "../api/omdb";

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
  movieCard: {},
  movieCardPressed: {},
  movieCardImageContainer: {},
  movieCardImage: {},
  movieCardInfo: {},
  movieCardTitle: {},
  movieCardYear: {},
});
