import React from 'react';
<<<<<<< HEAD
import { View, Text } from 'react-native';
import Screen from '../components/Screen';
=======
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import Ticket from '../components/Ticket';


>>>>>>> cac1951 (ui bus ticket, ticket, login screens)

export default function TicketsScreen() {
  return (
    <Screen>
<<<<<<< HEAD
      <Text>TicketsScreen</Text>
     </Screen>
  );
}
=======
      <ScrollView>
       
        <Ticket name={"John Doe"} ticketNumber={"1AD124FA"} busNumber={"1AD"} destination={"Los Angeles"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departureTime={"4/7/23 12:30pm"} />
        <Ticket name={"John Doe"} ticketNumber={"1AD124FA"} busNumber={"1AD"} destination={"Los Angeles"} arrivalTime={"4/7/23 6:30pm"} departure={"San Jose"} departureTime={"4/7/23 12:30pm"} />

      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({

})
>>>>>>> cac1951 (ui bus ticket, ticket, login screens)
