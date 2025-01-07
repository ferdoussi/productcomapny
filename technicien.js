import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import HeaderTechnicien from "./headerTechnicien/headerTechnicien";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { Linking, Platform } from "react-native"; // Use React Native's Linking module

const Technicien = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Date selected by user
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // To show date picker
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState(""); // Store the input text
  // change prix
  const [number, setNumber] = useState("");
  // Array of items to be mapped
  const items = [
    {
      id: 1,
      date: "22/12/2024 | 8:00AM-10:00AM",
      title: "Menage",
      price: "1000DH",
      surface: "15M²",
      address: "10 Bd de la Liberté",
      image: require("./assets/image/menage.jpg"),
    },
    {
      id: 2,
      date: "23/12/2024 | 9:00AM-11:00AM",
      title: "Cleaning",
      price: "1200DH",
      surface: "20M²",
      address: "15 Bd de Paris",
      image: require("./assets/image/plb.jpg"),
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
    const colors = ["#203165", "#2C4A74", "#1F2C3B", "#263340", "#2A3D54"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateTotalPrice = (originalPrice, addedPrice) => {
    const originalPriceNumeric = parseFloat(
      originalPrice.replace("DH", "").trim()
    );
    const addedPriceNumeric = parseFloat(addedPrice || 0);
    return originalPriceNumeric + addedPriceNumeric;
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
                <Text style={styles.title}>{item.date}</Text>
                <Text style={styles.subtitle}>Title :{item.title}</Text>
                <Text style={styles.subtitle}>Prix : {item.price}</Text>
                <Text style={styles.detailsText}>Surface : {item.surface}</Text>
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
                      <Text style={styles.pres}>Prestation N°</Text>
                    </View>
                    <View style={styles.table}>
                      <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderCell}>Title</Text>
                        <Text style={styles.tableHeaderCell}>Prix </Text>
                        <Text style={styles.tableHeaderCell}>Localisation</Text>
                        <Text style={styles.tableHeaderCell}>Action</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>
                        <AntDesign name="close" size={24} color="black" />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.envoyerButton}>
                      <Text style={styles.TextenvoyerButton}>Send</Text>
                    </TouchableOpacity>
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
    marginLeft: 15,
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
    fontSize: 17,
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
    padding: 30,
    borderRadius: 10,
    width: "100%",
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
  table:{
    marginBottom: 20,
  },
  tableHeader:{
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
  }
});

export default Technicien;
