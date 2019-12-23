import React, { Component } from 'react';
import {
  Clipboard,
  BackHandler,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import { Toast, Button, Icon } from 'native-base';
import TeamChats from './TeamChats';
import { bindActionCreators } from 'redux';
import { messageOperations } from '../../../State/Ducks/Messages';
import _ from 'lodash';
import { realmConnect } from 'realm-react-redux';
import moment from 'moment';
import TeamChatsHeader from './TeamChatsHeader';

class TeamChatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMessages: {},
    };
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    const { team, navigation } = this.props;
    if (false) {
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
      team,
      teamName,
      user,
      teamChats,
      addChatMessages,
      deleteMessagesFromDB,
    } = this.props;

    return (
      <React.Fragment>
        <TeamChatsHeader
          navigation={navigation}
          channelName={teamName}
          user={user}
          avatar={team.avatar}
          selectedMessages={this.state.selectedMessages}
          deleteMessagesFromDB={deleteMessagesFromDB}
          team={team}
        />
        <TeamChats
          navigation={navigation}
          user={user}
          messages={teamChats}
          addChatMessages={addChatMessages}
          channelName={teamName}
          team={team}
          handleSelectedMessages={this.handleSelectedMessages}
          selectedMessages={this.state.selectedMessages}
        />
      </React.Fragment>
    );
  }
}

function mapPropsToQueries(realm, ownProps) {
  const { teamID } = ownProps.navigation.state.params;
  return [
    realm.objects('ContactGroups').filtered(`_id == '${teamID}'`),
    realm.objects('User'),
    realm.objects('ChatMessages'),
  ];
}

function mapQueriesToProps([contactGroups, user, chatMessages], ownProps) {
  if (contactGroups.length > 0) {
    console.log('contactgr', contactGroups);
    const team = contactGroups[0];
    // const team = {
    //   _id: '1',
    //   name: 'Anurag',
    //   avatar: null,
    // };

    const messages = [];
    console.log('chatMessages', team.chatMessages);

    return {
      team,
      // privateChats: contactThread.chatMessages.sorted('createdAt', true),
      teamChats:
        (team.chatMessages && team.chatMessages.sorted('createdAt', true)) ||
        [],
      user: user['0'],
      teamName: team.name,
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
)(TeamChatsContainer);
