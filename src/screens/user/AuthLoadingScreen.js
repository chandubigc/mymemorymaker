import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import User from '../../State/Model/User';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import AsyncStorage from '@react-native-community/async-storage';
import { dispatch } from '../../State/ReduxStore';








class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  async componentDidMount() {
   
    this.initialize();
    this._bootstrapAsync();
    
  }






  initialize = async() => {

    // const { user, navigation } = this.props;
    // navigation.navigate ('Auth');


  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const {  navigation } = this.props;
    let users = User.get();
    let user = {};
    if(users){
      user = users[0];
    }
    if (user && user._id) {
     
      if (user.name && user.email) {


        if (
          navigation.getParam('fromLoginScreen', false) &&
          !navigation.getParam('fromUserDetailsScreen', false)
        ) {
         
        
       
        navigation.navigate('Home', { fromLoginScreen: true });

        } else if (
          navigation.getParam('fromLoginScreen', false) &&
          navigation.getParam('fromUserDetailsScreen', false)
        ) {
          // //  console.log ('otp + from form');
          navigation.navigate('Home', { fromLoginScreen: true });
        } else {
          // //  console.log ('killed and entered direct');
         
            navigation.navigate('Home', { fromLoginScreen: false });
         
          // navigation.navigate('Chats', { fromOTPScreen: false });
        }

      } else {
        // //  console.log ('no username or city');
     
        navigation.navigate('Home', {
          fromLoginScreen: true,
         
        });

      }
    } else {
        console.log ('no user', this.state);
      navigation.navigate('Auth');
    }
  };


  render() {
    console.log('state', this.state);
    return (
      <View
        testID="fromOTP"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#004B8C'
        }}
      >
        <StatusBar backgroundColor="#004B8C" barStyle="light-content" />
        <ActivityIndicator size="small" color="#fff" />
     
      </View>
    );
  }
}



export default (AuthLoadingScreen);
