/* eslint-disable react/jsx-no-bind */
import {
  Bubble,
  utils,
  Time,
  LoadEarlier,
  Message,
  GiftedChat,
  Day,
} from 'react-native-gifted-chat';
// import Day from './CustomDay';
// import MessageText from './CustomMessageText';
import React, { Component } from 'react';
import { Platform, TouchableOpacity, Image, Keyboard } from 'react-native';
import { Header, Text, View, Left, Right, Button, Icon } from 'native-base';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CustomAvatar } from '../../ReusableComponents/CustomAvatar';
import { createUUID } from '../../../State/Utils/CreateUUID';
import { cloneRealmObj } from '../../../State/Model';
import CustomInputToolbar from './CustomInputToolbar';

export default class PrivateChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      VoiceEnabled: false,
      //ActionsEnabled: false
    };
    this.onSend = this.onSend.bind(this);
    // //this.renderCustomActions = this.renderCustomActions.bind(this);
    // this.renderBubble = this.renderBubble.bind(this);
    // this.renderSystemMessage = this.renderSystemMessage.bind(this);
    // this.renderChatFooter = this.renderChatFooter.bind(this);
    // this.handleLongPress = this.handleLongPress.bind(this);
    // // this.onLoadEarlier = this.onLoadEarlier.bind(this);
    // this.storeAndSend = this.storeAndSend.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this.renderSend = this.renderSend.bind(this);
    // this.renderMessageText = this.renderMessageText.bind(this);
    //  this.renderMessage = this.renderMessage.bind(this);
    // this.renderMessageImage = this.renderMessageImage.bind(this);
    // this.renderImageHeader = this.renderImageHeader.bind(this);
    // this.renderDay = this.renderDay.bind(this);
    // this.renderTime = this.renderTime.bind(this);
  }

  onSend(messages) {
    const userData = this.props.user;
    const userToContactData = {
      mobile: userData.mobile,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      email: userData.email,
      _id: userData._id,
      avatar: userData.avatar,
      name: userData.name,
    };
    const newMessage = {
      _id: createUUID(),
      text: messages[0].text,
      createdAt: moment().valueOf(),
      storageStatus: 'P',
      status: 'toBeSent',
      channelID: this.props.contactThread._id,
      senderID: this.props.user._id,
      user: userToContactData,
    };

    this.props.addChatMessages(newMessage, false);
  }

  renderSend(props, text, setTextEmpty) {
    //console.log('props in Rsend', props);
    const messageBody = text ? text.trim() : ''; //props.text.trim();
    console.log(' render Send ', messageBody);
    const msgEntered = messageBody.length > 0;
    return (
      <TouchableOpacity
        testID="send"
        accessible
        accessibilityLabel="send"
        style={{
          height: 35,
          width: '9%',
          justifyContent: 'flex-end',
          marginTop: 5,
          backgroundColor: '#3686c1',
          marginRight: 8,
          borderRadius: 5,
        }}
        disabled={!msgEntered}
        onPress={() => {
          msgEntered
            ? props.onSend({ text: messageBody }, true, setTextEmpty)
            : null;
        }}
        accessibilityTraits="button"
      >
        <View
          style={{
            // marginBottom: 6,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            type="EvilIcons"
            name="sc-telegram"
            size={28}
            style={{
              transform: [{ rotate: '0deg' }],
              color: msgEntered ? 'lightgreen' : 'white',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  // renderMessage(props) {
  // 	const { currentMessage, nextMessage, extraData } = props;

  // 	return (
  // 		<TouchableOpacity
  // 		  activeOpacity={1}
  // 			style={
  // 				isSelected
  // 					? {
  // 							backgroundColor: '#d7e4e1',
  // 							paddingVertical: 1,
  // 							marginVertical: 1,
  // 					  }
  // 					: null
  // 			}
  // 			disabled={disablePress}

  // 		>
  // 			<Message
  // 				{...props}
  // 				containerStyle={{
  // 					left: { marginVertical: marginVal },
  // 					right: { marginVertical: marginVal },
  // 				}}
  // 				renderBubble={this.renderBubble.bind(this, props)}
  // 				renderDay={this.renderDay.bind(this, props)}
  // 				renderSystemMessage={this.renderSystemMessage.bind(this, props)}
  // 			/>
  // 		</TouchableOpacity>
  // 	);
  // }

  renderTime(props) {
    if (props.currentMessage.createdAt) {
      return (
        <Time
          {...props}
          timeTextStyle={{
            left: styles.time,
            right: styles.time,
          }}
        />
      );
    }
    return null;
  }

  renderMessageText(props) {
    const { currentMessage } = props;
    const del2 = currentMessage.storageStatus === 'DEL2';
    return (
      <MessageText
        {...props}
        textStyle={{
          right: {
            ...styles.font16,
            fontFamily: del2 ? 'FiraSans-Italic' : 'FiraSans-Regular',
            color: del2 ? 'gray' : '#000',
            width: currentMessage.contentType === 'image' ? 270 : null,
          },
          left: {
            ...styles.font16,
            fontFamily: del2 ? 'FiraSans-Italic' : 'FiraSans-Regular',
            color: del2 ? 'gray' : '#000',
            width: currentMessage.contentType === 'image' ? 270 : null,
          },
        }}
      />
    );
  }

  renderDay(props) {
    const { currentMessage } = props;

    if (currentMessage.createdAt) {
      return (
        <Day
          {...props}
          dateFormat={
            moment().isSame(currentMessage.createdAt, 'day')
              ? 'today'
              : 'dddd, MMMM D YYYY'
          }
          textStyle={{
            fontFamily: 'FiraSans-Bold',
          }}
        />
      );
    }
    return null;
  }

  renderInputToolbar(props) {
    const { navigation, user, contactThread } = this.props;
    return (
      <CustomInputToolbar
        {...props}
        navigation={navigation}
        user={user}
        contactThread={contactThread}
        storeAndSend={this.storeAndSend}
        //activeActionsSheetDisabler={this.activeActionsSheetDisabler}
        containerStyle={this.props.containerStyle}
        customActionsContainer={styles.customActionsContainer}
      />
    );
  }

  renderChatFooter() {
    return <View style={{ height: 16 }} />;
  }

  render() {
    const {
      user,
      replyingFor,
      selectedMessages,
      messages,
      contactThread,
      channelName,
    } = this.props;

    const msgs = messages.map(msg => {
      return cloneRealmObj(msg);
    });

    return (
      <View style={{ backgroundColor: '#f4f4f4', flex: 1 }}>
        <GiftedChat
          // messages={Array.from([])}
          messages={Array.from(msgs)}
          renderAvatar={null}
          onSend={this.onSend}
          // loadEarlier={loadEarlier}
          // onLoadEarlier={this.onLoadEarlier}
          // isLoadingEarlier={isLoadingEarlier}
          user={{
            _id: user._id, // sent messages should have same user._id
            name: user.name,
          }}
          extraData={{
            //user,
            contactThreadID: contactThread._id,
          }}
          renderSend={this.renderSend}
          //	renderActions={this.renderCustomActions}
          keyboardShouldPersistTaps="always"
          renderMessage={this.renderMessage}
          //	renderChatFooter={this.renderChatFooter}
          // renderLoadEarlier={this.loadEarlier}
          renderInputToolbar={this.renderInputToolbar}
          listViewProps={{
            initialNumToRender: 10,
            maxToRenderPerBatch: 1,
            updateCellsBatchingPeriod: 50,
            windowSize: 3,
            // onEndReached: this.onLoadEarlier,
            onEndReachedThreshold: 0.6,
          }}
          renderChatFooter={this.renderChatFooter}
          renderUsernameOnMessage={true}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  font16: {
    fontSize: '16rem',
    fontFamily: 'FiraSans-Regular',
    padding: '5rem',
  },
  sendCameraIconContainer: {
    width: '26rem',
    height: '26rem',
    marginRight: '10rem',
    marginBottom: '10rem',
  },
  tick: {
    fontSize: '10rem',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  summaryContainer: {
    backgroundColor: '#3686c1',
    width: '150rem',
    height: 26,
    elevation: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    borderRadius: 5,
    zIndex: 99,
    padding: 0,
    flexDirection: 'row',
    marginTop: 15,
  },
  summaryText: {
    color: '#fff',
    fontFamily: 'FiraSans-SemiBold',
    fontSize: '12rem',
    lineHeight: '14rem',
    letterSpacing: 1.2,
  },
  tickView: {
    flexDirection: 'row',
    marginRight: '10rem',
  },
  name: {},
  dealSystemMessagesContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5rem',
    backgroundColor: '#d2e8fd',
    width: '250rem',
    minHeight: '40rem',
    height: 'auto',
    borderRadius: '10rem',
  },
  dealSystemMessageText: {
    color: '#000',
    fontSize: '14rem',
    fontFamily: 'FiraSans-Regular',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelNameContainer: {
    position: 'absolute',
    left: Platform.OS === 'android' ? '60%' : '40%',
  },
  customActionsContainer: {
    width: 26,
    height: '100%',
    marginLeft: 10,
    paddingTop: '4rem',
    // backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelName: {
    color: '#fff',
    fontSize: '18rem',
    lineHeight: '20rem',
    marginTop: '-4rem',
    fontFamily: 'FiraSans-Bold',
  },
  subTitle: {
    fontSize: '14rem',
    fontFamily: 'FiraSans-Bold',
    lineHeight: '16rem',
    color: '#fff',
  },
  footerContainer: {
    height: '80rem',
    width: '88%',
    backgroundColor: '#fff',
    borderTopLeftRadius: '10rem',
    borderTopRightRadius: '10rem',
    marginTop: '5rem',
    marginBottom: '15rem',
    padding: '5rem',
  },
  footerContainer1: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    borderTopRightRadius: '5rem',
    borderBottomRightRadius: '5rem',
  },
  footerLeftLine: {
    height: '65rem',
    width: '5rem',
    backgroundColor: '#3683c1',
    borderTopLeftRadius: '5rem',
    borderBottomLeftRadius: '5rem',
  },
  footerText: {
    color: 'gray',
    paddingLeft: '10rem',
    paddingTop: '5rem',
    fontSize: '14rem',
    fontFamily: 'FiraSans-Regular',
  },
  replyImage: {
    height: '60rem',
    width: '60rem',
  },
  time: { fontSize: '12rem', color: '#383839', fontFamily: 'FiraSans-Regular' },
});
