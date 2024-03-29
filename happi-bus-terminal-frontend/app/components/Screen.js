import React from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native'
function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
            {props.children}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    }
})

export default Screen;