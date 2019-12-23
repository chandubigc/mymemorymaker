import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { styles } from './Styles';
import { bindActionCreators } from 'redux';
import { userOperations } from '../../State/Ducks/User';
import { Input, Toast } from 'native-base';
import { Button, ListItem } from 'native-base';


import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

//import ButtonWithTracking, { TouchableOpacityWithTracking } from '../../Components/ReusableComponents/WithTracking';
import Config from 'react-native-config';
import axios from 'axios';


class OTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      otp: [],
      mobileNumber: '',
    };
    this.handleOTP = this.handleOTP.bind(this);
  }

  componentDidMount() {
    if (Config.ENV === 'production') {
      this.setState({
        mobileNumber: this.props.navigation.getParam('mobileNumber', '9999999999'),
      });
    } else {
      this.setState({
        otp: String(this.props.navigation.getParam('otp', '9999')).split(''),
        mobileNumber: this.props.navigation.getParam('mobileNumber', '9999999999'),
      });
    }
  }

 





  toApp = async() => {

	this.props.navigation.navigate('UserDetailsForm', {
		mobile: this.state.mobileNumber,
		otp: 1234,
	});

  };

  stopVerifyOTP = () => {
    this.setState({
      loading: false,
      otp: [],
    });
  };

  handleOTP = (index, otp) => {
    const curOTP = [...this.state.otp];
    if (otp) {
      if (index < 3) {
        this[`textInput${index + 1}`]._root.focus();
      }
    } else if (index > 0) {
      this[`textInput${index - 1}`]._root.focus();
    }
    curOTP[index] = otp;

    this.setState({ otp: curOTP });
  };

  resendOTP = () => {
    this.setState({ loading: false }, () => {
      axios
        .post(`${Config.API_ENDPOINT}/users/sendotp`, {
          mobile: this.state.mobileNumber,
        })
        .then((response) => {
          //  console.log('login response', response);
        })
        .catch((e) => {
          Toast.show({
            text: 'Not connected to internet.',
            buttonText: 'Please try again',
          });
          //  console.log('error', e);
        });
    });
  };

  isEmptyInput = () => {
    let empty = false;
    this.state.otp.forEach((t) => {
      if (!t) empty = true;
    });
    return empty;
  };

	render() {
		return (
			<ScrollView
				testID="otpScreen"
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.logoContainer}>
					{/* <Text style={styles.logo}>ZONO</Text> */}
					<Image style={styles.images} source={require('../../Images/logo.jpg')} />
				</View>
				<View style={styles.content}>
					<View style={styles.formContainer}>
						<Text
							style={{
								fontSize: 14,
								fontFamily: 'FiraSans-Regular',
								textAlign: 'center',
							}}
						>
							Please enter the One Time Password (OTP) sent to your mobile +91 ******
							{this.state.mobileNumber.substring(6, 10)}
						</Text>
						<View style={styles.inputContainer}>
							{[0, 1, 2, 3].map(i => (
								<View key={i} style={styles.otpInputContainer}>
									<Input
										style={{ textAlign: 'center' }}
										keyboardType="number-pad"
										onChangeText={otp => this.handleOTP(i, otp)}
										value={this.state.otp[i]}
										maxLength={1}
										ref={(input) => {
											this[`textInput${i}`] = input;
										}}
										onSubmitEditing={() => {
											if (!this.isEmptyInput()) {
												this.toApp();
											}
										}}
										autoFocus={i === 0}
										blurOnSubmit={false}
									/>
								</View>
							))}
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular' }}>
								Didn't receive OTP?{' '}
							</Text>
							<TouchableOpacity onPress={() => this.resendOTP()}>
								<Text
									style={{
										color: '#8ED384',
										fontSize: 13,
										fontFamily: 'FiraSans-Regular',
									}}
								>
									Resend
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							testID="verifyOTP"
							disabled={this.isEmptyInput()}
							style={{
								backgroundColor: !this.isEmptyInput() ? '#ff852f' : 'gray',
								...styles.button,
							}}
							onPress={() => {
								if (!this.isEmptyInput()) this.toApp();
							}}
							
						>
							<Text style={styles.buttonText}>
								{this.state.loading ? 'Verifying OTP' : 'Verify OTP'}
							</Text>
							{this.state.loading && (
								<View>
									<ActivityIndicator size="small" color="#fff" />
								</View>
							)}
						</Button>
					</View>
				</View>
			</ScrollView>
		);
	}
}


export default (OTPScreen);
