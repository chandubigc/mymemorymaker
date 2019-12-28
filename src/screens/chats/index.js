import React, { Component } from 'react';
import { ImageBackground, View, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';


import { realmConnect } from 'realm-react-redux';


import { bindActionCreators } from 'redux';

import {userOperations} from '../../State/Ducks/User';

const { Dimensions, Platform } = React;
class ChatsScreen extends Component {
  componentDidMount() {
   // this.props.syncContactsFromServer({ token: this.props.user.token,userId:this.props.user._id  });
    //this.fcmFunc();
  }



  render() {
    const { navigation,  } = this.props;
   
   // console.log('contact groups......', contactGroups);
    return (

      <Container>
      <Header>
      <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        <Body style={{flex: 1}}>
          <Title>Help</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
     
      <Card>
            <CardItem header bordered>
            {/* <Icon  name='md-phone-portrait'    style={{ color: 'rgba(255, 133, 47, 1)'   }} /> */}
            <Text>Mobile</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
               <Text>
               {`Sales: + 91 8686 365 365`}
               </Text>
              </Body>
            </CardItem>
           
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Text>{`info@mymemorymaker.in\n\ncareers@mymemorymaker.in`}</Text> 
              </Body>
            </CardItem>
            


          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
            <Text>Ground Floor, 3-6-363/p17,
              Janapriya colony, L.B.Nagar,
              Hyderabad - 500074.</Text> 
              </Body>
            </CardItem>
           
          </Card>
      </Content>
    </Container>




    );


      
  }
}

// const styles = EStyleSheet.create({
//   chatsContainer: { flex: 1, backgroundColor: '#f4f4f4' },
//   historySync: {
//     flexDirection: 'row',
//     backgroundColor: '#3686C1',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

function mapPropsToQueries(realm) {
  return [
    realm.objects('ContactThreads').sorted('latestMessage.createdAt', true),
    realm.objects('User'),
    realm.objects('ContactGroups').sorted('latestMessage.createdAt', true),
  ];
}

function mapQueriesToProps([contactThreads, user, contactGroups], props) {
  console.log('CONTACT THREADS NEW', contactThreads);
  return {
    // contactThreads: [
    //   {
    //     _id: '1',
    //     contact: {
    //       name: 'Anurag',
    //       avatar: null,
    //     },
    //   },
    //   {
    //     _id: '2',
    //     contact: {
    //       name: 'Soumika',
    //       avatar: null,
    //     },
    //   },
    // ],
    contactThreads,
    user: user['0'],
    teams: contactGroups,
  };
}

function mapRealmDispatchToProps(dispatch) {
  return bindActionCreators(
    {
     
      updateDeviceInfo : userOperations.updateDeviceInfo,
      updateLocation: userOperations.updateLocation
    },
    dispatch
  );
}

export default realmConnect(
  mapPropsToQueries,
  mapQueriesToProps,
  mapRealmDispatchToProps
)(ChatsScreen);
