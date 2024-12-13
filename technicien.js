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
import Header from "./component/head/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

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
      date: "12/12/2024 | 8:00AM-10:00AM",
      title: "Menage",
      price: "1000DH",
      surface: "15M²",
      address: "10 Bd de la Liberté, Casablanca 20120",
    },
    {
      id: 2,
      date: "13/12/2024 | 9:00AM-11:00AM",
      title: "Cleaning",
      price: "1200DH",
      surface: "20M²",
      address: "15 Rue de Paris, Casablanca 20200",
    },
    {
      id: 3,
      date: "14/12/2024 | 10:00AM-12:00PM",
      title: "Menage",
      price: "800DH",
      surface: "10M²",
      address: "20 Ave Mohammed VI, Casablanca 20300",
    },
    {
      id: 4,
      date: "12/12/2024 | 10:00AM-12:00PM",
      title: "Menage",
      price: "800DH",
      surface: "60M²",
      address: "20 Ave Mohammed VI, Casablanca 20300",
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
    const originalPriceNumeric = parseFloat(originalPrice.replace('DH', '').trim());
    const addedPriceNumeric = parseFloat(addedPrice || 0);
    return originalPriceNumeric + addedPriceNumeric;
  };
  return (
    <View style={styles.screen}>
      <Header />

      {/* Date Picker Button */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {selectedDate ? selectedDate : "Select Date"}
          </Text>
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
              <Image
                source={require("./assets/logo1.png")}
                style={styles.image}
              />
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
                <Text style={styles.subtitle}>{item.title}</Text>
                <Text style={styles.subtitle}>Prix : {item.price}</Text>
                <Text style={styles.detailsText}>Surface : {item.surface}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>{item.address}</Text>
                </View>
              </View>
              {/* modal */}
            {/* Modal for item details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#203165'}}>Address :</Text> {selectedItem ? ` ${selectedItem.address}` : "Aucun élément sélectionné"}
            </Text>
            <Text style={styles.modalText}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#203165'}}>Title :</Text> {selectedItem ? ` ${selectedItem.title}` : "Aucun élément sélectionné"}
            </Text>
            <Text style={styles.modalText}>
            <Text style={{fontWeight:'bold',fontSize:20,color:'#203165'}}>Surface :</Text> {selectedItem ? ` ${selectedItem.surface}` : "Aucun élément sélectionné"}
            </Text>
            <Text style={styles.modalText}>
              <Text style={{fontWeight:'bold',fontSize:20,color:'#203165'}}>Prix :</Text> {selectedItem ? ` ${selectedItem.price}` : "Aucun élément sélectionné"}
            </Text>

            {/* Input to update price */}
            <Text style={styles.textChange}>Update Price:</Text>
            <Text style={styles.modalText}>
              {selectedItem ? (
                <TextInput
                  style={styles.inputInline}
                  placeholder="Add price..."
                  keyboardType="numeric"
                  value={number}
                  onChangeText={(text) => setNumber(text.replace(/[^0-9.]/g, ""))}
                />
              ) : null}
            </Text>

            {/* Input to add description */}
            <Text style={styles.textChange}>Add Description:</Text>
            <Text style={styles.modalText}>
              {selectedItem ? (
                <TextInput
                  style={styles.textArea}
                  placeholder="Add description..."
                  multiline
                  numberOfLines={4}
                  value={text}
                  onChangeText={(newText) => setText(newText)}
                />
              ) : null}
            </Text>

            {/* Display total price */}
            <Text style={styles.totle}>
              <Text style={{color:'#FBBF46'}}>Total:{" "}</Text>
              {selectedItem ? `${calculateTotalPrice(selectedItem.price, number)} DH` : "0 DH"}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>
                <AntDesign name="close" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.envoyerButton}
            >
              <Text   style={styles.TextenvoyerButton}>Send</Text>
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
    height: 170,
    alignSelf: "center",
    backgroundColor: "transparent",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 110,
    height: 110,
    marginRight: 15,
    marginTop: 17,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "#fff",
  },
  file: {
    color: "#fff",
    backgroundColor: "white",
    position: "absolute",
    right: 1,
    borderRadius: 15,
    top: 130,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingLeft: 15,
    margin: 10,
    height: 45,
    borderWidth: 1,
    borderColor: "#203165",
    width: "90%",
    backgroundColor: "#FAFAFA",
    alignSelf: "center",
    marginTop: 15,
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#203165",
  },
  noResultsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Couleur de fond semi-transparente
  },
  modalContent: {
    backgroundColor: "#e7e7e7",
    padding: 30,
    borderRadius: 10,
    width: "80%",
   
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    right:10,
    color:'#818183'
  },
  closeButton: {
    position: "absolute", // Permet de positionner en haut à droite
    top: 10, // Décalage par rapport au haut
    right: 10, // Décalage par rapport à la droite
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
    width: '100%',
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "flex-start", // Permet de s'aligner à gauche
    marginTop: 10, // Espacement au-dessus
    paddingLeft:10
  },
  textChange:{
    fontSize:20,
    right:10,
    marginBottom:10,
    color:'#203165'
  },
  textArea: {
    height: 100,
    width:'100%',  // You can adjust the height as needed
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",  // Ensures text starts at the top of the textarea
  },
  totle:{
    fontSize:20,
    textAlign:'center'
  },
  envoyerButton:{
    width:'100%',
    borderWidth: 1,
    borderRadius: 10,
    padding:10,
    marginTop:10,
    backgroundColor:'#203165',

  },
  TextenvoyerButton:{
    color:"#fff",
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  }
});

export default Technicien;
