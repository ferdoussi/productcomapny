import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './component/head/header';
import EventCard from './component/homeCard';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import TableExample from './component/table';
import WelcomeScreen from './component/chart';

const User = () => {
  // Access clientID from Redux store
  const clientID = useSelector((state) => state.client.clientID);

  console.log('ClientID from user screen:', clientID);  // Log clientID to check if it's correct

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <WelcomeScreen />
        <EventCard 
        />
        <TableExample />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#fff", // White background for the app
  },
  scrollContainer: {
    paddingVertical: 10, // Vertical spacing between elements
    padding: 12,
  },
});

export default User;
