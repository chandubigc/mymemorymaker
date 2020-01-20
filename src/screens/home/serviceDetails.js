import React, { Component } from 'react';

import { View,  Image,Dimensions,FlatList,TouchableOpacity } from 'react-native';
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
import CardSection from './abs/CardSection';
import styles from './styles';
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

const bdayImage = require("../../Images/bday/1.jpg");
class ServiceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
     
      data: [
    
    
      ],
      position:1,
      tpositioni:1,
      category:{},
      imageUrl:'https://mymemorymaker.in/img/plogo1.png',
      sliders:[],
      testimonials:[]
    };
  }

  async componentDidMount() {
    let eventData = this.props.navigation.state.params.eventData;
    this.setState({category:eventData});
    this.setState({imageUrl:this.props.navigation.state.params.imageUrl});
    

    this.loadSlider(eventData.id);
    this.loadAlbums(eventData.id);
    this.loadTestimonials(eventData.id);
  
  }

  async loadAlbums(id){
    const response = await Api.post(
				
			'album.php',
			'eventid='+id,
			
		  );

		  if(response && response.data && !response.data.error){
        console.log("data inside",response.data);
          let Albumslist = response.data.Albumslist;
          let AlbumslistData = [];
          if(Albumslist && Albumslist.length>0){
            for(var i =0 ; i < Albumslist.length; i++){
              let Album = Albumslist[i];
              AlbumslistData.push({id:Album.Id,title:Album['Album Name'],count:1,image:Album['Album Image'],thumbnail_image:Album['Album Image']})
            }

          }
          this.setState({data:AlbumslistData});


      }
  


  }

  async loadTestimonials(id){
    const response = await Api.post(
			'testimonials.php',
			'id='+id,
			 );

		  if(response && response.data && !response.data.error && response.data.Testimonials){
        console.log("data inside",response.data);
          let Albumslist = response.data.Testimonials;
          let AlbumslistData = [];
          if(Albumslist && Albumslist.length>0){
            for(var i =0 ; i < Albumslist.length; i++){
              let Album = Albumslist[i];
           
             // AlbumslistData.push({id:Album.Id,title:Album['Name'],count:1,image:Album['Album Image'],thumbnail_image:Album['Album Image']})
             AlbumslistData.push({caption:Album['Comment'],title:Album['Name'],imageUrl:Album['Albums'] })
            }

          }
          this.setState({testimonials:AlbumslistData});


      }
  


  }

  async loadSlider(id){

    const response = await Api.post(
				
			'sliders.php',
			'id='+id,
			
      );
      
      if(response && response.data && !response.data.error && response.data.Sliders){
        let Sliders = response.data.Sliders;
        let mappedList = [];
  
        for(var i = 0 ; i < Sliders.length; i++){
            let eventObj = Sliders[i];
           // mappedList.push({title:eventObj['Event Name'],caption:'My Memory Makers',url:eventObj['Banner Image'] })
            mappedList.push({title:'',caption:'',url:eventObj['Albums'] })
          

        }
        this.setState({sliders:mappedList});

      }


  }

 async _onPressItem (id,title) {
    console.log("ON PRESSS",id);
    // this.props.navigation.navigate('Detail',{item: item});
    this.props.navigation.navigate('AlbumImagesScreen',{title:title,albumId:id})
  };
 

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
          <Body style={{ flex: 3 }}>
    <Text  style={{color: '#fff'}}>{this.state.category.text}</Text>
          </Body>

          <Right style={{ flex: 1 }}>
         
          </Right>
        </Header>
        <Content>
        { this.state.sliders.length>0 && 
       <Slideshow  
        dataSource={this.state.sliders}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />
        
        }
      
          {/* <Card >
            <CardItem bordered>
              <Left>
               
                <Body>
                  <Text>Albums</Text>
                
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
              <View >
                <View>
                  <Image style={{
                   
                    height:imgHeight,
                   
                    width: deviceWidth,
                   
                  }} source={{uri:item.image}}/>
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
      </Card> */}
{ this.state.data.length>0 && 
<Card>
<CardItem bordered>
              <Left>
               
                <Body>
                <Text style={{color:'#ff852f',fontWeight: 'bold'}}>Albums</Text>
                
                </Body>
              </Left>
            </CardItem>

         <CardSection>
      

<FlatList
            
            ref={ref => (this.flatListRef = ref)}
            data={this.state.data}
            showsHorizontalScrollIndicator={false}

            numColumns={3}
           
            renderItem={({ item, index }) => (
          
             
              <TouchableOpacity
              
              onPress={() => this._onPressItem(item.id,item.title)}
              >
                <View style={{ flex: 1, flexDirection: 'column', margin: 1,alignSelf:"center" }} >
                  <Thumbnail

                    square
                    large
                    style={styles.thumbnail}
                    source={{ uri: item.image }}
                  />
                </View>
                <Text style={{ marginLeft:5}}>{item.title}</Text>
               
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
</CardSection>
</Card>
}
{ this.state.testimonials.length>0 && 
  <Card >
     <CardItem bordered>
              <Left>
               
                <Body>
                  <Text style={{color:'#ff852f',fontWeight: 'bold'}}>Testimonials</Text>
                
                </Body>
              </Left>
            </CardItem>
    <CardSection>
         

              <View style={styles.container}>
        <View
     
        >
          <FlatList
            horizontal
            ref={ref => (this.flatListRef = ref)}
            data={this.state.testimonials}
            showsHorizontalScrollIndicator={false}
          
            renderItem={({ item, index }) => (
            
               
                <View style={{flex: 0.5, flexDirection: 'row', width: deviceWidth}}>   
                <View style={[styles.viewStyle, {flex: 1, flexDirection: 'column'}]}>
                <View style={styles.childStyle} >
               <Thumbnail   source={{ uri : item.imageUrl}} />
              
            </View>
           
                </View>
                <View style={[styles.viewStyle, {flex: 3, flexDirection: 'column'}]}>
                <View style={styles.childStyle1} >
            <Text>{item.caption}</Text><Text style={{color:'#ff852f',fontWeight: 'bold',fontStyle: 'italic'}}>--{item.title}</Text>
            </View>
          
                </View>


                </View>
              
                
            
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>


     
   
        </CardSection>
    </Card>    
        }

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
