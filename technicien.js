// Technicien.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Technicien = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome, Technician!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Technicien;
