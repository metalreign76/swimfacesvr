import React from 'react';
import { Text, View } from 'react-native';
import Styles from './screens_css.js'
import { TextInput } from 'react-native-gesture-handler';

export default class ConfigScreen extends React.Component {
  static navigationOptions = {
    title: 'Configuration',
  };

  render() {
    return (
      <View style={Styles.configInputRow}>
        <Text style={Styles.configLabel}>
          Club Registration Code
        </Text>
        <TextInput style={Styles.configASAClubCodeInput}/>
      </View>
    );
  }
}
