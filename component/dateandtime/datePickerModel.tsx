import React, { FC, useState } from "react";
import { StyleSheet, Modal, View ,TouchableOpacity,Text} from "react-native";
import DatePicker from 'react-native-modern-datepicker'
interface DatePickerModalProps {
  open?: boolean;
  startDate: string;
  selectedDate: string;
  onclose: () => void;
  onchangeStartDate: (date: string) => void;
}
// let's fix Wrning : Header : Support for default will be removed
const error =console.error
console.error = (...args)=>{
  if(/defaultProps/.test(args[0])) return;
  error(...args)
}
const DatePickerModal: FC<DatePickerModalProps> = ({
  open,
  startDate,
  selectedDate,
  onclose,
  onchangeStartDate,
}) => {
  const [selectStartDate,setSelectStartDate]=useState(selectedDate)
  const handlechange = (date : string) =>{
    onchangeStartDate(date);
    setSelectStartDate(date)
  }
  const handleOnPressStartDate = () =>{
    onclose();
  }
  const modalVisible = open
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.conteredView}>
        <View style={styles.modalView}>
          <DatePicker
          mode="calendar"
          minimumDate={selectStartDate}
          onDateChange={handlechange}
          onSelectedChange={(date)=>setSelectStartDate(date)}
          options={{
            backgroundColor:'#203165',
            textHeaderColor:'white',
            textDefaultColor:'white',
            selectedTextColor:'#203165',
            mainColor:'white',
            textSecondaryColor:'white',
            borderColor:'#203165'
          }}
          />
          <TouchableOpacity onPress={handleOnPressStartDate}>
            <Text style={{color:'white'}}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  conteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#203165",
    alignItems: "center",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DatePickerModal;
