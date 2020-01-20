import React, { Component } from 'react';
import {
  StyleSheet,
  
  View,
  Image,
  TouchableOpacity
} from 'react-native';
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
  Form,
  Item,
  Label,
  Input,
  ListItem,List,
} from 'native-base';
import { userOperations } from '../../State/Ducks/User';
import { realmConnect } from 'realm-react-redux';
import { bindActionCreators } from 'redux';

import UserDetails from '../ReusableComponents/UserDetails/UserDetails';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
     
      mobile: props.user.mobile,
      email: props.user.email,
      _id:props.user._id,
      name: props.user.name,
      avatar: props.user.avatar,
      
    };
  }

  updateAccount = async () => {
    userData = {
      _id: this.props.user._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: this.state.mobile,
      avatar: this.state.avatar,
      localAvatar: this.state.localAvatar,
    };

    try {
      this.setState({
        isFetching: true,
      });
      const response = await Api.put('/users', userData);

      if (response.data.status) {
        //  console.log('status1', response.data.status);
        props.updateUser({ ...userData, avatar: userData.localAvatar });

        this.setState({
          isFetching: false,
        });
      } else {
        this.setState({
          isFetching: false,
        });
        Toast.show({
          text: 'Something is wrong',
          buttonText: '',
        });
      }
    } catch (error) {
      this.setState({
        isFetching: false,
      });
      Toast.show({
        text: 'Not connected to Internet.',
        buttonText: 'Try Again',
      });
    }
  };

  updateAvatar = data => {
    this.setState({
      avatar: data.avatar,
      localAvatar: data.localAvatar,
    });
  };

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
            <Title>My Profile</Title>
          </Body>
          <Right style={{ flex: 1 }}>
       
       </Right>
        </Header>
       
        {/* <UserDetails
          navigation={this.props.navigation}
          user={this.props.user}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          mobile={this.state.mobile}
          avatar={this.state.avatar}
          buttonText="Update"
          updateAvatar={this.updateAvatar}
          handleFirstNameChange={firstName => {
            this.setState({ firstName: firstName });
          }}
          handleLastNameChange={lastName => {
            this.setState({ lastName: lastName });
          }}
          handleMobileChange={mobile => {
            this.setState({ mobile: mobile });
          }}
          updateAccount={this.updateAccount}
          isDataFetching={this.state.isFetching}
        /> */}

         <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'http://ec2-13-233-245-178.ap-south-1.compute.amazonaws.com/image/catalog/demo/2.jpg'}}/>
          <View style={styles.body}>
            
           
        </View>
        <List>
            <ListItem itemDivider>
              <Text>Persoal Information</Text>
            </ListItem> 
            <ListItem>
              
              <Icon  name='person' />
                <Text>   {this.state._id}</Text> 
    
              </ListItem>                   
            <ListItem>
            
            <Icon name='person' />
            <Body>
            <Text>  {this.state.name}</Text>
            </Body>
            <Right/>
            </ListItem>
            <ListItem>
            <Icon  name='md-phone-portrait' />
            <Body>
            <Text>  {this.state.mobile}</Text>
            </Body>
            </ListItem>
            <ListItem>
            <Icon  name='mail' />
            <Body>
            <Text>  {this.state.email}</Text>
            </Body>
            </ListItem>
           
           
            
          </List>


      </View>
  
    
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ff852f",
    height:110,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },

  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:20,
  },
 
  name:{
    fontSize:25,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
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
      updateUser: userOperations.updateUser,
    },
    dispatch
  );
}

export default realmConnect(
  mapPropsToQueries,
  mapQueriesToProps,
  mapRealmDispatchToProps
)(Profile);
