import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TableExample = () => {
  return (
    <ScrollView style={styles.table}>
      <Text style={styles.id}>Table:</Text>
      <View style={styles.name}>
      <View style={styles.row}>
        <Text style={styles.cellHeader}>ID</Text>
        <Text style={styles.cellHeader}>Nom</Text>
        <Text style={styles.cellHeader}>Âge</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>1</Text>
        <Text style={styles.cell}>Ali</Text>
        <Text style={styles.cell}>30</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>2</Text>
        <Text style={styles.cell}>Sara</Text>
        <Text style={styles.cell}>25</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>3</Text>
        <Text style={styles.cell}>Khalid</Text>
        <Text style={styles.cell}>28</Text>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  name:{
    borderColor: '#203165',
    borderWidth: 1,
    borderRadius: 10,
    padding:10
  },
  table: {
    marginTop:5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',  
  },
  cellHeader: {
    fontWeight: 'bold',
    width: '30%',
  },
  cell: {
    width: '30%',
  },
  id:{
    fontSize:25,
    color:'#203165',
    fontWeight: 'bold',
  }
});

export default TableExample;
