import React from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
function CustomButton({onPress, title}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
           <Text>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer:{
        height: 45,
        width: 45,
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#A7A7A7'
    },
  
});
export default CustomButton;