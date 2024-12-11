import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFormatedDate } from 'react-native-modern-datepicker';
import Header from './head/header';
import DateTimePicker from '@react-native-community/datetimepicker';

const PageDetails = () => {
  const [number, setNumber] = useState("");
  
  // State for the date pickers
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' or 'time'
  const [dateTime1, setDateTime1] = useState(new Date());
  const [dateTime2, setDateTime2] = useState(new Date());
  const [dateTime3, setDateTime3] = useState(new Date());
  
  const handleChange = (event, selectedDate) => {
    if (pickerMode === 'date') {
      // Date picker change
      if (selectedDate) {
        const updatedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          dateTime1.getHours(),
          dateTime1.getMinutes()
        );
        
        if (showPicker === 'picker1') {
          setDateTime1(updatedDate);
        } else if (showPicker === 'picker2') {
          setDateTime2(updatedDate);
        } else if (showPicker === 'picker3') {
          setDateTime3(updatedDate);
        }
        setPickerMode('time'); // Switch to time picker
        setShowPicker(true); // Show time picker
      } else {
        setShowPicker(false);
      }
    } else if (pickerMode === 'time') {
      // Time picker change
      if (selectedDate) {
        const updatedTime = new Date(
          dateTime1.getFullYear(),
          dateTime1.getMonth(),
          dateTime1.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        );
        
        if (showPicker === 'picker1') {
          setDateTime1(updatedTime);
        } else if (showPicker === 'picker2') {
          setDateTime2(updatedTime);
        } else if (showPicker === 'picker3') {
          setDateTime3(updatedTime);
        }
      }
      setShowPicker(false); // Close picker
    }
  };

  const formatDateTime = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    return `${date.toLocaleDateString(undefined, options)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.title1}>Prestaion :</Text>
          <Text style={styles.back1}>
            <AntDesign name="arrowleft" size={24} color="#203165" />
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
          <TextInput
            style={styles.inputInline}
            placeholder="Type a surface..."
            keyboardType="numeric"
            value={number}
            onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ""))}
          />
          <Text style={styles.label}> M² </Text>
        </View>

        {/* Date Inputs */}
        <Text style={styles.descriptionLabel}>Select Date & time :</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => {
            setPickerMode('date');
            setShowPicker('picker1');
          }}
        >
          <Text style={styles.inputText}>{formatDateTime(dateTime1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => {
            setPickerMode('date');
            setShowPicker('picker2');
          }}
        >
          <Text style={styles.inputText}>{formatDateTime(dateTime2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => {
            setPickerMode('date');
            setShowPicker('picker3');
          }}
        >
          <Text style={styles.inputText}>{formatDateTime(dateTime3)}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={showPicker === 'picker1' ? dateTime1 : showPicker === 'picker2' ? dateTime2 : dateTime3}
            mode={pickerMode} // 'date' or 'time'
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
        )}

        <TouchableOpacity style={styles.valider}>
          <Text style={styles.validerText}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as before
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
    right: 70,
  },
  title1: {
    marginTop: 0,
    marginBottom: 25,
    right: 100,
    fontSize: 24,
    fontWeight: "bold",
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
  inputButton: {
    borderWidth: 1,
    borderColor: '#203165',
    borderRadius: 12,
    padding: 5,
    width: 200,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    right:100,
    height:30,
    margin:10
  },
  inputText: {
    fontSize: 12,
    color: '#333',
  },
  valider: {
    backgroundColor: "#FBBF46",
    width: "40%",
    height: 50,
    margin: 20,
    borderRadius: 15,
    left:100
  },
  validerText: {
    color: "#203165",
    textAlign: "center",
    margin: 10,
    fontSize: 22,
  },
  back1: {
    left: 100,
    fontSize: 24,
    fontWeight: "bold",
    color: "#203165",
  },
});

export default PageDetails;
