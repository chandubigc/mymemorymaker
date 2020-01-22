import React, { Component } from 'react';

import { View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
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
  CardItem,
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
const imgHeight = (deviceWidth * (2 / 3));

const basic1 = require("../../Images/basic.png");
const basic2 = require("../../Images/basic2.png");
const basic3 = require("../../Images/basic3.png");
class ServiceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,

      data: [


      ],
      position: 1,
      tpositioni: 1,
      category: {},

      sliders: [],
      testimonials: [],
      mypackages: [],
    };
  }

  async componentDidMount() {
    let eventData = this.props.navigation.state.params.eventData;
    this.setState({ category: eventData });



    this.loadSlider(eventData.id);
    this.loadAlbums(eventData.id);
    this.loadTestimonials(eventData.id);
    this.loadPackages(eventData.id);

  }

  async loadPackages(id) {
    const response = await Api.get(

      'mypackages.json',
      '',

    );

    if (response.data && response.data[id]) {
      this.setState({ mypackages: response.data[id] });
      console.log("my packae", response.data[id]);
    }

  }

  async loadAlbums(id) {
    const response = await Api.post(

      'album.php',
      'eventid=' + id,

    );

    if (response && response.data && !response.data.error) {
      console.log("data inside", response.data);
      let Albumslist = response.data.Albumslist;
      let AlbumslistData = [];
      if (Albumslist && Albumslist.length > 0) {
        for (var i = 0; i < Albumslist.length; i++) {
          let Album = Albumslist[i];
          AlbumslistData.push({ id: Album.Id, title: Album['Album Name'], count: 1, image: Album['Album Image'], thumbnail_image: Album['Album Image'] })
        }

      }
      this.setState({ data: AlbumslistData });


    }



  }

  async loadTestimonials(id) {
    const response = await Api.post(
      'testimonials.php',
      'id=' + id,
    );

    if (response && response.data && !response.data.error && response.data.Testimonials) {
      console.log("data inside", response.data);
      let Albumslist = response.data.Testimonials;
      let AlbumslistData = [];
      if (Albumslist && Albumslist.length > 0) {
        for (var i = 0; i < Albumslist.length; i++) {
          let Album = Albumslist[i];

          // AlbumslistData.push({id:Album.Id,title:Album['Name'],count:1,image:Album['Album Image'],thumbnail_image:Album['Album Image']})
          AlbumslistData.push({ caption: Album['Comment'], title: Album['Name'], imageUrl: Album['Albums'] })
        }

      }
      this.setState({ testimonials: AlbumslistData });


    }



  }

  async loadSlider(id) {

    const response = await Api.post(

      'sliders.php',
      'id=' + id,

    );

    if (response && response.data && !response.data.error && response.data.Sliders) {
      let Sliders = response.data.Sliders;
      let mappedList = [];

      for (var i = 0; i < Sliders.length; i++) {
        let eventObj = Sliders[i];
        // mappedList.push({title:eventObj['Event Name'],caption:'My Memory Makers',url:eventObj['Banner Image'] })
        mappedList.push({ title: '', caption: '', url: eventObj['Albums'] })


      }
      this.setState({ sliders: mappedList });

    }


  }

  async _onPressItem(id, title) {
    console.log("ON PRESSS", id);
    // this.props.navigation.navigate('Detail',{item: item});
    this.props.navigation.navigate('AlbumImagesScreen', { title: title, albumId: id })
  };


  componentWillUnmount() {
    // geolocation.clearWatch(watchID);
  }




  renderPackDetails(key) {
    return this.state.mypackages.slice(1).map((mypackage,index) => (
 
      <CardItem key={index} style={{ justifyContent: 'center',height:15 }}>

                      <Text>
                     {mypackage[key]}
                      </Text>

                    </CardItem>  
      
    ));
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
            <Text style={{ color: '#fff' }}>{this.state.category.text}</Text>
          </Body>

          <Right style={{ flex: 1 }}>

          </Right>
        </Header>
        <Content>
          {this.state.sliders.length > 0 &&
            <Slideshow
              dataSource={this.state.sliders}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })} />

          }


          {this.state.data.length > 0 &&
            <Card>
              <CardItem bordered>
                <Left>

                  <Body>
                    <Text style={{ color: '#ff852f', fontWeight: 'bold' }}>Albums</Text>

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

                      onPress={() => this._onPressItem(item.id, item.title)}
                    >
                      <View style={{ flex: 1, flexDirection: 'column', margin: 1, alignSelf: "center" }} >
                        <Thumbnail

                          square
                          large
                          style={styles.thumbnail}
                          source={{ uri: item.image }}
                        />
                      </View>
                      <Text style={{ marginLeft: 5 }}>{item.title}</Text>

                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </CardSection>
            </Card>
          }

          {this.state.mypackages.length > 0 &&
            <Card >
              <CardItem bordered>
                <Left>

                  <Body>
                    <Text style={{ color: '#ff852f', fontWeight: 'bold',fontSize:20 }}>Pricing</Text>

                  </Body>
                </Left>
                <Right>
                <Button
							testID="verifyOTP"
						
							style={{
								backgroundColor: '#ff852f' ,
								...styles.button,
							}}
							onPress={() => {
							 this.toApp();
							}}
							
						>
							<Text style={styles.buttonText}>
							BOOK NOW
							</Text>
							{this.state.loading && (
								<View>
									<ActivityIndicator size="small" color="#fff" />
								</View>
							)}
						</Button>
							</Right>
              </CardItem>
              <CardSection>


                <View style={styles.container}>

                  <Card>
                    <CardItem style={{ justifyContent: 'center' }}>

                      <Thumbnail

                        square
                        large
                        style={styles.thumbnail}
                        source={basic1}
                      />
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold' }}>
                        BASIC
                </Text>

                    </CardItem>

                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold', color: '#ff852f', fontSize: 25 }}>
                        ₹ {this.state.mypackages[0]['BASIC']}
                      </Text>

                    </CardItem>
{this.renderPackDetails('BASIC')}
                  </Card>
                  <Card>
                    <CardItem style={{ justifyContent: 'center' }}>
                      <Thumbnail

                        square
                        large
                        style={styles.thumbnail}
                        source={basic2}
                      />
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold' }}>
                        POPULAR
                      </Text>

                    </CardItem>

                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold', color: '#ff852f', fontSize: 25 }}>
                        ₹ {this.state.mypackages[0]['POPULAR']}
                      </Text>

                    </CardItem>
                    {this.renderPackDetails('POPULAR')}
                  </Card>
                  <Card>
                    <CardItem style={{ justifyContent: 'center' }}>
                      <Thumbnail

                        square
                        large
                        style={styles.thumbnail}
                        source={basic3}
                      />
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold' }}>
                      PREMIUM
                </Text>

                    </CardItem>

                    <CardItem style={{ justifyContent: 'center', fontWeight: 'bold' }}>

                      <Text style={{ fontWeight: 'bold', color: '#ff852f', fontSize: 25 }}>
                        ₹ {this.state.mypackages[0]['PREMIUM']}
                      </Text>

                    </CardItem>
                    {this.renderPackDetails('PREMIUM')}
                  </Card>

                </View>




              </CardSection>
            </Card>
          }



          {this.state.testimonials.length > 0 &&
            <Card >
              <CardItem bordered>
                <Left>

                  <Body>
                    <Text style={{ color: '#ff852f', fontWeight: 'bold' }}>Testimonials</Text>

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


                        <View style={{ flex: 0.5, flexDirection: 'row', width: deviceWidth }}>
                          <View style={[styles.viewStyle, { flex: 1, flexDirection: 'column' }]}>
                            <View style={styles.childStyle} >
                              <Thumbnail source={{ uri: item.imageUrl }} />

                            </View>

                          </View>
                          <View style={[styles.viewStyle, { flex: 3, flexDirection: 'column' }]}>
                            <View style={styles.childStyle1} >
                              <Text>{item.caption}</Text><Text style={{ color: '#ff852f', fontWeight: 'bold', fontStyle: 'italic' }}>--{item.title}</Text>
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
