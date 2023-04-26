import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

function Ticket({ name, ticketNumber, busNumber, departure, departureTime, destination, arrivalTime }) {
    return (
        <View style={styles.ticketContainer}>
            <View style={styles.ticketHeader}>
                <Text style={styles.text}>Happy Bus Ticket</Text>
            </View>
            <View style={styles.ticketInfo}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '65%', height: 60,  borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>Name: </Text>
                        <Text style={styles.valueFont}>{name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '35%', height: 60, borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>Ticket #: </Text>
                        <Text style={styles.valueFont}>{ticketNumber}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '26%', height: 60, borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>Bus No.: </Text>
                        <Text style={styles.valueFont}>{busNumber}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '37%', height: 60, borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>From: </Text>
                        <Text style={styles.valueFont}>{departure}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '37%', height: 60, borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>To: </Text>
                        <Text style={styles.valueFont}>{destination}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '50%', height: 60, alignSelf: 'center', borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>Departure: </Text>
                        <Text style={styles.valueFont}>{departureTime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, width: '50%', height: 60, borderColor: '#A7A7A7'}}>
                        <Text style={styles.labelFont}>Arrival: </Text>
                        <Text style={styles.valueFont}>{arrivalTime}</Text>
                    </View>
                </View>
            </View>
            <View style={{margin: 15, alignSelf: 'flex-end'}}>
                <QRCode value="www.google.com" />
            </View>
        
        </View>

    );
}
const styles = StyleSheet.create({

    ticketContainer: {
      
        width: '97%',
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 1,
        margin: 15,
        borderColor: '#A7A7A7'
    },
    ticketHeader: {
        borderBottomWidth: 1,
        backgroundColor: '#FFAF84',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#A7A7A7',
        padding: 10,
    },
    ticketInfo: {

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    labelFont: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        alignSelf: 'center',
        paddingLeft: 10,
    },
    valueFont: {
        fontSize: 18,
        color: '#000000',
        alignSelf: 'center'
    },

});
export default Ticket;