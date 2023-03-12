import React from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native'

function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar barStyle={"light-content"} backgroundColor={"white"} ></StatusBar>
            {props.children}
        </SafeAreaView>
    );
}

const BAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F0ECD8',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
       
    },
})

export default Screen;