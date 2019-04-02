import React from 'react';
import { Text, View } from 'react-native';
import Styles from './screens_css.js'
import { Input, Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Datastore from 'react-native-local-mongodb';

var db;

export default class ConfigScreen extends React.Component {

  
  constructor(props) {
    super(props);
    db = new Datastore({ filename: 'LASC_Config', autoload: true , onload: this.didItLoad});
    this.state = {
      ClubRegistrationCode : null,
      SCMAccessToken: null,
      isVisible: false
    }
    this.storeConfig = this.storeConfig.bind(this)
    this.updateRegistrationCode = this.updateRegistrationCode.bind(this)
    this.updateSCMAccessToken = this.updateSCMAccessToken.bind(this)
    this.didItLoad = this.didItLoad.bind(this);
  }

  static navigationOptions = {
    title: 'Configuration',
  };

  didItLoad(err) {
    console.log("LoadError", err)
  }

  componentDidMount() {
    db.find({record: 'config'}, (err, config) => {
      if(config.length) this.setState(config[0]);
      console.log("Config", config[0], err)
    })
  }

  componentWillUnmount() {
    this.setState({isVisible: false})
  }

  updateRegistrationCode(text) {
    this.setState({ClubRegistrationCode: text});
  }

  updateSCMAccessToken(text) {
    this.setState({SCMAccessToken: text});
  }

  storeConfig() {
    console.log("Storing", this.state)
    db.update({record: 'config'}, 
      {
        record: 'config',
        ClubRegistrationCode: this.state.ClubRegistrationCode, 
        SCMAccessToken: this.state.SCMAccessToken
      },
      {upsert: true}, (err) => { 
        console.log("updateErr", err);
        this.setState({isVisible: true})
      })
    setTimeout(() => {this.setState({isVisible: false})}, 3000)
  }

  render() {
    return (
      <View style={Styles.configInputRow}>
        <View>
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            overlayStyle={Styles.configUpdatedOverlay}
          >
            <Text style={Styles.overlayText}>Configuration Updated!</Text>
          </Overlay>
        </View>
        <View>
          <Input
            name='ClubRegistrationCode'
            label="Club Registration Code"
            labelStyle={Styles.configLabel}
            placeholder='4 or 5 chars e.g. LVADY'
            inputStyle={Styles.myInputStyle}
            inputContainerStyle={Styles.configASAClubCodeInput}
            value={this.state.ClubRegistrationCode}
            onChangeText={this.updateRegistrationCode}
          />
        </View>
        <View>
          <Input
            name='SCMAccessToken'
            label="SwimClubManager AccessToken"
            labelStyle={Styles.configLabel}
            placeholder='Security Token from SCM'
            inputStyle={Styles.myInputStyle}
            inputContainerStyle={Styles.configASAClubCodeInput}
            value={this.state.SCMAccessToken}
            onChangeText={this.updateSCMAccessToken}
          />
        </View>
        <View style={Styles.updateButton}>
          <Button
            title="Update" 
            raised
            buttonStyle={Styles.updateButtonText}
            onPress={this.storeConfig}
          />
        </View>
      </View>        
    );
  }
}
