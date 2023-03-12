import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {StyleSheet} from 'react-native';
import BuyTicketScreen from '../screens/BuyTicketScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import PaymentScreen from '../screens/PaymentScreen';


const Stack = createStackNavigator();
const FeedNavigator = ({navigation}) => (
    <Stack.Navigator >
        <Stack.Screen name="BuyTicketScreen" options={{title: '',  headerStyle: {backgroundColor: '#85AAE6'}, headerShown: false}} component={BuyTicketScreen} />
        <Stack.Screen name="CheckOutScreen" options={{title: '',  headerStyle: {backgroundColor: '#85AAE6'}, headerShown: false}} component={CheckOutScreen} />
        <Stack.Screen name="PaymentScreen" options={{title: '',  headerStyle: {backgroundColor: '#85AAE6'}, headerShown: false}} component={PaymentScreen} />
</Stack.Navigator>
)
const styles = StyleSheet.create({
   
})

export default FeedNavigator;