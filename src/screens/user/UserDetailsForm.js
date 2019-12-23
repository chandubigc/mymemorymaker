import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { userOperations } from '../../State/Ducks/User';
import { styles } from './Styles';
import { realmConnect } from 'realm-react-redux';
import Carousel from 'react-native-snap-carousel';
import Api from '../../State/Middlewares/Api';
import moment from 'moment';
import { dispatch } from '../../State/ReduxStore';
import _ from 'lodash';
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
  DeckSwiper,
  ListItem,
  List,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import User from '../../State/Model/User';
import SelectedImagesHorizontalView from '../ReusableComponents/SelectedImagesHorizontal';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cards: [
        {
          text: 'Avatar One',
          name: '1',
          image: require('../../Images/1.jpg'),
        },
        {
          text: 'Avatar two',
          name: '2',
          image: require('../../Images/2.jpg'),
        },
        {
          text: 'Avatar three',
          name: '3',
          image: require('../../Images/3.jpg'),
        },
      ],
      mobile: '',
      sliderWidth: 200,
      itemWidth: 100,
      name: 'Chandrashekhar',
      email: 'chandubigc@gmail.com',
      selectedImageName: '1',
    };
  }

  componentDidMount() {
    this.setState({ mobile: this.props.navigation.state.params.mobile });
  }

  _renderItem({ item, index }) {
    console.log('ITEM', item);
    return (
      <View style={{ marginTop: 15, overflow: 'visible' }}>
        <Text
          style={{
            paddingHorizontal: 30,
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  }
  saveUser = async () => {
 


      let userObject = {
        name: this.state.name,
      
        avatar: '',
        mobile: this.state.mobile,
        _id: 'MMM-02738502',
        email:this.state.email,
        isLoggedin: true,
        isVerified: true,
      };
      console.log('USER OBJ', User);
      User.create(userObject, true);
      //  realmDispatch(userOperations.updateUser(userObject))

      this.props.navigation.navigate('AuthLoading', {
        mobile: this.state.mobileNumber,
        fromLoginScreen: true,
      });
    };
  

  handleSelectedImage = name => {
    console.log('123', name);
    this.setState({
      selectedImageName: name,
    });
  };

  render() {
    return (
      <Container>
         {/* <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Personal Details</Title>
          </Body>
          <Right />
        </Header> 

         <View>
        <DeckSwiper
            dataSource={this.state.cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 100, flex: 1 }} source={item.image} />
                </CardItem>
            
              </Card>
            }
          />
          </View> 
        <SelectedImagesHorizontalView
          data={this.state.cards}
          selectedImageName={this.state.selectedImageName}
          handleSelectedImage={this.handleSelectedImage}
        /> */}
<View style={styles.logoContainer}>
					{/* <Text style={styles.logo}>ZONO</Text> */}
					<Image style={styles.images} source={require('../../Images/bjlogon.png')} />
				</View>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
            </Item>
            <Item inlineLabel last>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </Item>
          </Form>
          <Button
            block
            style={{ margin: 15, marginTop: 50 }}
            onPress={() => this.saveUser()}
          >
            <Text>SAVE</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default UserDetailsForm;
