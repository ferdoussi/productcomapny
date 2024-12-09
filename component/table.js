import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TableExample = () => {
  return (
    <ScrollView style={styles.table}>
      <Text style={styles.id}>Table:</Text>
      <View style={styles.name}>
      <View style={styles.row}>
        <Text style={styles.cellHeader}>N!</Text>
        <Text style={styles.cellHeader}>Name</Text>
        <Text style={styles.cellHeader}>Total</Text>
        <Text style={styles.cellHeader}>Status</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>1</Text>
        <Text style={styles.cell}>Menage,           add</Text>
        <Text style={styles.cell}>1000</Text>
        <Text style={{color:'orange',width: '30%'}}>Encours</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>2</Text>
        <Text style={styles.cell}>Menage,           add</Text>
        <Text style={styles.cell}>1000</Text>
        <Text style={{color:'green',width: '30%',right:10}}>Complete</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>3</Text>
        <Text style={styles.cell}>Menage,           add</Text>
        <Text style={styles.cell}>1000</Text>
        <Text style={{color:'red',width: '30%'}}>Refuse</Text>
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
