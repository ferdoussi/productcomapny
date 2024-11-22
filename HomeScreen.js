import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [products] = useState([
    { id: '1', name: 'Product 1', image: require('./assets/2-image.jpg'), note: '5' },
    { id: '2', name: 'Product 2', image: require('./assets/2-image.jpg'), note: '5' },
    { id: '3', name: 'Product 3', image: require('./assets/2-image.jpg'), note: '5' },
    { id: '4', name: 'Product 4', image: require('./assets/2-image.jpg'), note: '5' },
    { id: '5', name: 'Product 5', image: require('./assets/2-image.jpg'), note: '5' },
    { id: '6', name: 'Product 6', image: require('./assets/2-image.jpg'), note: '5' },
  ]);

  const [marketplace, setMarketplace] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const addToMarketplace = (product) => {
    setMarketplace([...marketplace, product]);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.marketplaceIcon}>
            <Icon name="cart" size={25} color="#fff" />
            {marketplace.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{marketplace.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="person" size={20} color="#203165" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Icon name="log-out" size={20} color="#203165" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Product List */}
      <Text style={{fontSize:20,textAlign:'center',marginBottom:5}}>Products:</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Image source={item.image} style={styles.image} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.note}</Text>
                <AntDesign name="star" size={18} color="#FBBF46" />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={() => addToMarketplace(item)}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  menuIcon: {
    backgroundColor: '#203165',
    padding: 10,
    borderRadius: 25,
    top: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    backgroundColor: '#203165',
    padding: 10,
    borderRadius: 25,
    marginRight: 15,
    top: 5,
  },
  marketplaceIcon: {
    backgroundColor: '#203165',
    padding: 10,
    borderRadius: 25,
    top: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 80,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#203165',
  },
  closeButton: {
    backgroundColor: '#FBBF46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#203165',
    fontWeight: '600',
  },
  card: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    margin: 10,
  },
  image: {
    width: 180,
    height: 170,
    borderRadius: 10,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft:6
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 17,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#203165',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#FBBF46',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsButtonText: {
    color: '#203165',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Home;
