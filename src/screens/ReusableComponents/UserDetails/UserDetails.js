import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Container, Input, Button, CheckBox } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import EditProfilePic from '../EditProfilePic';
import EStyleSheet from 'react-native-extended-stylesheet';
//import ButtonWithTracking from '../WithTracking';

const UserDetails = props => (
  <Container testID="userRegisterScreen">
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          paddingTop: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <EditProfilePic
            user={props.user}
            updateAvatarInServer={data => props.updateAvatar(data)}
            thumbnailContainerStyle={styles.avatar}
            iconContainerStyle={{
              position: 'absolute',
              top: 0,
              right: 5,
            }}
            navigation={props.navigation}
          /> */}
        </View>
        <View style={{ flexGrow: 1 }}>
          <View
            style={{
              flexGrow: 1,
            }}
          >
            <View style={styles.fieldContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ paddingBottom: 5, color: '#000' }}>
                  First Name<Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <View style={styles.inputField}>
                <Input
                  testID="textName"
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontFamily: 'FiraSans-Bold',
                    color: '#000',
                  }}
                  onChangeText={name => props.handleFirstNameChange(name)}
                  value={props.firstName}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexGrow: 1,
            }}
          >
            <View style={styles.fieldContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ paddingBottom: 5, color: '#000' }}>
                  Last Name<Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <View style={styles.inputField}>
                <Input
                  testID="textName"
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontFamily: 'FiraSans-Bold',
                    color: '#000',
                  }}
                  onChangeText={name => props.handleLastNameChange(name)}
                  value={props.lastName}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexGrow: 1,
            }}
          >
            <View style={styles.fieldContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ paddingBottom: 5, color: '#000' }}>
                  Mobile No<Text style={{ color: 'red' }}>*</Text>
                </Text>
              </View>
              <View style={styles.inputField}>
                <Input
                  testID="textName"
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontFamily: 'FiraSans-Bold',
                    color: '#000',
                  }}
                  onChangeText={name => props.handleMobileChange(name)}
                  value={props.mobile}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexGrow: 1,
              marginVertical: 5,
            }}
          >
            <Button
              testID="local"
              //disabled={!(props.isNameValid && props.isModified)}
              style={styles.ButtonStyle}
              onPress={() => props.updateAccount()}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'FiraSans-Bold',
                }}
              >
                {props.isDataFetching
                  ? `${props.buttonText.slice(0, -1)}ing `
                  : `${props.buttonText} `}
              </Text>
              {props.isDataFetching && (
                <View>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  </Container>
);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
  },
  fixedfooter: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '16rem',
  },
  ButtonStyle: {
    width: '100%',
    // backgroundColor: '#8ED384',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  ButtonStyleDisable: {
    width: '100%',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  fieldContainer: {
    flexGrow: 1,
    marginVertical: '5rem',
    justifyContent: 'center',
    fontSize: '16rem',
    lineHeight: '26rem',
    color: '#000',
    fontFamily: 'FiraSans-Medium',
  },
  inputField: {
    backgroundColor: '#F8F8F8',
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16rem',
    lineHeight: '19rem',
    fontFamily: 'FiraSans-Regular',
    height: '40rem',
  },
  avatar: {
    width: '120rem',
    height: '120rem',
    borderRadius: '120rem',
  },
});

UserDetails.defaultProps = {
  navigation: {},
  user: {},
  name: '',
  mobile: '',
  subtitle: '',
  email: '',
  city: '',
  updateAvatarInServer: () => {},
  fromAccountScreen: true,
  isDataFetching: true,
  isModified: true,
  isCityValid: true,
  isEmailValid: true,
  isNameValid: true,
  updateAccount: () => {},
  businessType: '',
  handleNameChange: () => {},
  handleSubtitleChange: () => {},
  handleEmailChange: () => {},
  handleCityChange: () => {},
  handleCommissionAgentChange: () => {},
};

UserDetails.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  name: PropTypes.string,
  mobile: PropTypes.string,
  subtitle: PropTypes.string,
  email: PropTypes.string,
  city: PropTypes.string,
  updateAvatarInServer: PropTypes.func,
  fromAccountScreen: PropTypes.bool,
  isDataFetching: PropTypes.bool,
  isModified: PropTypes.bool,
  isCityValid: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  isNameValid: PropTypes.bool,
  updateAccount: PropTypes.func,
  businessType: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleSubtitleChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleCommissionAgentChange: PropTypes.func,
};

export default UserDetails;
