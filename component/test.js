import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const WelcomeScreen = () => {
  return (
    <View style={styles.View}>
      <Text style={styles.test}>Test:</Text>
      <View style={styles.overlay}>
        <Animatable.Text 
          animation="slideInDown" iterationCount={50} direction="alternate"
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
