import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Header from "../head/header";
import axios from "axios";
import { useSelector } from "react-redux";

const ShowPrestation = ({ route }) => {
  const { vistID } = route.params || {};
  const clientID = useSelector((state) => state.client.clientID);
  console.log("ClientID from Page show :", clientID);
  console.log("show vist", vistID);

  const [data, setData] = useState([]); // Assuming marketplaceData is passed as a prop

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await axios.get(
        `http://192.168.100.150:8000/api/send-prestations/${vistID}`
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data); // Set data to state
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [vistID]);
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);

    // Date part
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are zero-indexed
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    // Time part
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Header Information */}
      <View style={styles.header1}>
        <Image source={require("../../assets/logo1.png")} style={styles.logo} />
        <Text style={styles.title}>
          Demande Prestation {data.length > 0 ? data[0].vistID : "Loading..."}
        </Text>
      </View>

      <Text style={styles.date}>Ville, le ../../....</Text>

      {/* Company Information */}
      <View style={styles.companyInfo}>
        <Text>INOVTEAM</Text>
        <Text>10 Bd de la Liberté, Casablanca 20120</Text>
        <Text>CASABLANCA, .......</Text>
        <Text>+212 652963481</Text>
        <Text>Email@gmail.com</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Title</Text>
          <Text style={styles.tableHeaderCell}>Prix</Text>
          <Text style={styles.tableHeaderCell}>Adress</Text>
          <Text style={styles.tableHeaderCell}>Surface</Text>
        </View>

        <FlatList
          data={data} // Use the data from state
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.title}</Text>
              <Text style={styles.tableCell}>{item.prix}</Text>
              <Text style={styles.tableCell}>{item.adress}</Text>
              <Text style={styles.tableCell}>{item.surface}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
        />
      </View>

      {/* Total */}
      {data.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total HT: </Text>
          <Text style={styles.totalValue}>{data[0].prix}</Text>
        </View>
      )}

      {/* Company Info and Description */}
      <View style={styles.companyInfo1}>
        <View style={styles.dates}>
          <Text>Dates:</Text>
          {data.length > 0 && (
            <>
              <Text>{formatDateAndTime(data[0].date1)}</Text>
              <Text>{formatDateAndTime(data[0].date2)}</Text>
              <Text>{formatDateAndTime(data[0].date3)}</Text>
              <Text>{formatDateAndTime(data[0].date4)}</Text>
            </>
          )}
        </View>
        <View style={styles.divider}></View>
        <View style={styles.comm}>
          <Text>Description:</Text>
          {data.length > 0 && <Text>{data[0].description}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  },
  companyInfo1: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dates: {
    flex: 1,
    marginRight: 10,
  },
  divider: {
    width: 1,
    backgroundColor: "#203165",
    height: "100%",
    marginHorizontal: 10,
  },
  comm: {
    flex: 1,
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default ShowPrestation;
