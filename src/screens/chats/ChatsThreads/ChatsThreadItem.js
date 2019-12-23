/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { View, Image, Linking } from 'react-native';
import {
  Text,
  Left,
  Body,
  Badge,
  Button,
  Right,
  Icon,
  Thumbnail,
  ListItem,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/AntDesign';

export default class ChatsThreadItem extends Component {
  state = {
    unreadMessageCount: this.props.contactThread.unreadMessageCount,
    latestMessage: this.props.contactThread.latestMessage,
    latestMessageStatus: this.props.contactThread.latestMessage
      ? this.props.contactThread.latestMessage.status
      : '',
    contact: this.props.contactThread.contact,
    user: this.props.user,
    contactThreadID: this.props.contactThread._id,
    // contactThreadName: getContactName(this.props.contactThread.contact),
    contactThreadName: this.props.contactThreadName,
    contactThread: this.props.contactThread,
  };

  fillStateAgain(props) {
    const { contactThread, user, contactThreadName } = props;

    this.state.unreadMessageCount = contactThread.unreadMessageCount;
    this.state.latestMessage = contactThread.latestMessage;
    this.state.latestMessageStatus = contactThread.latestMessage
      ? contactThread.latestMessage.status
      : '';
    this.state.contact = contactThread.contact;
    this.state.user = user;
    this.state.contactThreadID = contactThread._id;
    this.state.contactThreadName = contactThreadName;
    this.state.contactThread = contactThread;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { contactThread, user, contactThreadName } = nextProps;
    const { latestMessage } = contactThread;

    if (this.state.contactThreadName !== contactThreadName) {
      this.fillStateAgain(nextProps);
      return true;
    }

    if (this.state.unreadMessageCount !== contactThread.unreadMessageCount) {
      this.fillStateAgain(nextProps);
      return true;
    }

    if (latestMessage) {
      //	console.log('lmtype',latestMessage);
      if (this.state.latestMessageStatus !== latestMessage.status) {
        this.fillStateAgain(nextProps);

        return true;
      }
      if (this.state.latestMessage._id !== latestMessage._id) {
        this.fillStateAgain(nextProps);
        return true;
      }
      if (this.state.latestMessage.text !== latestMessage.text) {
        this.fillStateAgain(nextProps);

        return true;
      }
      // if (this.state.latestMessage.messageType !== latestMessage.messageType) {
      // 	this.fillStateAgain(nextProps);

      // 	return true;
      // }
      if (this.state.latestMessage.createdAt !== latestMessage.createdAt) {
        this.fillStateAgain(nextProps);

        return true;
      }
    }

    if (contactThread._id !== this.state.contactThreadID) {
      this.fillStateAgain(nextProps);

      return true;
    }

    return false;
  }

  render() {
    const {
      user,
      contactThreadName,
      contactThreadID,
      contact,
      latestMessage,
      unreadMessageCount,
      contactThread,
      latestMessageStatus,
    } = this.state;
    //console.log('lmtype1',latestMessage);
    const latestMessageDate = latestMessage
      ? moment(latestMessage.createdAt)
      : moment();
    const yesterday = moment().subtract(1, 'days');
    const today = moment();
    console.log('CardType', latestMessage);
    return (
      <View style={styles.mainContainer}>
        <ListItem
          noIndent
          underlayColor="#383839"
          onPress={() => {
            this.props.navigation.navigate('PrivateChats', {
              contactThreadID,
            });
          }}
          style={styles.dealAlertContainer}
        >
          <Left style={styles.leftWidth}>
            <Thumbnail
              medium
              //rounded
              source={
                contact && contact.avatar && contact.avatar !== ''
                  ? {
                      uri: contact.avatar ? contact.avatar : null,
                    }
                  : require('../../../Images/NoProfilePic.jpg')
              }
              style={styles.thumbnail}
              activeOpacity={0.7}
              //  updatedAt={contact.updatedAt}
            />
          </Left>
          <Body style={styles.bodyContainer}>
            {/* <View style={styles.bodyContainer}> */}
            <Text numberOfLines={1} style={styles.chatTitle}>
              {contactThreadName}
            </Text>
            {latestMessage && latestMessage.messageType !== null ? (
              <View
                style={[
                  { ...styles.marginRightNeg20, ...styles.paddingTop6 },
                  { width: '100%' },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: 'FiraSans-Medium', marginLeft: 7 }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.font12,
                      color: '#383839',
                      fontFamily: 'FiraSans-SemiBold',
                    }}
                  >
                    {latestMessage.user._id === user._id ? (
                      latestMessageStatus === 'toBeSent' ? (
                        <React.Fragment>
                          <Image
                            style={{
                              width: 12,
                              height: 12,
                            }}
                            source={require('../../../Images/toBeSent.png')}
                          />{' '}
                        </React.Fragment>
                      ) : null
                    ) : null}
                  </Text>
                  {
                    <Text
                      note
                      numberOfLines={2}
                      style={[styles.font12, { marginLeft: 7 }]}
                    >
                      {latestMessage.senderID === user._id && (
                        <Text
                          style={[
                            styles.font12,
                            { fontFamily: 'FiraSans-Bold' },
                          ]}
                        >
                          You:{' '}
                        </Text>
                      )}
                      {latestMessage.text}
                      {'\n'}
                    </Text>
                  }
                </Text>
              </View>
            ) : (
              <View style={styles.paddingTop6}>
  <Text style={styles.joined}>{contact.mobile}</Text>
              </View>
            )}
          </Body>
          <Right style={styles.rightContainer}>
            {/* <View style={styles.rightContainer}> */}
            {latestMessage && (
              <Text
                style={
                  unreadMessageCount && unreadMessageCount > 0
                    ? {
                        ...styles.latestMessageTimeStamp,
                        color: '#34aa54',
                      }
                    : styles.latestMessageTimeStamp
                }
              >
                {latestMessage.createdAt &&
                latestMessageDate.format('D MMMM YYYY') ===
                  today.format('D MMMM YYYY')
                  ? latestMessageDate.format('hh:mm A')
                  : latestMessageDate.format('D MMMM YYYY') ===
                    yesterday.format('D MMMM YYYY')
                  ? 'Yesterday'
                  : latestMessageDate.isBefore(yesterday)
                  ? latestMessageDate.format('D MMM YYYY')
                  : ''}
              </Text>
            )}
            <View style={styles.badgeArrowContainer}>
              {unreadMessageCount > 0 ? (
                <React.Fragment>
                  <View style={styles.badge}>
                    <Text
                      style={{
                        ...styles.font12,
                        color: '#fff',
                        fontFamily: 'FiraSans-Bold',
                      }}
                    >
                      {unreadMessageCount}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ color: '#c6c6c6', paddingLeft: 6 }}
                    size={26}
                    active
                    name="rightcircle"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <View style={[styles.badge, { backgroundColor: 'white' }]} />
                  <Ionicons
                    style={{ color: '#c6c6c6', paddingLeft: 6 }}
                    size={26}
                    active
                    name="rightcircle"
                  />
                </React.Fragment>
              )}
            </View>
            {/* </View> */}
          </Right>
        </ListItem>
        {/* <View style={styles.borderBottom} /> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: '6rem',
    marginTop: 8,
    height: 77,
    borderRadius: '6rem',
    width: '394rem',
  },
  dealAlertContainer: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    //minHeight: 80,
    height: '100%',
  },
  bodyContainer: {
    // paddingVertical: '18rem',
    //backgroundColor:'pink',
    width: '230rem',
  },
  latestMessageTimeStamp: {
    fontSize: '12rem',
    lineHeight: '20rem',
    fontFamily: 'FiraSans-Regular',
    marginTop: 4,
    color: '#a8a8a8',
  },
  badgeArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8rem',
  },
  badge: {
    backgroundColor: '#34aa54',
    // color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '27rem',
    height: '27rem',
    borderRadius: '14rem',
    flexDirection: 'row',
    //transform: [{scaleX: 1}, {scaleY: 1}],
  },
  expiry: {
    fontSize: '12rem',
    lineHeight: '14rem',
    fontFamily: 'FiraSans-SemiBoldItalic',
  },
  font12: {
    fontSize: '12rem',
    color: '#383839',
    fontFamily: 'FiraSans-Regular',
  },
  font10: {
    color: '#797979',
    lineHeight: '12rem',
    fontSize: '10rem',
    fontFamily: 'FiraSansCondensed-Regular',
  },
  avatar: { borderColor: '#eee', borderWidth: 1 },
  leftWidth: {
    maxWidth: '70rem',
    //marginLeft: '4rem',
    alignItems: 'center',
    justifyContent: 'center',
    //height:'100%',
    paddingLeft: '2rem',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    //backgroundColor:'green'
  },
  chatTitle: {
    lineHeight: '20rem',
    fontSize: '18rem',
    fontFamily: 'FiraSans-SemiBold',
    textTransform: 'capitalize',
    color: '#383839',
    marginLeft: '7rem',
  },
  createdDate: {
    fontSize: '10rem',
    lineHeight: '14 rem',
    color: '#939292',
    textTransform: 'capitalize',
    fontFamily: 'FiraSansCondensed-Regular',
    marginLeft: '7rem',
  },
  latestCard: {
    fontSize: '10rem',
    color: '#939292',
    //textTransform: 'capitalize',
    fontFamily: 'FiraSansCondensed-Regular',
    marginLeft: '7rem',
  },
  marginRightNeg20: { marginRight: '-20rem' },
  borderBottom: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: '2rem',
    marginLeft: '24%',
  },
  rightContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: '10rem',
    height: '100%',
    //backgroundColor:'yellow'
  },
  paddingTop6: {
    //paddingTop: '4rem',
  },
  paddingTop8: {
    marginTop: '6rem',
    paddingVertical: '5rem',
    borderRadius: '4rem',
    marginLeft: '10rem',
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-start',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invite: {
    height: '32rem',
    width: '106rem',
    borderRadius: '16rem',
    marginTop: '-4rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderColor: '#eaeaea',
    // borderWidth: '2rem',
  },
  inviteText: {
    fontSize: '12rem',
    fontFamily: 'FiraSans-Bold',
    color: '#34aa54',
    paddingLeft: '45rem',
  },
  invitePlus: {
    position: 'absolute',
    left: '28rem',
    fontSize: '18rem',
    color: '#34aa54',
  },
  inviteWhatsapp: {
    borderRadius: '30rem',
    position: 'absolute',
    left: '3rem',
    backgroundColor: '#34aa54',
    borderWidth: '1rem',
    borderColor: '#34aa54',
    padding: '2rem',
  },
  joined: {
    color: '#3686C1',
    fontFamily: 'FiraSans-Bold',
    fontSize: '12rem',
    lineHeight: '14rem',
    marginLeft: '7rem',
  },
  thumbnail: {
    borderColor: '#f4f4f4',
    height: 64,
    width: '64rem',
    borderRadius: '4rem',
    borderWidth: '3rem',
    marginLeft: 0,
    marginRight: 0,
  },
});
