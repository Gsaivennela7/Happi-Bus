import React from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
function Button({onPress, title, color}) {
    return (
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: color}]} onPress={onPress}>
           <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        borderRadius: 30,
        margin: 5,
        height: 50,
        borderWidth: 1,
        borderColor: '#A7A7A7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  
});
export default Button;