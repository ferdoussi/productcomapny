import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const WelcomeScreen = () => {
  return (
    <View style={styles.View}>
      <Text style={styles.test}>Test:</Text>
      <View style={styles.overlay}>
        <Animatable.Text
          animation={{
            0: { transform: [{ scale: 1 }] }, // Normal size
            0.5: { transform: [{ scale: 1.5 }] }, // Bigger size
            1: { transform: [{ scale: 1 }] }, // Back to normal
          }}
          duration={1000} // Speed of the animation
          iterationCount="infinite" // Repeat forever
          direction="alternate" // Forward and reverse
          style={styles.welcomeText}
        >
          Welcome to My App
        </Animatable.Text>
        <Animatable.Text
          animation="fadeIn"
          delay={500}
          duration={1500}
          style={styles.subtitle}
        >
          Your adventure starts here
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    padding: 5,
    alignItems: "center",
    marginTop: 40,
    borderColor: '#203165',
    borderWidth: 1,
    borderRadius: 10,
    height:200
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
  test: {
    fontSize: 24,
    color: "#203165",
    fontWeight: "bold",
  },
  View: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
