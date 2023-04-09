import React from 'react';
import {Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedNavigator from './FeedNavigator';
import CartScreen from '../screens/CartScreen';
import TicketsScreen from '../screens/TicketsScreen';
import SettingScreen from '../screens/SettingScreen';


const Tab = createBottomTabNavigator();
const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
});
const AppNavigator = () => (
    <Tab.Navigator  
    screenOptions={
        { headerStyle:{
                backgroundColor: "#85AAE6",
            }, 
            headerShown: true,
            activeBackgroundColor: "#85AAE6",
            activeTintColor: "#FFFFFF",
            inactiveBackgroundColor: "#FFFFFF",
            inactiveTintColor: "#DBDBDB",
            style: {
                height: 100
            },
            headerTitleStyle:{ color: '#FFF'},
       
        }
    } 
    >
        <Tab.Screen name="Home" component= {FeedNavigator}   listeners={tabBarListeners}
            options={{ tabBarLabel: '',  tabBarIcon: ({color}) => <Image  style={{ width: 25, height: 25, alignSelf: 'center',top: '20%', tintColor: color, }} source={require('../assets/images/store.png')}/> }}/>
        <Tab.Screen name="CartScreen" component= {CartScreen} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/cart.png')}/> }}/>
        <Tab.Screen name="TicketsScreen" component= {TicketsScreen} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/ticket.png')}/> }}/>
        <Tab.Screen name="SettingScreen" component= {SettingScreen} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/gear.png')}/> }}/>
    
    </Tab.Navigator>
)
export default AppNavigator;