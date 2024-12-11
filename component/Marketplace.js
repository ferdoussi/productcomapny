import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Marketplace = ({ route }) => {
  const { marketplace } = route.params; // Data comes from previous screen

  // Initialize the marketplace state
  const [marketplaceData, setMarketplaceData] = useState(marketplace);

  // Calculate the total
  const totalPrix = marketplaceData.reduce(
    (total, product) => total + parseInt(product.prix),
    0
  );

  // Send function (can be customized as needed)
  const handleSend = () => {
    console.log("Produits envoyés:", marketplaceData);
    // API call or mail sending logic can be added here
  };

  // Handle delete of an item from marketplace
  
  const handleDelete = (id) => {
    // Show an alert to confirm deletion
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { 
          text: 'NO', 
          onPress: () => {
            // Do nothing, just close the alert
            console.log('Deletion canceled');
          },
          style: 'cancel' // Style for the cancel button
        },
        { 
          text: 'YES', 
          onPress: () => {
            // Proceed with deletion if OK is pressed
            const updatedMarketplace = marketplaceData.filter((item) => item.id !== id);
            setMarketplaceData(updatedMarketplace);
          },
          style: 'destructive' // Style for the destructive (red) button
        }
      ]
    );
  };
  

  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // const addToMarketplace = (product) => {
  //   setMarketplaceData([...marketplaceData, product]);
  // };

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

  const handleHome = () => {
    navigation.navigate("Home");
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
          <TouchableOpacity
            style={styles.marketplaceIcon}
            onPress={() =>
              navigation.navigate("Marketplace", {
                marketplace: marketplaceData,
              })
            }
          >
            <Icon name="cart" size={25} color="#fff" />
            {marketplaceData.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{marketplaceData.length}</Text>
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
          <TouchableOpacity style={styles.menuItem} onPress={handleHome}>
            <AntDesign name="caretleft" size={22} color="#203165" right={2}/>
            <Text style={styles.menuText}>Products</Text>
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

      {/* Header Information */}
      <View style={styles.header1}>
        <Image
          source={require("../assets/logo1.png")} // Add your logo here
          style={styles.logo}
        />
        <Text style={styles.title}>Demande Prestation N°</Text>
      </View>
      <Text style={styles.date}>Ville, le ../../....</Text>

      {/* Company Information */}
      <View style={styles.companyInfo}>
        <Text>INOVTEAM</Text>
        <Text>10 Bd de la Liberté, Casablanca 20120</Text>
        <Text>CASABLANCA,.......</Text>
        <Text>+212 652963481</Text>
        <Text>Email@gmail.com</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Description</Text>
          <Text style={styles.tableHeaderCell}>Prix Unitaire</Text>
          <Text style={styles.tableHeaderCell}>Quantité</Text>
          <Text style={styles.tableHeaderCell}>Montant HT</Text>
          <Text style={styles.tableHeaderCell}>Action</Text>
        </View>
        <FlatList
          data={marketplaceData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.prix} DH</Text>
              <Text style={styles.tableCell}>1</Text>
              <Text style={styles.tableCell}>{item.prix} DH</Text>
              <Text style={styles.tableCell}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => handleDelete(item.id)}
                >
                  <AntDesign name="delete" size={15} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text>.</Text>
                </TouchableOpacity>
              </Text>
            </View>
          )}
        />
      </View>
      
      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total HT:</Text>
        <Text style={styles.totalValue}>{totalPrix} DH</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa", // Light background for better contrast
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  menuIcon: {
    backgroundColor: "#203165",
    padding: 10,
    borderRadius: 25,
    elevation: 5, // Shadow effect
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    backgroundColor: "#203165",
    padding: 10,
    borderRadius: 25,
    marginRight: 15,
    elevation: 5,
  },
  marketplaceIcon: {
    backgroundColor: "#203165",
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#ff6b6b",
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
    top: 80,
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
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#203165",
    textAlign: "right",
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "right",
    bottom: 45,
  },
  companyInfo: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#203165",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  tableHeaderCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#203165",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f39c12",
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: "#FBBF46",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    fontSize: 18,
    color: "#203165",
    fontWeight: "bold",
  },
});

export default Marketplace;
