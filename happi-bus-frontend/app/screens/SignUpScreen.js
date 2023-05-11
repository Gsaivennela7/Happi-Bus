import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../api/axiosSettings";
import UploadScreen from '../components/UploadScreen';
import ImageInput from '../components/ImageInput';


function SignUpScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  const handleSubmit = async (values) => {
    setUploadVisible(true);
    const formData = new FormData();
    formData.append('file', { uri: image, name: 'file', type: 'image/jpeg' });
    formData.append('firstName', values.firstName);
    formData.append('email', values.email);
    formData.append('lastName', values.lastName);
    formData.append('password', values.password);

    try {
      const response = await api.post('/account/addAccount', formData, {
        onUploadProgress: (progress) => setUploadProgress(progress.loaded / progress.total)
      });
      console.log(response.data);
      Alert.alert(
        'Sign up Succesfully',
        'You can now log in',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      Alert.alert(
        'Failed to Process Photo',
        'Please upload another Photo',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      console.log(error);
    }
    setUploadVisible(false);
  };

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
        <UploadScreen progress={uploadProgress} visible={uploadVisible} />
        <View style={{ backgroundColor: '#FFFFFF', }}>
          <View>
            {/* Section reserved for Sign up + mini instruction */}
            <Text style={styles.introLabel}>Sign Up</Text>
            <Text style={styles.miniInstruction}>Fill in the form to create an account</Text>
          </View>
          <View style={styles.formikBlock}>
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
                    <ImageInput imageUri={image} onChangeImage={(uri) => setImage(uri)} />
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
                    <Button onPress={handleSubmit} title="Sign up" color='#85AAE6' />
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
  buttonContainer2: {
    marginTop: 20,
    borderRadius: 30,
    margin: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#A7A7A7',
    alignItems: 'center',
    justifyContent: 'center'
},
  imageContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 15,
    width: '35%',
    borderColor: "#A7A7A7",
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 10
  },
  introLabel: {
    textAlign: "left",
    marginBottom: 10,
    marginLeft: 25,
    fontSize: 12,
    color: '#85AAE6'
  },
  titleLabel: {
    textAlign: "center",
    fontSize: 12,
    color: '#85AAE6'
  },
  miniInstruction: {
    textAlign: "left",
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 24,
    color: '#8C9198'
  },
  textInput: {
    height: 50,
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#A7A7A7',
    borderWidth: 0.5,
    fontSize: 25,
  },
  errorText: {
    marginLeft: 20,
    fontSize: 24,
    color: 'red',
  },
  textInputImage: {

    fontSize: 25,
    color: '#A7A7A7',
  },
  formikBlock: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#FFFFFF',
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '98%',
    alignSelf: 'center'
  }
});


export default SignUpScreen;