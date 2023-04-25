import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import HeaderCurve from '../components/HeaderCurve';
import TicketOnSale from '../components/TicketOnSale';
import { ScrollView } from 'react-native-gesture-handler';
import api from "../api/axiosSettings";
import AuthContext from '../auth/context';

export default function BuyTicketScreen() {


  const authContext = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  console.log(authContext.user)
  useEffect(() => {
    api.get('/ticket/getTicketsOnSale/').then((response) => {
      if (response != null || response.data > 0 || response != undefined) {
        setTickets(response.data);
      }
    });
  }, []);

  return (
    <Screen>
      <ScrollView >
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>Buy Tickets</Text>
          <Text style={styles.textDescription}> Available bus destinations and departures</Text>
        </View>
        {tickets.map((ticket, index) => {
            return (
              <TicketOnSale key={index} destination={ticket.destination} arrivalTime={ticket.arrival_time_eta} departure={ticket.departure} departurTime={ticket.departure_time} busNumber={ticket.busNumber} status={ticket.status} price={ticket.price} />
            );
          })}
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
/** {(tickets != undefined) ?
          tickets.map((ticket) => {
            return (
              <TicketOnSale destination={ticket.destination} arrivalTime={ticket.arrival_time_eta} departure={ticket.departure} departurTime={ticket.departure_time} busNumber={ticket.busNumber} status={ticket.status} price={ticket.price} />
            );
          }) : <Text></Text>} */