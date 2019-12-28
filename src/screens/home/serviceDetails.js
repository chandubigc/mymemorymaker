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



import Api from '../../State/Middlewares/Api';
import { dispatch } from '../../State/ReduxStore';
import { throwStatement } from '@babel/types';
const deviceWidth = Dimensions.get("window").width;

const bdayImage = require("../../Images/bday/1.jpg");
class ServiceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
     
      data: [
    
    
      ],
      category:{},
      imageUrl:'https://mymemorymaker.in/img/plogo1.png'
    };
  }

  async componentDidMount() {
    let eventData = this.props.navigation.state.params.eventData;
    this.setState({category:eventData});
    this.setState({imageUrl:this.props.navigation.state.params.imageUrl});
    const response = await Api.post(
				
			'album.php',
			'eventid='+eventData.id,
			
		  );

		  if(response && response.data && !response.data.error){
        console.log("data inside",response.data);
          let Albumslist = response.data.Albumslist;
          let AlbumslistData = [];
          if(Albumslist && Albumslist.length>0){
            for(var i =0 ; i < Albumslist.length; i++){
              let Album = Albumslist[i];
              AlbumslistData.push({id:Album.Id,title:Album['Album Name'],count:1,image:Album['Album Image']})
            }

          }
          this.setState({data:AlbumslistData});


      }
  
  
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
    <Title>{this.state.category.text}</Title>
          </Body>

          <Right style={{ flex: 1 }}>
         
          </Right>
        </Header>
         <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={this.state.category.thumb} />
                <Body>
                  <Text>{this.state.category.text}</Text>
                  <Text note>{this.state.category.name}</Text>
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
                  source={{uri:this.state.imageUrl}}
                />
              
              </Body>
            </CardItem>
            
          </Card>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
               
                <Body>
                  <Text>Alubms</Text>
                
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
        <View style={styles.container}>
        <FlatList style={styles.list}
          
          data={this.state.data}
          horizontal={false}
          numColumns={1}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image style={styles.cardImage} source={{uri:item.image}}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                 
                </View>
              </View>
            )
          }}/>
      </View>
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
