import React, { Component } from 'react';

import { TouchableOpacity,StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Title,

  Button,

  Text,
  Body,
  Left,
  Right,
  Icon,
  
  
} from 'native-base';


import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';
import { userOperations } from '../../State/Ducks/User';
import { realmConnect } from 'realm-react-redux';
import { bindActionCreators } from 'redux';



class QRCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
     
    };
  }

  async componentDidMount() {

    
   
  
  }


 
  componentWillMount() {
   
  }

  onSuccess = (e) => {
   console.log("album id:",e.data);
  }
 
  componentWillUnmount() {
    //clearInterval(this.state.interval);
  }
  

 async onSend(){
   this.props.navigation.navigate('ServiceDetailsScreen');
 }

onFabClick(){
 

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
            <Title>Scan and Find</Title>
          </Body>

          <Right style={{ flex: 1 }}>
           
          </Right>
        </Header>
     
        <QRCodeScanner
        onRead={this.onSuccess}
           
        topContent={
          <Text style={styles.centerText}>
           Scan Your Album
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
          
          </TouchableOpacity>
        }
      />


       

      </Container>
    );
  }
}

const styles1 = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
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
)(QRCodeScreen);
