import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AddButton from './AddButton'

export default function TicketOnSale({ destination, arrivalTime, departure, departurTime, busNumber, seatNumber, status, price, onPress  }) {
    return (
        <TouchableOpacity >
            <View style={styles.ticketContainer} >
                <View style={{borderBottomWidth: 1, borderColor: "#DBDBDB", margin: 10,}}>
                    <Text style={styles.titleDefault}>{departure} to {destination}</Text>
                </View>
                <View style={styles.ticketInfoContainer}>
                    <View style= {{margin: 15}}>
                        <Image  style={{ width: 30, height: 30, tintColor: "#3AC49A", }} source={require('../assets/images/ticket.png')}/>
                    </View>
                    <View style= {{alignSelf: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.labelFont}>Departing Time: </Text>
                            <Text style={styles.valueFont}>{departurTime}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.labelFont}>Arrival Time: </Text>
                            <Text style={styles.valueFont}>{arrivalTime}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.labelFont}>Price: $</Text>
                            <Text style={styles.valueFont}>{price}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.labelFont}>Bus #</Text>
                            <Text style={styles.valueFont}>{busNumber}</Text>
                        </View>
                    </View>
                    <AddButton onPress={onPress}/>
                </View>
             
          
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    titleDefault: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    labelFont: {
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold'
    },
    valueFont: {
        fontSize: 24,
        color: '#000000',
    },
    titleContainer: {
        borderBottomWidth: 1,
    },
    ticketInfoContainer:{
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center'
    },
    ticketImageContainer:{
        borderRadius: 100,
    },
    ticketContainer: {
        width: '95%',
        borderWidth: 1,
        borderColor: '#A7A7A7',
        margin: 5,
        alignSelf: 'center',
        borderRadius: 10
    },
    addButton:{

    }
   
})