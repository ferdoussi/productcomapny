import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native'; // استيراد useNavigation
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "./head/header";
import { useSelector } from 'react-redux'; // استيراد useSelector للوصول إلى الحالة من Redux
import axios from "axios";

const Marketplace = ({ route }) => {
  const { vistid } = route.params || {};
  const clientID = useSelector((state) => state.client.clientID);
  console.log('ClientID from Page MarketPlace :', clientID);
  console.log("Marketplace vist", vistid);

  const [marketplaceData, setMarketplaceData] = useState([]); // حالة البيانات
  const [error, setError] = useState(null); // حالة الخطأ
  const [message, setMessage] = useState(null); // حالة الرسالة للعرض
  const navigation = useNavigation(); // الوصول إلى التنقل
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for vistid: ${vistid}`);
        const response = await axios.get(
          `http://192.168.100.150:8000/api/prestation/${vistid}`
        );

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        setMarketplaceData(response.data);
        console.log("Updated marketplaceData state:", response.data);
      } catch (err) {
        console.error("Error fetching data:", err.response ? err.response.data : err.message);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [vistid]);

  if (error) {
    return <Text>{error}</Text>;
  }

  // دالة حذف العنصر
  const handleDelete = async (id) => {
    console.log("Deleting item with id:", id);
    setMarketplaceData((prevData) => {
      if (Array.isArray(prevData)) {
        return prevData.filter((item) => item.id !== id); // حذف العنصر من الواجهة
      }
      return [];
    });

    try {
      const response = await axios.delete(`http://192.168.100.150:8000/api/prestations/${id}`);
      console.log("Item deleted from database:", response.data);

      if (response.status === 200) {
        console.log("Item successfully deleted");
        navigation.navigate("ClientHome", { clientID });
      }
    } catch (err) {
      console.error("Error deleting item:", err.response ? err.response.data : err.message);
      setError("Failed to delete item.");
    }
  };

  const handleSendData = async () => {
    try {
      console.log("Sending data to API...");

      // التأكد من تنسيق التواريخ
      const formattedData = {
        ...marketplaceData,
        total: marketplaceData.total || 0, // Ensure the total is included
        date1: formatDate(marketplaceData.date1),
        date2: formatDate(marketplaceData.date2),
        date3: formatDate(marketplaceData.date3),
        date4: formatDate(marketplaceData.date4),
      };

      const response = await axios.post("http://192.168.100.150:8000/api/send-prestations", formattedData);

      if (response.status === 200 || response.status === 201) {
        console.log("Data sent successfully:", response.data);
        setMessage({ text: "Data sent successfully!", type: "success" });
        navigation.navigate('ClientHome');
      } else {
        console.error("Unexpected response status:", response.status);
        setMessage({ text: "Failed to send data.", type: "error" });
      }
    } catch (err) {
      console.error("Error sending data:", err.response ? err.response.data : err.message);
      setMessage({ text: `Failed to send data. ${err.response ? err.response.data : err.message}`, type: "error" });
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);

    let hour = formattedDate.getHours();
    const minute = ("0" + formattedDate.getMinutes()).slice(-2);
    let ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    if (hour === 0) {
      hour = 12; // Midnight case
    } else if (hour > 12) {
      hour = hour - 12; // Convert 24-hour to 12-hour format
    }

    const year = formattedDate.getFullYear();
    const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
    const day = ("0" + formattedDate.getDate()).slice(-2);

    // Ensure leading zero for single-digit hours
    const hourWithLeadingZero = ("0" + hour).slice(-2);

    // Return formatted string in Y-m-d h:i A format
    return `${year}-${month}-${day} ${hourWithLeadingZero}:${minute} ${ampm}`;
  };
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
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Header Information */}
      <View style={styles.header1}>
        <Image source={require("../assets/logo1.png")} style={styles.logo} />
        <Text style={styles.title}>Demande Prestation {marketplaceData.id}</Text>
      </View>
      <Text style={styles.date}>Ville, le ../../....</Text>

      {/* Message Display */}
      {message && (
        <Text style={[styles.message, message.type === 'success' ? styles.successMessage : styles.errorMessage]}>
          {message.text}
        </Text>
      )}

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
          <Text style={styles.tableHeaderCell}>Action</Text>
        </View>
        <FlatList
          data={[marketplaceData]} // wrap the data in an array
          keyExtractor={(item) => (item.id ? item.id.toString() : item.title)}
          renderItem={({ item }) => {
            console.log("Item:", item);
            return (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.title}</Text>
                <Text style={styles.tableCell}>{item.prix} DH</Text>
                <Text style={styles.tableCell}>{item.adress}</Text> 
                <Text style={styles.tableCell}>{item.surface}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <AntDesign name="delete" size={15} color="red" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total HT:</Text>
        <Text style={styles.totalValue}>{marketplaceData?.prix} DH</Text>
      </View>

      {/* Company Info and Description */}
      <View style={styles.companyInfo1}>
        <View style={styles.dates}>
          <Text>Dates:</Text>
          <Text>{formatDateAndTime(marketplaceData.date1)}</Text>
          <Text>{formatDateAndTime(marketplaceData.date2)}</Text>
          <Text>{formatDateAndTime(marketplaceData.date3)}</Text>
          <Text>{formatDateAndTime(marketplaceData.date4)}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.comm}>
          <Text>Description:</Text>
          <Text>{marketplaceData?.description}</Text>
        </View>
        
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendData}>
        <Text style={styles.sendButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  message: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  successMessage: {
    color: "green",
  },
  errorMessage: {
    color: "red",
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
