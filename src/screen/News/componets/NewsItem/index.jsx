import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const NewsItem = ({ name, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
}

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200, // Adjust the height to suit your design
    backgroundColor: "white",
    borderRadius: 10,
  
    marginRight: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
   zIndex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
