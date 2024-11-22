import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';

const EventCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Product:</Text>
        <Text style={styles.showText}>All
          <AntDesign name="arrowright" size={24} color="#203165" />
        </Text>
      </View>
      <View style={styles.container}>
      <ScrollView  horizontal={true}>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={require('../assets/image/elc.jpg')} style={styles.image} />
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={require('../assets/image/menage.jpg')} style={styles.image} />
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={require('../assets/image/plb.jpg')} style={styles.image} />
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={require('../assets/2-image.jpg')} style={styles.image} />
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={require('../assets/2-image.jpg')} style={styles.image} />
        </View>
        
      </ScrollView>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#203165',
  },
  showText: {
    fontSize: 24,
    paddingLeft: 10,
    color: '#203165',
    textAlign: 'right',
  },
  container: {
    padding: 8,
    borderColor: '#ae97ec',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 80,
    borderRadius: 8,
    margin: 8,
    marginBottom: 60,
  },
  cardElevated: {
    backgroundColor: '#FFB6C1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
});

export default EventCard;
