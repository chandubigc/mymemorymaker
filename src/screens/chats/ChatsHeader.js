/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { headerStyles } from '../../Styles';
import EStyleSheet from 'react-native-extended-stylesheet';
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
} from 'native-base';

export default class ChatsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarActive: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <View>
          <Header
            androidStatusBarColor="#00ac47"
            iosBarStyle="light-content"
            //  style={headerStyles.header}
            noShadow
          >
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                // onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon name="menu" />
              </Button>
            </Left>
            <Body style={{ flex: 1 }}>
              <Title>Chats</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
        </View>
      </React.Fragment>
    );
  }
}

const styles = EStyleSheet.create({
  headerBody: {
    marginLeft: '7rem',
    flexDirection: 'row',
  },
  headerBodyTitle: {
    color: '#fff',
    fontSize: '22rem',
    fontFamily: 'FiraSans-Bold',
  },
  newChatText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '8rem',
    fontSize: '10rem',
    lineHeight: '12rem',
    alignSelf: 'center',
    fontFamily: 'FiraSans-Medium',
    color: '#fff',
    letterSpacing: 1.5,
  },
  newChat: {
    backgroundColor: '#fff',
    height: '22rem',
    width: '22 rem',
    borderRadius: '12rem',
    margin: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newChatContainer: {
    flexDirection: 'row',
    borderRadius: '16rem',
    maxWidth: '140rem',
    backgroundColor: '#009F41',
    padding: '2rem',
  },
  search: {
    paddingVertical: '2rem',
    paddingLeft: '10rem',
    paddingRight: '2rem',
  },
});
