import React, { useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import Screen from '../components/Screen';
import HeaderCurve from '../components/HeaderCurve';
import TicketOnSale from '../components/TicketOnSale';
import { ScrollView } from 'react-native-gesture-handler';
import api from "../api/axiosSettings";
import AuthContext from '../auth/context';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export default function BuyTicketScreen() {
  const authContext = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [passenger, setPassenger] = useState([]);
  let accountId = authContext.user.accountId;
  const myLocalFlashMessage = useRef();

  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    api.get('/ticket/getTicketsOnSale/').then((response) => {
      if (response != null || response.data > 0 || response != undefined) {
        setTickets(response.data);
      }
    });
  }, []);
  const displaySuccess = () =>{
    console.log("here");
  }
  function UploadScreen({ progress = 0, visible = false }) {
    return (
      <Modal visible={visible}>
        <View>
          <Text>{progress * 100}%</Text>
        </View>
      </Modal>
    )
  }
  const addTicketToUser = (ticket) => {
    displaySuccess();
    api.post(`/account/addTicket/${accountId}`, {
      destination: ticket.destination,
      arrival_time_eta: ticket.arrival_time_eta,
      departure: ticket.departure,
      departure_time: ticket.departure_time,
      busNumber: ticket.busNumber,
      status: "Active",
      price: ticket.price
    }, {
      onUploadProgress: (progress) => console.log(progress)
    }).then(response => {
      if (response.data != null) {
        console.log("Data: " + response.data);
        setPassenger(response.data);
      }
    })
  }
  return (
    <Screen>
      <ScrollView >
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>Happy Bus Tickets on Sale</Text>
          <Text style={styles.textDescription}> Available bus destinations and departures</Text>
        </View>
        {tickets.map((ticket, index) => {
          return (
            <TicketOnSale onPress={() => {
              addTicketToUser(ticket);
              showMessage({
                  message: "Ticket Confirmation" ,
                  description: "Passenger successfully added to Bus Number " + ticket.busNumber,
                  type: 'success' ,
                  color: '#FFFFFF',
              });
          }} key={index} destination={ticket.destination} arrivalTime={ticket.arrival_time_eta} departure={ticket.departure} departurTime={ticket.departure_time} busNumber={ticket.busNumber} status={ticket.status} price={ticket.price} />
          );
        })}
      </ScrollView>
      <FlashMessage style={{ borderBottomEndRadius: 20, borderBottomStartRadius: 20, }} statusBarHeight={5} ref={myLocalFlashMessage} position='top' icon='success' />
    </Screen>
  );

}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
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
/** {(tickets != undefined) ?
          tickets.map((ticket) => {
            return (
              <TicketOnSale destination={ticket.destination} arrivalTime={ticket.arrival_time_eta} departure={ticket.departure} departurTime={ticket.departure_time} busNumber={ticket.busNumber} status={ticket.status} price={ticket.price} />
            );
          }) : <Text></Text>} */