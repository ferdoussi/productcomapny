import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  Linking,
} from "react-native";
import HeaderTechnicien from "./headerTechnicien/headerTechnicien";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector } from "react-redux";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
const Technicien = () => {
  const clientID = useSelector((state) => state.client.clientID);
  console.log("Technician Client ID:", clientID);

  const [prestations, setPrestations] = useState([]); // State for storing fetched prestations
  const [searchQuery, setSearchQuery] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add this function above your useEffect or inside the component 
  const getCurrentDateTime = () => {
    const currentDateTime = moment(); // Get the current date and time
    return currentDateTime.format("YYYY/MM/DD hh:mm A"); // Format as "15/01/2025 02:30 PM"
  };
  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        console.log("Fetching prestations data...");

        // استدعاء API باستخدام axios
        const response = await axios.get(
          `http://192.168.100.150:8000/api/prestations_techniciens/${clientID}`
        );

        console.log("Response Status:", response.status);

        // قراءة البيانات من الاستجابة
        const result = response.data;
        console.log("Fetched data:", result);

        // معالجة البيانات
        if (result.data) {
          const prestationsData = Array.isArray(result.data)
            ? result.data
            : [result.data]; // إذا كانت كائنًا واحدًا، نضعه في مصفوفة
          setPrestations(prestationsData);
        } else {
          setPrestations([]); // إذا لم تكن هناك بيانات
        }
      } catch (error) {
        console.error("Error fetching prestations:", error.message || error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (clientID) {
      fetchPrestations();
    }
  }, [clientID]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  // Assuming `prestations` is your data array and `searchQuery` is the selected date.
  const formatSearchQuery = (searchQuery) => {
    try {
      // Extract parts of the searchQuery
      const dateParts = searchQuery.split(" ");
      const [day, month, year] = dateParts[0].split("/"); // "DD/MM/YYYY"
      const timeParts = dateParts[1].split(":");
      const hour = parseInt(timeParts[0]);
      const minute = timeParts[1];
      const ampm = dateParts[2]; // "AM/PM"

      // Adjust hour based on AM/PM
      let formattedHour = hour;
      if (ampm === "PM" && hour < 12) {
        formattedHour = hour + 12; // Convert PM hours to 24-hour format
      } else if (ampm === "AM" && hour === 12) {
        formattedHour = 0; // Midnight case (12 AM => 00:00)
      }

      // Construct a valid date string in the format YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`;
      const formattedDateTime = `${formattedDate}T${String(
        formattedHour
      ).padStart(2, "0")}:${minute}:00`;

      // Return formatted date for comparison
      return new Date(formattedDateTime).toISOString().split("T")[0]; // YYYY-MM-DD
    } catch (error) {
      // console.error("Error formatting search query:", error);
      return null; // Return null if formatting fails
    }
  };

  const formattedSearchQuery = formatSearchQuery(searchQuery);

  if (formattedSearchQuery) {
    const filteredItems = prestations.filter((item) => {
      const isMatching = item.date_prestation === formattedSearchQuery;
      return isMatching;
    });

    console.log("Filtered Items:", filteredItems);
  } else {
    console.log("Invalid date provided in search query.");
  }

  const filteredItems = formattedSearchQuery
    ? prestations.filter((item) => {
        console.log(
          "Item Date:",
          item.date_prestation,
          "Formatted Search Query:",
          formattedSearchQuery
        ); // Log the item date and the formatted search query
        const isMatching = item.date_prestation === formattedSearchQuery;
        console.log("Match Status:", isMatching); // Log the result of the match check
        return isMatching;
      })
    : prestations;

  console.log("Filtered Items:", filteredItems); // Log the filtered items

  // Show date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  // Hide date picker
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle date selection
  const handleConfirm = (date) => {
    const formattedDate = moment(date).local().format("DD/MM/YYYY hh:mm A");
    setSelectedDate(formattedDate);
    setSearchQuery(formattedDate);
    hideDatePicker();
  };

  // Display current date and time
  const currentDateTime = getCurrentDateTime();
  console.log("Current Date and Time:", currentDateTime); // Logs the current date and time

  // Function for Google Maps
  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    let url;

    if (Platform.OS === "ios") {
      url = `maps://?q=${encodedAddress}`;
    } else if (Platform.OS === "android") {
      url = `geo:0,0?q=${encodedAddress}`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          const fallbackUrl = `https://www.google.com/maps/search/?q=${encodedAddress}`;
          Linking.openURL(fallbackUrl);
        }
      })
      .catch((err) => console.error("An error occurred: ", err));
  };
  const formatTime = (dateString) => {
    console.log("Original Date String:", dateString); // Log the input date string

    // Manually parse the date and time (16/01/2025 12:27 PM)
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    let [hours, minutes] = timePart.split(":");
    const period = timePart.split(" ")[1]; // AM/PM

    // Convert the day, month, year, and time to a valid JavaScript Date object
    let parsedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    // Adjust for AM/PM
    if (period === "PM" && hours !== "12") {
      parsedDate.setHours(parsedDate.getHours() + 12); // Add 12 hours for PM if not 12 PM
    } else if (period === "AM" && hours === "12") {
      parsedDate.setHours(0); // Set hour to 0 for 12 AM
    }

    // Manually adjust the time by adding 2 hours (if needed)
    parsedDate.setHours(parsedDate.getHours() + 2); // Adjust for timezone difference

    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date format:", dateString);
      return "Invalid Time"; // Return error message if the date is invalid
    }

    // Convert to 12-hour format
    let formattedHours = parsedDate.getHours() % 12;
    formattedHours = formattedHours ? formattedHours : 12; // The hour '0' should be '12'
    const formattedMinutes =
      parsedDate.getMinutes() < 10
        ? "0" + parsedDate.getMinutes()
        : parsedDate.getMinutes();
    const ampm = parsedDate.getHours() >= 12 ? "PM" : "AM";

    // Log the adjusted and formatted time
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    console.log("Formatted Time:", formattedTime); // Log the formatted time

    return formattedTime;
  };
  const handleCallPress = (telephone) => {
    if (telephone) {
      const phoneNumber = `tel:${telephone}`;
      Linking.openURL(phoneNumber).catch((err) =>
        console.error("An error occurred while trying to connect", err)
      );
    } else {
      alert("Phone number not available");
    }
  };

  return (
    <View style={styles.screen}>
      <HeaderTechnicien />
      {/* Date Picker Button */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {selectedDate ? selectedDate : "Select Date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.allButton}
          onPress={() => setSearchQuery("")} // Reset the search query to show all items
        >
          <Text style={styles.allButtonText}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* List of filtered items */}
      <ScrollView contentContainerStyle={styles.cardsWrapper}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <View
              key={item.index}
              style={[
                styles.cardContainer,
                {
                  backgroundColor:
                    item.status === "planifier"
                      ? "green"
                      : item.status === "cancel"
                      ? "red"
                      : "defaultColor", // fallback color if status is neither "planifier" nor "cancel"
                },
              ]}
            >
              <Image
                source={require("./assets/image/menage.jpg")}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.file}>
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color="black"
                    onPress={() => {
                      setSelectedItem(item);
                      setModalVisible(true);
                    }}
                  />
                </Text>
                <Text style={styles.title}>PRESTATION : {item.vistID}</Text>
                <Text style={styles.title}>
                  {currentDateTime} | {formatTime(currentDateTime)}{" "}
                </Text>
                <Text style={styles.subtitle}>Name: {item.userName}</Text>

                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>{item.adress}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={styles.phone}
                    onPress={() => handleCallPress(item.telephone)}
                  >
                    {" "}
                    <Feather name="phone" size={24} color="white" />
                  </Text>
                  <Text
                    style={styles.detailsText1}
                    onPress={() => openGoogleMaps(item.adress)}
                  >
                    <Entypo name="location" size={24} color="white" />
                  </Text>
                </View>
              </View>

              {/* Modal */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalText1}>
                      <Image
                        source={require("./assets/logo1.png")}
                        style={styles.image2}
                      />
                      <Text style={styles.pres}>Prestation {item.vistID}</Text>
                    </View>
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
                        <Text style={styles.tableHeaderCell}>Phone</Text>
                        <Text style={styles.tableHeaderCell}>Surface</Text>
                      </View>
                      <FlatList
                        data={selectedItem ? [selectedItem] : []} // Ensure data is passed correctly
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>
                              {item.title || "N/A"}
                            </Text>
                            <Text style={styles.tableCell}>
                              {item.prix || "N/A"} DH
                            </Text>
                            <Text style={styles.tableCell}>
                              {item.telephone || "N/A"}
                            </Text>
                            <Text style={styles.tableCell}>
                              {item.surface || "N/A"}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalLabel}>Total HT:</Text>
                      <Text style={styles.totalValue}>{item.prix} DH</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>
                        <AntDesign name="close" size={24} color="black" />
                      </Text>
                    </TouchableOpacity>
                    {/* Company Info and Description */}
                    <View style={styles.companyInfo1}>
                      {/* <View style={styles.dates}>
                        <Text>Dates:</Text>
                        <Text>{currentDateTime}</Text>
                        
                      </View> */}
                      {/* <View style={styles.divider}></View> */}
                      <View style={styles.comm}>
                        <Text style={styles.description}>Description:</Text>
                        <Text>{item.description}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background color for better contrast
  },
  cardsWrapper: {
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    borderRadius: 15,
    margin: 10,
    overflow: "hidden",
    elevation: 5,
    flex: 1, // Ensures the card takes flexible space
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 150,
    height: 150, // Ensure the height is consistent
    marginRight: 15,
    borderRadius: 10, // Optional: add border radius to the image
    marginTop: 30,
    marginLeft: 10,
    bottom: 15,
  },
  image2: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    marginTop: 8,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailsText: {
    fontSize: 12,
    color: "#fff",
  },
  detailsText1: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 17,
    marginTop: 8,
  },
  phone: {
    color: "#fff",
    fontSize: 17,
    marginTop: 8,
  },
  file: {
    color: "#fff",
    backgroundColor: "white",
    position: "absolute",
    right: 15,
    borderRadius: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#203165",
    borderRadius: 20,
    paddingLeft: 15,
    margin: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "#203165",
    width: "40%",
    left: 40,
    marginTop: 15,
  },
  allButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#203165", // Distinct color for button
    borderRadius: 20,
    width: "90%", // Appropriate width
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10, // Margin between buttons
  },
  allButtonText: {
    fontSize: 16,
    color: "#FFF", // White text
    fontWeight: "bold",
  },

  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#203165",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#fff",
    paddingRight: 10,
  },
  noResultsText: {
    fontSize: 18,
    color: "#203165",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#e7e7e7",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "100%", // Ensure modal content doesn't overflow
  },
  pres: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#203165",
    right: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#e7e7e7",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "100%", // Ensure modal content doesn't overflow
  },
  modalText1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  companyInfo: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
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
  description: {
    fontSize: 20,
    color: "#203165",
    fontWeight: "bold",
  },
});

export default Technicien;
