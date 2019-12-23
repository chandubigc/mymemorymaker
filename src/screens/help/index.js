import React, { Component } from 'react';
import { ImageBackground, View, StatusBar, Image } from 'react-native';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge,
  Fab,
} from 'native-base';


import styles from './styles';
import { userOperations } from '../../State/Ducks/User';

import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';



import Api from '../../State/Middlewares/Api';
import { dispatch } from '../../State/ReduxStore';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      teamsData: [],
      clickedUser: { points: 0, rank: 0 },
    };
  }

  async componentDidMount() {
    let x = 'ddd';
    console.log('INSIDE DID MOUNT', x);
   
  }

  async getLeaderBoard() {
   
  }

  componentWillUnmount() {
    geolocation.clearWatch(watchID);
  }

  

 

onFabClick(){
  this.setState({ active: !this.state.active });
  
  this.props.navigation.navigate('FaceDetectionScreen');

}

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title>Leaderboard </Title>
          </Body>

          <Right style={{ flex: 1 }}>
            <Icon
              onPress={() => this.props.navigation.navigate('Notifications')}
              style={{ color: 'white' }}
              name="setting"
              type="AntDesign"
            />
          </Right>
        </Header>
      
     
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.onFabClick()}
        >
          <Icon type="FontAwesome" name="camera" fontSize={28} />
        </Fab>
      </Container>
    );
  }
}

function mapPropsToQueries(realm) {
  return [realm.objects('User')];
}

function mapQueriesToProps([user], props) {
  console.log('user', user);
  return {
    user: user['0'],
  };
}

function mapRealmDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateDeviceInfo: userOperations.updateDeviceInfo,
      updateLocation: userOperations.updateLocation,
    },
    dispatch
  );
}

export default realmConnect(
  mapPropsToQueries,
  mapQueriesToProps,
  mapRealmDispatchToProps
)(HomeScreen);
