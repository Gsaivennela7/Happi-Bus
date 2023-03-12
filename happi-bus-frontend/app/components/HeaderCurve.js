import React from 'react';
import { StyleSheet, View } from 'react-native';

function HeaderCurve({}) {
    return (
        <View style={styles.borderStyle}/>
    );
}
const styles = StyleSheet.create({
   borderStyle: {
        width: '100%', 
        height: '15%',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: "#85AAE6"
   }
  
  });
export default HeaderCurve;