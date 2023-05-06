import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import Ticket from '../components/Ticket';
import api from "../api/axiosSettings";
import AuthContext from '../auth/context';


export default function TicketsScreen() {
  const authContext = useContext(AuthContext);
  let accountId = authContext.user.accountId;
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get(`/account/getAllTicket/${accountId}`).then((response) => {
      if (response != null || response.data > 0 || response != undefined) {
        setTickets(response.data);
      }
    });
  }, [tickets]);
  return (
    <Screen>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>Your Happy Bus Tickets</Text>
        <Text style={styles.textDescription}> Ticket Receipt  </Text>
      </View>
      <ScrollView>
        {tickets.map((ticket, index) => {
          return (
            <Ticket key={index} name={authContext.user.firstName + " " + authContext.user.lastName} ticketNumber={ticket.ticketId} destination={ticket.destination} arrivalTime={ticket.arrival_time_eta} departure={ticket.departure} departureTime={ticket.departure_time} busNumber={ticket.busNumber} status={ticket.status} />
          );
        })}
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  textDescription: {
    fontSize: 18,
    color: "#A7A7A7"
  },
  headerContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
})
