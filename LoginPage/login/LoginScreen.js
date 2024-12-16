import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style.jsx";


const API_LOGIN_ENDPOINT = "http://192.168.100.150:8000/api/login";


const LoginScreen = () => {
  const navigation = useNavigation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedPassword = await AsyncStorage.getItem("userPassword");
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Failed to load credentials:", error);
      }
    }; 

    loadCredentials();
  }, []);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("L’email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères")
      .required("Le mot de passe est requis"),
  });

  const showSnackbar = useCallback((message, color = "green") => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarVisible(true);

    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  }, []);

  const handleLogin = useCallback(
    async (values, { setFieldError, setSubmitting }) => {
      const { email, password } = values;
      setLoading(true);

      try {
        //console.log("Attempting login with:", { email, password });
        // Send login request
        const loginResponse = await axios.post(API_LOGIN_ENDPOINT, {
          email,
          password,
        });

        //console.log("Login Response:", loginResponse.data);

        if (loginResponse.data) {
          const { message, user } = loginResponse.data;

          showSnackbar("Connexion réussie");
          if (rememberMe) {
            await AsyncStorage.setItem("userEmail", email);
            await AsyncStorage.setItem("userPassword", password);
          } else {
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("userPassword");
          }

          // Navigate to the Accueil screen with user information
          if (user.role === "client") {
            navigation.navigate("ClientHome", {
              message: "Connexion réussie",
              nom: user.nom,
              prenom: user.prenom,
              userID: user.id,
            });
          } else if (user.role === "technicien") {
            navigation.navigate("TechnicienHome", {
              message: "Connexion réussie",
              nom: user.nom,
              prenom: user.prenom,
              userID: user.id,
            });
          }
        } else {
          const errorMessage =
            loginResponse.data.message || "Identifiants invalides";
          showSnackbar(errorMessage, "red");
          setFieldError("password", errorMessage);
        }
      } catch (error) {
        console.error("Error during login attempt:", error);
        const errorMessage =
          error.response?.data?.error || "Une erreur est survenue.";
        showSnackbar(errorMessage, "red");
        setFieldError("password", errorMessage);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
    [navigation, rememberMe, showSnackbar]
  );

  const handleFingerprintLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authentifiez-vous avec l’empreinte digitale",
        fallbackLabel: "Utiliser le mot de passe",
      });

      if (result.success) {
        handleLogin(
          { email, password },
          { setFieldError: () => {}, setSubmitting: () => {} }
        );
      } else {
        showSnackbar("Échec de l’authentification", "red");
      }
    } else {
      showSnackbar("Authentification non disponible", "red");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.image}>
          <Image source={require("../../assets/logo.png")} style={{borderRadius:100}}/>
        </Text>
        <Text style={styles.title}>
          Hey,
          {"\n"}
          Content de te revoir!
        </Text>
        <Text style={styles.subText}>
          Veuillez vous connecter pour continuer
        </Text>
        
        <Formik
          initialValues={{ email, password }}
          enableReinitialize
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email..."
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Mot de passe..."
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.rememberMeContainer}>
                <Checkbox style={{color:'red'}}
                  status={rememberMe ? "checked" : "unchecked"}
                  onPress={() => setRememberMe(!rememberMe)}
                />
                
                <Text style={styles.rememberMeText}>Se souvenir de moi</Text>
              </View>

              <View style={styles.loginContainer}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isSubmitting ? "Connexion en cours..." : "CONNEXION"}
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fingerprintContainer}
                  onPress={handleFingerprintLogin}
                >
                  <MaterialCommunityIcons
                    name="fingerprint"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          style={{ backgroundColor: snackbarColor }}
        >
          {snackbarMessage}
        </Snackbar>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="facebook" size={40} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="instagram"
              size={40}
              color="#e4405f"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="google" size={40} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
