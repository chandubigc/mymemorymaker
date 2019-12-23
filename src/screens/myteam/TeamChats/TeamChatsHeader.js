import React from 'react';
import {
  Header,
  Text,
  View,
  Left,
  Right,
  Icon,
  Button,
  Badge,
} from 'native-base';
import { TouchableOpacity, Platform, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { headerStyles } from '../../../Styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CustomAvatar } from '../../ReusableComponents/CustomAvatar';

export default class PrivateChatsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false,
    };
  }

  render() {
    const { navigation, channelName, user, avatar } = this.props;

    return (
      <View>
        <Header
          //  androidStatusBarColor="#00ac47"
          iosBarStyle="light-content"
          //   style={headerStyles.header}
          noShadow
        >
          <Left>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.opacity}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="ios-arrow-back" style={styles.icon} />
                {avatar && avatar !== '' ? (
                  <CustomAvatar
                    small
                    containerStyle={{
                      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                    }}
                    rounded
                    source={{ uri: avatar }}
                    activeOpacity={0.7}
                    // updatedAt={contact.avatarUpdatedAt}
                  />
                ) : (
                  <CustomAvatar
                    small
                    containerStyle={{
                      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                    }}
                    rounded
                    source={require('../../../Images/NoGroupProfilePic.png')}
                    activeOpacity={0.7}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.channelNameContainer}>
                <TouchableOpacity>
                  <Text style={styles.channelName}> {channelName}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Left>

          <Right />
        </Header>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelNameContainer: {
    position: 'absolute',
    left: Platform.OS === 'android' ? '60%' : '40%',
    paddingTop: 3,
  },
  channelName: {
    color: '#fff',
    fontSize: '18rem',
    lineHeight: '20rem',
    marginTop: '-4rem',
    fontFamily: 'FiraSans-Bold',
    textTransform: 'capitalize',
  },
  subTitle: {
    fontSize: '14rem',
    fontFamily: 'FiraSans-Bold',
    lineHeight: '16rem',
    color: '#fff',
  },
  cancel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14rem',
    fontFamily: 'FiraSans-SemiBold',
  },
  badge: {
    backgroundColor: '#ff6565',
    position: 'absolute',
    bottom: '15rem',
    right: '-6rem',
    zIndex: 3,
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
  icon: {
    fontSize: '25rem',
    color: '#fff',
    marginLeft: 0,
    marginRight: '11rem',
  },
  summaryStyle: {
    backgroundColor: '#269043',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
  },
  summaryIcon: {
    color: 'white',
  },
  content: {
    // padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'pink',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
  },
  popoverItem: {
    padding: 8,
    fontSize: 18,
  },
  popoverItemBorder: {
    borderColor: '#eee',
  },
  popoverContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  popoverBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
  },
  newChatContainer: {
    flexDirection: 'row',
    borderRadius: '16rem',
    width: '99rem',
    backgroundColor: '#009F41',
    padding: '2rem',
    alignItems: 'center',
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
    height: '22rem',
    width: '22 rem',
    borderRadius: '12rem',
    margin: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
  },
});
