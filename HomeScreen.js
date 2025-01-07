import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList, 
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "./component/head/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
//API
const API_PRODUCTS = "http://192.168.100.150:8000/api/products";

const Home = () => {
  const clientID = useSelector((state) => state.client.clientID);
  console.log('ClientID from Page home screen :',clientID)
  
  
  const [products, setProducts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(API_PRODUCTS) // Replace with your server's IP or URL
      .then((response) => {
        //const {produit}=response.data
        //console.log(response.data)
        // console.log(produit)
        
        const formattedData = response.data.map((item) => ({
          id: item.id,
          name: item.title,
          image: { uri: item.image },
          prix: item.prix,
          description: item.description,
        }));
        //console.log(formattedData);
        
        setProducts(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);



  const handleBack = () => {
    navigation.goBack()
  };


  const handleImagePress = (product) => {
    console.log("Navigating with product:", product);
    navigation.navigate("PageDetails", { product, clientID });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header/>
      {/* Product List */}
      <View style={{ flexDirection: "row", paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginBottom: 5,
            right: 0,
            color: "#203165",
            fontWeight: "bold",
          }}
        >
          All Products:
        </Text>
        <Text
          style={{
            left: 175,
            fontSize: 25,
            color: "#203165",
            fontWeight: "bold",
          }}
          onPress={handleBack}
        >
          <AntDesign name="arrowleft" size={24} color="#203165" /> Back
        </Text>
      </View>

      {/* Bordered Container for Scroll */}
      <View style={styles.borderedContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleImagePress(item)}>
                <Image source={item.image} style={styles.image} /> 
              </TouchableOpacity>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
              </View>
              <Text style={{ fontSize: 20, right: 30 }}>{item.prix} DH</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleImagePress(item)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "##e2e2e2",
    bottom:10
  },

  borderedContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#203165",
    borderRadius: 10,
    overflow: "hidden",
    
  },
  listContent: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    margin: 4,
  },
  image: {
    width: 175,
    height: 160,
    borderRadius: 10,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    right: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#FBBF46",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    width:'100%'
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign:'center'
  },
  detailsButton: {
    backgroundColor: "#203165",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Home;
