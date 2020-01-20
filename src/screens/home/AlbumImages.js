import React, { Component } from 'react';
import { ImageBackground, View, StatusBar, Image,Text } from 'react-native';
import { Dimensions,FlatList,TouchableOpacity,StyleSheet,Modal } from 'react-native';

import { RNCamera, FaceDetector } from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import AlbumDetail from './abs/AlbumDetail';
import { userOperations } from '../../State/Ducks/User';
import { realmConnect } from 'realm-react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import Slideshow from 'react-native-image-slider-show';


import Api from '../../State/Middlewares/Api';
import { dispatch } from '../../State/ReduxStore';
import { throwStatement } from '@babel/types';
const deviceWidth = Dimensions.get("window").width;
const imgHeight =  (deviceWidth *(2/3));
import Gallery from 'react-native-image-gallery';
const bdayImage = require("../../Images/bday/1.jpg");
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  
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
class AlbumImagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      title: '',
      data:[],
      imageuri: '',
      ModalVisibleStatus: false,
    
    };
  }

    ShowModalFunction(visible, imageURL) {
    console.log("INSIDE SHOW MODE",visible);
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
    });
  }

  async componentDidMount() {
    let albumId = this.props.navigation.state.params.albumId;
    let albumTitle = this.props.navigation.state.params.title;
    this.setState({title:albumTitle});
    

    this.loadAlbums(albumId);
  
    
  
  }

  async loadAlbums(id){
    const response = await Api.post(
				
			'albumimages.php',
			'albumid='+id,
			
		  );

		  if(response && response.data && !response.data.error){
        console.log("data inside",response.data);
          let Albumslist = response.data.Albums;
          let AlbumslistData = [];
          if(Albumslist && Albumslist.length>0){
            for(var i =0 ; i < Albumslist.length; i++){
              let Album = Albumslist[i];
              AlbumslistData.push({src:Album['Albums']});
            }

          }
          this.setState({data:AlbumslistData});


      }
  


  }


  componentWillUnmount() {
   // geolocation.clearWatch(watchID);
  }

  

 



  render() {
    if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(false, '');
          }}>
          <View style={styles.modelStyle}>
            <FastImage
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
              resizeMode={FastImage.resizeMode.contain}
              onPress={() =>   this.setState({  ModalVisibleStatus: false,
                imageuri: '',}) }
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                console.log("image click","hello");
                this.ShowModalFunction(false, '');
              }}>
              <FastImage
                onPress={() =>   this.setState({  ModalVisibleStatus: false,
                  imageuri: '',}) }
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png',
                }}
                style={{ width: 35, height: 35, marginTop: 16 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
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
          <Body style={{ flex: 3 }}>
    <Text  style={{color: '#fff'}}>{this.state.title}</Text>
          </Body>

          <Right style={{ flex: 1 }}>
         
          </Right>
        </Header>
        <View>
         
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity
                  key={item.id}
                  style={{ flex: 1 }}
                  onPress={() => {
                    this.ShowModalFunction(true, item.src);
                  }}>
                  <FastImage
                    style={styles.image}
                    source={{
                      uri: item.src,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
       </Container>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  image: {
    height: 120,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
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
)(AlbumImagesScreen);
