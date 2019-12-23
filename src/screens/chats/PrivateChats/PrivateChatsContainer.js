import React, { Component } from 'react';
import {
  Clipboard,
  BackHandler,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { Toast, Button, Icon } from 'native-base';
import PrivateChats from './PrivateChats';
import { bindActionCreators } from 'redux';
import { messageOperations } from '../../../State/Ducks/Messages';
import _ from 'lodash';
import { realmConnect } from 'realm-react-redux';
import moment from 'moment';
import PrivateChatsHeader from './PrivateChatsHeader';

class PrivateChatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessages: {},
    };
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    const { contactThread, navigation } = this.props;
    if (contactThread.chatChannel) {
      navigation.setParams({
        channelID: contactThread.chatChannel.channelID,
      });
      this.resetMessageCount();
    }
  }

  handleBackPress = () => {
    console.log(
      'active Action Sheet state chatsContainer',
      this.state.activeActionSheet
    );
    if (this.state.activeToolBar) {
      this.inputToolBarActive(false);
      console.log('handleBAckPress1');
    } else if (this.state.activeActionSheet) {
      console.log(
        'active Action Sheet state chatsContainer condition',
        this.state.activeActionSheet
      );
      this.setState({ activeActionSheet: false });
    } else {
      console.log('handleBAckPress2');
      this.props.navigation.goBack();
    }
    return true;
  };

  resetMessageCount() {
    if (this.props.contactThread.chatChannel.unreadMessageCount > 0) {
      result = {
        contactThread: null,
        channel: null,
      };
      const contactThreadsNewMsgCnt =
        this.props.contactThread.unreadMessageCount -
        this.props.contactThread.chatChannel.unreadMessageCount;
      result.contactThread = {
        _id: this.props.contactThread._id,
        unreadMessageCount:
          contactThreadsNewMsgCnt > 0 ? contactThreadsNewMsgCnt : 0,
      };
      result.channel = {
        channelID: this.props.contactThread.chatChannel.channelID,
        unreadMessageCount: 0,
      };
      this.props.resetMessageCount(result);
    }
  }

  render() {
    //  console.log('rendering private chat props............', this.props);
    const {
      navigation,
      contactThread,
      contactThreadName,
      user,
      privateChats,
      addChatMessages,
      deleteMessagesFromDB,
    } = this.props;

    return (
      <React.Fragment>
        <PrivateChatsHeader
          navigation={navigation}
          channelName={contactThreadName}
          user={user}
          contact={contactThread.contact}
          selectedMessages={this.state.selectedMessages}
          deleteMessagesFromDB={deleteMessagesFromDB}
          contactThread={contactThread}
        />
        <PrivateChats
          navigation={navigation}
          user={user}
          messages={privateChats}
          addChatMessages={addChatMessages}
          channelName={contactThreadName}
          contactThread={contactThread}
          handleSelectedMessages={this.handleSelectedMessages}
          selectedMessages={this.state.selectedMessages}
        />
      </React.Fragment>
    );
  }
}

function mapPropsToQueries(realm, ownProps) {
  const { contactThreadID } = ownProps.navigation.state.params;
  return [
    realm.objects('ContactThreads').filtered(`_id == '${contactThreadID}'`),
    realm.objects('User'),
    realm.objects('ChatMessages'),
  ];
}

function mapQueriesToProps([contactThreads, user, chatMessages], ownProps) {
  if (contactThreads.length > 0) {
    const contactThread = contactThreads[0];
    // const contactThread = {
    //   _id: '1',
    //   contact: {
    //     name: 'Anurag',
    //     avatar: null,
    //   },
    // };

    const messages = [];
    console.log('chatMessages', chatMessages);

    return {
      contactThread,
      // privateChats: contactThread.chatMessages.sorted('createdAt', true),
      privateChats: contactThread.chatMessages.sorted('createdAt', true),
      user: user['0'],
      contactThreadName: contactThread.contact
        ? contactThread.contact.name
        : 'unknown',
    };
  }

  return { contactThread: {} };
}

function mapRealmDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addChatMessages: messageOperations.addChatMessages,
      deleteMessagesFromDB: messageOperations.deleteMessagesFromDB,
      resetMessageCount: messageOperations.resetMessageCount,
    },
    dispatch
  );
}

export default realmConnect(
  mapPropsToQueries,
  mapQueriesToProps,
  mapRealmDispatchToProps
)(PrivateChatsContainer);
