import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { styles } from './Styles';
import { Input, Button } from 'native-base';
import { dispatch } from '../../State/ReduxStore';
import Config from 'react-native-config';
import Api from '../../State/Middlewares/Api';
import User from '../../State/Model/User';



import { realmDispatch } from '../../State/RealmStore';
export default class LogInScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileNumber: '9949412205',
			loading: false,
		};
	}
	async getOTP() {
	
		const response = await Api.post(
				
			'login.php',
			'phone='+this.state.mobileNumber,
			
		  );

		  if(response && response.data && !response.data.error){
			  

		  }else{
			  // toast
		  }
		  console.log("API",response);

		
	}

	handleReadMore() {
		this.props.navigation.navigate('TermsAndConditions');
	}

	render() {
		return (
			<ScrollView
				testID="loginScreen"
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.logoContainer}>
					{/* <Text style={styles.logo}>ZONO</Text> */}
					<Image style={styles.images} source={require('../../Images/logo.jpg')} />
				</View>
				<View style={styles.content}>
					<View style={styles.formContainer}>
						<Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular' }}>
							Please enter 10 digits mobile number
						</Text>
						<View style={{ ...styles.inputContainer, backgroundColor: '#eee' }}>
							<Text
								style={{
									fontSize: 16,
									color: 'gray',
									fontFamily: 'FiraSans-Regular',
								}}
							>
								{'+91 | '}
							</Text>
							<Input
								testID="typePhoneNumber"
								autoFocus
								keyboardType="number-pad"
								onChangeText={mobileNumber => this.setState({ mobileNumber })}
								value={this.state.mobileNumber}
								maxLength={10}
								onSubmitEditing={() => {
									this.state.mobileNumber.length === 10 && this.getOTP();
								}}
							/>
						</View>
					
						<Text style={{ fontSize: 10, fontFamily: 'FiraSans-Regular' }}>
							Environment {Config.ENV}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
						}}
					>
						<Text
							style={{
								fontSize: 13,
								lineHeight: 20,
								color: '#000',
								fontFamily: 'FiraSans-Regular',
								paddingRight: 5,
							}}
						>
							I have read and agree to the{' '}
						</Text>
						<TouchableOpacity onPress={() => this.handleReadMore()}>
							<Text
								style={{
									fontSize: 12,
									lineHeight: 20,
									color: '#000',
									fontFamily: 'FiraSans-SemiBold',
									textDecorationLine: 'underline',
								}}
							>
								Terms and Conditions
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							testID="submit"
							disabled={!(this.state.mobileNumber.length === 10)}
							style={{
								backgroundColor:
									this.state.mobileNumber.length === 10 ? '#ff852f' : 'gray',
								...styles.button,
							}}
							onPress={() => {
								this.getOTP();
							}}
							
						>
							<Text style={styles.buttonText}>
								{this.state.loading ? 'Getting OTP' : 'Submit'}
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
