// Header.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = ({ marketplace, toggleMenu, menuVisible, handleLogout, handleBack }) => {
  return (
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
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
