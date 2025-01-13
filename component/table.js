import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView ,TouchableOpacity} from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
const TableExample = (vistID) => {
console.log('table vist',vistID)

  const [data, setData] = useState([]);
  const clientID = useSelector((state) => state.client.clientID);
  console.log('table id',clientID)
  const navigation = useNavigation();
  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      console.log("Fetching data..."); // Log when fetch starts
      const response = await axios.get(`http://192.168.100.150:8000/api/send-prestation/${clientID}`);
      console.log("API Response:", response.data); // Log the API response
  
      // Check if the response is an array
      if (Array.isArray(response.data)) {
        setData(response.data); // Set the data directly
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message); // Log the error message
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

    const handleContinue = (vistID) => {
      console.log('passing vistid and userid table',vistID,clientID)
      navigation.navigate("ShowPrestation",{vistID,clientID}); 
    };
  
    if (!clientID) {
      return <Text>No valid user ID provided.</Text>;
    }
  

  return (
    <ScrollView style={styles.table}>
      <Text style={styles.id}>Table Prestations :</Text>
      <View style={styles.name}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>N!</Text>
          <Text style={styles.cellHeader}>Title</Text>
          <Text style={styles.cellHeader}>Total</Text>
          <Text style={styles.cellHeader}>Status</Text>
          <Text style={styles.cellHeader}>Action</Text>
        </View>
        {/* Render Data Rows */}
        {data.length > 0 ? (
  data.map((item, index) => (
    <View key={`${item.vistID}-${index}`} style={styles.row}>
      <Text style={styles.cell}>{item.vistID}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.prix}</Text>
      <Text style={{ color: "orange", width: "30%" }}>{item.status || "No Status"}</Text>
      <TouchableOpacity onPress={() => handleContinue(item.vistID)}>
        <Icon name="eye" size={20} color="#203165" />
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text style={styles.noDataText}>No data available</Text>
)}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  name: {
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  table: {
    marginTop: 10,
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute space evenly
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#203165",
  },
  cellHeader: {
    fontWeight: "bold",
    width: "20%", // Each column has equal width (20%)
    color: "#203165", // Dark blue color for headers
    textAlign: "center", // Centered text
    fontSize: 16,
  },
  cell: {
    width: "20%", // Each data column takes up 20% of the width
    textAlign: "center",
    color: "#495057", // Muted color for the text
    fontSize: 14,
  },
  id: {
    fontSize: 25,
    color: "#203165", // Dark blue color for title
    fontWeight: "bold",
    marginBottom: 10, // Spacing below the title
  }, 
  noDataText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: 10,
  },
});

export default TableExample;
