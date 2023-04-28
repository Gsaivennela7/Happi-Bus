import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function ImageInput({ onChangeImage, imageUri }) {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
        }
      };
    return (
        <TouchableOpacity onPress={pickImage}>
            <View style={styles.container}>
                {!imageUri && <MaterialCommunityIcons name="camera" size={100} color="#A7A7A7" />}
                {imageUri && <Image source={{ uri: imageUri }} style={{ width: 150, height: 150, borderRadius: 20, }} />}
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
        justifyContent: 'center'
    }

});
export default ImageInput;