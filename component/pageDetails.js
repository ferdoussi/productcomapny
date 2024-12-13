import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import Header from "./head/header";
import DateTimePicker from "@react-native-community/datetimepicker";

const PageDetails = () => {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  // State for the date pickers
  const [showPicker, setShowPicker] = useState(""); // Store picker ID (e.g., 'picker1')
  const [pickerMode, setPickerMode] = useState("date"); // 'date' or 'time'
  const [dateTime1, setDateTime1] = useState(new Date());
  const [dateTime2, setDateTime2] = useState(new Date());
  const [dateTime3, setDateTime3] = useState(new Date());
  const [dateTime4, setDateTime4] = useState(new Date()); // Added fourth date
  const navigation = useNavigation();
  const handleChange = (event, selectedDate) => {
    if (!selectedDate) {
      setShowPicker(""); // Close the picker when no date is selected
      return;
    }

    // Adjust to handle date and time correctly
    const updatedDate = new Date(selectedDate);

    if (pickerMode === "date") {
      const currentDateTime =
        showPicker === "picker1"
          ? dateTime1
          : showPicker === "picker2"
          ? dateTime2
          : showPicker === "picker3"
          ? dateTime3
          : dateTime4; // Added condition for picker4

      // Update the date but keep the current hour and minute
      const newDateTime = new Date(
        updatedDate.getFullYear(),
        updatedDate.getMonth(),
        updatedDate.getDate(),
        currentDateTime.getHours(), // retain the current hour
        currentDateTime.getMinutes() // retain the current minute
      );

      if (showPicker === "picker1") {
        setDateTime1(newDateTime);
      } else if (showPicker === "picker2") {
        setDateTime2(newDateTime);
      } else if (showPicker === "picker3") {
        setDateTime3(newDateTime);
      } else if (showPicker === "picker4") {
        setDateTime4(newDateTime); // Added fourth date update
      }

      setPickerMode("time"); // switch to time mode
      setShowPicker(showPicker); // show the time picker for the selected picker
    } else if (pickerMode === "time") {
      const currentDateTime =
        showPicker === "picker1"
          ? dateTime1
          : showPicker === "picker2"
          ? dateTime2
          : showPicker === "picker3"
          ? dateTime3
          : dateTime4; // Added condition for picker4

      // Update the time with the selected hours and minutes
      const newDateTime = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate(),
        updatedDate.getHours(), // set the selected hour
        updatedDate.getMinutes() // set the selected minute
      );

      if (showPicker === "picker1") {
        setDateTime1(newDateTime);
      } else if (showPicker === "picker2") {
        setDateTime2(newDateTime);
      } else if (showPicker === "picker3") {
        setDateTime3(newDateTime);
      } else if (showPicker === "picker4") {
        setDateTime4(newDateTime); // Added fourth date time update
      }

      setShowPicker(""); // hide the picker after time selection
    }
  };

  const formatDateTime = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

    // Formatting date and time
    const dateFormatted = date.toLocaleDateString(undefined, options);
    const timeFormatted = date.toLocaleTimeString(undefined, timeOptions);

    return `${dateFormatted} ${timeFormatted}`;
  };
  const backhome = ()=>{
    navigation.navigate('ClientHome');
  }

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title1}>Prestation :</Text>
          <Text style={styles.back1} onPress={backhome}>
            <AntDesign name="arrowleft" size={24} color="#203165"/>
            Back
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/image/menage.jpg")}
            style={styles.image}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Product 2</Text>
            <Text style={styles.title}>1000dh</Text>
          </View>
        </View>

        <Text style={styles.descriptionLabel}>Description:</Text>
        <Text style={styles.descriptionText}>
          A house cleaner is a professional who specializes in maintaining the
          cleanliness and organization of residential spaces. Their
          responsibilities typically include tasks like dusting, vacuuming,
          mopping floors, sanitizing bathrooms and kitchens, tidying up rooms,
          and sometimes handling laundry or dishwashing.
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Surface:</Text>
          {/* input number for surface  */}
          <TextInput
            style={styles.inputInline}
            placeholder="Type a surface..."
            keyboardType="numeric"
            value={number}
            onChangeText={(text) => setNumber(text.replace(/[^0-9.]/g, ""))}
          />
          <Text style={styles.label}> M² </Text>
        </View>

        {/* Date Inputs */}
        <Text style={styles.descriptionLabel}>Select Date & time :</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              setPickerMode("date");
              setShowPicker("picker1");
            }}
          >
            <Text style={styles.inputText}>{formatDateTime(dateTime1)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              setPickerMode("date");
              setShowPicker("picker2");
            }}
          >
            <Text style={styles.inputText}>{formatDateTime(dateTime2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              setPickerMode("date");
              setShowPicker("picker3");
            }}
          >
            <Text style={styles.inputText}>{formatDateTime(dateTime3)}</Text>
          </TouchableOpacity>

          {/* New Fourth Date Input */}
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              setPickerMode("date");
              setShowPicker("picker4");
            }}
          >
            <Text style={styles.inputText}>{formatDateTime(dateTime4)}</Text>
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker
            value={
              showPicker === "picker1"
                ? dateTime1
                : showPicker === "picker2"
                ? dateTime2
                : showPicker === "picker3"
                ? dateTime3
                : dateTime4
            }
            mode={pickerMode} // 'date' or 'time'
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
          />
        )}
        <Text style={styles.descriptionLabel}>Select Location :</Text>
        <TextInput
         style={styles.TextInput}
          placeholder="Type your location "
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <TouchableOpacity style={styles.valider}>
          <Text style={styles.validerText}>Valider</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 14,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 70, // Updated from `right: 70`
  },
  title1: {
    marginTop: 0,
    marginBottom: 25,
    marginRight: 100, // Changed `right` to `marginRight`
    fontSize: 24,
    fontWeight: "bold",
    color: "#203165",
    paddingTop: 15, // Changed `top` to `paddingTop`
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    color: "#203165",
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 24,
    textAlign: "justify",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputInline: {
    height: 40,
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    flex: 1,
  },
  TextInput:{
    height: 100,
    width:'100%',  // You can adjust the height as needed
    borderColor: "#203165",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: "top",
  },
  inputButton: {
    borderWidth: 1,
    borderColor: "#203165",
    borderRadius: 12,
    padding: 5,
    width: 190,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    height: 30,
    margin: 10,
  },
  inputText: {
    fontSize: 12,
    color: "#333",
  },
  valider: {
    backgroundColor: "#FBBF46",
    width: "40%",
    height: 50,
    marginHorizontal: 40, // Updated from `margin: 40`
    borderRadius: 15,
    alignSelf: "center", // Added to center the button horizontally
    top: 10,
  },
  validerText: {
    color: "#203165",
    textAlign: "center",
    margin: 10,
    fontSize: 22,
  },
  back1: {
    marginLeft: 100, // Changed from `left: 100`
    fontSize: 24,
    fontWeight: "bold",
    color: "#203165",
    paddingTop: 15, // Changed `top` to `paddingTop`
  },
});

export default PageDetails;
