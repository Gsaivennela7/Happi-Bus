import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import Screen from './app/components/Screen';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from './app/components/api/axiosSettings'
import * as yup from 'yup'

export default function App() {

  const autoPopulate = (values) => {
    api.get("/bus/addTicketsOnSale/").then(response => {
      if (response.data != null) {
        console.log("Data: " + response.data);
      }
    })
  }
  const deleteAllTickets = (values) => {
    api.delete("/bus/deleteAllTickets/").then(response => {
      if (response.data != null) {
        console.log("Data: " + response.data);
      }
    })
  }

  return (
    <Screen>
      <View style={{ backgroundColor: '#E7ECF4' }}>
        <View>
          {/* Section reserved for Login + mini instruction */}
          <Text style={styles.introLabel}>Happy Bus Terminal</Text>
          <Text style={styles.miniInstruction}>Bus Terminal Admin Control</Text>
        </View>


        <View style={styles.cameraBlock}>
          <Text style={styles.miniInstruction}>Facial Recognition</Text>
        </View>

        <View style={styles.ticketBlock}>
          <Text style={styles.miniInstruction}>Add Bus Ticket for Sale</Text>
          <Formik
            initialValues={{ destination: '', arrival_time_eta: '', departure: '', departure_time: '', busNumber: '', status: '', price: '' }}
            onSubmit={values => handleSubmit(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
              <View style={{ marginTop: 10 }}>
                {/* For email */}
                <TextInput
                  style={styles.textInput}
                  placeholder="San Jose"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  value={values.email}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  value={values.email}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  value={values.email}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  value={values.email}
                />
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
                {(errors.password && touched.password) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}

                <View style={styles.buttonContainer}>
                  <Button onPress={handleSubmit} title="Add" color='#775E5E' disabled={!isValid} />
                </View>
       
                <View style={styles.buttonContainer}>
                  <Button onPress={autoPopulate} title="Auto Populate" color='#775E5E' disabled={!isValid} />
                </View>
                <View style={styles.buttonContainer}>
                  <Button onPress={deleteAllTickets} title="Delete All" color='#775E5E' disabled={!isValid} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  cameraBlock: {
    height: '40%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#A7A7A7",
    width: '98%',
    alignSelf: 'center',
    marginTop: 15,
  },
  ticketBlock: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#A7A7A7",
    width: '98%',
    alignSelf: 'center',
    marginTop: 15,
  },
  miniInstruction: {
    fontSize: 24,
    paddingLeft: 10,
    paddingTop: 5,
  },
  introLabel: {
    fontSize: 40,
    paddingLeft: 10
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
  buttonContainer: {
    width: '98%',
    borderWidth: 1,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 15,
  }
});

