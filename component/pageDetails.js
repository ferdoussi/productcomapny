import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePickerModal from "./dateandtime/datePickerModel";
import Header from "./head/header";

const width = Dimensions.get("window").width;

const PageDetails = () => {
  const [number, setNumber] = useState("");

  // Date Inputs
  const today = new Date();

  // First Date Input
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const stratDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    "YYYY/MM/DD"
  );
  const [startedDate, setStartedDate] = useState("YYYY/MM/DD");

  // Second Date Input
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [endDate, setEndDate] = useState("YYYY/MM/DD");

  // Third Date Input
  const [openThirdDatePicker, setOpenThirdDatePicker] = useState(false);
  const [thirdDate, setThirdDate] = useState("YYYY/MM/DD");

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleOnPressEndDate = () => {
    setOpenEndDatePicker(!openEndDatePicker);
  };

  const handleOnPressThirdDate = () => {
    setOpenThirdDatePicker(!openThirdDatePicker);
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title1}>Prestaion:</Text>
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
          and sometimes handling laundry or dishwashing. House cleaners can
          work independently or for cleaning companies and often tailor their
          services to meet specific client needs, offering one-time, regular, or
          deep-cleaning solutions. Their role is essential in ensuring homes
          remain hygienic, comfortable, and inviting.
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Surface:</Text>
          <TextInput
            style={styles.inputInline}
            placeholder="Type a surface..."
            keyboardType="numeric"
            value={number}
            onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ""))}
          />
          <Text style={styles.label}> M² </Text>
        </View>
        <Text style={styles.descriptionLabel}>Date:</Text>

        {/* First Date Input */}
        <View style={{ width: width - 32 }}>
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressStartDate}
          >
            <Text style={{ fontSize: 14, color: "#BDBDBD" }}>{startedDate}</Text>
            <AntDesign name="calendar" size={24} color="#203165" />
          </TouchableOpacity>
          <DatePickerModal
            open={openStartDatePicker}
            startDate={stratDate}
            selectedDate={startedDate}
            onclose={() => setOpenStartDatePicker(false)}
            onchangeStartDate={(date) => setStartedDate(date)}
          />
        </View>

        {/* Second Date Input */}
        <View style={{ width: width - 32, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressEndDate}
          >
            <Text style={{ fontSize: 14, color: "#BDBDBD" }}>{endDate}</Text>
            <AntDesign name="calendar" size={24} color="#203165" />
          </TouchableOpacity>
          <DatePickerModal
            open={openEndDatePicker}
            startDate={endDate}
            selectedDate={endDate}
            onclose={() => setOpenEndDatePicker(false)}
            onchangeStartDate={(date) => setEndDate(date)}
          />
        </View>

        {/* Third Date Input */}
        <View style={{ width: width - 32, marginTop: 20 }}>
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressThirdDate}
          >
            <Text style={{ fontSize: 14, color: "#BDBDBD" }}>{thirdDate}</Text>
            <AntDesign name="calendar" size={24} color="#203165" />
          </TouchableOpacity>
          <DatePickerModal
            open={openThirdDatePicker}
            startDate={thirdDate}
            selectedDate={thirdDate}
            onclose={() => setOpenThirdDatePicker(false)}
            onchangeStartDate={(date) => setThirdDate(date)}
          />
        </View>
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
    paddingHorizontal: 14, // حذف التباعد العمودي الزائد
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
    right: 70,
  },
  title1: {
    marginTop: 0, // حذف الفراغ العلوي
    marginBottom: 25,
    right: 140,
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#203165",
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
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#203165",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
    width: "98%",
  },
  valider: {
    backgroundColor: "#FBBF46",
    width: "70%",
    height: 50,
    margin: 20,
    borderRadius: 15,
  },
  validerText: {
    color: "#203165",
    textAlign: "center",
    margin: 10,
    fontSize: 22,
  },
});

export default PageDetails;
