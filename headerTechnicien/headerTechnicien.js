import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderTechnicien = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = async () => {
    try {
      // Remove the authentication token
      await AsyncStorage.removeItem('authToken');
      
      // Navigate to the login screen and clear the navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Error removing authToken", error);
    }
  };
  


  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#203165" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    padding:12
  },
  menuIcon: {
    backgroundColor: "#203165",
    padding: 10,
    borderRadius: 25,
    top: 5,
    left:3
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    backgroundColor: "#203165",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    top: 5,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  menu: {
    position: "absolute",
    top: 90,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#203165",
  },
  closeButton: {
    backgroundColor: "#FBBF46",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#203165",
    fontWeight: "600",
  },
});

export default HeaderTechnicien;
