<<<<<<< HEAD
import React from 'react';
import { View, Text } from 'react-native';
import Screen from '../components/Screen';

export default function LoginScreen() {
  return (
    <Screen>
      <Text>LoginScreen</Text>
     </Screen>
  );
}
=======
import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorageStatic } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { create } from 'apisauce';
import AuthContext from '../auth/context';
import * as yup from 'yup'

function LoginScreen({ navigation }) {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState();
    const setUserLogin = () => {
        setUser("User");
    };
  
    const handleSubmit = async (values) => {
        let apiStr = endpoints.login
        api.baseURL.post(apiStr, { email: values.email, password: values.password }).then(response => {
            if (response.data != null) {
                console.log("Data: " + response.data);
                setUser(response.data);
            }
            else {
                Alert.alert(
                    "Login Failed",
                    "Invalid email or password",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }

        });
    }

    useEffect(() => {
        console.log("==========Context====================");
        if (authContext != null) {
            if (user){
                authContext.setUser("User");
                console.log(authContext.user);
            }
        }
    });
    return (
        <Screen>
            <View style={{ height: '100%', backgroundColor: '#E7ECF4' }}>
                <View>
                    {/* Section reserved for Login + mini instruction */}
                    <Text style={styles.introLabel}>Login</Text>
                    <Text style={styles.miniInstruction}>Enter your credentials to login</Text>
                </View>

                <View style={styles.loginBlock}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                            <View style={{ marginTop: 10 }}>
                                {/* For email */}
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {(errors.email && touched.email) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                                {/* For password */}
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {(errors.password && touched.password) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}


                                <View style={styles.buttonContainer1}>
                                    <Button onPress={setUserLogin} title="Sign in" color='#775E5E' disabled={!isValid} />
                                </View>
                                <Button title="Don't have account yet?" onPress={() => navigation.navigate('SignUpScreen')} color='#85AAE6' />

                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    buttonSection: {
        flex: 2,
        justifyContent: 'center',
        padding: 20,
        width: '80%',
    },
    buttonContainer1: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        color: '#775E5E',
        padding: 10,
        marginTop: 35,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: '#A7A7A7',
        borderWidth: 1,
     
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
        borderWidth: 1,
        shadowColor: '#0062FF',
        shadowRadius: 5,
        shadowOpacity: 5,
        shadowOffset: { width: 0, height: 2 }
    },
    introLabel: {
        textAlign: "left",
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 25,
        fontSize: 30,
        color: '#85AAE6',
    },
    titleLabel: {
        textAlign: "left",
        margin: 10,
        fontSize: 25,
        color: '#4D4F5C'
    },
    quote: {
        textAlign: "center",
        fontSize: 25,
        fontStyle: 'italic',
        color: '#8C9198'
    },
    miniInstruction: {
        textAlign: "left",
        marginLeft: 25,
        marginBottom: 10,
        fontSize: 14,
        color: '#6E7079'
    },
    textInput: {
        height: 50,
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#A7A7A7',
        borderWidth: 0.5
      
    },
    loginBlock: {
        margin: 5,
        height: 400,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#DBDBDB',
        borderWidth: 1,
   
    
    },
});

export default LoginScreen;
>>>>>>> cac1951 (ui bus ticket, ticket, login screens)
