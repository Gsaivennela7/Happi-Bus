import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../api/axiosSettings";
import AuthContext from '../auth/context';
import * as yup from 'yup'
import Button from '../components/Button';

function LoginScreen({ navigation }) {
    const [incorrect, setIncorrect] = useState(false);
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState();
    const handleSubmit = async (values) => {
        api.post("/account/login/", { email: values.email, password: values.password }).then(response => {
            console.log(values.email);
            if (response.data != null) {
                console.log("Data: " + response.data);
                setUser(response.data);
                if (user) {
                    setIncorrect(false);
                } else {
                    console.log("incorrect")
                    setIncorrect(true);
                }
            }
        })
    }
    useEffect(() => {
        if (user) {
            authContext.setUser(user);
            console.log(authContext.user);
        }
    });
    const loginValidationSchema = yup.object().shape({
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
        <Screen>
            <View style={{ height: '100%', backgroundColor: '#FFFFFF' }}>
                <Image style={{ alignSelf: 'center', height: '20%', width: '70%' }} source={require('../assets/images/HappyBus.png')} />
                <View style={styles.loginBlock}>
                    <View>
                        {/* Section reserved for Login + mini instruction */}
                        <Text style={styles.introLabel}>Happy Bus Login</Text>
                        <Text style={styles.miniInstruction}>Enter your credentials to login</Text>
                    </View>
                    <View style={styles.formikBlock}>
                        <View>
                            {/* Section reserved for Login + mini instruction */}
                            {
                                (incorrect) ?
                                    <Text style={styles.errorText}>Incorrect credentials</Text>
                                    :
                                    <Text></Text>
                            }
                        </View>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={loginValidationSchema}
                            onSubmit={values => handleSubmit(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                                <View style={{ marginTop: 10 }}>
                                    {/* For email */}
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        autoCapitalize="none"
                                        value={values.email}
                                    />
                                    {(errors.email && touched.email) && <Text style={styles.errorText}>{errors.email}</Text>}
                                    {/* For password */}
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder='Password'
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        autoCapitalize="none"
                                        value={values.password}
                                        secureTextEntry
                                    />
                                    {(errors.password && touched.password) && <Text style={styles.errorText}>{errors.password}</Text>}

                                    <Button title={"Login"} color={"#F47474"} onPress={handleSubmit} />
                                    <Button title={"Don't have account yet?"} color={"blue"} onPress={() => navigation.navigate('SignUpScreen')} color='#85AAE6' />

                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    introLabel: {
        textAlign: "left",
        marginBottom: 10,
        marginLeft: 25,
        fontSize: 55,
        color: '#F47474',
    },
    titleLabel: {
        textAlign: "left",
        margin: 10,
        fontSize: 32,
        color: '#4D4F5C'
    },
    miniInstruction: {
        textAlign: "left",
        marginLeft: 25,
        marginBottom: 10,
        fontSize: 24,
        color: '#6E7079'
    },
    errorText: {
        textAlign: "left",
        margin: 5,
        fontSize: 24,
        color: '#FF0000'
    },
    textInput: {
        height: 50,
        fontSize: 25,
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
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#DBDBDB',
    },
    formikBlock: {
        height: 400,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#DBDBDB',
        borderWidth: 1,
    }
});

export default LoginScreen;
