import React from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native'
<<<<<<< HEAD

function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar barStyle={"light-content"} backgroundColor={"white"} ></StatusBar>
=======
function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
>>>>>>> cac1951 (ui bus ticket, ticket, login screens)
            {props.children}
        </SafeAreaView>
    );
}
<<<<<<< HEAD

const BAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F0ECD8',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
       
    },
=======
const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    }
>>>>>>> cac1951 (ui bus ticket, ticket, login screens)
})

export default Screen;