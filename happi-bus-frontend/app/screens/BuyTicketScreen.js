import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import HeaderCurve from '../components/HeaderCurve';
import TicketOnSale from '../components/TicketOnSale';
import { ScrollView } from 'react-native-gesture-handler';

export default function BuyTicketScreen() {
  return (
    <Screen>
      <ScrollView >
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>Buy Tickets</Text>
          <Text style={styles.textDescription}> Available bus destinations and departures</Text>
        </View>
        <TicketOnSale destination={"Los Angeles"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AD"} status={"Buy"} price={"60"} />
        <TicketOnSale destination={"Temecula"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AE"} status={"Full"} price={"60"} />
        <TicketOnSale destination={"Los Angeles"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AD"} status={"Buy"} price={"60"} />
        <TicketOnSale destination={"Temecula"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AE"} status={"Full"} price={"60"} />
        <TicketOnSale destination={"Los Angeles"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AD"} status={"Buy"} price={"60"} />
        <TicketOnSale destination={"Temecula"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departurTime={"4/7/23 12:30pm"} busNumber={"1AE"} status={"Full"} price={"60"} />
     
     
     
     
      </ScrollView>
    </Screen>
  );

}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  textDescription: {
    fontSize: 28,
    color: "#A7A7A7"
  },
  headerContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
})
