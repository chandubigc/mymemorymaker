import React, { Component } from 'react';
import { ImageBackground, View, StatusBar, Image } from 'react-native';
import { Alert, PermissionsAndroid, Platform,Dimensions,FlatList,TouchableOpacity,StyleSheet } from 'react-native';
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
  DeckSwiper,

  List,
  ListItem,
 
  
} from 'native-base';
import { RNCamera, FaceDetector } from 'react-native-camera';

import styles from './styles';
import { userOperations } from '../../State/Ducks/User';
import { realmConnect } from 'realm-react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

import Slideshow from 'react-native-image-slider-show';

import Api from '../../State/Middlewares/Api';
import { dispatch } from '../../State/ReduxStore';
const deviceWidth = Dimensions.get("window").width;
const babyImage = require("../../Images/baby/2.jpg");
const bdayImage = require("../../Images/bday/1.jpg");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      position: 1,
      interval: null,
      cards:[
        {
          id:"1",
          text: 'Kids Photography',
          main: 'Baby / Kids',
          name: 'Cutness overloaded',
          description: 'Kids are cute little beings. Each of their cuteness is worth capturing. Kids are vulnerable being who are never stagnant at a place. They keep moving and revolving around. Sitting down at a place with no expressions at all isn’t their thing. But for us moments are all we need and kids’ vulnerability is an add on to us. All of the little cute acts that they do are immensely beautiful and can be captured beautifully. To get the desired expectation from the kids’ photography the photographer first has to build connection with child. Once connected and comfortable around, child photography can give amazing results.',
          thumb: require('../../Images/baby-photography.png'),
          image: babyImage,
        },
        {
          id:"2",
          text: 'Birthday Photography',
          main: 'Birthday',
          thumb: require('../../Images/birthday-photography.png'),
          name: 'Celebrations...',
          description:"We know how special your baby's birthday is for you, as you celebrate the day not lesser than a festival. It is the day for the celebration of parenting. Apart from capturing pictures Birthday photography involves a lot more effort to make the babies smile for the pictures and play free on the stage during the celebrations. We have custom designed photo albums and specialized kids photographers for birthday photography to make your child’s day a really special one. We know your Son is a prince; your daughter is a princess. we make your Kid's photo album a fairy tale you dream. To make your baby's birthday a lifetime memory Book Best Birthday Photographers in Hyderabad at My Memory Maker!",
          image: bdayImage,
        },
        {
          id:"3",
          text: 'Event Photography',
          main: 'Event',
          thumb: require('../../Images/event.png'),
          name: 'Celebrations...',
          description:"To carry out an event is no lesser than giving birth to a child, raising them, educating them, getting them married and then sitting in relief. The feels after the event finishes are no lesser than that. Each moment right from a child's birth to their marriage is a beautifully capturable scenario. Likewise, In an event, there are numerous activities and numerous activities give numerous eye-pleasing results. The effort that the entire event team puts to get things at the place is only visible in the picture recreation of it. Every event needs an expert cameraman to capture you in your action mode. Don't wait, create!",
          image: bdayImage,
        },
        {
          id:"8",
          text: 'Commericial Photography',
          main: 'Commericial',
          thumb: require('../../Images/portfolio.png'),
          name: 'Celebrations...',
          description:"To carry out an event is no lesser than giving birth to a child, raising them, educating them, getting them married and then sitting in relief. The feels after the event finishes are no lesser than that. Each moment right from a child's birth to their marriage is a beautifully capturable scenario. Likewise, In an event, there are numerous activities and numerous activities give numerous eye-pleasing results. The effort that the entire event team puts to get things at the place is only visible in the picture recreation of it. Every event needs an expert cameraman to capture you in your action mode. Don't wait, create!",
    image: bdayImage,
        },
        {
          id:"4",
          text: 'Engagement Photography',
          main: 'Engagement',
          thumb: require('../../Images/engagement-photography.png'),
          name: 'Celebrations...',
          description:"A pure relationship starts with a beautiful promise of being together which is imparted through a beautifully executed ring ceremony. The beginning of any relationship is the most beautiful part of it. It is like two flower buds going to blossom in the same garden. Capturing the entire scenario itself sounds huge and then once captured it looks grand. Beautiful candid’s, Bright pictures, well-planned portraits are all a part of engagement photography. We love to impart smiles on our consumer's face and in engagement photography we find smiles more than anything else. Create your beautiful engagement photo album and cherish it till time embarked.",
          image: bdayImage,
        },
        {
          id:"5",
          text: 'Wedding Photography',
          main: 'Wedding',
          thumb: require('../../Images/bride.png'),
          name: 'Celebrations...',
          description:"Nothing is more beautiful than Fat Indian Weddings. Right from the enlightenment of yellow to the seduction red, weddings are just so colorful. Lots of smiles, shyness, fear of the scarred bride and Excited groom, with those naughty cousins to the food, drinks, dance, music and all pretty faces in their lehengas along with the handsome ones in sherwani’s lined up to pose for photographs. What do you need other than a professional wedding photographer and what do we need other than an excellent poser. With mixed emotions, Indian weddings are the hub of candid photography and the outcome is a treasure of beautiful visuals. Book your slot with the best wedding photographers in Hyderabad and get your colorful edition now!",
          image: bdayImage,
        },
        {
          id:"6",
          text: 'Pre-Wedding Photography',
          main: 'Pre-Wedding',
          thumb: require('../../Images/pre-wedding.png'),
          name: 'Celebrations...',
          description:"The period before marriage is a very integral part of any couple. Due to the evolving minds and changing trends in society, this new idea of pre-wedding shoot emerged. Pre-wedding shoots are generally themed as these pictures always add to the entire marital journey of the couple. Our team understands no one couple has the same tastes and to cope up with this problem, we have customized various themes to suit people's interests. So don’t let your pre-wedding mode be just a mode, get those memorable moments captured with My Memory Maker - professional photographers in Hyderabad!"  ,
          image: bdayImage,
        },
        {
          id:"7",
          text: 'Maternity Photography',
          main: 'Maternity',
          thumb: require('../../Images/maternity-photography.png'),
          name: 'Celebrations...',
          description:"That lady who laughs, who cries, who smiles, who yells, who urges, who sacrifices, She is the goddess of every house! She is our mother. Mothers acquire a very special position in our hearts and so do her child does in her heart. This Maternity photography celebrates 9 months of pain, love, eagerness, emotions, mood swings. These Maternity photographs are the best memories given to any mother. In the world where everybody is selfish, it is the only mothers who are selfless and Maternity photography celebrates the entire phase of maternity. Record your selfless phase of life with My Memory Maker!",
           image: bdayImage,
        }
      ],
      imageMap:{},
      dataSource:[],
    
     
    };
  }

  async componentDidMount() {

    		const response = await Api.get(
				
			'event.php',
			'',
			
		  );

		  if(response && response.data && !response.data.error){
			  
              let Eventslist = response.data.Eventslist;
              let mappedList = [];
              let imageMap = {};
              for(var i = 0 ; i < Eventslist.length; i++){
                  let eventObj = Eventslist[i];
                 // mappedList.push({title:eventObj['Event Name'],caption:'My Memory Makers',url:eventObj['Banner Image'] })
                  mappedList.push({title:'',caption:'',url:eventObj['Banner Image'] })
                
                  console.log("IMAGE",eventObj['Banner Image'])
                  imageMap[eventObj.Id] = eventObj['Banner Image'];

              }
              this.setState({dataSource:mappedList,imageMap:imageMap});

		  }else{
			  // toast
		  }
		  console.log("API",response);
   
  
  }


 
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
 
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  

 async onSend(item){
   this.props.navigation.navigate('ServiceDetailsScreen',{eventData:item,imageUrl:this.state.imageMap[item.id]});
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
            <Title>Services</Title>
          </Body>

          <Right style={{ flex: 1 }}>
           
          </Right>
        </Header>
     
      

        <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />

{/* <List
            dataArray={this.state.cards}
            renderRow={item => {
              return (
                <ListItem thumbnail onPress={() => this.props.navigation.navigate ('ServiceDetailsScreen',{eventData:item,imageUrl:this.state.imageMap[item.id]})}>
              <Left>
                <Thumbnail square  source={item.thumb} />
              </Left>
              <Body>
                <Text>{item.text}</Text>
                <Text note numberOfLines={2}>{item.name}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => this.props.navigation.navigate ('ServiceDetailsScreen',{eventData:item,imageUrl:this.state.imageMap[item.id]})}>
                <Icon name="eye" />
              
                </Button>
              </Right>
            </ListItem>
              );
            }}
          /> */}
          <View style={{width: '100%',flex: 1}}>
          <FlatList
        
        data={this.state.cards}
          renderItem={({ item }) => (
            <TouchableOpacity
              
            onPress={() => this.onSend(item)}
            style= {{flex:1,marginVertical:10}}
          >
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,alignSelf:"center" }}>
              <Image   onPress={() => this.onSend(item)} source={item.thumb} />
          <Text style={{alignSelf:"center",fontSize: 12}}>{item.main}</Text>
              <Text  style={{alignSelf:"center",fontSize: 12}}>Photography</Text>
            </View>
            </TouchableOpacity>
          )}
        
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
          </View>
      

              
        
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#4FCE5D' }}
          position="bottomRight"
          onPress={() => this.onFabClick()}
        >
          <Icon type="FontAwesome" name="whatsapp" fontSize={28} />
        </Fab> 

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
)(HomeScreen);
