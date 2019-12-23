import React, { Component } from 'react';
import { ImageBackground, View, StatusBar, Image } from 'react-native';
import { Alert, PermissionsAndroid, Platform,Dimensions,FlatList,TouchableOpacity } from 'react-native';
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
  Card,
  CardItem ,
  Thumbnail,
  DeckSwiper
  
} from 'native-base';
import { RNCamera, FaceDetector } from 'react-native-camera';

import styles from './styles';
import { userOperations } from '../../State/Ducks/User';
import { realmConnect } from 'realm-react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';


import Leaderboard from 'react-native-leaderboard';
import Api from '../../State/Middlewares/Api';
import { dispatch } from '../../State/ReduxStore';
const deviceWidth = Dimensions.get("window").width;
const babyImage = require("../../Images/baby/2.jpg");
const bdayImage = require("../../Images/bday/1.jpg");
class ServiceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      cards:[
        {
          text: 'Kids Photography',
          name: 'Cutness overloaded',
          description: 'Kids are cute little beings. Each of their cuteness is worth capturing. Kids are vulnerable being who are never stagnant at a place. They keep moving and revolving around.',
          thumb: require('../../Images/baby-photography.png'),
          image: babyImage,
        },
        {
          text: 'Birthday Photography',
          thumb: require('../../Images/birthday-photography.png'),
          name: 'Celebrations...',
          description:'In an Indian scenario birthday for parents is no lesser than festivals. We know how special your child’s day is as that day you celebrate your birth as parents. ',
          image: bdayImage,
        },
      ]
    
     
    };
  }

  async componentDidMount() {
    let x = 'ddd';
    console.log('INSIDE DID MOUNT', x);
  
  }

  async getLeaderBoard() {
   
  }

 

  componentWillUnmount() {
   // geolocation.clearWatch(watchID);
  }

  

 



  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title>Kids Photography</Title>
          </Body>

          <Right style={{ flex: 1 }}>
         
          </Right>
        </Header>
         <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={require('../../Images/baby-photography.png')} />
                <Body>
                  <Text>Kids Photography</Text>
                  <Text note>Cutness overloaded</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={bdayImage}
                />
                <Text>
                Kids are cute little beings. Each of their cuteness is worth capturing. Kids are vulnerable being who are never stagnant at a place. They keep moving and revolving around.
                </Text>
              </Body>
            </CardItem>
            
          </Card>
        </Content> 
      
      
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
)(ServiceDetailsScreen);
