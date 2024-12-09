import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "./component/head/header";
import EventCard from "./component/eventCard";
import TableExample from "./component/table";
import WelcomeScreen from "./component/test";

const User = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <WelcomeScreen />
        <EventCard />
        <TableExample />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff", // خلفية بيضاء للتطبيق
  },
  scrollContainer: {
    paddingVertical: 10, // إضافة تباعد عمودي بين العناصر
  },
});

export default User;
