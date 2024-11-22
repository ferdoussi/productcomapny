import React from "react";
import { StyleSheet, Platform } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#203165',
    
  },
  image:{
    width: 200,
    height: 150,
    
  },
  subText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#203165',
    
  },
  input: {
    width: Platform.OS === 'ios' ? '90%' : '100%', // 90% for iOS, 100% for Android
    borderWidth: 1,
    borderColor: '#203165',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordTxt: {
    fontWeight: 'bold',
  },
  loginButton: {
    width: Platform.OS === 'ios' ? '70%' : '80%', // 90% for iOS, 100% for Android
    backgroundColor: '#203165',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    right:30
  },
  iconButton: {
    marginHorizontal: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 16,
    color:'#203165'
  },
  fingerprintContainer: {
    backgroundColor: '#203165', // Background color for the icon
    borderRadius: 25, // Adjust for a circular shape
    padding: 10, // Padding around the icon
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Space between button and icon
    marginLeft: 7
  },
  loginContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center vertically
    justifyContent: 'space-between', // Space between button and icon
    marginTop: 1, // Space above the container
  },

});

export default style;