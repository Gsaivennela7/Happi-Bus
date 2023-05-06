import React from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';

export default function componentName({progress, visible}) {
    return (
        <Modal style={{ flex: 1 }} visible={visible}>
            <View style={{
                height: 100,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Progress.CircleSnail color={['#F47474', '#85AAE6']} size={70} />
            </View>
        </Modal>
    )
}
