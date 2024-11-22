import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.View}>
      <Text style={styles.test}>Test:</Text>
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to My App</Text>
        <Text style={styles.subtitle}>Your adventure starts here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FBBF46", // Gold color for "Welcome"
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    fontStyle: "italic",
    textAlign: "center",
  },
  test:{
    fontSize:24,
    color:'#203165',
    fontWeight: 'bold',
  },
  View:{
    marginTop: 20,
  }
});

export default WelcomeScreen;
