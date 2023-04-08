<<<<<<< HEAD
import React from 'react';
import { View, Text } from 'react-native';
import Screen from '../components/Screen';

export default function SettingScreen() {
  return (
    <Screen>
      <Text>SettingScreen</Text>
     </Screen>
=======
import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import AuthContext from '../auth/context';

export default function SettingScreen() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState()
  const logoutUser = () => {
    setUser("logout");
  };
  useEffect(() => {
    if (authContext != null) {
      if (user == "logout")
        authContext.setUser(null);
    }
  });
  return (
    <Screen>
        <View style={{justifyContent: 'center', borderColor: 'red'}}>
          <Button onPress={logoutUser} title='Logout'></Button>
        </View>

    </Screen>
>>>>>>> cac1951 (ui bus ticket, ticket, login screens)
  );
}
