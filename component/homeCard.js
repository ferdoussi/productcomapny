import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const EventCard = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  const handleProdact = () => {
    navigation.navigate("Home");
  };
  const handleImagePress = () => {
    navigation.navigate('PageDetails');
  };
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Product:</Text>
        <Text style={styles.showText} onPress={handleProdact} >
          All
          <AntDesign name="arrowright" size={24} color="#203165" />
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.scrollWrapper}>
          <TouchableOpacity style={styles.scrollButton} onPress={scrollLeft}>
            <AntDesign name="left" size={20} color="#203165" />
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            ref={scrollViewRef}
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity onPress={() => handleImagePress("Home")}>
              <View style={[styles.card, styles.cardElevated]}>
                <Image source={require('../assets/image/elc.jpg')} style={styles.image} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress("ProductDetails")}>
              <View style={[styles.card, styles.cardElevated]}>
                <Image source={require('../assets/image/menage.jpg')} style={styles.image} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress("ProductDetails")}>
              <View style={[styles.card, styles.cardElevated]}>
                <Image source={require('../assets/image/plb.jpg')} style={styles.image} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress("ProductDetails")}>
              <View style={[styles.card, styles.cardElevated]}>
                <Image source={require('../assets/image/Deratisation.jpg')} style={styles.image} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress("ProductDetails")}>
              <View style={[styles.card, styles.cardElevated]}>
                <Image source={require('../assets/2-image.jpg')} style={styles.image} />
              </View>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.scrollButton} onPress={scrollRight}>
            <AntDesign name="right" size={20} color="#203165" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
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
    borderColor: '#203165',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  scrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:-13,
    marginLeft:-13
  },
  scrollView: {
    flex: 1,
  },
  scrollButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 80,
    borderRadius: 8,
    margin: 8,
  },
  cardElevated: {
    backgroundColor: '#FFB6C1',
    elevation: 10,
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
