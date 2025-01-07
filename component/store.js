import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "./head/header";
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import axios from "axios";

const Store = () => {
  const clientID = useSelector((state) => state.client.clientID);
  console.log('ClientID from store page :',clientID)
  
  //console.log('type of ',typeof userID?.userID)
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://192.168.100.150:8000/api/prestations/${clientID}`;
        const response = await axios.get(url);
  
        if (response.data && Array.isArray(response.data)) {
          const formattedData = response.data.map(item => ({
            id: item.id,
            title: item.title,
            prix: item.prix,
            surface: item.surface,
            address: item.adress,
          }));
  
          setProducts(formattedData);
        } else {
          console.log("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Check if clientID is available before calling the API
    if (clientID) {
      fetchProducts();
    } else {
      console.log('ClientID not available');
    }
  }, [clientID]);  // Re-run the effect when clientID changes
  


  const handleContinue = (vistid) => {
    console.log('passing vistid and userid',vistid,clientID)
    navigation.navigate("Marketplace", { vistid,clientID });
  };

  if (!clientID) {
    return <Text>No valid user ID provided.</Text>;
  }

  

  if (error) {
    return (
      <Text>{error.message ? error.message : "An unknown error occurred"}</Text>
    );
  }

  return (
    <>
      <Header/>
      <ScrollView style={styles.container}>
        {products.map(product => (
          <View key={product.id} style={styles.cardContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{product.title || "No Title Available"}</Text>
              <Text style={styles.price}>Prix: {product.prix || "N/A"}</Text>
              <Text style={styles.detailsText}>Surface: {product.surface || "N/A"}</Text>
              <Text style={styles.detailsText}>Address: {product.address || "N/A"}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleContinue(product.id)}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  cardContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  infoContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "#203165",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Store;
