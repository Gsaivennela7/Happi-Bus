import React from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
function AddButton({onPress}) {
    return (
        <TouchableOpacity style={styles.addContainer} onPress={onPress}>
           <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    addContainer:{
        height: 20,
        width: 60,
        borderRadius: 100,
        backgroundColor: 'white',
        position: 'absolute',
        right: 15,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3AC49A'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  
});
export default AddButton;