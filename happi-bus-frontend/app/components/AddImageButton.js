import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';
function AddImageButton({onPress, title}) {
    return (
        <TouchableOpacity style={styles.addContainer} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    addContainer:{
        borderRadius: 70,
        marginTop: 10, 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85AAE6',
        padding: 10
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  
});
export default AddImageButton;