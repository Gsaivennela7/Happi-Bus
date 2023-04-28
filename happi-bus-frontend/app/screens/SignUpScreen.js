import React, { useRef, useField, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import { Formik } from 'formik';
import * as yup from 'yup'
import api from "../api/axiosSettings";
import ImageInput from '../components/ImageInput';



const MAX_FILE_SIZE = 102400; //100KB
function SignUpScreen({ navigation }) {
  const fileData = new FormData();
  fileData.append("file", {
    uri: file,
    type: "image/jpg", 
  })

  const [file, setFile] = useState(null);
  const handleSubmit = async (values) => {
   
  }

/*
  const handleSubmit = async (values) => {
    let firstName = values.firstName;
    let email = values.email;
    let lastName = values.lastName;
    let password = values.password;

    const fileData = new FormData();
    fileData.append("file", {
      uri: encodeURIComponent(file),
      type: "image.png"
    })

    api.post("/account/addAccount", {
      params: {
        firstName,
        email,
        lastName,
        password
      }
    }).then(response => {
      console.log(response.data);
      console.log("here");
      Alert.alert(
        "Sign up Succesfully",
        "You can now log in",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
    );
  }
*/

  {/* To validate */ }
  const signUpValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, ({ min }) => `First name must be at least ${min} characters`)
      .required('First name is required'),
    lastName: yup
      .string()
      .min(3, ({ min }) => `Last name must be at least ${min} characters`)
      .required('Last name is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  return (

    <ScrollView>
      <Screen>
        <View style={{ height: '100%', backgroundColor: '#E7ECF4' }}>
          <View>
            {/* Section reserved for Sign up + mini instruction */}
            <Text style={styles.introLabel}>Sign Up</Text>
            <Text style={styles.miniInstruction}>Fill in the form to create an account</Text>
          </View>

          <View>
            {/* Form To Sign up*/}
            <Formik
              initialValues={{ firstName: '', lastName: '', email: '', password: '', }}
              validationSchema={signUpValidationSchema}
              onSubmit={values => handleSubmit(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                <View>
                  <View style={styles.imageContainer}>
                    <Text style={styles.textInputImage}>Upload an image</Text>
                    <ImageInput imageUri={file} onChangeImage={(uri) => setFile(uri)} />
                  </View>
                  {/* For First Name */}
                  <TextInput
                    style={styles.textInput}
                    placeholder='First name'
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                  />
                  {(errors.firstName && touched.firstName) && <Text style={styles.errorText}>{errors.firstName}</Text>}

                  {/* For Last Name */}
                  <TextInput
                    style={styles.textInput}
                    placeholder='Last Name'
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                  />
                  {(errors.lastName && touched.lastName) && <Text style={styles.errorText}>{errors.lastName}</Text>}

                  {/* For email */}
                  <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {(errors.email && touched.email) && <Text style={styles.errorText}>{errors.email}</Text>}

                  {/* For password */}
                  <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {(errors.password && touched.password) && <Text style={styles.errorText}>{errors.password}</Text>}
                  <View style={styles.buttonContainer2}>
                    <Button onPress={handleSubmit} title="Sign up" color='#FFFFFF' />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Screen >
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 15,
    width: '35%',
    borderColor: "#A7A7A7",
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  buttonSection: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer1: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    color: '#775E5E',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: '#B8DEDB',
    borderWidth: 0.5,
    shadowColor: '#0062FF',
    shadowRadius: 5,
    shadowOpacity: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  buttonContainer2: {
    margin: 20,
    backgroundColor: '#85AAE6',
    color: '#FFFFFF',
    padding: 12,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: '#0062FF',
    borderWidth: 0.5,
  },
  introLabel: {
    textAlign: "left",
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 30,
    fontSize: 30,
    color: '#85AAE6'
  },
  titleLabel: {
    textAlign: "center",
    fontSize: 45,
    color: '#85AAE6'
  },
  quote: {
    textAlign: "center",
    fontSize: 25,
    fontStyle: 'italic',
    color: '#8C9198'
  },
  miniInstruction: {
    textAlign: "left",
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 15,
    color: '#8C9198'
  },
  textInput: {
    height: 50,
    margin: 12,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#A7A7A7',
    borderWidth: 0.5,
    fontSize: 15
  },
  errorText: {
    marginLeft: 20,
    fontSize: 10,
    color: 'red',
  },
  textInputImage: {

    fontSize: 20,
    color: '#A7A7A7',
  },
});


export default SignUpScreen;