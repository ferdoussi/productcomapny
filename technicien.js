import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import HeaderTechnicien from "./headerTechnicien/headerTechnicien";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { Linking, Platform } from "react-native"; // Use React Native's Linking module
import {  useSelector } from "react-redux"; // Import useDispatch from redux
const Technicien = () => {
  const clientID = useSelector((state) => state.client.clientID);
  console.log('technicien',clientID)
  const [searchQuery, setSearchQuery] = useState(""); // Date selected by user
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // To show date picker
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Array of items to be mapped
  const items = [
    {
      id: 183,
      date: "22/12/2024 | 8:00AM-10:00AM",
      title: "Menage",
      price: "1000DH",
      surface: "15M²",
      address: "10 Bd de la Liberté",
      image: require("./assets/image/menage.jpg"),
      clientName: "anas Ferdoussi",
      description: "menage",
      phone: "2948811488",
    },
  ];

  // Function to filter items based on the selected date
  const filteredItems = searchQuery
    ? items.filter((item) => {
        const itemDate = item.date.split(" | ")[0]; // Extract the date portion
        return itemDate === searchQuery; // Compare with the selected date
      })
    : items; // Show all items if no date is selected

  // Show date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  // Hide date picker
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Handle date selection
  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY"); // Format date to DD/MM/YYYY
    setSelectedDate(formattedDate);
    setSearchQuery(formattedDate); // Update search query with the selected date
    hideDatePicker();
  };

  const getRandomColor = () => {
    const colors = ["green"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // function for google maps
  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    console.log(encodedAddress);

    let url;

    if (Platform.OS === "ios") {
      // URL to open Apple Maps in iOS
      url = `maps://?q=${encodedAddress}`;
    } else if (Platform.OS === "android") {
      // URL to open Google Maps on Android
      url = `geo:0,0?q=${encodedAddress}`;
    }

    // Check if the application supports opening the link
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // If the application is not supported, open the link in the browser
          const fallbackUrl = `https://www.google.com/maps/search/?q=${encodedAddress}`;
          Linking.openURL(fallbackUrl);
        }
      })
      .catch((err) => console.error("An error occurred: ", err));
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
              key={item.id}
              style={[
                styles.cardContainer,
                {
                  backgroundColor: getRandomColor(), // Random color for each item
                },
              ]}
            >
              <Image source={item.image} style={styles.image} />

              <View style={styles.infoContainer}>
                <Text style={styles.file}>
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color="black"
                    onPress={() => {
                      setSelectedItem(item); // Stocke l'élément sélectionné
                      setModalVisible(true); // Ouvre le modal
                    }}
                  />
                </Text>
                <Text style={styles.title}>Prestation {item.id}</Text>
                <Text style={styles.title}>{item.date}</Text>
                <Text style={styles.subtitle}>Name : {item.clientName}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>{item.address}</Text>
                </View>
                <Text
                  style={styles.detailsText1}
                  onPress={() => openGoogleMaps(item.address)}
                >
                  <Entypo name="location" size={24} color="white" />
                </Text>
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
                      <Text style={styles.pres}>Prestation {item.id}</Text>
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
                              {item.price || "N/A"} DH
                            </Text>
                            <Text style={styles.tableCell}>
                              {item.phone || "N/A"}
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
                      <Text style={styles.totalValue}> DH</Text>
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
                      <View style={styles.dates}>
                        <Text>Dates:</Text>
                        <Text>{item.date}</Text>
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.comm}>
                        <Text>Description:</Text>
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
    //alignSelf: "center",
    left: 40,
    marginTop: 15,
  },
  allButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#203165", // لون مميز للزر
    borderRadius: 20,
    width: "90%", // عرض مناسب
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10, // مسافة بين الأزرار
  },
  allButtonText: {
    fontSize: 16,
    color: "#FFF", // النص باللون الأبيض
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
  modalText1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pres: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#203165",
    textAlign: "right",
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
  inputInline: {
    height: 40,
    width: "100%",
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 10,
    paddingLeft: 10,
  },
  textChange: {
    fontSize: 20,
    marginBottom: 10,
    color: "#203165",
  },
  textArea: {
    height: 100,
    width: "100%",
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",
  },
  totle: {
    fontSize: 20,
    textAlign: "center",
    color: "#203165",
    marginTop: 15,
  },
  envoyerButton: {
    backgroundColor: "#203165",
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 5,
  },
  TextenvoyerButton: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
    fontSize: 15,
    flex: 1,
    textAlign: "center",
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
});

export default Technicien;
